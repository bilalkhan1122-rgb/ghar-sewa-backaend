import { AdminAuditService } from 'src/common/services/admin-audit.service';
import { AdminAuditQueryDto } from './dtos/admin-audit-query.dto';
export declare class AdminAuditController {
    private readonly auditService;
    constructor(auditService: AdminAuditService);
    list(query: AdminAuditQueryDto): Promise<{
        data: ({
            admin: {
                id: string;
                fullName: string;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            ipAddress: string | null;
            action: string;
            previousValues: import("@prisma/client/runtime/library").JsonValue | null;
            newValues: import("@prisma/client/runtime/library").JsonValue | null;
            adminId: string;
            entityType: string;
            entityId: string | null;
            userAgent: string | null;
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
    getById(id: string): Promise<{
        admin: {
            id: string;
            fullName: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        ipAddress: string | null;
        action: string;
        previousValues: import("@prisma/client/runtime/library").JsonValue | null;
        newValues: import("@prisma/client/runtime/library").JsonValue | null;
        adminId: string;
        entityType: string;
        entityId: string | null;
        userAgent: string | null;
    }>;
}
