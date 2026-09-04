import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { RealtimeService } from "../realtime/realtime.service";
import { WalletService } from "../wallet/wallet.service";
import { PaymentGatewayRegistry } from "./gateways/payment-gateway.registry";
import { CreatePaymentDto } from "./dtos/create-payment.dto";
import { PaymentQueryDto } from "./dtos/payment-query.dto";
import {
  Prisma,
  PaymentStatus,
  PaymentGatewayType,
  WalletTransactionType,
  BookingPaymentStatus,
  NotificationType,
  WalletType,
} from "generated/prisma/client";
import { GatewayWebhookPayload } from "./gateways/payment-gateway.interface";

/** Pusher events for payment lifecycle. */
export const PAYMENT_EVENTS = {
  PAYMENT_PROCESSING: "payment.processing",
  PAYMENT_SUCCEEDED: "payment.succeeded",
  PAYMENT_FAILED: "payment.failed",
  WALLET_CREDITED: "wallet.credited",
  BOOKING_PAYMENT_COMPLETED: "booking.payment.completed",
} as const;

/** Channel naming — matches realtime-channels.ts patterns. */
const paymentChannel = (userId: string) => `private-user-${userId}`;

/**
 * Module 16 — Payment Service.
 *
 * Orchestrates external payment gateway interactions. The wallet remains
 * the source of truth for user balances; this service only records gateway
 * transactions and triggers wallet credits when payments succeed.
 *
 * Key design principles:
 * - Never trust client-submitted payment status.
 * - Always verify via gateway server-side verification + signed webhook.
 * - Use idempotency keys to prevent duplicate wallet credits.
 * - Financial operations are atomic within Prisma interactive transactions.
 */
