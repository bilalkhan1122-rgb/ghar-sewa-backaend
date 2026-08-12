import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { VerificationQueryDto } from "./dtos/verification-query.dto";
import { Logger } from "nestjs-pino";
import {
  Prisma,
  UserRole,
  VerificationStatus,
  NotificationType,
} from "generated/prisma/client";

/**
 * Module 11 — Provider Verification.
 *
 * Phase 1: verification is performed manually by administrators. The data
 * model (VerificationRequest) is designed so a future automated NADRA
 * Verisys integration can replace the manual approve/reject step without
 * changing the core model — each submission is a first-class record and
 * history is never overwritten.
 */
@Injectable()
export class VerificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    private readonly logger: Logger,
  ) {}

  // ─── Provider: Submit (or resubmit) for verification ────────────────

  async submit(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { providerProfile: { include: { categories: true } } },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }

    if (user.verificationStatus === VerificationStatus.BANNED) {
      throw new ForbiddenException(
        "Your account is banned. You cannot submit a verification request.",
      );
    }

    const profile = user.providerProfile;
    if (!profile) {
      throw new BadRequestException(
        "Complete your profile before submitting for verification",
      );
    }

    // Cannot submit twice while a request is pending
    const pendingRequest = await this.prisma.verificationRequest.findFirst({
      where: { providerId: userId, status: VerificationStatus.PENDING },
    });
    if (pendingRequest) {
      throw new ConflictException(
        "You already have a verification request under review",
      );
    }

    // Validate all required fields
    const missing = this.missingFields(profile);
    if (missing.length > 0) {
      throw new BadRequestException({
        message:
          "Profile must be 100% complete before submitting for verification",
        missingFields: missing,
      });
    }

    const isResubmission =
      user.verificationStatus === VerificationStatus.REJECTED;

    const request = await this.prisma.verificationRequest.create({
      data: {
        providerId: userId,
        cnicNumber: profile.cnicNumber!,
        facePhoto: profile.facePhoto!,
        cnicFrontImage: profile.cnicFrontImage!,
        cnicBackImage: profile.cnicBackImage!,
        status: VerificationStatus.PENDING,
        submittedAt: new Date(),
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: { verificationStatus: VerificationStatus.PENDING },
    });

    // Placeholder admin event — a real admin queue/email system can hook here.
    this.logger.log({
      eventType: "ADMIN_VERIFICATION_SUBMITTED",
      requestId: request.id,
      providerId: userId,
      isResubmission,
    });

    void this.notifications.send({
      userId,
      type: isResubmission
        ? NotificationType.VERIFICATION_RESUBMITTED
        : NotificationType.VERIFICATION_SUBMITTED,
      title: isResubmission
        ? "Verification resubmitted 📋"
        : "Verification submitted 📋",
      message:
        "Your profile has been submitted for review. We will notify you once it is decided.",
      relatedEntityType: "VERIFICATION_REQUEST",
      relatedEntityId: request.id,
    });

    return {
      message: isResubmission
        ? "Profile resubmitted for verification successfully"
        : "Profile submitted for verification successfully",
      verificationStatus: VerificationStatus.PENDING,
      requestId: request.id,
    };
  }

  /**
   * Called by the provider module whenever verification-sensitive
   * information changes (CNIC number, face photo, CNIC documents).
   * Automatically moves an APPROVED provider back to PENDING and records
   * the change in the verification history so nothing is overwritten.
   */
  async onSensitiveInfoChanged(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { providerProfile: true },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      return;
    }

    const profile = user.providerProfile;
    const sensitiveComplete =
      !!profile?.cnicNumber &&
      !!profile?.facePhoto &&
      !!profile?.cnicFrontImage &&
      !!profile?.cnicBackImage;

    const wasApproved = user.verificationStatus === VerificationStatus.APPROVED;

    if (
      wasApproved ||
      user.verificationStatus === VerificationStatus.INCOMPLETE
    ) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { verificationStatus: VerificationStatus.PENDING },
      });

      // Record history (unless a pending request already exists)
      const pendingRequest = await this.prisma.verificationRequest.findFirst({
        where: { providerId: userId, status: VerificationStatus.PENDING },
      });

      let requestId: string | undefined;
      if (!pendingRequest && sensitiveComplete) {
        // sensitiveComplete guarantees all four fields are non-null here
        const request = await this.prisma.verificationRequest.create({
          data: {
            providerId: userId,
            cnicNumber: profile?.cnicNumber ?? "",
            facePhoto: profile?.facePhoto ?? "",
            cnicFrontImage: profile?.cnicFrontImage ?? "",
            cnicBackImage: profile?.cnicBackImage ?? "",
            status: VerificationStatus.PENDING,
            submittedAt: new Date(),
          },
        });
        requestId = request.id;
      } else {
        requestId = pendingRequest?.id;
      }

      this.logger.log({
        eventType: "ADMIN_VERIFICATION_PENDING_RESET",
        providerId: userId,
        reason: "verification-sensitive information changed",
      });

      if (wasApproved) {
        void this.notifications.send({
          userId,
          type: NotificationType.VERIFICATION_RESUBMITTED,
          title: "Re-verification required 🔄",
          message:
            "Your verification documents changed. Your profile is pending re-verification.",
          relatedEntityType: "VERIFICATION_REQUEST",
          relatedEntityId: requestId,
        });
      }
    }
  }

  // ─── Provider: Status & History ─────────────────────────────────────

  async getStatus(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        verificationStatus: true,
        profileCompleted: true,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const latestRequest = await this.prisma.verificationRequest.findFirst({
      where: { providerId: userId },
      orderBy: { submittedAt: "desc" },
      select: {
        id: true,
        status: true,
        submittedAt: true,
        reviewedAt: true,
        rejectionReason: true,
      },
    });

    return {
      verificationStatus: user.verificationStatus,
      profileCompleted: user.profileCompleted,
      latestRequest,
    };
  }

  async getHistory(userId: string, query: VerificationQueryDto) {
    const { page = 1, limit = 10, status } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.VerificationRequestWhereInput = {
      providerId: userId,
      ...(status && { status }),
    };

    const [data, total] = await Promise.all([
      this.prisma.verificationRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: { submittedAt: "desc" },
      }),
      this.prisma.verificationRequest.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  // ─── Admin: List pending / filtered requests ────────────────────────

  async adminListRequests(query: VerificationQueryDto) {
    const { page = 1, limit = 10, status, providerId } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.VerificationRequestWhereInput = {
      ...(status && { status }),
      ...(providerId && { providerId }),
    };

    const [data, total] = await Promise.all([
      this.prisma.verificationRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: { submittedAt: "asc" },
        include: {
          provider: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
              profilePhoto: true,
              city: { select: { id: true, name: true } },
              providerProfile: {
                select: {
                  bio: true,
                  hourlyRate: true,
                  serviceLocation: true,
                  serviceRadius: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.verificationRequest.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  async adminGetRequest(requestId: string) {
    const request = await this.prisma.verificationRequest.findUnique({
      where: { id: requestId },
      include: {
        provider: {
          include: {
            providerProfile: {
              include: { categories: { include: { category: true } } },
            },
            city: true,
          },
        },
      },
    });

    if (!request) {
      throw new NotFoundException("Verification request not found");
    }

    return request;
  }

  // ─── Admin: Approve / Reject ────────────────────────────────────────

  async adminApprove(adminId: string, requestId: string) {
    const request = await this.prisma.verificationRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException("Verification request not found");
    }

    if (request.status !== VerificationStatus.PENDING) {
      throw new BadRequestException(
        `Only pending requests can be approved (current: ${request.status})`,
      );
    }

    const [updated] = await this.prisma.$transaction([
      this.prisma.verificationRequest.update({
        where: { id: requestId },
        data: {
          status: VerificationStatus.APPROVED,
          reviewedBy: adminId,
          reviewedAt: new Date(),
          rejectionReason: null,
        },
      }),
      this.prisma.user.update({
        where: { id: request.providerId },
        data: { verificationStatus: VerificationStatus.APPROVED },
      }),
    ]);

    this.logger.log({
      eventType: "ADMIN_VERIFICATION_APPROVED",
      requestId,
      providerId: request.providerId,
      reviewedBy: adminId,
    });

    // Approval enables bidding & booking (gated by verificationStatus)
    void this.notifications.send({
      userId: request.providerId,
      type: NotificationType.VERIFICATION_APPROVED,
      title: "Verification approved ✅",
      message:
        "Congratulations! Your profile is verified. You can now accept jobs and bookings.",
      relatedEntityType: "VERIFICATION_REQUEST",
      relatedEntityId: requestId,
    });

    return { message: "Verification request approved", request: updated };
  }

  async adminReject(adminId: string, requestId: string, reason: string) {
    const request = await this.prisma.verificationRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException("Verification request not found");
    }

    if (request.status !== VerificationStatus.PENDING) {
      throw new BadRequestException(
        `Only pending requests can be rejected (current: ${request.status})`,
      );
    }

    const [updated] = await this.prisma.$transaction([
      this.prisma.verificationRequest.update({
        where: { id: requestId },
        data: {
          status: VerificationStatus.REJECTED,
          reviewedBy: adminId,
          reviewedAt: new Date(),
          rejectionReason: reason,
        },
      }),
      this.prisma.user.update({
        where: { id: request.providerId },
        data: { verificationStatus: VerificationStatus.REJECTED },
      }),
    ]);

    this.logger.log({
      eventType: "ADMIN_VERIFICATION_REJECTED",
      requestId,
      providerId: request.providerId,
      reviewedBy: adminId,
      reason,
    });

    void this.notifications.send({
      userId: request.providerId,
      type: NotificationType.VERIFICATION_REJECTED,
      title: "Verification rejected ❌",
      message: `Your verification request was rejected. Reason: ${reason}`,
      relatedEntityType: "VERIFICATION_REQUEST",
      relatedEntityId: requestId,
    });

    return { message: "Verification request rejected", request: updated };
  }

  // ─── Admin: History ─────────────────────────────────────────────────

  async adminGetProviderHistory(
    providerId: string,
    query: VerificationQueryDto,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: providerId },
      select: { id: true, role: true },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }

    return this.getHistory(providerId, query);
  }

  // ─── Admin: Ban / Unban ─────────────────────────────────────────────

  async adminBan(adminId: string, providerId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: providerId },
      select: { id: true, role: true, verificationStatus: true },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }

    if (user.verificationStatus === VerificationStatus.BANNED) {
      throw new BadRequestException("Provider is already banned");
    }

    await this.prisma.user.update({
      where: { id: providerId },
      data: { verificationStatus: VerificationStatus.BANNED },
    });

    this.logger.log({
      eventType: "ADMIN_PROVIDER_BANNED",
      providerId,
      bannedBy: adminId,
    });

    void this.notifications.send({
      userId: providerId,
      type: NotificationType.VERIFICATION_BANNED,
      title: "Account banned 🚫",
      message:
        "Your provider account has been banned. You can no longer accept jobs or bookings.",
      relatedEntityType: "USER",
      relatedEntityId: providerId,
    });

    return {
      message: "Provider banned",
      verificationStatus: VerificationStatus.BANNED,
    };
  }

  async adminUnban(adminId: string, providerId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: providerId },
      select: { id: true, role: true, verificationStatus: true },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }

    if (user.verificationStatus !== VerificationStatus.BANNED) {
      throw new BadRequestException("Provider is not currently banned");
    }

    // Unbanned providers must go through verification again
    await this.prisma.user.update({
      where: { id: providerId },
      data: { verificationStatus: VerificationStatus.INCOMPLETE },
    });

    this.logger.log({
      eventType: "ADMIN_PROVIDER_UNBANNED",
      providerId,
      unbannedBy: adminId,
    });

    void this.notifications.send({
      userId: providerId,
      type: NotificationType.VERIFICATION_UNBANNED,
      title: "Account unbanned ✅",
      message:
        "Your ban has been lifted. Please resubmit your profile for verification to continue.",
      relatedEntityType: "USER",
      relatedEntityId: providerId,
    });

    return {
      message:
        "Provider unbanned. Verification status reset — resubmission required.",
      verificationStatus: VerificationStatus.INCOMPLETE,
    };
  }

  // ─── Helpers ────────────────────────────────────────────────────────

  private missingFields(profile: {
    facePhoto: string | null;
    cnicNumber: string | null;
    cnicFrontImage: string | null;
    cnicBackImage: string | null;
    bio: string | null;
    hourlyRate: unknown;
    serviceLocation: string | null;
    categories?: unknown[];
  }): string[] {
    const fields: { name: string; completed: boolean }[] = [
      { name: "facePhoto", completed: !!profile?.facePhoto },
      { name: "cnicNumber", completed: !!profile?.cnicNumber },
      { name: "cnicFrontImage", completed: !!profile?.cnicFrontImage },
      { name: "cnicBackImage", completed: !!profile?.cnicBackImage },
      { name: "bio", completed: !!profile?.bio },
      { name: "hourlyRate", completed: profile?.hourlyRate != null },
      { name: "serviceLocation", completed: !!profile?.serviceLocation },
      { name: "categories", completed: (profile?.categories?.length ?? 0) > 0 },
    ];

    return fields.filter((f) => !f.completed).map((f) => f.name);
  }
}
