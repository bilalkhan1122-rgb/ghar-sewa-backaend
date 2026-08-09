import { z } from 'zod';
export declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        production: "production";
        development: "development";
        test: "test";
    }>>;
    PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    DATABASE_URL: z.ZodString;
    JWT_ACCESS_SECRET: z.ZodString;
    JWT_REFRESH_SECRET: z.ZodString;
    JWT_ACCESS_EXPIRY: z.ZodDefault<z.ZodString>;
    JWT_REFRESH_EXPIRY: z.ZodDefault<z.ZodString>;
    CORS_ORIGIN: z.ZodDefault<z.ZodString>;
    FIREBASE_SERVICE_ACCOUNT: z.ZodOptional<z.ZodString>;
    GOOGLE_APPLICATION_CREDENTIALS: z.ZodOptional<z.ZodString>;
    COMMISSION_RATE: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    WITHDRAWAL_MIN: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    WITHDRAWAL_MAX: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    LOG_LEVEL: z.ZodDefault<z.ZodEnum<{
        info: "info";
        warn: "warn";
        error: "error";
        fatal: "fatal";
        debug: "debug";
        trace: "trace";
    }>>;
}, z.core.$strip>;
export type Env = z.infer<typeof envSchema>;
