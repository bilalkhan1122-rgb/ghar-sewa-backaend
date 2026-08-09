import { NotificationType, UserRole } from 'generated/prisma/client';
export declare class NotificationPayloadDto {
    type: NotificationType;
    title: string;
    message: string;
    scheduledAt?: string;
}
export declare class SendUserNotificationDto extends NotificationPayloadDto {
    userId: string;
}
export declare class SendRoleNotificationDto extends NotificationPayloadDto {
    role: UserRole;
}
export declare class SendBroadcastNotificationDto extends NotificationPayloadDto {
}
