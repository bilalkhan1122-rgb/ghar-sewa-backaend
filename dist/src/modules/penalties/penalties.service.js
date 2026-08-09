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
exports.PenaltiesService = exports.SUSPENSION_DAYS = exports.PENALTY_WINDOW_DAYS = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../prisma/prisma.service");
const file_upload_service_1 = require("../../common/services/file-upload.service");
const notifications_service_1 = require("../notifications/notifications.service");
const nestjs_pino_1 = require("nestjs-pino");
const client_1 = require("../../../generated/prisma/client");
exports.PENALTY_WINDOW_DAYS = 30;
exports.SUSPENSION_DAYS = 7;
const PROVIDER_CANCELLATION_WHERE = {
    OR: [
        { cancelledBy: 'PROVIDER' },
        { cancellationType: client_1.CancellationType.PROVIDER },
    ],
};
let PenaltiesService = class PenaltiesService {
    prisma;
    fileUpload;
    notifications;
    logger;
    constructor(prisma, fileUpload, notifications, logger) {
        this.prisma = prisma;
        this.fileUpload = fileUpload;
        this.notifications = notifications;
        this.logger = logger;
    }
    async evaluateProviderCancellation(providerId, cancellationId, reason) {
        const now = new Date();
        const windowStart = new Date(now.getTime() - exports.PENALTY_WINDOW_DAYS * 24 * 60 * 60 * 1000);
        const [totalCancellations, cancellationsInWindow] = await Promise.all([
            this.prisma.cancellationRecord.count({
                where: { ...PROVIDER_CANCELLATION_WHERE, booking: { providerId } },
            }),
            this.prisma.cancellationRecord.count({
                where: {
                    ...PROVIDER_CANCELLATION_WHERE,
                    booking: { providerId },
                    createdAt: { gte: windowStart },
                },
            }),
        ]);
        let penaltyType;
        let penaltyReason;
        if (totalCancellations >= 3) {
            penaltyType = client_1.PenaltyType.PERMANENT_BAN;
            penaltyReason =
                `Third provider cancellation (${totalCancellations} total). Policy: permanent ban. ${reason}`.trim();
        }
        else if (totalCancellations === 2 && cancellationsInWindow >= 2) {
            penaltyType = client_1.PenaltyType.TEMPORARY_BAN;
            penaltyReason =
                `Second provider cancellation within ${exports.PENALTY_WINDOW_DAYS} days. Policy: ${exports.SUSPENSION_DAYS}-day suspension. ${reason}`.trim();
        }
        else {
            penaltyType = client_1.PenaltyType.WARNING;
            penaltyReason =
                `Provider cancellation (${totalCancellations} total). Policy: warning issued. ${reason}`.trim();
        }
        const endDate = penaltyType === client_1.PenaltyType.TEMPORARY_BAN
            ? new Date(now.getTime() + exports.SUSPENSION_DAYS * 24 * 60 * 60 * 1000)
            : null;
        const penalty = await this.prisma.$transaction(async (tx) => {
            const created = await tx.providerPenalty.create({
                data: {
                    providerId,
                    penaltyType,
                    reason: penaltyReason,
                    startDate: now,
                    endDate,
                    active: true,
                },
            });
            await tx.cancellationRecord.update({
                where: { id: cancellationId },
                data: { penaltyApplied: true, penaltyId: created.id },
            });
            if (penaltyType === client_1.PenaltyType.TEMPORARY_BAN) {
                await tx.user.update({
                    where: { id: providerId },
                    data: { status: client_1.UserStatus.SUSPENDED },
                });
            }
            else if (penaltyType === client_1.PenaltyType.PERMANENT_BAN) {
                await tx.user.update({
                    where: { id: providerId },
                    data: {
                        status: client_1.UserStatus.BANNED,
                        verificationStatus: client_1.VerificationStatus.BANNED,
                    },
                });
            }
            return created;
        });
        this.logger.log({
            message: 'Provider penalty applied',
            providerId,
            cancellationId,
            penaltyId: penalty.id,
            penaltyType,
            totalCancellations,
            cancellationsInWindow,
        });
        const notificationMap = {
            [client_1.PenaltyType.WARNING]: client_1.NotificationType.PENALTY_WARNING,
            [client_1.PenaltyType.TEMPORARY_BAN]: client_1.NotificationType.PENALTY_SUSPENSION_STARTED,
            [client_1.PenaltyType.PERMANENT_BAN]: client_1.NotificationType.PENALTY_PERMANENT_BAN,
        };
        const titleMap = {
            [client_1.PenaltyType.WARNING]: 'Cancellation warning ⚠️',
            [client_1.PenaltyType.TEMPORARY_BAN]: 'Account suspended 🕒',
            [client_1.PenaltyType.PERMANENT_BAN]: 'Account permanently banned 🚫',
        };
        const messageMap = {
            [client_1.PenaltyType.WARNING]: 'You received a warning for cancelling an accepted job. Repeated cancellations lead to suspension.',
            [client_1.PenaltyType.TEMPORARY_BAN]: `You are suspended from taking new jobs for ${exports.SUSPENSION_DAYS} days due to repeated cancellations.`,
            [client_1.PenaltyType.PERMANENT_BAN]: 'Your account has been permanently banned due to repeated cancellations.',
        };
        void this.notifications.send({
            userId: providerId,
            type: notificationMap[penaltyType],
            title: titleMap[penaltyType],
            message: messageMap[penaltyType],
            relatedEntityType: 'PENALTY',
            relatedEntityId: penalty.id,
        });
        return penalty;
    }
    async assertProviderEligible(providerId) {
        const user = await this.prisma.user.findUnique({
            where: { id: providerId },
            select: { id: true, role: true, status: true, verificationStatus: true },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        if (user.verificationStatus === client_1.VerificationStatus.BANNED) {
            throw new common_1.ForbiddenException('Your account is banned. You cannot participate in new jobs.');
        }
        if (user.status === client_1.UserStatus.SUSPENDED) {
            const activeSuspension = await this.prisma.providerPenalty.findFirst({
                where: {
                    providerId,
                    penaltyType: client_1.PenaltyType.TEMPORARY_BAN,
                    active: true,
                    endDate: { lte: new Date() },
                },
            });
            if (activeSuspension) {
                await this.liftSuspension(activeSuspension.id, providerId);
            }
            else {
                const stillActive = await this.prisma.providerPenalty.findFirst({
                    where: {
                        providerId,
                        penaltyType: client_1.PenaltyType.TEMPORARY_BAN,
                        active: true,
                    },
                });
                if (stillActive) {
                    throw new common_1.ForbiddenException(`Your account is suspended until ${stillActive.endDate?.toISOString()}. You cannot accept new jobs.`);
                }
            }
        }
        if (user.status === client_1.UserStatus.BANNED) {
            throw new common_1.ForbiddenException('Your account is banned. You cannot participate in new jobs.');
        }
    }
    async expireSuspensions() {
        const expired = await this.prisma.providerPenalty.findMany({
            where: {
                penaltyType: client_1.PenaltyType.TEMPORARY_BAN,
                active: true,
                endDate: { lte: new Date() },
            },
            select: { id: true, providerId: true },
        });
        for (const penalty of expired) {
            await this.liftSuspension(penalty.id, penalty.providerId);
        }
        if (expired.length > 0) {
            this.logger.log({
                message: 'Expired provider suspensions',
                count: expired.length,
            });
        }
        return expired.length;
    }
    async liftSuspension(penaltyId, providerId) {
        await this.prisma.$transaction([
            this.prisma.providerPenalty.update({
                where: { id: penaltyId },
                data: { active: false },
            }),
            this.prisma.user.update({
                where: { id: providerId },
                data: { status: client_1.UserStatus.ACTIVE },
            }),
        ]);
        void this.notifications.send({
            userId: providerId,
            type: client_1.NotificationType.PENALTY_SUSPENSION_ENDED,
            title: 'Suspension lifted ✅',
            message: 'Your suspension has ended. You can accept new jobs again.',
            relatedEntityType: 'PENALTY',
            relatedEntityId: penaltyId,
        });
    }
    async listProviderPenalties(providerId, query) {
        const { page = 1, limit = 10, type } = query;
        const skip = (page - 1) * limit;
        const where = {
            providerId,
            ...(type && { penaltyType: type }),
        };
        const [data, total] = await Promise.all([
            this.prisma.providerPenalty.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    cancellations: {
                        select: {
                            id: true,
                            bookingId: true,
                            createdAt: true,
                            reason: true,
                        },
                    },
                },
            }),
            this.prisma.providerPenalty.count({ where }),
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
    async getActivePenalties(providerId) {
        return this.prisma.providerPenalty.findMany({
            where: { providerId, active: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async listProviderCancellations(providerId, query) {
        const { page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const where = {
            ...PROVIDER_CANCELLATION_WHERE,
            booking: { providerId },
        };
        const [data, total] = await Promise.all([
            this.prisma.cancellationRecord.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { penalty: true },
            }),
            this.prisma.cancellationRecord.count({ where }),
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
    async createAppeal(providerId, dto, file) {
        const penalty = await this.prisma.providerPenalty.findUnique({
            where: { id: dto.penaltyId },
        });
        if (!penalty || penalty.providerId !== providerId) {
            throw new common_1.NotFoundException('Penalty not found');
        }
        const existing = await this.prisma.appeal.findFirst({
            where: { penaltyId: dto.penaltyId, status: client_1.AppealStatus.PENDING },
        });
        if (existing) {
            throw new common_1.ConflictException('An appeal for this penalty is already pending');
        }
        let supportingFile;
        if (file) {
            this.fileUpload.validateEvidenceFile(file);
            supportingFile = await this.fileUpload.uploadAppealFile(file);
        }
        const appeal = await this.prisma.appeal.create({
            data: {
                penaltyId: dto.penaltyId,
                providerId,
                explanation: dto.explanation,
                supportingFile,
                status: client_1.AppealStatus.PENDING,
            },
            include: { penalty: true },
        });
        this.logger.log({
            message: 'Appeal submitted',
            appealId: appeal.id,
            providerId,
            penaltyId: dto.penaltyId,
        });
        return appeal;
    }
    async getMyAppeal(providerId, appealId) {
        const appeal = await this.prisma.appeal.findFirst({
            where: { id: appealId, providerId },
            include: { penalty: true },
        });
        if (!appeal) {
            throw new common_1.NotFoundException('Appeal not found');
        }
        return appeal;
    }
    async listMyAppeals(providerId, query) {
        const { page = 1, limit = 10, status } = query;
        const skip = (page - 1) * limit;
        const where = {
            providerId,
            ...(status && { status }),
        };
        const [data, total] = await Promise.all([
            this.prisma.appeal.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { penalty: true },
            }),
            this.prisma.appeal.count({ where }),
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
    async adminListAppeals(query) {
        const { page = 1, limit = 10, status } = query;
        const skip = (page - 1) * limit;
        const where = {
            ...(status && { status }),
        };
        const [data, total] = await Promise.all([
            this.prisma.appeal.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    penalty: true,
                    provider: {
                        select: { id: true, fullName: true, email: true, phone: true },
                    },
                },
            }),
            this.prisma.appeal.count({ where }),
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
    async adminGetAppeal(appealId) {
        const appeal = await this.prisma.appeal.findUnique({
            where: { id: appealId },
            include: {
                penalty: true,
                provider: {
                    select: { id: true, fullName: true, email: true, phone: true },
                },
            },
        });
        if (!appeal) {
            throw new common_1.NotFoundException('Appeal not found');
        }
        return appeal;
    }
    async adminApproveAppeal(adminId, appealId, note) {
        const appeal = await this.prisma.appeal.findUnique({
            where: { id: appealId },
            include: { penalty: true },
        });
        if (!appeal) {
            throw new common_1.NotFoundException('Appeal not found');
        }
        if (appeal.status !== client_1.AppealStatus.PENDING) {
            throw new common_1.BadRequestException(`Only pending appeals can be approved (current: ${appeal.status})`);
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.appeal.update({
                where: { id: appealId },
                data: {
                    status: client_1.AppealStatus.APPROVED,
                    reviewedBy: adminId,
                    reviewedAt: new Date(),
                    adminNote: note,
                },
            });
            if (appeal.penalty.active) {
                await tx.providerPenalty.update({
                    where: { id: appeal.penaltyId },
                    data: { active: false },
                });
            }
            if (appeal.penalty.penaltyType === client_1.PenaltyType.PERMANENT_BAN) {
                await tx.user.update({
                    where: { id: appeal.providerId },
                    data: {
                        status: client_1.UserStatus.ACTIVE,
                        verificationStatus: client_1.VerificationStatus.INCOMPLETE,
                    },
                });
            }
            else if (appeal.penalty.penaltyType === client_1.PenaltyType.TEMPORARY_BAN) {
                await tx.user.update({
                    where: { id: appeal.providerId },
                    data: { status: client_1.UserStatus.ACTIVE },
                });
            }
        });
        void this.notifications.send({
            userId: appeal.providerId,
            type: client_1.NotificationType.APPEAL_APPROVED,
            title: 'Appeal approved ✅',
            message: appeal.penalty.penaltyType === client_1.PenaltyType.PERMANENT_BAN
                ? 'Your appeal was approved and your ban has been lifted. Please re-submit your profile for verification.'
                : 'Your appeal was approved and the penalty has been lifted.',
            relatedEntityType: 'APPEAL',
            relatedEntityId: appealId,
        });
        this.logger.log({
            message: 'Appeal approved',
            appealId,
            reviewedBy: adminId,
            penaltyId: appeal.penaltyId,
        });
        return { message: 'Appeal approved', appealId };
    }
    async adminRejectAppeal(adminId, appealId, note) {
        const appeal = await this.prisma.appeal.findUnique({
            where: { id: appealId },
        });
        if (!appeal) {
            throw new common_1.NotFoundException('Appeal not found');
        }
        if (appeal.status !== client_1.AppealStatus.PENDING) {
            throw new common_1.BadRequestException(`Only pending appeals can be rejected (current: ${appeal.status})`);
        }
        await this.prisma.appeal.update({
            where: { id: appealId },
            data: {
                status: client_1.AppealStatus.REJECTED,
                reviewedBy: adminId,
                reviewedAt: new Date(),
                adminNote: note,
            },
        });
        void this.notifications.send({
            userId: appeal.providerId,
            type: client_1.NotificationType.APPEAL_REJECTED,
            title: 'Appeal rejected ❌',
            message: `Your appeal was rejected. Note: ${note}`,
            relatedEntityType: 'APPEAL',
            relatedEntityId: appealId,
        });
        this.logger.log({
            message: 'Appeal rejected',
            appealId,
            reviewedBy: adminId,
            note,
        });
        return { message: 'Appeal rejected', appealId };
    }
    async adminListAllPenalties(query) {
        const { page = 1, limit = 10, type } = query;
        const skip = (page - 1) * limit;
        const where = {
            ...(type && { penaltyType: type }),
        };
        const [data, total] = await Promise.all([
            this.prisma.providerPenalty.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    provider: {
                        select: { id: true, fullName: true, email: true, phone: true },
                    },
                    cancellations: {
                        select: { id: true, bookingId: true, createdAt: true },
                    },
                    appeals: { select: { id: true, status: true, createdAt: true } },
                },
            }),
            this.prisma.providerPenalty.count({ where }),
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
    async adminGetProviderPenalties(providerId, query) {
        return this.listProviderPenalties(providerId, query);
    }
};
exports.PenaltiesService = PenaltiesService;
__decorate([
    (0, schedule_1.Cron)('5 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PenaltiesService.prototype, "expireSuspensions", null);
exports.PenaltiesService = PenaltiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        file_upload_service_1.FileUploadService,
        notifications_service_1.NotificationsService,
        nestjs_pino_1.Logger])
], PenaltiesService);
//# sourceMappingURL=penalties.service.js.map