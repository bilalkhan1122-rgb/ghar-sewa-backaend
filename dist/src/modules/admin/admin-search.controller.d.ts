import { AdminService } from './admin.service';
import { UserRole } from 'generated/prisma/client';
import { AdminSearchQueryDto } from './dtos/admin-search-query.dto';
export declare class AdminSearchController {
    private readonly adminService;
    constructor(adminService: AdminService);
    search(dto: AdminSearchQueryDto): Promise<{
        query: string;
        users: {
            id: string;
            createdAt: Date;
            fullName: string;
            phone: string;
            email: string;
            role: UserRole;
            status: import("generated/prisma/client").UserStatus;
            isActive: boolean;
        }[];
        providers: {
            id: string;
            createdAt: Date;
            fullName: string;
            phone: string;
            email: string;
            role: UserRole;
            status: import("generated/prisma/client").UserStatus;
            isActive: boolean;
        }[];
        customers: {
            id: string;
            createdAt: Date;
            fullName: string;
            phone: string;
            email: string;
            role: UserRole;
            status: import("generated/prisma/client").UserStatus;
            isActive: boolean;
        }[];
        jobs: ({
            category: {
                id: string;
                name: string;
            };
            customer: {
                id: string;
                fullName: string;
                phone: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            address: string;
            status: import("generated/prisma/client").JobStatus;
            expiresAt: Date;
            description: string;
            categoryId: string;
            customerId: string;
            title: string;
            latitude: number;
            longitude: number;
            offeredPrice: import("@prisma/client/runtime/library").Decimal;
            preferredSchedule: Date | null;
            additionalNotes: string | null;
        })[];
        bookings: ({
            job: {
                id: string;
                status: import("generated/prisma/client").JobStatus;
                title: string;
            };
            customer: {
                id: string;
                fullName: string;
            };
            provider: {
                id: string;
                fullName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("generated/prisma/client").BookingStatus;
            providerId: string;
            jobId: string;
            customerId: string;
            bookingType: import("generated/prisma/client").BookingType;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            acceptedAt: Date | null;
            startedAt: Date | null;
            completedAt: Date | null;
            confirmedAt: Date | null;
            cancelledAt: Date | null;
        })[];
        disputes: ({
            booking: {
                id: string;
            };
            raisedBy: {
                id: string;
                fullName: string;
            };
            opponent: {
                id: string;
                fullName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("generated/prisma/client").DisputeStatus;
            description: string | null;
            jobId: string;
            bookingId: string;
            reason: string;
            raisedById: string;
            opponentId: string;
            resolution: import("generated/prisma/client").DisputeResolution | null;
            refundAmount: import("@prisma/client/runtime/library").Decimal | null;
            evidenceCount: number;
            resolvedAt: Date | null;
            resolvedBy: string | null;
        })[];
        withdrawals: ({
            provider: {
                id: string;
                fullName: string;
                phone: string;
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
        walletTransactions: ({
            wallet: {
                id: string;
                userId: string;
            };
        } & {
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
        })[];
        meta: {
            limit: number;
        };
    }>;
}
