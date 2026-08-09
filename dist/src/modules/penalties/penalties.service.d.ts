import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateAppealDto } from './dtos/create-appeal.dto';
import { PenaltyQueryDto, AppealQueryDto } from './dtos/penalty-query.dto';
import { Logger } from 'nestjs-pino';
import { PenaltyType, AppealStatus, CancellationType } from 'generated/prisma/client';
export declare const PENALTY_WINDOW_DAYS = 30;
export declare const SUSPENSION_DAYS = 7;
export declare class PenaltiesService {
    private readonly prisma;
    private readonly fileUpload;
    private readonly notifications;
    private readonly logger;
    constructor(prisma: PrismaService, fileUpload: FileUploadService, notifications: NotificationsService, logger: Logger);
    evaluateProviderCancellation(providerId: string, cancellationId: string, reason: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        providerId: string;
        reason: string;
        penaltyType: PenaltyType;
        startDate: Date;
        endDate: Date | null;
        active: boolean;
    }>;
    assertProviderEligible(providerId: string): Promise<void>;
    expireSuspensions(): Promise<number>;
    private liftSuspension;
    listProviderPenalties(providerId: string, query: PenaltyQueryDto): Promise<{
        data: ({
            cancellations: {
                id: string;
                createdAt: Date;
                bookingId: string | null;
                reason: string | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            providerId: string;
            reason: string;
            penaltyType: PenaltyType;
            startDate: Date;
            endDate: Date | null;
            active: boolean;
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
    getActivePenalties(providerId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        providerId: string;
        reason: string;
        penaltyType: PenaltyType;
        startDate: Date;
        endDate: Date | null;
        active: boolean;
    }[]>;
    listProviderCancellations(providerId: string, query: PenaltyQueryDto): Promise<{
        data: ({
            penalty: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                providerId: string;
                reason: string;
                penaltyType: PenaltyType;
                startDate: Date;
                endDate: Date | null;
                active: boolean;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            jobId: string | null;
            bookingId: string | null;
            cancelledBy: string;
            cancellationType: CancellationType;
            penaltyApplied: boolean;
            penaltyId: string | null;
            reason: string | null;
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
    createAppeal(providerId: string, dto: CreateAppealDto, file?: Express.Multer.File): Promise<{
        penalty: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            providerId: string;
            reason: string;
            penaltyType: PenaltyType;
            startDate: Date;
            endDate: Date | null;
            active: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: AppealStatus;
        providerId: string;
        penaltyId: string;
        reviewedAt: Date | null;
        reviewedBy: string | null;
        explanation: string;
        supportingFile: string | null;
        adminNote: string | null;
    }>;
    getMyAppeal(providerId: string, appealId: string): Promise<{
        penalty: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            providerId: string;
            reason: string;
            penaltyType: PenaltyType;
            startDate: Date;
            endDate: Date | null;
            active: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: AppealStatus;
        providerId: string;
        penaltyId: string;
        reviewedAt: Date | null;
        reviewedBy: string | null;
        explanation: string;
        supportingFile: string | null;
        adminNote: string | null;
    }>;
    listMyAppeals(providerId: string, query: AppealQueryDto): Promise<{
        data: ({
            penalty: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                providerId: string;
                reason: string;
                penaltyType: PenaltyType;
                startDate: Date;
                endDate: Date | null;
                active: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: AppealStatus;
            providerId: string;
            penaltyId: string;
            reviewedAt: Date | null;
            reviewedBy: string | null;
            explanation: string;
            supportingFile: string | null;
            adminNote: string | null;
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
    adminListAppeals(query: AppealQueryDto): Promise<{
        data: ({
            provider: {
                id: string;
                fullName: string;
                phone: string;
                email: string;
            };
            penalty: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                providerId: string;
                reason: string;
                penaltyType: PenaltyType;
                startDate: Date;
                endDate: Date | null;
                active: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: AppealStatus;
            providerId: string;
            penaltyId: string;
            reviewedAt: Date | null;
            reviewedBy: string | null;
            explanation: string;
            supportingFile: string | null;
            adminNote: string | null;
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
    adminGetAppeal(appealId: string): Promise<{
        provider: {
            id: string;
            fullName: string;
            phone: string;
            email: string;
        };
        penalty: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            providerId: string;
            reason: string;
            penaltyType: PenaltyType;
            startDate: Date;
            endDate: Date | null;
            active: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: AppealStatus;
        providerId: string;
        penaltyId: string;
        reviewedAt: Date | null;
        reviewedBy: string | null;
        explanation: string;
        supportingFile: string | null;
        adminNote: string | null;
    }>;
    adminApproveAppeal(adminId: string, appealId: string, note?: string): Promise<{
        message: string;
        appealId: string;
    }>;
    adminRejectAppeal(adminId: string, appealId: string, note: string): Promise<{
        message: string;
        appealId: string;
    }>;
    adminListAllPenalties(query: PenaltyQueryDto): Promise<{
        data: ({
            appeals: {
                id: string;
                createdAt: Date;
                status: AppealStatus;
            }[];
            provider: {
                id: string;
                fullName: string;
                phone: string;
                email: string;
            };
            cancellations: {
                id: string;
                createdAt: Date;
                bookingId: string | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            providerId: string;
            reason: string;
            penaltyType: PenaltyType;
            startDate: Date;
            endDate: Date | null;
            active: boolean;
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
    adminGetProviderPenalties(providerId: string, query: PenaltyQueryDto): Promise<{
        data: ({
            cancellations: {
                id: string;
                createdAt: Date;
                bookingId: string | null;
                reason: string | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            providerId: string;
            reason: string;
            penaltyType: PenaltyType;
            startDate: Date;
            endDate: Date | null;
            active: boolean;
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
}
