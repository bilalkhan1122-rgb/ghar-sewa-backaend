import type { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

/**
 * Builds the CORS origin check from CORS_ORIGIN.
 *
 * Entries are comma-separated and matched exactly, which is what you want for
 * production. Two things exact matching cannot express, and which this adds:
 *
 *   http://localhost:*                  every local dev port
 *   https://ghar-sewa-admin-*.vercel.app  Vercel's random preview URLs
 *
 * A `*` matches any run of characters except `/`, so a pattern can never widen
 * past its own origin into a path. `*` on its own still means "any origin",
 * as before.
 */
function toMatcher(entry: string): (origin: string) => boolean {
  if (!entry.includes("*")) {
    return (origin) => origin === entry;
  }
  // Escape everything, then re-open the wildcards.
  const pattern = entry
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\\\*/g, "[^/]*");
  const regex = new RegExp(`^${pattern}$`);
  return (origin) => regex.test(origin);
}

export function buildCorsOptions(configured: string | undefined): CorsOptions {
  const entries = (configured ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  if (entries.length === 0 || entries.includes("*")) {
    return { origin: true, credentials: true };
  }

  const matchers = entries.map(toMatcher);

  return {
    origin(origin, callback) {
      // No Origin header at all: same-origin requests, curl, mobile apps and
      // server-to-server calls. CORS does not apply to those, and rejecting
      // them here would break the native app and health checks.
      if (!origin) {
        callback(null, true);
        return;
      }
      callback(
        null,
        matchers.some((matches) => matches(origin)),
      );
    },
    credentials: true,
  };
}
