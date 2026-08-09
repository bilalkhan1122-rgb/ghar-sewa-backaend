import { WalletService } from './wallet.service';
import { TopUpsService } from './topups.service';
import { CreateTopUpDto } from './dtos/create-topup.dto';
import { TopUpQueryDto } from './dtos/topup-query.dto';
import { WalletTransactionQueryDto } from './dtos/wallet-transaction-query.dto';
export declare class CustomerWalletController {
    private readonly walletService;
    private readonly topUpsService;
    constructor(walletService: WalletService, topUpsService: TopUpsService);
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
    submitTopUp(userId: string, dto: CreateTopUpDto, file?: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").TopUpStatus;
        userId: string;
        submittedAt: Date;
        reviewedAt: Date | null;
        reviewedBy: string | null;
        rejectionReason: string | null;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: import("generated/prisma/client").PaymentMethod;
        transactionReference: string | null;
        proofImage: string | null;
        notes: string | null;
    }>;
    listTopUps(userId: string, query: TopUpQueryDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("generated/prisma/client").TopUpStatus;
            userId: string;
            submittedAt: Date;
            reviewedAt: Date | null;
            reviewedBy: string | null;
            rejectionReason: string | null;
            walletId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            paymentMethod: import("generated/prisma/client").PaymentMethod;
            transactionReference: string | null;
            proofImage: string | null;
            notes: string | null;
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
    getTopUp(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").TopUpStatus;
        userId: string;
        submittedAt: Date;
        reviewedAt: Date | null;
        reviewedBy: string | null;
        rejectionReason: string | null;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: import("generated/prisma/client").PaymentMethod;
        transactionReference: string | null;
        proofImage: string | null;
        notes: string | null;
    }>;
}
