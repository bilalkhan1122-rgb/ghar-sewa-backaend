import { WalletService } from './wallet.service';
import { WalletTransactionQueryDto } from './dtos/wallet-transaction-query.dto';
export declare class ProviderWalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    getBalance(userId: string): Promise<{
        walletId: string;
        type: import("generated/prisma/client").WalletType;
        status: import("generated/prisma/client").WalletStatus;
        balance: import("@prisma/client/runtime/library").Decimal;
        heldBalance: import("@prisma/client/runtime/library").Decimal;
    }>;
    getSummary(userId: string): Promise<{
        walletId: string;
        walletStatus: import("generated/prisma/client").WalletStatus;
        balance: import("@prisma/client/runtime/library").Decimal;
        heldBalance: import("@prisma/client/runtime/library").Decimal;
        lifetimeCredits: import("@prisma/client/runtime/library").Decimal;
        lifetimeDebits: import("@prisma/client/runtime/library").Decimal;
        totalTopUps: import("@prisma/client/runtime/library").Decimal;
        totalWithdrawals: import("@prisma/client/runtime/library").Decimal;
        pendingWithdrawals: import("@prisma/client/runtime/library").Decimal;
    }>;
    getEarnings(userId: string): Promise<{
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
            status: import("generated/prisma/client").WalletTransactionStatus;
            description: string | null;
            type: import("generated/prisma/client").WalletTransactionType;
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
    getTransaction(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        status: import("generated/prisma/client").WalletTransactionStatus;
        description: string | null;
        type: import("generated/prisma/client").WalletTransactionType;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        balanceBefore: import("@prisma/client/runtime/library").Decimal;
        balanceAfter: import("@prisma/client/runtime/library").Decimal;
        referenceType: string | null;
        referenceId: string | null;
        processingKey: string | null;
    }>;
}
