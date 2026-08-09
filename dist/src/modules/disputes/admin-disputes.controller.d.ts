import { DisputesService } from './disputes.service';
import { AdminAuditService } from 'src/common/services/admin-audit.service';
import { UserRole } from 'generated/prisma/client';
import { DisputeQueryDto } from './dtos/dispute-query.dto';
import { ResolveDisputeDto } from './dtos/resolve-dispute.dto';
import { UpdateDisputeStatusDto } from './dtos/update-dispute-status.dto';
import { RejectDisputeDto } from './dtos/reject-dispute.dto';
export declare class AdminDisputesController {
    private readonly disputesService;
    private readonly audit;
    constructor(disputesService: DisputesService, audit: AdminAuditService);
    list(query: DisputeQueryDto): Promise<{
        data: ({
            booking: {
                id: string;
                status: import("generated/prisma/client").BookingStatus;
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
            status: import("generated/prisma/client").DisputeStatus;
            description: string | null;
            jobId: string;
            bookingId: string;
            reason: string;
            raisedById: string;
            opponentId: string;
            resolution: import("generated/prisma/client").DisputeResolution | null;
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
    get(id: string): Promise<{
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
                status: import("generated/prisma/client").JobStatus;
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
            status: import("generated/prisma/client").BookingStatus;
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
            type: import("generated/prisma/client").DisputeEvidenceType;
            fileUrl: string;
            mimeType: string;
            size: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").DisputeStatus;
        description: string | null;
        jobId: string;
        bookingId: string;
        reason: string;
        raisedById: string;
        opponentId: string;
        resolution: import("generated/prisma/client").DisputeResolution | null;
        refundAmount: import("@prisma/client/runtime/library").Decimal | null;
        evidenceCount: number;
        resolvedAt: Date | null;
        resolvedBy: string | null;
    }>;
    getEvidence(id: string): Promise<({
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
        type: import("generated/prisma/client").DisputeEvidenceType;
        fileUrl: string;
        mimeType: string;
        size: number;
    })[]>;
    getTimeline(id: string): Promise<({
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
    getChat(id: string, query: DisputeQueryDto): Promise<{
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
    updateStatus(adminId: string, id: string, dto: UpdateDisputeStatusDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").DisputeStatus;
        description: string | null;
        jobId: string;
        bookingId: string;
        reason: string;
        raisedById: string;
        opponentId: string;
        resolution: import("generated/prisma/client").DisputeResolution | null;
        refundAmount: import("@prisma/client/runtime/library").Decimal | null;
        evidenceCount: number;
        resolvedAt: Date | null;
        resolvedBy: string | null;
    }>;
    resolve(adminId: string, id: string, dto: ResolveDisputeDto): Promise<{
        message: string;
        dispute: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("generated/prisma/client").DisputeStatus;
            description: string | null;
            jobId: string;
            bookingId: string;
            reason: string;
            raisedById: string;
            opponentId: string;
            resolution: import("generated/prisma/client").DisputeResolution | null;
            refundAmount: import("@prisma/client/runtime/library").Decimal | null;
            evidenceCount: number;
            resolvedAt: Date | null;
            resolvedBy: string | null;
        };
    }>;
    reject(adminId: string, id: string, dto: RejectDisputeDto): Promise<{
        message: string;
        dispute: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("generated/prisma/client").DisputeStatus;
            description: string | null;
            jobId: string;
            bookingId: string;
            reason: string;
            raisedById: string;
            opponentId: string;
            resolution: import("generated/prisma/client").DisputeResolution | null;
            refundAmount: import("@prisma/client/runtime/library").Decimal | null;
            evidenceCount: number;
            resolvedAt: Date | null;
            resolvedBy: string | null;
        };
    }>;
}
