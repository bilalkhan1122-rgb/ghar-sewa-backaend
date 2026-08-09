"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminNotificationsService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const prisma_service_1 = require("../../prisma/prisma.service");
const admin_audit_service_1 = require("../../common/services/admin-audit.service");
const notifications_service_1 = require("../notifications/notifications.service");
const client_1 = require("../../../generated/prisma/client");
let AdminNotificationsService = class AdminNotificationsService {
    prisma;
    notifications;
    audit;
    logger;
    constructor(prisma, notifications, audit, logger) {
        this.prisma = prisma;
        this.notifications = notifications;
        this.audit = audit;
        this.logger = logger;
    }
    async sendToUser(adminId, dto) {
        this.assertNotScheduled(dto.scheduledAt);
        const user = await this.prisma.user.findUnique({
            where: { id: dto.userId },
            select: { id: true, isActive: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('Recipient user not found');
        }
        if (!user.isActive) {
            throw new common_1.BadRequestException('Cannot notify a deleted user');
        }
        const notification = await this.notifications.send({
            userId: dto.userId,
            type: dto.type,
            title: dto.title,
            message: dto.message,
            force: true,
        });
        await this.audit.record({
            adminId,
            action: 'NOTIFICATION_SENT',
            entityType: 'USER',
            entityId: dto.userId,
            newValues: { type: dto.type, title: dto.title },
        });
        return {
            message: 'Notification sent',
            notificationId: notification?.id ?? null,
        };
    }
    async sendToRole(adminId, dto) {
        this.assertNotScheduled(dto.scheduledAt);
        if (dto.role === client_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Cannot broadcast to admins via this endpoint');
        }
        const userIds = await this.prisma.user.findMany({
            where: { role: dto.role, isActive: true, deletedAt: null },
            select: { id: true },
        });
        const inputs = userIds.map((u) => ({
            userId: u.id,
            type: dto.type,
            title: dto.title,
            message: dto.message,
            force: true,
        }));
        await this.sendChunked(inputs);
        await this.audit.record({
            adminId,
            action: 'NOTIFICATION_SENT_TO_ROLE',
            entityType: 'ROLE',
            entityId: dto.role,
            newValues: {
                type: dto.type,
                title: dto.title,
                recipients: userIds.length,
            },
        });
        this.logger.log({
            message: 'Notification sent to role',
            adminId,
            role: dto.role,
            recipients: userIds.length,
        });
        return { message: 'Notification sent', recipients: userIds.length };
    }
    async broadcast(adminId, dto) {
        this.assertNotScheduled(dto.scheduledAt);
        const userIds = await this.prisma.user.findMany({
            where: { isActive: true, deletedAt: null },
            select: { id: true },
        });
        const inputs = userIds.map((u) => ({
            userId: u.id,
            type: dto.type,
            title: dto.title,
            message: dto.message,
            force: true,
        }));
        await this.sendChunked(inputs);
        await this.audit.record({
            adminId,
            action: 'NOTIFICATION_BROADCAST',
            entityType: 'SYSTEM',
            newValues: {
                type: dto.type,
                title: dto.title,
                recipients: userIds.length,
            },
        });
        this.logger.log({
            message: 'Broadcast notification sent',
            adminId,
            recipients: userIds.length,
        });
        return { message: 'Broadcast sent', recipients: userIds.length };
    }
    async sendChunked(inputs) {
        const CHUNK_SIZE = 100;
        for (let i = 0; i < inputs.length; i += CHUNK_SIZE) {
            await this.notifications.sendToMany(inputs.slice(i, i + CHUNK_SIZE));
        }
    }
    assertNotScheduled(scheduledAt) {
        if (scheduledAt && new Date(scheduledAt).getTime() > Date.now()) {
            throw new common_1.NotImplementedException('Scheduled notifications are not yet available. Send now or omit scheduledAt.');
        }
    }
};
exports.AdminNotificationsService = AdminNotificationsService;
exports.AdminNotificationsService = AdminNotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService,
        admin_audit_service_1.AdminAuditService,
        nestjs_pino_1.Logger])
], AdminNotificationsService);
//# sourceMappingURL=admin-notifications.service.js.map