import { WithdrawalsService } from './withdrawals.service';
import { CreateWithdrawalDto } from './dtos/create-withdrawal.dto';
import { WithdrawalQueryDto } from './dtos/withdrawal-query.dto';
export declare class ProviderWithdrawalsController {
    private readonly withdrawalsService;
    constructor(withdrawalsService: WithdrawalsService);
    submit(userId: string, dto: CreateWithdrawalDto): Promise<{
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
    list(userId: string, query: WithdrawalQueryDto): Promise<{
        data: {
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
    get(userId: string, id: string): Promise<{
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
    cancel(userId: string, id: string): Promise<{
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
