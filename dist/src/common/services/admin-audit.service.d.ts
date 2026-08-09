import { PrismaService } from 'src/prisma/prisma.service';
export interface AdminAuditInput {
    adminId: string;
    action: string;
    entityType: string;
    entityId?: string | null;
    previousValues?: Record<string, unknown> | null;
    newValues?: Record<string, unknown> | null;
    ipAddress?: string | null;
    userAgent?: string | null;
}
export interface AdminAuditQuery {
    page?: number;
    limit?: number;
    adminId?: string;
    action?: string;
    entityType?: string;
    dateFrom?: string;
    dateTo?: string;
}
export declare class AdminAuditService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    record(input: AdminAuditInput): Promise<void>;
    recordFromRequest(req: {
        ip?: string;
        headers?: Record<string, string | undefined>;
    }, input: Omit<AdminAuditInput, 'ipAddress' | 'userAgent'>): Promise<void>;
    list(query: AdminAuditQuery): Promise<{
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
