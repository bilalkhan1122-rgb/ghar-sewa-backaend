import { VerificationService } from './verification.service';
import { AdminAuditService } from 'src/common/services/admin-audit.service';
import { UserRole } from 'generated/prisma/client';
import { VerificationQueryDto } from './dtos/verification-query.dto';
import { RejectVerificationDto } from './dtos/reject-verification.dto';
export declare class AdminVerificationController {
    private readonly verificationService;
    private readonly audit;
    constructor(verificationService: VerificationService, audit: AdminAuditService);
    listRequests(query: VerificationQueryDto): Promise<{
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
            status: import("generated/prisma/client").VerificationStatus;
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
    getRequest(id: string): Promise<{
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
            verificationStatus: import("generated/prisma/client").VerificationStatus;
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
        status: import("generated/prisma/client").VerificationStatus;
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
    approve(adminId: string, id: string): Promise<{
        message: string;
        request: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("generated/prisma/client").VerificationStatus;
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
    reject(adminId: string, id: string, dto: RejectVerificationDto): Promise<{
        message: string;
        request: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("generated/prisma/client").VerificationStatus;
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
    getProviderHistory(providerId: string, query: VerificationQueryDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("generated/prisma/client").VerificationStatus;
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
    ban(adminId: string, providerId: string): Promise<{
        message: string;
        verificationStatus: "BANNED";
    }>;
    unban(adminId: string, providerId: string): Promise<{
        message: string;
        verificationStatus: "INCOMPLETE";
    }>;
}
