import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Pusher from "pusher";
import { PUSHER_CHANNELS } from "./realtime-channels";

/** Realtime event names used across Modules 19-21. */
export const PUSHER_EVENTS = {
  /** A new chat message, delivered to the recipient's private user channel. */
  CHAT_MESSAGE_NEW: "chat.message.new",
  PROVIDER_RANK_UPDATED: "provider.rank.updated",
  JOB_URGENT_CREATED: "job.urgent.created",
  JOB_URGENT_EXPIRED: "job.urgent.expired",
  JOB_URGENT_ACCEPTED: "job.urgent.accepted",
  ANALYTICS_UPDATED: "analytics.updated",
} as const;

/**
 * Realtime delivery layer backed by Pusher (server SDK).
 *
 * - The database remains the source of truth; Pusher is best-effort delivery.
 * - All publishes happen AFTER the business transaction succeeded (callers
 *   are responsible for ordering) and never throw — a Pusher outage must not
 *   corrupt or roll back valid business data, it is logged and swallowed.
 * - Without PUSHER_* env vars the service degrades to a stub that logs the
 *   event, mirroring the existing FCM push stub pattern.
 * - The Pusher secret never leaves the server: clients only ever call the
 *   auth endpoint, which returns a signed channel-auth token.
 */
@Injectable()
export class RealtimeService {
  private readonly logger = new Logger(RealtimeService.name);
  private pusher: Pusher | null = null;

  constructor(private readonly config: ConfigService) {
    this.initPusher();
  }

  private initPusher() {
    const appId = this.config.get<string>("PUSHER_APP_ID");
    const key = this.config.get<string>("PUSHER_KEY");
    const secret = this.config.get<string>("PUSHER_SECRET");
    const cluster = this.config.get<string>("PUSHER_CLUSTER");

    if (!appId || !key || !secret || !cluster) {
      this.logger.warn(
        "Pusher not configured (PUSHER_APP_ID/PUSHER_KEY/PUSHER_SECRET/PUSHER_CLUSTER missing). " +
          "Realtime events will be logged as stubs.",
      );
      this.pusher = null;
      return;
    }

    try {
      this.pusher = new Pusher({ appId, key, secret, cluster });
      this.logger.log(`Pusher initialized (cluster: ${cluster})`);
    } catch (err) {
      this.logger.error(
        `Pusher initialization failed: ${(err as Error).message}`,
      );
      this.pusher = null;
    }
  }

  get isConfigured(): boolean {
    return this.pusher !== null;
  }

  /**
   * Publish an event to a channel. Fire-and-forget and never throws: returns
   * true when delivered, false when stubbed or failed (failure is logged).
   */
  async publish(
    channel: string,
    event: string,
    data: unknown,
  ): Promise<boolean> {
    if (!this.pusher) {
      try {
        this.logger.log(
          `[REALTIME-STUB] channel=${channel} event=${event} data=${JSON.stringify(data)}`,
        );
      } catch {
        this.logger.log(
          `[REALTIME-STUB] channel=${channel} event=${event} (payload not serializable)`,
        );
      }
      return false;
    }

    try {
      await this.pusher.trigger(channel, event, data);
      return true;
    } catch (err) {
      this.logger.error(
        { err: err as Error, channel, event },
        "Pusher event publish failed",
      );
      return false;
    }
  }

  /**
   * Sign a private-channel subscription for a client. The caller must have
   * already validated channel ownership (see isChannelAllowedForUser).
   */
  authorizeChannel(socketId: string, channelName: string): { auth: string } {
    if (!this.pusher) {
      throw new ServiceUnavailableException(
        "Realtime is not configured on this server",
      );
    }
    return this.pusher.authorizeChannel(socketId, channelName);
  }

  // ─── Convenience publishes (keep event payloads consistent) ─────────

  /** provider.rank.updated → the provider's own private channel. */
  publishRankUpdated(
    providerId: string,
    payload: {
      providerId: string;
      previousRank: string;
      newRank: string;
      timestamp: Date;
    },
  ): Promise<boolean> {
    return this.publish(
      PUSHER_CHANNELS.provider(providerId),
      PUSHER_EVENTS.PROVIDER_RANK_UPDATED,
      payload,
    );
  }

  /** job.urgent.created → each matching provider's private channel. */
  publishUrgentJobCreated(
    providerId: string,
    payload: {
      jobId: string;
      title: string;
      categoryId: string;
      offeredPrice: number;
      isUrgent: boolean;
      expiresAt: Date;
    },
  ): Promise<boolean> {
    return this.publish(
      PUSHER_CHANNELS.provider(providerId),
      PUSHER_EVENTS.JOB_URGENT_CREATED,
      payload,
    );
  }

  /** job.urgent.expired → the job owner's private channel. */
  publishUrgentJobExpired(
    customerId: string,
    payload: {
      jobId: string;
      title: string;
      isUrgent: boolean;
      expiredAt: Date;
    },
  ): Promise<boolean> {
    return this.publish(
      PUSHER_CHANNELS.user(customerId),
      PUSHER_EVENTS.JOB_URGENT_EXPIRED,
      payload,
    );
  }

  /** job.urgent.accepted → customer + assigned provider channels. */
  publishUrgentJobAccepted(
    customerId: string,
    providerId: string,
    payload: {
      jobId: string;
      bookingId: string;
      title: string;
      isUrgent: boolean;
      acceptedAt: Date;
    },
  ): Promise<boolean> {
    return Promise.all([
      this.publish(
        PUSHER_CHANNELS.user(customerId),
        PUSHER_EVENTS.JOB_URGENT_ACCEPTED,
        payload,
      ),
      this.publish(
        PUSHER_CHANNELS.provider(providerId),
        PUSHER_EVENTS.JOB_URGENT_ACCEPTED,
        payload,
      ),
    ]).then((results) => results.every(Boolean));
  }

  /** analytics.updated → admin channel (admin dashboard refresh). */
  publishAnalyticsUpdated(reason: string): Promise<boolean> {
    return this.publish(
      PUSHER_CHANNELS.admin,
      PUSHER_EVENTS.ANALYTICS_UPDATED,
      {
        reason,
        timestamp: new Date(),
      },
    );
  }
}
