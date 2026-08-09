import { PrismaService } from 'src/prisma/prisma.service';
import { AdminSearchQueryDto } from './dtos/admin-search-query.dto';
import { UserRole, UserStatus, JobStatus, BookingStatus, DisputeStatus, WalletTransactionType, WithdrawalStatus } from 'generated/prisma/client';
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDashboardSummary(dto: {
        dateFrom?: string;
        dateTo?: string;
    }): Promise<{
        period: {
            dateFrom: string | null;
            dateTo: string | null;
        };
        users: {
            totalCustomers: number;
            totalProviders: number;
            newUsersToday: number;
        };
        providers: {
            pendingVerifications: number;
            approvedProviders: number;
            rejectedProviders: number;
            bannedProviders: number;
        };
        jobs: {
            pending: number;
            active: number;
            completed: number;
            cancelled: number;
            expired: number;
            disputed: number;
            todayCompletedJobs: number;
        };
        disputes: {
            openDisputes: number;
        };
        finance: {
            pendingWithdrawals: number;
            pendingTopUps: number;
            platformWalletBalance: import("@prisma/client/runtime/library").Decimal;
            totalPlatformCommission: import("@prisma/client/runtime/library").Decimal;
            totalWalletBalance: import("@prisma/client/runtime/library").Decimal;
            totalHeldBalance: import("@prisma/client/runtime/library").Decimal;
            todayRevenue: import("@prisma/client/runtime/library").Decimal;
        };
    }>;
    getDashboardWidgets(): Promise<{
        pendingVerifications: number;
        openDisputes: number;
        pendingWithdrawals: number;
        pendingTopUps: number;
        activeJobs: number;
        newUsers: {
            today: number;
            last7Days: number;
        };
        revenue: {
            today: import("@prisma/client/runtime/library").Decimal;
            thisMonth: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
        };
        commission: {
            today: import("@prisma/client/runtime/library").Decimal;
            thisMonth: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
        };
    }>;
    reportUsers(dto: {
        dateFrom?: string;
        dateTo?: string;
    }): Promise<{
        totalUsers: number;
        byRole: {
            [k: string]: number;
        };
        activeUsers: number;
        suspendedUsers: number;
        deletedUsers: number;
        dailyRegistrations: {
            [k: string]: number;
        };
        monthlyRegistrations: {
            [k: string]: number;
        };
    }>;
    reportProviders(dto: {
        dateFrom?: string;
        dateTo?: string;
    }): Promise<{
        totalProviders: number;
        verificationStatistics: {
            [k: string]: number;
        };
        averageRating: import("@prisma/client/runtime/library").Decimal;
        ratedProviders: number;
        topProviders: {
            providerId: string;
            fullName: string;
            email: string;
            phone: string;
            averageRating: import("@prisma/client/runtime/library").Decimal;
            totalReviews: number;
        }[];
    }>;
    reportJobs(dto: {
        dateFrom?: string;
        dateTo?: string;
    }): Promise<{
        totalJobs: number;
        byStatus: {
            [k: string]: number;
        };
        completedJobs: number;
        cancelledJobs: number;
        expiredJobs: number;
        jobsByCategory: {
            categoryId: string;
            count: number;
        }[];
    }>;
    reportFinancial(dto: {
        dateFrom?: string;
        dateTo?: string;
    }): Promise<{
        period: {
            dateFrom: string | null;
            dateTo: string | null;
        };
        revenue: import("@prisma/client/runtime/library").Decimal;
        commissionEarned: import("@prisma/client/runtime/library").Decimal;
        totalWalletBalance: import("@prisma/client/runtime/library").Decimal;
        totalHeldBalance: import("@prisma/client/runtime/library").Decimal;
        pendingWithdrawals: import("@prisma/client/runtime/library").Decimal;
        pendingTopUps: import("@prisma/client/runtime/library").Decimal;
        topUpsApproved: import("@prisma/client/runtime/library").Decimal;
        withdrawalsCompleted: import("@prisma/client/runtime/library").Decimal;
    }>;
    reportDisputes(dto: {
        dateFrom?: string;
        dateTo?: string;
    }): Promise<{
        totalDisputes: number;
        resolved: number;
        rejected: number;
        pending: number;
        byStatus: Record<string, number>;
        byResolution: Record<string, number>;
    }>;
    globalSearch(dto: AdminSearchQueryDto): Promise<{
        query: string;
        users: {
            id: string;
            createdAt: Date;
            fullName: string;
            phone: string;
            email: string;
            role: UserRole;
            status: UserStatus;
            isActive: boolean;
        }[];
        providers: {
            id: string;
            createdAt: Date;
            fullName: string;
            phone: string;
            email: string;
            role: UserRole;
            status: UserStatus;
            isActive: boolean;
        }[];
        customers: {
            id: string;
            createdAt: Date;
            fullName: string;
            phone: string;
            email: string;
            role: UserRole;
            status: UserStatus;
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
            status: JobStatus;
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
                status: JobStatus;
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
            status: BookingStatus;
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
            status: DisputeStatus;
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
            status: WithdrawalStatus;
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
            type: WalletTransactionType;
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
    private groupsToRecord;
    private revenueBetween;
    private commissionBetween;
}
