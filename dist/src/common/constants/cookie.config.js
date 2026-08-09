"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE_CONFIG = void 0;
exports.COOKIE_CONFIG = {
    ACCESS_TOKEN: {
        name: 'accessToken',
        options: {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000,
        },
    },
    REFRESH_TOKEN: {
        name: 'refreshToken',
        options: {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        },
    },
};
//# sourceMappingURL=cookie.config.js.map