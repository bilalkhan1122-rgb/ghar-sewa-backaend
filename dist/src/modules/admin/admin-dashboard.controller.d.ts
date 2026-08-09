import { AdminService } from './admin.service';
import { DateRangeDto } from './dtos/date-range.dto';
export declare class AdminDashboardController {
    private readonly adminService;
    constructor(adminService: AdminService);
    summary(dto: DateRangeDto): Promise<{
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
    widgets(): Promise<{
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
}
