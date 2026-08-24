import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PrismaService } from "src/prisma/prisma.service";
import { FileUploadService } from "src/common/services/file-upload.service";
import { NotificationsService } from "../notifications/notifications.service";
import { CreateAppealDto } from "./dtos/create-appeal.dto";
import { PenaltyQueryDto, AppealQueryDto } from "./dtos/penalty-query.dto";
import { Logger } from "nestjs-pino";
import {
  Prisma,
  UserRole,
  UserStatus,
  VerificationStatus,
  PenaltyType,
  AppealStatus,
  NotificationType,
  CancellationType,
} from "generated/prisma/client";
import { hasRole } from "src/common/roles";

/** Second offence only counts inside a rolling 30-day window. */
export const PENALTY_WINDOW_DAYS = 30;
/** Temporary ban duration for a second cancellation. */
export const SUSPENSION_DAYS = 7;

const PROVIDER_CANCELLATION_WHERE: Prisma.CancellationRecordWhereInput = {
  OR: [
    { cancelledBy: "PROVIDER" },
    { cancellationType: CancellationType.PROVIDER },
  ],
};

@Injectable()
export class PenaltiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUpload: FileUploadService,
    private readonly notifications: NotificationsService,
    private readonly logger: Logger,
  ) {}

  // ─── Automatic Penalty Engine ───────────────────────────────────────

  /**
   * Runs whenever a provider cancels an accepted booking (called from the
   * booking module). Counts previous cancellations, determines the
   * applicable penalty, creates the penalty record and updates provider
   * status if required.
   */
  async evaluateProviderCancellation(
    providerId: string,
    cancellationId: string,
    reason: string,
  ) {
    const now = new Date();
    const windowStart = new Date(
      now.getTime() - PENALTY_WINDOW_DAYS * 24 * 60 * 60 * 1000,
    );

    const [totalCancellations, cancellationsInWindow] = await Promise.all([
      this.prisma.cancellationRecord.count({
        where: { ...PROVIDER_CANCELLATION_WHERE, booking: { providerId } },
      }),
      this.prisma.cancellationRecord.count({
        where: {
          ...PROVIDER_CANCELLATION_WHERE,
          booking: { providerId },
          createdAt: { gte: windowStart },
        },
      }),
    ]);

    let penaltyType: PenaltyType;
    let penaltyReason: string;

    // Policy:
    //   1st cancellation          → warning only
    //   2nd within 30 days        → 7-day suspension
    //   2nd outside the window    → treated as a fresh warning
    //   3rd cancellation          → permanent ban
    if (totalCancellations >= 3) {
      penaltyType = PenaltyType.PERMANENT_BAN;
      penaltyReason =
        `Third provider cancellation (${totalCancellations} total). Policy: permanent ban. ${reason}`.trim();
    } else if (totalCancellations === 2 && cancellationsInWindow >= 2) {
      penaltyType = PenaltyType.TEMPORARY_BAN;
      penaltyReason =
        `Second provider cancellation within ${PENALTY_WINDOW_DAYS} days. Policy: ${SUSPENSION_DAYS}-day suspension. ${reason}`.trim();
    } else {
      penaltyType = PenaltyType.WARNING;
      penaltyReason =
        `Provider cancellation (${totalCancellations} total). Policy: warning issued. ${reason}`.trim();
    }

    const endDate =
      penaltyType === PenaltyType.TEMPORARY_BAN
        ? new Date(now.getTime() + SUSPENSION_DAYS * 24 * 60 * 60 * 1000)
        : null;

    const penalty = await this.prisma.$transaction(async (tx) => {
      const created = await tx.providerPenalty.create({
        data: {
          providerId,
          penaltyType,
          reason: penaltyReason,
          startDate: now,
          endDate,
          active: true,
        },
      });

      await tx.cancellationRecord.update({
        where: { id: cancellationId },
        data: { penaltyApplied: true, penaltyId: created.id },
      });

      // Update user status when required
      if (penaltyType === PenaltyType.TEMPORARY_BAN) {
        await tx.user.update({
          where: { id: providerId },
          data: { status: UserStatus.SUSPENDED },
        });
      } else if (penaltyType === PenaltyType.PERMANENT_BAN) {
        await tx.user.update({
          where: { id: providerId },
          data: {
            status: UserStatus.BANNED,
            verificationStatus: VerificationStatus.BANNED,
          },
        });
      }

      return created;
    });

    this.logger.log({
      message: "Provider penalty applied",
      providerId,
      cancellationId,
      penaltyId: penalty.id,
      penaltyType,
      totalCancellations,
      cancellationsInWindow,
    });

    // Notifications
    const notificationMap: Record<PenaltyType, NotificationType> = {
      [PenaltyType.WARNING]: NotificationType.PENALTY_WARNING,
      [PenaltyType.TEMPORARY_BAN]: NotificationType.PENALTY_SUSPENSION_STARTED,
      [PenaltyType.PERMANENT_BAN]: NotificationType.PENALTY_PERMANENT_BAN,
    };
    const titleMap: Record<PenaltyType, string> = {
      [PenaltyType.WARNING]: "Cancellation warning ⚠️",
      [PenaltyType.TEMPORARY_BAN]: "Account suspended 🕒",
      [PenaltyType.PERMANENT_BAN]: "Account permanently banned 🚫",
    };
    const messageMap: Record<PenaltyType, string> = {
      [PenaltyType.WARNING]:
        "You received a warning for cancelling an accepted job. Repeated cancellations lead to suspension.",
      [PenaltyType.TEMPORARY_BAN]: `You are suspended from taking new jobs for ${SUSPENSION_DAYS} days due to repeated cancellations.`,
      [PenaltyType.PERMANENT_BAN]:
        "Your account has been permanently banned due to repeated cancellations.",
    };

    void this.notifications.send({
      userId: providerId,
      type: notificationMap[penaltyType],
      title: titleMap[penaltyType],
      message: messageMap[penaltyType],
      relatedEntityType: "PENALTY",
      relatedEntityId: penalty.id,
    });

    return penalty;
  }

  /**
   * Blocks suspended / banned providers from bidding, accepting bookings
   * and appearing in provider searches. Also lazily expires finished
   * suspensions so providers are restored automatically.
   */
  async assertProviderEligible(providerId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: providerId },
      select: {
        id: true,
        role: true,
        roles: true,
        status: true,
        verificationStatus: true,
      },
    });

    if (!user || !hasRole(user, UserRole.PROVIDER)) {
      throw new NotFoundException("Provider not found");
    }

    if (user.verificationStatus === VerificationStatus.BANNED) {
      throw new ForbiddenException(
        "Your account is banned. You cannot participate in new jobs.",
      );
    }

    // Lazy suspension expiry: if the active temporary ban has ended, lift it.
    if (user.status === UserStatus.SUSPENDED) {
      const activeSuspension = await this.prisma.providerPenalty.findFirst({
        where: {
          providerId,
          penaltyType: PenaltyType.TEMPORARY_BAN,
          active: true,
          endDate: { lte: new Date() },
        },
      });

      if (activeSuspension) {
        await this.liftSuspension(activeSuspension.id, providerId);
      } else {
        const stillActive = await this.prisma.providerPenalty.findFirst({
          where: {
            providerId,
            penaltyType: PenaltyType.TEMPORARY_BAN,
            active: true,
          },
        });
        if (stillActive) {
          throw new ForbiddenException(
            `Your account is suspended until ${stillActive.endDate?.toISOString()}. You cannot accept new jobs.`,
          );
        }
      }
    }

    if (user.status === UserStatus.BANNED) {
      throw new ForbiddenException(
        "Your account is banned. You cannot participate in new jobs.",
      );
    }
  }

  /**
   * Scheduled job (daily) that expires finished suspensions and restores
   * providers to ACTIVE.
   */
  @Cron("5 0 * * *")
  async expireSuspensions(): Promise<number> {
    const expired = await this.prisma.providerPenalty.findMany({
      where: {
        penaltyType: PenaltyType.TEMPORARY_BAN,
        active: true,
        endDate: { lte: new Date() },
      },
      select: { id: true, providerId: true },
    });

    for (const penalty of expired) {
      await this.liftSuspension(penalty.id, penalty.providerId);
    }

    if (expired.length > 0) {
      this.logger.log({
        message: "Expired provider suspensions",
        count: expired.length,
      });
    }

    return expired.length;
  }

  private async liftSuspension(penaltyId: string, providerId: string) {
    await this.prisma.$transaction([
      this.prisma.providerPenalty.update({
        where: { id: penaltyId },
        data: { active: false },
      }),
      this.prisma.user.update({
        where: { id: providerId },
        data: { status: UserStatus.ACTIVE },
      }),
    ]);

    void this.notifications.send({
      userId: providerId,
      type: NotificationType.PENALTY_SUSPENSION_ENDED,
      title: "Suspension lifted ✅",
      message: "Your suspension has ended. You can accept new jobs again.",
      relatedEntityType: "PENALTY",
      relatedEntityId: penaltyId,
    });
  }

  // ─── Provider: Penalty & cancellation history ───────────────────────

  async listProviderPenalties(providerId: string, query: PenaltyQueryDto) {
    const { page = 1, limit = 10, type } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ProviderPenaltyWhereInput = {
      providerId,
      ...(type && { penaltyType: type }),
    };

    const [data, total] = await Promise.all([
      this.prisma.providerPenalty.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          cancellations: {
            select: {
              id: true,
              bookingId: true,
              createdAt: true,
              reason: true,
            },
          },
        },
      }),
      this.prisma.providerPenalty.count({ where }),
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

  async getActivePenalties(providerId: string) {
    return this.prisma.providerPenalty.findMany({
      where: { providerId, active: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async listProviderCancellations(providerId: string, query: PenaltyQueryDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.CancellationRecordWhereInput = {
      ...PROVIDER_CANCELLATION_WHERE,
      booking: { providerId },
    };

    const [data, total] = await Promise.all([
      this.prisma.cancellationRecord.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { penalty: true },
      }),
      this.prisma.cancellationRecord.count({ where }),
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

  // ─── Appeals ────────────────────────────────────────────────────────

  async createAppeal(
    providerId: string,
    dto: CreateAppealDto,
    file?: Express.Multer.File,
  ) {
    const penalty = await this.prisma.providerPenalty.findUnique({
      where: { id: dto.penaltyId },
    });

    if (!penalty || penalty.providerId !== providerId) {
      throw new NotFoundException("Penalty not found");
    }

    const existing = await this.prisma.appeal.findFirst({
      where: { penaltyId: dto.penaltyId, status: AppealStatus.PENDING },
    });
    if (existing) {
      throw new ConflictException(
        "An appeal for this penalty is already pending",
      );
    }

    let supportingFile: string | undefined;
    if (file) {
      this.fileUpload.validateEvidenceFile(file);
      supportingFile = await this.fileUpload.uploadAppealFile(file);
    }

    const appeal = await this.prisma.appeal.create({
      data: {
        penaltyId: dto.penaltyId,
        providerId,
        explanation: dto.explanation,
        supportingFile,
        status: AppealStatus.PENDING,
      },
      include: { penalty: true },
    });

    this.logger.log({
      message: "Appeal submitted",
      appealId: appeal.id,
      providerId,
      penaltyId: dto.penaltyId,
    });

    return appeal;
  }

  async getMyAppeal(providerId: string, appealId: string) {
    const appeal = await this.prisma.appeal.findFirst({
      where: { id: appealId, providerId },
      include: { penalty: true },
    });

    if (!appeal) {
      throw new NotFoundException("Appeal not found");
    }

    return appeal;
  }

  async listMyAppeals(providerId: string, query: AppealQueryDto) {
    const { page = 1, limit = 10, status } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.AppealWhereInput = {
      providerId,
      ...(status && { status }),
    };

    const [data, total] = await Promise.all([
      this.prisma.appeal.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { penalty: true },
      }),
      this.prisma.appeal.count({ where }),
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

  // ─── Admin: Appeals ─────────────────────────────────────────────────

  async adminListAppeals(query: AppealQueryDto) {
    const { page = 1, limit = 10, status } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.AppealWhereInput = {
      ...(status && { status }),
    };

    const [data, total] = await Promise.all([
      this.prisma.appeal.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          penalty: true,
          provider: {
            select: { id: true, fullName: true, email: true, phone: true },
          },
        },
      }),
      this.prisma.appeal.count({ where }),
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

  async adminGetAppeal(appealId: string) {
    const appeal = await this.prisma.appeal.findUnique({
      where: { id: appealId },
      include: {
        penalty: true,
        provider: {
          select: { id: true, fullName: true, email: true, phone: true },
        },
      },
    });

    if (!appeal) {
      throw new NotFoundException("Appeal not found");
    }

    return appeal;
  }

  async adminApproveAppeal(adminId: string, appealId: string, note?: string) {
    const appeal = await this.prisma.appeal.findUnique({
      where: { id: appealId },
      include: { penalty: true },
    });

    if (!appeal) {
      throw new NotFoundException("Appeal not found");
    }

    if (appeal.status !== AppealStatus.PENDING) {
      throw new BadRequestException(
        `Only pending appeals can be approved (current: ${appeal.status})`,
      );
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.appeal.update({
        where: { id: appealId },
        data: {
          status: AppealStatus.APPROVED,
          reviewedBy: adminId,
          reviewedAt: new Date(),
          adminNote: note,
        },
      });

      // Lift the applicable active suspension / ban
      if (appeal.penalty.active) {
        await tx.providerPenalty.update({
          where: { id: appeal.penaltyId },
          data: { active: false },
        });
      }

      if (appeal.penalty.penaltyType === PenaltyType.PERMANENT_BAN) {
        // Unban — provider must re-verify before working again
        await tx.user.update({
          where: { id: appeal.providerId },
          data: {
            status: UserStatus.ACTIVE,
            verificationStatus: VerificationStatus.INCOMPLETE,
          },
        });
      } else if (appeal.penalty.penaltyType === PenaltyType.TEMPORARY_BAN) {
        await tx.user.update({
          where: { id: appeal.providerId },
          data: { status: UserStatus.ACTIVE },
        });
      }
    });

    void this.notifications.send({
      userId: appeal.providerId,
      type: NotificationType.APPEAL_APPROVED,
      title: "Appeal approved ✅",
      message:
        appeal.penalty.penaltyType === PenaltyType.PERMANENT_BAN
          ? "Your appeal was approved and your ban has been lifted. Please re-submit your profile for verification."
          : "Your appeal was approved and the penalty has been lifted.",
      relatedEntityType: "APPEAL",
      relatedEntityId: appealId,
    });

    this.logger.log({
      message: "Appeal approved",
      appealId,
      reviewedBy: adminId,
      penaltyId: appeal.penaltyId,
    });

    return { message: "Appeal approved", appealId };
  }

  async adminRejectAppeal(adminId: string, appealId: string, note: string) {
    const appeal = await this.prisma.appeal.findUnique({
      where: { id: appealId },
    });

    if (!appeal) {
      throw new NotFoundException("Appeal not found");
    }

    if (appeal.status !== AppealStatus.PENDING) {
      throw new BadRequestException(
        `Only pending appeals can be rejected (current: ${appeal.status})`,
      );
    }

    await this.prisma.appeal.update({
      where: { id: appealId },
      data: {
        status: AppealStatus.REJECTED,
        reviewedBy: adminId,
        reviewedAt: new Date(),
        adminNote: note,
      },
    });

    void this.notifications.send({
      userId: appeal.providerId,
      type: NotificationType.APPEAL_REJECTED,
      title: "Appeal rejected ❌",
      message: `Your appeal was rejected. Note: ${note}`,
      relatedEntityType: "APPEAL",
      relatedEntityId: appealId,
    });

    this.logger.log({
      message: "Appeal rejected",
      appealId,
      reviewedBy: adminId,
      note,
    });

    return { message: "Appeal rejected", appealId };
  }

  // ─── Admin: All penalty records ─────────────────────────────────────

  async adminListAllPenalties(query: PenaltyQueryDto) {
    const { page = 1, limit = 10, type } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ProviderPenaltyWhereInput = {
      ...(type && { penaltyType: type }),
    };

    const [data, total] = await Promise.all([
      this.prisma.providerPenalty.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          provider: {
            select: { id: true, fullName: true, email: true, phone: true },
          },
          cancellations: {
            select: { id: true, bookingId: true, createdAt: true },
          },
          appeals: { select: { id: true, status: true, createdAt: true } },
        },
      }),
      this.prisma.providerPenalty.count({ where }),
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

  async adminGetProviderPenalties(providerId: string, query: PenaltyQueryDto) {
    return this.listProviderPenalties(providerId, query);
  }
}
