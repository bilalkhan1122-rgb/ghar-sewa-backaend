/**
 * Realtime channel naming + authorization rules (Pusher).
 *
 * Every channel is private (server-authenticated). A channel name embeds the
 * owning user's id, so subscription authorization is a pure string check —
 * no database round-trip needed on the auth path:
 *
 *   private-user-{userId}      → any event addressed to that user
 *   private-provider-{userId}  → provider-specific events (rank, job feed)
 *   private-admin              → admin-only events (analytics)
 *
 * A user may ONLY ever subscribe to channels that carry their own id, and
 * admins may additionally subscribe to the admin channel. Everything else is
 * rejected, which prevents listening to another user's / provider's events.
 */
export const PUSHER_CHANNELS = {
  admin: "private-admin",
  user: (userId: string) => `private-user-${userId}`,
  provider: (providerId: string) => `private-provider-${providerId}`,
} as const;

export interface RealtimeUser {
  sub: string;
  role: string;
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
    return user.role === "ADMIN";
  }

  // private-user-{id} / private-provider-{id}: only your own id
  if (channelName.startsWith("private-user-")) {
    return channelName === PUSHER_CHANNELS.user(user.sub);
  }
  if (channelName.startsWith("private-provider-")) {
    return channelName === PUSHER_CHANNELS.provider(user.sub);
  }

  return false;
}
