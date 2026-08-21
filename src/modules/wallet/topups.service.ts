import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { Logger } from "nestjs-pino";
import { PrismaService } from "src/prisma/prisma.service";
import { FileUploadService } from "src/common/services/file-upload.service";
import { AdminAuditService } from "src/common/services/admin-audit.service";
import { NotificationsService } from "../notifications/notifications.service";
import { WalletService } from "./wallet.service";
import { CreateTopUpDto } from "./dtos/create-topup.dto";
import { TopUpQueryDto } from "./dtos/topup-query.dto";
import {
  Prisma,
  TopUpStatus,
  WalletTransactionType,
  NotificationType,
} from "generated/prisma/client";

/**
 * Module 14 — Manual wallet top-ups (Phase 1). Customer submits a request
 * with proof; balance changes only after an admin approves it.
 */
@Injectable()
export class TopUpsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUpload: FileUploadService,
    private readonly notifications: NotificationsService,
    private readonly wallet: WalletService,
    private readonly logger: Logger,
    private readonly adminAudit: AdminAuditService,
  ) {}

  // ─── Customer: submit top-up request ─────────────────────────────────

  async submitTopUp(
    userId: string,
    dto: CreateTopUpDto,
    file?: Express.Multer.File,
  ) {
    const wallet = await this.wallet.ensureWallet(userId);

    const pending = await this.prisma.topUpRequest.findFirst({
      where: { userId, status: TopUpStatus.PENDING },
    });
    if (pending) {
      throw new ConflictException(
        "You already have a pending top-up request. Wait for it to be reviewed.",
      );
    }

    let proofImage: string | undefined;
    if (file) {
      this.fileUpload.validateEvidenceFile(file);
      proofImage = await this.fileUpload.uploadTopUpProof(file);
    }

    const request = await this.prisma.topUpRequest.create({
      data: {
        userId,
        walletId: wallet.id,
        amount: dto.amount,
        paymentMethod: dto.paymentMethod,
        transactionReference: dto.transactionReference,
        notes: dto.notes,
        proofImage,
      },
    });

    // Placeholder admin event — real admin queue/email system can hook here.
    this.logger.log({
      eventType: "ADMIN_TOPUP_SUBMITTED",
      topUpId: request.id,
      userId,
      amount: dto.amount,
    });

    void this.notifications.send({
      userId,
      type: NotificationType.WALLET_TOPUP_SUBMITTED,
      title: "Top-up request submitted 📥",
      message: `Your top-up request of Rs. ${dto.amount} is pending review.`,
      relatedEntityType: "TOP_UP",
      relatedEntityId: request.id,
    });

    return request;
  }

  // ─── Customer: history ───────────────────────────────────────────────

  async listMyTopUps(userId: string, query: TopUpQueryDto) {
    const { page = 1, limit = 10, status } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.TopUpRequestWhereInput = {
      userId,
      ...(status && { status }),
    };

    const [data, total] = await Promise.all([
      this.prisma.topUpRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.topUpRequest.count({ where }),
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

  async getMyTopUp(userId: string, topUpId: string) {
    const request = await this.prisma.topUpRequest.findFirst({
      where: { id: topUpId, userId },
    });
    if (!request) {
      throw new NotFoundException("Top-up request not found");
    }
    return request;
  }

  // ─── Admin ───────────────────────────────────────────────────────────

  async adminListTopUps(query: TopUpQueryDto) {
    const { page = 1, limit = 10, status } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.TopUpRequestWhereInput = {
      ...(status && { status }),
    };

    const [data, total] = await Promise.all([
      this.prisma.topUpRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { id: true, fullName: true, email: true, phone: true },
          },
        },
      }),
      this.prisma.topUpRequest.count({ where }),
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

  async adminGetTopUp(topUpId: string) {
    const request = await this.prisma.topUpRequest.findUnique({
      where: { id: topUpId },
      include: {
        user: {
          select: { id: true, fullName: true, email: true, phone: true },
        },
      },
    });
    if (!request) {
      throw new NotFoundException("Top-up request not found");
    }
    return request;
  }

  /** Approve: credits the customer wallet atomically with the status change. */
  async adminApproveTopUp(adminId: string, topUpId: string, note?: string) {
    const request = await this.prisma.topUpRequest.findUnique({
      where: { id: topUpId },
    });
    if (!request) {
      throw new NotFoundException("Top-up request not found");
    }
    if (request.status !== TopUpStatus.PENDING) {
      throw new BadRequestException(
        `Only pending requests can be approved (current: ${request.status})`,
      );
    }

    const result = await this.prisma
      .$transaction(async (tx) => {
        const updated = await tx.topUpRequest.update({
          where: { id: topUpId },
          data: {
            status: TopUpStatus.APPROVED,
            reviewedAt: new Date(),
            reviewedBy: adminId,
          },
        });

        await this.wallet.credit(
          tx,
          request.walletId,
          WalletTransactionType.TOP_UP,
          request.amount,
          {
            referenceType: "TOP_UP",
            referenceId: topUpId,
            processingKey: `topup:${topUpId}`,
            description: `Top-up approved${note ? ` — ${note}` : ""}`,
          },
        );

        await this.wallet.audit(tx, {
          walletId: request.walletId,
          actorAdminId: adminId,
          action: "TOPUP_APPROVED",
          newValues: {
            amount: request.amount.toString(),
            topUpId,
          },
          referenceType: "TOP_UP",
          referenceId: topUpId,
        });

        return updated;
      })
      .catch((err: unknown) => {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === "P2002"
        ) {
          throw new ConflictException("Top-up has already been approved");
        }
        throw err;
      });

    void this.notifications.send({
      userId: request.userId,
      type: NotificationType.WALLET_TOPUP_APPROVED,
      title: "Top-up approved ✅",
      message: `Rs. ${request.amount.toString()} has been added to your wallet.`,
      relatedEntityType: "TOP_UP",
      relatedEntityId: topUpId,
    });

    await this.adminAudit.record({
      adminId,
      action: "TOPUP_APPROVED",
      entityType: "TOP_UP",
      entityId: topUpId,
      newValues: { userId: request.userId, amount: request.amount.toString() },
    });

    this.logger.log({
      message: "Top-up approved",
      topUpId,
      userId: request.userId,
      amount: request.amount.toString(),
      reviewedBy: adminId,
    });

    // Money has landed, so anything this customer owes under POSTPAID can now
    // be paid out. Awaited rather than fired off: on Vercel a promise left
    // running after the response is killed, and the provider would never see
    // their money. A failure here must not fail the approval — the money is
    // already in the wallet and the reminder cron retries — so it is logged
    // and swallowed.
    try {
      const { count } = await this.wallet.settleDuePayments(request.userId);
      if (count > 0) {
        this.logger.log({
          message: "Settled outstanding bookings after top-up",
          userId: request.userId,
          settled: count,
        });
      }
    } catch (err) {
      const error = err as { message?: string };
      this.logger.error(
        { err: error, userId: request.userId },
        "Could not settle outstanding payments after top-up approval",
      );
    }

    return result;
  }

  /** Reject: no wallet change; stores the reason and notifies the customer. */
  async adminRejectTopUp(adminId: string, topUpId: string, reason: string) {
    const request = await this.prisma.topUpRequest.findUnique({
      where: { id: topUpId },
    });
    if (!request) {
      throw new NotFoundException("Top-up request not found");
    }
    if (request.status !== TopUpStatus.PENDING) {
      throw new BadRequestException(
        `Only pending requests can be rejected (current: ${request.status})`,
      );
    }

    const updated = await this.prisma.topUpRequest.update({
      where: { id: topUpId },
      data: {
        status: TopUpStatus.REJECTED,
        reviewedAt: new Date(),
        reviewedBy: adminId,
        rejectionReason: reason,
      },
    });

    void this.notifications.send({
      userId: request.userId,
      type: NotificationType.WALLET_TOPUP_REJECTED,
      title: "Top-up rejected ❌",
      message: `Your top-up request was rejected. Reason: ${reason}`,
      relatedEntityType: "TOP_UP",
      relatedEntityId: topUpId,
    });

    await this.adminAudit.record({
      adminId,
      action: "TOPUP_REJECTED",
      entityType: "TOP_UP",
      entityId: topUpId,
      newValues: { userId: request.userId, reason },
    });

    this.logger.log({
      message: "Top-up rejected",
      topUpId,
      userId: request.userId,
      reason,
      reviewedBy: adminId,
    });

    return updated;
  }
}
