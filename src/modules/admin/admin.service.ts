import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminSearchQueryDto } from './dtos/admin-search-query.dto';
import { buildDateRange } from './dtos/date-range.dto';
import {
  Prisma,
  UserRole,
  UserStatus,
  JobStatus,
  BookingStatus,
  DisputeStatus,
  VerificationStatus,
  WalletTransactionType,
  WithdrawalStatus,
  TopUpStatus,
} from 'generated/prisma/client';

const OPEN_DISPUTE_STATUSES: DisputeStatus[] = [
  DisputeStatus.OPEN,
  DisputeStatus.UNDER_REVIEW,
  DisputeStatus.WAITING_FOR_RESPONSE,
];

/**
 * Module 17 — Admin Dashboard.
 *
 * Read-only statistics, reports and global search. All queries are
 * aggregate `count`/`groupBy` calls run in parallel and intentionally
 * include soft-deleted users so deleted accounts remain in reports.
 */
@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Dashboard Summary ───────────────────────────────────────────────

  async getDashboardSummary(dto: { dateFrom?: string; dateTo?: string }) {
    const dateFilter = buildDateRange(dto.dateFrom, dto.dateTo);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [
      totalCustomers,
      totalProviders,
      verificationGroups,
      jobGroups,
      openDisputes,
      pendingWithdrawals,
      pendingTopUps,
      commissionAgg,
      todayCompletedJobs,
      todayRevenue,
      newUsersToday,
      walletTotals,
    ] = await Promise.all([
      this.prisma.user.count({ where: { role: UserRole.CUSTOMER } }),
      this.prisma.user.count({ where: { role: UserRole.PROVIDER } }),
      this.prisma.user.groupBy({
        by: ['verificationStatus'],
        where: { role: UserRole.PROVIDER },
        _count: { _all: true },
      }),
      this.prisma.job.groupBy({
        by: ['status'],
        where: dateFilter ? { createdAt: dateFilter } : undefined,
        _count: { _all: true },
      }),
      this.prisma.dispute.count({
        where: { status: { in: OPEN_DISPUTE_STATUSES } },
      }),
      this.prisma.withdrawalRequest.count({
        where: { status: WithdrawalStatus.PENDING },
      }),
      this.prisma.topUpRequest.count({
        where: { status: TopUpStatus.PENDING },
      }),
      this.prisma.walletTransaction.aggregate({
        where: { type: WalletTransactionType.PLATFORM_COMMISSION },
        _sum: { amount: true },
      }),
      this.prisma.booking.count({
        where: {
          status: BookingStatus.COMPLETED,
          completedAt: { gte: todayStart },
        },
      }),
      this.prisma.walletTransaction.aggregate({
        where: {
          type: WalletTransactionType.JOB_PAYMENT,
          createdAt: { gte: todayStart },
        },
        _sum: { amount: true },
      }),
      this.prisma.user.count({ where: { createdAt: { gte: todayStart } } }),
      this.prisma.wallet.aggregate({
        _sum: { balance: true, heldBalance: true },
      }),
    ]);

    const verification = this.groupsToRecord(
      verificationGroups,
      'verificationStatus',
    );
    const jobs = this.groupsToRecord(jobGroups, 'status');

    const platformCommission = (
      commissionAgg._sum.amount ?? new Prisma.Decimal(0)
    ).abs();

    return {
      period: { dateFrom: dto.dateFrom ?? null, dateTo: dto.dateTo ?? null },
      users: {
        totalCustomers,
        totalProviders,
        newUsersToday,
      },
      providers: {
        pendingVerifications: verification[VerificationStatus.PENDING] ?? 0,
        approvedProviders: verification[VerificationStatus.APPROVED] ?? 0,
        rejectedProviders: verification[VerificationStatus.REJECTED] ?? 0,
        bannedProviders: verification[VerificationStatus.BANNED] ?? 0,
      },
      jobs: {
        pending: jobs[JobStatus.PENDING] ?? 0,
        active:
          (jobs[JobStatus.ACCEPTED] ?? 0) + (jobs[JobStatus.IN_PROGRESS] ?? 0),
        completed: jobs[JobStatus.COMPLETED] ?? 0,
        cancelled: jobs[JobStatus.CANCELLED] ?? 0,
        expired: jobs[JobStatus.EXPIRED] ?? 0,
        disputed: jobs[JobStatus.DISPUTED] ?? 0,
        todayCompletedJobs,
      },
      disputes: { openDisputes },
      finance: {
        pendingWithdrawals,
        pendingTopUps,
        platformWalletBalance: platformCommission,
        totalPlatformCommission: platformCommission,
        totalWalletBalance: walletTotals._sum.balance ?? new Prisma.Decimal(0),
        totalHeldBalance:
          walletTotals._sum.heldBalance ?? new Prisma.Decimal(0),
        todayRevenue: (todayRevenue._sum.amount ?? new Prisma.Decimal(0)).abs(),
      },
    };
  }

  // ─── Dashboard Widgets ───────────────────────────────────────────────

  async getDashboardWidgets() {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const monthStart = new Date(
      todayStart.getFullYear(),
      todayStart.getMonth(),
      1,
    );
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);

    const [
      pendingVerifications,
      openDisputes,
      pendingWithdrawals,
      pendingTopUps,
      activeJobs,
      newUsersToday,
      newUsersWeek,
      todayRevenue,
      monthRevenue,
      totalRevenue,
      todayCommission,
      monthCommission,
      totalCommission,
    ] = await Promise.all([
      this.prisma.verificationRequest.count({
        where: { status: VerificationStatus.PENDING },
      }),
      this.prisma.dispute.count({
        where: { status: { in: OPEN_DISPUTE_STATUSES } },
      }),
      this.prisma.withdrawalRequest.count({
        where: { status: WithdrawalStatus.PENDING },
      }),
      this.prisma.topUpRequest.count({
        where: { status: TopUpStatus.PENDING },
      }),
      this.prisma.job.count({
        where: { status: { in: [JobStatus.ACCEPTED, JobStatus.IN_PROGRESS] } },
      }),
      this.prisma.user.count({ where: { createdAt: { gte: todayStart } } }),
      this.prisma.user.count({ where: { createdAt: { gte: weekStart } } }),
      this.revenueBetween(todayStart),
      this.revenueBetween(monthStart),
      this.revenueBetween(),
      this.commissionBetween(todayStart),
      this.commissionBetween(monthStart),
      this.commissionBetween(),
    ]);

    return {
      pendingVerifications,
      openDisputes,
      pendingWithdrawals,
      pendingTopUps,
      activeJobs,
      newUsers: { today: newUsersToday, last7Days: newUsersWeek },
      revenue: {
        today: todayRevenue,
        thisMonth: monthRevenue,
        total: totalRevenue,
      },
      commission: {
        today: todayCommission,
        thisMonth: monthCommission,
        total: totalCommission,
      },
    };
  }

  // ─── Reports ─────────────────────────────────────────────────────────

  async reportUsers(dto: { dateFrom?: string; dateTo?: string }) {
    const dateFilter = buildDateRange(dto.dateFrom, dto.dateTo);
    const rangeSql = dateFilter
      ? Prisma.sql`AND "createdAt" >= ${dateFilter.gte} AND "createdAt" <= ${dateFilter.lte}`
      : Prisma.empty;

    const [totalUsers, roleGroups, statusGroups, dailyRaw, monthlyRaw] =
      await Promise.all([
        this.prisma.user.count({
          where: dateFilter ? { createdAt: dateFilter } : undefined,
        }),
        this.prisma.user.groupBy({
          by: ['role'],
          where: dateFilter ? { createdAt: dateFilter } : undefined,
          _count: { _all: true },
        }),
        this.prisma.user.groupBy({
          by: ['status', 'isActive'],
          where: dateFilter ? { createdAt: dateFilter } : undefined,
          _count: { _all: true },
        }),
        this.prisma.$queryRaw<{ day: Date; count: number }[]>(Prisma.sql`
          SELECT date_trunc('day', "createdAt")::date AS day, COUNT(*)::int AS count
          FROM "users"
          WHERE 1=1 ${rangeSql}
          GROUP BY 1 ORDER BY 1
        `),
        this.prisma.$queryRaw<{ month: string; count: number }[]>(Prisma.sql`
          SELECT to_char(date_trunc('month', "createdAt"), 'YYYY-MM') AS month,
                 COUNT(*)::int AS count
          FROM "users"
          WHERE 1=1 ${rangeSql}
          GROUP BY 1 ORDER BY 1
        `),
      ]);

    return {
      totalUsers,
      byRole: Object.fromEntries(
        roleGroups.map((g) => [g.role, g._count._all]),
      ),
      activeUsers: statusGroups
        .filter((g) => g.isActive && g.status === UserStatus.ACTIVE)
        .reduce((s, g) => s + g._count._all, 0),
      suspendedUsers: statusGroups
        .filter((g) => g.status === UserStatus.SUSPENDED)
        .reduce((s, g) => s + g._count._all, 0),
      deletedUsers: statusGroups
        .filter((g) => !g.isActive)
        .reduce((s, g) => s + g._count._all, 0),
      dailyRegistrations: Object.fromEntries(
        dailyRaw.map((r) => [r.day.toISOString().slice(0, 10), r.count]),
      ),
      monthlyRegistrations: Object.fromEntries(
        monthlyRaw.map((r) => [r.month, r.count]),
      ),
    };
  }

  async reportProviders(dto: { dateFrom?: string; dateTo?: string }) {
    const dateFilter = buildDateRange(dto.dateFrom, dto.dateTo);
    const where: Prisma.UserWhereInput = {
      role: UserRole.PROVIDER,
      ...(dateFilter ? { createdAt: dateFilter } : {}),
    };

    const [totalProviders, verificationGroups, ratingAgg, topProviders] =
      await Promise.all([
        this.prisma.user.count({ where }),
        this.prisma.user.groupBy({
          by: ['verificationStatus'],
          where,
          _count: { _all: true },
        }),
        this.prisma.ratingSummary.aggregate({
          _avg: { averageRating: true },
          _count: { _all: true },
        }),
        this.prisma.ratingSummary.findMany({
          orderBy: [{ averageRating: 'desc' }, { totalReviews: 'desc' }],
          take: 10,
          include: {
            user: {
              select: { id: true, fullName: true, email: true, phone: true },
            },
          },
        }),
      ]);

    return {
      totalProviders,
      verificationStatistics: Object.fromEntries(
        verificationGroups.map((g) => [g.verificationStatus, g._count._all]),
      ),
      averageRating: ratingAgg._avg.averageRating ?? new Prisma.Decimal(0),
      ratedProviders: ratingAgg._count._all,
      topProviders: topProviders.map((t) => ({
        providerId: t.userId,
        fullName: t.user.fullName,
        email: t.user.email,
        phone: t.user.phone,
        averageRating: t.averageRating,
        totalReviews: t.totalReviews,
      })),
    };
  }

  async reportJobs(dto: { dateFrom?: string; dateTo?: string }) {
    const dateFilter = buildDateRange(dto.dateFrom, dto.dateTo);
    const where = dateFilter ? { createdAt: dateFilter } : undefined;

    const [
      totalJobs,
      statusGroups,
      categoryGroups,
      completedJobs,
      cancelledJobs,
      expiredJobs,
    ] = await Promise.all([
      this.prisma.job.count({ where }),
      this.prisma.job.groupBy({
        by: ['status'],
        where,
        _count: { _all: true },
      }),
      this.prisma.job.groupBy({
        by: ['categoryId'],
        where,
        _count: { _all: true },
      }),
      this.prisma.job.count({
        where: { ...where, status: JobStatus.COMPLETED },
      }),
      this.prisma.job.count({
        where: { ...where, status: JobStatus.CANCELLED },
      }),
      this.prisma.job.count({ where: { ...where, status: JobStatus.EXPIRED } }),
    ]);

    return {
      totalJobs,
      byStatus: Object.fromEntries(
        statusGroups.map((g) => [g.status, g._count._all]),
      ),
      completedJobs,
      cancelledJobs,
      expiredJobs,
      jobsByCategory: categoryGroups.map((g) => ({
        categoryId: g.categoryId,
        count: g._count._all,
      })),
    };
  }

  async reportFinancial(dto: { dateFrom?: string; dateTo?: string }) {
    const dateFilter = buildDateRange(dto.dateFrom, dto.dateTo);

    const [
      revenue,
      commission,
      walletTotals,
      pendingWithdrawals,
      pendingTopUps,
      approvedTopUps,
      completedWithdrawals,
    ] = await Promise.all([
      this.revenueBetween(dateFilter?.gte, dateFilter?.lte),
      this.commissionBetween(dateFilter?.gte, dateFilter?.lte),
      this.prisma.wallet.aggregate({
        _sum: { balance: true, heldBalance: true },
      }),
      this.prisma.withdrawalRequest.aggregate({
        where: { status: WithdrawalStatus.PENDING },
        _sum: { amount: true },
      }),
      this.prisma.topUpRequest.aggregate({
        where: { status: TopUpStatus.PENDING },
        _sum: { amount: true },
      }),
      this.prisma.walletTransaction.aggregate({
        where: {
          type: WalletTransactionType.TOP_UP,
          ...(dateFilter ? { createdAt: dateFilter } : {}),
        },
        _sum: { amount: true },
      }),
      this.prisma.walletTransaction.aggregate({
        where: {
          type: WalletTransactionType.WITHDRAWAL_COMPLETED,
          ...(dateFilter ? { createdAt: dateFilter } : {}),
        },
        _sum: { amount: true },
      }),
    ]);

    return {
      period: { dateFrom: dto.dateFrom ?? null, dateTo: dto.dateTo ?? null },
      revenue,
      commissionEarned: commission,
      totalWalletBalance: walletTotals._sum.balance ?? new Prisma.Decimal(0),
      totalHeldBalance: walletTotals._sum.heldBalance ?? new Prisma.Decimal(0),
      pendingWithdrawals:
        pendingWithdrawals._sum.amount ?? new Prisma.Decimal(0),
      pendingTopUps: pendingTopUps._sum.amount ?? new Prisma.Decimal(0),
      topUpsApproved: (
        approvedTopUps._sum.amount ?? new Prisma.Decimal(0)
      ).abs(),
      withdrawalsCompleted: (
        completedWithdrawals._sum.amount ?? new Prisma.Decimal(0)
      ).abs(),
    };
  }

  async reportDisputes(dto: { dateFrom?: string; dateTo?: string }) {
    const dateFilter = buildDateRange(dto.dateFrom, dto.dateTo);
    const where = dateFilter ? { createdAt: dateFilter } : undefined;

    const [total, statusGroups, resolutionGroups] = await Promise.all([
      this.prisma.dispute.count({ where }),
      this.prisma.dispute.groupBy({
        by: ['status'],
        where,
        _count: { _all: true },
      }),
      this.prisma.dispute.groupBy({
        by: ['resolution'],
        where: { ...where, resolution: { not: null } },
        _count: { _all: true },
      }),
    ]);

    const byStatus = this.groupsToRecord(statusGroups, 'status');
    const byResolution = this.groupsToRecord(resolutionGroups, 'resolution');

    return {
      totalDisputes: total,
      resolved: byStatus[DisputeStatus.RESOLVED] ?? 0,
      rejected: byStatus[DisputeStatus.REJECTED] ?? 0,
      pending: OPEN_DISPUTE_STATUSES.reduce(
        (s, st) => s + (byStatus[st] ?? 0),
        0,
      ),
      byStatus,
      byResolution,
    };
  }

  // ─── Global Search ───────────────────────────────────────────────────

  async globalSearch(dto: AdminSearchQueryDto) {
    const q = dto.q?.trim();
    if (!q) {
      throw new BadRequestException('Search query is required');
    }
    const limit = dto.limit ?? 10;
    const contains: Prisma.StringFilter = { contains: q, mode: 'insensitive' };

    const [users, jobs, bookings, disputes, withdrawals, transactions] =
      await Promise.all([
        this.prisma.user.findMany({
          where: {
            OR: [
              { fullName: contains },
              { email: contains },
              { phone: contains },
            ],
          },
          take: limit,
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            role: true,
            status: true,
            isActive: true,
            createdAt: true,
          },
        }),
        this.prisma.job.findMany({
          where: { OR: [{ title: contains }, { description: contains }] },
          take: limit,
          include: {
            customer: { select: { id: true, fullName: true, phone: true } },
            category: { select: { id: true, name: true } },
          },
        }),
        this.prisma.booking.findMany({
          where: { OR: [{ id: q }, { job: { title: contains } }] },
          take: limit,
          include: {
            job: { select: { id: true, title: true, status: true } },
            customer: { select: { id: true, fullName: true } },
            provider: { select: { id: true, fullName: true } },
          },
        }),
        this.prisma.dispute.findMany({
          where: { OR: [{ id: q }, { reason: contains }] },
          take: limit,
          include: {
            booking: { select: { id: true } },
            raisedBy: { select: { id: true, fullName: true } },
            opponent: { select: { id: true, fullName: true } },
          },
        }),
        this.prisma.withdrawalRequest.findMany({
          where: {
            OR: [{ id: q }, { accountName: contains }, { accountNumber: q }],
          },
          take: limit,
          include: {
            provider: { select: { id: true, fullName: true, phone: true } },
          },
        }),
        this.prisma.walletTransaction.findMany({
          where: { OR: [{ id: q }, { description: contains }] },
          take: limit,
          include: { wallet: { select: { id: true, userId: true } } },
        }),
      ]);

    return {
      query: q,
      users,
      providers: users.filter((u) => u.role === UserRole.PROVIDER),
      customers: users.filter((u) => u.role === UserRole.CUSTOMER),
      jobs,
      bookings,
      disputes,
      withdrawals,
      walletTransactions: transactions,
      meta: { limit },
    };
  }

  // ─── Private helpers ─────────────────────────────────────────────────

  /** Turn a Prisma groupBy result into a Record<string, number> map. */
  private groupsToRecord(
    groups: { _count: { _all: number } }[],
    key: string,
  ): Record<string, number> {
    const result: Record<string, number> = {};
    for (const group of groups) {
      const value = (group as unknown as Record<string, unknown>)[key];
      if (typeof value === 'string') {
        result[value] = group._count._all;
      }
    }
    return result;
  }

  private revenueBetween(gte?: Date, lte?: Date) {
    return this.prisma.walletTransaction
      .aggregate({
        where: {
          type: WalletTransactionType.JOB_PAYMENT,
          ...(gte || lte
            ? { createdAt: { ...(gte && { gte }), ...(lte && { lte }) } }
            : {}),
        },
        _sum: { amount: true },
      })
      .then((r) => (r._sum.amount ?? new Prisma.Decimal(0)).abs());
  }

  private commissionBetween(gte?: Date, lte?: Date) {
    return this.prisma.walletTransaction
      .aggregate({
        where: {
          type: WalletTransactionType.PLATFORM_COMMISSION,
          ...(gte || lte
            ? { createdAt: { ...(gte && { gte }), ...(lte && { lte }) } }
            : {}),
        },
        _sum: { amount: true },
      })
      .then((r) => (r._sum.amount ?? new Prisma.Decimal(0)).abs());
  }
}
