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
exports.WalletService = exports.DEFAULT_MAX_WITHDRAWAL = exports.DEFAULT_MIN_WITHDRAWAL = exports.DEFAULT_COMMISSION_RATE = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_pino_1 = require("nestjs-pino");
const prisma_service_1 = require("../../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
const admin_audit_service_1 = require("../../common/services/admin-audit.service");
const client_1 = require("../../../generated/prisma/client");
exports.DEFAULT_COMMISSION_RATE = 0.075;
exports.DEFAULT_MIN_WITHDRAWAL = 500;
exports.DEFAULT_MAX_WITHDRAWAL = 100000;
let WalletService = class WalletService {
    prisma;
    config;
    logger;
    notifications;
    adminAudit;
    constructor(prisma, config, logger, notifications, adminAudit) {
        this.prisma = prisma;
        this.config = config;
        this.logger = logger;
        this.notifications = notifications;
        this.adminAudit = adminAudit;
    }
    get commissionRate() {
        const raw = this.config.get('COMMISSION_RATE');
        const parsed = raw === undefined ? exports.DEFAULT_COMMISSION_RATE : Number(raw);
        return Number.isFinite(parsed) && parsed >= 0 && parsed < 1
            ? parsed
            : exports.DEFAULT_COMMISSION_RATE;
    }
    get minWithdrawal() {
        const raw = this.config.get('WITHDRAWAL_MIN');
        const parsed = raw === undefined ? exports.DEFAULT_MIN_WITHDRAWAL : Number(raw);
        return new client_1.Prisma.Decimal(Number.isFinite(parsed) && parsed > 0 ? parsed : exports.DEFAULT_MIN_WITHDRAWAL);
    }
    get maxWithdrawal() {
        const raw = this.config.get('WITHDRAWAL_MAX');
        const parsed = raw === undefined ? exports.DEFAULT_MAX_WITHDRAWAL : Number(raw);
        return new client_1.Prisma.Decimal(Number.isFinite(parsed) && parsed > 0 ? parsed : exports.DEFAULT_MAX_WITHDRAWAL);
    }
    async ensureWallet(userId) {
        const existing = await this.prisma.wallet.findUnique({
            where: { userId },
        });
        if (existing)
            return existing;
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role === client_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Admins do not have wallets');
        }
        const type = user.role === client_1.UserRole.PROVIDER
            ? client_1.WalletType.PROVIDER
            : client_1.WalletType.CUSTOMER;
        return this.prisma.wallet.upsert({
            where: { userId },
            create: { userId, type },
            update: {},
        });
    }
    assertActive(wallet) {
        if (wallet.status !== client_1.WalletStatus.ACTIVE) {
            throw new common_1.ForbiddenException(`Wallet is ${wallet.status.toLowerCase()}. Wallet operations are blocked.`);
        }
    }
    async credit(tx, walletId, type, amount, extra = {}) {
        const amountDec = new client_1.Prisma.Decimal(amount).toDecimalPlaces(2, client_1.Prisma.Decimal.ROUND_HALF_UP);
        if (amountDec.lte(0)) {
            throw new common_1.BadRequestException('Credit amount must be positive');
        }
        const wallet = await tx.wallet.findUniqueOrThrow({
            where: { id: walletId },
        });
        this.assertActive(wallet);
        const before = wallet.balance;
        await tx.wallet.update({
            where: { id: walletId },
            data: {
                balance: { increment: amountDec },
                lifetimeCredits: { increment: amountDec },
            },
        });
        return tx.walletTransaction.create({
            data: {
                walletId,
                type,
                amount: amountDec,
                balanceBefore: before,
                balanceAfter: before.plus(amountDec),
                referenceType: extra.referenceType,
                referenceId: extra.referenceId,
                processingKey: extra.processingKey,
                description: extra.description,
                status: client_1.WalletTransactionStatus.COMPLETED,
            },
        });
    }
    async debit(tx, walletId, type, amount, extra = {}) {
        const amountDec = new client_1.Prisma.Decimal(amount).toDecimalPlaces(2, client_1.Prisma.Decimal.ROUND_HALF_UP);
        if (amountDec.lte(0)) {
            throw new common_1.BadRequestException('Debit amount must be positive');
        }
        const wallet = await tx.wallet.findUniqueOrThrow({
            where: { id: walletId },
        });
        this.assertActive(wallet);
        const before = wallet.balance;
        const result = await tx.wallet.updateMany({
            where: { id: walletId, balance: { gte: amountDec } },
            data: {
                balance: { decrement: amountDec },
                lifetimeDebits: { increment: amountDec },
            },
        });
        if (result.count !== 1) {
            throw new common_1.BadRequestException('Insufficient wallet balance');
        }
        return tx.walletTransaction.create({
            data: {
                walletId,
                type,
                amount: amountDec.negated(),
                balanceBefore: before,
                balanceAfter: before.minus(amountDec),
                referenceType: extra.referenceType,
                referenceId: extra.referenceId,
                processingKey: extra.processingKey,
                description: extra.description,
                status: client_1.WalletTransactionStatus.COMPLETED,
            },
        });
    }
    async hold(tx, walletId, amount, extra = {}) {
        const amountDec = new client_1.Prisma.Decimal(amount).toDecimalPlaces(2, client_1.Prisma.Decimal.ROUND_HALF_UP);
        const wallet = await tx.wallet.findUniqueOrThrow({
            where: { id: walletId },
        });
        this.assertActive(wallet);
        const before = wallet.balance;
        const result = await tx.wallet.updateMany({
            where: { id: walletId, balance: { gte: amountDec } },
            data: {
                balance: { decrement: amountDec },
                heldBalance: { increment: amountDec },
            },
        });
        if (result.count !== 1) {
            throw new common_1.BadRequestException('Insufficient available balance');
        }
        return tx.walletTransaction.create({
            data: {
                walletId,
                type: client_1.WalletTransactionType.WITHDRAWAL_REQUEST,
                amount: amountDec.negated(),
                balanceBefore: before,
                balanceAfter: before.minus(amountDec),
                referenceType: extra.referenceType,
                referenceId: extra.referenceId,
                processingKey: extra.processingKey,
                description: extra.description,
                status: client_1.WalletTransactionStatus.COMPLETED,
            },
        });
    }
    async releaseHeld(tx, walletId, amount, extra = {}) {
        const amountDec = new client_1.Prisma.Decimal(amount).toDecimalPlaces(2, client_1.Prisma.Decimal.ROUND_HALF_UP);
        const wallet = await tx.wallet.findUniqueOrThrow({
            where: { id: walletId },
        });
        this.assertActive(wallet);
        const before = wallet.balance;
        const result = await tx.wallet.updateMany({
            where: { id: walletId, heldBalance: { gte: amountDec } },
            data: {
                heldBalance: { decrement: amountDec },
                balance: { increment: amountDec },
            },
        });
        if (result.count !== 1) {
            throw new common_1.BadRequestException('Held balance is insufficient');
        }
        return tx.walletTransaction.create({
            data: {
                walletId,
                type: client_1.WalletTransactionType.WITHDRAWAL_REJECTED,
                amount: amountDec,
                balanceBefore: before,
                balanceAfter: before.plus(amountDec),
                referenceType: extra.referenceType,
                referenceId: extra.referenceId,
                processingKey: extra.processingKey,
                description: extra.description,
                status: client_1.WalletTransactionStatus.COMPLETED,
            },
        });
    }
    async settleHeld(tx, walletId, amount, extra = {}) {
        const amountDec = new client_1.Prisma.Decimal(amount).toDecimalPlaces(2, client_1.Prisma.Decimal.ROUND_HALF_UP);
        const wallet = await tx.wallet.findUniqueOrThrow({
            where: { id: walletId },
        });
        this.assertActive(wallet);
        const heldBefore = wallet.heldBalance;
        const result = await tx.wallet.updateMany({
            where: { id: walletId, heldBalance: { gte: amountDec } },
            data: {
                heldBalance: { decrement: amountDec },
                lifetimeDebits: { increment: amountDec },
            },
        });
        if (result.count !== 1) {
            throw new common_1.BadRequestException('Held balance is insufficient');
        }
        return tx.walletTransaction.create({
            data: {
                walletId,
                type: client_1.WalletTransactionType.WITHDRAWAL_COMPLETED,
                amount: amountDec.negated(),
                balanceBefore: heldBefore,
                balanceAfter: heldBefore.minus(amountDec),
                referenceType: extra.referenceType,
                referenceId: extra.referenceId,
                processingKey: extra.processingKey,
                description: extra.description,
                status: client_1.WalletTransactionStatus.COMPLETED,
            },
        });
    }
    async audit(tx, input) {
        await tx.walletAuditLog.create({
            data: {
                walletId: input.walletId,
                actorUserId: input.actorUserId ?? null,
                actorAdminId: input.actorAdminId ?? null,
                action: input.action,
                previousValues: input.previousValues ?? client_1.Prisma.JsonNull,
                newValues: input.newValues ?? client_1.Prisma.JsonNull,
                referenceType: input.referenceType ?? null,
                referenceId: input.referenceId ?? null,
            },
        });
    }
    async processJobPayment(bookingId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.status !== 'COMPLETED') {
            throw new common_1.BadRequestException(`Job payments can only be processed for completed bookings (current: ${booking.status})`);
        }
        const customerWallet = await this.ensureWallet(booking.customerId);
        const providerWallet = await this.ensureWallet(booking.providerId);
        const gross = booking.totalAmount;
        const rate = new client_1.Prisma.Decimal(this.commissionRate);
        const commission = gross
            .mul(rate)
            .toDecimalPlaces(2, client_1.Prisma.Decimal.ROUND_HALF_UP);
        const net = gross.minus(commission);
        const paymentKey = `job-payment:${booking.id}`;
        try {
            const result = await this.prisma.$transaction(async (tx) => {
                const existing = await tx.walletTransaction.findFirst({
                    where: { processingKey: `${paymentKey}:customer` },
                });
                if (existing) {
                    throw new common_1.ConflictException('This booking has already been paid');
                }
                const shortId = booking.id.slice(0, 8);
                await this.debit(tx, customerWallet.id, client_1.WalletTransactionType.JOB_PAYMENT, gross, {
                    referenceType: 'BOOKING',
                    referenceId: booking.id,
                    processingKey: `${paymentKey}:customer`,
                    description: `Payment for booking #${shortId}`,
                });
                await this.credit(tx, providerWallet.id, client_1.WalletTransactionType.PROVIDER_EARNING, gross, {
                    referenceType: 'BOOKING',
                    referenceId: booking.id,
                    processingKey: `${paymentKey}:provider`,
                    description: `Earnings for booking #${shortId}`,
                });
                await this.debit(tx, providerWallet.id, client_1.WalletTransactionType.PLATFORM_COMMISSION, commission, {
                    referenceType: 'BOOKING',
                    referenceId: booking.id,
                    processingKey: `${paymentKey}:commission`,
                    description: `Platform commission (${this.commissionRate * 100}%) for booking #${shortId}`,
                });
                await this.audit(tx, {
                    walletId: customerWallet.id,
                    actorUserId: booking.customerId,
                    action: 'JOB_PAYMENT_DEBIT',
                    newValues: {
                        bookingId,
                        amount: gross.toString(),
                        type: 'JOB_PAYMENT',
                    },
                    referenceType: 'BOOKING',
                    referenceId: booking.id,
                });
                await this.audit(tx, {
                    walletId: providerWallet.id,
                    action: 'JOB_PAYMENT_CREDIT',
                    newValues: {
                        bookingId,
                        gross: gross.toString(),
                        commission: commission.toString(),
                        net: net.toString(),
                    },
                    referenceType: 'BOOKING',
                    referenceId: booking.id,
                });
                const [cAfter, pAfter] = await Promise.all([
                    tx.wallet.findUniqueOrThrow({ where: { id: customerWallet.id } }),
                    tx.wallet.findUniqueOrThrow({ where: { id: providerWallet.id } }),
                ]);
                return {
                    bookingId,
                    gross,
                    commission,
                    net,
                    customerBalanceAfter: cAfter.balance,
                    providerBalanceAfter: pAfter.balance,
                };
            });
            void this.notifications.send({
                userId: booking.customerId,
                type: client_1.NotificationType.JOB_PAYMENT_COMPLETED,
                title: 'Payment processed 💳',
                message: `Rs. ${gross.toString()} was charged for your booking.`,
                relatedEntityType: 'BOOKING',
                relatedEntityId: bookingId,
            });
            void this.notifications.send({
                userId: booking.providerId,
                type: client_1.NotificationType.JOB_PAYMENT_COMPLETED,
                title: 'Payment received 💰',
                message: `You earned Rs. ${net.toString()} for booking #${booking.id.slice(0, 8)} (after commission).`,
                relatedEntityType: 'BOOKING',
                relatedEntityId: bookingId,
            });
            this.logger.log({
                message: 'Job payment processed',
                bookingId,
                gross: gross.toString(),
                commission: commission.toString(),
                net: net.toString(),
            });
            return result;
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                err.code === 'P2002') {
                throw new common_1.ConflictException('This booking has already been paid');
            }
            throw err;
        }
    }
    async creditRefund(userId, amount, extra = {}) {
        const wallet = await this.ensureWallet(userId);
        const tx = await this.prisma.$transaction(async (t) => {
            const row = await this.credit(t, wallet.id, client_1.WalletTransactionType.REFUND, amount, extra);
            await this.audit(t, {
                walletId: wallet.id,
                actorUserId: userId,
                action: 'REFUND_CREDIT',
                newValues: { amount: row.amount.toString() },
                referenceType: extra.referenceType,
                referenceId: extra.referenceId,
            });
            return row;
        });
        void this.notifications.send({
            userId,
            type: client_1.NotificationType.REFUND_RECEIVED,
            title: 'Refund received 💸',
            message: `Rs. ${new client_1.Prisma.Decimal(amount).toString()} was credited to your wallet.`,
            relatedEntityType: extra.referenceType,
            relatedEntityId: extra.referenceId,
        });
        return tx;
    }
    async deductProvider(providerId, amount, extra = {}) {
        const wallet = await this.ensureWallet(providerId);
        const tx = await this.prisma.$transaction(async (t) => {
            const row = await this.debit(t, wallet.id, client_1.WalletTransactionType.REFUND, amount, extra);
            await this.audit(t, {
                walletId: wallet.id,
                actorUserId: providerId,
                action: 'REFUND_DEBIT',
                newValues: { amount: row.amount.toString() },
                referenceType: extra.referenceType,
                referenceId: extra.referenceId,
            });
            return row;
        });
        void this.notifications.send({
            userId: providerId,
            type: client_1.NotificationType.WALLET_UPDATED,
            title: 'Refund deducted 💸',
            message: `Rs. ${new client_1.Prisma.Decimal(amount).toString()} was deducted from your wallet for a refund.`,
            relatedEntityType: extra.referenceType,
            relatedEntityId: extra.referenceId,
        });
        return tx;
    }
    async processDisputeRefund(params) {
        const amountDec = new client_1.Prisma.Decimal(params.amount).toDecimalPlaces(2, client_1.Prisma.Decimal.ROUND_HALF_UP);
        const customerWallet = await this.ensureWallet(params.customerId);
        const providerWallet = await this.ensureWallet(params.providerId);
        try {
            const result = await this.prisma.$transaction(async (tx) => {
                const existing = await tx.walletTransaction.findFirst({
                    where: { processingKey: `refund:${params.disputeId}:customer` },
                });
                if (existing) {
                    return {
                        alreadyProcessed: true,
                        refundAmount: existing.amount,
                        resolution: params.resolution,
                    };
                }
                await this.credit(tx, customerWallet.id, client_1.WalletTransactionType.REFUND, amountDec, {
                    referenceType: 'DISPUTE',
                    referenceId: params.disputeId,
                    processingKey: `refund:${params.disputeId}:customer`,
                    description: `Refund (${params.resolution}) for booking #${params.bookingId.slice(0, 8)}`,
                });
                await this.debit(tx, providerWallet.id, client_1.WalletTransactionType.REFUND, amountDec, {
                    referenceType: 'DISPUTE',
                    referenceId: params.disputeId,
                    processingKey: `refund:${params.disputeId}:provider`,
                    description: `Provider deduction (${params.resolution}) for booking #${params.bookingId.slice(0, 8)}`,
                });
                await this.audit(tx, {
                    walletId: customerWallet.id,
                    actorAdminId: params.adminId,
                    action: 'DISPUTE_REFUND_CUSTOMER_CREDIT',
                    newValues: {
                        amount: amountDec.toString(),
                        resolution: params.resolution,
                    },
                    referenceType: 'DISPUTE',
                    referenceId: params.disputeId,
                });
                await this.audit(tx, {
                    walletId: providerWallet.id,
                    actorAdminId: params.adminId,
                    action: 'DISPUTE_REFUND_PROVIDER_DEBIT',
                    newValues: {
                        amount: amountDec.toString(),
                        resolution: params.resolution,
                    },
                    referenceType: 'DISPUTE',
                    referenceId: params.disputeId,
                });
                return {
                    alreadyProcessed: false,
                    refundAmount: amountDec,
                    resolution: params.resolution,
                };
            });
            if (!result.alreadyProcessed) {
                void this.notifications.send({
                    userId: params.customerId,
                    type: client_1.NotificationType.REFUND_RECEIVED,
                    title: 'Refund received 💸',
                    message: `Rs. ${amountDec.toString()} was refunded to your wallet after dispute resolution.`,
                    relatedEntityType: 'DISPUTE',
                    relatedEntityId: params.disputeId,
                });
                void this.notifications.send({
                    userId: params.providerId,
                    type: client_1.NotificationType.WALLET_UPDATED,
                    title: 'Refund deducted 💸',
                    message: `Rs. ${amountDec.toString()} was deducted from your wallet for a refund on booking #${params.bookingId.slice(0, 8)}.`,
                    relatedEntityType: 'DISPUTE',
                    relatedEntityId: params.disputeId,
                });
            }
            this.logger.log({
                message: 'Dispute refund processed',
                disputeId: params.disputeId,
                bookingId: params.bookingId,
                amount: amountDec.toString(),
                resolution: params.resolution,
                alreadyProcessed: result.alreadyProcessed,
            });
            return result;
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                err.code === 'P2002') {
                return {
                    alreadyProcessed: true,
                    refundAmount: amountDec,
                    resolution: params.resolution,
                };
            }
            throw err;
        }
    }
    async adjustWallet(adminId, userId, dto) {
        const wallet = await this.ensureWallet(userId);
        const result = await this.prisma.$transaction(async (tx) => {
            const ledger = dto.direction === 'credit'
                ? await this.credit(tx, wallet.id, client_1.WalletTransactionType.ADJUSTMENT, dto.amount, { description: `Admin adjustment: ${dto.reason}` })
                : await this.debit(tx, wallet.id, client_1.WalletTransactionType.ADJUSTMENT, dto.amount, { description: `Admin adjustment: ${dto.reason}` });
            await this.audit(tx, {
                walletId: wallet.id,
                actorAdminId: adminId,
                action: `ADJUSTMENT_${dto.direction.toUpperCase()}`,
                newValues: { amount: ledger.amount.toString(), reason: dto.reason },
            });
            return ledger;
        });
        void this.notifications.send({
            userId,
            type: client_1.NotificationType.WALLET_UPDATED,
            title: 'Wallet updated 💰',
            message: `Your wallet was ${dto.direction === 'credit' ? 'credited' : 'debited'} Rs. ${dto.amount}. ${dto.reason}`,
            relatedEntityType: 'WALLET',
            relatedEntityId: wallet.id,
            force: true,
        });
        await this.adminAudit.record({
            adminId,
            action: 'WALLET_ADJUSTED',
            entityType: 'WALLET',
            entityId: wallet.id,
            newValues: {
                userId,
                direction: dto.direction,
                amount: dto.amount,
                reason: dto.reason,
            },
        });
        this.logger.log({
            message: 'Wallet adjusted by admin',
            adminId,
            userId,
            direction: dto.direction,
            amount: dto.amount,
        });
        return result;
    }
    async freezeWallet(adminId, userId, reason) {
        const wallet = await this.prisma.wallet.findUnique({
            where: { userId },
        });
        if (!wallet) {
            throw new common_1.NotFoundException('Wallet not found for this user');
        }
        if (wallet.status === client_1.WalletStatus.FROZEN) {
            throw new common_1.BadRequestException('Wallet is already frozen');
        }
        const updated = await this.prisma.$transaction(async (tx) => {
            const updatedWallet = await tx.wallet.update({
                where: { id: wallet.id },
                data: { status: client_1.WalletStatus.FROZEN },
            });
            await this.audit(tx, {
                walletId: wallet.id,
                actorAdminId: adminId,
                action: 'WALLET_FROZEN',
                previousValues: { status: wallet.status },
                newValues: { status: client_1.WalletStatus.FROZEN, reason },
            });
            return updatedWallet;
        });
        await this.adminAudit.record({
            adminId,
            action: 'WALLET_FROZEN',
            entityType: 'WALLET',
            entityId: wallet.id,
            newValues: { userId, reason },
        });
        void this.notifications.send({
            userId,
            type: client_1.NotificationType.WALLET_UPDATED,
            title: 'Wallet frozen 🔒',
            message: `Your wallet has been frozen. Reason: ${reason}`,
            relatedEntityType: 'WALLET',
            relatedEntityId: wallet.id,
            force: true,
        });
        this.logger.log({
            message: 'Wallet frozen by admin',
            adminId,
            userId,
            reason,
        });
        return updated;
    }
    async unfreezeWallet(adminId, userId, reason) {
        const wallet = await this.prisma.wallet.findUnique({
            where: { userId },
        });
        if (!wallet) {
            throw new common_1.NotFoundException('Wallet not found for this user');
        }
        if (wallet.status === client_1.WalletStatus.ACTIVE) {
            throw new common_1.BadRequestException('Wallet is already active');
        }
        const updated = await this.prisma.$transaction(async (tx) => {
            const updatedWallet = await tx.wallet.update({
                where: { id: wallet.id },
                data: { status: client_1.WalletStatus.ACTIVE },
            });
            await this.audit(tx, {
                walletId: wallet.id,
                actorAdminId: adminId,
                action: 'WALLET_UNFROZEN',
                previousValues: { status: wallet.status },
                newValues: { status: client_1.WalletStatus.ACTIVE, reason: reason ?? null },
            });
            return updatedWallet;
        });
        await this.adminAudit.record({
            adminId,
            action: 'WALLET_UNFROZEN',
            entityType: 'WALLET',
            entityId: wallet.id,
            newValues: { userId, reason: reason ?? null },
        });
        void this.notifications.send({
            userId,
            type: client_1.NotificationType.WALLET_UPDATED,
            title: 'Wallet unfrozen 🔓',
            message: 'Your wallet has been unfrozen.',
            relatedEntityType: 'WALLET',
            relatedEntityId: wallet.id,
            force: true,
        });
        this.logger.log({ message: 'Wallet unfrozen by admin', adminId, userId });
        return updated;
    }
    async getWalletSummary(userId) {
        const wallet = await this.ensureWallet(userId);
        const [topUps, withdrawals, pendingWithdrawals] = await Promise.all([
            this.prisma.walletTransaction.aggregate({
                where: { walletId: wallet.id, type: client_1.WalletTransactionType.TOP_UP },
                _sum: { amount: true },
            }),
            this.prisma.walletTransaction.aggregate({
                where: {
                    walletId: wallet.id,
                    type: client_1.WalletTransactionType.WITHDRAWAL_COMPLETED,
                },
                _sum: { amount: true },
            }),
            this.prisma.withdrawalRequest.aggregate({
                where: {
                    walletId: wallet.id,
                    status: { in: ['PENDING', 'APPROVED', 'PROCESSING'] },
                },
                _sum: { amount: true },
            }),
        ]);
        return {
            walletId: wallet.id,
            walletStatus: wallet.status,
            balance: wallet.balance,
            heldBalance: wallet.heldBalance,
            lifetimeCredits: wallet.lifetimeCredits,
            lifetimeDebits: wallet.lifetimeDebits,
            totalTopUps: topUps._sum.amount ?? new client_1.Prisma.Decimal(0),
            totalWithdrawals: (withdrawals._sum.amount ?? new client_1.Prisma.Decimal(0)).abs(),
            pendingWithdrawals: pendingWithdrawals._sum.amount ?? new client_1.Prisma.Decimal(0),
        };
    }
    async getEarningsSummary(providerId) {
        const wallet = await this.ensureWallet(providerId);
        const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const [lifetimeEarnings, commissionPaid, monthlyEarnings, withdrawals, pendingWithdrawals, completedJobs,] = await Promise.all([
            this.prisma.walletTransaction.aggregate({
                where: {
                    walletId: wallet.id,
                    type: client_1.WalletTransactionType.PROVIDER_EARNING,
                },
                _sum: { amount: true },
            }),
            this.prisma.walletTransaction.aggregate({
                where: {
                    walletId: wallet.id,
                    type: client_1.WalletTransactionType.PLATFORM_COMMISSION,
                },
                _sum: { amount: true },
            }),
            this.prisma.walletTransaction.aggregate({
                where: {
                    walletId: wallet.id,
                    type: client_1.WalletTransactionType.PROVIDER_EARNING,
                    createdAt: { gte: monthStart },
                },
                _sum: { amount: true },
            }),
            this.prisma.walletTransaction.aggregate({
                where: {
                    walletId: wallet.id,
                    type: client_1.WalletTransactionType.WITHDRAWAL_COMPLETED,
                },
                _sum: { amount: true },
            }),
            this.prisma.withdrawalRequest.aggregate({
                where: {
                    walletId: wallet.id,
                    status: { in: ['PENDING', 'APPROVED', 'PROCESSING'] },
                },
                _sum: { amount: true },
            }),
            this.prisma.booking.count({
                where: { providerId, status: 'COMPLETED' },
            }),
        ]);
        return {
            availableBalance: wallet.balance,
            heldBalance: wallet.heldBalance,
            lifetimeEarnings: lifetimeEarnings._sum.amount ?? new client_1.Prisma.Decimal(0),
            lifetimeWithdrawals: (withdrawals._sum.amount ?? new client_1.Prisma.Decimal(0)).abs(),
            pendingWithdrawals: pendingWithdrawals._sum.amount ?? new client_1.Prisma.Decimal(0),
            platformCommissionPaid: (commissionPaid._sum.amount ?? new client_1.Prisma.Decimal(0)).abs(),
            monthlyEarnings: monthlyEarnings._sum.amount ?? new client_1.Prisma.Decimal(0),
            totalCompletedJobs: completedJobs,
        };
    }
    async listTransactions(userId, query) {
        const wallet = await this.ensureWallet(userId);
        return this.queryTransactions({ walletId: wallet.id }, query);
    }
    async getTransaction(userId, transactionId) {
        const wallet = await this.ensureWallet(userId);
        const transaction = await this.prisma.walletTransaction.findFirst({
            where: { id: transactionId, walletId: wallet.id },
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        return transaction;
    }
    async adminListWallets(query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;
        const where = {
            ...(query.type && { type: query.type }),
            ...(query.status && { status: query.status }),
        };
        const [data, total] = await Promise.all([
            this.prisma.wallet.findMany({
                where,
                skip,
                take: limit,
                orderBy: { updatedAt: 'desc' },
                include: {
                    user: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true,
                            phone: true,
                            role: true,
                        },
                    },
                },
            }),
            this.prisma.wallet.count({ where }),
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
    async adminListTransactions(query) {
        return this.queryTransactions({}, query);
    }
    async adminGetWalletByUserId(userId) {
        const wallet = await this.prisma.wallet.findUnique({
            where: { userId },
            include: {
                user: { select: { id: true, fullName: true, email: true, role: true } },
            },
        });
        if (!wallet) {
            throw new common_1.NotFoundException('Wallet not found for this user');
        }
        return wallet;
    }
    async queryTransactions(baseWhere, query) {
        const { page = 1, limit = 10, type, status, dateFrom, dateTo } = query;
        const skip = (page - 1) * limit;
        const where = {
            ...baseWhere,
            ...(type && { type }),
            ...(status && { status }),
            ...(dateFrom || dateTo
                ? {
                    createdAt: {
                        ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
                        ...(dateTo
                            ? { lte: new Date(new Date(dateTo).setHours(23, 59, 59, 999)) }
                            : {}),
                    },
                }
                : {}),
        };
        const [data, total] = await Promise.all([
            this.prisma.walletTransaction.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.walletTransaction.count({ where }),
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
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        nestjs_pino_1.Logger,
        notifications_service_1.NotificationsService,
        admin_audit_service_1.AdminAuditService])
], WalletService);
//# sourceMappingURL=wallet.service.js.map