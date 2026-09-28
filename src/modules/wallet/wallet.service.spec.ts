import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Logger } from "nestjs-pino";
import { PrismaService } from "src/prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { AdminAuditService } from "src/common/services/admin-audit.service";
import { SettingsService } from "../settings/settings.service";
import { WalletService } from "./wallet.service";
import {
  BookingPaymentStatus,
  Prisma,
  WalletStatus,
  WalletType,
} from "generated/prisma/client";

/**
 * Paying a completed job out of a balance the customer already holds.
 *
 * Until this existed every route to settling a PAYMENT_PENDING booking went
 * through someone else — an admin approving a top-up, a gateway callback, or
 * the 09:00 sweep — so a customer with the money in hand was shown a "top up
 * your wallet" banner and left waiting, with the provider unpaid.
 */
describe("WalletService — settleDues", () => {
  let service: WalletService;

  const prisma = {
    booking: { findUnique: jest.fn(), findMany: jest.fn(), update: jest.fn() },
    wallet: { findUnique: jest.fn(), findFirst: jest.fn(), create: jest.fn() },
    user: { findUnique: jest.fn() },
  };

  const logger = { log: jest.fn(), error: jest.fn(), warn: jest.fn() };
  const config = { get: jest.fn() };
  const notifications = { send: jest.fn() };
  const adminAudit = { record: jest.fn() };
  const settings = { getPaymentMode: jest.fn() };

  const CUSTOMER = "cust-1";

  const wallet = (balance: number) => ({
    id: "wallet-1",
    userId: CUSTOMER,
    type: WalletType.CUSTOMER,
    balance: new Prisma.Decimal(balance),
    heldBalance: new Prisma.Decimal(0),
    status: WalletStatus.ACTIVE,
  });

  const pending = (id: string, amount: number) => ({
    id,
    customerId: CUSTOMER,
    totalAmount: new Prisma.Decimal(amount),
    paymentStatus: BookingPaymentStatus.PAYMENT_PENDING,
    job: { id: `job-${id}`, title: `Job ${id}` },
    customerConfirmedAt: new Date(),
    providerConfirmedAt: new Date(),
  });

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        { provide: PrismaService, useValue: prisma },
        { provide: ConfigService, useValue: config },
        { provide: Logger, useValue: logger },
        { provide: NotificationsService, useValue: notifications },
        { provide: AdminAuditService, useValue: adminAudit },
        { provide: SettingsService, useValue: settings },
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
  });

  it("charges the booking the customer asked to pay", async () => {
    prisma.booking.findUnique.mockResolvedValue(pending("bk-1", 2500));
    prisma.booking.findMany
      // retryPendingPayments — what is still owed
      .mockResolvedValueOnce([pending("bk-1", 2500)])
      // outstandingDues after the charge — nothing left
      .mockResolvedValueOnce([]);
    prisma.wallet.findUnique.mockResolvedValue(wallet(10000));

    const processJobPayment = jest
      .spyOn(service, "processJobPayment")
      .mockResolvedValue({ success: true } as never);

    const result = await service.settleDues(CUSTOMER, "bk-1");

    expect(processJobPayment).toHaveBeenCalledWith("bk-1");
    expect(result.settled).toEqual(["bk-1"]);
    expect(result.remainingCount).toBe(0);
    expect(result.shortfall).toBeNull();
  });

  it("pays only the named booking, not every bill the customer owes", async () => {
    // The whole point of the bookingId: pressing "Pay now" on one job must not
    // quietly drain the wallet across the other two.
    prisma.booking.findUnique.mockResolvedValue(pending("bk-2", 2500));
    prisma.booking.findMany
      .mockResolvedValueOnce([pending("bk-2", 2500)])
      .mockResolvedValueOnce([pending("bk-1", 1000), pending("bk-3", 800)]);
    prisma.wallet.findUnique.mockResolvedValue(wallet(10000));

    jest
      .spyOn(service, "processJobPayment")
      .mockResolvedValue({ success: true } as never);

    const result = await service.settleDues(CUSTOMER, "bk-2");

    const [scoped] = prisma.booking.findMany.mock.calls[0] as [
      { where: Record<string, unknown> },
    ];
    expect(scoped.where).toMatchObject({ id: "bk-2", customerId: CUSTOMER });
    expect(result.settled).toEqual(["bk-2"]);
    expect(result.remainingCount).toBe(2);
  });

  it("reports the gap when the balance still does not cover the job", async () => {
    prisma.booking.findUnique.mockResolvedValue(pending("bk-1", 2500));
    prisma.booking.findMany
      .mockResolvedValueOnce([pending("bk-1", 2500)])
      .mockResolvedValueOnce([pending("bk-1", 2500)]);
    prisma.wallet.findUnique.mockResolvedValue(wallet(400));

    const result = await service.settleDues(CUSTOMER, "bk-1");

    expect(result.settled).toEqual([]);
    expect(result.shortfall?.toString()).toBe("2100");
  });

  it("treats an already-paid booking as success, not an error", async () => {
    // Two taps on "Pay now", or the sweep landing mid-screen. The job is paid
    // either way, and an error here would read as a failed payment.
    prisma.booking.findUnique.mockResolvedValue({
      id: "bk-1",
      customerId: CUSTOMER,
      paymentStatus: BookingPaymentStatus.COMPLETED,
    });
    prisma.booking.findMany.mockResolvedValueOnce([]);

    const processJobPayment = jest.spyOn(service, "processJobPayment");

    const result = await service.settleDues(CUSTOMER, "bk-1");

    expect(result.alreadySettled).toBe(true);
    expect(processJobPayment).not.toHaveBeenCalled();
  });

  it("will not settle a booking belonging to someone else", async () => {
    prisma.booking.findUnique.mockResolvedValue({
      id: "bk-1",
      customerId: "someone-else",
      paymentStatus: BookingPaymentStatus.PAYMENT_PENDING,
    });

    await expect(service.settleDues(CUSTOMER, "bk-1")).rejects.toThrow(
      NotFoundException,
    );
  });

  it("clears the oldest bills first when no booking is named", async () => {
    // Ordered so that a balance covering only some of them pays the provider
    // who has waited longest.
    prisma.booking.findMany
      .mockResolvedValueOnce([pending("bk-1", 1000), pending("bk-2", 800)])
      .mockResolvedValueOnce([]);
    prisma.wallet.findUnique.mockResolvedValue(wallet(10000));

    jest
      .spyOn(service, "processJobPayment")
      .mockResolvedValue({ success: true } as never);

    const result = await service.settleDues(CUSTOMER);

    const [swept] = prisma.booking.findMany.mock.calls[0] as [
      { where: Record<string, unknown>; orderBy: Record<string, unknown> },
    ];
    expect(swept.where).not.toHaveProperty("id");
    expect(swept.orderBy).toEqual({ createdAt: "asc" });
    expect(result.settled).toEqual(["bk-1", "bk-2"]);
  });
});

