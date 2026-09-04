import { Test, TestingModule } from "@nestjs/testing";
import { PAYMENT_EVENTS, PaymentService } from "./payment.service";
import { PaymentGatewayRegistry } from "./gateways/payment-gateway.registry";
import { PrismaService } from "src/prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { RealtimeService } from "../realtime/realtime.service";
import { WalletService } from "../wallet/wallet.service";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import {
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import {
  PaymentGatewayType,
  PaymentMethod,
  PaymentStatus,
  WalletType,
  WalletStatus,
  BookingPaymentStatus,
  Prisma,
} from "generated/prisma/client";

// ─── Mock helpers ──────────────────────────────────────────────────────

const mockPrisma = {
  paymentTransaction: {
    create: jest.fn(),
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
    findMany: jest.fn(),
  },
  walletTransaction: {
    findFirst: jest.fn(),
  },
  wallet: {
    findUnique: jest.fn(),
    findUniqueOrThrow: jest.fn(),
  },
  booking: {
    findUnique: jest.fn(),
  },
  $transaction: jest.fn(),
};

const mockNotifications = {
  send: jest.fn(),
};

const mockRealtime = {
  publish: jest.fn().mockResolvedValue(true),
  publishPaymentProcessing: jest.fn().mockResolvedValue(true),
  publishPaymentSucceeded: jest.fn().mockResolvedValue(true),
  publishPaymentFailed: jest.fn().mockResolvedValue(true),
  publishWalletCredited: jest.fn().mockResolvedValue(true),
  publishBookingPaymentCompleted: jest.fn().mockResolvedValue(true),
};

const mockWallet = {
  ensureWallet: jest.fn(),
  credit: jest.fn(),
  audit: jest.fn(),
  // Every successful payment sweeps for pending bookings, so this needs a
  // shape to destructure whether or not a test cares about settlement.
  retryPendingPayments: jest.fn().mockResolvedValue({ settled: [], total: 0 }),
};

const mockLogger = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
};

const mockConfig = {
  get: jest.fn((key: string, defaultValue?: string) => {
    const config: Record<string, string> = {
      APP_URL: "http://localhost:3000",
    };
    return config[key] ?? defaultValue;
  }),
};

// ─── Gateway stub ──────────────────────────────────────────────────────

const mockGateway = {
  gatewayType: PaymentGatewayType.JAZZCASH,
  supportedMethods: [PaymentMethod.JAZZCASH],
  createPayment: jest.fn(),
  verifyPayment: jest.fn(),
  parseWebhook: jest.fn(),
};

const mockRegistry = {
  get: jest.fn().mockReturnValue(mockGateway),
  register: jest.fn(),
  getSupportedTypes: jest.fn(),
  isRegistered: jest.fn(),
};

// ─── Test suite ────────────────────────────────────────────────────────

