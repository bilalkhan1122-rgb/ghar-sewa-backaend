import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { NotificationsService } from '../notifications/notifications.service';
import { WalletService } from '../wallet/wallet.service';
import { RaiseDisputeDto } from './dtos/raise-dispute.dto';
import { DisputeQueryDto } from './dtos/dispute-query.dto';
import { RespondDisputeDto } from './dtos/respond-dispute.dto';
import { ResolveDisputeDto } from './dtos/resolve-dispute.dto';
import { UpdateDisputeStatusDto } from './dtos/update-dispute-status.dto';
import { Logger } from 'nestjs-pino';
import { UserRole, BookingStatus, JobStatus, DisputeStatus, DisputeResolution, DisputeEvidenceType } from 'generated/prisma/client';
export declare const DISPUTE_WINDOW_HOURS = 48;
export declare const MAX_DISPUTE_EVIDENCE = 5;
export declare const DISPUTE_TIMELINE_ACTIONS: {
    readonly OPENED: "DISPUTE_OPENED";
    readonly EVIDENCE_UPLOADED: "EVIDENCE_UPLOADED";
    readonly RESPONSE_SUBMITTED: "RESPONSE_SUBMITTED";
    readonly STATUS_CHANGED: "STATUS_CHANGED";
    readonly RESOLUTION_APPLIED: "RESOLUTION_APPLIED";
    readonly REJECTED: "DISPUTE_REJECTED";
};
export declare class DisputesService {
    private readonly prisma;
    private readonly fileUpload;
    private readonly notifications;
    private readonly wallet;
    private readonly logger;
    constructor(prisma: PrismaService, fileUpload: FileUploadService, notifications: NotificationsService, wallet: WalletService, logger: Logger);
    raiseDispute(userId: string, dto: RaiseDisputeDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: DisputeStatus;
        description: string | null;
        jobId: string;
        bookingId: string;
        reason: string;
        raisedById: string;
        opponentId: string;
        resolution: DisputeResolution | null;
        refundAmount: import("@prisma/client/runtime/library").Decimal | null;
        evidenceCount: number;
        resolvedAt: Date | null;
        resolvedBy: string | null;
    }>;
    uploadEvidence(userId: string, disputeId: string, file: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        disputeId: string;
        uploaderId: string;
        type: DisputeEvidenceType;
        fileUrl: string;
        mimeType: string;
        size: number;
    }>;
    getDispute(userId: string, disputeId: string): Promise<{
        booking: {
            job: {
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
                images: {
                    id: string;
                    createdAt: Date;
                    imageUrl: string;
                    jobId: string;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                address: string;
                status: JobStatus;
                expiresAt: Date;
                description: string;
                categoryId: string;
                customerId: string;
                title: string;
                latitude: number;
                longitude: number;
                offeredPrice: import("@prisma/client/runtime/library").Decimal;
                preferredSchedule: Date | null;
                additionalNotes: string | null;
            };
            customer: {
                id: string;
                fullName: string;
                phone: string;
                profilePhoto: string | null;
            };
            provider: {
                id: string;
                fullName: string;
                phone: string;
                profilePhoto: string | null;
                providerProfile: {
                    bio: string | null;
                    hourlyRate: import("@prisma/client/runtime/library").Decimal | null;
                    serviceLocation: string | null;
                } | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: BookingStatus;
            providerId: string;
            jobId: string;
            customerId: string;
            bookingType: import("generated/prisma/client").BookingType;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            acceptedAt: Date | null;
            startedAt: Date | null;
            completedAt: Date | null;
            confirmedAt: Date | null;
            cancelledAt: Date | null;
        };
        timeline: ({
            actor: {
                id: string;
                fullName: string;
                role: UserRole;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            description: string | null;
            disputeId: string;
            actorId: string | null;
            action: string;
        })[];
        raisedBy: {
            id: string;
            fullName: string;
            role: UserRole;
        };
        opponent: {
            id: string;
            fullName: string;
            role: UserRole;
        };
        evidences: ({
            uploader: {
                id: string;
                fullName: string;
                role: UserRole;
            };
        } & {
            id: string;
            createdAt: Date;
            disputeId: string;
            uploaderId: string;
            type: DisputeEvidenceType;
            fileUrl: string;
            mimeType: string;
            size: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: DisputeStatus;
        description: string | null;
        jobId: string;
        bookingId: string;
        reason: string;
        raisedById: string;
        opponentId: string;
        resolution: DisputeResolution | null;
        refundAmount: import("@prisma/client/runtime/library").Decimal | null;
        evidenceCount: number;
        resolvedAt: Date | null;
        resolvedBy: string | null;
    }>;
    listMyDisputes(userId: string, query: DisputeQueryDto): Promise<{
        data: ({
            booking: {
                id: string;
                status: BookingStatus;
                totalAmount: import("@prisma/client/runtime/library").Decimal;
            };
            job: {
                id: string;
                status: JobStatus;
                title: string;
            };
            raisedBy: {
                id: string;
                fullName: string;
                role: UserRole;
            };
            opponent: {
                id: string;
                fullName: string;
                role: UserRole;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: DisputeStatus;
            description: string | null;
            jobId: string;
            bookingId: string;
            reason: string;
            raisedById: string;
            opponentId: string;
            resolution: DisputeResolution | null;
            refundAmount: import("@prisma/client/runtime/library").Decimal | null;
            evidenceCount: number;
            resolvedAt: Date | null;
            resolvedBy: string | null;
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
    respond(userId: string, disputeId: string, dto: RespondDisputeDto): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        disputeId: string;
        actorId: string | null;
        action: string;
    }>;
    getDisputeHistory(userId: string, disputeId: string): Promise<({
        actor: {
            id: string;
            fullName: string;
            role: UserRole;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        description: string | null;
        disputeId: string;
        actorId: string | null;
        action: string;
    })[]>;
    adminListDisputes(query: DisputeQueryDto): Promise<{
        data: ({
            booking: {
                id: string;
                status: BookingStatus;
                totalAmount: import("@prisma/client/runtime/library").Decimal;
            };
            job: {
                id: string;
                title: string;
            };
            _count: {
                evidences: number;
            };
            raisedBy: {
                id: string;
                fullName: string;
                role: UserRole;
            };
            opponent: {
                id: string;
                fullName: string;
                role: UserRole;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: DisputeStatus;
            description: string | null;
            jobId: string;
            bookingId: string;
            reason: string;
            raisedById: string;
            opponentId: string;
            resolution: DisputeResolution | null;
            refundAmount: import("@prisma/client/runtime/library").Decimal | null;
            evidenceCount: number;
            resolvedAt: Date | null;
            resolvedBy: string | null;
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
    adminGetDispute(disputeId: string): Promise<{
        booking: {
            job: {
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
                images: {
                    id: string;
                    createdAt: Date;
                    imageUrl: string;
                    jobId: string;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                address: string;
                status: JobStatus;
                expiresAt: Date;
                description: string;
                categoryId: string;
                customerId: string;
                title: string;
                latitude: number;
                longitude: number;
                offeredPrice: import("@prisma/client/runtime/library").Decimal;
                preferredSchedule: Date | null;
                additionalNotes: string | null;
            };
            customer: {
                id: string;
                fullName: string;
                phone: string;
                profilePhoto: string | null;
            };
            provider: {
                id: string;
                fullName: string;
                phone: string;
                profilePhoto: string | null;
                providerProfile: {
                    bio: string | null;
                    hourlyRate: import("@prisma/client/runtime/library").Decimal | null;
                    serviceLocation: string | null;
                } | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: BookingStatus;
            providerId: string;
            jobId: string;
            customerId: string;
            bookingType: import("generated/prisma/client").BookingType;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            acceptedAt: Date | null;
            startedAt: Date | null;
            completedAt: Date | null;
            confirmedAt: Date | null;
            cancelledAt: Date | null;
        };
        timeline: ({
            actor: {
                id: string;
                fullName: string;
                role: UserRole;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            description: string | null;
            disputeId: string;
            actorId: string | null;
            action: string;
        })[];
        raisedBy: {
            id: string;
            fullName: string;
            role: UserRole;
        };
        opponent: {
            id: string;
            fullName: string;
            role: UserRole;
        };
        evidences: ({
            uploader: {
                id: string;
                fullName: string;
                role: UserRole;
            };
        } & {
            id: string;
            createdAt: Date;
            disputeId: string;
            uploaderId: string;
            type: DisputeEvidenceType;
            fileUrl: string;
            mimeType: string;
            size: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: DisputeStatus;
        description: string | null;
        jobId: string;
        bookingId: string;
        reason: string;
        raisedById: string;
        opponentId: string;
        resolution: DisputeResolution | null;
        refundAmount: import("@prisma/client/runtime/library").Decimal | null;
        evidenceCount: number;
        resolvedAt: Date | null;
        resolvedBy: string | null;
    }>;
    adminListEvidence(disputeId: string): Promise<({
        uploader: {
            id: string;
            fullName: string;
            role: UserRole;
        };
    } & {
        id: string;
        createdAt: Date;
        disputeId: string;
        uploaderId: string;
        type: DisputeEvidenceType;
        fileUrl: string;
        mimeType: string;
        size: number;
    })[]>;
    adminGetTimeline(disputeId: string): Promise<({
        actor: {
            id: string;
            fullName: string;
            role: UserRole;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        description: string | null;
        disputeId: string;
        actorId: string | null;
        action: string;
    })[]>;
    adminGetChatHistory(disputeId: string, page?: number, limit?: number): Promise<{
        conversation: null;
        data: never[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    } | {
        conversation: {
            id: string;
            jobId: string;
        };
        data: ({
            sender: {
                id: string;
                fullName: string;
                role: UserRole;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            latitude: number | null;
            longitude: number | null;
            type: import("generated/prisma/client").MessageType;
            conversationId: string;
            senderId: string;
            content: string | null;
            attachmentUrl: string | null;
            deliveredAt: Date | null;
            readAt: Date | null;
            editedAt: Date | null;
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
    adminUpdateStatus(adminId: string, disputeId: string, dto: UpdateDisputeStatusDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: DisputeStatus;
        description: string | null;
        jobId: string;
        bookingId: string;
        reason: string;
        raisedById: string;
        opponentId: string;
        resolution: DisputeResolution | null;
        refundAmount: import("@prisma/client/runtime/library").Decimal | null;
        evidenceCount: number;
        resolvedAt: Date | null;
        resolvedBy: string | null;
    }>;
    adminResolve(adminId: string, disputeId: string, dto: ResolveDisputeDto): Promise<{
        message: string;
        dispute: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: DisputeStatus;
            description: string | null;
            jobId: string;
            bookingId: string;
            reason: string;
            raisedById: string;
            opponentId: string;
            resolution: DisputeResolution | null;
            refundAmount: import("@prisma/client/runtime/library").Decimal | null;
            evidenceCount: number;
            resolvedAt: Date | null;
            resolvedBy: string | null;
        };
    }>;
    adminReject(adminId: string, disputeId: string, reason: string): Promise<{
        message: string;
        dispute: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: DisputeStatus;
            description: string | null;
            jobId: string;
            bookingId: string;
            reason: string;
            raisedById: string;
            opponentId: string;
            resolution: DisputeResolution | null;
            refundAmount: import("@prisma/client/runtime/library").Decimal | null;
            evidenceCount: number;
            resolvedAt: Date | null;
            resolvedBy: string | null;
        };
    }>;
    private assertPartyAccess;
    private ensureDisputeExists;
    private disputeWithDetails;
    private notifyParties;
    private mapEvidenceType;
    assertAdminRole(role: UserRole): void;
}
