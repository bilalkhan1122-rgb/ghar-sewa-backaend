import { AdminNotificationsService } from './admin-notifications.service';
import { SendUserNotificationDto, SendRoleNotificationDto, SendBroadcastNotificationDto } from './dtos/send-notification.dto';
export declare class AdminNotificationsController {
    private readonly adminNotificationsService;
    constructor(adminNotificationsService: AdminNotificationsService);
    sendToUser(adminId: string, dto: SendUserNotificationDto): Promise<{
        message: string;
        notificationId: string | null;
    }>;
    sendToRole(adminId: string, dto: SendRoleNotificationDto): Promise<{
        message: string;
        recipients: number;
    }>;
    broadcast(adminId: string, dto: SendBroadcastNotificationDto): Promise<{
        message: string;
        recipients: number;
    }>;
}
