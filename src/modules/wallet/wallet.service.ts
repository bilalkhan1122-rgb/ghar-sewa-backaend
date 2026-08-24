import {
  Injectable,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Logger } from "nestjs-pino";
import { PrismaService } from "src/prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { AdminAuditService } from "src/common/services/admin-audit.service";
import { SettingsService } from "../settings/settings.service";
import { WalletTransactionQueryDto } from "./dtos/wallet-transaction-query.dto";
import {
  Prisma,
  UserRole,
  PaymentMode,
  BookingPaymentStatus,
  Wallet,
  WalletType,
  WalletStatus,
  WalletTransactionType,
  WalletTransactionStatus,
  DisputeResolution,
  NotificationType,
} from "generated/prisma/client";
import { hasRole } from "src/common/roles";

/** Which role a wallet of each type belongs to. */
export const WALLET_ROLE: Record<WalletType, UserRole> = {
  [WalletType.CUSTOMER]: UserRole.CUSTOMER,
  [WalletType.PROVIDER]: UserRole.PROVIDER,
};

/** The wallet a given role spends from and earns into. */
export const ROLE_WALLET: Record<
  typeof UserRole.CUSTOMER | typeof UserRole.PROVIDER,
  WalletType
> = {
  [UserRole.CUSTOMER]: WalletType.CUSTOMER,
  [UserRole.PROVIDER]: WalletType.PROVIDER,
};

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
    private readonly settings: SettingsService,
  ) {}

  // ─── Configuration ───────────────────────────────────────────────────

  get commissionRate(): number {
    const raw = this.config.get<string>("COMMISSION_RATE");
    const parsed = raw === undefined ? DEFAULT_COMMISSION_RATE : Number(raw);
    return Number.isFinite(parsed) && parsed >= 0 && parsed < 1
      ? parsed
      : DEFAULT_COMMISSION_RATE;
  }

  get minWithdrawal(): Prisma.Decimal {
    const raw = this.config.get<string>("WITHDRAWAL_MIN");
    const parsed = raw === undefined ? DEFAULT_MIN_WITHDRAWAL : Number(raw);
    return new Prisma.Decimal(
      Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_MIN_WITHDRAWAL,
    );
  }

  get maxWithdrawal(): Prisma.Decimal {
    const raw = this.config.get<string>("WITHDRAWAL_MAX");
    const parsed = raw === undefined ? DEFAULT_MAX_WITHDRAWAL : Number(raw);
    return new Prisma.Decimal(
      Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_MAX_WITHDRAWAL,
    );
  }

  // ─── Wallet creation / lookup ────────────────────────────────────────

  /**
   * Every registered customer/provider automatically has a wallet per role.
   * This is called on registration and lazily from every wallet entry point so
   * pre-existing accounts (backfilled by migration) are always covered.
   *
   * `type` is always explicit: a dual-role account has two wallets and the
   * caller is the only one that knows which side of the app it is serving.
   * Guessing from `user.role` would send a provider's earnings into the
   * customer wallet of anyone who signed up as a customer first.
   */
  async ensureWallet(userId: string, type: WalletType): Promise<Wallet> {
    const existing = await this.prisma.wallet.findUnique({
      where: { userId_type: { userId, type } },
    });
    if (existing) return existing;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true, roles: true },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (user.role === UserRole.ADMIN) {
      throw new ForbiddenException("Admins do not have wallets");
    }
    // A wallet is only created for a role the account actually holds —
    // otherwise a stray call would quietly give a customer a provider wallet
    // they can withdraw from.
    if (!hasRole(user, WALLET_ROLE[type])) {
      throw new ForbiddenException(
        `This account is not a ${type.toLowerCase()} — no ${type.toLowerCase()} wallet exists for it.`,
      );
    }

    return this.prisma.wallet.upsert({
      where: { userId_type: { userId, type } },
      create: { userId, type },
      update: {},
    });
  }

  /** Every wallet on an account, newest role last. Admin views and freezes. */
  async walletsOf(userId: string): Promise<Wallet[]> {
    return this.prisma.wallet.findMany({
      where: { userId },
      orderBy: { type: "asc" },
    });
  }

  /**
   * Refuses a job or booking the customer's wallet cannot cover.
   *
   * The money is not moved or reserved here — it is still charged later in the
   * normal flow. This only stops a job being posted at a price the customer
   * plainly cannot pay, which otherwise stranded the provider: they accept, do
   * the work, and the charge fails at the end.
   *
   * `heldBalance` is deliberately not subtracted: a customer's holds belong to
   * jobs already in flight, and those are settled from the same balance.
   */
  async assertCanAfford(customerId: string, amount: Prisma.Decimal | number) {
    const wallet = await this.ensureWallet(customerId, WalletType.CUSTOMER);
    this.assertActive(wallet);

    const required = new Prisma.Decimal(amount);
    if (wallet.balance.lessThan(required)) {
      const shortfall = required.minus(wallet.balance);
      throw new BadRequestException(
        `Insufficient wallet balance. Your balance is ${wallet.balance.toFixed(2)} ` +
          `but this job is priced at ${required.toFixed(2)}. ` +
          `Top up at least ${shortfall.toFixed(2)} more and try again.`,
      );
    }
  }

  /**
   * The gate every "can this customer commit to a job?" path goes through.
   *
   * PREPAID keeps the original rule: the wallet must already cover the job.
   * POSTPAID drops that check — the point of the mode is to let people post
   * without funding first — but refuses anyone still carrying an unpaid bill,
   * so the platform is never exposed to more than one job's worth per customer.
   */
  async assertCanStartJob(
    customerId: string,
    amount: Prisma.Decimal | number,
  ): Promise<void> {
    const mode = await this.settings.getPaymentMode();

    if (mode === PaymentMode.PREPAID) {
      await this.assertCanAfford(customerId, amount);
      return;
    }

    const wallet = await this.ensureWallet(customerId, WalletType.CUSTOMER);
    this.assertActive(wallet);
    await this.assertNoOutstandingDues(customerId);
  }

  /**
   * Bookings both parties confirmed but the customer has not paid for.
   *
   * Reads `paymentStatus` rather than keeping a second flag of its own: that
   * column is set by `processJobPayment` the moment a charge falls short and
   * cleared when it succeeds, so it is already the single answer to "is this
   * owed for". Ordered oldest first — the provider who has waited longest is
   * the one to pay first.
   */
  async outstandingDues(customerId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: {
        customerId,
        paymentStatus: BookingPaymentStatus.PAYMENT_PENDING,
      },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        totalAmount: true,
        // When both sides confirmed is when the bill fell due; there is no
        // separate due-date column to read.
        customerConfirmedAt: true,
        providerConfirmedAt: true,
        job: { select: { id: true, title: true } },
      },
    });

    const total = bookings.reduce(
      (sum, booking) => sum.plus(booking.totalAmount),
      new Prisma.Decimal(0),
    );

    return { bookings, total, count: bookings.length };
  }

  async assertNoOutstandingDues(customerId: string): Promise<void> {
    const { total, count } = await this.outstandingDues(customerId);
    if (count === 0) return;

    throw new BadRequestException(
      `You have ${count} unpaid job${count === 1 ? "" : "s"} totalling ` +
        `${total.toFixed(2)}. Top up your wallet to clear ${count === 1 ? "it" : "them"} ` +
        `before posting or booking again.`,
    );
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
      throw new BadRequestException("Credit amount must be positive");
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
      throw new BadRequestException("Debit amount must be positive");
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
      throw new BadRequestException("Insufficient wallet balance");
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
      throw new BadRequestException("Insufficient available balance");
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
      throw new BadRequestException("Held balance is insufficient");
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
      throw new BadRequestException("Held balance is insufficient");
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
   * Attempt to process payment after dual completion confirmation.
   *
   * Called from the booking service once both provider and customer have
   * independently confirmed that work is completed.
   *
   * Outcomes:
   *  • Sufficient funds → debits customer, credits provider (net of
   *    commission), records platform commission, marks booking COMPLETED.
   *  • Insufficient funds → sets booking paymentStatus to PAYMENT_PENDING,
   *    returns shortfall details so the caller can surface them.
   *  • Already paid → idempotent no-op (ConflictException caught by caller).
   *
   * Uses a unique processing key per booking to prevent double payment
   * under concurrent requests.
   */
  async processJobPayment(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException("Booking not found");
    }
    if (
      !booking.providerConfirmedCompletion ||
      !booking.customerConfirmedCompletion
    ) {
      throw new BadRequestException(
        "Both parties must confirm completion before payment can be processed",
      );
    }
    if (booking.status !== "IN_PROGRESS") {
      throw new BadRequestException(
        `Job payments can only be processed for in-progress bookings (current: ${booking.status})`,
      );
    }

    const customerWallet = await this.ensureWallet(
      booking.customerId,
      WalletType.CUSTOMER,
    );
    const providerWallet = await this.ensureWallet(
      booking.providerId,
      WalletType.PROVIDER,
    );

    const gross = booking.totalAmount;
    const rate = new Prisma.Decimal(this.commissionRate);
    const commission = gross
      .mul(rate)
      .toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);
    const net = gross.minus(commission);
    const paymentKey = `job-payment:${booking.id}`;

    // Check for prior payment (idempotency)
    const existingPayment = await this.prisma.walletTransaction.findFirst({
      where: { processingKey: `${paymentKey}:customer` },
    });
    if (existingPayment) {
      throw new ConflictException("This booking has already been paid");
    }

    // ── Attempt the atomic wallet transfer ──────────────────────────────
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        // Second idempotency gate inside the transaction
        const existing = await tx.walletTransaction.findFirst({
          where: { processingKey: `${paymentKey}:customer` },
        });
        if (existing) {
          throw new ConflictException("This booking has already been paid");
        }

        const shortId = booking.id.slice(0, 8);

        // debit will throw BadRequestException("Insufficient wallet balance")
        // if the customer cannot cover the full amount — we catch that below.
        await this.debit(
          tx,
          customerWallet.id,
          WalletTransactionType.JOB_PAYMENT,
          gross,
          {
            referenceType: "BOOKING",
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
            referenceType: "BOOKING",
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
            referenceType: "BOOKING",
            referenceId: booking.id,
            processingKey: `${paymentKey}:commission`,
            description: `Platform commission (${this.commissionRate * 100}%) for booking #${shortId}`,
          },
        );

        await this.audit(tx, {
          walletId: customerWallet.id,
          actorUserId: booking.customerId,
          action: "JOB_PAYMENT_DEBIT",
          newValues: {
            bookingId,
            amount: gross.toString(),
            type: "JOB_PAYMENT",
          },
          referenceType: "BOOKING",
          referenceId: booking.id,
        });
        await this.audit(tx, {
          walletId: providerWallet.id,
          action: "JOB_PAYMENT_CREDIT",
          newValues: {
            bookingId,
            gross: gross.toString(),
            commission: commission.toString(),
            net: net.toString(),
          },
          referenceType: "BOOKING",
          referenceId: booking.id,
        });

        // Mark booking as completed
        await tx.booking.update({
          where: { id: bookingId },
          data: {
            status: "COMPLETED",
            completedAt: new Date(),
            confirmedAt: new Date(),
            paymentStatus: "COMPLETED",
            paymentReference: paymentKey,
          },
        });

        // Mark job as completed
        await tx.job.update({
          where: { id: booking.jobId },
          data: { status: "COMPLETED" },
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
        title: "Payment processed 💳",
        message: `Rs. ${gross.toString()} was charged for your booking.`,
        relatedEntityType: "BOOKING",
        relatedEntityId: bookingId,
      });
      void this.notifications.send({
        userId: booking.providerId,
        type: NotificationType.JOB_PAYMENT_COMPLETED,
        title: "Payment received 💰",
        message: `You earned Rs. ${net.toString()} for booking #${booking.id.slice(0, 8)} (after commission).`,
        relatedEntityType: "BOOKING",
        relatedEntityId: bookingId,
      });

      this.logger.log({
        message: "Job payment processed",
        bookingId,
        gross: gross.toString(),
        commission: commission.toString(),
        net: net.toString(),
      });

      return {
        success: true,
        bookingId,
        gross,
        commission,
        net,
        customerBalanceAfter: result.customerBalanceAfter,
        providerBalanceAfter: result.providerBalanceAfter,
      };
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        throw new ConflictException("This booking has already been paid");
      }

      // Insufficient wallet balance — mark PAYMENT_PENDING and return
      // shortfall details instead of throwing.
      if (
        err instanceof BadRequestException &&
        err.message === "Insufficient wallet balance"
      ) {
        await this.prisma.booking.update({
          where: { id: bookingId },
          data: {
            paymentStatus: "PAYMENT_PENDING",
            paymentReference: paymentKey,
          },
        });

        const required = gross;
        const available = customerWallet.balance;
        const additionalRequired = required.minus(available);

        void this.notifications.send({
          userId: booking.customerId,
          type: NotificationType.WALLET_UPDATED,
          title: "Insufficient wallet balance ⚠️",
          message: `Your wallet balance is Rs. ${available.toFixed(2)} but this job costs Rs. ${required.toFixed(2)}. Please add Rs. ${additionalRequired.toFixed(2)} to complete payment.`,
          relatedEntityType: "BOOKING",
          relatedEntityId: bookingId,
          force: true,
        });

        void this.notifications.send({
          userId: booking.providerId,
          type: NotificationType.WALLET_UPDATED,
          title: "Payment pending ⏳",
          message: `Payment for booking #${booking.id.slice(0, 8)} is pending — the customer needs to add funds.`,
          relatedEntityType: "BOOKING",
          relatedEntityId: bookingId,
        });

        this.logger.log({
          message: "Job payment pending — insufficient wallet balance",
          bookingId,
          required: required.toString(),
          available: available.toString(),
          additionalRequired: additionalRequired.toString(),
        });

        return {
          success: false,
          paymentStatus: "PAYMENT_PENDING" as const,
          bookingId,
          gross: required,
          available: available,
          additionalRequired: additionalRequired,
        };
      }

      throw err;
    }
  }

  // ─── Retry pending payment after wallet top-up ─────────────────────

  /**
   * Called after a customer wallet top-up is approved. Scans for any
   * PAYMENT_PENDING bookings belonging to that customer and retries the
   * payment if sufficient funds are now available.
   *
   * Returns the list of bookings that were settled.
   */
  async retryPendingPayments(customerId: string) {
    const pendingBookings = await this.prisma.booking.findMany({
      where: {
        customerId,
        paymentStatus: "PAYMENT_PENDING",
      },
    });

    const settled: string[] = [];

    for (const booking of pendingBookings) {
      // Re-fetch fresh wallet balance
      const wallet = await this.prisma.wallet.findUnique({
        where: {
          userId_type: { userId: customerId, type: WalletType.CUSTOMER },
        },
      });
      if (!wallet) continue;

      const required = booking.totalAmount;
      if (wallet.balance.lessThan(required)) continue;

      try {
        const result = await this.processJobPayment(booking.id);
        if (result.success) {
          settled.push(booking.id);
        }
      } catch (err) {
        // If already paid (conflict) or any other error, skip this booking
        this.logger.warn({
          message: "Retry pending payment failed",
          bookingId: booking.id,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    return { settled, total: pendingBookings.length };
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
    const wallet = await this.ensureWallet(userId, WalletType.CUSTOMER);
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
        action: "REFUND_CREDIT",
        newValues: { amount: row.amount.toString() },
        referenceType: extra.referenceType,
        referenceId: extra.referenceId,
      });
      return row;
    });

    void this.notifications.send({
      userId,
      type: NotificationType.REFUND_RECEIVED,
      title: "Refund received 💸",
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
    const wallet = await this.ensureWallet(providerId, WalletType.PROVIDER);
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
        action: "REFUND_DEBIT",
        newValues: { amount: row.amount.toString() },
        referenceType: extra.referenceType,
        referenceId: extra.referenceId,
      });
      return row;
    });

    void this.notifications.send({
      userId: providerId,
      type: NotificationType.WALLET_UPDATED,
      title: "Refund deducted 💸",
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
    const customerWallet = await this.ensureWallet(
      params.customerId,
      WalletType.CUSTOMER,
    );
    const providerWallet = await this.ensureWallet(
      params.providerId,
      WalletType.PROVIDER,
    );

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
            referenceType: "DISPUTE",
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
            referenceType: "DISPUTE",
            referenceId: params.disputeId,
            processingKey: `refund:${params.disputeId}:provider`,
            description: `Provider deduction (${params.resolution}) for booking #${params.bookingId.slice(0, 8)}`,
          },
        );

        await this.audit(tx, {
          walletId: customerWallet.id,
          actorAdminId: params.adminId,
          action: "DISPUTE_REFUND_CUSTOMER_CREDIT",
          newValues: {
            amount: amountDec.toString(),
            resolution: params.resolution,
          },
          referenceType: "DISPUTE",
          referenceId: params.disputeId,
        });
        await this.audit(tx, {
          walletId: providerWallet.id,
          actorAdminId: params.adminId,
          action: "DISPUTE_REFUND_PROVIDER_DEBIT",
          newValues: {
            amount: amountDec.toString(),
            resolution: params.resolution,
          },
          referenceType: "DISPUTE",
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
          title: "Refund received 💸",
          message: `Rs. ${amountDec.toString()} was refunded to your wallet after dispute resolution.`,
          relatedEntityType: "DISPUTE",
          relatedEntityId: params.disputeId,
        });
        void this.notifications.send({
          userId: params.providerId,
          type: NotificationType.WALLET_UPDATED,
          title: "Refund deducted 💸",
          message: `Rs. ${amountDec.toString()} was deducted from your wallet for a refund on booking #${params.bookingId.slice(0, 8)}.`,
          relatedEntityType: "DISPUTE",
          relatedEntityId: params.disputeId,
        });
      }

      this.logger.log({
        message: "Dispute refund processed",
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
        err.code === "P2002"
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
    dto: {
      direction: "credit" | "debit";
      amount: number;
      reason: string;
      walletType?: WalletType;
    },
  ) {
    // Dual-role accounts have two balances, so an adjustment has to say which
    // one it lands on. Unstated, it falls to the role the account was created
    // as — the only wallet a single-role account has.
    const wallet = await this.ensureWallet(
      userId,
      dto.walletType ?? (await this.defaultWalletType(userId)),
    );

    const result = await this.prisma.$transaction(async (tx) => {
      const ledger =
        dto.direction === "credit"
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
      title: "Wallet updated 💰",
      message: `Your wallet was ${dto.direction === "credit" ? "credited" : "debited"} Rs. ${dto.amount}. ${dto.reason}`,
      relatedEntityType: "WALLET",
      relatedEntityId: wallet.id,
      force: true,
    });

    await this.adminAudit.record({
      adminId,
      action: "WALLET_ADJUSTED",
      entityType: "WALLET",
      entityId: wallet.id,
      newValues: {
        userId,
        direction: dto.direction,
        amount: dto.amount,
        reason: dto.reason,
      },
    });

    this.logger.log({
      message: "Wallet adjusted by admin",
      adminId,
      userId,
      direction: dto.direction,
      amount: dto.amount,
    });

    return result;
  }

  // ─── Admin: freeze / unfreeze ───────────────────────────────────────

  /**
   * Freeze an account's wallets: blocks all wallet operations until unfrozen.
   *
   * Every wallet on the account is frozen, not just one. Freezing is an action
   * against a person — leaving a dual-role account able to keep earning as a
   * provider while its customer wallet is frozen would defeat the point.
   */
  async freezeWallet(adminId: string, userId: string, reason: string) {
    const wallets = await this.walletsOf(userId);
    if (wallets.length === 0) {
      throw new NotFoundException("Wallet not found for this user");
    }
    const open = wallets.filter((w) => w.status !== WalletStatus.FROZEN);
    if (open.length === 0) {
      throw new BadRequestException("Wallet is already frozen");
    }

    const frozen = await Promise.all(
      open.map((wallet) => this.freezeOne(adminId, userId, reason, wallet)),
    );

    // One notification for the account, not one per wallet — the person has a
    // single experience of being frozen.
    void this.notifications.send({
      userId,
      type: NotificationType.WALLET_UPDATED,
      title: "Wallet frozen 🔒",
      message: `Your wallet has been frozen. Reason: ${reason}`,
      relatedEntityType: "WALLET",
      relatedEntityId: frozen[0].id,
      force: true,
    });

    return frozen;
  }

  private async freezeOne(
    adminId: string,
    userId: string,
    reason: string,
    wallet: Wallet,
  ) {
    const updated = await this.prisma.$transaction(async (tx) => {
      const updatedWallet = await tx.wallet.update({
        where: { id: wallet.id },
        data: { status: WalletStatus.FROZEN },
      });
      await this.audit(tx, {
        walletId: wallet.id,
        actorAdminId: adminId,
        action: "WALLET_FROZEN",
        previousValues: { status: wallet.status },
        newValues: { status: WalletStatus.FROZEN, reason },
      });
      return updatedWallet;
    });
    await this.adminAudit.record({
      adminId,
      action: "WALLET_FROZEN",
      entityType: "WALLET",
      entityId: wallet.id,
      newValues: { userId, reason },
    });

    this.logger.log({
      message: "Wallet frozen by admin",
      adminId,
      userId,
      reason,
    });

    return updated;
  }

  /** Unfreeze an account's wallets: restores every frozen one to ACTIVE. */
  async unfreezeWallet(adminId: string, userId: string, reason?: string) {
    const wallets = await this.walletsOf(userId);
    if (wallets.length === 0) {
      throw new NotFoundException("Wallet not found for this user");
    }
    const frozen = wallets.filter((w) => w.status !== WalletStatus.ACTIVE);
    if (frozen.length === 0) {
      throw new BadRequestException("Wallet is already active");
    }

    const restored = await Promise.all(
      frozen.map((wallet) => this.unfreezeOne(adminId, userId, reason, wallet)),
    );

    // Once for the account, matching freezeWallet.
    void this.notifications.send({
      userId,
      type: NotificationType.WALLET_UPDATED,
      title: "Wallet unfrozen 🔓",
      message: "Your wallet has been unfrozen.",
      relatedEntityType: "WALLET",
      relatedEntityId: restored[0].id,
      force: true,
    });

    return restored;
  }

  private async unfreezeOne(
    adminId: string,
    userId: string,
    reason: string | undefined,
    wallet: Wallet,
  ) {
    const updated = await this.prisma.$transaction(async (tx) => {
      const updatedWallet = await tx.wallet.update({
        where: { id: wallet.id },
        data: { status: WalletStatus.ACTIVE },
      });
      await this.audit(tx, {
        walletId: wallet.id,
        actorAdminId: adminId,
        action: "WALLET_UNFROZEN",
        previousValues: { status: wallet.status },
        newValues: { status: WalletStatus.ACTIVE, reason: reason ?? null },
      });
      return updatedWallet;
    });
    await this.adminAudit.record({
      adminId,
      action: "WALLET_UNFROZEN",
      entityType: "WALLET",
      entityId: wallet.id,
      newValues: { userId, reason: reason ?? null },
    });

    this.logger.log({ message: "Wallet unfrozen by admin", adminId, userId });

    return updated;
  }

  // ─── Summary & queries ───────────────────────────────────────────────

  async getWalletSummary(userId: string, type: WalletType) {
    const wallet = await this.ensureWallet(userId, type);

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
          status: { in: ["PENDING", "APPROVED", "PROCESSING"] },
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
    const wallet = await this.ensureWallet(providerId, WalletType.PROVIDER);

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
          status: { in: ["PENDING", "APPROVED", "PROCESSING"] },
        },
        _sum: { amount: true },
      }),
      this.prisma.booking.count({
        where: { providerId, status: "COMPLETED" },
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

  async listTransactions(
    userId: string,
    type: WalletType,
    query: WalletTransactionQueryDto,
  ) {
    const wallet = await this.ensureWallet(userId, type);
    return this.queryTransactions({ walletId: wallet.id }, query);
  }

  async getTransaction(
    userId: string,
    type: WalletType,
    transactionId: string,
  ) {
    const wallet = await this.ensureWallet(userId, type);
    const transaction = await this.prisma.walletTransaction.findFirst({
      where: { id: transactionId, walletId: wallet.id },
    });
    if (!transaction) {
      throw new NotFoundException("Transaction not found");
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
        orderBy: { updatedAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
              role: true,
              roles: true,
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

  /**
   * Every wallet on an account. Returns a list because a dual-role account has
   * two, and an admin looking at "this user's money" needs to see both.
   */
  async adminGetWalletByUserId(userId: string) {
    const wallets = await this.prisma.wallet.findMany({
      where: { userId },
      orderBy: { type: "asc" },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            roles: true,
          },
        },
      },
    });
    if (wallets.length === 0) {
      throw new NotFoundException("Wallet not found for this user");
    }
    return wallets;
  }

  /**
   * The wallet an account has for certain: the one matching the role it was
   * created as. Used where an admin action names a user but not a side.
   */
  private async defaultWalletType(userId: string): Promise<WalletType> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    if (!user) throw new NotFoundException("User not found");
    if (user.role === UserRole.ADMIN) {
      throw new ForbiddenException("Admins do not have wallets");
    }
    return user.role === UserRole.PROVIDER
      ? WalletType.PROVIDER
      : WalletType.CUSTOMER;
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
        orderBy: { createdAt: "desc" },
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
