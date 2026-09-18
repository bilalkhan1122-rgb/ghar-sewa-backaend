/**
 * The fixed choices an admin can pick for a banner's tap target and accent.
 *
 * Both are plain strings on the model (not Prisma enums — see the schema
 * comment on `Banner`), so this file is the one place that actually enforces
 * the allowed values, for the DTOs below and for whoever renders the admin
 * form. `ctaTarget` names a screen the customer app already knows how to
 * route to (`src/constants/routes.ts` in the frontend repo) rather than a raw
 * URL or deep link, so a banner can never point somewhere the app can't open.
 */
export const BANNER_TARGETS = [
  "post-job",
  "providers",
  "nearby",
  "none",
] as const;
export type BannerTarget = (typeof BANNER_TARGETS)[number];

/** Maps to a theme colour token in the frontend — never a raw hex value. */
export const BANNER_ACCENTS = [
  "primary",
  "warning",
  "success",
  "info",
] as const;
export type BannerAccent = (typeof BANNER_ACCENTS)[number];
