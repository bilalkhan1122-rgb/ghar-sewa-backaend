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
exports.VerificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
const nestjs_pino_1 = require("nestjs-pino");
const client_1 = require("../../../generated/prisma/client");
let VerificationService = class VerificationService {
    prisma;
    notifications;
    logger;
    constructor(prisma, notifications, logger) {
        this.prisma = prisma;
        this.notifications = notifications;
        this.logger = logger;
    }
    async submit(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { providerProfile: { include: { categories: true } } },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        if (user.verificationStatus === client_1.VerificationStatus.BANNED) {
            throw new common_1.ForbiddenException('Your account is banned. You cannot submit a verification request.');
        }
        const profile = user.providerProfile;
        if (!profile) {
            throw new common_1.BadRequestException('Complete your profile before submitting for verification');
        }
        const pendingRequest = await this.prisma.verificationRequest.findFirst({
            where: { providerId: userId, status: client_1.VerificationStatus.PENDING },
        });
        if (pendingRequest) {
            throw new common_1.ConflictException('You already have a verification request under review');
        }
        const missing = this.missingFields(profile);
        if (missing.length > 0) {
            throw new common_1.BadRequestException({
                message: 'Profile must be 100% complete before submitting for verification',
                missingFields: missing,
            });
        }
        const isResubmission = user.verificationStatus === client_1.VerificationStatus.REJECTED;
        const request = await this.prisma.verificationRequest.create({
            data: {
                providerId: userId,
                cnicNumber: profile.cnicNumber,
                facePhoto: profile.facePhoto,
                cnicFrontImage: profile.cnicFrontImage,
                cnicBackImage: profile.cnicBackImage,
                status: client_1.VerificationStatus.PENDING,
                submittedAt: new Date(),
            },
        });
        await this.prisma.user.update({
            where: { id: userId },
            data: { verificationStatus: client_1.VerificationStatus.PENDING },
        });
        this.logger.log({
            eventType: 'ADMIN_VERIFICATION_SUBMITTED',
            requestId: request.id,
            providerId: userId,
            isResubmission,
        });
        void this.notifications.send({
            userId,
            type: isResubmission
                ? client_1.NotificationType.VERIFICATION_RESUBMITTED
                : client_1.NotificationType.VERIFICATION_SUBMITTED,
            title: isResubmission
                ? 'Verification resubmitted 📋'
                : 'Verification submitted 📋',
            message: 'Your profile has been submitted for review. We will notify you once it is decided.',
            relatedEntityType: 'VERIFICATION_REQUEST',
            relatedEntityId: request.id,
        });
        return {
            message: isResubmission
                ? 'Profile resubmitted for verification successfully'
                : 'Profile submitted for verification successfully',
            verificationStatus: client_1.VerificationStatus.PENDING,
            requestId: request.id,
        };
    }
    async onSensitiveInfoChanged(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { providerProfile: true },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            return;
        }
        const profile = user.providerProfile;
        const sensitiveComplete = !!profile?.cnicNumber &&
            !!profile?.facePhoto &&
            !!profile?.cnicFrontImage &&
            !!profile?.cnicBackImage;
        const wasApproved = user.verificationStatus === client_1.VerificationStatus.APPROVED;
        if (wasApproved ||
            user.verificationStatus === client_1.VerificationStatus.INCOMPLETE) {
            await this.prisma.user.update({
                where: { id: userId },
                data: { verificationStatus: client_1.VerificationStatus.PENDING },
            });
            const pendingRequest = await this.prisma.verificationRequest.findFirst({
                where: { providerId: userId, status: client_1.VerificationStatus.PENDING },
            });
            let requestId;
            if (!pendingRequest && sensitiveComplete) {
                const request = await this.prisma.verificationRequest.create({
                    data: {
                        providerId: userId,
                        cnicNumber: profile?.cnicNumber ?? '',
                        facePhoto: profile?.facePhoto ?? '',
                        cnicFrontImage: profile?.cnicFrontImage ?? '',
                        cnicBackImage: profile?.cnicBackImage ?? '',
                        status: client_1.VerificationStatus.PENDING,
                        submittedAt: new Date(),
                    },
                });
                requestId = request.id;
            }
            else {
                requestId = pendingRequest?.id;
            }
            this.logger.log({
                eventType: 'ADMIN_VERIFICATION_PENDING_RESET',
                providerId: userId,
                reason: 'verification-sensitive information changed',
            });
            if (wasApproved) {
                void this.notifications.send({
                    userId,
                    type: client_1.NotificationType.VERIFICATION_RESUBMITTED,
                    title: 'Re-verification required 🔄',
                    message: 'Your verification documents changed. Your profile is pending re-verification.',
                    relatedEntityType: 'VERIFICATION_REQUEST',
                    relatedEntityId: requestId,
                });
            }
        }
    }
    async getStatus(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                verificationStatus: true,
                profileCompleted: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const latestRequest = await this.prisma.verificationRequest.findFirst({
            where: { providerId: userId },
            orderBy: { submittedAt: 'desc' },
            select: {
                id: true,
                status: true,
                submittedAt: true,
                reviewedAt: true,
                rejectionReason: true,
            },
        });
        return {
            verificationStatus: user.verificationStatus,
            profileCompleted: user.profileCompleted,
            latestRequest,
        };
    }
    async getHistory(userId, query) {
        const { page = 1, limit = 10, status } = query;
        const skip = (page - 1) * limit;
        const where = {
            providerId: userId,
            ...(status && { status }),
        };
        const [data, total] = await Promise.all([
            this.prisma.verificationRequest.findMany({
                where,
                skip,
                take: limit,
                orderBy: { submittedAt: 'desc' },
            }),
            this.prisma.verificationRequest.count({ where }),
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
    async adminListRequests(query) {
        const { page = 1, limit = 10, status } = query;
        const skip = (page - 1) * limit;
        const where = {
            ...(status && { status }),
        };
        const [data, total] = await Promise.all([
            this.prisma.verificationRequest.findMany({
                where,
                skip,
                take: limit,
                orderBy: { submittedAt: 'asc' },
                include: {
                    provider: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true,
                            phone: true,
                            profilePhoto: true,
                            city: { select: { id: true, name: true } },
                            providerProfile: {
                                select: {
                                    bio: true,
                                    hourlyRate: true,
                                    serviceLocation: true,
                                    serviceRadius: true,
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.verificationRequest.count({ where }),
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
    async adminGetRequest(requestId) {
        const request = await this.prisma.verificationRequest.findUnique({
            where: { id: requestId },
            include: {
                provider: {
                    include: {
                        providerProfile: {
                            include: { categories: { include: { category: true } } },
                        },
                        city: true,
                    },
                },
            },
        });
        if (!request) {
            throw new common_1.NotFoundException('Verification request not found');
        }
        return request;
    }
    async adminApprove(adminId, requestId) {
        const request = await this.prisma.verificationRequest.findUnique({
            where: { id: requestId },
        });
        if (!request) {
            throw new common_1.NotFoundException('Verification request not found');
        }
        if (request.status !== client_1.VerificationStatus.PENDING) {
            throw new common_1.BadRequestException(`Only pending requests can be approved (current: ${request.status})`);
        }
        const [updated] = await this.prisma.$transaction([
            this.prisma.verificationRequest.update({
                where: { id: requestId },
                data: {
                    status: client_1.VerificationStatus.APPROVED,
                    reviewedBy: adminId,
                    reviewedAt: new Date(),
                    rejectionReason: null,
                },
            }),
            this.prisma.user.update({
                where: { id: request.providerId },
                data: { verificationStatus: client_1.VerificationStatus.APPROVED },
            }),
        ]);
        this.logger.log({
            eventType: 'ADMIN_VERIFICATION_APPROVED',
            requestId,
            providerId: request.providerId,
            reviewedBy: adminId,
        });
        void this.notifications.send({
            userId: request.providerId,
            type: client_1.NotificationType.VERIFICATION_APPROVED,
            title: 'Verification approved ✅',
            message: 'Congratulations! Your profile is verified. You can now accept jobs and bookings.',
            relatedEntityType: 'VERIFICATION_REQUEST',
            relatedEntityId: requestId,
        });
        return { message: 'Verification request approved', request: updated };
    }
    async adminReject(adminId, requestId, reason) {
        const request = await this.prisma.verificationRequest.findUnique({
            where: { id: requestId },
        });
        if (!request) {
            throw new common_1.NotFoundException('Verification request not found');
        }
        if (request.status !== client_1.VerificationStatus.PENDING) {
            throw new common_1.BadRequestException(`Only pending requests can be rejected (current: ${request.status})`);
        }
        const [updated] = await this.prisma.$transaction([
            this.prisma.verificationRequest.update({
                where: { id: requestId },
                data: {
                    status: client_1.VerificationStatus.REJECTED,
                    reviewedBy: adminId,
                    reviewedAt: new Date(),
                    rejectionReason: reason,
                },
            }),
            this.prisma.user.update({
                where: { id: request.providerId },
                data: { verificationStatus: client_1.VerificationStatus.REJECTED },
            }),
        ]);
        this.logger.log({
            eventType: 'ADMIN_VERIFICATION_REJECTED',
            requestId,
            providerId: request.providerId,
            reviewedBy: adminId,
            reason,
        });
        void this.notifications.send({
            userId: request.providerId,
            type: client_1.NotificationType.VERIFICATION_REJECTED,
            title: 'Verification rejected ❌',
            message: `Your verification request was rejected. Reason: ${reason}`,
            relatedEntityType: 'VERIFICATION_REQUEST',
            relatedEntityId: requestId,
        });
        return { message: 'Verification request rejected', request: updated };
    }
    async adminGetProviderHistory(providerId, query) {
        const user = await this.prisma.user.findUnique({
            where: { id: providerId },
            select: { id: true, role: true },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        return this.getHistory(providerId, query);
    }
    async adminBan(adminId, providerId) {
        const user = await this.prisma.user.findUnique({
            where: { id: providerId },
            select: { id: true, role: true, verificationStatus: true },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        if (user.verificationStatus === client_1.VerificationStatus.BANNED) {
            throw new common_1.BadRequestException('Provider is already banned');
        }
        await this.prisma.user.update({
            where: { id: providerId },
            data: { verificationStatus: client_1.VerificationStatus.BANNED },
        });
        this.logger.log({
            eventType: 'ADMIN_PROVIDER_BANNED',
            providerId,
            bannedBy: adminId,
        });
        void this.notifications.send({
            userId: providerId,
            type: client_1.NotificationType.VERIFICATION_BANNED,
            title: 'Account banned 🚫',
            message: 'Your provider account has been banned. You can no longer accept jobs or bookings.',
            relatedEntityType: 'USER',
            relatedEntityId: providerId,
        });
        return {
            message: 'Provider banned',
            verificationStatus: client_1.VerificationStatus.BANNED,
        };
    }
    async adminUnban(adminId, providerId) {
        const user = await this.prisma.user.findUnique({
            where: { id: providerId },
            select: { id: true, role: true, verificationStatus: true },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        if (user.verificationStatus !== client_1.VerificationStatus.BANNED) {
            throw new common_1.BadRequestException('Provider is not currently banned');
        }
        await this.prisma.user.update({
            where: { id: providerId },
            data: { verificationStatus: client_1.VerificationStatus.INCOMPLETE },
        });
        this.logger.log({
            eventType: 'ADMIN_PROVIDER_UNBANNED',
            providerId,
            unbannedBy: adminId,
        });
        void this.notifications.send({
            userId: providerId,
            type: client_1.NotificationType.VERIFICATION_UNBANNED,
            title: 'Account unbanned ✅',
            message: 'Your ban has been lifted. Please resubmit your profile for verification to continue.',
            relatedEntityType: 'USER',
            relatedEntityId: providerId,
        });
        return {
            message: 'Provider unbanned. Verification status reset — resubmission required.',
            verificationStatus: client_1.VerificationStatus.INCOMPLETE,
        };
    }
    missingFields(profile) {
        const fields = [
            { name: 'facePhoto', completed: !!profile?.facePhoto },
            { name: 'cnicNumber', completed: !!profile?.cnicNumber },
            { name: 'cnicFrontImage', completed: !!profile?.cnicFrontImage },
            { name: 'cnicBackImage', completed: !!profile?.cnicBackImage },
            { name: 'bio', completed: !!profile?.bio },
            { name: 'hourlyRate', completed: profile?.hourlyRate != null },
            { name: 'serviceLocation', completed: !!profile?.serviceLocation },
            { name: 'categories', completed: (profile?.categories?.length ?? 0) > 0 },
        ];
        return fields.filter((f) => !f.completed).map((f) => f.name);
    }
};
exports.VerificationService = VerificationService;
exports.VerificationService = VerificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService,
        nestjs_pino_1.Logger])
], VerificationService);
//# sourceMappingURL=verification.service.js.map