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
exports.AdminUsersService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const prisma_service_1 = require("../../prisma/prisma.service");
const admin_audit_service_1 = require("../../common/services/admin-audit.service");
const notifications_service_1 = require("../notifications/notifications.service");
const date_range_dto_1 = require("./dtos/date-range.dto");
const client_1 = require("../../../generated/prisma/client");
let AdminUsersService = class AdminUsersService {
    prisma;
    audit;
    notifications;
    logger;
    constructor(prisma, audit, notifications, logger) {
        this.prisma = prisma;
        this.audit = audit;
        this.notifications = notifications;
        this.logger = logger;
    }
    async listUsers(query) {
        const { page = 1, limit = 10, search, role, status, verificationStatus, deleted, dateFrom, dateTo, } = query;
        const skip = (page - 1) * limit;
        const deletedOnly = deleted === 'true';
        const where = {
            ...(role && { role }),
            ...(status && { status }),
            ...(verificationStatus && { verificationStatus }),
            ...(deletedOnly ? { deletedAt: { not: null } } : { deletedAt: null }),
            ...(dateFrom || dateTo
                ? { createdAt: (0, date_range_dto_1.buildDateRange)(dateFrom, dateTo) }
                : {}),
            ...(search
                ? {
                    OR: [
                        { fullName: { contains: search, mode: 'insensitive' } },
                        { email: { contains: search, mode: 'insensitive' } },
                        { phone: { contains: search, mode: 'insensitive' } },
                    ],
                }
                : {}),
        };
        const [data, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    city: { select: { id: true, name: true } },
                    wallet: {
                        select: {
                            id: true,
                            balance: true,
                            heldBalance: true,
                            status: true,
                        },
                    },
                    ratingSummary: {
                        select: { averageRating: true, totalReviews: true },
                    },
                },
            }),
            this.prisma.user.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: data.map((u) => this.sanitize(u)),
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
    async getUserDetail(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                city: true,
                wallet: true,
                providerProfile: {
                    include: {
                        categories: { include: { category: true } },
                        galleryImages: true,
                    },
                },
                ratingSummary: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const [jobCount, bookingCount, disputeCount, penaltyCount, reviewCount] = await Promise.all([
            this.prisma.job.count({ where: { customerId: userId } }),
            this.prisma.booking.count({
                where: { OR: [{ customerId: userId }, { providerId: userId }] },
            }),
            this.prisma.dispute.count({
                where: { OR: [{ raisedById: userId }, { opponentId: userId }] },
            }),
            this.prisma.providerPenalty.count({ where: { providerId: userId } }),
            this.prisma.review.count({ where: { revieweeId: userId } }),
        ]);
        return {
            ...this.sanitize(user),
            stats: {
                jobsPosted: jobCount,
                bookings: bookingCount,
                disputes: disputeCount,
                penalties: penaltyCount,
                reviewsReceived: reviewCount,
            },
        };
    }
    async suspendUser(adminId, userId, reason) {
        const user = await this.getUserOrThrow(userId);
        if (user.role === client_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Admins cannot be suspended');
        }
        if (user.status === client_1.UserStatus.SUSPENDED) {
            throw new common_1.BadRequestException('User is already suspended');
        }
        const updated = await this.prisma.user.update({
            where: { id: userId },
            data: { status: client_1.UserStatus.SUSPENDED },
        });
        await this.prisma.refreshToken.deleteMany({ where: { userId } });
        await this.audit.record({
            adminId,
            action: 'USER_SUSPENDED',
            entityType: 'USER',
            entityId: userId,
            previousValues: { status: user.status },
            newValues: { status: client_1.UserStatus.SUSPENDED, reason },
        });
        void this.notifications.send({
            userId,
            type: client_1.NotificationType.SYSTEM_ANNOUNCEMENT,
            title: 'Account suspended ⚠️',
            message: `Your account has been suspended. Reason: ${reason}`,
            relatedEntityType: 'USER',
            relatedEntityId: userId,
            force: true,
        });
        this.logger.log({
            message: 'User suspended by admin',
            adminId,
            userId,
            reason,
        });
        return { message: 'User suspended', user: this.sanitize(updated) };
    }
    async unsuspendUser(adminId, userId) {
        const user = await this.getUserOrThrow(userId);
        if (user.status !== client_1.UserStatus.SUSPENDED) {
            throw new common_1.BadRequestException('User is not suspended');
        }
        const updated = await this.prisma.user.update({
            where: { id: userId },
            data: { status: client_1.UserStatus.ACTIVE },
        });
        await this.audit.record({
            adminId,
            action: 'USER_UNSUSPENDED',
            entityType: 'USER',
            entityId: userId,
            previousValues: { status: user.status },
            newValues: { status: client_1.UserStatus.ACTIVE },
        });
        void this.notifications.send({
            userId,
            type: client_1.NotificationType.SYSTEM_ANNOUNCEMENT,
            title: 'Account reactivated ✅',
            message: 'Your account has been reactivated.',
            relatedEntityType: 'USER',
            relatedEntityId: userId,
            force: true,
        });
        return { message: 'User unsuspended', user: this.sanitize(updated) };
    }
    async softDeleteUser(adminId, userId, reason) {
        const user = await this.getUserOrThrow(userId);
        if (user.role === client_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Admins cannot be deleted');
        }
        if (!user.isActive) {
            throw new common_1.BadRequestException('User is already deleted');
        }
        const updated = await this.prisma.user.update({
            where: { id: userId },
            data: { isActive: false, deletedAt: new Date() },
        });
        await this.prisma.refreshToken.deleteMany({ where: { userId } });
        await this.audit.record({
            adminId,
            action: 'USER_DELETED',
            entityType: 'USER',
            entityId: userId,
            previousValues: { isActive: true, deletedAt: null },
            newValues: { isActive: false, deletedAt: updated.deletedAt, reason },
        });
        return { message: 'User soft-deleted', user: this.sanitize(updated) };
    }
    async restoreUser(adminId, userId) {
        const user = await this.getUserOrThrow(userId);
        if (user.isActive) {
            throw new common_1.BadRequestException('User is not deleted');
        }
        const updated = await this.prisma.user.update({
            where: { id: userId },
            data: { isActive: true, deletedAt: null },
        });
        await this.audit.record({
            adminId,
            action: 'USER_RESTORED',
            entityType: 'USER',
            entityId: userId,
            previousValues: { isActive: false },
            newValues: { isActive: true, deletedAt: null },
        });
        return { message: 'User restored', user: this.sanitize(updated) };
    }
    async listProviders(query) {
        const { page = 1, limit = 10, search, status, verificationStatus } = query;
        const skip = (page - 1) * limit;
        const where = {
            role: client_1.UserRole.PROVIDER,
            deletedAt: null,
            ...(status && { status }),
            ...(verificationStatus && { verificationStatus }),
            ...(search
                ? {
                    OR: [
                        { fullName: { contains: search, mode: 'insensitive' } },
                        { email: { contains: search, mode: 'insensitive' } },
                        { phone: { contains: search, mode: 'insensitive' } },
                    ],
                }
                : {}),
        };
        const [data, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    providerProfile: { select: { hourlyRate: true, cnicNumber: true } },
                    wallet: {
                        select: { balance: true, heldBalance: true, status: true },
                    },
                    ratingSummary: {
                        select: { averageRating: true, totalReviews: true },
                    },
                },
            }),
            this.prisma.user.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: data.map((u) => this.sanitize(u)),
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
    async getProviderDetail(providerId) {
        const user = await this.prisma.user.findUnique({
            where: { id: providerId },
            include: {
                providerProfile: {
                    include: {
                        categories: { include: { category: true } },
                        galleryImages: true,
                    },
                },
                wallet: true,
                ratingSummary: true,
                verificationRequests: { orderBy: { submittedAt: 'desc' } },
            },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        const [completedJobs, activeBookings, cancellationCount, penaltyCount] = await Promise.all([
            this.prisma.booking.count({
                where: { providerId, status: 'COMPLETED' },
            }),
            this.prisma.booking.count({
                where: { providerId, status: { in: ['ACCEPTED', 'IN_PROGRESS'] } },
            }),
            this.prisma.cancellationRecord.count({
                where: { booking: { providerId } },
            }),
            this.prisma.providerPenalty.count({ where: { providerId } }),
        ]);
        return {
            ...this.sanitize(user),
            stats: { completedJobs, activeBookings, cancellationCount, penaltyCount },
        };
    }
    async getProviderDocuments(providerId) {
        const profile = await this.prisma.providerProfile.findUnique({
            where: { userId: providerId },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Provider profile not found');
        }
        const requests = await this.prisma.verificationRequest.findMany({
            where: { providerId },
            orderBy: { submittedAt: 'desc' },
            select: {
                id: true,
                status: true,
                facePhoto: true,
                cnicFrontImage: true,
                cnicBackImage: true,
                submittedAt: true,
                reviewedAt: true,
                reviewedBy: true,
                rejectionReason: true,
            },
        });
        return {
            providerId,
            profile: {
                facePhoto: profile.facePhoto,
                cnicFrontImage: profile.cnicFrontImage,
                cnicBackImage: profile.cnicBackImage,
            },
            verificationHistory: requests,
        };
    }
    async getProviderPerformance(providerId) {
        const provider = await this.prisma.user.findUnique({
            where: { id: providerId },
            include: { wallet: true, ratingSummary: true },
        });
        if (!provider || provider.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        const [completedJobs, activeBookings, cancellations, penalties, earnings] = await Promise.all([
            this.prisma.booking.count({
                where: { providerId, status: 'COMPLETED' },
            }),
            this.prisma.booking.count({
                where: { providerId, status: { in: ['ACCEPTED', 'IN_PROGRESS'] } },
            }),
            this.prisma.cancellationRecord.count({
                where: { booking: { providerId } },
            }),
            this.prisma.providerPenalty.findMany({
                where: { providerId },
                orderBy: { createdAt: 'desc' },
                take: 10,
            }),
            this.prisma.walletTransaction.aggregate({
                where: {
                    walletId: provider.wallet?.id ?? '__none__',
                    type: client_1.WalletTransactionType.PROVIDER_EARNING,
                },
                _sum: { amount: true },
            }),
        ]);
        return {
            providerId,
            fullName: provider.fullName,
            rating: provider.ratingSummary?.averageRating ?? new client_1.Prisma.Decimal(0),
            totalReviews: provider.ratingSummary?.totalReviews ?? 0,
            jobsCompleted: completedJobs,
            activeBookings,
            walletBalance: provider.wallet?.balance ?? new client_1.Prisma.Decimal(0),
            heldBalance: provider.wallet?.heldBalance ?? new client_1.Prisma.Decimal(0),
            lifetimeEarnings: earnings._sum.amount ?? new client_1.Prisma.Decimal(0),
            cancellationCount: cancellations,
            penalties,
        };
    }
    async suspendProvider(adminId, providerId, reason) {
        const provider = await this.prisma.user.findUnique({
            where: { id: providerId },
        });
        if (!provider || provider.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        if (provider.status === client_1.UserStatus.SUSPENDED) {
            throw new common_1.BadRequestException('Provider is already suspended');
        }
        const updated = await this.prisma.user.update({
            where: { id: providerId },
            data: { status: client_1.UserStatus.SUSPENDED },
        });
        await this.prisma.refreshToken.deleteMany({
            where: { userId: providerId },
        });
        await this.audit.record({
            adminId,
            action: 'PROVIDER_SUSPENDED',
            entityType: 'PROVIDER',
            entityId: providerId,
            previousValues: { status: provider.status },
            newValues: { status: client_1.UserStatus.SUSPENDED, reason },
        });
        void this.notifications.send({
            userId: providerId,
            type: client_1.NotificationType.SYSTEM_ANNOUNCEMENT,
            title: 'Account suspended ⚠️',
            message: `Your provider account has been suspended. Reason: ${reason}`,
            relatedEntityType: 'PROVIDER',
            relatedEntityId: providerId,
            force: true,
        });
        return { message: 'Provider suspended', provider: this.sanitize(updated) };
    }
    async unsuspendProvider(adminId, providerId) {
        const provider = await this.prisma.user.findUnique({
            where: { id: providerId },
        });
        if (!provider || provider.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        if (provider.status !== client_1.UserStatus.SUSPENDED) {
            throw new common_1.BadRequestException('Provider is not suspended');
        }
        const updated = await this.prisma.user.update({
            where: { id: providerId },
            data: { status: client_1.UserStatus.ACTIVE },
        });
        await this.audit.record({
            adminId,
            action: 'PROVIDER_UNSUSPENDED',
            entityType: 'PROVIDER',
            entityId: providerId,
            previousValues: { status: provider.status },
            newValues: { status: client_1.UserStatus.ACTIVE },
        });
        void this.notifications.send({
            userId: providerId,
            type: client_1.NotificationType.SYSTEM_ANNOUNCEMENT,
            title: 'Account reactivated ✅',
            message: 'Your provider account has been reactivated.',
            relatedEntityType: 'PROVIDER',
            relatedEntityId: providerId,
            force: true,
        });
        return {
            message: 'Provider unsuspended',
            provider: this.sanitize(updated),
        };
    }
    async getUserOrThrow(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    sanitize(user) {
        const { passwordHash, refreshToken, ...safe } = user;
        return safe;
    }
};
exports.AdminUsersService = AdminUsersService;
exports.AdminUsersService = AdminUsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        admin_audit_service_1.AdminAuditService,
        notifications_service_1.NotificationsService,
        nestjs_pino_1.Logger])
], AdminUsersService);
//# sourceMappingURL=admin-users.service.js.map