@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly notifications: NotificationsService,
    private readonly realtime: RealtimeService,
    private readonly wallet: WalletService,
    private readonly registry: PaymentGatewayRegistry,
  ) {}

  /** Base URL of this server — used for webhook callback URLs. */
  private get appBaseUrl(): string {
    return this.config.get<string>("APP_URL", "http://localhost:3000");
  }

  // ─── Customer: Create Payment ──────────────────────────────────────

  /**
   * Initiate an external payment via the selected gateway.
   *
   * Flow:
   *   1. Validate the request.
   *   2. Resolve the gateway from the registry.
   *   3. Create a PENDING PaymentTransaction row (idempotency key prevents
   *      duplicate rows for the same logical payment).
   *   4. Call the gateway's createPayment method.
   *   5. Update the row with gateway transaction details.
   *   6. Return checkout URL / client payload to the frontend.
   *
   * The wallet is NOT credited here — that happens only after webhook / verification.
   */
  async createPayment(userId: string, dto: CreatePaymentDto) {
    // Validate gateway is registered
    const gateway = this.registry.get(dto.gateway);

    // Validate the payment method is supported by this gateway
    if (!gateway.supportedMethods.includes(dto.paymentMethod)) {
      throw new BadRequestException(
        `Payment method ${dto.paymentMethod} is not supported by gateway ${dto.gateway}`,
      );
    }

    // Validate wallet exists and belongs to user
    const wallet = await this.wallet.ensureWallet(userId, WalletType.CUSTOMER);

    // Validate booking if provided
    if (dto.bookingId) {
      const booking = await this.prisma.booking.findUnique({
        where: { id: dto.bookingId },
      });
      if (!booking) throw new NotFoundException("Booking not found");
      if (booking.customerId !== userId) {
        throw new ForbiddenException("You can only pay for your own bookings");
      }
      if (booking.paymentStatus === BookingPaymentStatus.COMPLETED) {
        throw new BadRequestException("This booking has already been paid");
      }
    }

    // Generate idempotency key
    const idempotencyKey = `payment:${userId}:${dto.amount}:${Date.now()}:${Math.random().toString(36).slice(2)}`;

    // Create pending payment record
    const payment = await this.prisma.paymentTransaction.create({
      data: {
        userId,
        gateway: dto.gateway,
        amount: dto.amount,
        paymentMethod: dto.paymentMethod,
        bookingId: dto.bookingId ?? null,
        walletId: wallet.id,
        idempotencyKey,
        status: PaymentStatus.PENDING,
        metadata: (dto.metadata
          ? JSON.parse(JSON.stringify(dto.metadata))
          : Prisma.JsonNull) as Prisma.InputJsonValue,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
      },
    });

    // Notify user
    void this.notifications.send({
      userId,
      type: NotificationType.WALLET_TOPUP_SUBMITTED,
      title: "Payment initiated 💳",
      message: `Your ${dto.gateway} payment of Rs. ${dto.amount} has been initiated.`,
      relatedEntityType: "PAYMENT",
      relatedEntityId: payment.id,
    });

    // Publish realtime event
    void this.realtime.publish(
      paymentChannel(userId),
      PAYMENT_EVENTS.PAYMENT_PROCESSING,
      {
        paymentId: payment.id,
        amount: dto.amount,
        gateway: dto.gateway,
        timestamp: new Date(),
      },
    );

    // Call gateway to initiate payment
    const callbackUrl =
      dto.callbackUrl ||
      `${this.appBaseUrl}/api/v1/payments/webhook/${dto.gateway}`;
    const gatewayResult = await gateway.createPayment({
      amount: dto.amount,
      reference: payment.id,
      metadata: {
        userId,
        bookingId: dto.bookingId,
        walletId: wallet.id,
        ...dto.metadata,
      },
      callbackUrl,
    });

    // Update payment with gateway details
    const updatedPayment = await this.prisma.paymentTransaction.update({
      where: { id: payment.id },
      data: {
        gatewayTransactionId: gatewayResult.gatewayTransactionId,
        gatewayReference: gatewayResult.gatewayReference,
        status: PaymentStatus.PROCESSING,
        metadata: {
          ...((payment.metadata as Record<string, unknown>) || {}),
          gatewayPayload: gatewayResult.clientPayload,
          checkoutUrl: gatewayResult.checkoutUrl,
        } as Prisma.InputJsonValue,
      },
    });

    this.logger.log({
      message: "Payment created",
      paymentId: payment.id,
      userId,
      amount: dto.amount,
      gateway: dto.gateway,
      gatewayTransactionId: gatewayResult.gatewayTransactionId,
    });

    return {
      payment: updatedPayment,
      checkoutUrl: gatewayResult.checkoutUrl,
      clientPayload: gatewayResult.clientPayload,
      message: gatewayResult.message,
    };
  }

  // ─── Customer: Check Payment Status ─────────────────────────────────

  async getPaymentStatus(userId: string, paymentId: string) {
    const payment = await this.prisma.paymentTransaction.findFirst({
      where: { id: paymentId, userId },
    });
    if (!payment) throw new NotFoundException("Payment not found");
    return payment;
  }

  async listMyPayments(userId: string, query: PaymentQueryDto) {
    const { page = 1, limit = 10, status, gateway } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.PaymentTransactionWhereInput = {
      userId,
      ...(status && { status }),
      ...(gateway && { gateway }),
    };

    const [data, total] = await Promise.all([
      this.prisma.paymentTransaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.paymentTransaction.count({ where }),
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

  // ─── Webhook Handling ───────────────────────────────────────────────

  /**
   * Process a gateway webhook. This is the only path that should credit
   * wallets for external payments.
   *
   * Flow:
   *   1. Parse the webhook using the gateway's parser (validates signature).
   *   2. Find the payment record by gateway transaction ID.
   *   3. Validate amount matches (anti-tampering).
   *   4. If already SUCCEEDED, skip (idempotent).
   *   5. Update payment status.
   *   6. Credit wallet.
   *   7. Process any pending booking payment.
   */
  async processWebhook(
    gatewayType: PaymentGatewayType,
    headers: Record<string, string>,
    body: unknown,
  ) {
    const gateway = this.registry.get(gatewayType);

    // Parse and validate the webhook
    const payload = gateway.parseWebhook({ headers, body });
    if (!payload) {
      this.logger.warn(
        { gatewayType },
        "Webhook rejected: invalid or signature mismatch",
      );
      throw new BadRequestException("Invalid webhook payload");
    }

    // Find the payment
    const payment = await this.findPaymentByGatewayTransactionId(
      payload.gatewayTransactionId,
    );
    if (!payment) {
      this.logger.warn(
        { gatewayTransactionId: payload.gatewayTransactionId, gatewayType },
        "Webhook received for unknown transaction",
      );
      // Return 200 to prevent gateway retries for unknown transactions
      return { processed: false, reason: "unknown_transaction" };
    }

    // Validate amount (anti-tampering)
    if (Math.abs(payload.amount - Number(payment.amount)) > 0.01) {
      this.logger.error(
        {
          paymentId: payment.id,
          expected: payment.amount.toString(),
          received: payload.amount,
        },
        "Webhook amount mismatch — potential tampering",
      );
      await this.markPaymentFailed(
        payment.id,
        "Amount mismatch: potential tampering",
      );
      throw new BadRequestException("Amount mismatch");
    }

    // Idempotent: already succeeded
    if (payment.status === PaymentStatus.SUCCEEDED) {
      this.logger.log(
        { paymentId: payment.id },
        "Webhook already processed (idempotent)",
      );
      return { processed: true, reason: "already_processed" };
    }

    // Process based on webhook status
    if (payload.status === "SUCCEEDED") {
      return this.processSuccessfulPayment(payment, payload);
    } else if (payload.status === "FAILED" || payload.status === "CANCELLED") {
      await this.markPaymentFailed(
        payment.id,
        payload.failureReason || `Payment ${payload.status.toLowerCase()}`,
      );
      return { processed: true, reason: "payment_failed" };
    }

    // PENDING — no action needed
    return { processed: false, reason: "still_pending" };
  }

  // ─── Payment Verification ───────────────────────────────────────────

  /**
   * Manually verify a payment via the gateway's server-side API.
   * Used as a belt-and-suspenders check alongside webhooks, and for
   * the customer-facing "check status" endpoint.
   */
  async verifyPayment(userId: string, paymentId: string) {
    const payment = await this.prisma.paymentTransaction.findFirst({
      where: { id: paymentId, userId },
    });
    if (!payment) throw new NotFoundException("Payment not found");

    if (payment.status === PaymentStatus.SUCCEEDED) {
      return { payment, verified: true, message: "Payment already processed" };
    }

    if (!payment.gatewayTransactionId) {
      throw new BadRequestException("No gateway transaction ID to verify");
    }

    const gateway = this.registry.get(payment.gateway);
    const result = await gateway.verifyPayment({
      gatewayTransactionId: payment.gatewayTransactionId,
      reference: payment.id,
      // Read only by the sandbox stubs — see the gateway interface. The
      // amount compared below is still the one the gateway reports.
      expectedAmount: Number(payment.amount),
    });

    if (
      result.success &&
      Math.abs(result.amount - Number(payment.amount)) < 0.01
    ) {
      const webhookPayload: GatewayWebhookPayload = {
        gatewayTransactionId: result.gatewayTransactionId,
        amount: result.amount,
        currency: result.currency,
        status: "SUCCEEDED",
        rawBody: result.rawResponse || {},
      };
      return this.processSuccessfulPayment(payment, webhookPayload);
    } else if (!result.success) {
      await this.markPaymentFailed(
        payment.id,
        result.failureReason || "Verification failed",
      );
    }

    return {
      payment,
      verified: result.success,
      message: result.failureReason || "Verification result",
    };
  }

  // ─── Admin ──────────────────────────────────────────────────────────

  async adminListPayments(query: PaymentQueryDto) {
    const { page = 1, limit = 10, status, gateway, search } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.PaymentTransactionWhereInput = {
      ...(status && { status }),
      ...(gateway && { gateway }),
      ...(search
        ? {
            OR: [
              { userId: { contains: search } },
              { gatewayTransactionId: { contains: search } },
              { gatewayReference: { contains: search } },
            ],
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.paymentTransaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { id: true, fullName: true, email: true, phone: true },
          },
          booking: { select: { id: true, totalAmount: true, status: true } },
        },
      }),
      this.prisma.paymentTransaction.count({ where }),
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

  async adminGetPayment(paymentId: string) {
    const payment = await this.prisma.paymentTransaction.findUnique({
      where: { id: paymentId },
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
        booking: {
          select: {
            id: true,
            totalAmount: true,
            status: true,
            paymentStatus: true,
          },
        },
        wallet: { select: { id: true, balance: true, type: true } },
      },
    });
    if (!payment) throw new NotFoundException("Payment not found");
    return payment;
  }

  async adminListFailedPayments(query: PaymentQueryDto) {
    return this.adminListPayments({ ...query, status: PaymentStatus.FAILED });
  }

  async adminRetryPayment(paymentId: string) {
    const payment = await this.prisma.paymentTransaction.findUnique({
      where: { id: paymentId },
    });
    if (!payment) throw new NotFoundException("Payment not found");

    if (payment.status !== PaymentStatus.FAILED) {
      throw new BadRequestException("Only failed payments can be retried");
    }

    if (!payment.gatewayTransactionId) {
      throw new BadRequestException("No gateway transaction to retry");
    }

    const gateway = this.registry.get(payment.gateway);
    const result = await gateway.verifyPayment({
      gatewayTransactionId: payment.gatewayTransactionId,
      reference: payment.id,
      // Read only by the sandbox stubs — see the gateway interface. The
      // amount compared below is still the one the gateway reports.
      expectedAmount: Number(payment.amount),
    });

    if (result.success) {
      const webhookPayload: GatewayWebhookPayload = {
        gatewayTransactionId: result.gatewayTransactionId,
        amount: result.amount,
        currency: result.currency,
        status: "SUCCEEDED",
        rawBody: result.rawResponse || {},
      };
      return this.processSuccessfulPayment(payment, webhookPayload);
    }

    return {
      payment,
      success: false,
      message: result.failureReason || "Payment still not verified",
    };
  }

  // ─── Internal: Process Successful Payment ──────────────────────────

  /**
   * Credit the wallet and process any pending booking payment atomically.
   * Idempotent: uses the payment's idempotency key as the wallet
   * transaction's processing key.
   */
  private async processSuccessfulPayment(
    payment: {
      id: string;
      userId: string;
      amount: Prisma.Decimal;
      bookingId: string | null;
      walletId: string | null;
      idempotencyKey: string;
      gateway: PaymentGatewayType;
      gatewayTransactionId: string | null;
    },
    webhookPayload: GatewayWebhookPayload,
  ) {
    const walletId = payment.walletId;
    if (!walletId) {
      this.logger.error(
        { paymentId: payment.id },
        "Payment has no wallet ID — cannot credit",
      );
      await this.markPaymentFailed(
        payment.id,
        "No wallet associated with payment",
      );
      return { processed: false, reason: "no_wallet" };
    }

    try {
      const result = await this.prisma.$transaction(async (tx) => {
        // Check for prior processing (idempotency inside transaction)
        const existingCredit = await tx.walletTransaction.findFirst({
          where: { processingKey: `gateway-payment:${payment.id}` },
        });
        if (existingCredit) {
          return { alreadyProcessed: true };
        }

        // Mark payment as SUCCEEDED
        await tx.paymentTransaction.update({
          where: { id: payment.id },
          data: {
            status: PaymentStatus.SUCCEEDED,
            completedAt: new Date(),
            gatewayTransactionId: webhookPayload.gatewayTransactionId,
          },
        });

        // Credit wallet
        await this.wallet.credit(
          tx,
          walletId,
          WalletTransactionType.TOP_UP,
          payment.amount,
          {
            referenceType: "GATEWAY_PAYMENT",
            referenceId: payment.id,
            processingKey: `gateway-payment:${payment.id}`,
            description: `Gateway payment (${payment.gateway}) credited`,
          },
        );

        // Audit
        await this.wallet.audit(tx, {
          walletId,
          actorUserId: payment.userId,
          action: "GATEWAY_PAYMENT_CREDIT",
          newValues: {
            paymentId: payment.id,
            amount: payment.amount.toString(),
            gateway: payment.gateway,
            gatewayTransactionId: webhookPayload.gatewayTransactionId,
          },
          referenceType: "GATEWAY_PAYMENT",
          referenceId: payment.id,
        });

        return { alreadyProcessed: false };
      });

      if (result.alreadyProcessed) {
        this.logger.log(
          { paymentId: payment.id },
          "Payment already processed (idempotent)",
        );
        return { processed: true, reason: "already_processed" };
      }

      // Send notifications
      void this.notifications.send({
        userId: payment.userId,
        type: NotificationType.WALLET_TOPUP_APPROVED,
        title: "Payment successful ✅",
        message: `Rs. ${payment.amount.toString()} has been added to your wallet via ${payment.gateway}.`,
        relatedEntityType: "PAYMENT",
        relatedEntityId: payment.id,
      });

      // Publish realtime events
      void this.realtime.publish(
        paymentChannel(payment.userId),
        PAYMENT_EVENTS.PAYMENT_SUCCEEDED,
        {
          paymentId: payment.id,
          amount: payment.amount,
          gateway: payment.gateway,
          timestamp: new Date(),
        },
      );

      void this.realtime.publish(
        paymentChannel(payment.userId),
        PAYMENT_EVENTS.WALLET_CREDITED,
        {
          paymentId: payment.id,
          amount: payment.amount,
          timestamp: new Date(),
        },
      );

      // Money has landed, so any booking left PAYMENT_PENDING can now be
      // settled — the same sweep the admin top-up approval runs.
      //
      // Deliberately not gated on `payment.bookingId`. A top-up started from
      // the wallet screen carries no booking, which is every top-up the app
      // makes: the customer is sent to the wallet to clear a bill, tops up,
      // and nothing reconciles it. The gate meant the common case never
      // settled — the balance arrived, the booking stayed PAYMENT_PENDING,
      // and both the job screen and the dues banner kept asking for money
      // already paid until the next daily cron sweep.
      //
      // Safe to run for any payer: `retryPendingPayments` scans by customer
      // and re-checks the balance per booking, so a provider top-up or a
      // customer with nothing owing is a no-op.
      //
      // Guarded because the credit itself has already committed. Letting a
      // settlement failure throw would fail a payment that did go through,
      // and the reminder cron retries anyway.
      try {
        const retryResult = await this.wallet.retryPendingPayments(
          payment.userId,
        );
        if (retryResult.settled.length > 0) {
          this.logger.log({
            message: "Booking payment settled after gateway payment",
            paymentId: payment.id,
            settledBookingIds: retryResult.settled,
          });

          void this.realtime.publish(
            paymentChannel(payment.userId),
            PAYMENT_EVENTS.BOOKING_PAYMENT_COMPLETED,
            {
              paymentId: payment.id,
              settledBookings: retryResult.settled,
              timestamp: new Date(),
            },
          );
        }
      } catch (err) {
        const error = err as { message?: string };
        this.logger.error(
          { err: error, paymentId: payment.id },
          "Could not settle pending booking after gateway payment",
        );
      }

      this.logger.log({
        message: "Gateway payment processed",
        paymentId: payment.id,
        amount: payment.amount.toString(),
        gateway: payment.gateway,
      });

      return { processed: true, reason: "success" };
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        // Duplicate constraint — idempotent
        return { processed: true, reason: "already_processed" };
      }
      throw err;
    }
  }

  // ─── Helpers ────────────────────────────────────────────────────────

  private async findPaymentByGatewayTransactionId(
    gatewayTransactionId: string,
  ) {
    return this.prisma.paymentTransaction.findFirst({
      where: { gatewayTransactionId },
    });
  }

  private async markPaymentFailed(paymentId: string, reason: string) {
    await this.prisma.paymentTransaction.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.FAILED,
        failedAt: new Date(),
        failureReason: reason,
      },
    });

    const payment = await this.prisma.paymentTransaction.findUnique({
      where: { id: paymentId },
    });
    if (payment) {
      void this.notifications.send({
        userId: payment.userId,
        type: NotificationType.WALLET_TOPUP_REJECTED,
        title: "Payment failed ❌",
        message: `Your payment of Rs. ${payment.amount.toString()} failed. ${reason}`,
        relatedEntityType: "PAYMENT",
        relatedEntityId: paymentId,
      });

      void this.realtime.publish(
        paymentChannel(payment.userId),
        PAYMENT_EVENTS.PAYMENT_FAILED,
        {
          paymentId,
          reason,
          timestamp: new Date(),
        },
      );
    }
  }
}
