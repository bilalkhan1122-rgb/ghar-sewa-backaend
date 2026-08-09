import { PenaltiesService } from './penalties.service';
import { AdminAuditService } from 'src/common/services/admin-audit.service';
import { PenaltyQueryDto, AppealQueryDto } from './dtos/penalty-query.dto';
import { ApproveAppealDto, RejectAppealDto } from './dtos/review-appeal.dto';
export declare class AdminPenaltiesController {
    private readonly penaltiesService;
    private readonly audit;
    constructor(penaltiesService: PenaltiesService, audit: AdminAuditService);
    listAllPenalties(query: PenaltyQueryDto): Promise<{
        data: ({
            appeals: {
                id: string;
                createdAt: Date;
                status: import("generated/prisma/client").AppealStatus;
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
    getProviderPenalties(providerId: string, query: PenaltyQueryDto): Promise<{
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
    listAppeals(query: AppealQueryDto): Promise<{
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
    getAppeal(id: string): Promise<{
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
    approveAppeal(adminId: string, id: string, dto: ApproveAppealDto): Promise<{
        message: string;
        appealId: string;
    }>;
    rejectAppeal(adminId: string, id: string, dto: RejectAppealDto): Promise<{
        message: string;
        appealId: string;
    }>;
}
