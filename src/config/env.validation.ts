import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(8080),

  // Database
  DATABASE_URL: z.string().min(1, "Invalid DATABASE_URL"),

  // JWT Secrets
  JWT_ACCESS_SECRET: z
    .string()
    .min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),
  JWT_ACCESS_EXPIRY: z
    .string()
    .regex(/^\d+[smhd]$/, "JWT_ACCESS_EXPIRY must be in format: 60m, 1h, etc.")
    .default("60m"),
  JWT_REFRESH_EXPIRY: z
    .string()
    .regex(/^\d+[smhd]$/, "JWT_REFRESH_EXPIRY must be in format: 7d, 30d, etc.")
    .default("30d"),

  // CORS
  CORS_ORIGIN: z
    .string()
    .refine((val) => {
      // Allow comma-separated origins
      const origins = val.split(",").map((o) => o.trim());
      const urlRegex = /^https?:\/\/.+/;
      return origins.every((origin) => urlRegex.test(origin) || origin === "*");
    }, 'CORS_ORIGIN must be valid URL(s) or "*". Multiple origins: "http://localhost:3000,https://example.com"')
    .default("http://localhost:3000"),

  // Push notifications (Firebase Cloud Messaging)
  // Optional: FCM is disabled (notifications marked SENT without real push)
  // until FIREBASE_SERVICE_ACCOUNT is provided (JSON string) or
  // GOOGLE_APPLICATION_CREDENTIALS points to a service account file.
  FIREBASE_SERVICE_ACCOUNT: z.string().optional(),
  GOOGLE_APPLICATION_CREDENTIALS: z.string().optional(),

  // Google OAuth (sign in/sign up)
  // Optional: /auth/google returns 503 until GOOGLE_CLIENT_ID is set.
  // GOOGLE_CLIENT_IDS accepts extra comma-separated audiences (e.g. the
  // Android and iOS client IDs of the same app).
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_IDS: z.string().optional(),

  // Transactional email (Resend)
  // Optional: without RESEND_API_KEY emails are logged as stubs, keeping the
  // rest of the app functional during development.
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional(),

  // Pusher (realtime layer for Modules 19-21 events)
  // Optional: without these the app boots and realtime events are logged as
  // stubs — the database remains the source of truth either way.
  PUSHER_APP_ID: z.string().optional(),
  PUSHER_KEY: z.string().optional(),
  PUSHER_SECRET: z.string().optional(),
  PUSHER_CLUSTER: z.string().optional(),
  FRONTEND_URL: z
    .string()
    .url("FRONTEND_URL must be a valid URL")
    .default("http://localhost:3000"),

  // Wallet (Module 14/15)
  // Platform commission rate as a decimal fraction (e.g. 0.075 = 7.5%)
  COMMISSION_RATE: z.coerce.number().min(0).max(0.99).default(0.075),
  WITHDRAWAL_MIN: z.coerce.number().positive().default(500),
  WITHDRAWAL_MAX: z.coerce.number().positive().default(100000),

  // Logging
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),
});

export type Env = z.infer<typeof envSchema>;
