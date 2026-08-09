import { PenaltiesService } from './penalties.service';
import { CreateAppealDto } from './dtos/create-appeal.dto';
import { PenaltyQueryDto, AppealQueryDto } from './dtos/penalty-query.dto';
export declare class ProviderPenaltiesController {
    private readonly penaltiesService;
    constructor(penaltiesService: PenaltiesService);
    listPenalties(userId: string, query: PenaltyQueryDto): Promise<{
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
            penaltyType: import("generated/prisma/client").PenaltyType;
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
    getActivePenalties(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        providerId: string;
        reason: string;
        penaltyType: import("generated/prisma/client").PenaltyType;
        startDate: Date;
        endDate: Date | null;
        active: boolean;
    }[]>;
    listCancellations(userId: string, query: PenaltyQueryDto): Promise<{
        data: ({
            penalty: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                providerId: string;
                reason: string;
                penaltyType: import("generated/prisma/client").PenaltyType;
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
            cancellationType: import("generated/prisma/client").CancellationType;
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
    createAppeal(userId: string, dto: CreateAppealDto, file?: Express.Multer.File): Promise<{
        penalty: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            providerId: string;
            reason: string;
            penaltyType: import("generated/prisma/client").PenaltyType;
            startDate: Date;
            endDate: Date | null;
            active: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").AppealStatus;
        providerId: string;
        penaltyId: string;
        reviewedAt: Date | null;
        reviewedBy: string | null;
        explanation: string;
        supportingFile: string | null;
        adminNote: string | null;
    }>;
    listAppeals(userId: string, query: AppealQueryDto): Promise<{
        data: ({
            penalty: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                providerId: string;
                reason: string;
                penaltyType: import("generated/prisma/client").PenaltyType;
                startDate: Date;
                endDate: Date | null;
                active: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("generated/prisma/client").AppealStatus;
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
    getAppeal(userId: string, id: string): Promise<{
        penalty: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            providerId: string;
            reason: string;
            penaltyType: import("generated/prisma/client").PenaltyType;
            startDate: Date;
            endDate: Date | null;
            active: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").AppealStatus;
        providerId: string;
        penaltyId: string;
        reviewedAt: Date | null;
        reviewedBy: string | null;
        explanation: string;
        supportingFile: string | null;
        adminNote: string | null;
    }>;
}
