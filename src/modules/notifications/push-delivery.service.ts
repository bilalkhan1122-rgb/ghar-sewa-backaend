import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp, cert } from 'firebase-admin/app';
import { getMessaging, Message } from 'firebase-admin/messaging';
import { ServiceAccount } from 'firebase-admin/app';

export interface PushPayload {
  title: string;
  body: string;
  data?: Record<string, string>;
}

export interface PushResult {
  delivered: boolean;
  error?: string;
}

/**
 * Centralized push delivery provider backed by Firebase Cloud Messaging.
 *
 * FCM is initialized lazily from `FIREBASE_SERVICE_ACCOUNT` (JSON string)
 * or `GOOGLE_APPLICATION_CREDENTIALS` (path to service account JSON).
 *
 * If neither is configured, the service degrades gracefully: pushes are
 * logged as SENT and marked delivered=false without throwing — this keeps
 * the notification engine functional (in-app records) even before FCM
 * credentials are provisioned.
 */
@Injectable()
export class PushDeliveryService {
  private readonly logger = new Logger(PushDeliveryService.name);
  private fcmInitialized = false;
  private fcmAvailable = false;

  constructor(private readonly config: ConfigService) {
    this.initFcm();
  }

  private initFcm() {
    if (this.fcmInitialized) return;
    this.fcmInitialized = true;

    try {
      const serviceAccountJson = this.config.get<string>(
        'FIREBASE_SERVICE_ACCOUNT',
      );
      const credentialsPath = this.config.get<string>(
        'GOOGLE_APPLICATION_CREDENTIALS',
      );

      if (serviceAccountJson) {
        const parsed = JSON.parse(serviceAccountJson) as ServiceAccount;
        initializeApp({ credential: cert(parsed) });
        this.fcmAvailable = true;
      } else if (credentialsPath) {
        initializeApp({ credential: cert(credentialsPath) });
        this.fcmAvailable = true;
      } else {
        this.logger.warn(
          'FCM not configured (FIREBASE_SERVICE_ACCOUNT or GOOGLE_APPLICATION_CREDENTIALS missing). ' +
            'Push notifications will be logged as SENT without a real send.',
        );
      }
    } catch (err) {
      this.logger.error(
        `FCM initialization failed: ${(err as Error).message}`,
        'PushDeliveryService',
      );
      this.fcmAvailable = false;
    }
  }

  /**
   * Send a push to a single device token.
   */
  async send(token: string, payload: PushPayload): Promise<PushResult> {
    if (!this.fcmAvailable) {
      // Graceful degradation — log as if delivered to the notification service.
      this.logger.log(
        `[PUSH-STUB] to ${token.slice(0, 12)}… : ${payload.title} — ${payload.body}`,
        'PushDeliveryService',
      );
      return { delivered: false, error: 'FCM not configured' };
    }

    try {
      const message: Message = {
        token,
        notification: {
          title: payload.title,
          body: payload.body,
        },
        data: payload.data ?? {},
      };

      const response = await getMessaging().send(message);
      this.logger.log(
        `Push delivered to ${token.slice(0, 12)}… (${response})`,
        'PushDeliveryService',
      );
      return { delivered: true };
    } catch (err) {
      const error = err as { code?: string; message?: string };
      // Token no longer valid — caller should unregister the device.
      if (
        error.code === 'messaging/registration-token-not-registered' ||
        error.code === 'messaging/invalid-registration-token'
      ) {
        this.logger.warn(
          `Stale device token removed: ${token.slice(0, 12)}…`,
          'PushDeliveryService',
        );
        return { delivered: false, error: 'DEVICE_UNREGISTERED' };
      }
      this.logger.error(
        `Push delivery failed: ${error.message ?? 'unknown error'}`,
        'PushDeliveryService',
      );
      return { delivered: false, error: error.message ?? 'PUSH_FAILED' };
    }
  }
}
