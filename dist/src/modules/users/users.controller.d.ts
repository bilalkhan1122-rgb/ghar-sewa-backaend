import { UsersService } from './users.service';
import { UserRole } from 'generated/prisma/enums';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdateCustomerProfileDto } from './dtos/update-customer-profile.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string;
        role: UserRole;
        cityId: string;
        address: string | null;
        status: import("generated/prisma/enums").UserStatus;
        profileCompleted: boolean;
        verificationStatus: import("generated/prisma/enums").VerificationStatus;
        isActive: boolean;
        profilePhoto: string | null;
        walletBalance: import("@prisma/client/runtime/library").Decimal;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        totalTopups: import("@prisma/client/runtime/library").Decimal;
        deletedAt: Date | null;
    } | null>;
    updateProfile(userId: string, updateProfileDto: UpdateCustomerProfileDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string;
        role: UserRole;
        cityId: string;
        address: string | null;
        status: import("generated/prisma/enums").UserStatus;
        profileCompleted: boolean;
        verificationStatus: import("generated/prisma/enums").VerificationStatus;
        isActive: boolean;
        profilePhoto: string | null;
        walletBalance: import("@prisma/client/runtime/library").Decimal;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        totalTopups: import("@prisma/client/runtime/library").Decimal;
        deletedAt: Date | null;
    } | null>;
    uploadProfilePhoto(userId: string, file: Express.Multer.File): Promise<{
        profilePhoto: string;
    }>;
    getWalletSummary(userId: string): Promise<{
        currentBalance: import("@prisma/client/runtime/library").Decimal;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        totalTopups: import("@prisma/client/runtime/library").Decimal;
        pendingTransactions: {
            id: string;
            createdAt: Date;
            status: import("generated/prisma/enums").BookingStatus;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
    }>;
    getBookingSummary(userId: string): Promise<{
        totalBookings: number;
        pendingBookings: number;
        activeBookings: number;
        completedBookings: number;
        cancelledBookings: number;
        disputedBookings: number;
    }>;
    deleteAccount(userId: string): Promise<{
        message: string;
    }>;
    getAllUsers(paginationDto: PaginationDto): Promise<{
        data: ({
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string;
            role: UserRole;
            cityId: string;
            address: string | null;
            status: import("generated/prisma/enums").UserStatus;
            profileCompleted: boolean;
            verificationStatus: import("generated/prisma/enums").VerificationStatus;
            isActive: boolean;
            profilePhoto: string | null;
            walletBalance: import("@prisma/client/runtime/library").Decimal;
            totalSpent: import("@prisma/client/runtime/library").Decimal;
            totalTopups: import("@prisma/client/runtime/library").Decimal;
            deletedAt: Date | null;
        } | null)[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    }>;
    getUserById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string;
        role: UserRole;
        cityId: string;
        address: string | null;
        status: import("generated/prisma/enums").UserStatus;
        profileCompleted: boolean;
        verificationStatus: import("generated/prisma/enums").VerificationStatus;
        isActive: boolean;
        profilePhoto: string | null;
        walletBalance: import("@prisma/client/runtime/library").Decimal;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        totalTopups: import("@prisma/client/runtime/library").Decimal;
        deletedAt: Date | null;
    } | null>;
    updateUserById(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string;
        role: UserRole;
        cityId: string;
        address: string | null;
        status: import("generated/prisma/enums").UserStatus;
        profileCompleted: boolean;
        verificationStatus: import("generated/prisma/enums").VerificationStatus;
        isActive: boolean;
        profilePhoto: string | null;
        walletBalance: import("@prisma/client/runtime/library").Decimal;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        totalTopups: import("@prisma/client/runtime/library").Decimal;
        deletedAt: Date | null;
    } | null>;
    deleteUserById(id: string): Promise<{
        message: string;
    }>;
}
