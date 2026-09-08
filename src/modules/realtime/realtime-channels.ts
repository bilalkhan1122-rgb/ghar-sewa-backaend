/**
 * Realtime channel naming + authorization rules (Pusher).
 *
 * Every channel is private (server-authenticated). A channel name embeds the
 * owning user's id, so subscription authorization is a pure string check —
 * no database round-trip needed on the auth path:
 *
 *   private-user-{userId}      → any event addressed to that user
 *   private-provider-{userId}  → provider-specific events (rank, job feed)
 *   private-nearby-{cityId}    → provider presence for the nearby map
 *   private-admin              → admin-only events (analytics)
 *
 * A user may ONLY ever subscribe to channels that carry their own id, plus —
 * while acting as a customer — the presence feed of any city. Everything else
 * is rejected, which prevents listening to another user's / provider's events.
 */
export const PUSHER_CHANNELS = {
  admin: "private-admin",
  user: (userId: string) => `private-user-${userId}`,
  provider: (providerId: string) => `private-provider-${providerId}`,
  /**
   * Presence broadcast for one city's "providers near me" map. Only coarse
   * provider info ever travels on it (rounded coordinates, never an exact
   * fix), and only accounts that may act as a customer may subscribe.
   */
  nearby: (cityId: string) => `private-nearby-${cityId}`,
} as const;

export interface RealtimeUser {
  sub: string;
  role?: string;
  roles?: string[];
}

/** Whether an account may act as `role`, whatever its current mode. */
function mayActAs(user: RealtimeUser, role: string): boolean {
  if (user.roles && user.roles.length > 0) return user.roles.includes(role);
  return user.role === role;
}

/**
 * Is this user allowed to subscribe to the given channel?
 * Pure function — unit-tested directly.
 */
export function isChannelAllowedForUser(
  user: RealtimeUser,
  channelName: string,
): boolean {
  if (!channelName || typeof channelName !== "string") return false;

  if (channelName === PUSHER_CHANNELS.admin) {
    return mayActAs(user, "ADMIN");
  }

  // private-user-{id} / private-provider-{id}: only your own id
  if (channelName.startsWith("private-user-")) {
    return channelName === PUSHER_CHANNELS.user(user.sub);
  }
  if (channelName.startsWith("private-provider-")) {
    return channelName === PUSHER_CHANNELS.provider(user.sub);
  }

  // private-nearby-{cityId}: the nearby map is a *customer* screen. A pure
  // provider account cannot listen in, and a dual-role account can only while
  // it may act as a customer.
  if (channelName.startsWith("private-nearby-")) {
    return mayActAs(user, "CUSTOMER");
  }

  return false;
}
