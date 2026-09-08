import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RealtimeService } from "../realtime/realtime.service";
import { UpdateProviderLocationDto } from "./dtos/update-provider-location.dto";
import { hasRole } from "src/common/roles";
import {
  ProviderBusyOverride,
  UserRole,
  VerificationStatus,
} from "generated/prisma/client";
import {
  BUSY_BOOKING_STATUSES,
  coarseCoordinate,
  isProviderBusy,
  isProviderLocationFresh,
  isProviderPresent,
} from "./provider-presence.config";

/**
 * Live provider presence: online switch, current location, busy state, and
 * the realtime events that tell open customer screens about changes.
 *
 * Responsibilities:
 * - Going online/offline (`setOnlineStatus`) — the manual availability switch.
 * - `heartbeat` keeps an online provider fresh without turning anyone on.
 * - `updateLocation` records the provider's live position while online; it is
 *   the only place customer-visible location may change, and it is rejected
 *   unless the provider is online (so a stale app can never resurrect an
 *   offline provider by pinging).
 * - `setBusyOverride` stores the provider's manual busy preference (AUTO /
 *   BUSY / AVAILABLE). Effective busy = override, else derived from bookings.
 *
 * Every write publishes `provider.presence.changed` to the provider's city
 * nearby feed (coarse coordinates only) after the database row commits —
 * realtime is best-effort and never the source of truth.
 */
