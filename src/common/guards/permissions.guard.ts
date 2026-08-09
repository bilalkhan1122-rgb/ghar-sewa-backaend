import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from 'generated/prisma/client';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

/**
 * Permission-based access control for admin routes.
 *
 * Activated only when `@Permissions(...)` metadata is present on a route.
 * - No metadata → allow (role guard already enforced ADMIN).
 * - Metadata present → the admin must hold every required permission.
 *   An admin with an empty `permissions` array (SUPER_ADMIN default) has
 *   full access. Admins without a row in the `admins` table are treated
 *   as full-access so legacy ADMIN users keep working.
 *
 * Designed so future roles (Moderator, Finance Admin, Support Agent) can
 * be granted granular permissions without refactoring routes.
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{
      user?: { sub: string; role: UserRole };
    }>();
    const user = request.user;
    if (!user || !user.sub) {
      throw new UnauthorizedException('User not found in request');
    }

    // Legacy/fallback: any ADMIN user without an Admin record gets full access.
    const admin = await this.prisma.admin.findUnique({
      where: { userId: user.sub },
      select: { isActive: true, permissions: true },
    });

    if (!admin) {
      return user.role === UserRole.ADMIN;
    }

    if (!admin.isActive) {
      throw new ForbiddenException('Admin account is inactive');
    }

    // Empty permission list = full access (SUPER_ADMIN).
    if (admin.permissions.length === 0) {
      return true;
    }

    const missing = requiredPermissions.filter(
      (permission) => !admin.permissions.includes(permission),
    );
    if (missing.length > 0) {
      throw new ForbiddenException(
        `Missing permission(s): ${missing.join(', ')}`,
      );
    }

    return true;
  }
}
