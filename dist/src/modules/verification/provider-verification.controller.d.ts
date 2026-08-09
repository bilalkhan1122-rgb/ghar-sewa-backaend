import { VerificationService } from './verification.service';
import { VerificationQueryDto } from './dtos/verification-query.dto';
export declare class ProviderVerificationController {
    private readonly verificationService;
    constructor(verificationService: VerificationService);
    submit(userId: string): Promise<{
        message: string;
        verificationStatus: "PENDING";
        requestId: string;
    }>;
    getStatus(userId: string): Promise<{
        verificationStatus: import("generated/prisma/client").VerificationStatus;
        profileCompleted: boolean;
        latestRequest: {
            id: string;
            status: import("generated/prisma/client").VerificationStatus;
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
}
