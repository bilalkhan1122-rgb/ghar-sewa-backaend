import { WalletService } from './wallet.service';
import { TopUpsService } from './topups.service';
import { WithdrawalsService } from './withdrawals.service';
import { UserRole } from 'generated/prisma/client';
import { WalletQueryDto } from './dtos/wallet-query.dto';
import { WalletTransactionQueryDto } from './dtos/wallet-transaction-query.dto';
import { TopUpQueryDto } from './dtos/topup-query.dto';
import { WithdrawalQueryDto } from './dtos/withdrawal-query.dto';
import { ApproveTopUpDto, RejectTopUpDto } from './dtos/review-topup.dto';
import { ReviewWithdrawalDto, RejectWithdrawalDto } from './dtos/review-withdrawal.dto';
import { AdjustWalletDto } from './dtos/adjust-wallet.dto';
import { FreezeWalletDto, UnfreezeWalletDto } from './dtos/freeze-wallet.dto';
export declare class AdminWalletController {
    private readonly walletService;
    private readonly topUpsService;
    private readonly withdrawalsService;
    constructor(walletService: WalletService, topUpsService: TopUpsService, withdrawalsService: WithdrawalsService);
    listWallets(query: WalletQueryDto): Promise<{
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
            status: import("generated/prisma/client").WalletStatus;
            userId: string;
            type: import("generated/prisma/client").WalletType;
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
    listTransactions(query: WalletTransactionQueryDto): Promise<{
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
    getWalletByUser(userId: string): Promise<{
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
        status: import("generated/prisma/client").WalletStatus;
        userId: string;
        type: import("generated/prisma/client").WalletType;
        balance: import("@prisma/client/runtime/library").Decimal;
        heldBalance: import("@prisma/client/runtime/library").Decimal;
        lifetimeCredits: import("@prisma/client/runtime/library").Decimal;
        lifetimeDebits: import("@prisma/client/runtime/library").Decimal;
    }>;
    adjustWallet(adminId: string, userId: string, dto: AdjustWalletDto): Promise<{
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
    freezeWallet(adminId: string, userId: string, dto: FreezeWalletDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").WalletStatus;
        userId: string;
        type: import("generated/prisma/client").WalletType;
        balance: import("@prisma/client/runtime/library").Decimal;
        heldBalance: import("@prisma/client/runtime/library").Decimal;
        lifetimeCredits: import("@prisma/client/runtime/library").Decimal;
        lifetimeDebits: import("@prisma/client/runtime/library").Decimal;
    }>;
    unfreezeWallet(adminId: string, userId: string, dto: UnfreezeWalletDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").WalletStatus;
        userId: string;
        type: import("generated/prisma/client").WalletType;
        balance: import("@prisma/client/runtime/library").Decimal;
        heldBalance: import("@prisma/client/runtime/library").Decimal;
        lifetimeCredits: import("@prisma/client/runtime/library").Decimal;
        lifetimeDebits: import("@prisma/client/runtime/library").Decimal;
    }>;
    listTopUps(query: TopUpQueryDto): Promise<{
        data: ({
            user: {
                id: string;
                fullName: string;
                phone: string;
                email: string;
            };
        } & {
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
    getTopUp(id: string): Promise<{
        user: {
            id: string;
            fullName: string;
            phone: string;
            email: string;
        };
    } & {
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
    approveTopUp(adminId: string, id: string, dto: ApproveTopUpDto): Promise<{
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
    rejectTopUp(adminId: string, id: string, dto: RejectTopUpDto): Promise<{
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
    listWithdrawals(query: WithdrawalQueryDto): Promise<{
        data: ({
            provider: {
                id: string;
                fullName: string;
                phone: string;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("generated/prisma/client").WithdrawalStatus;
            providerId: string;
            submittedAt: Date;
            walletId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            paymentMethod: import("generated/prisma/client").PaymentMethod;
            notes: string | null;
            accountName: string;
            accountNumber: string;
            bankName: string | null;
            processedAt: Date | null;
            processedBy: string | null;
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
    getWithdrawal(id: string): Promise<{
        provider: {
            id: string;
            fullName: string;
            phone: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").WithdrawalStatus;
        providerId: string;
        submittedAt: Date;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: import("generated/prisma/client").PaymentMethod;
        notes: string | null;
        accountName: string;
        accountNumber: string;
        bankName: string | null;
        processedAt: Date | null;
        processedBy: string | null;
    }>;
    approveWithdrawal(adminId: string, id: string, dto: ReviewWithdrawalDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").WithdrawalStatus;
        providerId: string;
        submittedAt: Date;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: import("generated/prisma/client").PaymentMethod;
        notes: string | null;
        accountName: string;
        accountNumber: string;
        bankName: string | null;
        processedAt: Date | null;
        processedBy: string | null;
    }>;
    markProcessing(adminId: string, id: string, dto: ReviewWithdrawalDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").WithdrawalStatus;
        providerId: string;
        submittedAt: Date;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: import("generated/prisma/client").PaymentMethod;
        notes: string | null;
        accountName: string;
        accountNumber: string;
        bankName: string | null;
        processedAt: Date | null;
        processedBy: string | null;
    }>;
    completeWithdrawal(adminId: string, id: string, dto: ReviewWithdrawalDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").WithdrawalStatus;
        providerId: string;
        submittedAt: Date;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: import("generated/prisma/client").PaymentMethod;
        notes: string | null;
        accountName: string;
        accountNumber: string;
        bankName: string | null;
        processedAt: Date | null;
        processedBy: string | null;
    }>;
    rejectWithdrawal(adminId: string, id: string, dto: RejectWithdrawalDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").WithdrawalStatus;
        providerId: string;
        submittedAt: Date;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: import("generated/prisma/client").PaymentMethod;
        notes: string | null;
        accountName: string;
        accountNumber: string;
        bankName: string | null;
        processedAt: Date | null;
        processedBy: string | null;
    }>;
}
