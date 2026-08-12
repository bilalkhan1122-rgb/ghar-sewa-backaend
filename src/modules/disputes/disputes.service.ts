import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FileUploadService } from "src/common/services/file-upload.service";
import { NotificationsService } from "../notifications/notifications.service";
import { WalletService } from "../wallet/wallet.service";
import { RaiseDisputeDto } from "./dtos/raise-dispute.dto";
import { DisputeQueryDto } from "./dtos/dispute-query.dto";
import { RespondDisputeDto } from "./dtos/respond-dispute.dto";
import { ResolveDisputeDto } from "./dtos/resolve-dispute.dto";
import { UpdateDisputeStatusDto } from "./dtos/update-dispute-status.dto";
import { Logger } from "nestjs-pino";
import {
  Prisma,
  UserRole,
  BookingStatus,
  JobStatus,
  DisputeStatus,
  DisputeResolution,
  DisputeEvidenceType,
  NotificationType,
} from "generated/prisma/client";

/** Disputes may only be raised within 48h of customer confirmation. */
export const DISPUTE_WINDOW_HOURS = 48;
/** Maximum number of evidence files per dispute. */
export const MAX_DISPUTE_EVIDENCE = 5;

export const DISPUTE_TIMELINE_ACTIONS = {
  OPENED: "DISPUTE_OPENED",
  EVIDENCE_UPLOADED: "EVIDENCE_UPLOADED",
  RESPONSE_SUBMITTED: "RESPONSE_SUBMITTED",
  STATUS_CHANGED: "STATUS_CHANGED",
  RESOLUTION_APPLIED: "RESOLUTION_APPLIED",
  REJECTED: "DISPUTE_REJECTED",
} as const;

const ACTIVE_DISPUTE_STATUSES = [
  DisputeStatus.OPEN,
  DisputeStatus.UNDER_REVIEW,
  DisputeStatus.WAITING_FOR_RESPONSE,
];

