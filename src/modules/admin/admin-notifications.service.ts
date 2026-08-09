import {
  Injectable,
  BadRequestException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminAuditService } from 'src/common/services/admin-audit.service';
import {
  NotificationsService,
  SendNotificationInput,
} from '../notifications/notifications.service';
import {
  SendUserNotificationDto,
  SendRoleNotificationDto,
  SendBroadcastNotificationDto,
} from './dtos/send-notification.dto';
import { UserRole } from 'generated/prisma/client';

/**
 * Module 17 — Admin Notification Management.
 *
 * Admin-initiated notifications to one user, a role, or everyone. The
 * `scheduledAt` field is future-ready (accepted by the API, not yet
 * processed by any scheduler).
 */
@Injectable()
export class AdminNotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    private readonly audit: AdminAuditService,
    private readonly logger: Logger,
  ) {}

  async sendToUser(adminId: string, dto: SendUserNotificationDto) {
    this.assertNotScheduled(dto.scheduledAt);

    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
      select: { id: true, isActive: true },
    });
    if (!user) {
      throw new NotFoundException('Recipient user not found');
    }
    if (!user.isActive) {
      throw new BadRequestException('Cannot notify a deleted user');
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

  async sendToRole(adminId: string, dto: SendRoleNotificationDto) {
    this.assertNotScheduled(dto.scheduledAt);

    if (dto.role === UserRole.ADMIN) {
      throw new BadRequestException(
        'Cannot broadcast to admins via this endpoint',
      );
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

  async broadcast(adminId: string, dto: SendBroadcastNotificationDto) {
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

  /** Send in bounded batches to avoid unbounded Promise.all fan-out. */
  private async sendChunked(inputs: SendNotificationInput[]) {
    const CHUNK_SIZE = 100;
    for (let i = 0; i < inputs.length; i += CHUNK_SIZE) {
      await this.notifications.sendToMany(inputs.slice(i, i + CHUNK_SIZE));
    }
  }

  private assertNotScheduled(scheduledAt?: string) {
    if (scheduledAt && new Date(scheduledAt).getTime() > Date.now()) {
      throw new NotImplementedException(
        'Scheduled notifications are not yet available. Send now or omit scheduledAt.',
      );
    }
  }
}
