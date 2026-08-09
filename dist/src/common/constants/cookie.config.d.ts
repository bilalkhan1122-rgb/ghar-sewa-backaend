export declare const COOKIE_CONFIG: {
    readonly ACCESS_TOKEN: {
        readonly name: "accessToken";
        readonly options: {
            readonly httpOnly: true;
            readonly sameSite: "strict" | "lax";
            readonly secure: boolean;
            readonly maxAge: number;
        };
    };
    readonly REFRESH_TOKEN: {
        readonly name: "refreshToken";
        readonly options: {
            readonly httpOnly: true;
            readonly sameSite: "strict" | "lax";
            readonly secure: boolean;
            readonly maxAge: number;
        };
    };
};
