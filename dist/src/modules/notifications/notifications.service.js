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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const push_delivery_service_1 = require("./push-delivery.service");
const nestjs_pino_1 = require("nestjs-pino");
const client_1 = require("../../../generated/prisma/client");
const CATEGORY_TO_PREFERENCE = {
    [client_1.NotificationCategory.JOB]: 'jobEnabled',
    [client_1.NotificationCategory.BID]: 'jobEnabled',
    [client_1.NotificationCategory.BOOKING]: 'bookingEnabled',
    [client_1.NotificationCategory.REVIEW]: 'bookingEnabled',
    [client_1.NotificationCategory.VERIFICATION]: 'systemEnabled',
    [client_1.NotificationCategory.WALLET]: 'systemEnabled',
    [client_1.NotificationCategory.DISPUTE]: 'systemEnabled',
    [client_1.NotificationCategory.PENALTY]: 'systemEnabled',
    [client_1.NotificationCategory.SYSTEM]: 'systemEnabled',
    [client_1.NotificationCategory.MARKETING]: 'marketingEnabled',
};
const TYPE_TO_CATEGORY = {
    [client_1.NotificationType.WELCOME]: client_1.NotificationCategory.SYSTEM,
    [client_1.NotificationType.NEW_JOB]: client_1.NotificationCategory.JOB,
    [client_1.NotificationType.JOB_ACCEPTED]: client_1.NotificationCategory.JOB,
    [client_1.NotificationType.NEW_BID]: client_1.NotificationCategory.BID,
    [client_1.NotificationType.BID_ACCEPTED]: client_1.NotificationCategory.BID,
    [client_1.NotificationType.BID_REJECTED]: client_1.NotificationCategory.BID,
    [client_1.NotificationType.BOOKING_CONFIRMED]: client_1.NotificationCategory.BOOKING,
    [client_1.NotificationType.JOB_STARTED]: client_1.NotificationCategory.BOOKING,
    [client_1.NotificationType.JOB_COMPLETED]: client_1.NotificationCategory.BOOKING,
    [client_1.NotificationType.COMPLETION_CONFIRMED]: client_1.NotificationCategory.BOOKING,
    [client_1.NotificationType.JOB_CANCELLED]: client_1.NotificationCategory.JOB,
    [client_1.NotificationType.JOB_EXPIRED]: client_1.NotificationCategory.JOB,
    [client_1.NotificationType.REVIEW_RECEIVED]: client_1.NotificationCategory.REVIEW,
    [client_1.NotificationType.VERIFICATION_SUBMITTED]: client_1.NotificationCategory.VERIFICATION,
    [client_1.NotificationType.VERIFICATION_RESUBMITTED]: client_1.NotificationCategory.VERIFICATION,
    [client_1.NotificationType.VERIFICATION_APPROVED]: client_1.NotificationCategory.VERIFICATION,
    [client_1.NotificationType.VERIFICATION_REJECTED]: client_1.NotificationCategory.VERIFICATION,
    [client_1.NotificationType.VERIFICATION_BANNED]: client_1.NotificationCategory.VERIFICATION,
    [client_1.NotificationType.VERIFICATION_UNBANNED]: client_1.NotificationCategory.VERIFICATION,
    [client_1.NotificationType.WALLET_UPDATED]: client_1.NotificationCategory.WALLET,
    [client_1.NotificationType.WITHDRAWAL_PROCESSED]: client_1.NotificationCategory.WALLET,
    [client_1.NotificationType.DISPUTE_RAISED]: client_1.NotificationCategory.DISPUTE,
    [client_1.NotificationType.DISPUTE_RESPONSE_RECEIVED]: client_1.NotificationCategory.DISPUTE,
    [client_1.NotificationType.DISPUTE_STATUS_UPDATED]: client_1.NotificationCategory.DISPUTE,
    [client_1.NotificationType.DISPUTE_RESOLVED]: client_1.NotificationCategory.DISPUTE,
    [client_1.NotificationType.DISPUTE_REJECTED]: client_1.NotificationCategory.DISPUTE,
    [client_1.NotificationType.PENALTY_WARNING]: client_1.NotificationCategory.PENALTY,
    [client_1.NotificationType.PENALTY_SUSPENSION_STARTED]: client_1.NotificationCategory.PENALTY,
    [client_1.NotificationType.PENALTY_SUSPENSION_ENDED]: client_1.NotificationCategory.PENALTY,
    [client_1.NotificationType.PENALTY_PERMANENT_BAN]: client_1.NotificationCategory.PENALTY,
    [client_1.NotificationType.APPEAL_APPROVED]: client_1.NotificationCategory.PENALTY,
    [client_1.NotificationType.APPEAL_REJECTED]: client_1.NotificationCategory.PENALTY,
    [client_1.NotificationType.WALLET_TOPUP_SUBMITTED]: client_1.NotificationCategory.WALLET,
    [client_1.NotificationType.WALLET_TOPUP_APPROVED]: client_1.NotificationCategory.WALLET,
    [client_1.NotificationType.WALLET_TOPUP_REJECTED]: client_1.NotificationCategory.WALLET,
    [client_1.NotificationType.JOB_PAYMENT_COMPLETED]: client_1.NotificationCategory.WALLET,
    [client_1.NotificationType.REFUND_RECEIVED]: client_1.NotificationCategory.WALLET,
    [client_1.NotificationType.WITHDRAWAL_REQUEST_SUBMITTED]: client_1.NotificationCategory.WALLET,
    [client_1.NotificationType.WITHDRAWAL_APPROVED]: client_1.NotificationCategory.WALLET,
    [client_1.NotificationType.WITHDRAWAL_PROCESSING]: client_1.NotificationCategory.WALLET,
    [client_1.NotificationType.WITHDRAWAL_COMPLETED]: client_1.NotificationCategory.WALLET,
    [client_1.NotificationType.WITHDRAWAL_REJECTED]: client_1.NotificationCategory.WALLET,
    [client_1.NotificationType.WITHDRAWAL_CANCELLED]: client_1.NotificationCategory.WALLET,
    [client_1.NotificationType.SYSTEM_ANNOUNCEMENT]: client_1.NotificationCategory.SYSTEM,
};
let NotificationsService = class NotificationsService {
    prisma;
    pushDelivery;
    logger;
    constructor(prisma, pushDelivery, logger) {
        this.prisma = prisma;
        this.pushDelivery = pushDelivery;
        this.logger = logger;
    }
    async send(input) {
        try {
            const category = TYPE_TO_CATEGORY[input.type];
            if (!input.force) {
                const prefs = await this.prisma.notificationPreference.findUnique({
                    where: { userId: input.userId },
                });
                const prefKey = CATEGORY_TO_PREFERENCE[category];
                if (prefs && !prefs[prefKey]) {
                    this.logger.debug({ userId: input.userId, type: input.type }, 'Notification skipped (preference disabled)');
                    return null;
                }
            }
            const notification = await this.prisma.notification.create({
                data: {
                    userId: input.userId,
                    type: input.type,
                    category,
                    title: input.title,
                    message: input.message,
                    relatedEntityType: input.relatedEntityType,
                    relatedEntityId: input.relatedEntityId,
                    deliveryStatus: client_1.NotificationDeliveryStatus.PENDING,
                },
            });
            void this.deliver(notification.id, input.userId, {
                title: input.title,
                body: input.message,
                data: {
                    type: input.type,
                    ...(input.relatedEntityId
                        ? { relatedEntityId: input.relatedEntityId }
                        : {}),
                },
            });
            return notification;
        }
        catch (err) {
            const error = err;
            this.logger.error({ err: error, userId: input.userId, type: input.type }, 'Failed to send notification');
            return null;
        }
    }
    async sendToMany(inputs) {
        await Promise.all(inputs.map((input) => this.send(input)));
    }
    async deliver(notificationId, userId, payload) {
        try {
            const devices = await this.prisma.deviceRegistration.findMany({
                where: { userId },
            });
            await this.prisma.notification.update({
                where: { id: notificationId },
                data: {
                    deliveryStatus: client_1.NotificationDeliveryStatus.SENT,
                    sentAt: new Date(),
                },
            });
            if (devices.length === 0) {
                this.logger.debug({ userId, notificationId }, 'No registered devices — notification stored in-app only');
                return;
            }
            let allDelivered = true;
            let firstError = null;
            for (const device of devices) {
                const result = await this.pushDelivery.send(device.deviceToken, payload);
                if (!result.delivered) {
                    allDelivered = false;
                    firstError = firstError ?? result.error ?? 'PUSH_FAILED';
                    if (result.error === 'DEVICE_UNREGISTERED') {
                        await this.prisma.deviceRegistration.deleteMany({
                            where: { id: device.id },
                        });
                    }
                }
                else {
                    await this.prisma.deviceRegistration.update({
                        where: { id: device.id },
                        data: { lastActiveAt: new Date() },
                    });
                }
            }
            await this.prisma.notification.update({
                where: { id: notificationId },
                data: {
                    deliveryStatus: allDelivered
                        ? client_1.NotificationDeliveryStatus.DELIVERED
                        : client_1.NotificationDeliveryStatus.SENT,
                    deliveredAt: allDelivered ? new Date() : null,
                    ...(firstError && { deliveryError: firstError }),
                },
            });
        }
        catch (err) {
            const error = err;
            await this.prisma.notification.update({
                where: { id: notificationId },
                data: {
                    deliveryStatus: client_1.NotificationDeliveryStatus.FAILED,
                    deliveryError: error.message?.slice(0, 500),
                },
            });
            this.logger.error({ err: error, notificationId }, 'Notification delivery failed');
        }
    }
    async list(userId, query) {
        const { page = 1, limit = 10, type, category, isRead } = query;
        const skip = (page - 1) * limit;
        const where = {
            userId,
            deletedAt: null,
            ...(type && { type }),
            ...(category && { category }),
            ...(isRead !== undefined && { isRead }),
        };
        const [data, total] = await Promise.all([
            this.prisma.notification.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.notification.count({ where }),
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
    async getById(userId, notificationId) {
        const notification = await this.prisma.notification.findFirst({
            where: { id: notificationId, userId, deletedAt: null },
        });
        if (!notification) {
            throw new common_1.NotFoundException('Notification not found');
        }
        return notification;
    }
    async markAsRead(userId, notificationId) {
        const notification = await this.getById(userId, notificationId);
        if (notification.isRead) {
            return notification;
        }
        return this.prisma.notification.update({
            where: { id: notificationId },
            data: { isRead: true, readAt: new Date() },
        });
    }
    async markAllAsRead(userId) {
        const result = await this.prisma.notification.updateMany({
            where: { userId, isRead: false, deletedAt: null },
            data: { isRead: true, readAt: new Date() },
        });
        return { updated: result.count };
    }
    async remove(userId, notificationId) {
        await this.getById(userId, notificationId);
        await this.prisma.notification.update({
            where: { id: notificationId },
            data: { deletedAt: new Date() },
        });
        return { message: 'Notification deleted successfully', id: notificationId };
    }
    async unreadCount(userId) {
        const count = await this.prisma.notification.count({
            where: { userId, isRead: false, deletedAt: null },
        });
        return { unreadCount: count };
    }
    async registerDevice(userId, dto) {
        const existing = await this.prisma.deviceRegistration.findFirst({
            where: { userId, deviceToken: dto.deviceToken },
        });
        if (existing) {
            return this.prisma.deviceRegistration.update({
                where: { id: existing.id },
                data: {
                    platform: dto.platform,
                    lastActiveAt: new Date(),
                },
            });
        }
        return this.prisma.deviceRegistration.create({
            data: {
                userId,
                deviceToken: dto.deviceToken,
                platform: dto.platform,
                lastActiveAt: new Date(),
            },
        });
    }
    async listDevices(userId) {
        return this.prisma.deviceRegistration.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async unregisterDevice(userId, deviceId) {
        const device = await this.prisma.deviceRegistration.findFirst({
            where: { id: deviceId, userId },
        });
        if (!device) {
            throw new common_1.NotFoundException('Device not found');
        }
        await this.prisma.deviceRegistration.delete({ where: { id: deviceId } });
        return { message: 'Device unregistered successfully' };
    }
    async getPreferences(userId) {
        const prefs = await this.prisma.notificationPreference.upsert({
            where: { userId },
            create: { userId },
            update: {},
        });
        return prefs;
    }
    async updatePreferences(userId, dto) {
        return this.prisma.notificationPreference.upsert({
            where: { userId },
            create: {
                userId,
                ...(dto.jobEnabled !== undefined && { jobEnabled: dto.jobEnabled }),
                ...(dto.chatEnabled !== undefined && { chatEnabled: dto.chatEnabled }),
                ...(dto.bookingEnabled !== undefined && {
                    bookingEnabled: dto.bookingEnabled,
                }),
                ...(dto.marketingEnabled !== undefined && {
                    marketingEnabled: dto.marketingEnabled,
                }),
                ...(dto.systemEnabled !== undefined && {
                    systemEnabled: dto.systemEnabled,
                }),
            },
            update: {
                ...(dto.jobEnabled !== undefined && { jobEnabled: dto.jobEnabled }),
                ...(dto.chatEnabled !== undefined && { chatEnabled: dto.chatEnabled }),
                ...(dto.bookingEnabled !== undefined && {
                    bookingEnabled: dto.bookingEnabled,
                }),
                ...(dto.marketingEnabled !== undefined && {
                    marketingEnabled: dto.marketingEnabled,
                }),
                ...(dto.systemEnabled !== undefined && {
                    systemEnabled: dto.systemEnabled,
                }),
            },
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        push_delivery_service_1.PushDeliveryService,
        nestjs_pino_1.Logger])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map