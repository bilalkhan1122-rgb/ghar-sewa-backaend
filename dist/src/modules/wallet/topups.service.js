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
exports.TopUpsService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const prisma_service_1 = require("../../prisma/prisma.service");
const file_upload_service_1 = require("../../common/services/file-upload.service");
const admin_audit_service_1 = require("../../common/services/admin-audit.service");
const notifications_service_1 = require("../notifications/notifications.service");
const wallet_service_1 = require("./wallet.service");
const client_1 = require("../../../generated/prisma/client");
let TopUpsService = class TopUpsService {
    prisma;
    fileUpload;
    notifications;
    wallet;
    logger;
    adminAudit;
    constructor(prisma, fileUpload, notifications, wallet, logger, adminAudit) {
        this.prisma = prisma;
        this.fileUpload = fileUpload;
        this.notifications = notifications;
        this.wallet = wallet;
        this.logger = logger;
        this.adminAudit = adminAudit;
    }
    async submitTopUp(userId, dto, file) {
        const wallet = await this.wallet.ensureWallet(userId);
        const pending = await this.prisma.topUpRequest.findFirst({
            where: { userId, status: client_1.TopUpStatus.PENDING },
        });
        if (pending) {
            throw new common_1.ConflictException('You already have a pending top-up request. Wait for it to be reviewed.');
        }
        let proofImage;
        if (file) {
            this.fileUpload.validateEvidenceFile(file);
            proofImage = await this.fileUpload.uploadTopUpProof(file);
        }
        const request = await this.prisma.topUpRequest.create({
            data: {
                userId,
                walletId: wallet.id,
                amount: dto.amount,
                paymentMethod: dto.paymentMethod,
                transactionReference: dto.transactionReference,
                notes: dto.notes,
                proofImage,
            },
        });
        this.logger.log({
            eventType: 'ADMIN_TOPUP_SUBMITTED',
            topUpId: request.id,
            userId,
            amount: dto.amount,
        });
        void this.notifications.send({
            userId,
            type: client_1.NotificationType.WALLET_TOPUP_SUBMITTED,
            title: 'Top-up request submitted 📥',
            message: `Your top-up request of Rs. ${dto.amount} is pending review.`,
            relatedEntityType: 'TOP_UP',
            relatedEntityId: request.id,
        });
        return request;
    }
    async listMyTopUps(userId, query) {
        const { page = 1, limit = 10, status } = query;
        const skip = (page - 1) * limit;
        const where = {
            userId,
            ...(status && { status }),
        };
        const [data, total] = await Promise.all([
            this.prisma.topUpRequest.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.topUpRequest.count({ where }),
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
    async getMyTopUp(userId, topUpId) {
        const request = await this.prisma.topUpRequest.findFirst({
            where: { id: topUpId, userId },
        });
        if (!request) {
            throw new common_1.NotFoundException('Top-up request not found');
        }
        return request;
    }
    async adminListTopUps(query) {
        const { page = 1, limit = 10, status } = query;
        const skip = (page - 1) * limit;
        const where = {
            ...(status && { status }),
        };
        const [data, total] = await Promise.all([
            this.prisma.topUpRequest.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: { id: true, fullName: true, email: true, phone: true },
                    },
                },
            }),
            this.prisma.topUpRequest.count({ where }),
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
    async adminGetTopUp(topUpId) {
        const request = await this.prisma.topUpRequest.findUnique({
            where: { id: topUpId },
            include: {
                user: {
                    select: { id: true, fullName: true, email: true, phone: true },
                },
            },
        });
        if (!request) {
            throw new common_1.NotFoundException('Top-up request not found');
        }
        return request;
    }
    async adminApproveTopUp(adminId, topUpId, note) {
        const request = await this.prisma.topUpRequest.findUnique({
            where: { id: topUpId },
        });
        if (!request) {
            throw new common_1.NotFoundException('Top-up request not found');
        }
        if (request.status !== client_1.TopUpStatus.PENDING) {
            throw new common_1.BadRequestException(`Only pending requests can be approved (current: ${request.status})`);
        }
        const result = await this.prisma
            .$transaction(async (tx) => {
            const updated = await tx.topUpRequest.update({
                where: { id: topUpId },
                data: {
                    status: client_1.TopUpStatus.APPROVED,
                    reviewedAt: new Date(),
                    reviewedBy: adminId,
                },
            });
            await this.wallet.credit(tx, request.walletId, client_1.WalletTransactionType.TOP_UP, request.amount, {
                referenceType: 'TOP_UP',
                referenceId: topUpId,
                processingKey: `topup:${topUpId}`,
                description: `Top-up approved${note ? ` — ${note}` : ''}`,
            });
            await this.wallet.audit(tx, {
                walletId: request.walletId,
                actorAdminId: adminId,
                action: 'TOPUP_APPROVED',
                newValues: {
                    amount: request.amount.toString(),
                    topUpId,
                },
                referenceType: 'TOP_UP',
                referenceId: topUpId,
            });
            return updated;
        })
            .catch((err) => {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                err.code === 'P2002') {
                throw new common_1.ConflictException('Top-up has already been approved');
            }
            throw err;
        });
        void this.notifications.send({
            userId: request.userId,
            type: client_1.NotificationType.WALLET_TOPUP_APPROVED,
            title: 'Top-up approved ✅',
            message: `Rs. ${request.amount.toString()} has been added to your wallet.`,
            relatedEntityType: 'TOP_UP',
            relatedEntityId: topUpId,
        });
        await this.adminAudit.record({
            adminId,
            action: 'TOPUP_APPROVED',
            entityType: 'TOP_UP',
            entityId: topUpId,
            newValues: { userId: request.userId, amount: request.amount.toString() },
        });
        this.logger.log({
            message: 'Top-up approved',
            topUpId,
            userId: request.userId,
            amount: request.amount.toString(),
            reviewedBy: adminId,
        });
        return result;
    }
    async adminRejectTopUp(adminId, topUpId, reason) {
        const request = await this.prisma.topUpRequest.findUnique({
            where: { id: topUpId },
        });
        if (!request) {
            throw new common_1.NotFoundException('Top-up request not found');
        }
        if (request.status !== client_1.TopUpStatus.PENDING) {
            throw new common_1.BadRequestException(`Only pending requests can be rejected (current: ${request.status})`);
        }
        const updated = await this.prisma.topUpRequest.update({
            where: { id: topUpId },
            data: {
                status: client_1.TopUpStatus.REJECTED,
                reviewedAt: new Date(),
                reviewedBy: adminId,
                rejectionReason: reason,
            },
        });
        void this.notifications.send({
            userId: request.userId,
            type: client_1.NotificationType.WALLET_TOPUP_REJECTED,
            title: 'Top-up rejected ❌',
            message: `Your top-up request was rejected. Reason: ${reason}`,
            relatedEntityType: 'TOP_UP',
            relatedEntityId: topUpId,
        });
        await this.adminAudit.record({
            adminId,
            action: 'TOPUP_REJECTED',
            entityType: 'TOP_UP',
            entityId: topUpId,
            newValues: { userId: request.userId, reason },
        });
        this.logger.log({
            message: 'Top-up rejected',
            topUpId,
            userId: request.userId,
            reason,
            reviewedBy: adminId,
        });
        return updated;
    }
};
exports.TopUpsService = TopUpsService;
exports.TopUpsService = TopUpsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        file_upload_service_1.FileUploadService,
        notifications_service_1.NotificationsService,
        wallet_service_1.WalletService,
        nestjs_pino_1.Logger,
        admin_audit_service_1.AdminAuditService])
], TopUpsService);
//# sourceMappingURL=topups.service.js.map