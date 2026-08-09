import { PrismaService } from 'src/prisma/prisma.service';
import { PushDeliveryService } from './push-delivery.service';
import { RegisterDeviceDto } from './dtos/register-device.dto';
import { UpdateNotificationPreferencesDto } from './dtos/update-notification-preferences.dto';
import { NotificationQueryDto } from './dtos/notification-query.dto';
import { Logger } from 'nestjs-pino';
import { NotificationType, NotificationCategory, NotificationDeliveryStatus } from 'generated/prisma/client';
export interface SendNotificationInput {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    relatedEntityType?: string;
    relatedEntityId?: string;
    force?: boolean;
}
export declare class NotificationsService {
    private readonly prisma;
    private readonly pushDelivery;
    private readonly logger;
    constructor(prisma: PrismaService, pushDelivery: PushDeliveryService, logger: Logger);
    send(input: SendNotificationInput): Promise<{
        id: string;
        createdAt: Date;
        deletedAt: Date | null;
        userId: string;
        title: string;
        message: string;
        type: NotificationType;
        deliveredAt: Date | null;
        readAt: Date | null;
        category: NotificationCategory;
        relatedEntityType: string | null;
        relatedEntityId: string | null;
        isRead: boolean;
        deliveryStatus: NotificationDeliveryStatus;
        deliveryError: string | null;
        sentAt: Date | null;
    } | null>;
    sendToMany(inputs: SendNotificationInput[]): Promise<void>;
    private deliver;
    list(userId: string, query: NotificationQueryDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            deletedAt: Date | null;
            userId: string;
            title: string;
            message: string;
            type: NotificationType;
            deliveredAt: Date | null;
            readAt: Date | null;
            category: NotificationCategory;
            relatedEntityType: string | null;
            relatedEntityId: string | null;
            isRead: boolean;
            deliveryStatus: NotificationDeliveryStatus;
            deliveryError: string | null;
            sentAt: Date | null;
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
    getById(userId: string, notificationId: string): Promise<{
        id: string;
        createdAt: Date;
        deletedAt: Date | null;
        userId: string;
        title: string;
        message: string;
        type: NotificationType;
        deliveredAt: Date | null;
        readAt: Date | null;
        category: NotificationCategory;
        relatedEntityType: string | null;
        relatedEntityId: string | null;
        isRead: boolean;
        deliveryStatus: NotificationDeliveryStatus;
        deliveryError: string | null;
        sentAt: Date | null;
    }>;
    markAsRead(userId: string, notificationId: string): Promise<{
        id: string;
        createdAt: Date;
        deletedAt: Date | null;
        userId: string;
        title: string;
        message: string;
        type: NotificationType;
        deliveredAt: Date | null;
        readAt: Date | null;
        category: NotificationCategory;
        relatedEntityType: string | null;
        relatedEntityId: string | null;
        isRead: boolean;
        deliveryStatus: NotificationDeliveryStatus;
        deliveryError: string | null;
        sentAt: Date | null;
    }>;
    markAllAsRead(userId: string): Promise<{
        updated: number;
    }>;
    remove(userId: string, notificationId: string): Promise<{
        message: string;
        id: string;
    }>;
    unreadCount(userId: string): Promise<{
        unreadCount: number;
    }>;
    registerDevice(userId: string, dto: RegisterDeviceDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        deviceToken: string;
        platform: string;
        lastActiveAt: Date;
    }>;
    listDevices(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        deviceToken: string;
        platform: string;
        lastActiveAt: Date;
    }[]>;
    unregisterDevice(userId: string, deviceId: string): Promise<{
        message: string;
    }>;
    getPreferences(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        jobEnabled: boolean;
        chatEnabled: boolean;
        bookingEnabled: boolean;
        marketingEnabled: boolean;
        systemEnabled: boolean;
    }>;
    updatePreferences(userId: string, dto: UpdateNotificationPreferencesDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        jobEnabled: boolean;
        chatEnabled: boolean;
        bookingEnabled: boolean;
        marketingEnabled: boolean;
        systemEnabled: boolean;
    }>;
}
