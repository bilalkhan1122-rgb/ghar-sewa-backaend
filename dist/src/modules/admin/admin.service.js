"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const date_range_dto_1 = require("./dtos/date-range.dto");
const client_1 = require("../../../generated/prisma/client");
const OPEN_DISPUTE_STATUSES = [
    client_1.DisputeStatus.OPEN,
    client_1.DisputeStatus.UNDER_REVIEW,
    client_1.DisputeStatus.WAITING_FOR_RESPONSE,
];
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardSummary(dto) {
        const dateFilter = (0, date_range_dto_1.buildDateRange)(dto.dateFrom, dto.dateTo);
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const [totalCustomers, totalProviders, verificationGroups, jobGroups, openDisputes, pendingWithdrawals, pendingTopUps, commissionAgg, todayCompletedJobs, todayRevenue, newUsersToday, walletTotals,] = await Promise.all([
            this.prisma.user.count({ where: { role: client_1.UserRole.CUSTOMER } }),
            this.prisma.user.count({ where: { role: client_1.UserRole.PROVIDER } }),
            this.prisma.user.groupBy({
                by: ['verificationStatus'],
                where: { role: client_1.UserRole.PROVIDER },
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
                where: { status: client_1.WithdrawalStatus.PENDING },
            }),
            this.prisma.topUpRequest.count({
                where: { status: client_1.TopUpStatus.PENDING },
            }),
            this.prisma.walletTransaction.aggregate({
                where: { type: client_1.WalletTransactionType.PLATFORM_COMMISSION },
                _sum: { amount: true },
            }),
            this.prisma.booking.count({
                where: {
                    status: client_1.BookingStatus.COMPLETED,
                    completedAt: { gte: todayStart },
                },
            }),
            this.prisma.walletTransaction.aggregate({
                where: {
                    type: client_1.WalletTransactionType.JOB_PAYMENT,
                    createdAt: { gte: todayStart },
                },
                _sum: { amount: true },
            }),
            this.prisma.user.count({ where: { createdAt: { gte: todayStart } } }),
            this.prisma.wallet.aggregate({
                _sum: { balance: true, heldBalance: true },
            }),
        ]);
        const verification = this.groupsToRecord(verificationGroups, 'verificationStatus');
        const jobs = this.groupsToRecord(jobGroups, 'status');
        const platformCommission = (commissionAgg._sum.amount ?? new client_1.Prisma.Decimal(0)).abs();
        return {
            period: { dateFrom: dto.dateFrom ?? null, dateTo: dto.dateTo ?? null },
            users: {
                totalCustomers,
                totalProviders,
                newUsersToday,
            },
            providers: {
                pendingVerifications: verification[client_1.VerificationStatus.PENDING] ?? 0,
                approvedProviders: verification[client_1.VerificationStatus.APPROVED] ?? 0,
                rejectedProviders: verification[client_1.VerificationStatus.REJECTED] ?? 0,
                bannedProviders: verification[client_1.VerificationStatus.BANNED] ?? 0,
            },
            jobs: {
                pending: jobs[client_1.JobStatus.PENDING] ?? 0,
                active: (jobs[client_1.JobStatus.ACCEPTED] ?? 0) + (jobs[client_1.JobStatus.IN_PROGRESS] ?? 0),
                completed: jobs[client_1.JobStatus.COMPLETED] ?? 0,
                cancelled: jobs[client_1.JobStatus.CANCELLED] ?? 0,
                expired: jobs[client_1.JobStatus.EXPIRED] ?? 0,
                disputed: jobs[client_1.JobStatus.DISPUTED] ?? 0,
                todayCompletedJobs,
            },
            disputes: { openDisputes },
            finance: {
                pendingWithdrawals,
                pendingTopUps,
                platformWalletBalance: platformCommission,
                totalPlatformCommission: platformCommission,
                totalWalletBalance: walletTotals._sum.balance ?? new client_1.Prisma.Decimal(0),
                totalHeldBalance: walletTotals._sum.heldBalance ?? new client_1.Prisma.Decimal(0),
                todayRevenue: (todayRevenue._sum.amount ?? new client_1.Prisma.Decimal(0)).abs(),
            },
        };
    }
    async getDashboardWidgets() {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const monthStart = new Date(todayStart.getFullYear(), todayStart.getMonth(), 1);
        const weekStart = new Date(todayStart);
        weekStart.setDate(weekStart.getDate() - 7);
        const [pendingVerifications, openDisputes, pendingWithdrawals, pendingTopUps, activeJobs, newUsersToday, newUsersWeek, todayRevenue, monthRevenue, totalRevenue, todayCommission, monthCommission, totalCommission,] = await Promise.all([
            this.prisma.verificationRequest.count({
                where: { status: client_1.VerificationStatus.PENDING },
            }),
            this.prisma.dispute.count({
                where: { status: { in: OPEN_DISPUTE_STATUSES } },
            }),
            this.prisma.withdrawalRequest.count({
                where: { status: client_1.WithdrawalStatus.PENDING },
            }),
            this.prisma.topUpRequest.count({
                where: { status: client_1.TopUpStatus.PENDING },
            }),
            this.prisma.job.count({
                where: { status: { in: [client_1.JobStatus.ACCEPTED, client_1.JobStatus.IN_PROGRESS] } },
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
    async reportUsers(dto) {
        const dateFilter = (0, date_range_dto_1.buildDateRange)(dto.dateFrom, dto.dateTo);
        const rangeSql = dateFilter
            ? client_1.Prisma.sql `AND "createdAt" >= ${dateFilter.gte} AND "createdAt" <= ${dateFilter.lte}`
            : client_1.Prisma.empty;
        const [totalUsers, roleGroups, statusGroups, dailyRaw, monthlyRaw] = await Promise.all([
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
            this.prisma.$queryRaw(client_1.Prisma.sql `
          SELECT date_trunc('day', "createdAt")::date AS day, COUNT(*)::int AS count
          FROM "users"
          WHERE 1=1 ${rangeSql}
          GROUP BY 1 ORDER BY 1
        `),
            this.prisma.$queryRaw(client_1.Prisma.sql `
          SELECT to_char(date_trunc('month', "createdAt"), 'YYYY-MM') AS month,
                 COUNT(*)::int AS count
          FROM "users"
          WHERE 1=1 ${rangeSql}
          GROUP BY 1 ORDER BY 1
        `),
        ]);
        return {
            totalUsers,
            byRole: Object.fromEntries(roleGroups.map((g) => [g.role, g._count._all])),
            activeUsers: statusGroups
                .filter((g) => g.isActive && g.status === client_1.UserStatus.ACTIVE)
                .reduce((s, g) => s + g._count._all, 0),
            suspendedUsers: statusGroups
                .filter((g) => g.status === client_1.UserStatus.SUSPENDED)
                .reduce((s, g) => s + g._count._all, 0),
            deletedUsers: statusGroups
                .filter((g) => !g.isActive)
                .reduce((s, g) => s + g._count._all, 0),
            dailyRegistrations: Object.fromEntries(dailyRaw.map((r) => [r.day.toISOString().slice(0, 10), r.count])),
            monthlyRegistrations: Object.fromEntries(monthlyRaw.map((r) => [r.month, r.count])),
        };
    }
    async reportProviders(dto) {
        const dateFilter = (0, date_range_dto_1.buildDateRange)(dto.dateFrom, dto.dateTo);
        const where = {
            role: client_1.UserRole.PROVIDER,
            ...(dateFilter ? { createdAt: dateFilter } : {}),
        };
        const [totalProviders, verificationGroups, ratingAgg, topProviders] = await Promise.all([
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
            verificationStatistics: Object.fromEntries(verificationGroups.map((g) => [g.verificationStatus, g._count._all])),
            averageRating: ratingAgg._avg.averageRating ?? new client_1.Prisma.Decimal(0),
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
    async reportJobs(dto) {
        const dateFilter = (0, date_range_dto_1.buildDateRange)(dto.dateFrom, dto.dateTo);
        const where = dateFilter ? { createdAt: dateFilter } : undefined;
        const [totalJobs, statusGroups, categoryGroups, completedJobs, cancelledJobs, expiredJobs,] = await Promise.all([
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
                where: { ...where, status: client_1.JobStatus.COMPLETED },
            }),
            this.prisma.job.count({
                where: { ...where, status: client_1.JobStatus.CANCELLED },
            }),
            this.prisma.job.count({ where: { ...where, status: client_1.JobStatus.EXPIRED } }),
        ]);
        return {
            totalJobs,
            byStatus: Object.fromEntries(statusGroups.map((g) => [g.status, g._count._all])),
            completedJobs,
            cancelledJobs,
            expiredJobs,
            jobsByCategory: categoryGroups.map((g) => ({
                categoryId: g.categoryId,
                count: g._count._all,
            })),
        };
    }
    async reportFinancial(dto) {
        const dateFilter = (0, date_range_dto_1.buildDateRange)(dto.dateFrom, dto.dateTo);
        const [revenue, commission, walletTotals, pendingWithdrawals, pendingTopUps, approvedTopUps, completedWithdrawals,] = await Promise.all([
            this.revenueBetween(dateFilter?.gte, dateFilter?.lte),
            this.commissionBetween(dateFilter?.gte, dateFilter?.lte),
            this.prisma.wallet.aggregate({
                _sum: { balance: true, heldBalance: true },
            }),
            this.prisma.withdrawalRequest.aggregate({
                where: { status: client_1.WithdrawalStatus.PENDING },
                _sum: { amount: true },
            }),
            this.prisma.topUpRequest.aggregate({
                where: { status: client_1.TopUpStatus.PENDING },
                _sum: { amount: true },
            }),
            this.prisma.walletTransaction.aggregate({
                where: {
                    type: client_1.WalletTransactionType.TOP_UP,
                    ...(dateFilter ? { createdAt: dateFilter } : {}),
                },
                _sum: { amount: true },
            }),
            this.prisma.walletTransaction.aggregate({
                where: {
                    type: client_1.WalletTransactionType.WITHDRAWAL_COMPLETED,
                    ...(dateFilter ? { createdAt: dateFilter } : {}),
                },
                _sum: { amount: true },
            }),
        ]);
        return {
            period: { dateFrom: dto.dateFrom ?? null, dateTo: dto.dateTo ?? null },
            revenue,
            commissionEarned: commission,
            totalWalletBalance: walletTotals._sum.balance ?? new client_1.Prisma.Decimal(0),
            totalHeldBalance: walletTotals._sum.heldBalance ?? new client_1.Prisma.Decimal(0),
            pendingWithdrawals: pendingWithdrawals._sum.amount ?? new client_1.Prisma.Decimal(0),
            pendingTopUps: pendingTopUps._sum.amount ?? new client_1.Prisma.Decimal(0),
            topUpsApproved: (approvedTopUps._sum.amount ?? new client_1.Prisma.Decimal(0)).abs(),
            withdrawalsCompleted: (completedWithdrawals._sum.amount ?? new client_1.Prisma.Decimal(0)).abs(),
        };
    }
    async reportDisputes(dto) {
        const dateFilter = (0, date_range_dto_1.buildDateRange)(dto.dateFrom, dto.dateTo);
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
            resolved: byStatus[client_1.DisputeStatus.RESOLVED] ?? 0,
            rejected: byStatus[client_1.DisputeStatus.REJECTED] ?? 0,
            pending: OPEN_DISPUTE_STATUSES.reduce((s, st) => s + (byStatus[st] ?? 0), 0),
            byStatus,
            byResolution,
        };
    }
    async globalSearch(dto) {
        const q = dto.q?.trim();
        if (!q) {
            throw new common_1.BadRequestException('Search query is required');
        }
        const limit = dto.limit ?? 10;
        const contains = { contains: q, mode: 'insensitive' };
        const [users, jobs, bookings, disputes, withdrawals, transactions] = await Promise.all([
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
            providers: users.filter((u) => u.role === client_1.UserRole.PROVIDER),
            customers: users.filter((u) => u.role === client_1.UserRole.CUSTOMER),
            jobs,
            bookings,
            disputes,
            withdrawals,
            walletTransactions: transactions,
            meta: { limit },
        };
    }
    groupsToRecord(groups, key) {
        const result = {};
        for (const group of groups) {
            const value = group[key];
            if (typeof value === 'string') {
                result[value] = group._count._all;
            }
        }
        return result;
    }
    revenueBetween(gte, lte) {
        return this.prisma.walletTransaction
            .aggregate({
            where: {
                type: client_1.WalletTransactionType.JOB_PAYMENT,
                ...(gte || lte
                    ? { createdAt: { ...(gte && { gte }), ...(lte && { lte }) } }
                    : {}),
            },
            _sum: { amount: true },
        })
            .then((r) => (r._sum.amount ?? new client_1.Prisma.Decimal(0)).abs());
    }
    commissionBetween(gte, lte) {
        return this.prisma.walletTransaction
            .aggregate({
            where: {
                type: client_1.WalletTransactionType.PLATFORM_COMMISSION,
                ...(gte || lte
                    ? { createdAt: { ...(gte && { gte }), ...(lte && { lte }) } }
                    : {}),
            },
            _sum: { amount: true },
        })
            .then((r) => (r._sum.amount ?? new client_1.Prisma.Decimal(0)).abs());
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map