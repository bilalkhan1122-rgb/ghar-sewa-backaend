import { BookingStatus, ProviderBusyOverride } from "generated/prisma/client";

/**
 * How long an online flag stays trustworthy after the last heartbeat.
 * The provider app pings every couple of minutes while open; one dropped
 * request on a bad connection must not blink the dot off.
 */
export const PRESENCE_TTL_MS = 5 * 60 * 1000;

/**
 * How long a location fix stays usable for nearby search. The provider app
 * reports its current position periodically while online; a fix older than
 * this window means the provider has stopped reporting (or gone offline) and
 * they must drop out of "nearby" until a fresh fix arrives.
 */
export const LOCATION_TTL_MS = 5 * 60 * 1000;

/** Default and maximum radius a customer may search, in kilometres. */
export const NEARBY_DEFAULT_RADIUS_KM = 5;
export const NEARBY_MAX_RADIUS_KM = 100;

/** Default page size for a nearby search. */
export const NEARBY_DEFAULT_LIMIT = 50;

/**
 * The radius query is capped higher than the response limit because busy
 * providers are dropped after the database round-trip — a cap equal to the
 * limit would silently return fewer providers whenever busy ones were closest.
 */
export const NEARBY_CANDIDATE_LIMIT = 300;

/**
 * Decimal places used when a provider's position is handed to customers.
 * Two decimal degrees is roughly a kilometre — enough to judge proximity,
 * coarse enough that the exact street location is never disclosed.
 */
export const COARSE_LOCATION_DECIMALS = 2;

/**
 * Booking statuses that tie a provider to work. A provider with any booking
 * in these states is not free to take another job, so they do not surface in
 * nearby search (unless they explicitly override to AVAILABLE).
 */
export const BUSY_BOOKING_STATUSES: BookingStatus[] = [
  BookingStatus.ACCEPTED,
  BookingStatus.IN_PROGRESS,
  BookingStatus.DISPUTED,
];

/** Whether the provider's own online switch is still fresh. */
export function isProviderPresent(
  profile: { isOnline: boolean; lastOnlineAt: Date | null } | null | undefined,
): boolean {
  if (!profile?.isOnline || !profile.lastOnlineAt) return false;
  return Date.now() - profile.lastOnlineAt.getTime() < PRESENCE_TTL_MS;
}

/** Whether the provider has a recent, complete location fix. */
export function isProviderLocationFresh(
  profile:
    | {
        locationUpdatedAt: Date | null;
        latitude?: number | null;
        longitude?: number | null;
      }
    | null
    | undefined,
): boolean {
  if (
    !profile?.locationUpdatedAt ||
    profile.latitude == null ||
    profile.longitude == null
  ) {
    return false;
  }
  return Date.now() - profile.locationUpdatedAt.getTime() < LOCATION_TTL_MS;
}

/**
 * Effective busy state. AUTO derives from active bookings; BUSY and
 * AVAILABLE are the provider's manual override for "appear busy / free now".
 */
export function isProviderBusy(
  busyOverride: ProviderBusyOverride | null | undefined,
  activeEngagements: number,
): boolean {
  if (busyOverride === ProviderBusyOverride.BUSY) return true;
  if (busyOverride === ProviderBusyOverride.AVAILABLE) return false;
  return activeEngagements > 0;
}

/** Round a coordinate to the coarseness customers may see. */
export function coarseCoordinate(value: number): number {
  return Number(value.toFixed(COARSE_LOCATION_DECIMALS));
}
