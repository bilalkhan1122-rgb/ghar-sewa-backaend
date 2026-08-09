import {
  Injectable,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { AdminAuditService } from 'src/common/services/admin-audit.service';
import { WalletTransactionQueryDto } from './dtos/wallet-transaction-query.dto';
import {
  Prisma,
  UserRole,
  Wallet,
  WalletType,
  WalletStatus,
  WalletTransactionType,
  WalletTransactionStatus,
  DisputeResolution,
  NotificationType,
} from 'generated/prisma/client';

/** Default platform commission rate (7.5%) — overridable via COMMISSION_RATE. */
export const DEFAULT_COMMISSION_RATE = 0.075;
/** Default withdrawal bounds — overridable via WITHDRAWAL_MIN / WITHDRAWAL_MAX. */
export const DEFAULT_MIN_WITHDRAWAL = 500;
export const DEFAULT_MAX_WITHDRAWAL = 100000;

type Tx = Prisma.TransactionClient;

export interface LedgerExtra {
  referenceType?: string;
  referenceId?: string;
  processingKey?: string;
  description?: string;
}

export interface AuditInput {
  walletId: string;
  actorUserId?: string | null;
  actorAdminId?: string | null;
  action: string;
  previousValues?: Prisma.InputJsonValue;
  newValues?: Prisma.InputJsonValue;
  referenceType?: string | null;
  referenceId?: string | null;
}

/**
 * Module 14 — Wallet System.
 *
 * Every registered user (customer or provider) has a Wallet. All balance
 * changes go through this service and are recorded in the immutable
 * WalletTransaction ledger. Wallet balances are cached columns on Wallet,
 * updated atomically inside the same DB transaction as the ledger row so
 * the ledger always reconciles with the cached balance.
 *
 * Ledger semantics: `amount` is signed (positive = credit, negative =
 * debit). `balanceBefore`/`balanceAfter` refer to the account affected by
 * the operation — the available balance for standard operations, and the
 * held balance for WITHDRAWAL_COMPLETED settlements.
 */
@Injectable()
export class WalletService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly logger: Logger,
    private readonly notifications: NotificationsService,
    private readonly adminAudit: AdminAuditService,
  ) {}

  // ─── Configuration ───────────────────────────────────────────────────

  get commissionRate(): number {
    const raw = this.config.get<string>('COMMISSION_RATE');
    const parsed = raw === undefined ? DEFAULT_COMMISSION_RATE : Number(raw);
    return Number.isFinite(parsed) && parsed >= 0 && parsed < 1
      ? parsed
      : DEFAULT_COMMISSION_RATE;
  }

  get minWithdrawal(): Prisma.Decimal {
    const raw = this.config.get<string>('WITHDRAWAL_MIN');
    const parsed = raw === undefined ? DEFAULT_MIN_WITHDRAWAL : Number(raw);
    return new Prisma.Decimal(
      Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_MIN_WITHDRAWAL,
    );
  }

  get maxWithdrawal(): Prisma.Decimal {
    const raw = this.config.get<string>('WITHDRAWAL_MAX');
    const parsed = raw === undefined ? DEFAULT_MAX_WITHDRAWAL : Number(raw);
    return new Prisma.Decimal(
      Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_MAX_WITHDRAWAL,
    );
  }

  // ─── Wallet creation / lookup ────────────────────────────────────────

  /**
   * Every registered customer/provider automatically has a wallet. This is
   * called on registration and lazily from every wallet entry point so
   * pre-existing accounts (backfilled by migration) are always covered.
   */
  async ensureWallet(userId: string): Promise<Wallet> {
    const existing = await this.prisma.wallet.findUnique({
      where: { userId },
    });
    if (existing) return existing;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.role === UserRole.ADMIN) {
      throw new ForbiddenException('Admins do not have wallets');
    }

    const type =
      user.role === UserRole.PROVIDER
        ? WalletType.PROVIDER
        : WalletType.CUSTOMER;

    return this.prisma.wallet.upsert({
      where: { userId },
      create: { userId, type },
      update: {},
    });
  }

  private assertActive(wallet: { status: WalletStatus }) {
    if (wallet.status !== WalletStatus.ACTIVE) {
      throw new ForbiddenException(
        `Wallet is ${wallet.status.toLowerCase()}. Wallet operations are blocked.`,
      );
    }
  }

  // ─── Ledger primitives (call within an interactive transaction) ──────

  /**
   * Credit the available balance. Never throws for negative balances
   * (credits always increase). Creates a COMPLETED ledger row.
   */
  async credit(
    tx: Tx,
    walletId: string,
    type: WalletTransactionType,
    amount: Prisma.Decimal | number | string,
    extra: LedgerExtra = {},
  ) {
    const amountDec = new Prisma.Decimal(amount).toDecimalPlaces(
      2,
      Prisma.Decimal.ROUND_HALF_UP,
    );
    if (amountDec.lte(0)) {
      throw new BadRequestException('Credit amount must be positive');
    }

    const wallet = await tx.wallet.findUniqueOrThrow({
      where: { id: walletId },
    });
    this.assertActive(wallet);
    const before = wallet.balance;

    await tx.wallet.update({
      where: { id: walletId },
      data: {
        balance: { increment: amountDec },
        lifetimeCredits: { increment: amountDec },
      },
    });

    return tx.walletTransaction.create({
      data: {
        walletId,
        type,
        amount: amountDec,
        balanceBefore: before,
        balanceAfter: before.plus(amountDec),
        referenceType: extra.referenceType,
        referenceId: extra.referenceId,
        processingKey: extra.processingKey,
        description: extra.description,
        status: WalletTransactionStatus.COMPLETED,
      },
    });
  }

  /**
   * Debit the available balance. Uses a conditional UPDATE so the balance
   * can never go negative, even under concurrent requests.
   */
  async debit(
    tx: Tx,
    walletId: string,
    type: WalletTransactionType,
    amount: Prisma.Decimal | number | string,
    extra: LedgerExtra = {},
  ) {
    const amountDec = new Prisma.Decimal(amount).toDecimalPlaces(
      2,
      Prisma.Decimal.ROUND_HALF_UP,
    );
    if (amountDec.lte(0)) {
      throw new BadRequestException('Debit amount must be positive');
    }

    const wallet = await tx.wallet.findUniqueOrThrow({
      where: { id: walletId },
    });
    this.assertActive(wallet);
    const before = wallet.balance;

    const result = await tx.wallet.updateMany({
      where: { id: walletId, balance: { gte: amountDec } },
      data: {
        balance: { decrement: amountDec },
        lifetimeDebits: { increment: amountDec },
      },
    });
    if (result.count !== 1) {
      throw new BadRequestException('Insufficient wallet balance');
    }

    return tx.walletTransaction.create({
      data: {
        walletId,
        type,
        amount: amountDec.negated(),
        balanceBefore: before,
        balanceAfter: before.minus(amountDec),
        referenceType: extra.referenceType,
        referenceId: extra.referenceId,
        processingKey: extra.processingKey,
        description: extra.description,
        status: WalletTransactionStatus.COMPLETED,
      },
    });
  }

  /**
   * Move funds from available balance to held balance (withdrawal request).
   * Ledger entry: WITHDRAWAL_REQUEST (debit of the available balance).
   */
  async hold(
    tx: Tx,
    walletId: string,
    amount: Prisma.Decimal | number | string,
    extra: LedgerExtra = {},
  ) {
    const amountDec = new Prisma.Decimal(amount).toDecimalPlaces(
      2,
      Prisma.Decimal.ROUND_HALF_UP,
    );

    const wallet = await tx.wallet.findUniqueOrThrow({
      where: { id: walletId },
    });
    this.assertActive(wallet);
    const before = wallet.balance;

    const result = await tx.wallet.updateMany({
      where: { id: walletId, balance: { gte: amountDec } },
      data: {
        balance: { decrement: amountDec },
        heldBalance: { increment: amountDec },
      },
    });
    if (result.count !== 1) {
      throw new BadRequestException('Insufficient available balance');
    }

    return tx.walletTransaction.create({
      data: {
        walletId,
        type: WalletTransactionType.WITHDRAWAL_REQUEST,
        amount: amountDec.negated(),
        balanceBefore: before,
        balanceAfter: before.minus(amountDec),
        referenceType: extra.referenceType,
        referenceId: extra.referenceId,
        processingKey: extra.processingKey,
        description: extra.description,
        status: WalletTransactionStatus.COMPLETED,
      },
    });
  }

  /**
   * Return held funds to the available balance (withdrawal rejected or
   * cancelled). Ledger entry: WITHDRAWAL_REJECTED (credit of available).
   */
  async releaseHeld(
    tx: Tx,
    walletId: string,
    amount: Prisma.Decimal | number | string,
    extra: LedgerExtra = {},
  ) {
    const amountDec = new Prisma.Decimal(amount).toDecimalPlaces(
      2,
      Prisma.Decimal.ROUND_HALF_UP,
    );

    const wallet = await tx.wallet.findUniqueOrThrow({
      where: { id: walletId },
    });
    this.assertActive(wallet);
    const before = wallet.balance;

    const result = await tx.wallet.updateMany({
      where: { id: walletId, heldBalance: { gte: amountDec } },
      data: {
        heldBalance: { decrement: amountDec },
        balance: { increment: amountDec },
      },
    });
    if (result.count !== 1) {
      throw new BadRequestException('Held balance is insufficient');
    }

    return tx.walletTransaction.create({
      data: {
        walletId,
        type: WalletTransactionType.WITHDRAWAL_REJECTED,
        amount: amountDec,
        balanceBefore: before,
        balanceAfter: before.plus(amountDec),
        referenceType: extra.referenceType,
        referenceId: extra.referenceId,
        processingKey: extra.processingKey,
        description: extra.description,
        status: WalletTransactionStatus.COMPLETED,
      },
    });
  }

  /**
   * Settle held funds out of the wallet (withdrawal completed). The money
   * already left the available balance at request time; this deducts the
   * held portion. Ledger entry: WITHDRAWAL_COMPLETED, recorded against the
   * held balance (balanceBefore/After = held before/after).
   */
  async settleHeld(
    tx: Tx,
    walletId: string,
    amount: Prisma.Decimal | number | string,
    extra: LedgerExtra = {},
  ) {
    const amountDec = new Prisma.Decimal(amount).toDecimalPlaces(
      2,
      Prisma.Decimal.ROUND_HALF_UP,
    );

    const wallet = await tx.wallet.findUniqueOrThrow({
      where: { id: walletId },
    });
    this.assertActive(wallet);
    const heldBefore = wallet.heldBalance;

    const result = await tx.wallet.updateMany({
      where: { id: walletId, heldBalance: { gte: amountDec } },
      data: {
        heldBalance: { decrement: amountDec },
        lifetimeDebits: { increment: amountDec },
      },
    });
    if (result.count !== 1) {
      throw new BadRequestException('Held balance is insufficient');
    }

    return tx.walletTransaction.create({
      data: {
        walletId,
        type: WalletTransactionType.WITHDRAWAL_COMPLETED,
        amount: amountDec.negated(),
        balanceBefore: heldBefore,
        balanceAfter: heldBefore.minus(amountDec),
        referenceType: extra.referenceType,
        referenceId: extra.referenceId,
        processingKey: extra.processingKey,
        description: extra.description,
        status: WalletTransactionStatus.COMPLETED,
      },
    });
  }

  /** Immutable audit log for every wallet operation. */
  async audit(tx: Tx, input: AuditInput) {
    await tx.walletAuditLog.create({
      data: {
        walletId: input.walletId,
        actorUserId: input.actorUserId ?? null,
        actorAdminId: input.actorAdminId ?? null,
        action: input.action,
        previousValues: input.previousValues ?? Prisma.JsonNull,
        newValues: input.newValues ?? Prisma.JsonNull,
        referenceType: input.referenceType ?? null,
        referenceId: input.referenceId ?? null,
      },
    });
  }

  // ─── Job Payment Processing ──────────────────────────────────────────

  /**
   * Called when a customer confirms job completion. Atomically:
   *   - debits the full amount from the customer's wallet (JOB_PAYMENT)
   *   - credits the gross amount to the provider (PROVIDER_EARNING)
   *   - records the platform commission (PLATFORM_COMMISSION) on the
   *     provider wallet so the net credit equals gross − commission
   * A unique processing key makes completed jobs impossible to pay twice.
   */
  async processJobPayment(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (booking.status !== 'COMPLETED') {
      throw new BadRequestException(
        `Job payments can only be processed for completed bookings (current: ${booking.status})`,
      );
    }

    const customerWallet = await this.ensureWallet(booking.customerId);
    const providerWallet = await this.ensureWallet(booking.providerId);

    const gross = booking.totalAmount;
    const rate = new Prisma.Decimal(this.commissionRate);
    const commission = gross
      .mul(rate)
      .toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);
    const net = gross.minus(commission);
    const paymentKey = `job-payment:${booking.id}`;

    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const existing = await tx.walletTransaction.findFirst({
          where: { processingKey: `${paymentKey}:customer` },
        });
        if (existing) {
          throw new ConflictException('This booking has already been paid');
        }

        const shortId = booking.id.slice(0, 8);

        await this.debit(
          tx,
          customerWallet.id,
          WalletTransactionType.JOB_PAYMENT,
          gross,
          {
            referenceType: 'BOOKING',
            referenceId: booking.id,
            processingKey: `${paymentKey}:customer`,
            description: `Payment for booking #${shortId}`,
          },
        );

        await this.credit(
          tx,
          providerWallet.id,
          WalletTransactionType.PROVIDER_EARNING,
          gross,
          {
            referenceType: 'BOOKING',
            referenceId: booking.id,
            processingKey: `${paymentKey}:provider`,
            description: `Earnings for booking #${shortId}`,
          },
        );

        await this.debit(
          tx,
          providerWallet.id,
          WalletTransactionType.PLATFORM_COMMISSION,
          commission,
          {
            referenceType: 'BOOKING',
            referenceId: booking.id,
            processingKey: `${paymentKey}:commission`,
            description: `Platform commission (${this.commissionRate * 100}%) for booking #${shortId}`,
          },
        );

        await this.audit(tx, {
          walletId: customerWallet.id,
          actorUserId: booking.customerId,
          action: 'JOB_PAYMENT_DEBIT',
          newValues: {
            bookingId,
            amount: gross.toString(),
            type: 'JOB_PAYMENT',
          },
          referenceType: 'BOOKING',
          referenceId: booking.id,
        });
        await this.audit(tx, {
          walletId: providerWallet.id,
          action: 'JOB_PAYMENT_CREDIT',
          newValues: {
            bookingId,
            gross: gross.toString(),
            commission: commission.toString(),
            net: net.toString(),
          },
          referenceType: 'BOOKING',
          referenceId: booking.id,
        });

        const [cAfter, pAfter] = await Promise.all([
          tx.wallet.findUniqueOrThrow({ where: { id: customerWallet.id } }),
          tx.wallet.findUniqueOrThrow({ where: { id: providerWallet.id } }),
        ]);

        return {
          bookingId,
          gross,
          commission,
          net,
          customerBalanceAfter: cAfter.balance,
          providerBalanceAfter: pAfter.balance,
        };
      });

      void this.notifications.send({
        userId: booking.customerId,
        type: NotificationType.JOB_PAYMENT_COMPLETED,
        title: 'Payment processed 💳',
        message: `Rs. ${gross.toString()} was charged for your booking.`,
        relatedEntityType: 'BOOKING',
        relatedEntityId: bookingId,
      });
      void this.notifications.send({
        userId: booking.providerId,
        type: NotificationType.JOB_PAYMENT_COMPLETED,
        title: 'Payment received 💰',
        message: `You earned Rs. ${net.toString()} for booking #${booking.id.slice(0, 8)} (after commission).`,
        relatedEntityType: 'BOOKING',
        relatedEntityId: bookingId,
      });

      this.logger.log({
        message: 'Job payment processed',
        bookingId,
        gross: gross.toString(),
        commission: commission.toString(),
        net: net.toString(),
      });

      return result;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new ConflictException('This booking has already been paid');
      }
      throw err;
    }
  }

  // ─── Refund services (consumed by the dispute workflow) ──────────────

  /** Reusable service: credit a refund to a user's wallet. */
  async creditRefund(
    userId: string,
    amount: Prisma.Decimal | number | string,
    extra: {
      referenceType?: string;
      referenceId?: string;
      description?: string;
    } = {},
  ) {
    const wallet = await this.ensureWallet(userId);
    const tx = await this.prisma.$transaction(async (t) => {
      const row = await this.credit(
        t,
        wallet.id,
        WalletTransactionType.REFUND,
        amount,
        extra,
      );
      await this.audit(t, {
        walletId: wallet.id,
        actorUserId: userId,
        action: 'REFUND_CREDIT',
        newValues: { amount: row.amount.toString() },
        referenceType: extra.referenceType,
        referenceId: extra.referenceId,
      });
      return row;
    });

    void this.notifications.send({
      userId,
      type: NotificationType.REFUND_RECEIVED,
      title: 'Refund received 💸',
      message: `Rs. ${new Prisma.Decimal(amount).toString()} was credited to your wallet.`,
      relatedEntityType: extra.referenceType,
      relatedEntityId: extra.referenceId,
    });

    return tx;
  }

  /** Reusable service: deduct a refund share from a provider's wallet. */
  async deductProvider(
    providerId: string,
    amount: Prisma.Decimal | number | string,
    extra: {
      referenceType?: string;
      referenceId?: string;
      description?: string;
    } = {},
  ) {
    const wallet = await this.ensureWallet(providerId);
    const tx = await this.prisma.$transaction(async (t) => {
      const row = await this.debit(
        t,
        wallet.id,
        WalletTransactionType.REFUND,
        amount,
        extra,
      );
      await this.audit(t, {
        walletId: wallet.id,
        actorUserId: providerId,
        action: 'REFUND_DEBIT',
        newValues: { amount: row.amount.toString() },
        referenceType: extra.referenceType,
        referenceId: extra.referenceId,
      });
      return row;
    });

    void this.notifications.send({
      userId: providerId,
      type: NotificationType.WALLET_UPDATED,
      title: 'Refund deducted 💸',
      message: `Rs. ${new Prisma.Decimal(amount).toString()} was deducted from your wallet for a refund.`,
      relatedEntityType: extra.referenceType,
      relatedEntityId: extra.referenceId,
    });

    return tx;
  }

  /**
   * Orchestrates a dispute refund atomically: credits the customer and
   * debits the provider in a single DB transaction. If the provider lacks
   * funds, everything rolls back and the dispute stays open.
   */
  async processDisputeRefund(params: {
    disputeId: string;
    bookingId: string;
    customerId: string;
    providerId: string;
    amount: Prisma.Decimal | number | string;
    resolution: DisputeResolution;
    adminId: string;
  }) {
    const amountDec = new Prisma.Decimal(params.amount).toDecimalPlaces(
      2,
      Prisma.Decimal.ROUND_HALF_UP,
    );
    const customerWallet = await this.ensureWallet(params.customerId);
    const providerWallet = await this.ensureWallet(params.providerId);

    /**
     * Idempotent: if a refund already exists for this dispute (e.g. a
     * previous resolve attempt whose dispute-closing step failed), the
     * wallet ops are skipped so the dispute can still be closed on retry.
     */
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const existing = await tx.walletTransaction.findFirst({
          where: { processingKey: `refund:${params.disputeId}:customer` },
        });
        if (existing) {
          return {
            alreadyProcessed: true,
            refundAmount: existing.amount,
            resolution: params.resolution,
          };
        }

        await this.credit(
          tx,
          customerWallet.id,
          WalletTransactionType.REFUND,
          amountDec,
          {
            referenceType: 'DISPUTE',
            referenceId: params.disputeId,
            processingKey: `refund:${params.disputeId}:customer`,
            description: `Refund (${params.resolution}) for booking #${params.bookingId.slice(0, 8)}`,
          },
        );
        await this.debit(
          tx,
          providerWallet.id,
          WalletTransactionType.REFUND,
          amountDec,
          {
            referenceType: 'DISPUTE',
            referenceId: params.disputeId,
            processingKey: `refund:${params.disputeId}:provider`,
            description: `Provider deduction (${params.resolution}) for booking #${params.bookingId.slice(0, 8)}`,
          },
        );

        await this.audit(tx, {
          walletId: customerWallet.id,
          actorAdminId: params.adminId,
          action: 'DISPUTE_REFUND_CUSTOMER_CREDIT',
          newValues: {
            amount: amountDec.toString(),
            resolution: params.resolution,
          },
          referenceType: 'DISPUTE',
          referenceId: params.disputeId,
        });
        await this.audit(tx, {
          walletId: providerWallet.id,
          actorAdminId: params.adminId,
          action: 'DISPUTE_REFUND_PROVIDER_DEBIT',
          newValues: {
            amount: amountDec.toString(),
            resolution: params.resolution,
          },
          referenceType: 'DISPUTE',
          referenceId: params.disputeId,
        });

        return {
          alreadyProcessed: false,
          refundAmount: amountDec,
          resolution: params.resolution,
        };
      });

      if (!result.alreadyProcessed) {
        void this.notifications.send({
          userId: params.customerId,
          type: NotificationType.REFUND_RECEIVED,
          title: 'Refund received 💸',
          message: `Rs. ${amountDec.toString()} was refunded to your wallet after dispute resolution.`,
          relatedEntityType: 'DISPUTE',
          relatedEntityId: params.disputeId,
        });
        void this.notifications.send({
          userId: params.providerId,
          type: NotificationType.WALLET_UPDATED,
          title: 'Refund deducted 💸',
          message: `Rs. ${amountDec.toString()} was deducted from your wallet for a refund on booking #${params.bookingId.slice(0, 8)}.`,
          relatedEntityType: 'DISPUTE',
          relatedEntityId: params.disputeId,
        });
      }

      this.logger.log({
        message: 'Dispute refund processed',
        disputeId: params.disputeId,
        bookingId: params.bookingId,
        amount: amountDec.toString(),
        resolution: params.resolution,
        alreadyProcessed: result.alreadyProcessed,
      });

      return result;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        // Concurrent duplicate — treat as already processed.
        return {
          alreadyProcessed: true,
          refundAmount: amountDec,
          resolution: params.resolution,
        };
      }
      throw err;
    }
  }

  // ─── Admin adjustment ────────────────────────────────────────────────

  async adjustWallet(
    adminId: string,
    userId: string,
    dto: { direction: 'credit' | 'debit'; amount: number; reason: string },
  ) {
    const wallet = await this.ensureWallet(userId);

    const result = await this.prisma.$transaction(async (tx) => {
      const ledger =
        dto.direction === 'credit'
          ? await this.credit(
              tx,
              wallet.id,
              WalletTransactionType.ADJUSTMENT,
              dto.amount,
              { description: `Admin adjustment: ${dto.reason}` },
            )
          : await this.debit(
              tx,
              wallet.id,
              WalletTransactionType.ADJUSTMENT,
              dto.amount,
              { description: `Admin adjustment: ${dto.reason}` },
            );

      await this.audit(tx, {
        walletId: wallet.id,
        actorAdminId: adminId,
        action: `ADJUSTMENT_${dto.direction.toUpperCase()}`,
        newValues: { amount: ledger.amount.toString(), reason: dto.reason },
      });

      return ledger;
    });

    void this.notifications.send({
      userId,
      type: NotificationType.WALLET_UPDATED,
      title: 'Wallet updated 💰',
      message: `Your wallet was ${dto.direction === 'credit' ? 'credited' : 'debited'} Rs. ${dto.amount}. ${dto.reason}`,
      relatedEntityType: 'WALLET',
      relatedEntityId: wallet.id,
      force: true,
    });

    await this.adminAudit.record({
      adminId,
      action: 'WALLET_ADJUSTED',
      entityType: 'WALLET',
      entityId: wallet.id,
      newValues: {
        userId,
        direction: dto.direction,
        amount: dto.amount,
        reason: dto.reason,
      },
    });

    this.logger.log({
      message: 'Wallet adjusted by admin',
      adminId,
      userId,
      direction: dto.direction,
      amount: dto.amount,
    });

    return result;
  }

  // ─── Admin: freeze / unfreeze ───────────────────────────────────────

  /** Freeze a wallet: blocks all wallet operations until unfrozen. */
  async freezeWallet(adminId: string, userId: string, reason: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });
    if (!wallet) {
      throw new NotFoundException('Wallet not found for this user');
    }
    if (wallet.status === WalletStatus.FROZEN) {
      throw new BadRequestException('Wallet is already frozen');
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      const updatedWallet = await tx.wallet.update({
        where: { id: wallet.id },
        data: { status: WalletStatus.FROZEN },
      });
      await this.audit(tx, {
        walletId: wallet.id,
        actorAdminId: adminId,
        action: 'WALLET_FROZEN',
        previousValues: { status: wallet.status },
        newValues: { status: WalletStatus.FROZEN, reason },
      });
      return updatedWallet;
    });
    await this.adminAudit.record({
      adminId,
      action: 'WALLET_FROZEN',
      entityType: 'WALLET',
      entityId: wallet.id,
      newValues: { userId, reason },
    });

    void this.notifications.send({
      userId,
      type: NotificationType.WALLET_UPDATED,
      title: 'Wallet frozen 🔒',
      message: `Your wallet has been frozen. Reason: ${reason}`,
      relatedEntityType: 'WALLET',
      relatedEntityId: wallet.id,
      force: true,
    });
    this.logger.log({
      message: 'Wallet frozen by admin',
      adminId,
      userId,
      reason,
    });

    return updated;
  }

  /** Unfreeze a wallet: restores it to ACTIVE. */
  async unfreezeWallet(adminId: string, userId: string, reason?: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });
    if (!wallet) {
      throw new NotFoundException('Wallet not found for this user');
    }
    if (wallet.status === WalletStatus.ACTIVE) {
      throw new BadRequestException('Wallet is already active');
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      const updatedWallet = await tx.wallet.update({
        where: { id: wallet.id },
        data: { status: WalletStatus.ACTIVE },
      });
      await this.audit(tx, {
        walletId: wallet.id,
        actorAdminId: adminId,
        action: 'WALLET_UNFROZEN',
        previousValues: { status: wallet.status },
        newValues: { status: WalletStatus.ACTIVE, reason: reason ?? null },
      });
      return updatedWallet;
    });
    await this.adminAudit.record({
      adminId,
      action: 'WALLET_UNFROZEN',
      entityType: 'WALLET',
      entityId: wallet.id,
      newValues: { userId, reason: reason ?? null },
    });

    void this.notifications.send({
      userId,
      type: NotificationType.WALLET_UPDATED,
      title: 'Wallet unfrozen 🔓',
      message: 'Your wallet has been unfrozen.',
      relatedEntityType: 'WALLET',
      relatedEntityId: wallet.id,
      force: true,
    });
    this.logger.log({ message: 'Wallet unfrozen by admin', adminId, userId });

    return updated;
  }

  // ─── Summary & queries ───────────────────────────────────────────────

  async getWalletSummary(userId: string) {
    const wallet = await this.ensureWallet(userId);

    const [topUps, withdrawals, pendingWithdrawals] = await Promise.all([
      this.prisma.walletTransaction.aggregate({
        where: { walletId: wallet.id, type: WalletTransactionType.TOP_UP },
        _sum: { amount: true },
      }),
      this.prisma.walletTransaction.aggregate({
        where: {
          walletId: wallet.id,
          type: WalletTransactionType.WITHDRAWAL_COMPLETED,
        },
        _sum: { amount: true },
      }),
      this.prisma.withdrawalRequest.aggregate({
        where: {
          walletId: wallet.id,
          status: { in: ['PENDING', 'APPROVED', 'PROCESSING'] },
        },
        _sum: { amount: true },
      }),
    ]);

    return {
      walletId: wallet.id,
      walletStatus: wallet.status,
      balance: wallet.balance,
      heldBalance: wallet.heldBalance,
      lifetimeCredits: wallet.lifetimeCredits,
      lifetimeDebits: wallet.lifetimeDebits,
      totalTopUps: topUps._sum.amount ?? new Prisma.Decimal(0),
      totalWithdrawals: (
        withdrawals._sum.amount ?? new Prisma.Decimal(0)
      ).abs(),
      pendingWithdrawals:
        pendingWithdrawals._sum.amount ?? new Prisma.Decimal(0),
    };
  }

  async getEarningsSummary(providerId: string) {
    const wallet = await this.ensureWallet(providerId);

    const monthStart = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );

    const [
      lifetimeEarnings,
      commissionPaid,
      monthlyEarnings,
      withdrawals,
      pendingWithdrawals,
      completedJobs,
    ] = await Promise.all([
      this.prisma.walletTransaction.aggregate({
        where: {
          walletId: wallet.id,
          type: WalletTransactionType.PROVIDER_EARNING,
        },
        _sum: { amount: true },
      }),
      this.prisma.walletTransaction.aggregate({
        where: {
          walletId: wallet.id,
          type: WalletTransactionType.PLATFORM_COMMISSION,
        },
        _sum: { amount: true },
      }),
      this.prisma.walletTransaction.aggregate({
        where: {
          walletId: wallet.id,
          type: WalletTransactionType.PROVIDER_EARNING,
          createdAt: { gte: monthStart },
        },
        _sum: { amount: true },
      }),
      this.prisma.walletTransaction.aggregate({
        where: {
          walletId: wallet.id,
          type: WalletTransactionType.WITHDRAWAL_COMPLETED,
        },
        _sum: { amount: true },
      }),
      this.prisma.withdrawalRequest.aggregate({
        where: {
          walletId: wallet.id,
          status: { in: ['PENDING', 'APPROVED', 'PROCESSING'] },
        },
        _sum: { amount: true },
      }),
      this.prisma.booking.count({
        where: { providerId, status: 'COMPLETED' },
      }),
    ]);

    return {
      availableBalance: wallet.balance,
      heldBalance: wallet.heldBalance,
      lifetimeEarnings: lifetimeEarnings._sum.amount ?? new Prisma.Decimal(0),
      lifetimeWithdrawals: (
        withdrawals._sum.amount ?? new Prisma.Decimal(0)
      ).abs(),
      pendingWithdrawals:
        pendingWithdrawals._sum.amount ?? new Prisma.Decimal(0),
      platformCommissionPaid: (
        commissionPaid._sum.amount ?? new Prisma.Decimal(0)
      ).abs(),
      monthlyEarnings: monthlyEarnings._sum.amount ?? new Prisma.Decimal(0),
      totalCompletedJobs: completedJobs,
    };
  }

  async listTransactions(userId: string, query: WalletTransactionQueryDto) {
    const wallet = await this.ensureWallet(userId);
    return this.queryTransactions({ walletId: wallet.id }, query);
  }

  async getTransaction(userId: string, transactionId: string) {
    const wallet = await this.ensureWallet(userId);
    const transaction = await this.prisma.walletTransaction.findFirst({
      where: { id: transactionId, walletId: wallet.id },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  // ─── Admin queries ───────────────────────────────────────────────────

  async adminListWallets(query: {
    page?: number;
    limit?: number;
    type?: WalletType;
    status?: WalletStatus;
  }) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.WalletWhereInput = {
      ...(query.type && { type: query.type }),
      ...(query.status && { status: query.status }),
    };

    const [data, total] = await Promise.all([
      this.prisma.wallet.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
              role: true,
            },
          },
        },
      }),
      this.prisma.wallet.count({ where }),
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

  async adminListTransactions(query: WalletTransactionQueryDto) {
    return this.queryTransactions({}, query);
  }

  async adminGetWalletByUserId(userId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
      include: {
        user: { select: { id: true, fullName: true, email: true, role: true } },
      },
    });
    if (!wallet) {
      throw new NotFoundException('Wallet not found for this user');
    }
    return wallet;
  }

  // ─── Shared query builder ────────────────────────────────────────────

  private async queryTransactions(
    baseWhere: Prisma.WalletTransactionWhereInput,
    query: WalletTransactionQueryDto,
  ) {
    const { page = 1, limit = 10, type, status, dateFrom, dateTo } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.WalletTransactionWhereInput = {
      ...baseWhere,
      ...(type && { type }),
      ...(status && { status }),
      ...(dateFrom || dateTo
        ? {
            createdAt: {
              ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
              ...(dateTo
                ? { lte: new Date(new Date(dateTo).setHours(23, 59, 59, 999)) }
                : {}),
            },
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.walletTransaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.walletTransaction.count({ where }),
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
}
