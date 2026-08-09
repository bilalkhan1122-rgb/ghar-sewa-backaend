import { Logger } from 'nestjs-pino';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminAuditService } from 'src/common/services/admin-audit.service';
import { NotificationsService } from '../notifications/notifications.service';
import { SendUserNotificationDto, SendRoleNotificationDto, SendBroadcastNotificationDto } from './dtos/send-notification.dto';
export declare class AdminNotificationsService {
    private readonly prisma;
    private readonly notifications;
    private readonly audit;
    private readonly logger;
    constructor(prisma: PrismaService, notifications: NotificationsService, audit: AdminAuditService, logger: Logger);
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
    private sendChunked;
    private assertNotScheduled;
}
