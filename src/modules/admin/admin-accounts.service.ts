import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { Logger } from "nestjs-pino";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminAuditService } from "src/common/services/admin-audit.service";
import { AdminRole, User, UserRole, UserStatus } from "generated/prisma/client";
import {
  ADMIN_MODULES,
  accessFromPermissions,
  permissionsFromAccess,
  type AdminAccessLevel,
  type AdminModuleKey,
} from "src/common/constants/admin-permissions";
import {
  CreateAdminAccountDto,
  UpdateAdminAccountDto,
  UpdateAdminProfileDto,
  ChangePasswordDto,
  validateAccessMap,
} from "./dtos/admin-account.dto";

const SALT_ROUNDS = 12;

/**
 * Admin account management and admin self-service.
 *
 * Two conventions from the existing code are preserved deliberately:
 *
 * - An `Admin` row with an empty `permissions` array means full access
 *   (super admin). PermissionsGuard already reads it that way.
 * - An ADMIN user with no `Admin` row at all is also treated as full access,
 *   so the accounts that existed before this feature keep working. They are
 *   listed here as super admins, because that is what they effectively are.
 */
@Injectable()
export class AdminAccountsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AdminAuditService,
    private readonly logger: Logger,
  ) {}

  /** The catalogue, so the dashboard renders exactly what the guard enforces. */
  getModules() {
    return ADMIN_MODULES.map((m) => ({
      key: m.key,
      label: m.label,
      hasActions: m.actions.length > 0,
    }));
  }

  /**
   * Effective permissions for the signed-in admin, used by the dashboard to
   * decide which nav items to show. `isSuperAdmin` short-circuits the rest.
   */
  async getMyAccess(userId: string) {
    const admin = await this.prisma.admin.findUnique({ where: { userId } });
    const isSuperAdmin = !admin || admin.permissions.length === 0;
    return {
      isSuperAdmin,
      isActive: admin?.isActive ?? true,
      role: admin?.role ?? AdminRole.SUPER_ADMIN,
      permissions: admin?.permissions ?? [],
      access: isSuperAdmin
        ? Object.fromEntries(ADMIN_MODULES.map((m) => [m.key, "full"]))
        : accessFromPermissions(admin.permissions),
    };
  }

  async list() {
    const admins = await this.prisma.user.findMany({
      where: { role: UserRole.ADMIN, deletedAt: null },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        profilePhoto: true,
        status: true,
        createdAt: true,
        admin: {
          select: { role: true, permissions: true, isActive: true },
        },
      },
    });

    return admins.map((user) => {
      const profile = user.admin;
      const isSuperAdmin = !profile || profile.permissions.length === 0;
      return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        profilePhoto: user.profilePhoto,
        status: user.status,
        createdAt: user.createdAt,
        isSuperAdmin,
        isActive: profile?.isActive ?? true,
        role: profile?.role ?? AdminRole.SUPER_ADMIN,
        access: isSuperAdmin
          ? Object.fromEntries(ADMIN_MODULES.map((m) => [m.key, "full"]))
          : accessFromPermissions(profile.permissions),
      };
    });
  }

  async create(actingAdminId: string, dto: CreateAdminAccountDto) {
    await this.assertSuperAdmin(actingAdminId);

    const email = dto.email.trim().toLowerCase();
    const clash = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { phone: dto.phone }] },
      select: { id: true, email: true },
    });
    if (clash) {
      throw new BadRequestException(
        clash.email === email
          ? "An account with this email already exists"
          : "An account with this phone number already exists",
      );
    }

    const permissions = this.resolvePermissions(dto.isSuperAdmin, dto.access);
    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);

    const created = await this.prisma.user.create({
      data: {
        fullName: dto.fullName.trim(),
        email,
        phone: dto.phone.trim(),
        passwordHash,
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        // Created by a trusted super admin rather than self-signup, so there is
        // nothing to verify by email before the account can be used.
        emailVerified: true,
        profileCompleted: true,
        admin: {
          create: {
            role: dto.isSuperAdmin
              ? AdminRole.SUPER_ADMIN
              : AdminRole.MODERATOR,
            permissions,
            isActive: true,
          },
        },
      },
      select: { id: true, fullName: true, email: true },
    });

    await this.audit.record({
      adminId: actingAdminId,
      action: "ADMIN_ACCOUNT_CREATED",
      entityType: "ADMIN",
      entityId: created.id,
      newValues: {
        email: created.email,
        isSuperAdmin: Boolean(dto.isSuperAdmin),
        permissions,
      },
    });
    this.logger.log({
      message: "Admin account created",
      actingAdminId,
      newAdminId: created.id,
    });

    return { message: "Admin account created", admin: created };
  }

  async update(
    actingAdminId: string,
    targetUserId: string,
    dto: UpdateAdminAccountDto,
  ) {
    await this.assertSuperAdmin(actingAdminId);

    const target = await this.prisma.user.findUnique({
      where: { id: targetUserId },
      include: { admin: true },
    });
    if (!target || target.role !== UserRole.ADMIN) {
      throw new NotFoundException("Admin account not found");
    }

    // Without this an admin could drop their own last permission and lock
    // themselves out of the screen that grants permissions.
    if (targetUserId === actingAdminId) {
      if (dto.isSuperAdmin === false || dto.access) {
        throw new BadRequestException(
          "You cannot change your own access. Ask another super admin.",
        );
      }
      if (dto.isActive === false) {
        throw new BadRequestException("You cannot deactivate your own account");
      }
    }

    const previous = {
      permissions: target.admin?.permissions ?? [],
      isActive: target.admin?.isActive ?? true,
    };

    const permissions =
      dto.isSuperAdmin !== undefined || dto.access !== undefined
        ? this.resolvePermissions(dto.isSuperAdmin, dto.access)
        : previous.permissions;

    const isSuperAdmin = permissions.length === 0;

    await this.prisma.admin.upsert({
      where: { userId: targetUserId },
      create: {
        userId: targetUserId,
        role: isSuperAdmin ? AdminRole.SUPER_ADMIN : AdminRole.MODERATOR,
        permissions,
        isActive: dto.isActive ?? true,
      },
      update: {
        role: isSuperAdmin ? AdminRole.SUPER_ADMIN : AdminRole.MODERATOR,
        permissions,
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
      },
    });

    // A revoked admin keeps a valid access-token cookie until it expires;
    // dropping the refresh tokens stops them renewing past that.
    if (dto.isActive === false) {
      await this.prisma.refreshToken.deleteMany({
        where: { userId: targetUserId },
      });
    }

    await this.audit.record({
      adminId: actingAdminId,
      action: "ADMIN_ACCOUNT_UPDATED",
      entityType: "ADMIN",
      entityId: targetUserId,
      previousValues: previous,
      newValues: { permissions, isActive: dto.isActive ?? previous.isActive },
    });

    return { message: "Admin access updated" };
  }

  // ─── Self-service ────────────────────────────────────────────────────

  async getMyProfile(userId: string) {
    const user = await this.getUserOrThrow(userId);
    const access = await this.getMyAccess(userId);
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      profilePhoto: user.profilePhoto,
      createdAt: user.createdAt,
      ...access,
    };
  }

  async updateMyProfile(userId: string, dto: UpdateAdminProfileDto) {
    await this.getUserOrThrow(userId);

    if (dto.phone) {
      const clash = await this.prisma.user.findFirst({
        where: { phone: dto.phone.trim(), NOT: { id: userId } },
        select: { id: true },
      });
      if (clash) {
        throw new BadRequestException(
          "Another account already uses this phone number",
        );
      }
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(dto.fullName !== undefined && { fullName: dto.fullName.trim() }),
        ...(dto.phone !== undefined && { phone: dto.phone.trim() }),
      },
      select: { id: true, fullName: true, email: true, phone: true },
    });

    return { message: "Profile updated", admin: updated };
  }

  async changeMyPassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.getUserOrThrow(userId);
    if (!user.passwordHash) {
      throw new BadRequestException(
        "This account signs in with Google and has no password to change",
      );
    }

    const matches = await bcrypt.compare(
      dto.currentPassword,
      user.passwordHash,
    );
    if (!matches) {
      throw new UnauthorizedException("Current password is incorrect");
    }
    if (dto.currentPassword === dto.newPassword) {
      throw new BadRequestException(
        "The new password must differ from the current one",
      );
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: await bcrypt.hash(dto.newPassword, SALT_ROUNDS) },
    });

    // Every other session is invalidated: a password change is how you respond
    // to one being compromised, so the old sessions must not survive it.
    await this.prisma.refreshToken.deleteMany({ where: { userId } });

    await this.audit.record({
      adminId: userId,
      action: "ADMIN_PASSWORD_CHANGED",
      entityType: "ADMIN",
      entityId: userId,
    });

    return {
      message: "Password changed. Other devices have been signed out.",
    };
  }

  // ─── Utils ───────────────────────────────────────────────────────────

  private resolvePermissions(
    isSuperAdmin: boolean | undefined,
    access: Record<string, unknown> | undefined,
  ): string[] {
    if (isSuperAdmin) return [];
    let validated: Record<AdminModuleKey, AdminAccessLevel>;
    try {
      validated = validateAccessMap(access ?? {});
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : "Invalid access map",
      );
    }
    const permissions = permissionsFromAccess(validated);
    if (permissions.length === 0) {
      // Would otherwise be stored as [] and silently read back as super admin.
      throw new BadRequestException(
        "Grant access to at least one module, or make this account a super admin",
      );
    }
    return permissions;
  }

  private async assertSuperAdmin(userId: string) {
    const { isSuperAdmin } = await this.getMyAccess(userId);
    if (!isSuperAdmin) {
      throw new ForbiddenException(
        "Only a super admin can manage admin accounts",
      );
    }
  }

  private async getUserOrThrow(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("Admin account not found");
    }
    return user;
  }
}
