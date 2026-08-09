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
exports.DisputesService = exports.DISPUTE_TIMELINE_ACTIONS = exports.MAX_DISPUTE_EVIDENCE = exports.DISPUTE_WINDOW_HOURS = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const file_upload_service_1 = require("../../common/services/file-upload.service");
const notifications_service_1 = require("../notifications/notifications.service");
const wallet_service_1 = require("../wallet/wallet.service");
const nestjs_pino_1 = require("nestjs-pino");
const client_1 = require("../../../generated/prisma/client");
exports.DISPUTE_WINDOW_HOURS = 48;
exports.MAX_DISPUTE_EVIDENCE = 5;
exports.DISPUTE_TIMELINE_ACTIONS = {
    OPENED: 'DISPUTE_OPENED',
    EVIDENCE_UPLOADED: 'EVIDENCE_UPLOADED',
    RESPONSE_SUBMITTED: 'RESPONSE_SUBMITTED',
    STATUS_CHANGED: 'STATUS_CHANGED',
    RESOLUTION_APPLIED: 'RESOLUTION_APPLIED',
    REJECTED: 'DISPUTE_REJECTED',
};
const ACTIVE_DISPUTE_STATUSES = [
    client_1.DisputeStatus.OPEN,
    client_1.DisputeStatus.UNDER_REVIEW,
    client_1.DisputeStatus.WAITING_FOR_RESPONSE,
];
let DisputesService = class DisputesService {
    prisma;
    fileUpload;
    notifications;
    wallet;
    logger;
    constructor(prisma, fileUpload, notifications, wallet, logger) {
        this.prisma = prisma;
        this.fileUpload = fileUpload;
        this.notifications = notifications;
        this.wallet = wallet;
        this.logger = logger;
    }
    async raiseDispute(userId, dto) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: dto.bookingId },
            include: { job: true },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        const isCustomer = booking.customerId === userId;
        const isProvider = booking.providerId === userId;
        if (!isCustomer && !isProvider) {
            throw new common_1.ForbiddenException('You are not part of this booking');
        }
        if (booking.status !== client_1.BookingStatus.COMPLETED) {
            throw new common_1.BadRequestException(`Disputes can only be raised for completed bookings (current: ${booking.status})`);
        }
        const anchor = booking.confirmedAt ?? booking.completedAt;
        if (!anchor) {
            throw new common_1.BadRequestException('Job must be completed and confirmed before a dispute can be raised');
        }
        const windowEnd = new Date(anchor.getTime() + exports.DISPUTE_WINDOW_HOURS * 60 * 60 * 1000);
        if (new Date() > windowEnd) {
            throw new common_1.BadRequestException(`The dispute window (${exports.DISPUTE_WINDOW_HOURS} hours after confirmation) has expired`);
        }
        const activeDispute = await this.prisma.dispute.findFirst({
            where: { bookingId: booking.id, status: { in: ACTIVE_DISPUTE_STATUSES } },
        });
        if (activeDispute) {
            throw new common_1.ConflictException('This booking already has an active dispute');
        }
        const opponentId = isCustomer ? booking.providerId : booking.customerId;
        const dispute = await this.prisma.$transaction(async (tx) => {
            const created = await tx.dispute.create({
                data: {
                    bookingId: booking.id,
                    jobId: booking.jobId,
                    raisedById: userId,
                    opponentId,
                    reason: dto.reason,
                    description: dto.description,
                    status: client_1.DisputeStatus.OPEN,
                },
            });
            await tx.disputeTimeline.create({
                data: {
                    disputeId: created.id,
                    actorId: userId,
                    action: exports.DISPUTE_TIMELINE_ACTIONS.OPENED,
                    description: `Dispute opened by ${isCustomer ? 'customer' : 'provider'}: ${dto.reason}`,
                },
            });
            await tx.booking.update({
                where: { id: booking.id },
                data: { status: client_1.BookingStatus.DISPUTED },
            });
            await tx.job.update({
                where: { id: booking.jobId },
                data: { status: client_1.JobStatus.DISPUTED },
            });
            return created;
        });
        this.logger.log({
            message: 'Dispute raised',
            disputeId: dispute.id,
            bookingId: booking.id,
            jobId: booking.jobId,
            raisedBy: userId,
        });
        void this.notifications.send({
            userId: opponentId,
            type: client_1.NotificationType.DISPUTE_RAISED,
            title: 'Dispute raised ⚖️',
            message: `A dispute has been raised on booking #${booking.id.slice(0, 8)}. Reason: ${dto.reason}`,
            relatedEntityType: 'DISPUTE',
            relatedEntityId: dispute.id,
        });
        return dispute;
    }
    async uploadEvidence(userId, disputeId, file) {
        const dispute = await this.assertPartyAccess(disputeId, userId);
        if (dispute.status === client_1.DisputeStatus.RESOLVED ||
            dispute.status === client_1.DisputeStatus.REJECTED) {
            throw new common_1.BadRequestException('Evidence cannot be uploaded after the dispute is closed');
        }
        if (dispute.evidenceCount >= exports.MAX_DISPUTE_EVIDENCE) {
            throw new common_1.BadRequestException(`Maximum ${exports.MAX_DISPUTE_EVIDENCE} evidence files allowed per dispute`);
        }
        this.fileUpload.validateEvidenceFile(file);
        const fileUrl = await this.fileUpload.uploadEvidenceFile(file);
        const evidence = await this.prisma.$transaction(async (tx) => {
            const created = await tx.disputeEvidence.create({
                data: {
                    disputeId,
                    uploaderId: userId,
                    type: this.mapEvidenceType(file.mimetype),
                    fileUrl,
                    mimeType: file.mimetype,
                    size: file.size,
                },
            });
            await tx.dispute.update({
                where: { id: disputeId },
                data: { evidenceCount: { increment: 1 } },
            });
            await tx.disputeTimeline.create({
                data: {
                    disputeId,
                    actorId: userId,
                    action: exports.DISPUTE_TIMELINE_ACTIONS.EVIDENCE_UPLOADED,
                    description: `Evidence uploaded (${file.mimetype})`,
                },
            });
            return created;
        });
        void this.notifications.send({
            userId: dispute.opponentId,
            type: client_1.NotificationType.DISPUTE_RESPONSE_RECEIVED,
            title: 'New evidence submitted 📎',
            message: 'The other party submitted new evidence to a dispute.',
            relatedEntityType: 'DISPUTE',
            relatedEntityId: disputeId,
        });
        this.logger.log({
            message: 'Dispute evidence uploaded',
            disputeId,
            evidenceId: evidence.id,
            uploaderId: userId,
        });
        return evidence;
    }
    async getDispute(userId, disputeId) {
        await this.assertPartyAccess(disputeId, userId);
        return this.disputeWithDetails(disputeId);
    }
    async listMyDisputes(userId, query) {
        const { page = 1, limit = 10, status } = query;
        const skip = (page - 1) * limit;
        const where = {
            OR: [{ raisedById: userId }, { opponentId: userId }],
            ...(status && { status }),
        };
        const [data, total] = await Promise.all([
            this.prisma.dispute.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    booking: { select: { id: true, totalAmount: true, status: true } },
                    job: { select: { id: true, title: true, status: true } },
                    raisedBy: { select: { id: true, fullName: true, role: true } },
                    opponent: { select: { id: true, fullName: true, role: true } },
                },
            }),
            this.prisma.dispute.count({ where }),
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
    async respond(userId, disputeId, dto) {
        const dispute = await this.assertPartyAccess(disputeId, userId);
        if (dispute.status === client_1.DisputeStatus.RESOLVED ||
            dispute.status === client_1.DisputeStatus.REJECTED) {
            throw new common_1.BadRequestException('Responses cannot be submitted after the dispute is closed');
        }
        const timeline = await this.prisma.disputeTimeline.create({
            data: {
                disputeId,
                actorId: userId,
                action: exports.DISPUTE_TIMELINE_ACTIONS.RESPONSE_SUBMITTED,
                description: dto.response,
            },
        });
        void this.notifications.send({
            userId: dispute.opponentId,
            type: client_1.NotificationType.DISPUTE_RESPONSE_RECEIVED,
            title: 'New response submitted 💬',
            message: 'The other party submitted a response to the dispute.',
            relatedEntityType: 'DISPUTE',
            relatedEntityId: disputeId,
        });
        this.logger.log({
            message: 'Dispute response submitted',
            disputeId,
            responderId: userId,
        });
        return timeline;
    }
    async getDisputeHistory(userId, disputeId) {
        await this.assertPartyAccess(disputeId, userId);
        return this.prisma.disputeTimeline.findMany({
            where: { disputeId },
            orderBy: { createdAt: 'asc' },
            include: {
                actor: { select: { id: true, fullName: true, role: true } },
            },
        });
    }
    async adminListDisputes(query) {
        const { page = 1, limit = 10, status } = query;
        const skip = (page - 1) * limit;
        const where = {
            ...(status && { status }),
        };
        const [data, total] = await Promise.all([
            this.prisma.dispute.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    booking: { select: { id: true, totalAmount: true, status: true } },
                    job: { select: { id: true, title: true } },
                    raisedBy: { select: { id: true, fullName: true, role: true } },
                    opponent: { select: { id: true, fullName: true, role: true } },
                    _count: { select: { evidences: true } },
                },
            }),
            this.prisma.dispute.count({ where }),
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
    async adminGetDispute(disputeId) {
        return this.disputeWithDetails(disputeId);
    }
    async adminListEvidence(disputeId) {
        await this.ensureDisputeExists(disputeId);
        return this.prisma.disputeEvidence.findMany({
            where: { disputeId },
            orderBy: { createdAt: 'asc' },
            include: {
                uploader: { select: { id: true, fullName: true, role: true } },
            },
        });
    }
    async adminGetTimeline(disputeId) {
        await this.ensureDisputeExists(disputeId);
        return this.prisma.disputeTimeline.findMany({
            where: { disputeId },
            orderBy: { createdAt: 'asc' },
            include: {
                actor: { select: { id: true, fullName: true, role: true } },
            },
        });
    }
    async adminGetChatHistory(disputeId, page = 1, limit = 20) {
        const dispute = await this.ensureDisputeExists(disputeId);
        const conversation = await this.prisma.conversation.findFirst({
            where: { bookingId: dispute.bookingId },
        });
        if (!conversation) {
            return {
                conversation: null,
                data: [],
                meta: {
                    total: 0,
                    page,
                    limit,
                    totalPages: 0,
                    hasNext: false,
                    hasPrevious: false,
                },
            };
        }
        const skip = (page - 1) * limit;
        const where = {
            conversationId: conversation.id,
            deletedAt: null,
        };
        const [messages, total] = await Promise.all([
            this.prisma.message.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    sender: { select: { id: true, fullName: true, role: true } },
                },
            }),
            this.prisma.message.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            conversation: { id: conversation.id, jobId: conversation.jobId },
            data: messages.reverse(),
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
    async adminUpdateStatus(adminId, disputeId, dto) {
        const dispute = await this.ensureDisputeExists(disputeId);
        if (dispute.status === client_1.DisputeStatus.RESOLVED ||
            dispute.status === client_1.DisputeStatus.REJECTED) {
            throw new common_1.BadRequestException('Closed disputes cannot change status');
        }
        if (dto.status !== client_1.DisputeStatus.UNDER_REVIEW &&
            dto.status !== client_1.DisputeStatus.WAITING_FOR_RESPONSE &&
            dto.status !== client_1.DisputeStatus.OPEN) {
            throw new common_1.BadRequestException('Status can only be moved to OPEN, UNDER_REVIEW or WAITING_FOR_RESPONSE here');
        }
        const updated = await this.prisma.$transaction(async (tx) => {
            const result = await tx.dispute.update({
                where: { id: disputeId },
                data: { status: dto.status },
            });
            await tx.disputeTimeline.create({
                data: {
                    disputeId,
                    actorId: adminId,
                    action: exports.DISPUTE_TIMELINE_ACTIONS.STATUS_CHANGED,
                    description: `Status changed to ${dto.status}${dto.note ? ` — ${dto.note}` : ''}`,
                },
            });
            return result;
        });
        await this.notifyParties(disputeId, client_1.NotificationType.DISPUTE_STATUS_UPDATED, 'Dispute status updated 🔄', `The dispute status has been updated to ${dto.status.replace('_', ' ')}.`);
        return updated;
    }
    async adminResolve(adminId, disputeId, dto) {
        const dispute = await this.ensureDisputeExists(disputeId);
        if (dispute.status === client_1.DisputeStatus.RESOLVED ||
            dispute.status === client_1.DisputeStatus.REJECTED) {
            throw new common_1.BadRequestException('This dispute is already closed');
        }
        if ((dto.resolution === client_1.DisputeResolution.FULL_REFUND ||
            dto.resolution === client_1.DisputeResolution.PARTIAL_REFUND) &&
            dto.refundAmount === undefined) {
            throw new common_1.BadRequestException('refundAmount is required for refund resolutions');
        }
        if (dto.refundAmount !== undefined &&
            dto.refundAmount > Number(dispute.booking?.totalAmount ?? 0)) {
            const booking = await this.prisma.booking.findUnique({
                where: { id: dispute.bookingId },
                select: { totalAmount: true },
            });
            if (booking && dto.refundAmount > Number(booking.totalAmount)) {
                throw new common_1.BadRequestException('refundAmount cannot exceed the booking total amount');
            }
        }
        if (dto.resolution === client_1.DisputeResolution.FULL_REFUND ||
            dto.resolution === client_1.DisputeResolution.PARTIAL_REFUND) {
            const booking = await this.prisma.booking.findUnique({
                where: { id: dispute.bookingId },
                select: { customerId: true, providerId: true, totalAmount: true },
            });
            if (!booking) {
                throw new common_1.NotFoundException('Booking not found');
            }
            const refundAmount = dto.resolution === client_1.DisputeResolution.FULL_REFUND
                ? (dto.refundAmount ?? booking.totalAmount)
                : dto.refundAmount;
            await this.wallet.processDisputeRefund({
                disputeId,
                bookingId: dispute.bookingId,
                customerId: booking.customerId,
                providerId: booking.providerId,
                amount: refundAmount,
                resolution: dto.resolution,
                adminId,
            });
        }
        const resolved = await this.prisma.$transaction(async (tx) => {
            const result = await tx.dispute.update({
                where: { id: disputeId },
                data: {
                    status: client_1.DisputeStatus.RESOLVED,
                    resolution: dto.resolution,
                    refundAmount: dto.refundAmount,
                    resolvedAt: new Date(),
                    resolvedBy: adminId,
                },
            });
            await tx.disputeTimeline.create({
                data: {
                    disputeId,
                    actorId: adminId,
                    action: exports.DISPUTE_TIMELINE_ACTIONS.RESOLUTION_APPLIED,
                    description: `Resolved with ${dto.resolution}${dto.note ? ` — ${dto.note}` : ''}`,
                },
            });
            if (dto.resolution === client_1.DisputeResolution.REDO_WORK) {
                await tx.booking.update({
                    where: { id: dispute.bookingId },
                    data: { status: client_1.BookingStatus.ACCEPTED },
                });
                await tx.job.update({
                    where: { id: dispute.jobId },
                    data: { status: client_1.JobStatus.ACCEPTED },
                });
            }
            else {
                await tx.booking.update({
                    where: { id: dispute.bookingId },
                    data: { status: client_1.BookingStatus.COMPLETED },
                });
                await tx.job.update({
                    where: { id: dispute.jobId },
                    data: { status: client_1.JobStatus.COMPLETED },
                });
            }
            return result;
        });
        this.logger.log({
            message: 'Dispute resolution applied',
            disputeId,
            bookingId: dispute.bookingId,
            resolution: dto.resolution,
            refundAmount: dto.refundAmount ?? null,
            eventType: 'DISPUTE_RESOLVED',
        });
        await this.notifyParties(disputeId, client_1.NotificationType.DISPUTE_RESOLVED, 'Dispute resolved ✅', `The dispute has been resolved with: ${dto.resolution.replace('_', ' ')}.`);
        this.logger.log({
            message: 'Dispute resolved',
            disputeId,
            resolvedBy: adminId,
            resolution: dto.resolution,
        });
        return { message: 'Dispute resolved', dispute: resolved };
    }
    async adminReject(adminId, disputeId, reason) {
        const dispute = await this.ensureDisputeExists(disputeId);
        if (dispute.status === client_1.DisputeStatus.RESOLVED ||
            dispute.status === client_1.DisputeStatus.REJECTED) {
            throw new common_1.BadRequestException('This dispute is already closed');
        }
        const rejected = await this.prisma.$transaction(async (tx) => {
            const result = await tx.dispute.update({
                where: { id: disputeId },
                data: {
                    status: client_1.DisputeStatus.REJECTED,
                    resolvedAt: new Date(),
                    resolvedBy: adminId,
                },
            });
            await tx.disputeTimeline.create({
                data: {
                    disputeId,
                    actorId: adminId,
                    action: exports.DISPUTE_TIMELINE_ACTIONS.REJECTED,
                    description: `Dispute rejected. Reason: ${reason}`,
                },
            });
            await tx.booking.update({
                where: { id: dispute.bookingId },
                data: { status: client_1.BookingStatus.COMPLETED },
            });
            await tx.job.update({
                where: { id: dispute.jobId },
                data: { status: client_1.JobStatus.COMPLETED },
            });
            return result;
        });
        await this.notifyParties(disputeId, client_1.NotificationType.DISPUTE_REJECTED, 'Dispute rejected ❌', `The dispute was rejected. Reason: ${reason}`);
        return { message: 'Dispute rejected', dispute: rejected };
    }
    async assertPartyAccess(disputeId, userId) {
        const dispute = await this.prisma.dispute.findUnique({
            where: { id: disputeId },
        });
        if (!dispute) {
            throw new common_1.NotFoundException('Dispute not found');
        }
        if (dispute.raisedById !== userId && dispute.opponentId !== userId) {
            throw new common_1.ForbiddenException('You are not part of this dispute');
        }
        return dispute;
    }
    async ensureDisputeExists(disputeId) {
        const dispute = await this.prisma.dispute.findUnique({
            where: { id: disputeId },
            include: { booking: { select: { totalAmount: true } } },
        });
        if (!dispute) {
            throw new common_1.NotFoundException('Dispute not found');
        }
        return dispute;
    }
    async disputeWithDetails(disputeId) {
        const dispute = await this.prisma.dispute.findUnique({
            where: { id: disputeId },
            include: {
                booking: {
                    include: {
                        job: {
                            include: { category: true, images: true },
                        },
                        customer: {
                            select: {
                                id: true,
                                fullName: true,
                                phone: true,
                                profilePhoto: true,
                            },
                        },
                        provider: {
                            select: {
                                id: true,
                                fullName: true,
                                phone: true,
                                profilePhoto: true,
                                providerProfile: {
                                    select: {
                                        bio: true,
                                        serviceLocation: true,
                                        hourlyRate: true,
                                    },
                                },
                            },
                        },
                    },
                },
                raisedBy: { select: { id: true, fullName: true, role: true } },
                opponent: { select: { id: true, fullName: true, role: true } },
                evidences: {
                    orderBy: { createdAt: 'asc' },
                    include: {
                        uploader: { select: { id: true, fullName: true, role: true } },
                    },
                },
                timeline: {
                    orderBy: { createdAt: 'asc' },
                    include: {
                        actor: { select: { id: true, fullName: true, role: true } },
                    },
                },
            },
        });
        if (!dispute) {
            throw new common_1.NotFoundException('Dispute not found');
        }
        return dispute;
    }
    async notifyParties(disputeId, type, title, message) {
        const dispute = await this.prisma.dispute.findUnique({
            where: { id: disputeId },
            select: { raisedById: true, opponentId: true },
        });
        if (!dispute)
            return;
        await this.notifications.sendToMany([
            {
                userId: dispute.raisedById,
                type,
                title,
                message,
                relatedEntityType: 'DISPUTE',
                relatedEntityId: disputeId,
            },
            {
                userId: dispute.opponentId,
                type,
                title,
                message,
                relatedEntityType: 'DISPUTE',
                relatedEntityId: disputeId,
            },
        ]);
    }
    mapEvidenceType(mimeType) {
        if (mimeType.startsWith('video/'))
            return client_1.DisputeEvidenceType.VIDEO;
        if (mimeType === 'application/pdf')
            return client_1.DisputeEvidenceType.DOCUMENT;
        return client_1.DisputeEvidenceType.IMAGE;
    }
    assertAdminRole(role) {
        if (role !== client_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Admin access required');
        }
    }
};
exports.DisputesService = DisputesService;
exports.DisputesService = DisputesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        file_upload_service_1.FileUploadService,
        notifications_service_1.NotificationsService,
        wallet_service_1.WalletService,
        nestjs_pino_1.Logger])
], DisputesService);
//# sourceMappingURL=disputes.service.js.map