/**
 * Payments made before the wording changed still say "booking #<booking id>",
 * which matches nothing a customer can see — so the history is rewritten on the
 * way out rather than left disagreeing with the job screen.
 */
describe("WalletService — customer transaction wording", () => {
  let service: WalletService;

  const prisma = { booking: { findMany: jest.fn() } };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        { provide: PrismaService, useValue: prisma },
        { provide: ConfigService, useValue: { get: jest.fn() } },
        { provide: Logger, useValue: { log: jest.fn(), error: jest.fn(), warn: jest.fn() } },
        { provide: NotificationsService, useValue: { send: jest.fn() } },
        { provide: AdminAuditService, useValue: { record: jest.fn() } },
        { provide: SettingsService, useValue: { getPaymentMode: jest.fn() } },
      ],
    }).compile();
    service = module.get<WalletService>(WalletService);

    jest.spyOn(service as never, "ensureWallet").mockResolvedValue({ id: "w1" } as never);
  });

  const row = (over: Record<string, unknown>) => ({
    id: "t1",
    referenceType: "BOOKING",
    referenceId: "6e1a28e0-aaaa",
    description: "Payment for booking #6e1a28e0",
    ...over,
  });

  it("quotes the job's id on an older payment", async () => {
    jest
      .spyOn(service as never, "queryTransactions")
      .mockResolvedValue({ data: [row({})], meta: {} } as never);
    prisma.booking.findMany.mockResolvedValue([{ id: "6e1a28e0-aaaa", jobId: "9f3c77d1-bbbb" }]);

    const result = await service.listTransactions("c1", WalletType.CUSTOMER, {} as never);

    expect(result.data[0].description).toBe("Payment for job #9f3c77d1");
  });

  it("leaves a provider's wallet text alone", async () => {
    jest
      .spyOn(service as never, "queryTransactions")
      .mockResolvedValue({ data: [row({})], meta: {} } as never);

    const result = await service.listTransactions("p1", WalletType.PROVIDER, {} as never);

    expect(prisma.booking.findMany).not.toHaveBeenCalled();
    expect(result.data[0].description).toBe("Payment for booking #6e1a28e0");
  });

  it("does not look anything up when no row needs rewriting", async () => {
    jest
      .spyOn(service as never, "queryTransactions")
      .mockResolvedValue({
        data: [row({ description: "Payment for job #9f3c77d1" })],
        meta: {},
      } as never);

    await service.listTransactions("c1", WalletType.CUSTOMER, {} as never);

    expect(prisma.booking.findMany).not.toHaveBeenCalled();
  });
});
