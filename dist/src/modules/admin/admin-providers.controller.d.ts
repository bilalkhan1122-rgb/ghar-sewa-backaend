import { AdminUsersService } from './admin-users.service';
import { UserRole } from 'generated/prisma/client';
import { AdminProviderQueryDto } from './dtos/admin-provider-query.dto';
import { ActionReasonDto } from 'src/common/dtos/action-reason.dto';
export declare class AdminProvidersController {
    private readonly adminUsersService;
    constructor(adminUsersService: AdminUsersService);
    list(query: AdminProviderQueryDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string;
            role: UserRole;
            cityId: string;
            address: string | null;
            status: import("generated/prisma/client").UserStatus;
            profileCompleted: boolean;
            verificationStatus: import("generated/prisma/client").VerificationStatus;
            isActive: boolean;
            profilePhoto: string | null;
            walletBalance: import("@prisma/client/runtime/library").Decimal;
            totalSpent: import("@prisma/client/runtime/library").Decimal;
            totalTopups: import("@prisma/client/runtime/library").Decimal;
            deletedAt: Date | null;
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
    getDetail(id: string): Promise<{
        stats: {
            completedJobs: number;
            activeBookings: number;
            cancellationCount: number;
            penaltyCount: number;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string;
        role: UserRole;
        cityId: string;
        address: string | null;
        status: import("generated/prisma/client").UserStatus;
        profileCompleted: boolean;
        verificationStatus: import("generated/prisma/client").VerificationStatus;
        isActive: boolean;
        profilePhoto: string | null;
        walletBalance: import("@prisma/client/runtime/library").Decimal;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        totalTopups: import("@prisma/client/runtime/library").Decimal;
        deletedAt: Date | null;
    }>;
    getDocuments(id: string): Promise<{
        providerId: string;
        profile: {
            facePhoto: string | null;
            cnicFrontImage: string | null;
            cnicBackImage: string | null;
        };
        verificationHistory: {
            id: string;
            status: import("generated/prisma/client").VerificationStatus;
            facePhoto: string;
            cnicFrontImage: string;
            cnicBackImage: string;
            submittedAt: Date;
            reviewedAt: Date | null;
            reviewedBy: string | null;
            rejectionReason: string | null;
        }[];
    }>;
    getPerformance(id: string): Promise<{
        providerId: string;
        fullName: string;
        rating: import("@prisma/client/runtime/library").Decimal;
        totalReviews: number;
        jobsCompleted: number;
        activeBookings: number;
        walletBalance: import("@prisma/client/runtime/library").Decimal;
        heldBalance: import("@prisma/client/runtime/library").Decimal;
        lifetimeEarnings: import("@prisma/client/runtime/library").Decimal;
        cancellationCount: number;
        penalties: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            providerId: string;
            reason: string;
            penaltyType: import("generated/prisma/client").PenaltyType;
            startDate: Date;
            endDate: Date | null;
            active: boolean;
        }[];
    }>;
    suspend(adminId: string, id: string, dto: ActionReasonDto): Promise<{
        message: string;
        provider: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string;
            role: UserRole;
            cityId: string;
            address: string | null;
            status: import("generated/prisma/client").UserStatus;
            profileCompleted: boolean;
            verificationStatus: import("generated/prisma/client").VerificationStatus;
            isActive: boolean;
            profilePhoto: string | null;
            walletBalance: import("@prisma/client/runtime/library").Decimal;
            totalSpent: import("@prisma/client/runtime/library").Decimal;
            totalTopups: import("@prisma/client/runtime/library").Decimal;
            deletedAt: Date | null;
        };
    }>;
    unsuspend(adminId: string, id: string): Promise<{
        message: string;
        provider: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string;
            role: UserRole;
            cityId: string;
            address: string | null;
            status: import("generated/prisma/client").UserStatus;
            profileCompleted: boolean;
            verificationStatus: import("generated/prisma/client").VerificationStatus;
            isActive: boolean;
            profilePhoto: string | null;
            walletBalance: import("@prisma/client/runtime/library").Decimal;
            totalSpent: import("@prisma/client/runtime/library").Decimal;
            totalTopups: import("@prisma/client/runtime/library").Decimal;
            deletedAt: Date | null;
        };
    }>;
}
