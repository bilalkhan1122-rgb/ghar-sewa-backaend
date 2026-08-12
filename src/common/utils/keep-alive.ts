import { waitUntil } from "@vercel/functions";

/**
 * Keeps a fire-and-forget promise alive on Vercel.
 *
 * A serverless function is frozen the moment it sends its response, so
 * `void somePromise()` — the pattern used throughout the services for
 * notifications, emails and realtime events — is simply never completed in
 * production. It works locally, where the process keeps running, which is why
 * this only ever showed up as "notifications are flaky on the deployed API".
 *
 * `waitUntil` hands the promise to the platform, which holds the function open
 * until it settles without delaying the response. Off Vercel (local dev, tests)
 * there is no request context and it throws, so the promise is left to run on
 * its own as before.
 *
 * Applied inside the services that do the delivering rather than at the ~70
 * call sites, so every existing `void this.notifications.send(...)` is covered.
 */
export function keepAlive<T>(promise: Promise<T>): Promise<T> {
  try {
    waitUntil(promise);
  } catch {
    // Not running inside a Vercel request — nothing to extend.
  }
  return promise;
}
