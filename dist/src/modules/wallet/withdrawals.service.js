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
exports.WithdrawalsService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const prisma_service_1 = require("../../prisma/prisma.service");
const admin_audit_service_1 = require("../../common/services/admin-audit.service");
const notifications_service_1 = require("../notifications/notifications.service");
const wallet_service_1 = require("./wallet.service");
const client_1 = require("../../../generated/prisma/client");
const ACTIVE_STATUSES = [
    client_1.WithdrawalStatus.PENDING,
    client_1.WithdrawalStatus.APPROVED,
    client_1.WithdrawalStatus.PROCESSING,
];
let WithdrawalsService = class WithdrawalsService {
    prisma;
    notifications;
    wallet;
    logger;
    adminAudit;
    constructor(prisma, notifications, wallet, logger, adminAudit) {
        this.prisma = prisma;
        this.notifications = notifications;
        this.wallet = wallet;
        this.logger = logger;
        this.adminAudit = adminAudit;
    }
    async submitWithdrawal(providerId, dto) {
        const wallet = await this.wallet.ensureWallet(providerId);
        const amount = new client_1.Prisma.Decimal(dto.amount).toDecimalPlaces(2, client_1.Prisma.Decimal.ROUND_HALF_UP);
        if (amount.lt(this.wallet.minWithdrawal)) {
            throw new common_1.BadRequestException(`Minimum withdrawal amount is Rs. ${this.wallet.minWithdrawal.toString()}`);
        }
        if (amount.gt(this.wallet.maxWithdrawal)) {
            throw new common_1.BadRequestException(`Maximum withdrawal amount is Rs. ${this.wallet.maxWithdrawal.toString()}`);
        }
        const result = await this.prisma
            .$transaction(async (tx) => {
            const active = await tx.withdrawalRequest.findFirst({
                where: { providerId, status: { in: ACTIVE_STATUSES } },
            });
            if (active) {
                throw new common_1.ConflictException('You already have an active withdrawal request. Wait for it to be processed.');
            }
            const created = await tx.withdrawalRequest.create({
                data: {
                    providerId,
                    walletId: wallet.id,
                    amount,
                    paymentMethod: dto.paymentMethod,
                    accountName: dto.accountName,
                    accountNumber: dto.accountNumber,
                    bankName: dto.bankName,
                    status: client_1.WithdrawalStatus.PENDING,
                },
            });
            await this.wallet.hold(tx, wallet.id, amount, {
                referenceType: 'WITHDRAWAL',
                referenceId: created.id,
                processingKey: `withdrawal:${created.id}`,
                description: `Withdrawal request for ${dto.paymentMethod}`,
            });
            await this.wallet.audit(tx, {
                walletId: wallet.id,
                actorUserId: providerId,
                action: 'WITHDRAWAL_SUBMITTED',
                newValues: {
                    amount: amount.toString(),
                    paymentMethod: dto.paymentMethod,
                    withdrawalId: created.id,
                },
                referenceType: 'WITHDRAWAL',
                referenceId: created.id,
            });
            return created;
        })
            .catch((err) => {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                err.code === 'P2002') {
                throw new common_1.ConflictException('You already have an active withdrawal request. Wait for it to be processed.');
            }
            throw err;
        });
        this.logger.log({
            eventType: 'ADMIN_WITHDRAWAL_SUBMITTED',
            withdrawalId: result.id,
            providerId,
            amount: amount.toString(),
        });
        void this.notifications.send({
            userId: providerId,
            type: client_1.NotificationType.WITHDRAWAL_REQUEST_SUBMITTED,
            title: 'Withdrawal requested 💸',
            message: `Your withdrawal request of Rs. ${amount.toString()} is pending. Funds are held until approval.`,
            relatedEntityType: 'WITHDRAWAL',
            relatedEntityId: result.id,
        });
        return result;
    }
    async listMyWithdrawals(providerId, query) {
        const { page = 1, limit = 10, status } = query;
        const skip = (page - 1) * limit;
        const where = {
            providerId,
            ...(status && { status }),
        };
        const [data, total] = await Promise.all([
            this.prisma.withdrawalRequest.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.withdrawalRequest.count({ where }),
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
    async getMyWithdrawal(providerId, withdrawalId) {
        const withdrawal = await this.prisma.withdrawalRequest.findFirst({
            where: { id: withdrawalId, providerId },
        });
        if (!withdrawal) {
            throw new common_1.NotFoundException('Withdrawal request not found');
        }
        return withdrawal;
    }
    async cancelWithdrawal(providerId, withdrawalId) {
        const withdrawal = await this.prisma.withdrawalRequest.findFirst({
            where: { id: withdrawalId, providerId },
        });
        if (!withdrawal) {
            throw new common_1.NotFoundException('Withdrawal request not found');
        }
        if (withdrawal.status !== client_1.WithdrawalStatus.PENDING) {
            throw new common_1.BadRequestException(`Only pending requests can be cancelled (current: ${withdrawal.status})`);
        }
        const result = await this.prisma
            .$transaction(async (tx) => {
            const updated = await tx.withdrawalRequest.update({
                where: { id: withdrawalId },
                data: { status: client_1.WithdrawalStatus.CANCELLED },
            });
            await this.wallet.releaseHeld(tx, withdrawal.walletId, withdrawal.amount, {
                referenceType: 'WITHDRAWAL',
                referenceId: withdrawalId,
                processingKey: `withdrawal-cancel:${withdrawalId}`,
                description: 'Withdrawal cancelled by provider — funds released',
            });
            await this.wallet.audit(tx, {
                walletId: withdrawal.walletId,
                actorUserId: providerId,
                action: 'WITHDRAWAL_CANCELLED',
                newValues: { amount: withdrawal.amount.toString(), withdrawalId },
                referenceType: 'WITHDRAWAL',
                referenceId: withdrawalId,
            });
            return updated;
        })
            .catch((err) => {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                err.code === 'P2002') {
                throw new common_1.ConflictException('Withdrawal has already been cancelled');
            }
            throw err;
        });
        void this.notifications.send({
            userId: providerId,
            type: client_1.NotificationType.WITHDRAWAL_CANCELLED,
            title: 'Withdrawal cancelled ↩️',
            message: `Your withdrawal of Rs. ${withdrawal.amount.toString()} was cancelled and funds returned to your available balance.`,
            relatedEntityType: 'WITHDRAWAL',
            relatedEntityId: withdrawalId,
        });
        this.logger.log({
            message: 'Withdrawal cancelled by provider',
            withdrawalId,
            providerId,
        });
        return result;
    }
    async adminListWithdrawals(query) {
        const { page = 1, limit = 10, status, search } = query;
        const skip = (page - 1) * limit;
        const where = {
            ...(status && { status }),
            ...(search
                ? {
                    OR: [
                        {
                            provider: {
                                fullName: { contains: search, mode: 'insensitive' },
                            },
                        },
                        { accountName: { contains: search, mode: 'insensitive' } },
                        { accountNumber: { contains: search, mode: 'insensitive' } },
                    ],
                }
                : {}),
        };
        const [data, total] = await Promise.all([
            this.prisma.withdrawalRequest.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    provider: {
                        select: { id: true, fullName: true, email: true, phone: true },
                    },
                },
            }),
            this.prisma.withdrawalRequest.count({ where }),
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
    async adminGetWithdrawal(withdrawalId) {
        const withdrawal = await this.prisma.withdrawalRequest.findUnique({
            where: { id: withdrawalId },
            include: {
                provider: {
                    select: { id: true, fullName: true, email: true, phone: true },
                },
            },
        });
        if (!withdrawal) {
            throw new common_1.NotFoundException('Withdrawal request not found');
        }
        return withdrawal;
    }
    async assertExistsAndActive(withdrawalId) {
        const withdrawal = await this.prisma.withdrawalRequest.findUnique({
            where: { id: withdrawalId },
        });
        if (!withdrawal) {
            throw new common_1.NotFoundException('Withdrawal request not found');
        }
        if (!ACTIVE_STATUSES.includes(withdrawal.status)) {
            throw new common_1.BadRequestException(`Withdrawal is ${withdrawal.status.toLowerCase()} and cannot transition`);
        }
        return withdrawal;
    }
    async adminApproveWithdrawal(adminId, withdrawalId, note) {
        const withdrawal = await this.assertExistsAndActive(withdrawalId);
        if (withdrawal.status !== client_1.WithdrawalStatus.PENDING) {
            throw new common_1.BadRequestException(`Only pending withdrawals can be approved (current: ${withdrawal.status})`);
        }
        const updated = await this.prisma.withdrawalRequest.update({
            where: { id: withdrawalId },
            data: {
                status: client_1.WithdrawalStatus.APPROVED,
                processedBy: adminId,
                notes: note ?? withdrawal.notes,
            },
        });
        await this.prisma.walletAuditLog.create({
            data: {
                walletId: withdrawal.walletId,
                actorAdminId: adminId,
                action: 'WITHDRAWAL_APPROVED',
                newValues: { withdrawalId, amount: withdrawal.amount.toString() },
                referenceType: 'WITHDRAWAL',
                referenceId: withdrawalId,
            },
        });
        void this.notifications.send({
            userId: withdrawal.providerId,
            type: client_1.NotificationType.WITHDRAWAL_APPROVED,
            title: 'Withdrawal approved ✅',
            message: `Your withdrawal of Rs. ${withdrawal.amount.toString()} was approved and is being processed.`,
            relatedEntityType: 'WITHDRAWAL',
            relatedEntityId: withdrawalId,
        });
        await this.adminAudit.record({
            adminId,
            action: 'WITHDRAWAL_APPROVED',
            entityType: 'WITHDRAWAL',
            entityId: withdrawalId,
            newValues: {
                providerId: withdrawal.providerId,
                amount: withdrawal.amount.toString(),
            },
        });
        return updated;
    }
    async adminMarkProcessing(adminId, withdrawalId, note) {
        const withdrawal = await this.assertExistsAndActive(withdrawalId);
        if (withdrawal.status !== client_1.WithdrawalStatus.APPROVED) {
            throw new common_1.BadRequestException(`Only approved withdrawals can be marked processing (current: ${withdrawal.status})`);
        }
        const updated = await this.prisma.withdrawalRequest.update({
            where: { id: withdrawalId },
            data: {
                status: client_1.WithdrawalStatus.PROCESSING,
                processedAt: new Date(),
                processedBy: adminId,
                notes: note ?? withdrawal.notes,
            },
        });
        void this.notifications.send({
            userId: withdrawal.providerId,
            type: client_1.NotificationType.WITHDRAWAL_PROCESSING,
            title: 'Withdrawal in progress ⏳',
            message: `Your withdrawal of Rs. ${withdrawal.amount.toString()} is being processed.`,
            relatedEntityType: 'WITHDRAWAL',
            relatedEntityId: withdrawalId,
        });
        await this.adminAudit.record({
            adminId,
            action: 'WITHDRAWAL_PROCESSING',
            entityType: 'WITHDRAWAL',
            entityId: withdrawalId,
            newValues: {
                providerId: withdrawal.providerId,
                amount: withdrawal.amount.toString(),
            },
        });
        return updated;
    }
    async adminCompleteWithdrawal(adminId, withdrawalId, note) {
        const withdrawal = await this.assertExistsAndActive(withdrawalId);
        if (withdrawal.status !== client_1.WithdrawalStatus.PROCESSING) {
            throw new common_1.BadRequestException(`Only processing withdrawals can be completed (current: ${withdrawal.status})`);
        }
        const result = await this.prisma
            .$transaction(async (tx) => {
            const updated = await tx.withdrawalRequest.update({
                where: { id: withdrawalId },
                data: {
                    status: client_1.WithdrawalStatus.COMPLETED,
                    processedAt: new Date(),
                    processedBy: adminId,
                    notes: note ?? withdrawal.notes,
                },
            });
            await this.wallet.settleHeld(tx, withdrawal.walletId, withdrawal.amount, {
                referenceType: 'WITHDRAWAL',
                referenceId: withdrawalId,
                processingKey: `withdrawal-complete:${withdrawalId}`,
                description: 'Withdrawal paid out',
            });
            await this.wallet.audit(tx, {
                walletId: withdrawal.walletId,
                actorAdminId: adminId,
                action: 'WITHDRAWAL_COMPLETED',
                newValues: { amount: withdrawal.amount.toString(), withdrawalId },
                referenceType: 'WITHDRAWAL',
                referenceId: withdrawalId,
            });
            return updated;
        })
            .catch((err) => {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                err.code === 'P2002') {
                throw new common_1.ConflictException('Withdrawal has already been completed');
            }
            throw err;
        });
        void this.notifications.send({
            userId: withdrawal.providerId,
            type: client_1.NotificationType.WITHDRAWAL_COMPLETED,
            title: 'Withdrawal completed 🎉',
            message: `Your withdrawal of Rs. ${withdrawal.amount.toString()} has been paid out.`,
            relatedEntityType: 'WITHDRAWAL',
            relatedEntityId: withdrawalId,
        });
        await this.adminAudit.record({
            adminId,
            action: 'WITHDRAWAL_COMPLETED',
            entityType: 'WITHDRAWAL',
            entityId: withdrawalId,
            newValues: {
                providerId: withdrawal.providerId,
                amount: withdrawal.amount.toString(),
            },
        });
        this.logger.log({
            message: 'Withdrawal completed',
            withdrawalId,
            providerId: withdrawal.providerId,
            amount: withdrawal.amount.toString(),
            processedBy: adminId,
        });
        return result;
    }
    async adminRejectWithdrawal(adminId, withdrawalId, reason) {
        const withdrawal = await this.assertExistsAndActive(withdrawalId);
        const result = await this.prisma
            .$transaction(async (tx) => {
            const updated = await tx.withdrawalRequest.update({
                where: { id: withdrawalId },
                data: {
                    status: client_1.WithdrawalStatus.REJECTED,
                    processedAt: new Date(),
                    processedBy: adminId,
                    notes: reason,
                },
            });
            await this.wallet.releaseHeld(tx, withdrawal.walletId, withdrawal.amount, {
                referenceType: 'WITHDRAWAL',
                referenceId: withdrawalId,
                processingKey: `withdrawal-reject:${withdrawalId}`,
                description: `Withdrawal rejected — funds released. Reason: ${reason}`,
            });
            await this.wallet.audit(tx, {
                walletId: withdrawal.walletId,
                actorAdminId: adminId,
                action: 'WITHDRAWAL_REJECTED',
                newValues: {
                    amount: withdrawal.amount.toString(),
                    withdrawalId,
                    reason,
                },
                referenceType: 'WITHDRAWAL',
                referenceId: withdrawalId,
            });
            return updated;
        })
            .catch((err) => {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                err.code === 'P2002') {
                throw new common_1.ConflictException('Withdrawal has already been rejected');
            }
            throw err;
        });
        void this.notifications.send({
            userId: withdrawal.providerId,
            type: client_1.NotificationType.WITHDRAWAL_REJECTED,
            title: 'Withdrawal rejected ❌',
            message: `Your withdrawal of Rs. ${withdrawal.amount.toString()} was rejected. Reason: ${reason}. Funds returned to your available balance.`,
            relatedEntityType: 'WITHDRAWAL',
            relatedEntityId: withdrawalId,
        });
        await this.adminAudit.record({
            adminId,
            action: 'WITHDRAWAL_REJECTED',
            entityType: 'WITHDRAWAL',
            entityId: withdrawalId,
            newValues: {
                providerId: withdrawal.providerId,
                amount: withdrawal.amount.toString(),
                reason,
            },
        });
        this.logger.log({
            message: 'Withdrawal rejected',
            withdrawalId,
            providerId: withdrawal.providerId,
            reason,
            processedBy: adminId,
        });
        return result;
    }
};
exports.WithdrawalsService = WithdrawalsService;
exports.WithdrawalsService = WithdrawalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService,
        wallet_service_1.WalletService,
        nestjs_pino_1.Logger,
        admin_audit_service_1.AdminAuditService])
], WithdrawalsService);
//# sourceMappingURL=withdrawals.service.js.map