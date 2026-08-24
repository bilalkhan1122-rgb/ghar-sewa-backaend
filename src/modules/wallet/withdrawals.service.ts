import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { Logger } from "nestjs-pino";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminAuditService } from "src/common/services/admin-audit.service";
import { NotificationsService } from "../notifications/notifications.service";
import { WalletService } from "./wallet.service";
import { CreateWithdrawalDto } from "./dtos/create-withdrawal.dto";
import { WithdrawalQueryDto } from "./dtos/withdrawal-query.dto";
import {
  Prisma,
  WithdrawalStatus,
  NotificationType,
  WalletType,
} from "generated/prisma/client";

const ACTIVE_STATUSES: WithdrawalStatus[] = [
  WithdrawalStatus.PENDING,
  WithdrawalStatus.APPROVED,
  WithdrawalStatus.PROCESSING,
];

/**
 * Module 15 — Withdrawals & Payouts.
 *
 * Phase 1 manual flow: the requested amount moves from the available
 * balance into the held balance on submission and is released only when
 * the withdrawal is rejected/cancelled, or settled permanently when
 * completed. Designed so Module 16 can automate payout processing.
 */
@Injectable()
export class WithdrawalsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    private readonly wallet: WalletService,
    private readonly logger: Logger,
    private readonly adminAudit: AdminAuditService,
  ) {}

  // ─── Provider: submit withdrawal request ─────────────────────────────

  async submitWithdrawal(providerId: string, dto: CreateWithdrawalDto) {
    const wallet = await this.wallet.ensureWallet(
      providerId,
      WalletType.PROVIDER,
    );

    const amount = new Prisma.Decimal(dto.amount).toDecimalPlaces(
      2,
      Prisma.Decimal.ROUND_HALF_UP,
    );

    if (amount.lt(this.wallet.minWithdrawal)) {
      throw new BadRequestException(
        `Minimum withdrawal amount is Rs. ${this.wallet.minWithdrawal.toString()}`,
      );
    }
    if (amount.gt(this.wallet.maxWithdrawal)) {
      throw new BadRequestException(
        `Maximum withdrawal amount is Rs. ${this.wallet.maxWithdrawal.toString()}`,
      );
    }

    const result = await this.prisma
      .$transaction(async (tx) => {
        // Re-check inside the transaction to narrow the race window for the
        // "only one active withdrawal" rule. A partial unique index backs
        // this up so concurrent duplicates fail with P2002.
        const active = await tx.withdrawalRequest.findFirst({
          where: { providerId, status: { in: ACTIVE_STATUSES } },
        });
        if (active) {
          throw new ConflictException(
            "You already have an active withdrawal request. Wait for it to be processed.",
          );
        }

        const created = await tx.withdrawalRequest.create({
          data: {
            providerId,
            walletId: wallet.id,
            amount,
            paymentMethod: dto.paymentMethod,
            accountName: dto.accountName,
            accountNumber: dto.accountNumber,
            bankName: dto.bankName,
            status: WithdrawalStatus.PENDING,
          },
        });

        // Move available → held and record the ledger entry. If the balance
        // is insufficient the whole transaction (incl. the request) rolls back.
        await this.wallet.hold(tx, wallet.id, amount, {
          referenceType: "WITHDRAWAL",
          referenceId: created.id,
          processingKey: `withdrawal:${created.id}`,
          description: `Withdrawal request for ${dto.paymentMethod}`,
        });

        await this.wallet.audit(tx, {
          walletId: wallet.id,
          actorUserId: providerId,
          action: "WITHDRAWAL_SUBMITTED",
          newValues: {
            amount: amount.toString(),
            paymentMethod: dto.paymentMethod,
            withdrawalId: created.id,
          },
          referenceType: "WITHDRAWAL",
          referenceId: created.id,
        });

        return created;
      })
      .catch((err: unknown) => {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === "P2002"
        ) {
          throw new ConflictException(
            "You already have an active withdrawal request. Wait for it to be processed.",
          );
        }
        throw err;
      });

    // Placeholder admin event for the payout queue (Module 16).
    this.logger.log({
      eventType: "ADMIN_WITHDRAWAL_SUBMITTED",
      withdrawalId: result.id,
      providerId,
      amount: amount.toString(),
    });

    void this.notifications.send({
      userId: providerId,
      type: NotificationType.WITHDRAWAL_REQUEST_SUBMITTED,
      title: "Withdrawal requested 💸",
      message: `Your withdrawal request of Rs. ${amount.toString()} is pending. Funds are held until approval.`,
      relatedEntityType: "WITHDRAWAL",
      relatedEntityId: result.id,
    });

    return result;
  }

  // ─── Provider: history & details ─────────────────────────────────────

  async listMyWithdrawals(providerId: string, query: WithdrawalQueryDto) {
    const { page = 1, limit = 10, status } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.WithdrawalRequestWhereInput = {
      providerId,
      ...(status && { status }),
    };

    const [data, total] = await Promise.all([
      this.prisma.withdrawalRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.withdrawalRequest.count({ where }),
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

  async getMyWithdrawal(providerId: string, withdrawalId: string) {
    const withdrawal = await this.prisma.withdrawalRequest.findFirst({
      where: { id: withdrawalId, providerId },
    });
    if (!withdrawal) {
      throw new NotFoundException("Withdrawal request not found");
    }
    return withdrawal;
  }

  // ─── Provider: cancel a pending request ──────────────────────────────

  async cancelWithdrawal(providerId: string, withdrawalId: string) {
    const withdrawal = await this.prisma.withdrawalRequest.findFirst({
      where: { id: withdrawalId, providerId },
    });
    if (!withdrawal) {
      throw new NotFoundException("Withdrawal request not found");
    }
    if (withdrawal.status !== WithdrawalStatus.PENDING) {
      throw new BadRequestException(
        `Only pending requests can be cancelled (current: ${withdrawal.status})`,
      );
    }

    const result = await this.prisma
      .$transaction(async (tx) => {
        const updated = await tx.withdrawalRequest.update({
          where: { id: withdrawalId },
          data: { status: WithdrawalStatus.CANCELLED },
        });

        await this.wallet.releaseHeld(
          tx,
          withdrawal.walletId,
          withdrawal.amount,
          {
            referenceType: "WITHDRAWAL",
            referenceId: withdrawalId,
            processingKey: `withdrawal-cancel:${withdrawalId}`,
            description: "Withdrawal cancelled by provider — funds released",
          },
        );

        await this.wallet.audit(tx, {
          walletId: withdrawal.walletId,
          actorUserId: providerId,
          action: "WITHDRAWAL_CANCELLED",
          newValues: { amount: withdrawal.amount.toString(), withdrawalId },
          referenceType: "WITHDRAWAL",
          referenceId: withdrawalId,
        });

        return updated;
      })
      .catch((err: unknown) => {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === "P2002"
        ) {
          throw new ConflictException("Withdrawal has already been cancelled");
        }
        throw err;
      });

    void this.notifications.send({
      userId: providerId,
      type: NotificationType.WITHDRAWAL_CANCELLED,
      title: "Withdrawal cancelled ↩️",
      message: `Your withdrawal of Rs. ${withdrawal.amount.toString()} was cancelled and funds returned to your available balance.`,
      relatedEntityType: "WITHDRAWAL",
      relatedEntityId: withdrawalId,
    });

    this.logger.log({
      message: "Withdrawal cancelled by provider",
      withdrawalId,
      providerId,
    });

    return result;
  }

  // ─── Admin: list / view ──────────────────────────────────────────────

  async adminListWithdrawals(query: WithdrawalQueryDto) {
    const { page = 1, limit = 10, status, search } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.WithdrawalRequestWhereInput = {
      ...(status && { status }),
      ...(search
        ? {
            OR: [
              {
                provider: {
                  fullName: { contains: search, mode: "insensitive" },
                },
              },
              { accountName: { contains: search, mode: "insensitive" } },
              { accountNumber: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.withdrawalRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          provider: {
            select: { id: true, fullName: true, email: true, phone: true },
          },
        },
      }),
      this.prisma.withdrawalRequest.count({ where }),
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

  async adminGetWithdrawal(withdrawalId: string) {
    const withdrawal = await this.prisma.withdrawalRequest.findUnique({
      where: { id: withdrawalId },
      include: {
        provider: {
          select: { id: true, fullName: true, email: true, phone: true },
        },
      },
    });
    if (!withdrawal) {
      throw new NotFoundException("Withdrawal request not found");
    }
    return withdrawal;
  }

  // ─── Admin: state machine ────────────────────────────────────────────

  private async assertExistsAndActive(withdrawalId: string) {
    const withdrawal = await this.prisma.withdrawalRequest.findUnique({
      where: { id: withdrawalId },
    });
    if (!withdrawal) {
      throw new NotFoundException("Withdrawal request not found");
    }
    if (!ACTIVE_STATUSES.includes(withdrawal.status)) {
      throw new BadRequestException(
        `Withdrawal is ${withdrawal.status.toLowerCase()} and cannot transition`,
      );
    }
    return withdrawal;
  }

  /** Approval keeps the funds held. */
  async adminApproveWithdrawal(
    adminId: string,
    withdrawalId: string,
    note?: string,
  ) {
    const withdrawal = await this.assertExistsAndActive(withdrawalId);
    if (withdrawal.status !== WithdrawalStatus.PENDING) {
      throw new BadRequestException(
        `Only pending withdrawals can be approved (current: ${withdrawal.status})`,
      );
    }

    const updated = await this.prisma.withdrawalRequest.update({
      where: { id: withdrawalId },
      data: {
        status: WithdrawalStatus.APPROVED,
        processedBy: adminId,
        notes: note ?? withdrawal.notes,
      },
    });

    await this.prisma.walletAuditLog.create({
      data: {
        walletId: withdrawal.walletId,
        actorAdminId: adminId,
        action: "WITHDRAWAL_APPROVED",
        newValues: { withdrawalId, amount: withdrawal.amount.toString() },
        referenceType: "WITHDRAWAL",
        referenceId: withdrawalId,
      },
    });

    void this.notifications.send({
      userId: withdrawal.providerId,
      type: NotificationType.WITHDRAWAL_APPROVED,
      title: "Withdrawal approved ✅",
      message: `Your withdrawal of Rs. ${withdrawal.amount.toString()} was approved and is being processed.`,
      relatedEntityType: "WITHDRAWAL",
      relatedEntityId: withdrawalId,
    });

    await this.adminAudit.record({
      adminId,
      action: "WITHDRAWAL_APPROVED",
      entityType: "WITHDRAWAL",
      entityId: withdrawalId,
      newValues: {
        providerId: withdrawal.providerId,
        amount: withdrawal.amount.toString(),
      },
    });

    return updated;
  }

  /** Processing records the processing timestamp. Funds remain held. */
  async adminMarkProcessing(
    adminId: string,
    withdrawalId: string,
    note?: string,
  ) {
    const withdrawal = await this.assertExistsAndActive(withdrawalId);
    if (withdrawal.status !== WithdrawalStatus.APPROVED) {
      throw new BadRequestException(
        `Only approved withdrawals can be marked processing (current: ${withdrawal.status})`,
      );
    }

    const updated = await this.prisma.withdrawalRequest.update({
      where: { id: withdrawalId },
      data: {
        status: WithdrawalStatus.PROCESSING,
        processedAt: new Date(),
        processedBy: adminId,
        notes: note ?? withdrawal.notes,
      },
    });

    void this.notifications.send({
      userId: withdrawal.providerId,
      type: NotificationType.WITHDRAWAL_PROCESSING,
      title: "Withdrawal in progress ⏳",
      message: `Your withdrawal of Rs. ${withdrawal.amount.toString()} is being processed.`,
      relatedEntityType: "WITHDRAWAL",
      relatedEntityId: withdrawalId,
    });

    await this.adminAudit.record({
      adminId,
      action: "WITHDRAWAL_PROCESSING",
      entityType: "WITHDRAWAL",
      entityId: withdrawalId,
      newValues: {
        providerId: withdrawal.providerId,
        amount: withdrawal.amount.toString(),
      },
    });

    return updated;
  }

  /** Completed: settles the held funds permanently + ledger entry. */
  async adminCompleteWithdrawal(
    adminId: string,
    withdrawalId: string,
    note?: string,
  ) {
    const withdrawal = await this.assertExistsAndActive(withdrawalId);
    if (withdrawal.status !== WithdrawalStatus.PROCESSING) {
      throw new BadRequestException(
        `Only processing withdrawals can be completed (current: ${withdrawal.status})`,
      );
    }

    const result = await this.prisma
      .$transaction(async (tx) => {
        const updated = await tx.withdrawalRequest.update({
          where: { id: withdrawalId },
          data: {
            status: WithdrawalStatus.COMPLETED,
            processedAt: new Date(),
            processedBy: adminId,
            notes: note ?? withdrawal.notes,
          },
        });

        await this.wallet.settleHeld(
          tx,
          withdrawal.walletId,
          withdrawal.amount,
          {
            referenceType: "WITHDRAWAL",
            referenceId: withdrawalId,
            processingKey: `withdrawal-complete:${withdrawalId}`,
            description: "Withdrawal paid out",
          },
        );

        await this.wallet.audit(tx, {
          walletId: withdrawal.walletId,
          actorAdminId: adminId,
          action: "WITHDRAWAL_COMPLETED",
          newValues: { amount: withdrawal.amount.toString(), withdrawalId },
          referenceType: "WITHDRAWAL",
          referenceId: withdrawalId,
        });

        return updated;
      })
      .catch((err: unknown) => {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === "P2002"
        ) {
          throw new ConflictException("Withdrawal has already been completed");
        }
        throw err;
      });

    void this.notifications.send({
      userId: withdrawal.providerId,
      type: NotificationType.WITHDRAWAL_COMPLETED,
      title: "Withdrawal completed 🎉",
      message: `Your withdrawal of Rs. ${withdrawal.amount.toString()} has been paid out.`,
      relatedEntityType: "WITHDRAWAL",
      relatedEntityId: withdrawalId,
    });

    await this.adminAudit.record({
      adminId,
      action: "WITHDRAWAL_COMPLETED",
      entityType: "WITHDRAWAL",
      entityId: withdrawalId,
      newValues: {
        providerId: withdrawal.providerId,
        amount: withdrawal.amount.toString(),
      },
    });

    this.logger.log({
      message: "Withdrawal completed",
      withdrawalId,
      providerId: withdrawal.providerId,
      amount: withdrawal.amount.toString(),
      processedBy: adminId,
    });

    return result;
  }

  /** Rejected: releases held funds back to the available balance. */
  async adminRejectWithdrawal(
    adminId: string,
    withdrawalId: string,
    reason: string,
  ) {
    const withdrawal = await this.assertExistsAndActive(withdrawalId);

    const result = await this.prisma
      .$transaction(async (tx) => {
        const updated = await tx.withdrawalRequest.update({
          where: { id: withdrawalId },
          data: {
            status: WithdrawalStatus.REJECTED,
            processedAt: new Date(),
            processedBy: adminId,
            notes: reason,
          },
        });

        await this.wallet.releaseHeld(
          tx,
          withdrawal.walletId,
          withdrawal.amount,
          {
            referenceType: "WITHDRAWAL",
            referenceId: withdrawalId,
            processingKey: `withdrawal-reject:${withdrawalId}`,
            description: `Withdrawal rejected — funds released. Reason: ${reason}`,
          },
        );

        await this.wallet.audit(tx, {
          walletId: withdrawal.walletId,
          actorAdminId: adminId,
          action: "WITHDRAWAL_REJECTED",
          newValues: {
            amount: withdrawal.amount.toString(),
            withdrawalId,
            reason,
          },
          referenceType: "WITHDRAWAL",
          referenceId: withdrawalId,
        });

        return updated;
      })
      .catch((err: unknown) => {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === "P2002"
        ) {
          throw new ConflictException("Withdrawal has already been rejected");
        }
        throw err;
      });

    void this.notifications.send({
      userId: withdrawal.providerId,
      type: NotificationType.WITHDRAWAL_REJECTED,
      title: "Withdrawal rejected ❌",
      message: `Your withdrawal of Rs. ${withdrawal.amount.toString()} was rejected. Reason: ${reason}. Funds returned to your available balance.`,
      relatedEntityType: "WITHDRAWAL",
      relatedEntityId: withdrawalId,
    });

    await this.adminAudit.record({
      adminId,
      action: "WITHDRAWAL_REJECTED",
      entityType: "WITHDRAWAL",
      entityId: withdrawalId,
      newValues: {
        providerId: withdrawal.providerId,
        amount: withdrawal.amount.toString(),
        reason,
      },
    });

    this.logger.log({
      message: "Withdrawal rejected",
      withdrawalId,
      providerId: withdrawal.providerId,
      reason,
      processedBy: adminId,
    });

    return result;
  }
}
