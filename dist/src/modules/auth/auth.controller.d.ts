import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CustomerRegisterDto } from './dtos/customer-register.dto';
import { ProviderRegisterDto } from './dtos/provider-register.dto';
import { LoginDto } from './dtos/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerCustomer(dto: CustomerRegisterDto, req: Request, res: Response): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string;
            role: import("../../../generated/prisma/enums").UserRole;
            cityId: string;
            address: string | null;
            status: import("../../../generated/prisma/enums").UserStatus;
            profileCompleted: boolean;
            verificationStatus: import("../../../generated/prisma/enums").VerificationStatus;
            isActive: boolean;
            profilePhoto: string | null;
            walletBalance: import("@prisma/client/runtime/library").Decimal;
            totalSpent: import("@prisma/client/runtime/library").Decimal;
            totalTopups: import("@prisma/client/runtime/library").Decimal;
            deletedAt: Date | null;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    registerProvider(dto: ProviderRegisterDto, req: Request, res: Response): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string;
            role: import("../../../generated/prisma/enums").UserRole;
            cityId: string;
            address: string | null;
            status: import("../../../generated/prisma/enums").UserStatus;
            profileCompleted: boolean;
            verificationStatus: import("../../../generated/prisma/enums").VerificationStatus;
            isActive: boolean;
            profilePhoto: string | null;
            walletBalance: import("@prisma/client/runtime/library").Decimal;
            totalSpent: import("@prisma/client/runtime/library").Decimal;
            totalTopups: import("@prisma/client/runtime/library").Decimal;
            deletedAt: Date | null;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    login(loginDto: LoginDto, req: Request, res: Response): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string;
            role: import("../../../generated/prisma/enums").UserRole;
            cityId: string;
            address: string | null;
            status: import("../../../generated/prisma/enums").UserStatus;
            profileCompleted: boolean;
            verificationStatus: import("../../../generated/prisma/enums").VerificationStatus;
            isActive: boolean;
            profilePhoto: string | null;
            walletBalance: import("@prisma/client/runtime/library").Decimal;
            totalSpent: import("@prisma/client/runtime/library").Decimal;
            totalTopups: import("@prisma/client/runtime/library").Decimal;
            deletedAt: Date | null;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(userId: string, req: Request, res: Response): Promise<{
        message: string;
    }>;
    logout(userId: string, req: Request, res: Response): Promise<{
        message: string;
    }>;
    getMe(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string;
        role: import("../../../generated/prisma/enums").UserRole;
        cityId: string;
        address: string | null;
        status: import("../../../generated/prisma/enums").UserStatus;
        profileCompleted: boolean;
        verificationStatus: import("../../../generated/prisma/enums").VerificationStatus;
        isActive: boolean;
        profilePhoto: string | null;
        walletBalance: import("@prisma/client/runtime/library").Decimal;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        totalTopups: import("@prisma/client/runtime/library").Decimal;
        deletedAt: Date | null;
    }>;
}
