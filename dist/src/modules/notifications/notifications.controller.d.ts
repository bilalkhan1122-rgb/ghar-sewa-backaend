import { NotificationsService } from './notifications.service';
import { NotificationQueryDto } from './dtos/notification-query.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    list(userId: string, query: NotificationQueryDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            deletedAt: Date | null;
            userId: string;
            title: string;
            message: string;
            type: import("../../../generated/prisma/enums").NotificationType;
            deliveredAt: Date | null;
            readAt: Date | null;
            category: import("../../../generated/prisma/enums").NotificationCategory;
            relatedEntityType: string | null;
            relatedEntityId: string | null;
            isRead: boolean;
            deliveryStatus: import("../../../generated/prisma/enums").NotificationDeliveryStatus;
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
    unreadCount(userId: string): Promise<{
        unreadCount: number;
    }>;
    getById(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        deletedAt: Date | null;
        userId: string;
        title: string;
        message: string;
        type: import("../../../generated/prisma/enums").NotificationType;
        deliveredAt: Date | null;
        readAt: Date | null;
        category: import("../../../generated/prisma/enums").NotificationCategory;
        relatedEntityType: string | null;
        relatedEntityId: string | null;
        isRead: boolean;
        deliveryStatus: import("../../../generated/prisma/enums").NotificationDeliveryStatus;
        deliveryError: string | null;
        sentAt: Date | null;
    }>;
    markAsRead(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        deletedAt: Date | null;
        userId: string;
        title: string;
        message: string;
        type: import("../../../generated/prisma/enums").NotificationType;
        deliveredAt: Date | null;
        readAt: Date | null;
        category: import("../../../generated/prisma/enums").NotificationCategory;
        relatedEntityType: string | null;
        relatedEntityId: string | null;
        isRead: boolean;
        deliveryStatus: import("../../../generated/prisma/enums").NotificationDeliveryStatus;
        deliveryError: string | null;
        sentAt: Date | null;
    }>;
    markAllAsRead(userId: string): Promise<{
        updated: number;
    }>;
    remove(userId: string, id: string): Promise<{
        message: string;
        id: string;
    }>;
}
