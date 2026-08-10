import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PushDeliveryService } from './push-delivery.service';
import { RegisterDeviceDto } from './dtos/register-device.dto';
import { UpdateNotificationPreferencesDto } from './dtos/update-notification-preferences.dto';
import { NotificationQueryDto } from './dtos/notification-query.dto';
import { Logger } from 'nestjs-pino';
import {
  Prisma,
  Notification,
  NotificationType,
  NotificationCategory,
  NotificationDeliveryStatus,
} from 'generated/prisma/client';

export interface SendNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedEntityType?: string;
  relatedEntityId?: string;
  /** Optional override: skips preference gating (e.g. system-critical). */
  force?: boolean;
}

/**
 * Category → preference mapping used to respect user notification
 * preferences before delivering a push.
 */
const CATEGORY_TO_PREFERENCE: Record<
  NotificationCategory,
  | 'jobEnabled'
  | 'chatEnabled'
  | 'bookingEnabled'
  | 'marketingEnabled'
  | 'systemEnabled'
> = {
  [NotificationCategory.JOB]: 'jobEnabled',
  [NotificationCategory.BID]: 'jobEnabled',
  [NotificationCategory.CHAT]: 'chatEnabled',
  [NotificationCategory.BOOKING]: 'bookingEnabled',
  [NotificationCategory.REVIEW]: 'bookingEnabled',
  [NotificationCategory.VERIFICATION]: 'systemEnabled',
  [NotificationCategory.WALLET]: 'systemEnabled',
  [NotificationCategory.DISPUTE]: 'systemEnabled',
  [NotificationCategory.PENALTY]: 'systemEnabled',
  [NotificationCategory.SYSTEM]: 'systemEnabled',
  [NotificationCategory.MARKETING]: 'marketingEnabled',
};

