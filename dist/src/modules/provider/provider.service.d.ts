import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { CompleteProviderProfileDto } from './dtos/complete-provider-profile.dto';
import { UpdateProviderProfileDto } from './dtos/update-provider-profile.dto';
import { VerificationStatus } from 'generated/prisma/client';
import { VerificationService } from '../verification/verification.service';
export declare class ProviderService {
    private readonly prisma;
    private readonly fileUpload;
    private readonly verification;
    constructor(prisma: PrismaService, fileUpload: FileUploadService, verification: VerificationService);
    private checkNotBanned;
    completeProfile(userId: string, dto: CompleteProviderProfileDto): Promise<{
        id: string;
        fullName: string;
        email: string;
        phone: string;
        profilePhoto: string | null;
        city: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        address: string | null;
        verificationStatus: VerificationStatus;
        profileCompleted: boolean;
        createdAt: Date;
        profile: {
            bio: string | null;
            hourlyRate: import("@prisma/client/runtime/library").Decimal | null;
            serviceLocation: string | null;
            serviceRadius: number | null;
            facePhoto: string | null;
            cnicNumber: string | null;
            cnicFrontImage: string | null;
            cnicBackImage: string | null;
            categories: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isActive: boolean;
                slug: string;
                description: string | null;
                icon: string | null;
                displayOrder: number;
            }[];
            galleryImages: {
                id: string;
                createdAt: Date;
                providerId: string;
                imageUrl: string;
            }[];
            completionPercentage: number;
            completedFields: string[];
            missingFields: string[];
        } | null;
    }>;
    getProviderProfile(userId: string): Promise<{
        id: string;
        fullName: string;
        email: string;
        phone: string;
        profilePhoto: string | null;
        city: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        address: string | null;
        verificationStatus: VerificationStatus;
        profileCompleted: boolean;
        createdAt: Date;
        profile: {
            bio: string | null;
            hourlyRate: import("@prisma/client/runtime/library").Decimal | null;
            serviceLocation: string | null;
            serviceRadius: number | null;
            facePhoto: string | null;
            cnicNumber: string | null;
            cnicFrontImage: string | null;
            cnicBackImage: string | null;
            categories: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isActive: boolean;
                slug: string;
                description: string | null;
                icon: string | null;
                displayOrder: number;
            }[];
            galleryImages: {
                id: string;
                createdAt: Date;
                providerId: string;
                imageUrl: string;
            }[];
            completionPercentage: number;
            completedFields: string[];
            missingFields: string[];
        } | null;
    }>;
    updateProviderProfile(userId: string, dto: UpdateProviderProfileDto): Promise<{
        id: string;
        fullName: string;
        email: string;
        phone: string;
        profilePhoto: string | null;
        city: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        address: string | null;
        verificationStatus: VerificationStatus;
        profileCompleted: boolean;
        createdAt: Date;
        profile: {
            bio: string | null;
            hourlyRate: import("@prisma/client/runtime/library").Decimal | null;
            serviceLocation: string | null;
            serviceRadius: number | null;
            facePhoto: string | null;
            cnicNumber: string | null;
            cnicFrontImage: string | null;
            cnicBackImage: string | null;
            categories: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isActive: boolean;
                slug: string;
                description: string | null;
                icon: string | null;
                displayOrder: number;
            }[];
            galleryImages: {
                id: string;
                createdAt: Date;
                providerId: string;
                imageUrl: string;
            }[];
            completionPercentage: number;
            completedFields: string[];
            missingFields: string[];
        } | null;
    }>;
    getCompletionProgress(userId: string): Promise<{
        completionPercentage: number;
        completedFields: string[];
        missingFields: string[];
        verificationStatus: VerificationStatus;
    }>;
    uploadFacePhoto(userId: string, file: Express.Multer.File): Promise<{
        facePhoto: string;
    }>;
    uploadCnicFront(userId: string, file: Express.Multer.File): Promise<{
        [x: string]: string;
    }>;
    uploadCnicBack(userId: string, file: Express.Multer.File): Promise<{
        [x: string]: string;
    }>;
    private uploadCnicImage;
    submitForVerification(userId: string): Promise<{
        message: string;
        verificationStatus: "PENDING";
        requestId: string;
    }>;
    addGalleryImage(userId: string, file: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        providerId: string;
        imageUrl: string;
    }>;
    removeGalleryImage(userId: string, imageId: string): Promise<{
        message: string;
    }>;
    listGalleryImages(userId: string): Promise<{
        id: string;
        createdAt: Date;
        providerId: string;
        imageUrl: string;
    }[]>;
    getPublicProfile(providerId: string): Promise<{
        id: string;
        fullName: string;
        profilePhoto: string | null;
        bio: string | null;
        hourlyRate: import("@prisma/client/runtime/library").Decimal | null;
        serviceLocation: string | null;
        serviceRadius: number | null;
        categories: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            slug: string;
            description: string | null;
            icon: string | null;
            displayOrder: number;
        }[];
        galleryImages: {
            id: string;
            createdAt: Date;
            providerId: string;
            imageUrl: string;
        }[];
        city: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        verificationStatus: "APPROVED";
        rating: number | import("@prisma/client/runtime/library").Decimal;
        totalReviews: number;
        ratingDistribution: {
            fiveStar: number;
            fourStar: number;
            threeStar: number;
            twoStar: number;
            oneStar: number;
        };
        totalCompletedJobs: number;
    }>;
    getDashboardSummary(userId: string): Promise<{
        profileCompletion: number;
        verificationStatus: VerificationStatus;
        totalJobs: number;
        activeJobs: number;
        completedJobs: number;
        rating: number | import("@prisma/client/runtime/library").Decimal;
        totalReviews: number;
        ratingDistribution: {
            fiveStar: number;
            fourStar: number;
            threeStar: number;
            twoStar: number;
            oneStar: number;
        };
        walletBalance: import("@prisma/client/runtime/library").Decimal;
        heldBalance: import("@prisma/client/runtime/library").Decimal;
        totalEarnings: import("@prisma/client/runtime/library").Decimal;
        categories: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            slug: string;
            description: string | null;
            icon: string | null;
            displayOrder: number;
        }[];
    }>;
    uploadProfilePhoto(userId: string, file: Express.Multer.File): Promise<{
        profilePhoto: string;
    }>;
    private calculateCompletion;
    private getAllRequiredFields;
    private updateCompletionAndVerification;
    private getProviderBookingStats;
}
