import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { VerificationQueryDto } from './dtos/verification-query.dto';
import { Logger } from 'nestjs-pino';
import { UserRole, VerificationStatus } from 'generated/prisma/client';
export declare class VerificationService {
    private readonly prisma;
    private readonly notifications;
    private readonly logger;
    constructor(prisma: PrismaService, notifications: NotificationsService, logger: Logger);
    submit(userId: string): Promise<{
        message: string;
        verificationStatus: "PENDING";
        requestId: string;
    }>;
    onSensitiveInfoChanged(userId: string): Promise<void>;
    getStatus(userId: string): Promise<{
        verificationStatus: VerificationStatus;
        profileCompleted: boolean;
        latestRequest: {
            id: string;
            status: VerificationStatus;
            submittedAt: Date;
            reviewedAt: Date | null;
            rejectionReason: string | null;
        } | null;
    }>;
    getHistory(userId: string, query: VerificationQueryDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: VerificationStatus;
            facePhoto: string;
            cnicNumber: string;
            cnicFrontImage: string;
            cnicBackImage: string;
            providerId: string;
            submittedAt: Date;
            reviewedAt: Date | null;
            reviewedBy: string | null;
            rejectionReason: string | null;
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
    adminListRequests(query: VerificationQueryDto): Promise<{
        data: ({
            provider: {
                id: string;
                fullName: string;
                phone: string;
                email: string;
                profilePhoto: string | null;
                city: {
                    id: string;
                    name: string;
                };
                providerProfile: {
                    bio: string | null;
                    hourlyRate: import("@prisma/client/runtime/library").Decimal | null;
                    serviceRadius: number | null;
                    serviceLocation: string | null;
                } | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: VerificationStatus;
            facePhoto: string;
            cnicNumber: string;
            cnicFrontImage: string;
            cnicBackImage: string;
            providerId: string;
            submittedAt: Date;
            reviewedAt: Date | null;
            reviewedBy: string | null;
            rejectionReason: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    }>;
    adminGetRequest(requestId: string): Promise<{
        provider: {
            city: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
            };
            providerProfile: ({
                categories: ({
                    category: {
                        id: string;
                        name: string;
                        createdAt: Date;
                        updatedAt: Date;
                        isActive: boolean;
                        slug: string;
                        description: string | null;
                        icon: string | null;
                        displayOrder: number;
                    };
                } & {
                    providerId: string;
                    categoryId: string;
                })[];
            } & {
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                bio: string | null;
                hourlyRate: import("@prisma/client/runtime/library").Decimal | null;
                serviceRadius: number | null;
                serviceLocation: string | null;
                facePhoto: string | null;
                cnicNumber: string | null;
                cnicFrontImage: string | null;
                cnicBackImage: string | null;
            }) | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string;
            passwordHash: string;
            role: UserRole;
            cityId: string;
            address: string | null;
            status: import("generated/prisma/client").UserStatus;
            profileCompleted: boolean;
            verificationStatus: VerificationStatus;
            refreshToken: string | null;
            isActive: boolean;
            profilePhoto: string | null;
            walletBalance: import("@prisma/client/runtime/library").Decimal;
            totalSpent: import("@prisma/client/runtime/library").Decimal;
            totalTopups: import("@prisma/client/runtime/library").Decimal;
            deletedAt: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: VerificationStatus;
        facePhoto: string;
        cnicNumber: string;
        cnicFrontImage: string;
        cnicBackImage: string;
        providerId: string;
        submittedAt: Date;
        reviewedAt: Date | null;
        reviewedBy: string | null;
        rejectionReason: string | null;
    }>;
    adminApprove(adminId: string, requestId: string): Promise<{
        message: string;
        request: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: VerificationStatus;
            facePhoto: string;
            cnicNumber: string;
            cnicFrontImage: string;
            cnicBackImage: string;
            providerId: string;
            submittedAt: Date;
            reviewedAt: Date | null;
            reviewedBy: string | null;
            rejectionReason: string | null;
        };
    }>;
    adminReject(adminId: string, requestId: string, reason: string): Promise<{
        message: string;
        request: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: VerificationStatus;
            facePhoto: string;
            cnicNumber: string;
            cnicFrontImage: string;
            cnicBackImage: string;
            providerId: string;
            submittedAt: Date;
            reviewedAt: Date | null;
            reviewedBy: string | null;
            rejectionReason: string | null;
        };
    }>;
    adminGetProviderHistory(providerId: string, query: VerificationQueryDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: VerificationStatus;
            facePhoto: string;
            cnicNumber: string;
            cnicFrontImage: string;
            cnicBackImage: string;
            providerId: string;
            submittedAt: Date;
            reviewedAt: Date | null;
            reviewedBy: string | null;
            rejectionReason: string | null;
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
    adminBan(adminId: string, providerId: string): Promise<{
        message: string;
        verificationStatus: "BANNED";
    }>;
    adminUnban(adminId: string, providerId: string): Promise<{
        message: string;
        verificationStatus: "INCOMPLETE";
    }>;
    private missingFields;
}
