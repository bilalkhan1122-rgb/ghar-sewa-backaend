import { AdminUsersService } from './admin-users.service';
import { UserRole } from 'generated/prisma/client';
import { AdminUserQueryDto } from './dtos/admin-user-query.dto';
import { ActionReasonDto } from 'src/common/dtos/action-reason.dto';
export declare class AdminUsersController {
    private readonly adminUsersService;
    constructor(adminUsersService: AdminUsersService);
    list(query: AdminUserQueryDto): Promise<{
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
            jobsPosted: number;
            bookings: number;
            disputes: number;
            penalties: number;
            reviewsReceived: number;
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
    suspend(adminId: string, id: string, dto: ActionReasonDto): Promise<{
        message: string;
        user: {
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
        user: {
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
    softDelete(adminId: string, id: string, dto: ActionReasonDto): Promise<{
        message: string;
        user: {
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
    restore(adminId: string, id: string): Promise<{
        message: string;
        user: {
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
