"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(['development', 'production', 'test'])
        .default('development'),
    PORT: zod_1.z.coerce.number().default(8080),
    DATABASE_URL: zod_1.z.string().min(1, 'Invalid DATABASE_URL'),
    JWT_ACCESS_SECRET: zod_1.z
        .string()
        .min(32, 'JWT_ACCESS_SECRET must be at least 32 characters'),
    JWT_REFRESH_SECRET: zod_1.z
        .string()
        .min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
    JWT_ACCESS_EXPIRY: zod_1.z
        .string()
        .regex(/^\d+[smhd]$/, 'JWT_ACCESS_EXPIRY must be in format: 60m, 1h, etc.')
        .default('60m'),
    JWT_REFRESH_EXPIRY: zod_1.z
        .string()
        .regex(/^\d+[smhd]$/, 'JWT_REFRESH_EXPIRY must be in format: 7d, 30d, etc.')
        .default('30d'),
    CORS_ORIGIN: zod_1.z
        .string()
        .refine((val) => {
        const origins = val.split(',').map((o) => o.trim());
        const urlRegex = /^https?:\/\/.+/;
        return origins.every((origin) => urlRegex.test(origin) || origin === '*');
    }, 'CORS_ORIGIN must be valid URL(s) or "*". Multiple origins: "http://localhost:3000,https://example.com"')
        .default('http://localhost:3000'),
    FIREBASE_SERVICE_ACCOUNT: zod_1.z.string().optional(),
    GOOGLE_APPLICATION_CREDENTIALS: zod_1.z.string().optional(),
    COMMISSION_RATE: zod_1.z.coerce.number().min(0).max(0.99).default(0.075),
    WITHDRAWAL_MIN: zod_1.z.coerce.number().positive().default(500),
    WITHDRAWAL_MAX: zod_1.z.coerce.number().positive().default(100000),
    LOG_LEVEL: zod_1.z
        .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
        .default('info'),
});
//# sourceMappingURL=env.validation.js.map