import { Logger } from 'nestjs-pino';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { AdminAuditService } from 'src/common/services/admin-audit.service';
import { NotificationsService } from '../notifications/notifications.service';
import { WalletService } from './wallet.service';
import { CreateTopUpDto } from './dtos/create-topup.dto';
import { TopUpQueryDto } from './dtos/topup-query.dto';
import { TopUpStatus } from 'generated/prisma/client';
export declare class TopUpsService {
    private readonly prisma;
    private readonly fileUpload;
    private readonly notifications;
    private readonly wallet;
    private readonly logger;
    private readonly adminAudit;
    constructor(prisma: PrismaService, fileUpload: FileUploadService, notifications: NotificationsService, wallet: WalletService, logger: Logger, adminAudit: AdminAuditService);
    submitTopUp(userId: string, dto: CreateTopUpDto, file?: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: TopUpStatus;
        userId: string;
        submittedAt: Date;
        reviewedAt: Date | null;
        reviewedBy: string | null;
        rejectionReason: string | null;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: import("generated/prisma/client").PaymentMethod;
        transactionReference: string | null;
        proofImage: string | null;
        notes: string | null;
    }>;
    listMyTopUps(userId: string, query: TopUpQueryDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: TopUpStatus;
            userId: string;
            submittedAt: Date;
            reviewedAt: Date | null;
            reviewedBy: string | null;
            rejectionReason: string | null;
            walletId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            paymentMethod: import("generated/prisma/client").PaymentMethod;
            transactionReference: string | null;
            proofImage: string | null;
            notes: string | null;
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
    getMyTopUp(userId: string, topUpId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: TopUpStatus;
        userId: string;
        submittedAt: Date;
        reviewedAt: Date | null;
        reviewedBy: string | null;
        rejectionReason: string | null;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: import("generated/prisma/client").PaymentMethod;
        transactionReference: string | null;
        proofImage: string | null;
        notes: string | null;
    }>;
    adminListTopUps(query: TopUpQueryDto): Promise<{
        data: ({
            user: {
                id: string;
                fullName: string;
                phone: string;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: TopUpStatus;
            userId: string;
            submittedAt: Date;
            reviewedAt: Date | null;
            reviewedBy: string | null;
            rejectionReason: string | null;
            walletId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            paymentMethod: import("generated/prisma/client").PaymentMethod;
            transactionReference: string | null;
            proofImage: string | null;
            notes: string | null;
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
    adminGetTopUp(topUpId: string): Promise<{
        user: {
            id: string;
            fullName: string;
            phone: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: TopUpStatus;
        userId: string;
        submittedAt: Date;
        reviewedAt: Date | null;
        reviewedBy: string | null;
        rejectionReason: string | null;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: import("generated/prisma/client").PaymentMethod;
        transactionReference: string | null;
        proofImage: string | null;
        notes: string | null;
    }>;
    adminApproveTopUp(adminId: string, topUpId: string, note?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: TopUpStatus;
        userId: string;
        submittedAt: Date;
        reviewedAt: Date | null;
        reviewedBy: string | null;
        rejectionReason: string | null;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: import("generated/prisma/client").PaymentMethod;
        transactionReference: string | null;
        proofImage: string | null;
        notes: string | null;
    }>;
    adminRejectTopUp(adminId: string, topUpId: string, reason: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: TopUpStatus;
        userId: string;
        submittedAt: Date;
        reviewedAt: Date | null;
        reviewedBy: string | null;
        rejectionReason: string | null;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: import("generated/prisma/client").PaymentMethod;
        transactionReference: string | null;
        proofImage: string | null;
        notes: string | null;
    }>;
}