@Injectable()
export class DisputesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUpload: FileUploadService,
    private readonly notifications: NotificationsService,
    private readonly wallet: WalletService,
    private readonly logger: Logger,
  ) {}

  // ─── Raise a dispute (customer or provider) ─────────────────────────

  async raiseDispute(userId: string, dto: RaiseDisputeDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: dto.bookingId },
      include: { job: true },
    });

    if (!booking) {
      throw new NotFoundException("Booking not found");
    }

    // Only the customer or the assigned provider may raise a dispute
    const isCustomer = booking.customerId === userId;
    const isProvider = booking.providerId === userId;
    if (!isCustomer && !isProvider) {
      throw new ForbiddenException("You are not part of this booking");
    }

    if (booking.status !== BookingStatus.COMPLETED) {
      throw new BadRequestException(
        `Disputes can only be raised for completed bookings (current: ${booking.status})`,
      );
    }

    // Dispute window: 48h after customer confirmation of completion
    const anchor = booking.confirmedAt ?? booking.completedAt;
    if (!anchor) {
      throw new BadRequestException(
        "Job must be completed and confirmed before a dispute can be raised",
      );
    }
    const windowEnd = new Date(
      anchor.getTime() + DISPUTE_WINDOW_HOURS * 60 * 60 * 1000,
    );
    if (new Date() > windowEnd) {
      throw new BadRequestException(
        `The dispute window (${DISPUTE_WINDOW_HOURS} hours after confirmation) has expired`,
      );
    }

    // One active dispute per booking
    const activeDispute = await this.prisma.dispute.findFirst({
      where: { bookingId: booking.id, status: { in: ACTIVE_DISPUTE_STATUSES } },
    });
    if (activeDispute) {
      throw new ConflictException("This booking already has an active dispute");
    }

    const opponentId = isCustomer ? booking.providerId : booking.customerId;

    const dispute = await this.prisma.$transaction(async (tx) => {
      const created = await tx.dispute.create({
        data: {
          bookingId: booking.id,
          jobId: booking.jobId,
          raisedById: userId,
          opponentId,
          reason: dto.reason,
          description: dto.description,
          status: DisputeStatus.OPEN,
        },
      });

      await tx.disputeTimeline.create({
        data: {
          disputeId: created.id,
          actorId: userId,
          action: DISPUTE_TIMELINE_ACTIONS.OPENED,
          description: `Dispute opened by ${isCustomer ? "customer" : "provider"}: ${dto.reason}`,
        },
      });

      // Booking/job become DISPUTED (read-only outside of dispute flows)
      await tx.booking.update({
        where: { id: booking.id },
        data: { status: BookingStatus.DISPUTED },
      });
      await tx.job.update({
        where: { id: booking.jobId },
        data: { status: JobStatus.DISPUTED },
      });

      return created;
    });

    this.logger.log({
      message: "Dispute raised",
      disputeId: dispute.id,
      bookingId: booking.id,
      jobId: booking.jobId,
      raisedBy: userId,
    });

    // Notify the opponent
    void this.notifications.send({
      userId: opponentId,
      type: NotificationType.DISPUTE_RAISED,
      title: "Dispute raised ⚖️",
      message: `A dispute has been raised on booking #${booking.id.slice(0, 8)}. Reason: ${dto.reason}`,
      relatedEntityType: "DISPUTE",
      relatedEntityId: dispute.id,
    });

    return dispute;
  }

  // ─── Upload evidence (either party) ─────────────────────────────────

  async uploadEvidence(
    userId: string,
    disputeId: string,
    file: Express.Multer.File,
  ) {
    const dispute = await this.assertPartyAccess(disputeId, userId);

    if (
      dispute.status === DisputeStatus.RESOLVED ||
      dispute.status === DisputeStatus.REJECTED
    ) {
      throw new BadRequestException(
        "Evidence cannot be uploaded after the dispute is closed",
      );
    }

    if (dispute.evidenceCount >= MAX_DISPUTE_EVIDENCE) {
      throw new BadRequestException(
        `Maximum ${MAX_DISPUTE_EVIDENCE} evidence files allowed per dispute`,
      );
    }

    this.fileUpload.validateEvidenceFile(file);
    const fileUrl = await this.fileUpload.uploadEvidenceFile(file);

    const evidence = await this.prisma.$transaction(async (tx) => {
      const created = await tx.disputeEvidence.create({
        data: {
          disputeId,
          uploaderId: userId,
          type: this.mapEvidenceType(file.mimetype),
          fileUrl,
          mimeType: file.mimetype,
          size: file.size,
        },
      });

      await tx.dispute.update({
        where: { id: disputeId },
        data: { evidenceCount: { increment: 1 } },
      });

      await tx.disputeTimeline.create({
        data: {
          disputeId,
          actorId: userId,
          action: DISPUTE_TIMELINE_ACTIONS.EVIDENCE_UPLOADED,
          description: `Evidence uploaded (${file.mimetype})`,
        },
      });

      return created;
    });

    // Notify the opponent that new evidence was submitted
    void this.notifications.send({
      userId: dispute.opponentId,
      type: NotificationType.DISPUTE_RESPONSE_RECEIVED,
      title: "New evidence submitted 📎",
      message: "The other party submitted new evidence to a dispute.",
      relatedEntityType: "DISPUTE",
      relatedEntityId: disputeId,
    });

    this.logger.log({
      message: "Dispute evidence uploaded",
      disputeId,
      evidenceId: evidence.id,
      uploaderId: userId,
    });

    return evidence;
  }

  // ─── View a single dispute (party) ──────────────────────────────────

  async getDispute(userId: string, disputeId: string) {
    await this.assertPartyAccess(disputeId, userId);

    return this.disputeWithDetails(disputeId);
  }

  // ─── List own disputes ──────────────────────────────────────────────

  async listMyDisputes(userId: string, query: DisputeQueryDto) {
    const { page = 1, limit = 10, status } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.DisputeWhereInput = {
      OR: [{ raisedById: userId }, { opponentId: userId }],
      ...(status && { status }),
    };

    const [data, total] = await Promise.all([
      this.prisma.dispute.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          booking: { select: { id: true, totalAmount: true, status: true } },
          job: { select: { id: true, title: true, status: true } },
          raisedBy: { select: { id: true, fullName: true, role: true } },
          opponent: { select: { id: true, fullName: true, role: true } },
        },
      }),
      this.prisma.dispute.count({ where }),
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

  // ─── Respond to a dispute (either party) ────────────────────────────

  async respond(userId: string, disputeId: string, dto: RespondDisputeDto) {
    const dispute = await this.assertPartyAccess(disputeId, userId);

    if (
      dispute.status === DisputeStatus.RESOLVED ||
      dispute.status === DisputeStatus.REJECTED
    ) {
      throw new BadRequestException(
        "Responses cannot be submitted after the dispute is closed",
      );
    }

    const timeline = await this.prisma.disputeTimeline.create({
      data: {
        disputeId,
        actorId: userId,
        action: DISPUTE_TIMELINE_ACTIONS.RESPONSE_SUBMITTED,
        description: dto.response,
      },
    });

    // Notify the opponent
    void this.notifications.send({
      userId: dispute.opponentId,
      type: NotificationType.DISPUTE_RESPONSE_RECEIVED,
      title: "New response submitted 💬",
      message: "The other party submitted a response to the dispute.",
      relatedEntityType: "DISPUTE",
      relatedEntityId: disputeId,
    });

    this.logger.log({
      message: "Dispute response submitted",
      disputeId,
      responderId: userId,
    });

    return timeline;
  }

  // ─── Dispute timeline (party) ───────────────────────────────────────

  async getDisputeHistory(userId: string, disputeId: string) {
    await this.assertPartyAccess(disputeId, userId);

    return this.prisma.disputeTimeline.findMany({
      where: { disputeId },
      orderBy: { createdAt: "asc" },
      include: {
        actor: { select: { id: true, fullName: true, role: true } },
      },
    });
  }

  // ─── Admin: List all disputes ───────────────────────────────────────

  async adminListDisputes(query: DisputeQueryDto) {
    const { page = 1, limit = 10, status } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.DisputeWhereInput = {
      ...(status && { status }),
    };

    const [data, total] = await Promise.all([
      this.prisma.dispute.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          booking: { select: { id: true, totalAmount: true, status: true } },
          job: { select: { id: true, title: true } },
          raisedBy: { select: { id: true, fullName: true, role: true } },
          opponent: { select: { id: true, fullName: true, role: true } },
          _count: { select: { evidences: true } },
        },
      }),
      this.prisma.dispute.count({ where }),
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

  // ─── Admin: View dispute detail (evidence + timeline + chat) ────────

  async adminGetDispute(disputeId: string) {
    return this.disputeWithDetails(disputeId);
  }

  async adminListEvidence(disputeId: string) {
    await this.ensureDisputeExists(disputeId);

    return this.prisma.disputeEvidence.findMany({
      where: { disputeId },
      orderBy: { createdAt: "asc" },
      include: {
        uploader: { select: { id: true, fullName: true, role: true } },
      },
    });
  }

  async adminGetTimeline(disputeId: string) {
    await this.ensureDisputeExists(disputeId);

    return this.prisma.disputeTimeline.findMany({
      where: { disputeId },
      orderBy: { createdAt: "asc" },
      include: {
        actor: { select: { id: true, fullName: true, role: true } },
      },
    });
  }

  async adminGetChatHistory(disputeId: string, page = 1, limit = 20) {
    const dispute = await this.ensureDisputeExists(disputeId);

    const conversation = await this.prisma.conversation.findFirst({
      where: { bookingId: dispute.bookingId },
    });

    if (!conversation) {
      return {
        conversation: null,
        data: [],
        meta: {
          total: 0,
          page,
          limit,
          totalPages: 0,
          hasNext: false,
          hasPrevious: false,
        },
      };
    }

    const skip = (page - 1) * limit;
    const where: Prisma.MessageWhereInput = {
      conversationId: conversation.id,
      deletedAt: null,
    };

    const [messages, total] = await Promise.all([
      this.prisma.message.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          sender: { select: { id: true, fullName: true, role: true } },
        },
      }),
      this.prisma.message.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      conversation: { id: conversation.id, jobId: conversation.jobId },
      data: messages.reverse(),
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

  // ─── Admin: Status transition ───────────────────────────────────────

  async adminUpdateStatus(
    adminId: string,
    disputeId: string,
    dto: UpdateDisputeStatusDto,
  ) {
    const dispute = await this.ensureDisputeExists(disputeId);

    if (
      dispute.status === DisputeStatus.RESOLVED ||
      dispute.status === DisputeStatus.REJECTED
    ) {
      throw new BadRequestException("Closed disputes cannot change status");
    }

    if (
      dto.status !== DisputeStatus.UNDER_REVIEW &&
      dto.status !== DisputeStatus.WAITING_FOR_RESPONSE &&
      dto.status !== DisputeStatus.OPEN
    ) {
      throw new BadRequestException(
        "Status can only be moved to OPEN, UNDER_REVIEW or WAITING_FOR_RESPONSE here",
      );
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      const result = await tx.dispute.update({
        where: { id: disputeId },
        data: { status: dto.status },
      });

      await tx.disputeTimeline.create({
        data: {
          disputeId,
          actorId: adminId,
          action: DISPUTE_TIMELINE_ACTIONS.STATUS_CHANGED,
          description: `Status changed to ${dto.status}${dto.note ? ` — ${dto.note}` : ""}`,
        },
      });

      return result;
    });

    await this.notifyParties(
      disputeId,
      NotificationType.DISPUTE_STATUS_UPDATED,
      "Dispute status updated 🔄",
      `The dispute status has been updated to ${dto.status.replace("_", " ")}.`,
    );

    return updated;
  }

  // ─── Admin: Resolve dispute ─────────────────────────────────────────

  async adminResolve(
    adminId: string,
    disputeId: string,
    dto: ResolveDisputeDto,
  ) {
    const dispute = await this.ensureDisputeExists(disputeId);

    if (
      dispute.status === DisputeStatus.RESOLVED ||
      dispute.status === DisputeStatus.REJECTED
    ) {
      throw new BadRequestException("This dispute is already closed");
    }

    if (
      (dto.resolution === DisputeResolution.FULL_REFUND ||
        dto.resolution === DisputeResolution.PARTIAL_REFUND) &&
      dto.refundAmount === undefined
    ) {
      throw new BadRequestException(
        "refundAmount is required for refund resolutions",
      );
    }

    if (
      dto.refundAmount !== undefined &&
      dto.refundAmount > Number(dispute.booking?.totalAmount ?? 0)
    ) {
      // Dispute may be fetched with booking relation in details — re-check
      const booking = await this.prisma.booking.findUnique({
        where: { id: dispute.bookingId },
        select: { totalAmount: true },
      });
      if (booking && dto.refundAmount > Number(booking.totalAmount)) {
        throw new BadRequestException(
          "refundAmount cannot exceed the booking total amount",
        );
      }
    }

    // Refund resolutions trigger the wallet refund flow (Module 14) BEFORE
    // the dispute is closed: if the refund cannot be processed (e.g. the
    // provider lacks funds), the dispute remains open and the admin sees
    // the error. FULL_REFUND returns the full booking amount; PARTIAL_REFUND
    // returns the specified refundAmount.
    if (
      dto.resolution === DisputeResolution.FULL_REFUND ||
      dto.resolution === DisputeResolution.PARTIAL_REFUND
    ) {
      const booking = await this.prisma.booking.findUnique({
        where: { id: dispute.bookingId },
        select: { customerId: true, providerId: true, totalAmount: true },
      });
      if (!booking) {
        throw new NotFoundException("Booking not found");
      }

      const refundAmount =
        dto.resolution === DisputeResolution.FULL_REFUND
          ? (dto.refundAmount ?? booking.totalAmount)
          : dto.refundAmount!;

      await this.wallet.processDisputeRefund({
        disputeId,
        bookingId: dispute.bookingId,
        customerId: booking.customerId,
        providerId: booking.providerId,
        amount: refundAmount,
        resolution: dto.resolution,
        adminId,
      });
    }

    const resolved = await this.prisma.$transaction(async (tx) => {
      const result = await tx.dispute.update({
        where: { id: disputeId },
        data: {
          status: DisputeStatus.RESOLVED,
          resolution: dto.resolution,
          refundAmount: dto.refundAmount,
          resolvedAt: new Date(),
          resolvedBy: adminId,
        },
      });

      await tx.disputeTimeline.create({
        data: {
          disputeId,
          actorId: adminId,
          action: DISPUTE_TIMELINE_ACTIONS.RESOLUTION_APPLIED,
          description: `Resolved with ${dto.resolution}${dto.note ? ` — ${dto.note}` : ""}`,
        },
      });

      // REDO_WORK reopens the booking so work can restart; otherwise the
      // booking/job return to their completed state.
      if (dto.resolution === DisputeResolution.REDO_WORK) {
        await tx.booking.update({
          where: { id: dispute.bookingId },
          data: { status: BookingStatus.ACCEPTED },
        });
        await tx.job.update({
          where: { id: dispute.jobId },
          data: { status: JobStatus.ACCEPTED },
        });
      } else {
        await tx.booking.update({
          where: { id: dispute.bookingId },
          data: { status: BookingStatus.COMPLETED },
        });
        await tx.job.update({
          where: { id: dispute.jobId },
          data: { status: JobStatus.COMPLETED },
        });
      }

      return result;
    });

    // Refunds (if any) were processed by the wallet module above — the
    // remaining resolutions (REDO_WORK / NO_REFUND) involve no transfers.
    this.logger.log({
      message: "Dispute resolution applied",
      disputeId,
      bookingId: dispute.bookingId,
      resolution: dto.resolution,
      refundAmount: dto.refundAmount ?? null,
      eventType: "DISPUTE_RESOLVED",
    });

    await this.notifyParties(
      disputeId,
      NotificationType.DISPUTE_RESOLVED,
      "Dispute resolved ✅",
      `The dispute has been resolved with: ${dto.resolution.replace("_", " ")}.`,
    );

    this.logger.log({
      message: "Dispute resolved",
      disputeId,
      resolvedBy: adminId,
      resolution: dto.resolution,
    });

    return { message: "Dispute resolved", dispute: resolved };
  }

  // ─── Admin: Reject dispute ──────────────────────────────────────────

  async adminReject(adminId: string, disputeId: string, reason: string) {
    const dispute = await this.ensureDisputeExists(disputeId);

    if (
      dispute.status === DisputeStatus.RESOLVED ||
      dispute.status === DisputeStatus.REJECTED
    ) {
      throw new BadRequestException("This dispute is already closed");
    }

    const rejected = await this.prisma.$transaction(async (tx) => {
      const result = await tx.dispute.update({
        where: { id: disputeId },
        data: {
          status: DisputeStatus.REJECTED,
          resolvedAt: new Date(),
          resolvedBy: adminId,
        },
      });

      await tx.disputeTimeline.create({
        data: {
          disputeId,
          actorId: adminId,
          action: DISPUTE_TIMELINE_ACTIONS.REJECTED,
          description: `Dispute rejected. Reason: ${reason}`,
        },
      });

      await tx.booking.update({
        where: { id: dispute.bookingId },
        data: { status: BookingStatus.COMPLETED },
      });
      await tx.job.update({
        where: { id: dispute.jobId },
        data: { status: JobStatus.COMPLETED },
      });

      return result;
    });

    await this.notifyParties(
      disputeId,
      NotificationType.DISPUTE_REJECTED,
      "Dispute rejected ❌",
      `The dispute was rejected. Reason: ${reason}`,
    );

    return { message: "Dispute rejected", dispute: rejected };
  }

  // ─── Helpers ────────────────────────────────────────────────────────

  private async assertPartyAccess(disputeId: string, userId: string) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
    });

    if (!dispute) {
      throw new NotFoundException("Dispute not found");
    }

    if (dispute.raisedById !== userId && dispute.opponentId !== userId) {
      throw new ForbiddenException("You are not part of this dispute");
    }

    return dispute;
  }

  private async ensureDisputeExists(disputeId: string) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      include: { booking: { select: { totalAmount: true } } },
    });

    if (!dispute) {
      throw new NotFoundException("Dispute not found");
    }

    return dispute;
  }

  private async disputeWithDetails(disputeId: string) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      include: {
        booking: {
          include: {
            job: {
              include: { category: true, images: true },
            },
            customer: {
              select: {
                id: true,
                fullName: true,
                phone: true,
                profilePhoto: true,
              },
            },
            provider: {
              select: {
                id: true,
                fullName: true,
                phone: true,
                profilePhoto: true,
                providerProfile: {
                  select: {
                    bio: true,
                    serviceLocation: true,
                    hourlyRate: true,
                  },
                },
              },
            },
          },
        },
        raisedBy: { select: { id: true, fullName: true, role: true } },
        opponent: { select: { id: true, fullName: true, role: true } },
        evidences: {
          orderBy: { createdAt: "asc" },
          include: {
            uploader: { select: { id: true, fullName: true, role: true } },
          },
        },
        timeline: {
          orderBy: { createdAt: "asc" },
          include: {
            actor: { select: { id: true, fullName: true, role: true } },
          },
        },
      },
    });

    if (!dispute) {
      throw new NotFoundException("Dispute not found");
    }

    return dispute;
  }

  private async notifyParties(
    disputeId: string,
    type: NotificationType,
    title: string,
    message: string,
  ) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      select: { raisedById: true, opponentId: true },
    });

    if (!dispute) return;

    await this.notifications.sendToMany([
      {
        userId: dispute.raisedById,
        type,
        title,
        message,
        relatedEntityType: "DISPUTE",
        relatedEntityId: disputeId,
      },
      {
        userId: dispute.opponentId,
        type,
        title,
        message,
        relatedEntityType: "DISPUTE",
        relatedEntityId: disputeId,
      },
    ]);
  }

  private mapEvidenceType(mimeType: string): DisputeEvidenceType {
    if (mimeType.startsWith("video/")) return DisputeEvidenceType.VIDEO;
    if (mimeType === "application/pdf") return DisputeEvidenceType.DOCUMENT;
    return DisputeEvidenceType.IMAGE;
  }

  assertAdminRole(role: UserRole): void {
    if (role !== UserRole.ADMIN) {
      throw new ForbiddenException("Admin access required");
    }
  }
}
