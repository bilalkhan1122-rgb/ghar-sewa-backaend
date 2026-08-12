import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import {
  BookingStatus,
  DisputeStatus,
  JobStatus,
  Prisma,
  UserRole,
  VerificationStatus,
  WalletTransactionType,
} from "generated/prisma/client";
import {
  AnalyticsQueryDto,
  AnalyticsRangeType,
} from "./dtos/analytics-query.dto";

export interface DateFilter {
  gte?: Date;
  lte?: Date;
}

/** Longest window we will aggregate in one query — prevents runaway scans. */
const MAX_RANGE_DAYS = 366;

const OPEN_DISPUTE_STATUSES: DisputeStatus[] = [
  DisputeStatus.OPEN,
  DisputeStatus.UNDER_REVIEW,
  DisputeStatus.WAITING_FOR_RESPONSE,
];

/**
 * Module 21 — Analytics.
 *
 * Every metric is computed live from existing transactional data via Prisma
 * aggregations ($queryRaw for time series). No analytics tables, no N+1
 * loops, nothing loaded wholesale into application memory. The service is
 * structured so a caching layer or pre-aggregated tables can be added later
 * without touching the controllers.
 */
@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Range resolution ────────────────────────────────────────────────

  /**
   * Resolve a validated { gte, lte } window from the query DTO. Rejects
   * invalid or unreasonable custom ranges (missing bounds, inverted order,
   * longer than MAX_RANGE_DAYS, or in the future).
   */
  resolveRange(dto: AnalyticsQueryDto): DateFilter {
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    switch (dto.range ?? AnalyticsRangeType.LAST_30_DAYS) {
      case AnalyticsRangeType.TODAY:
        return { gte: todayStart };
      case AnalyticsRangeType.LAST_7_DAYS: {
        const gte = new Date(now);
        gte.setDate(gte.getDate() - 7);
        return { gte };
      }
      case AnalyticsRangeType.LAST_30_DAYS: {
        const gte = new Date(now);
        gte.setDate(gte.getDate() - 30);
        return { gte };
      }
      case AnalyticsRangeType.CUSTOM: {
        if (!dto.dateFrom || !dto.dateTo) {
          throw new BadRequestException(
            "Custom range requires both dateFrom and dateTo",
          );
        }
        const from = new Date(dto.dateFrom);
        const to = new Date(dto.dateTo);
        to.setHours(23, 59, 59, 999);

        if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
          throw new BadRequestException("Invalid custom date range");
        }
        if (from > to) {
          throw new BadRequestException("dateFrom must be before dateTo");
        }
        const days = Math.ceil((to.getTime() - from.getTime()) / 86_400_000);
        if (days > MAX_RANGE_DAYS) {
          throw new BadRequestException(
            `Custom range cannot exceed ${MAX_RANGE_DAYS} days`,
          );
        }
        if (to > now) {
          throw new BadRequestException("Custom range cannot be in the future");
        }
        return { gte: from, lte: to };
      }
    }
  }

  // ─── Overview ────────────────────────────────────────────────────────

  async getOverview(dto: AnalyticsQueryDto) {
    const range = this.resolveRange(dto);

    const [
      totalJobs,
      completedJobs,
      pendingJobs,
      cancelledJobs,
      expiredJobs,
      disputedJobs,
      commissionAgg,
      completedValueAgg,
      providerEarningsAgg,
      withdrawalsAgg,
      totalProviders,
      verificationGroups,
      totalCustomers,
      newCustomers,
      totalBookings,
      completedBookings,
      cancelledBookings,
      activeBookings,
      totalDisputes,
      openDisputes,
      resolvedDisputes,
      averageRatingAgg,
    ] = await Promise.all([
      this.prisma.job.count(),
      this.prisma.job.count({ where: { status: JobStatus.COMPLETED } }),
      this.prisma.job.count({ where: { status: JobStatus.PENDING } }),
      this.prisma.job.count({ where: { status: JobStatus.CANCELLED } }),
      this.prisma.job.count({ where: { status: JobStatus.EXPIRED } }),
      this.prisma.job.count({ where: { status: JobStatus.DISPUTED } }),
      this.commissionAggregate(range),
      this.prisma.booking.aggregate({
        where: {
          status: BookingStatus.COMPLETED,
          ...(range.gte || range.lte ? { completedAt: range } : {}),
        },
        _sum: { totalAmount: true },
      }),
      this.prisma.walletTransaction.aggregate({
        where: {
          type: WalletTransactionType.PROVIDER_EARNING,
          ...(range.gte || range.lte ? { createdAt: range } : {}),
        },
        _sum: { amount: true },
      }),
      this.prisma.walletTransaction.aggregate({
        where: {
          type: WalletTransactionType.WITHDRAWAL_COMPLETED,
          ...(range.gte || range.lte ? { createdAt: range } : {}),
        },
        _sum: { amount: true },
      }),
      this.prisma.user.count({ where: { role: UserRole.PROVIDER } }),
      this.prisma.user.groupBy({
        by: ["verificationStatus"],
        where: { role: UserRole.PROVIDER },
        _count: { _all: true },
      }),
      this.prisma.user.count({ where: { role: UserRole.CUSTOMER } }),
      this.prisma.user.count({
        where: { role: UserRole.CUSTOMER, createdAt: range },
      }),
      this.prisma.booking.count(),
      this.prisma.booking.count({ where: { status: BookingStatus.COMPLETED } }),
      this.prisma.booking.count({ where: { status: BookingStatus.CANCELLED } }),
      this.prisma.booking.count({
        where: {
          status: { in: [BookingStatus.ACCEPTED, BookingStatus.IN_PROGRESS] },
        },
      }),
      this.prisma.dispute.count(),
      this.prisma.dispute.count({
        where: { status: { in: OPEN_DISPUTE_STATUSES } },
      }),
      this.prisma.dispute.count({ where: { status: DisputeStatus.RESOLVED } }),
      this.prisma.ratingSummary.aggregate({
        where: { user: { role: UserRole.PROVIDER } },
        _avg: { averageRating: true },
      }),
    ]);

    const verification = this.groupsToRecord(
      verificationGroups,
      "verificationStatus",
    );

    return {
      period: this.describeRange(range),
      jobs: {
        totalJobs,
        completedJobs,
        pendingJobs,
        cancelledJobs,
        expiredJobs,
        disputedJobs,
      },
      revenue: {
        totalCommission: this.toNumber(commissionAgg),
        totalCompletedJobValue: this.toNumber(completedValueAgg),
        totalProviderEarnings: this.toNumber(providerEarningsAgg),
        totalWithdrawals: this.absNumber(withdrawalsAgg),
      },
      providers: {
        totalProviders,
        approvedProviders: verification[VerificationStatus.APPROVED] ?? 0,
        pendingProviders: verification[VerificationStatus.PENDING] ?? 0,
        rejectedProviders: verification[VerificationStatus.REJECTED] ?? 0,
        bannedProviders: verification[VerificationStatus.BANNED] ?? 0,
        averageRating: averageRatingAgg._avg.averageRating ?? 0,
      },
      customers: {
        totalCustomers,
        newCustomers,
      },
      bookings: {
        totalBookings,
        completedBookings,
        cancelledBookings,
        activeBookings,
      },
      disputes: {
        totalDisputes,
        openDisputes,
        resolvedDisputes,
      },
    };
  }

  // ─── Jobs ────────────────────────────────────────────────────────────

  async getJobsAnalytics(dto: AnalyticsQueryDto) {
    const range = this.resolveRange(dto);

    const [
      statusGroups,
      urgentCount,
      postedDaily,
      postedWeekly,
      postedMonthly,
      completedDaily,
    ] = await Promise.all([
      this.prisma.job.groupBy({
        by: ["status"],
        where: range.gte || range.lte ? { createdAt: range } : undefined,
        _count: { _all: true },
      }),
      this.prisma.job.count({
        where: {
          isUrgent: true,
          ...(range.gte || range.lte ? { createdAt: range } : {}),
        },
      }),
      this.countSeries("jobs", "createdAt", range, "day"),
      this.countSeries("jobs", "createdAt", range, "week"),
      this.countSeries("jobs", "createdAt", range, "month"),
      this.countSeries(
        "bookings",
        "completedAt",
        range,
        "day",
        Prisma.sql`"status" = 'COMPLETED'`,
      ),
    ]);

    return {
      period: this.describeRange(range),
      totals: this.groupsToRecord(statusGroups, "status"),
      urgentJobs: urgentCount,
      timeSeries: {
        postedPerDay: postedDaily,
        postedPerWeek: postedWeekly,
        postedPerMonth: postedMonthly,
        completedPerDay: completedDaily,
      },
      // NOTE: completed jobs per week/month mirror the daily series; they are
      // deliberately not materialized to avoid redundant queries.
      _limitations: [
        "completedPerWeek/completedPerMonth are derivable from completedPerDay — not recomputed",
      ],
    };
  }

  // ─── Revenue ─────────────────────────────────────────────────────────

  async getRevenueAnalytics(dto: AnalyticsQueryDto) {
    const range = this.resolveRange(dto);

    const [
      commissionAgg,
      completedValueAgg,
      providerEarningsAgg,
      withdrawalsAgg,
      topUpsAgg,
      commissionDaily,
      commissionWeekly,
      commissionMonthly,
    ] = await Promise.all([
      this.commissionAggregate(range),
      this.prisma.booking.aggregate({
        where: {
          status: BookingStatus.COMPLETED,
          ...(range.gte || range.lte ? { completedAt: range } : {}),
        },
        _sum: { totalAmount: true },
      }),
      this.prisma.walletTransaction.aggregate({
        where: {
          type: WalletTransactionType.PROVIDER_EARNING,
          ...(range.gte || range.lte ? { createdAt: range } : {}),
        },
        _sum: { amount: true },
      }),
      this.prisma.walletTransaction.aggregate({
        where: {
          type: WalletTransactionType.WITHDRAWAL_COMPLETED,
          ...(range.gte || range.lte ? { createdAt: range } : {}),
        },
        _sum: { amount: true },
      }),
      this.prisma.walletTransaction.aggregate({
        where: {
          type: WalletTransactionType.TOP_UP,
          ...(range.gte || range.lte ? { createdAt: range } : {}),
        },
        _sum: { amount: true },
      }),
      this.sumSeries(
        "wallet_transactions",
        "createdAt",
        range,
        "day",
        Prisma.sql`"type" = 'PLATFORM_COMMISSION'`,
      ),
      this.sumSeries(
        "wallet_transactions",
        "createdAt",
        range,
        "week",
        Prisma.sql`"type" = 'PLATFORM_COMMISSION'`,
      ),
      this.sumSeries(
        "wallet_transactions",
        "createdAt",
        range,
        "month",
        Prisma.sql`"type" = 'PLATFORM_COMMISSION'`,
      ),
    ]);

    return {
      period: this.describeRange(range),
      totals: {
        totalCommission: this.toNumber(commissionAgg),
        totalCompletedJobValue: this.toNumber(completedValueAgg),
        totalProviderEarnings: this.toNumber(providerEarningsAgg),
        totalWithdrawals: this.absNumber(withdrawalsAgg),
        totalTopUps: this.absNumber(topUpsAgg),
      },
      commissionTimeSeries: {
        perDay: commissionDaily,
        perWeek: commissionWeekly,
        perMonth: commissionMonthly,
      },
    };
  }

  // ─── Providers ───────────────────────────────────────────────────────

  async getProviderAnalytics(dto: AnalyticsQueryDto) {
    const range = this.resolveRange(dto);
    const topN = dto.topN ?? 10;

    const [
      totalProviders,
      verificationGroups,
      averageRatingAgg,
      completedByProvider,
      topGroups,
    ] = await Promise.all([
      this.prisma.user.count({ where: { role: UserRole.PROVIDER } }),
      this.prisma.user.groupBy({
        by: ["verificationStatus"],
        where: { role: UserRole.PROVIDER },
        _count: { _all: true },
      }),
      this.prisma.ratingSummary.aggregate({
        where: { user: { role: UserRole.PROVIDER } },
        _avg: { averageRating: true },
      }),
      this.prisma.booking.groupBy({
        by: ["providerId"],
        where: {
          status: BookingStatus.COMPLETED,
          ...(range.gte || range.lte ? { completedAt: range } : {}),
        },
        _count: { _all: true },
      }),
      this.prisma.booking.groupBy({
        by: ["providerId"],
        where: { status: BookingStatus.COMPLETED },
        _count: { _all: true },
        orderBy: { _count: { providerId: "desc" } },
        take: topN,
      }),
    ]);

    const providerIds = topGroups.map((g) => g.providerId);
    const providerDetails = providerIds.length
      ? await this.prisma.user.findMany({
          where: { id: { in: providerIds } },
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            profilePhoto: true,
            verificationStatus: true,
            ratingSummary: {
              select: { averageRating: true, totalReviews: true },
            },
          },
        })
      : [];

    const detailMap = new Map(providerDetails.map((p) => [p.id, p]));

    const verification = this.groupsToRecord(
      verificationGroups,
      "verificationStatus",
    );

    return {
      period: this.describeRange(range),
      totals: {
        totalProviders,
        approvedProviders: verification[VerificationStatus.APPROVED] ?? 0,
        pendingProviders: verification[VerificationStatus.PENDING] ?? 0,
        rejectedProviders: verification[VerificationStatus.REJECTED] ?? 0,
        bannedProviders: verification[VerificationStatus.BANNED] ?? 0,
      },
      averageProviderRating: averageRatingAgg._avg.averageRating ?? 0,
      activeProvidersInRange: completedByProvider.length,
      // Lifetime average — labeled as such because the total-provider
      // denominator is not range-filtered.
      jobsCompletedPerProviderLifetime: totalProviders
        ? completedByProvider.length / totalProviders
        : 0,
      topProviders: topGroups.map((g) => {
        const details = detailMap.get(g.providerId);
        return {
          providerId: g.providerId,
          fullName: details?.fullName ?? "Unknown",
          email: details?.email ?? null,
          phone: details?.phone ?? null,
          completedJobs: g._count?._all ?? 0,
          averageRating: details?.ratingSummary?.averageRating ?? 0,
          totalReviews: details?.ratingSummary?.totalReviews ?? 0,
        };
      }),
    };
  }

  // ─── Customers ───────────────────────────────────────────────────────

  async getCustomerAnalytics(dto: AnalyticsQueryDto) {
    const range = this.resolveRange(dto);

    const [totalCustomers, newCustomers, activeGroups, repeatCustomers] =
      await Promise.all([
        this.prisma.user.count({ where: { role: UserRole.CUSTOMER } }),
        this.prisma.user.count({
          where: { role: UserRole.CUSTOMER, createdAt: range },
        }),
        this.prisma.booking.groupBy({
          by: ["customerId"],
          where: range.gte || range.lte ? { createdAt: range } : undefined,
        }),
        this.prisma.booking.groupBy({
          by: ["customerId"],
          where: { status: BookingStatus.COMPLETED },
          _count: { _all: true },
        }),
      ]);

    const activeCustomers = activeGroups.length;
    const repeatCount = repeatCustomers.filter(
      (g) => (g._count?._all ?? 0) >= 2,
    ).length;

    return {
      period: this.describeRange(range),
      totals: {
        totalCustomers,
        newCustomers,
        activeCustomers,
        repeatCustomers: repeatCount,
      },
      // NOTE: customer retention requires tracking first-activity dates per
      // customer, which the current booking schema supports only partially —
      // repeatCustomer count (>=2 completed bookings) is the reliable proxy.
      _limitations: [
        "churn/retention rates need a per-customer first-activity anchor; not fabricated",
      ],
    };
  }

  // ─── Categories ──────────────────────────────────────────────────────

  async getCategoryAnalytics(dto: AnalyticsQueryDto) {
    const range = this.resolveRange(dto);
    const { page = 1, limit = 10 } = dto;

    const [categories, jobsGroups, completedGroups] = await Promise.all([
      this.prisma.serviceCategory.findMany({
        orderBy: { displayOrder: "asc" },
        select: { id: true, name: true, slug: true, icon: true },
      }),
      this.prisma.job.groupBy({
        by: ["categoryId"],
        where: range.gte || range.lte ? { createdAt: range } : undefined,
        _count: { _all: true },
        _avg: { offeredPrice: true },
      }),
      this.prisma.job.groupBy({
        by: ["categoryId"],
        where: { status: JobStatus.COMPLETED },
        _count: { _all: true },
      }),
    ]);

    const jobsMap = new Map(jobsGroups.map((g) => [g.categoryId, g]));
    const completedMap = new Map(
      completedGroups.map((g) => [g.categoryId, g._count._all]),
    );

    const rows = categories
      .map((c) => {
        const jobs = jobsMap.get(c.id);
        const total = jobs?._count._all ?? 0;
        const completed = completedMap.get(c.id) ?? 0;
        return {
          categoryId: c.id,
          categoryName: c.name,
          slug: c.slug,
          icon: c.icon,
          totalJobs: total,
          completedJobs: completed,
          averageJobValue: jobs?._avg.offeredPrice ?? 0,
          completionRate: total ? completed / total : 0,
        };
      })
      .sort((a, b) => b.totalJobs - a.totalJobs);

    const skip = (page - 1) * limit;
    const data = rows.slice(skip, skip + limit);
    const total = rows.length;
    const totalPages = Math.ceil(total / limit);

    return {
      period: this.describeRange(range),
      mostPopular: rows.slice(0, 5),
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

  // ─── Disputes ────────────────────────────────────────────────────────

  async getDisputeAnalytics(dto: AnalyticsQueryDto) {
    const range = this.resolveRange(dto);

    const [statusGroups, totalBookings, reasonGroups, avgResolutionRaw] =
      await Promise.all([
        this.prisma.dispute.groupBy({
          by: ["status"],
          where: range.gte || range.lte ? { createdAt: range } : undefined,
          _count: { _all: true },
        }),
        this.prisma.booking.count(),
        this.prisma.dispute.groupBy({
          by: ["reason"],
          where: range.gte || range.lte ? { createdAt: range } : undefined,
          _count: { _all: true },
          orderBy: { _count: { reason: "desc" } },
          take: 10,
        }),
        this.prisma.$queryRaw<{ hours: number | null }[]>`
          SELECT AVG(EXTRACT(EPOCH FROM ("resolvedAt" - "createdAt")) / 3600)::float8 AS hours
          FROM "disputes"
          WHERE "resolvedAt" IS NOT NULL
          ${range.gte ? Prisma.sql`AND "createdAt" >= ${range.gte}` : Prisma.empty}
          ${range.lte ? Prisma.sql`AND "createdAt" <= ${range.lte}` : Prisma.empty}
        `,
      ]);

    const byStatus = this.groupsToRecord(statusGroups, "status");
    const totalDisputes = statusGroups.reduce(
      (s, g) => s + (g._count?._all ?? 0),
      0,
    );

    return {
      period: this.describeRange(range),
      totals: {
        totalDisputes,
        openDisputes: OPEN_DISPUTE_STATUSES.reduce(
          (s, st) => s + (byStatus[st] ?? 0),
          0,
        ),
        resolvedDisputes: byStatus[DisputeStatus.RESOLVED] ?? 0,
        rejectedDisputes: byStatus[DisputeStatus.REJECTED] ?? 0,
      },
      disputeRate: totalBookings ? totalDisputes / totalBookings : 0,
      commonReasons: reasonGroups.map((g) => ({
        reason: g.reason,
        count: g._count._all,
      })),
      averageResolutionHours: avgResolutionRaw[0]?.hours ?? null,
      byStatus,
    };
  }

  // ─── Bookings ────────────────────────────────────────────────────────

  async getBookingAnalytics(dto: AnalyticsQueryDto) {
    const range = this.resolveRange(dto);

    const [statusGroups, acceptRaw, completeRaw] = await Promise.all([
      this.prisma.booking.groupBy({
        by: ["status"],
        where: range.gte || range.lte ? { createdAt: range } : undefined,
        _count: { _all: true },
      }),
      this.prisma.$queryRaw<{ hours: number | null }[]>`
        SELECT AVG(EXTRACT(EPOCH FROM ("acceptedAt" - "createdAt")) / 3600)::float8 AS hours
        FROM "bookings"
        WHERE "acceptedAt" IS NOT NULL
        ${range.gte ? Prisma.sql`AND "createdAt" >= ${range.gte}` : Prisma.empty}
        ${range.lte ? Prisma.sql`AND "createdAt" <= ${range.lte}` : Prisma.empty}
      `,
      this.prisma.$queryRaw<{ hours: number | null }[]>`
        SELECT AVG(EXTRACT(EPOCH FROM ("completedAt" - "acceptedAt")) / 3600)::float8 AS hours
        FROM "bookings"
        WHERE "acceptedAt" IS NOT NULL AND "completedAt" IS NOT NULL
        ${range.gte ? Prisma.sql`AND "createdAt" >= ${range.gte}` : Prisma.empty}
        ${range.lte ? Prisma.sql`AND "createdAt" <= ${range.lte}` : Prisma.empty}
      `,
    ]);

    const byStatus = this.groupsToRecord(statusGroups, "status");

    return {
      period: this.describeRange(range),
      totals: {
        totalBookings: statusGroups.reduce(
          (s, g) => s + (g._count?._all ?? 0),
          0,
        ),
        completedBookings: byStatus[BookingStatus.COMPLETED] ?? 0,
        cancelledBookings: byStatus[BookingStatus.CANCELLED] ?? 0,
        activeBookings:
          (byStatus[BookingStatus.PENDING] ?? 0) +
          (byStatus[BookingStatus.ACCEPTED] ?? 0) +
          (byStatus[BookingStatus.IN_PROGRESS] ?? 0),
      },
      avgHoursJobToAcceptance: acceptRaw[0]?.hours ?? null,
      avgHoursAcceptanceToCompletion: completeRaw[0]?.hours ?? null,
      byStatus,
    };
  }

  // ─── Shared helpers ──────────────────────────────────────────────────

  private describeRange(range: DateFilter) {
    return {
      dateFrom: range.gte ?? null,
      dateTo: range.lte ?? null,
    };
  }

  private groupsToRecord(
    groups: { _count: { _all: number } }[],
    key: string,
  ): Record<string, number> {
    const result: Record<string, number> = {};
    for (const group of groups) {
      const value = (group as unknown as Record<string, unknown>)[key];
      if (typeof value === "string") result[value] = group._count._all;
    }
    return result;
  }

  private commissionAggregate(range: DateFilter) {
    return this.prisma.walletTransaction.aggregate({
      where: {
        type: WalletTransactionType.PLATFORM_COMMISSION,
        ...(range.gte || range.lte ? { createdAt: range } : {}),
      },
      _sum: { amount: true },
    });
  }

  private toNumber(agg: {
    _sum: {
      amount?: Prisma.Decimal | null;
      totalAmount?: Prisma.Decimal | null;
    };
  }): number {
    return (
      agg._sum.amount ??
      agg._sum.totalAmount ??
      new Prisma.Decimal(0)
    ).toNumber();
  }

  private absNumber(agg: { _sum: { amount: Prisma.Decimal | null } }): number {
    return Math.abs((agg._sum.amount ?? new Prisma.Decimal(0)).toNumber());
  }

  /**
   * Count-based time series (date_trunc on a constant column of a constant
   * table). All identifiers are internal constants — no user input ever
   * reaches the SQL text.
   */
  private async countSeries(
    table: "jobs" | "bookings" | "users",
    dateColumn: "createdAt" | "completedAt",
    range: DateFilter,
    trunc: "day" | "week" | "month",
    extraWhere?: Prisma.Sql,
  ): Promise<Record<string, number>> {
    const col = Prisma.raw(`"${dateColumn}"`);
    const truncExpr =
      trunc === "month"
        ? Prisma.sql`to_char(date_trunc('month', ${col}), 'YYYY-MM')`
        : Prisma.sql`date_trunc(${trunc}, ${col})::date::text`;

    const conditions: Prisma.Sql[] = [];
    if (range.gte) conditions.push(Prisma.sql`${col} >= ${range.gte}`);
    if (range.lte) conditions.push(Prisma.sql`${col} <= ${range.lte}`);
    if (extraWhere) conditions.push(extraWhere);
    const whereSql =
      conditions.length > 0
        ? Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`
        : Prisma.empty;

    const rows = await this.prisma.$queryRaw<
      { period: string; count: number }[]
    >`
      SELECT ${truncExpr} AS period, COUNT(*)::int AS count
      FROM ${Prisma.raw(table)}
      ${whereSql}
      GROUP BY 1 ORDER BY 1
    `;

    return Object.fromEntries(rows.map((r) => [r.period, r.count]));
  }

  /**
   * Sum-based time series (used for commission per day/week/month). The
   * PLATFORM_COMMISSION amounts are recorded as debits, so the sum is
   * returned as a positive magnitude.
   */
  private async sumSeries(
    table: "wallet_transactions",
    dateColumn: "createdAt",
    range: DateFilter,
    trunc: "day" | "week" | "month",
    extraWhere: Prisma.Sql,
  ): Promise<Record<string, number>> {
    const col = Prisma.raw(`"${dateColumn}"`);
    const truncExpr =
      trunc === "month"
        ? Prisma.sql`to_char(date_trunc('month', ${col}), 'YYYY-MM')`
        : Prisma.sql`date_trunc(${trunc}, ${col})::date::text`;

    const conditions: Prisma.Sql[] = [extraWhere];
    if (range.gte) conditions.push(Prisma.sql`${col} >= ${range.gte}`);
    if (range.lte) conditions.push(Prisma.sql`${col} <= ${range.lte}`);

    const rows = await this.prisma.$queryRaw<
      { period: string; total: number }[]
    >`
      SELECT ${truncExpr} AS period,
             ABS(SUM("amount"))::float8 AS total
      FROM ${Prisma.raw(table)}
      WHERE ${Prisma.join(conditions, " AND ")}
      GROUP BY 1 ORDER BY 1
    `;

    return Object.fromEntries(rows.map((r) => [r.period, r.total]));
  }
}
