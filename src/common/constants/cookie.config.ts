const isProduction = process.env.NODE_ENV === "production";

// The deployed API and the app are served from different domains, so auth
// cookies are cross-site: browsers only send those when SameSite is 'none',
// which in turn requires Secure. ('strict' silently dropped every cookie and
// made authenticated requests 401 against the deployed backend.) CSRF
// protection therefore rests on the CORS allowlist — keep CORS_ORIGIN tight.
const crossSiteOptions = {
  sameSite: isProduction ? ("none" as const) : ("lax" as const),
  secure: isProduction,
};

export const COOKIE_CONFIG = {
  ACCESS_TOKEN: {
    name: "accessToken",
    options: {
      httpOnly: true,
      ...crossSiteOptions,
      maxAge: 60 * 60 * 1000, // 1 hour
    },
  },
  REFRESH_TOKEN: {
    name: "refreshToken",
    options: {
      httpOnly: true,
      ...crossSiteOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  },
} as const;
