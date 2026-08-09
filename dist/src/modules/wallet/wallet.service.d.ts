import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { AdminAuditService } from 'src/common/services/admin-audit.service';
import { WalletTransactionQueryDto } from './dtos/wallet-transaction-query.dto';
import { Prisma, UserRole, Wallet, WalletType, WalletStatus, WalletTransactionType, WalletTransactionStatus, DisputeResolution } from 'generated/prisma/client';
export declare const DEFAULT_COMMISSION_RATE = 0.075;
export declare const DEFAULT_MIN_WITHDRAWAL = 500;
export declare const DEFAULT_MAX_WITHDRAWAL = 100000;
type Tx = Prisma.TransactionClient;
export interface LedgerExtra {
    referenceType?: string;
    referenceId?: string;
    processingKey?: string;
    description?: string;
}
export interface AuditInput {
    walletId: string;
    actorUserId?: string | null;
    actorAdminId?: string | null;
    action: string;
    previousValues?: Prisma.InputJsonValue;
    newValues?: Prisma.InputJsonValue;
    referenceType?: string | null;
    referenceId?: string | null;
}
export declare class WalletService {
    private readonly prisma;
    private readonly config;
    private readonly logger;
    private readonly notifications;
    private readonly adminAudit;
    constructor(prisma: PrismaService, config: ConfigService, logger: Logger, notifications: NotificationsService, adminAudit: AdminAuditService);
    get commissionRate(): number;
    get minWithdrawal(): Prisma.Decimal;
    get maxWithdrawal(): Prisma.Decimal;
    ensureWallet(userId: string): Promise<Wallet>;
    private assertActive;
    credit(tx: Tx, walletId: string, type: WalletTransactionType, amount: Prisma.Decimal | number | string, extra?: LedgerExtra): Promise<{
        id: string;
        createdAt: Date;
        status: WalletTransactionStatus;
        description: string | null;
        type: WalletTransactionType;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        balanceBefore: import("@prisma/client/runtime/library").Decimal;
        balanceAfter: import("@prisma/client/runtime/library").Decimal;
        referenceType: string | null;
        referenceId: string | null;
        processingKey: string | null;
    }>;
    debit(tx: Tx, walletId: string, type: WalletTransactionType, amount: Prisma.Decimal | number | string, extra?: LedgerExtra): Promise<{
        id: string;
        createdAt: Date;
        status: WalletTransactionStatus;
        description: string | null;
        type: WalletTransactionType;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        balanceBefore: import("@prisma/client/runtime/library").Decimal;
        balanceAfter: import("@prisma/client/runtime/library").Decimal;
        referenceType: string | null;
        referenceId: string | null;
        processingKey: string | null;
    }>;
    hold(tx: Tx, walletId: string, amount: Prisma.Decimal | number | string, extra?: LedgerExtra): Promise<{
        id: string;
        createdAt: Date;
        status: WalletTransactionStatus;
        description: string | null;
        type: WalletTransactionType;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        balanceBefore: import("@prisma/client/runtime/library").Decimal;
        balanceAfter: import("@prisma/client/runtime/library").Decimal;
        referenceType: string | null;
        referenceId: string | null;
        processingKey: string | null;
    }>;
    releaseHeld(tx: Tx, walletId: string, amount: Prisma.Decimal | number | string, extra?: LedgerExtra): Promise<{
        id: string;
        createdAt: Date;
        status: WalletTransactionStatus;
        description: string | null;
        type: WalletTransactionType;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        balanceBefore: import("@prisma/client/runtime/library").Decimal;
        balanceAfter: import("@prisma/client/runtime/library").Decimal;
        referenceType: string | null;
        referenceId: string | null;
        processingKey: string | null;
    }>;
    settleHeld(tx: Tx, walletId: string, amount: Prisma.Decimal | number | string, extra?: LedgerExtra): Promise<{
        id: string;
        createdAt: Date;
        status: WalletTransactionStatus;
        description: string | null;
        type: WalletTransactionType;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        balanceBefore: import("@prisma/client/runtime/library").Decimal;
        balanceAfter: import("@prisma/client/runtime/library").Decimal;
        referenceType: string | null;
        referenceId: string | null;
        processingKey: string | null;
    }>;
    audit(tx: Tx, input: AuditInput): Promise<void>;
    processJobPayment(bookingId: string): Promise<{
        bookingId: string;
        gross: import("@prisma/client/runtime/library").Decimal;
        commission: import("@prisma/client/runtime/library").Decimal;
        net: import("@prisma/client/runtime/library").Decimal;
        customerBalanceAfter: import("@prisma/client/runtime/library").Decimal;
        providerBalanceAfter: import("@prisma/client/runtime/library").Decimal;
    }>;
    creditRefund(userId: string, amount: Prisma.Decimal | number | string, extra?: {
        referenceType?: string;
        referenceId?: string;
        description?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        status: WalletTransactionStatus;
        description: string | null;
        type: WalletTransactionType;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        balanceBefore: import("@prisma/client/runtime/library").Decimal;
        balanceAfter: import("@prisma/client/runtime/library").Decimal;
        referenceType: string | null;
        referenceId: string | null;
        processingKey: string | null;
    }>;
    deductProvider(providerId: string, amount: Prisma.Decimal | number | string, extra?: {
        referenceType?: string;
        referenceId?: string;
        description?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        status: WalletTransactionStatus;
        description: string | null;
        type: WalletTransactionType;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        balanceBefore: import("@prisma/client/runtime/library").Decimal;
        balanceAfter: import("@prisma/client/runtime/library").Decimal;
        referenceType: string | null;
        referenceId: string | null;
        processingKey: string | null;
    }>;
    processDisputeRefund(params: {
        disputeId: string;
        bookingId: string;
        customerId: string;
        providerId: string;
        amount: Prisma.Decimal | number | string;
        resolution: DisputeResolution;
        adminId: string;
    }): Promise<{
        alreadyProcessed: boolean;
        refundAmount: import("@prisma/client/runtime/library").Decimal;
        resolution: DisputeResolution;
    }>;
    adjustWallet(adminId: string, userId: string, dto: {
        direction: 'credit' | 'debit';
        amount: number;
        reason: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        status: WalletTransactionStatus;
        description: string | null;
        type: WalletTransactionType;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        balanceBefore: import("@prisma/client/runtime/library").Decimal;
        balanceAfter: import("@prisma/client/runtime/library").Decimal;
        referenceType: string | null;
        referenceId: string | null;
        processingKey: string | null;
    }>;
    freezeWallet(adminId: string, userId: string, reason: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: WalletStatus;
        userId: string;
        type: WalletType;
        balance: import("@prisma/client/runtime/library").Decimal;
        heldBalance: import("@prisma/client/runtime/library").Decimal;
        lifetimeCredits: import("@prisma/client/runtime/library").Decimal;
        lifetimeDebits: import("@prisma/client/runtime/library").Decimal;
    }>;
    unfreezeWallet(adminId: string, userId: string, reason?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: WalletStatus;
        userId: string;
        type: WalletType;
        balance: import("@prisma/client/runtime/library").Decimal;
        heldBalance: import("@prisma/client/runtime/library").Decimal;
        lifetimeCredits: import("@prisma/client/runtime/library").Decimal;
        lifetimeDebits: import("@prisma/client/runtime/library").Decimal;
    }>;
    getWalletSummary(userId: string): Promise<{
        walletId: string;
        walletStatus: WalletStatus;
        balance: import("@prisma/client/runtime/library").Decimal;
        heldBalance: import("@prisma/client/runtime/library").Decimal;
        lifetimeCredits: import("@prisma/client/runtime/library").Decimal;
        lifetimeDebits: import("@prisma/client/runtime/library").Decimal;
        totalTopUps: import("@prisma/client/runtime/library").Decimal;
        totalWithdrawals: import("@prisma/client/runtime/library").Decimal;
        pendingWithdrawals: import("@prisma/client/runtime/library").Decimal;
    }>;
    getEarningsSummary(providerId: string): Promise<{
        availableBalance: import("@prisma/client/runtime/library").Decimal;
        heldBalance: import("@prisma/client/runtime/library").Decimal;
        lifetimeEarnings: import("@prisma/client/runtime/library").Decimal;
        lifetimeWithdrawals: import("@prisma/client/runtime/library").Decimal;
        pendingWithdrawals: import("@prisma/client/runtime/library").Decimal;
        platformCommissionPaid: import("@prisma/client/runtime/library").Decimal;
        monthlyEarnings: import("@prisma/client/runtime/library").Decimal;
        totalCompletedJobs: number;
    }>;
    listTransactions(userId: string, query: WalletTransactionQueryDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            status: WalletTransactionStatus;
            description: string | null;
            type: WalletTransactionType;
            walletId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            balanceBefore: import("@prisma/client/runtime/library").Decimal;
            balanceAfter: import("@prisma/client/runtime/library").Decimal;
            referenceType: string | null;
            referenceId: string | null;
            processingKey: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    }>;
    getTransaction(userId: string, transactionId: string): Promise<{
        id: string;
        createdAt: Date;
        status: WalletTransactionStatus;
        description: string | null;
        type: WalletTransactionType;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        balanceBefore: import("@prisma/client/runtime/library").Decimal;
        balanceAfter: import("@prisma/client/runtime/library").Decimal;
        referenceType: string | null;
        referenceId: string | null;
        processingKey: string | null;
    }>;
    adminListWallets(query: {
        page?: number;
        limit?: number;
        type?: WalletType;
        status?: WalletStatus;
    }): Promise<{
        data: ({
            user: {
                id: string;
                fullName: string;
                phone: string;
                email: string;
                role: UserRole;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: WalletStatus;
            userId: string;
            type: WalletType;
            balance: import("@prisma/client/runtime/library").Decimal;
            heldBalance: import("@prisma/client/runtime/library").Decimal;
            lifetimeCredits: import("@prisma/client/runtime/library").Decimal;
            lifetimeDebits: import("@prisma/client/runtime/library").Decimal;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    }>;
    adminListTransactions(query: WalletTransactionQueryDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            status: WalletTransactionStatus;
            description: string | null;
            type: WalletTransactionType;
            walletId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            balanceBefore: import("@prisma/client/runtime/library").Decimal;
            balanceAfter: import("@prisma/client/runtime/library").Decimal;
            referenceType: string | null;
            referenceId: string | null;
            processingKey: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    }>;
    adminGetWalletByUserId(userId: string): Promise<{
        user: {
            id: string;
            fullName: string;
            email: string;
            role: UserRole;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: WalletStatus;
        userId: string;
        type: WalletType;
        balance: import("@prisma/client/runtime/library").Decimal;
        heldBalance: import("@prisma/client/runtime/library").Decimal;
        lifetimeCredits: import("@prisma/client/runtime/library").Decimal;
        lifetimeDebits: import("@prisma/client/runtime/library").Decimal;
    }>;
    private queryTransactions;
}
export {};
