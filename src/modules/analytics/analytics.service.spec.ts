import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AnalyticsService } from "./analytics.service";
import {
  AnalyticsQueryDto,
  AnalyticsRangeType,
} from "./dtos/analytics-query.dto";
import { Prisma } from "generated/prisma/client";

const dto = (overrides: Partial<AnalyticsQueryDto> = {}) =>
  overrides as AnalyticsQueryDto;

describe("AnalyticsService (Module 21)", () => {
  let service: AnalyticsService;

  const prisma = {
    job: { count: jest.fn(), groupBy: jest.fn(), findMany: jest.fn() },
    booking: {
      count: jest.fn(),
      aggregate: jest.fn(),
      groupBy: jest.fn(),
      findMany: jest.fn(),
    },
    walletTransaction: { aggregate: jest.fn(), findMany: jest.fn() },
    user: { count: jest.fn(), groupBy: jest.fn(), findMany: jest.fn() },
    dispute: { count: jest.fn(), groupBy: jest.fn(), findMany: jest.fn() },
    ratingSummary: { aggregate: jest.fn() },
    serviceCategory: { findMany: jest.fn() },
    $queryRaw: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();
    service = module.get<AnalyticsService>(AnalyticsService);
  });

  describe("resolveRange — date filters", () => {
    it("defaults to the last 30 days", () => {
      const range = service.resolveRange(dto({}));
      expect(range.gte).toBeInstanceOf(Date);
      expect(range.lte).toBeUndefined();
      const diff = Date.now() - range.gte!.getTime();
      expect(diff).toBeGreaterThan(29 * 86_400_000);
      expect(diff).toBeLessThanOrEqual(30 * 86_400_000 + 1000);
    });

    it("resolves TODAY to the start of the day", () => {
      const range = service.resolveRange(
        dto({ range: AnalyticsRangeType.TODAY }),
      );
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      expect(range.gte!.getTime()).toBe(start.getTime());
    });

    it("resolves LAST_7_DAYS", () => {
      const range = service.resolveRange(
        dto({ range: AnalyticsRangeType.LAST_7_DAYS }),
      );
      const diff = Date.now() - range.gte!.getTime();
      expect(diff).toBeGreaterThan(6 * 86_400_000);
      expect(diff).toBeLessThanOrEqual(7 * 86_400_000 + 1000);
    });

    it("resolves a valid custom range to end-of-day", () => {
      const range = service.resolveRange(
        dto({
          range: AnalyticsRangeType.CUSTOM,
          dateFrom: "2026-01-01",
          dateTo: "2026-01-05",
        }),
      );
      expect(range.gte!.toISOString().startsWith("2026-01-01")).toBe(true);
      // 2026-01-05 end of day (UTC-adjusted to local end of day)
      expect(range.lte!.getHours()).toBe(23);
      expect(range.lte!.getMinutes()).toBe(59);
      expect(range.lte!.getSeconds()).toBe(59);
    });

    it("rejects a custom range missing bounds", () => {
      expect(() =>
        service.resolveRange(
          dto({ range: AnalyticsRangeType.CUSTOM, dateFrom: "2026-01-01" }),
        ),
      ).toThrow(BadRequestException);
      expect(() =>
        service.resolveRange(
          dto({ range: AnalyticsRangeType.CUSTOM, dateTo: "2026-01-05" }),
        ),
      ).toThrow(BadRequestException);
    });

    it("rejects invalid dates", () => {
      expect(() =>
        service.resolveRange(
          dto({
            range: AnalyticsRangeType.CUSTOM,
            dateFrom: "not-a-date",
            dateTo: "2026-01-05",
          }),
        ),
      ).toThrow(BadRequestException);
    });

    it("rejects start after end", () => {
      expect(() =>
        service.resolveRange(
          dto({
            range: AnalyticsRangeType.CUSTOM,
            dateFrom: "2026-02-01",
            dateTo: "2026-01-01",
          }),
        ),
      ).toThrow("dateFrom must be before dateTo");
    });

    it("rejects future ranges", () => {
      const day = 86_400_000;
      const from = new Date(Date.now() - 10 * day).toISOString().slice(0, 10);
      const future = new Date(Date.now() + 1 * day).toISOString().slice(0, 10);
      expect(() =>
        service.resolveRange(
          dto({
            range: AnalyticsRangeType.CUSTOM,
            dateFrom: from,
            dateTo: future,
          }),
        ),
      ).toThrow("cannot be in the future");
    });

    it("rejects ranges longer than 366 days", () => {
      expect(() =>
        service.resolveRange(
          dto({
            range: AnalyticsRangeType.CUSTOM,
            dateFrom: "2024-01-01",
            dateTo: "2026-01-01",
          }),
        ),
      ).toThrow("cannot exceed 366 days");
    });
  });

  describe("getOverview — aggregates without duplication", () => {
    beforeEach(() => {
      // 22 sequential queries in the exact call order of getOverview
      prisma.job.count
        .mockResolvedValueOnce(100) // totalJobs
        .mockResolvedValueOnce(30) // completed
        .mockResolvedValueOnce(10) // pending
        .mockResolvedValueOnce(20) // cancelled
        .mockResolvedValueOnce(30) // expired
        .mockResolvedValueOnce(5); // disputed
      prisma.walletTransaction.aggregate
        .mockResolvedValueOnce({ _sum: { amount: new Prisma.Decimal(750) } }) // commission
        .mockResolvedValueOnce({
          _sum: { amount: new Prisma.Decimal(9250) },
        }) // provider earnings
        .mockResolvedValueOnce({
          _sum: { amount: new Prisma.Decimal(-500) },
        }); // withdrawals (signed debit)
      prisma.booking.aggregate.mockResolvedValueOnce({
        _sum: { totalAmount: new Prisma.Decimal(10000) },
      });
      prisma.user.count
        .mockResolvedValueOnce(40) // total providers
        .mockResolvedValueOnce(200) // total customers
        .mockResolvedValueOnce(15); // new customers
      prisma.user.groupBy.mockResolvedValueOnce([
        { verificationStatus: "APPROVED", _count: { _all: 30 } },
        { verificationStatus: "PENDING", _count: { _all: 10 } },
      ]);
      prisma.booking.count
        .mockResolvedValueOnce(500) // total bookings
        .mockResolvedValueOnce(200) // completed
        .mockResolvedValueOnce(40) // cancelled
        .mockResolvedValueOnce(25); // active
      prisma.dispute.count
        .mockResolvedValueOnce(8) // total
        .mockResolvedValueOnce(3) // open
        .mockResolvedValueOnce(4); // resolved
      prisma.ratingSummary.aggregate.mockResolvedValueOnce({
        _avg: { averageRating: 4.3 },
      });
    });

    it("computes overview from grouped/aggregated queries", async () => {
      const overview = await service.getOverview(dto({}));

      expect(overview.jobs.totalJobs).toBe(100);
      expect(overview.jobs.completedJobs).toBe(30);
      expect(overview.jobs.pendingJobs).toBe(10);
      expect(overview.revenue.totalCommission).toBe(750);
      expect(overview.revenue.totalCompletedJobValue).toBe(10000);
      expect(overview.revenue.totalProviderEarnings).toBe(9250);
      expect(overview.revenue.totalWithdrawals).toBe(500); // abs of debit
      expect(overview.providers.totalProviders).toBe(40);
      expect(overview.providers.approvedProviders).toBe(30);
      expect(overview.providers.pendingProviders).toBe(10);
      expect(overview.providers.bannedProviders).toBe(0);
      expect(overview.providers.averageRating).toBe(4.3);
      expect(overview.customers.totalCustomers).toBe(200);
      expect(overview.customers.newCustomers).toBe(15);
      expect(overview.bookings.totalBookings).toBe(500);
      expect(overview.bookings.completedBookings).toBe(200);
      expect(overview.bookings.activeBookings).toBe(25);
      expect(overview.disputes.totalDisputes).toBe(8);
      expect(overview.disputes.openDisputes).toBe(3);
      expect(overview.disputes.resolvedDisputes).toBe(4);
    });

    it("issues only count/aggregate/groupBy calls (no per-row loops)", async () => {
      await service.getOverview(dto({}));

      expect(prisma.job.findMany).not.toHaveBeenCalled();
      expect(prisma.booking.findMany).not.toHaveBeenCalled();
      expect(prisma.walletTransaction.findMany).not.toHaveBeenCalled();
    });
  });
});