@Injectable()
export class ProviderPresenceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly realtime: RealtimeService,
  ) {}

  // ─── Online switch / heartbeat ───────────────────────────────────────

  /**
   * Provider's own availability switch. Going offline is a signal to
   * customers ("not taking work right now"); it does not change what jobs
   * they can see or accept — conflation would silently cut a provider off
   * from work they never meant to decline.
   */
  async setOnlineStatus(userId: string, isOnline: boolean) {
    const profile = await this.prisma.providerProfile.findUnique({
      where: { userId },
      select: { userId: true },
    });
    if (!profile) {
      throw new NotFoundException(
        "Complete your provider profile before going online",
      );
    }

    const updated = await this.prisma.providerProfile.update({
      where: { userId },
      data: {
        isOnline,
        ...(isOnline ? { lastOnlineAt: new Date() } : {}),
      },
      select: { isOnline: true, lastOnlineAt: true },
    });

    // Coming online is only interesting to nearby customers once a location
    // has been reported (they are listed by radius), so the presence event is
    // skipped until the first location update. Going offline always announces:
    // open customer screens must drop the provider immediately.
    await this.publishCurrentPresence(userId, {
      announceOffline: !isOnline,
    });

    return updated;
  }

  /**
   * Keeps an already-online provider online.
   *
   * Deliberately cannot turn anyone on: it only refreshes the timestamp of a
   * provider who has already flipped the switch themselves, so a background
   * ping can never override a provider who chose to go offline.
   */
  async heartbeat(userId: string) {
    const { count } = await this.prisma.providerProfile.updateMany({
      where: { userId, isOnline: true },
      data: { lastOnlineAt: new Date() },
    });

    return { isOnline: count > 0 };
  }

  // ─── Location ────────────────────────────────────────────────────────

  /**
   * Records the provider's live position. Providers send this periodically
   * while online (their app drives it from the device GPS). It also counts as
   * a presence heartbeat, so an online provider who keeps reporting stays
   * present even between explicit availability calls.
   *
   * Refused when the provider is offline: accepting pings from an app that is
   * still running after the provider switched off would silently make them
   * "online and nearby" again.
   */
  async updateLocation(userId: string, dto: UpdateProviderLocationDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        roles: true,
        verificationStatus: true,
        providerProfile: {
          select: { userId: true, isOnline: true },
        },
      },
    });

    if (!user || !hasRole(user, UserRole.PROVIDER)) {
      throw new NotFoundException("Provider not found");
    }
    if (user.verificationStatus === VerificationStatus.BANNED) {
      throw new ForbiddenException(
        "Your account has been banned. You cannot share your location.",
      );
    }
    if (!user.providerProfile) {
      throw new NotFoundException(
        "Complete your provider profile before sharing your location",
      );
    }
    if (!user.providerProfile.isOnline) {
      throw new BadRequestException(
        "Go online before sharing your location — offline providers are not shown as nearby.",
      );
    }

    const now = new Date();
    const updated = await this.prisma.providerProfile.update({
      where: { userId },
      data: {
        latitude: dto.latitude,
        longitude: dto.longitude,
        locationUpdatedAt: now,
        lastOnlineAt: now,
      },
      select: {
        latitude: true,
        longitude: true,
        locationUpdatedAt: true,
        lastOnlineAt: true,
      },
    });

    await this.publishCurrentPresence(userId);

    return updated;
  }

  // ─── Busy override ───────────────────────────────────────────────────

  /**
   * Stores the provider's manual busy preference. Effective busy is derived
   * from active bookings unless the provider has overridden it — BUSY to
   * appear unavailable now, AVAILABLE to appear free while AUTO would keep
   * them hidden.
   */
  async setBusyOverride(userId: string, busyOverride: ProviderBusyOverride) {
    const profile = await this.prisma.providerProfile.findUnique({
      where: { userId },
      select: { userId: true },
    });
    if (!profile) {
      throw new NotFoundException(
        "Complete your provider profile before setting your availability",
      );
    }

    const updated = await this.prisma.providerProfile.update({
      where: { userId },
      data: { busyOverride },
      select: { busyOverride: true },
    });

    await this.publishCurrentPresence(userId);

    return updated;
  }

  // ─── Realtime ────────────────────────────────────────────────────────

  /**
   * Recompute and republish a provider's presence. Called after engagement
   * state changes elsewhere (booking accepted / cancelled / completed) so the
   * nearby map learns about busy transitions without waiting for the next
   * location ping. Only publishes while the provider is actually visible —
   * an offline provider changing bookings concerns nobody on the map.
   */
  async refreshAndPublishPresence(providerId: string): Promise<boolean> {
    return this.publishCurrentPresence(providerId);
  }

  /**
   * Build and send the current presence snapshot. Nothing is sent when the
   * provider is not visible on the nearby map, unless `announceOffline` asks
   * for an explicit offline event (so open screens can drop them).
   */
  private async publishCurrentPresence(
    providerId: string,
    options: { announceOffline?: boolean } = {},
  ): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: providerId },
      select: {
        cityId: true,
        providerProfile: {
          select: {
            isOnline: true,
            lastOnlineAt: true,
            latitude: true,
            longitude: true,
            locationUpdatedAt: true,
            busyOverride: true,
            categories: { select: { categoryId: true } },
          },
        },
      },
    });

    const profile = user?.providerProfile;
    if (!user || !profile) return false;
    if (!user.cityId) return false;

    const online = isProviderPresent(profile);
    const locationFresh = isProviderLocationFresh(profile);
    const visible = online && locationFresh;

    if (!visible && !options.announceOffline) return false;

    const activeEngagements = await this.prisma.booking.count({
      where: { providerId, status: { in: BUSY_BOOKING_STATUSES } },
    });
    const isBusy = isProviderBusy(profile.busyOverride, activeEngagements);

    return this.realtime.publishProviderPresence(user.cityId, providerId, {
      providerId,
      cityId: user.cityId,
      categoryIds: profile.categories.map((c) => c.categoryId),
      isOnline: visible,
      isBusy,
      approximateLatitude:
        visible && profile.latitude != null
          ? coarseCoordinate(profile.latitude)
          : null,
      approximateLongitude:
        visible && profile.longitude != null
          ? coarseCoordinate(profile.longitude)
          : null,
      timestamp: new Date(),
    });
  }
}