const TYPE_TO_CATEGORY: Record<NotificationType, NotificationCategory> = {
  [NotificationType.WELCOME]: NotificationCategory.SYSTEM,
  [NotificationType.NEW_MESSAGE]: NotificationCategory.CHAT,
  [NotificationType.BID_COUNTERED]: NotificationCategory.BID,
  [NotificationType.COUNTER_ACCEPTED]: NotificationCategory.BID,
  [NotificationType.COUNTER_DECLINED]: NotificationCategory.BID,
  [NotificationType.NEW_JOB]: NotificationCategory.JOB,
  [NotificationType.JOB_ACCEPTED]: NotificationCategory.JOB,
  [NotificationType.NEW_BID]: NotificationCategory.BID,
  [NotificationType.BID_ACCEPTED]: NotificationCategory.BID,
  [NotificationType.BID_REJECTED]: NotificationCategory.BID,
  [NotificationType.BOOKING_CONFIRMED]: NotificationCategory.BOOKING,
  [NotificationType.JOB_STARTED]: NotificationCategory.BOOKING,
  [NotificationType.JOB_COMPLETED]: NotificationCategory.BOOKING,
  [NotificationType.COMPLETION_CONFIRMED]: NotificationCategory.BOOKING,
  [NotificationType.JOB_CANCELLED]: NotificationCategory.JOB,
  [NotificationType.JOB_EXPIRED]: NotificationCategory.JOB,
  [NotificationType.REVIEW_RECEIVED]: NotificationCategory.REVIEW,
  [NotificationType.VERIFICATION_SUBMITTED]: NotificationCategory.VERIFICATION,
  [NotificationType.VERIFICATION_RESUBMITTED]:
    NotificationCategory.VERIFICATION,
  [NotificationType.VERIFICATION_APPROVED]: NotificationCategory.VERIFICATION,
  [NotificationType.VERIFICATION_REJECTED]: NotificationCategory.VERIFICATION,
  [NotificationType.VERIFICATION_BANNED]: NotificationCategory.VERIFICATION,
  [NotificationType.VERIFICATION_UNBANNED]: NotificationCategory.VERIFICATION,
  [NotificationType.WALLET_UPDATED]: NotificationCategory.WALLET,
  [NotificationType.WITHDRAWAL_PROCESSED]: NotificationCategory.WALLET,
  [NotificationType.DISPUTE_RAISED]: NotificationCategory.DISPUTE,
  [NotificationType.DISPUTE_RESPONSE_RECEIVED]: NotificationCategory.DISPUTE,
  [NotificationType.DISPUTE_STATUS_UPDATED]: NotificationCategory.DISPUTE,
  [NotificationType.DISPUTE_RESOLVED]: NotificationCategory.DISPUTE,
  [NotificationType.DISPUTE_REJECTED]: NotificationCategory.DISPUTE,
  [NotificationType.PENALTY_WARNING]: NotificationCategory.PENALTY,
  [NotificationType.PENALTY_SUSPENSION_STARTED]: NotificationCategory.PENALTY,
  [NotificationType.PENALTY_SUSPENSION_ENDED]: NotificationCategory.PENALTY,
  [NotificationType.PENALTY_PERMANENT_BAN]: NotificationCategory.PENALTY,
  [NotificationType.APPEAL_APPROVED]: NotificationCategory.PENALTY,
  [NotificationType.APPEAL_REJECTED]: NotificationCategory.PENALTY,
  [NotificationType.WALLET_TOPUP_SUBMITTED]: NotificationCategory.WALLET,
  [NotificationType.WALLET_TOPUP_APPROVED]: NotificationCategory.WALLET,
  [NotificationType.WALLET_TOPUP_REJECTED]: NotificationCategory.WALLET,
  [NotificationType.JOB_PAYMENT_COMPLETED]: NotificationCategory.WALLET,
  [NotificationType.REFUND_RECEIVED]: NotificationCategory.WALLET,
  [NotificationType.WITHDRAWAL_REQUEST_SUBMITTED]: NotificationCategory.WALLET,
  [NotificationType.WITHDRAWAL_APPROVED]: NotificationCategory.WALLET,
  [NotificationType.WITHDRAWAL_PROCESSING]: NotificationCategory.WALLET,
  [NotificationType.WITHDRAWAL_COMPLETED]: NotificationCategory.WALLET,
  [NotificationType.WITHDRAWAL_REJECTED]: NotificationCategory.WALLET,
  [NotificationType.WITHDRAWAL_CANCELLED]: NotificationCategory.WALLET,
  [NotificationType.SYSTEM_ANNOUNCEMENT]: NotificationCategory.SYSTEM,
};

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pushDelivery: PushDeliveryService,
    private readonly logger: Logger,
  ) {}

  // ─── Notification Engine: Send ───────────────────────────────────────

  /**
   * Create an in-app notification and attempt push delivery to the user's
   * registered devices. Respects user preferences unless `force` is set.
   * Never throws — callers (other modules) treat it as fire-and-forget.
   */
  async send(input: SendNotificationInput) {
    try {
      const category = TYPE_TO_CATEGORY[input.type];

      // Respect preferences unless forced
      if (!input.force) {
        const prefs = await this.prisma.notificationPreference.findUnique({
          where: { userId: input.userId },
        });
        const prefKey = CATEGORY_TO_PREFERENCE[category];
        if (prefs && !prefs[prefKey]) {
          this.logger.debug(
            { userId: input.userId, type: input.type },
            'Notification skipped (preference disabled)',
          );
          return null;
        }
      }

      const notification: Notification = await this.prisma.notification.create({
        data: {
          userId: input.userId,
          type: input.type,
          category,
          title: input.title,
          message: input.message,
          relatedEntityType: input.relatedEntityType,
          relatedEntityId: input.relatedEntityId,
          deliveryStatus: NotificationDeliveryStatus.PENDING,
        },
      });

      // Fire-and-forget push delivery (never blocks the caller flow)
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
    } catch (err) {
      const error = err as { message?: string };
      this.logger.error(
        { err: error, userId: input.userId, type: input.type },
        'Failed to send notification',
      );
      return null;
    }
  }

  /**
   * Send the same notification to many users (e.g. all matching providers).
   */
  async sendToMany(inputs: SendNotificationInput[]) {
    await Promise.all(inputs.map((input) => this.send(input)));
  }

  private async deliver(
    notificationId: string,
    userId: string,
    payload: { title: string; body: string; data: Record<string, string> },
  ) {
    try {
      const devices = await this.prisma.deviceRegistration.findMany({
        where: { userId },
      });

      // Mark SENT before attempting delivery
      await this.prisma.notification.update({
        where: { id: notificationId },
        data: {
          deliveryStatus: NotificationDeliveryStatus.SENT,
          sentAt: new Date(),
        },
      });

      if (devices.length === 0) {
        this.logger.debug(
          { userId, notificationId },
          'No registered devices — notification stored in-app only',
        );
        return;
      }

      let allDelivered = true;
      let firstError: string | null = null;

      for (const device of devices) {
        const result = await this.pushDelivery.send(
          device.deviceToken,
          payload,
        );
        if (!result.delivered) {
          allDelivered = false;
          firstError = firstError ?? result.error ?? 'PUSH_FAILED';
          // Unregister stale tokens automatically
          if (result.error === 'DEVICE_UNREGISTERED') {
            await this.prisma.deviceRegistration.deleteMany({
              where: { id: device.id },
            });
          }
        } else {
          // Touch last active
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
            ? NotificationDeliveryStatus.DELIVERED
            : NotificationDeliveryStatus.SENT,
          deliveredAt: allDelivered ? new Date() : null,
          ...(firstError && { deliveryError: firstError }),
        },
      });
    } catch (err) {
      const error = err as { message?: string };
      await this.prisma.notification.update({
        where: { id: notificationId },
        data: {
          deliveryStatus: NotificationDeliveryStatus.FAILED,
          deliveryError: error.message?.slice(0, 500),
        },
      });
      this.logger.error(
        { err: error, notificationId },
        'Notification delivery failed',
      );
    }
  }

  // ─── Notification CRUD ───────────────────────────────────────────────

  async list(userId: string, query: NotificationQueryDto) {
    const { page = 1, limit = 10, type, category, isRead } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.NotificationWhereInput = {
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
        orderBy: { createdAt: 'desc' }, // newest first
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

  async getById(userId: string, notificationId: string) {
    const notification: Notification | null =
      await this.prisma.notification.findFirst({
        where: { id: notificationId, userId, deletedAt: null },
      });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return notification;
  }

  async markAsRead(userId: string, notificationId: string) {
    const notification = await this.getById(userId, notificationId);

    if (notification.isRead) {
      return notification;
    }

    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true, readAt: new Date() },
    });
  }

  async markAllAsRead(userId: string) {
    const result = await this.prisma.notification.updateMany({
      where: { userId, isRead: false, deletedAt: null },
      data: { isRead: true, readAt: new Date() },
    });

    return { updated: result.count };
  }

  async remove(userId: string, notificationId: string) {
    await this.getById(userId, notificationId);

    await this.prisma.notification.update({
      where: { id: notificationId },
      data: { deletedAt: new Date() },
    });

    return { message: 'Notification deleted successfully', id: notificationId };
  }

  async unreadCount(userId: string) {
    const count = await this.prisma.notification.count({
      where: { userId, isRead: false, deletedAt: null },
    });

    return { unreadCount: count };
  }

  // ─── Device Registration ─────────────────────────────────────────────

  async registerDevice(userId: string, dto: RegisterDeviceDto) {
    const existing = await this.prisma.deviceRegistration.findFirst({
      where: { userId, deviceToken: dto.deviceToken },
    });

    if (existing) {
      // Re-activate / refresh the existing registration
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

  async listDevices(userId: string) {
    return this.prisma.deviceRegistration.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async unregisterDevice(userId: string, deviceId: string) {
    const device = await this.prisma.deviceRegistration.findFirst({
      where: { id: deviceId, userId },
    });

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    await this.prisma.deviceRegistration.delete({ where: { id: deviceId } });
    return { message: 'Device unregistered successfully' };
  }

  // ─── Notification Preferences ────────────────────────────────────────

  async getPreferences(userId: string) {
    const prefs = await this.prisma.notificationPreference.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    return prefs;
  }

  async updatePreferences(
    userId: string,
    dto: UpdateNotificationPreferencesDto,
  ) {
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
}
