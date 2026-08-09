import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { UpdateCustomerProfileDto } from './dtos/update-customer-profile.dto';
import { User } from 'generated/prisma/client';
import { UpdateUserDto } from './dtos/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    private readonly fileUpload;
    constructor(prisma: PrismaService, fileUpload: FileUploadService);
    getProfile(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string;
        role: import("generated/prisma/client").UserRole;
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
    } | null>;
    updateProfile(userId: string, updateProfileDto: UpdateCustomerProfileDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string;
        role: import("generated/prisma/client").UserRole;
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
            status: import("generated/prisma/client").BookingStatus;
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
    getAllUsers(page?: number, limit?: number): Promise<{
        data: ({
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string;
            role: import("generated/prisma/client").UserRole;
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
    getUserById(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string;
        role: import("generated/prisma/client").UserRole;
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
    } | null>;
    updateUserById(userId: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string;
        role: import("generated/prisma/client").UserRole;
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
    } | null>;
    deleteUserById(userId: string): Promise<{
        message: string;
    }>;
    sanitizeUser(user: User | null): {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string;
        role: import("generated/prisma/client").UserRole;
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
    } | null;
}
