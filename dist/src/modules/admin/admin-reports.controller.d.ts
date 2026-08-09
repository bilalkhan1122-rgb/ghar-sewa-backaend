import { AdminService } from './admin.service';
import { DateRangeDto } from './dtos/date-range.dto';
export declare class AdminReportsController {
    private readonly adminService;
    constructor(adminService: AdminService);
    users(dto: DateRangeDto): Promise<{
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
    providers(dto: DateRangeDto): Promise<{
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
    jobs(dto: DateRangeDto): Promise<{
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
    financial(dto: DateRangeDto): Promise<{
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
    disputes(dto: DateRangeDto): Promise<{
        totalDisputes: number;
        resolved: number;
        rejected: number;
        pending: number;
        byStatus: Record<string, number>;
        byResolution: Record<string, number>;
    }>;
}