describe("PaymentService", () => {
  let service: PaymentService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ConfigService, useValue: mockConfig },
        { provide: Logger, useValue: mockLogger },
        { provide: NotificationsService, useValue: mockNotifications },
        { provide: RealtimeService, useValue: mockRealtime },
        { provide: WalletService, useValue: mockWallet },
        { provide: PaymentGatewayRegistry, useValue: mockRegistry },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  // ─── createPayment ────────────────────────────────────────────────

  describe("createPayment", () => {
    const userId = "user-123";
    const dto = {
      amount: 1000,
      gateway: PaymentGatewayType.JAZZCASH,
      paymentMethod: PaymentMethod.JAZZCASH,
    };

    it("should create a payment successfully", async () => {
      mockWallet.ensureWallet.mockResolvedValue({
        id: "wallet-123",
        userId,
        type: WalletType.CUSTOMER,
        balance: new Prisma.Decimal(0),
        status: WalletStatus.ACTIVE,
      });

      const paymentRecord = {
        id: "payment-123",
        userId,
        gateway: PaymentGatewayType.JAZZCASH,
        amount: new Prisma.Decimal(1000),
        status: PaymentStatus.PENDING,
        metadata: null,
      };
      mockPrisma.paymentTransaction.create.mockResolvedValue(paymentRecord);
      mockPrisma.paymentTransaction.update.mockResolvedValue({
        ...paymentRecord,
        status: PaymentStatus.PROCESSING,
        gatewayTransactionId: "JC-txn-123",
      });

      mockGateway.createPayment.mockResolvedValue({
        gatewayTransactionId: "JC-txn-123",
        checkoutUrl: "https://checkout.jazzcash.com/123",
        message: "Payment initiated",
      });

      const result = await service.createPayment(userId, dto);

      expect(mockRegistry.get).toHaveBeenCalledWith(
        PaymentGatewayType.JAZZCASH,
      );
      expect(mockPrisma.paymentTransaction.create).toHaveBeenCalled();
      expect(mockGateway.createPayment).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: 1000,
          reference: "payment-123",
        }),
      );
      expect(result.checkoutUrl).toBe("https://checkout.jazzcash.com/123");
    });

    it("should reject unsupported payment method for gateway", async () => {
      const badDto = {
        amount: 1000,
        gateway: PaymentGatewayType.JAZZCASH,
        paymentMethod: PaymentMethod.EASYPAISA,
      };

      await expect(service.createPayment(userId, badDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it("should reject if booking already paid", async () => {
      mockWallet.ensureWallet.mockResolvedValue({
        id: "wallet-123",
        userId,
        type: WalletType.CUSTOMER,
        balance: new Prisma.Decimal(0),
        status: WalletStatus.ACTIVE,
      });

      mockPrisma.booking.findUnique.mockResolvedValue({
        id: "booking-123",
        customerId: userId,
        paymentStatus: BookingPaymentStatus.COMPLETED,
      });

      const dtoWithBooking = {
        ...dto,
        bookingId: "booking-123",
      };

      await expect(
        service.createPayment(userId, dtoWithBooking),
      ).rejects.toThrow(BadRequestException);
    });

    it("should reject if booking belongs to another user", async () => {
      mockWallet.ensureWallet.mockResolvedValue({
        id: "wallet-123",
        userId,
        type: WalletType.CUSTOMER,
        balance: new Prisma.Decimal(0),
        status: WalletStatus.ACTIVE,
      });

      mockPrisma.booking.findUnique.mockResolvedValue({
        id: "booking-123",
        customerId: "other-user",
        paymentStatus: BookingPaymentStatus.PAYMENT_PENDING,
      });

      const dtoWithBooking = {
        ...dto,
        bookingId: "booking-123",
      };

      await expect(
        service.createPayment(userId, dtoWithBooking),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  // ─── processWebhook ──────────────────────────────────────────────

  describe("processWebhook", () => {
    it("should process a successful webhook and credit wallet", async () => {
      const payment = {
        id: "payment-123",
        userId: "user-123",
        amount: new Prisma.Decimal(1000),
        bookingId: null,
        walletId: "wallet-123",
        idempotencyKey: "key-123",
        gateway: PaymentGatewayType.JAZZCASH,
        gatewayTransactionId: "JC-txn-123",
        status: PaymentStatus.PROCESSING,
      };

      mockGateway.parseWebhook.mockReturnValue({
        gatewayTransactionId: "JC-txn-123",
        amount: 1000,
        currency: "PKR",
        status: "SUCCEEDED",
        rawBody: {},
      });

      mockPrisma.paymentTransaction.findFirst.mockResolvedValue(payment);
      mockPrisma.$transaction.mockImplementation(async (fn: any) => {
        const tx = {
          walletTransaction: {
            findFirst: jest.fn().mockResolvedValue(null),
          },
          paymentTransaction: { update: jest.fn() },
          wallet: { findUniqueOrThrow: jest.fn() },
        };
        return fn(tx) as Promise<unknown>;
      });
      mockWallet.credit.mockResolvedValue({});
      mockWallet.audit.mockResolvedValue({});

      const result = await service.processWebhook(
        PaymentGatewayType.JAZZCASH,
        { "content-type": "application/json" },
        {},
      );

      expect(result.processed).toBe(true);
      expect(mockWallet.credit).toHaveBeenCalled();
    });

    it("settles a pending booking after a top-up that names no booking", async () => {
      // The shape every top-up the app makes has: the customer is sent to the
      // wallet screen to clear a bill and pays there, so the payment has no
      // bookingId. Gating settlement on that field left the money in the
      // wallet and the booking PAYMENT_PENDING, and both the job screen and
      // the dues banner went on asking to be paid.
      const payment = {
        id: "payment-123",
        userId: "user-123",
        amount: new Prisma.Decimal(1000),
        bookingId: null,
        walletId: "wallet-123",
        idempotencyKey: "key-123",
        gateway: PaymentGatewayType.JAZZCASH,
        gatewayTransactionId: "JC-txn-123",
        status: PaymentStatus.PROCESSING,
      };

      mockGateway.parseWebhook.mockReturnValue({
        gatewayTransactionId: "JC-txn-123",
        amount: 1000,
        currency: "PKR",
        status: "SUCCEEDED",
        rawBody: {},
      });

      mockPrisma.paymentTransaction.findFirst.mockResolvedValue(payment);
      mockPrisma.$transaction.mockImplementation(async (fn: any) => {
        const tx = {
          walletTransaction: {
            findFirst: jest.fn().mockResolvedValue(null),
          },
          paymentTransaction: { update: jest.fn() },
          wallet: { findUniqueOrThrow: jest.fn() },
        };
        return fn(tx) as Promise<unknown>;
      });
      mockWallet.credit.mockResolvedValue({});
      mockWallet.audit.mockResolvedValue({});
      mockWallet.retryPendingPayments.mockResolvedValue({
        settled: ["booking-123"],
        total: 1,
      });

      await service.processWebhook(
        PaymentGatewayType.JAZZCASH,
        { "content-type": "application/json" },
        {},
      );

      expect(mockWallet.retryPendingPayments).toHaveBeenCalledWith("user-123");
      expect(mockRealtime.publish).toHaveBeenCalledWith(
        expect.anything(),
        PAYMENT_EVENTS.BOOKING_PAYMENT_COMPLETED,
        expect.objectContaining({ settledBookings: ["booking-123"] }),
      );
    });

    it("does not fail a payment whose settlement sweep throws", async () => {
      // The wallet credit has already committed by this point. A booking that
      // cannot be settled is for the reminder cron to retry, not a reason to
      // report a payment that went through as failed.
      const payment = {
        id: "payment-123",
        userId: "user-123",
        amount: new Prisma.Decimal(1000),
        bookingId: null,
        walletId: "wallet-123",
        idempotencyKey: "key-123",
        gateway: PaymentGatewayType.JAZZCASH,
        gatewayTransactionId: "JC-txn-123",
        status: PaymentStatus.PROCESSING,
      };

      mockGateway.parseWebhook.mockReturnValue({
        gatewayTransactionId: "JC-txn-123",
        amount: 1000,
        currency: "PKR",
        status: "SUCCEEDED",
        rawBody: {},
      });

      mockPrisma.paymentTransaction.findFirst.mockResolvedValue(payment);
      mockPrisma.$transaction.mockImplementation(async (fn: any) => {
        const tx = {
          walletTransaction: {
            findFirst: jest.fn().mockResolvedValue(null),
          },
          paymentTransaction: { update: jest.fn() },
          wallet: { findUniqueOrThrow: jest.fn() },
        };
        return fn(tx) as Promise<unknown>;
      });
      mockWallet.credit.mockResolvedValue({});
      mockWallet.audit.mockResolvedValue({});
      mockWallet.retryPendingPayments.mockRejectedValue(
        new Error("settlement blew up"),
      );

      const result = await service.processWebhook(
        PaymentGatewayType.JAZZCASH,
        { "content-type": "application/json" },
        {},
      );

      expect(result.processed).toBe(true);
      expect(mockWallet.credit).toHaveBeenCalled();
    });

    it("should reject webhook with invalid signature", async () => {
      mockGateway.parseWebhook.mockReturnValue(null);

      await expect(
        service.processWebhook(PaymentGatewayType.JAZZCASH, {}, {}),
      ).rejects.toThrow(BadRequestException);
    });

    it("should handle amount tampering", async () => {
      const payment = {
        id: "payment-123",
        userId: "user-123",
        amount: new Prisma.Decimal(1000),
        bookingId: null,
        walletId: "wallet-123",
        idempotencyKey: "key-123",
        gateway: PaymentGatewayType.JAZZCASH,
        gatewayTransactionId: "JC-txn-123",
        status: PaymentStatus.PROCESSING,
      };

      mockGateway.parseWebhook.mockReturnValue({
        gatewayTransactionId: "JC-txn-123",
        amount: 99999, // Tampered amount
        currency: "PKR",
        status: "SUCCEEDED",
        rawBody: {},
      });

      mockPrisma.paymentTransaction.findFirst.mockResolvedValue(payment);
      mockPrisma.paymentTransaction.update.mockResolvedValue({});

      await expect(
        service.processWebhook(PaymentGatewayType.JAZZCASH, {}, {}),
      ).rejects.toThrow(BadRequestException);
    });

    it("should be idempotent for duplicate webhooks", async () => {
      const payment = {
        id: "payment-123",
        userId: "user-123",
        amount: new Prisma.Decimal(1000),
        status: PaymentStatus.SUCCEEDED,
        gatewayTransactionId: "JC-txn-123",
      };

      mockGateway.parseWebhook.mockReturnValue({
        gatewayTransactionId: "JC-txn-123",
        amount: 1000,
        currency: "PKR",
        status: "SUCCEEDED",
        rawBody: {},
      });

      mockPrisma.paymentTransaction.findFirst.mockResolvedValue(payment);

      const result = await service.processWebhook(
        PaymentGatewayType.JAZZCASH,
        {},
        {},
      );

      expect(result.processed).toBe(true);
      expect(result.reason).toBe("already_processed");
      // Should NOT call wallet.credit again
      expect(mockWallet.credit).not.toHaveBeenCalled();
    });

    it("should handle failed payment webhooks", async () => {
      const payment = {
        id: "payment-123",
        userId: "user-123",
        amount: new Prisma.Decimal(1000),
        status: PaymentStatus.PROCESSING,
        gatewayTransactionId: "JC-txn-123",
      };

      mockGateway.parseWebhook.mockReturnValue({
        gatewayTransactionId: "JC-txn-123",
        amount: 1000,
        currency: "PKR",
        status: "FAILED",
        failureReason: "Insufficient funds",
        rawBody: {},
      });

      mockPrisma.paymentTransaction.findFirst.mockResolvedValue(payment);
      mockPrisma.paymentTransaction.update.mockResolvedValue({});

      const result = await service.processWebhook(
        PaymentGatewayType.JAZZCASH,
        {},
        {},
      );

      expect(result.processed).toBe(true);
      expect(result.reason).toBe("payment_failed");
      expect(mockWallet.credit).not.toHaveBeenCalled();
    });

    it("should return 200 for unknown transactions to prevent retries", async () => {
      mockGateway.parseWebhook.mockReturnValue({
        gatewayTransactionId: "unknown-txn",
        amount: 1000,
        currency: "PKR",
        status: "SUCCEEDED",
        rawBody: {},
      });

      mockPrisma.paymentTransaction.findFirst.mockResolvedValue(null);

      const result = await service.processWebhook(
        PaymentGatewayType.JAZZCASH,
        {},
        {},
      );

      expect(result.processed).toBe(false);
      expect(result.reason).toBe("unknown_transaction");
    });
  });

  // ─── verifyPayment ───────────────────────────────────────────────

  describe("verifyPayment", () => {
    it("should return already-processed when payment is already SUCCEEDED", async () => {
      mockPrisma.paymentTransaction.findFirst.mockResolvedValue({
        id: "payment-123",
        userId: "user-123",
        status: PaymentStatus.SUCCEEDED,
      });

      const result = (await service.verifyPayment(
        "user-123",
        "payment-123",
      )) as { verified: boolean; message: string };

      expect(result.verified).toBe(true);
      expect(result.message).toBe("Payment already processed");
    });

    it("should return already processed for succeeded payment", async () => {
      mockPrisma.paymentTransaction.findFirst.mockResolvedValue({
        id: "payment-123",
        userId: "user-123",
        status: PaymentStatus.SUCCEEDED,
      });

      const result = (await service.verifyPayment(
        "user-123",
        "payment-123",
      )) as { verified: boolean; message: string };

      expect(result.verified).toBe(true);
      expect(result.message).toBe("Payment already processed");
    });

    it("should throw NotFoundException for unknown payment", async () => {
      mockPrisma.paymentTransaction.findFirst.mockResolvedValue(null);

      await expect(
        service.verifyPayment("user-123", "nonexistent"),
      ).rejects.toThrow(NotFoundException);
    });

    /**
     * Verification is the whole of the payment flow while the gateways run in
     * sandbox — there is no webhook to fall back on — so the path from
     * "verify" to "wallet credited" is worth asserting end to end.
     */
    it("should credit the wallet when the gateway confirms the full amount", async () => {
      mockPrisma.paymentTransaction.findFirst.mockResolvedValue({
        id: "payment-123",
        userId: "user-123",
        status: PaymentStatus.PROCESSING,
        amount: new Prisma.Decimal(5000),
        bookingId: null,
        walletId: "wallet-123",
        idempotencyKey: "key-123",
        gateway: PaymentGatewayType.JAZZCASH,
        gatewayTransactionId: "JC-txn-123",
      });

      mockGateway.verifyPayment.mockResolvedValue({
        success: true,
        gatewayTransactionId: "JC-txn-123",
        amount: 5000,
        currency: "PKR",
        status: "SANDBOX_VERIFIED",
      });

      mockPrisma.$transaction.mockImplementation(async (fn: any) => {
        const tx = {
          walletTransaction: { findFirst: jest.fn().mockResolvedValue(null) },
          paymentTransaction: { update: jest.fn() },
          wallet: { findUniqueOrThrow: jest.fn() },
        };
        return fn(tx) as Promise<unknown>;
      });
      mockWallet.credit.mockResolvedValue({});
      mockWallet.audit.mockResolvedValue({});

      const result = (await service.verifyPayment(
        "user-123",
        "payment-123",
      )) as {
        processed: boolean;
      };

      // The sandbox stubs have no gateway to ask what the payment was worth,
      // so the recorded amount is handed to them. Without it they answer 0,
      // the comparison below fails, and nothing is ever credited.
      expect(mockGateway.verifyPayment).toHaveBeenCalledWith(
        expect.objectContaining({ expectedAmount: 5000 }),
      );
      expect(mockWallet.credit).toHaveBeenCalled();
      expect(result.processed).toBe(true);
    });

    it("should not credit when the gateway reports a different amount", async () => {
      mockPrisma.paymentTransaction.findFirst.mockResolvedValue({
        id: "payment-123",
        userId: "user-123",
        status: PaymentStatus.PROCESSING,
        amount: new Prisma.Decimal(5000),
        bookingId: null,
        walletId: "wallet-123",
        idempotencyKey: "key-123",
        gateway: PaymentGatewayType.JAZZCASH,
        gatewayTransactionId: "JC-txn-123",
      });

      mockGateway.verifyPayment.mockResolvedValue({
        success: true,
        gatewayTransactionId: "JC-txn-123",
        amount: 1,
        currency: "PKR",
        status: "SUCCEEDED",
      });

      await service.verifyPayment("user-123", "payment-123");

      expect(mockWallet.credit).not.toHaveBeenCalled();
    });
  });

  // ─── Admin endpoints ─────────────────────────────────────────────

  describe("adminListPayments", () => {
    it("should list payments with pagination", async () => {
      mockPrisma.paymentTransaction.findMany.mockResolvedValue([]);
      mockPrisma.paymentTransaction.count.mockResolvedValue(0);

      const result = await service.adminListPayments({ page: 1, limit: 10 });

      expect(result.data).toEqual([]);
      expect(result.meta.total).toBe(0);
    });
  });

  describe("adminGetPayment", () => {
    it("should return payment details", async () => {
      const payment = { id: "payment-123", userId: "user-123" };
      mockPrisma.paymentTransaction.findUnique.mockResolvedValue(payment);

      const result = await service.adminGetPayment("payment-123");
      expect(result).toEqual(payment);
    });

    it("should throw NotFoundException for unknown payment", async () => {
      mockPrisma.paymentTransaction.findUnique.mockResolvedValue(null);

      await expect(service.adminGetPayment("nonexistent")).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("adminRetryPayment", () => {
    it("should retry a failed payment", async () => {
      const payment = {
        id: "payment-123",
        userId: "user-123",
        amount: new Prisma.Decimal(1000),
        bookingId: null,
        walletId: "wallet-123",
        idempotencyKey: "key-123",
        gateway: PaymentGatewayType.JAZZCASH,
        gatewayTransactionId: "JC-txn-123",
        status: PaymentStatus.FAILED,
      };

      mockPrisma.paymentTransaction.findUnique.mockResolvedValue(payment);
      mockGateway.verifyPayment.mockResolvedValue({
        success: true,
        gatewayTransactionId: "JC-txn-123",
        amount: 1000,
        currency: "PKR",
        status: "VERIFIED",
      });

      mockPrisma.$transaction.mockImplementation(async (fn: any) => {
        const tx = {
          walletTransaction: { findFirst: jest.fn().mockResolvedValue(null) },
          paymentTransaction: { update: jest.fn() },
          wallet: { findUniqueOrThrow: jest.fn() },
        };
        return await fn(tx);
      });
      mockWallet.credit.mockResolvedValue({});
      mockWallet.audit.mockResolvedValue({});

      const result = (await service.adminRetryPayment("payment-123")) as {
        processed: boolean;
      };

      expect(result.processed).toBe(true);
    });

    it("should reject retry for non-failed payments", async () => {
      mockPrisma.paymentTransaction.findUnique.mockResolvedValue({
        id: "payment-123",
        status: PaymentStatus.SUCCEEDED,
      });

      await expect(service.adminRetryPayment("payment-123")).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});

// ─── Gateway Registry tests ─────────────────────────────────────────

describe("PaymentGatewayRegistry", () => {
  let registry: PaymentGatewayRegistry;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentGatewayRegistry],
    }).compile();

    registry = module.get<PaymentGatewayRegistry>(PaymentGatewayRegistry);
  });

  it("should register and retrieve gateways", () => {
    const gateway = {
      gatewayType: PaymentGatewayType.JAZZCASH,
      supportedMethods: [PaymentMethod.JAZZCASH],
      createPayment: jest.fn(),
      verifyPayment: jest.fn(),
      parseWebhook: jest.fn(),
    };

    registry.register(gateway);
    expect(registry.get(PaymentGatewayType.JAZZCASH)).toBe(gateway);
    expect(registry.isRegistered(PaymentGatewayType.JAZZCASH)).toBe(true);
  });

  it("should throw for unregistered gateway", () => {
    expect(() => registry.get(PaymentGatewayType.JAZZCASH)).toThrow();
  });

  it("should list supported types", () => {
    const gateway = {
      gatewayType: PaymentGatewayType.JAZZCASH,
      supportedMethods: [PaymentMethod.JAZZCASH],
      createPayment: jest.fn(),
      verifyPayment: jest.fn(),
      parseWebhook: jest.fn(),
    };

    registry.register(gateway);
    expect(registry.getSupportedTypes()).toContain(PaymentGatewayType.JAZZCASH);
  });
});
