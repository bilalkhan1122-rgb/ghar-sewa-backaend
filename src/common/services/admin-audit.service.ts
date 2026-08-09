import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';

export interface AdminAuditInput {
  /** Admin user id (matches JWT sub). */
  adminId: string;
  /** Action verb, e.g. USER_SUSPENDED, WALLET_ADJUSTED. */
  action: string;
  /** Entity type, e.g. USER, PROVIDER, JOB, BOOKING, DISPUTE, WALLET. */
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

/**
 * Module 17 — Admin Audit Logs.
 *
 * Immutable record of every admin action. Records are only ever created
 * and read — there is deliberately no update/delete path exposed.
 */
@Injectable()
export class AdminAuditService {
  constructor(private readonly prisma: PrismaService) {}

  async record(input: AdminAuditInput) {
    await this.prisma.adminAuditLog.create({
      data: {
        adminId: input.adminId,
        action: input.action,
        entityType: input.entityType,
        entityId: input.entityId ?? null,
        previousValues:
          (input.previousValues as Prisma.InputJsonValue) ?? Prisma.JsonNull,
        newValues:
          (input.newValues as Prisma.InputJsonValue) ?? Prisma.JsonNull,
        ipAddress: input.ipAddress ?? null,
        userAgent: input.userAgent ?? null,
      },
    });
  }

  /**
   * Convenience wrapper that captures the caller's IP + user-agent from an
   * Express request so controllers don't have to.
   */
  recordFromRequest(
    req: { ip?: string; headers?: Record<string, string | undefined> },
    input: Omit<AdminAuditInput, 'ipAddress' | 'userAgent'>,
  ) {
    return this.record({
      ...input,
      ipAddress: req.ip ?? null,
      userAgent: req.headers?.['user-agent'] ?? null,
    });
  }

  async list(query: AdminAuditQuery) {
    const {
      page = 1,
      limit = 10,
      adminId,
      action,
      entityType,
      dateFrom,
      dateTo,
    } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.AdminAuditLogWhereInput = {
      ...(adminId && { adminId }),
      ...(action && { action }),
      ...(entityType && { entityType }),
      ...(dateFrom || dateTo
        ? {
            createdAt: {
              ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
              ...(dateTo
                ? { lte: new Date(new Date(dateTo).setHours(23, 59, 59, 999)) }
                : {}),
            },
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.adminAuditLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          admin: { select: { id: true, fullName: true, email: true } },
        },
      }),
      this.prisma.adminAuditLog.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);
    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  async getById(id: string) {
    const log = await this.prisma.adminAuditLog.findUnique({
      where: { id },
      include: {
        admin: { select: { id: true, fullName: true, email: true } },
      },
    });
    if (!log) {
      throw new NotFoundException('Audit log entry not found');
    }
    return log;
  }
}
