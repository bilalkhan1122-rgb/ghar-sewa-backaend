import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserRole, UserStatus, VerificationStatus } from 'generated/prisma/client';
import { Logger } from 'nestjs-pino';
import { CustomerRegisterDto } from './dtos/customer-register.dto';
import { ProviderRegisterDto } from './dtos/provider-register.dto';
import { LoginDto } from './dtos/login.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    private config;
    private logger;
    private notifications;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService, logger: Logger, notifications: NotificationsService);
    registerCustomer(dto: CustomerRegisterDto, deviceInfo?: string, ipAddress?: string): Promise<{
        accessToken: string;
        refreshToken: string;
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
            status: UserStatus;
            profileCompleted: boolean;
            verificationStatus: VerificationStatus;
            isActive: boolean;
            profilePhoto: string | null;
            walletBalance: import("@prisma/client/runtime/library").Decimal;
            totalSpent: import("@prisma/client/runtime/library").Decimal;
            totalTopups: import("@prisma/client/runtime/library").Decimal;
            deletedAt: Date | null;
        };
    }>;
    registerProvider(dto: ProviderRegisterDto, deviceInfo?: string, ipAddress?: string): Promise<{
        accessToken: string;
        refreshToken: string;
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
            status: UserStatus;
            profileCompleted: boolean;
            verificationStatus: VerificationStatus;
            isActive: boolean;
            profilePhoto: string | null;
            walletBalance: import("@prisma/client/runtime/library").Decimal;
            totalSpent: import("@prisma/client/runtime/library").Decimal;
            totalTopups: import("@prisma/client/runtime/library").Decimal;
            deletedAt: Date | null;
        };
    }>;
    login(loginDto: LoginDto, deviceInfo?: string, ipAddress?: string): Promise<{
        accessToken: string;
        refreshToken: string;
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
            status: UserStatus;
            profileCompleted: boolean;
            verificationStatus: VerificationStatus;
            isActive: boolean;
            profilePhoto: string | null;
            walletBalance: import("@prisma/client/runtime/library").Decimal;
            totalSpent: import("@prisma/client/runtime/library").Decimal;
            totalTopups: import("@prisma/client/runtime/library").Decimal;
            deletedAt: Date | null;
        };
    }>;
    refreshToken(userId: string, rt: string, deviceInfo?: string, ipAddress?: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string, rt?: string): Promise<{
        message: string;
    }>;
    getMe(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string;
        role: UserRole;
        cityId: string;
        address: string | null;
        status: UserStatus;
        profileCompleted: boolean;
        verificationStatus: VerificationStatus;
        isActive: boolean;
        profilePhoto: string | null;
        walletBalance: import("@prisma/client/runtime/library").Decimal;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        totalTopups: import("@prisma/client/runtime/library").Decimal;
        deletedAt: Date | null;
    }>;
    private validateUniqueCredentials;
    private sanitizeUser;
    hashData(data: string): Promise<string>;
    generateTokens(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private cleanupExpiredTokens;
    private parseExpiryToMilliseconds;
}
