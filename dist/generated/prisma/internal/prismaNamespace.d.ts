import * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Metrics = runtime.Metrics;
export type Metric<T> = runtime.Metric<T>;
export type MetricHistogram = runtime.MetricHistogram;
export type MetricHistogramBucket = runtime.MetricHistogramBucket;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull);
};
export declare const DbNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const JsonNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const AnyNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly City: "City";
    readonly User: "User";
    readonly RefreshToken: "RefreshToken";
    readonly ServiceCategory: "ServiceCategory";
    readonly ProviderProfile: "ProviderProfile";
    readonly ProviderServiceCategory: "ProviderServiceCategory";
    readonly GalleryImage: "GalleryImage";
    readonly Booking: "Booking";
    readonly Job: "Job";
    readonly JobImage: "JobImage";
    readonly Bid: "Bid";
    readonly JobTimeline: "JobTimeline";
    readonly CancellationRecord: "CancellationRecord";
    readonly VerificationRequest: "VerificationRequest";
    readonly Dispute: "Dispute";
    readonly DisputeEvidence: "DisputeEvidence";
    readonly DisputeTimeline: "DisputeTimeline";
    readonly ProviderPenalty: "ProviderPenalty";
    readonly Appeal: "Appeal";
    readonly Review: "Review";
    readonly RatingSummary: "RatingSummary";
    readonly RatingFlag: "RatingFlag";
    readonly Conversation: "Conversation";
    readonly Message: "Message";
    readonly Notification: "Notification";
    readonly DeviceRegistration: "DeviceRegistration";
    readonly NotificationPreference: "NotificationPreference";
    readonly Wallet: "Wallet";
    readonly WalletTransaction: "WalletTransaction";
    readonly TopUpRequest: "TopUpRequest";
    readonly WithdrawalRequest: "WithdrawalRequest";
    readonly WalletAuditLog: "WalletAuditLog";
    readonly Admin: "Admin";
    readonly AdminAuditLog: "AdminAuditLog";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "city" | "user" | "refreshToken" | "serviceCategory" | "providerProfile" | "providerServiceCategory" | "galleryImage" | "booking" | "job" | "jobImage" | "bid" | "jobTimeline" | "cancellationRecord" | "verificationRequest" | "dispute" | "disputeEvidence" | "disputeTimeline" | "providerPenalty" | "appeal" | "review" | "ratingSummary" | "ratingFlag" | "conversation" | "message" | "notification" | "deviceRegistration" | "notificationPreference" | "wallet" | "walletTransaction" | "topUpRequest" | "withdrawalRequest" | "walletAuditLog" | "admin" | "adminAuditLog";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        City: {
            payload: Prisma.$CityPayload<ExtArgs>;
            fields: Prisma.CityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CityPayload>;
                };
                findFirst: {
                    args: Prisma.CityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CityPayload>;
                };
                findMany: {
                    args: Prisma.CityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CityPayload>[];
                };
                create: {
                    args: Prisma.CityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CityPayload>;
                };
                createMany: {
                    args: Prisma.CityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CityCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CityPayload>[];
                };
                delete: {
                    args: Prisma.CityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CityPayload>;
                };
                update: {
                    args: Prisma.CityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CityPayload>;
                };
                deleteMany: {
                    args: Prisma.CityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CityUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CityPayload>[];
                };
                upsert: {
                    args: Prisma.CityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CityPayload>;
                };
                aggregate: {
                    args: Prisma.CityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCity>;
                };
                groupBy: {
                    args: Prisma.CityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CityCountAggregateOutputType> | number;
                };
            };
        };
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        RefreshToken: {
            payload: Prisma.$RefreshTokenPayload<ExtArgs>;
            fields: Prisma.RefreshTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findFirst: {
                    args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findMany: {
                    args: Prisma.RefreshTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                create: {
                    args: Prisma.RefreshTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                createMany: {
                    args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                delete: {
                    args: Prisma.RefreshTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                update: {
                    args: Prisma.RefreshTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                upsert: {
                    args: Prisma.RefreshTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                aggregate: {
                    args: Prisma.RefreshTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRefreshToken>;
                };
                groupBy: {
                    args: Prisma.RefreshTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RefreshTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenCountAggregateOutputType> | number;
                };
            };
        };
        ServiceCategory: {
            payload: Prisma.$ServiceCategoryPayload<ExtArgs>;
            fields: Prisma.ServiceCategoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ServiceCategoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceCategoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ServiceCategoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>;
                };
                findFirst: {
                    args: Prisma.ServiceCategoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceCategoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ServiceCategoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>;
                };
                findMany: {
                    args: Prisma.ServiceCategoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>[];
                };
                create: {
                    args: Prisma.ServiceCategoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>;
                };
                createMany: {
                    args: Prisma.ServiceCategoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ServiceCategoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>[];
                };
                delete: {
                    args: Prisma.ServiceCategoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>;
                };
                update: {
                    args: Prisma.ServiceCategoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>;
                };
                deleteMany: {
                    args: Prisma.ServiceCategoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ServiceCategoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ServiceCategoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>[];
                };
                upsert: {
                    args: Prisma.ServiceCategoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>;
                };
                aggregate: {
                    args: Prisma.ServiceCategoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateServiceCategory>;
                };
                groupBy: {
                    args: Prisma.ServiceCategoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ServiceCategoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ServiceCategoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ServiceCategoryCountAggregateOutputType> | number;
                };
            };
        };
        ProviderProfile: {
            payload: Prisma.$ProviderProfilePayload<ExtArgs>;
            fields: Prisma.ProviderProfileFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProviderProfileFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderProfilePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProviderProfileFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderProfilePayload>;
                };
                findFirst: {
                    args: Prisma.ProviderProfileFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderProfilePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProviderProfileFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderProfilePayload>;
                };
                findMany: {
                    args: Prisma.ProviderProfileFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderProfilePayload>[];
                };
                create: {
                    args: Prisma.ProviderProfileCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderProfilePayload>;
                };
                createMany: {
                    args: Prisma.ProviderProfileCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProviderProfileCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderProfilePayload>[];
                };
                delete: {
                    args: Prisma.ProviderProfileDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderProfilePayload>;
                };
                update: {
                    args: Prisma.ProviderProfileUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderProfilePayload>;
                };
                deleteMany: {
                    args: Prisma.ProviderProfileDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProviderProfileUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProviderProfileUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderProfilePayload>[];
                };
                upsert: {
                    args: Prisma.ProviderProfileUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderProfilePayload>;
                };
                aggregate: {
                    args: Prisma.ProviderProfileAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProviderProfile>;
                };
                groupBy: {
                    args: Prisma.ProviderProfileGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProviderProfileGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProviderProfileCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProviderProfileCountAggregateOutputType> | number;
                };
            };
        };
        ProviderServiceCategory: {
            payload: Prisma.$ProviderServiceCategoryPayload<ExtArgs>;
            fields: Prisma.ProviderServiceCategoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProviderServiceCategoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderServiceCategoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProviderServiceCategoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderServiceCategoryPayload>;
                };
                findFirst: {
                    args: Prisma.ProviderServiceCategoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderServiceCategoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProviderServiceCategoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderServiceCategoryPayload>;
                };
                findMany: {
                    args: Prisma.ProviderServiceCategoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderServiceCategoryPayload>[];
                };
                create: {
                    args: Prisma.ProviderServiceCategoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderServiceCategoryPayload>;
                };
                createMany: {
                    args: Prisma.ProviderServiceCategoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProviderServiceCategoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderServiceCategoryPayload>[];
                };
                delete: {
                    args: Prisma.ProviderServiceCategoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderServiceCategoryPayload>;
                };
                update: {
                    args: Prisma.ProviderServiceCategoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderServiceCategoryPayload>;
                };
                deleteMany: {
                    args: Prisma.ProviderServiceCategoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProviderServiceCategoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProviderServiceCategoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderServiceCategoryPayload>[];
                };
                upsert: {
                    args: Prisma.ProviderServiceCategoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderServiceCategoryPayload>;
                };
                aggregate: {
                    args: Prisma.ProviderServiceCategoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProviderServiceCategory>;
                };
                groupBy: {
                    args: Prisma.ProviderServiceCategoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProviderServiceCategoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProviderServiceCategoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProviderServiceCategoryCountAggregateOutputType> | number;
                };
            };
        };
        GalleryImage: {
            payload: Prisma.$GalleryImagePayload<ExtArgs>;
            fields: Prisma.GalleryImageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.GalleryImageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GalleryImagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.GalleryImageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GalleryImagePayload>;
                };
                findFirst: {
                    args: Prisma.GalleryImageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GalleryImagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.GalleryImageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GalleryImagePayload>;
                };
                findMany: {
                    args: Prisma.GalleryImageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GalleryImagePayload>[];
                };
                create: {
                    args: Prisma.GalleryImageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GalleryImagePayload>;
                };
                createMany: {
                    args: Prisma.GalleryImageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.GalleryImageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GalleryImagePayload>[];
                };
                delete: {
                    args: Prisma.GalleryImageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GalleryImagePayload>;
                };
                update: {
                    args: Prisma.GalleryImageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GalleryImagePayload>;
                };
                deleteMany: {
                    args: Prisma.GalleryImageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.GalleryImageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.GalleryImageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GalleryImagePayload>[];
                };
                upsert: {
                    args: Prisma.GalleryImageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GalleryImagePayload>;
                };
                aggregate: {
                    args: Prisma.GalleryImageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateGalleryImage>;
                };
                groupBy: {
                    args: Prisma.GalleryImageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GalleryImageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.GalleryImageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GalleryImageCountAggregateOutputType> | number;
                };
            };
        };
        Booking: {
            payload: Prisma.$BookingPayload<ExtArgs>;
            fields: Prisma.BookingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BookingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                findFirst: {
                    args: Prisma.BookingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                findMany: {
                    args: Prisma.BookingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>[];
                };
                create: {
                    args: Prisma.BookingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                createMany: {
                    args: Prisma.BookingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>[];
                };
                delete: {
                    args: Prisma.BookingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                update: {
                    args: Prisma.BookingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                deleteMany: {
                    args: Prisma.BookingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BookingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BookingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>[];
                };
                upsert: {
                    args: Prisma.BookingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                aggregate: {
                    args: Prisma.BookingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBooking>;
                };
                groupBy: {
                    args: Prisma.BookingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BookingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BookingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BookingCountAggregateOutputType> | number;
                };
            };
        };
        Job: {
            payload: Prisma.$JobPayload<ExtArgs>;
            fields: Prisma.JobFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.JobFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.JobFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload>;
                };
                findFirst: {
                    args: Prisma.JobFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.JobFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload>;
                };
                findMany: {
                    args: Prisma.JobFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload>[];
                };
                create: {
                    args: Prisma.JobCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload>;
                };
                createMany: {
                    args: Prisma.JobCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.JobCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload>[];
                };
                delete: {
                    args: Prisma.JobDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload>;
                };
                update: {
                    args: Prisma.JobUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload>;
                };
                deleteMany: {
                    args: Prisma.JobDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.JobUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.JobUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload>[];
                };
                upsert: {
                    args: Prisma.JobUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload>;
                };
                aggregate: {
                    args: Prisma.JobAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateJob>;
                };
                groupBy: {
                    args: Prisma.JobGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobGroupByOutputType>[];
                };
                count: {
                    args: Prisma.JobCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobCountAggregateOutputType> | number;
                };
            };
        };
        JobImage: {
            payload: Prisma.$JobImagePayload<ExtArgs>;
            fields: Prisma.JobImageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.JobImageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobImagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.JobImageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobImagePayload>;
                };
                findFirst: {
                    args: Prisma.JobImageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobImagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.JobImageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobImagePayload>;
                };
                findMany: {
                    args: Prisma.JobImageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobImagePayload>[];
                };
                create: {
                    args: Prisma.JobImageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobImagePayload>;
                };
                createMany: {
                    args: Prisma.JobImageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.JobImageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobImagePayload>[];
                };
                delete: {
                    args: Prisma.JobImageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobImagePayload>;
                };
                update: {
                    args: Prisma.JobImageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobImagePayload>;
                };
                deleteMany: {
                    args: Prisma.JobImageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.JobImageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.JobImageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobImagePayload>[];
                };
                upsert: {
                    args: Prisma.JobImageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobImagePayload>;
                };
                aggregate: {
                    args: Prisma.JobImageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateJobImage>;
                };
                groupBy: {
                    args: Prisma.JobImageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobImageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.JobImageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobImageCountAggregateOutputType> | number;
                };
            };
        };
        Bid: {
            payload: Prisma.$BidPayload<ExtArgs>;
            fields: Prisma.BidFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BidFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BidPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BidFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BidPayload>;
                };
                findFirst: {
                    args: Prisma.BidFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BidPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BidFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BidPayload>;
                };
                findMany: {
                    args: Prisma.BidFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BidPayload>[];
                };
                create: {
                    args: Prisma.BidCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BidPayload>;
                };
                createMany: {
                    args: Prisma.BidCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BidCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BidPayload>[];
                };
                delete: {
                    args: Prisma.BidDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BidPayload>;
                };
                update: {
                    args: Prisma.BidUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BidPayload>;
                };
                deleteMany: {
                    args: Prisma.BidDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BidUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BidUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BidPayload>[];
                };
                upsert: {
                    args: Prisma.BidUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BidPayload>;
                };
                aggregate: {
                    args: Prisma.BidAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBid>;
                };
                groupBy: {
                    args: Prisma.BidGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BidGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BidCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BidCountAggregateOutputType> | number;
                };
            };
        };
        JobTimeline: {
            payload: Prisma.$JobTimelinePayload<ExtArgs>;
            fields: Prisma.JobTimelineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.JobTimelineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobTimelinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.JobTimelineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobTimelinePayload>;
                };
                findFirst: {
                    args: Prisma.JobTimelineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobTimelinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.JobTimelineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobTimelinePayload>;
                };
                findMany: {
                    args: Prisma.JobTimelineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobTimelinePayload>[];
                };
                create: {
                    args: Prisma.JobTimelineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobTimelinePayload>;
                };
                createMany: {
                    args: Prisma.JobTimelineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.JobTimelineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobTimelinePayload>[];
                };
                delete: {
                    args: Prisma.JobTimelineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobTimelinePayload>;
                };
                update: {
                    args: Prisma.JobTimelineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobTimelinePayload>;
                };
                deleteMany: {
                    args: Prisma.JobTimelineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.JobTimelineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.JobTimelineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobTimelinePayload>[];
                };
                upsert: {
                    args: Prisma.JobTimelineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobTimelinePayload>;
                };
                aggregate: {
                    args: Prisma.JobTimelineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateJobTimeline>;
                };
                groupBy: {
                    args: Prisma.JobTimelineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobTimelineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.JobTimelineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobTimelineCountAggregateOutputType> | number;
                };
            };
        };
        CancellationRecord: {
            payload: Prisma.$CancellationRecordPayload<ExtArgs>;
            fields: Prisma.CancellationRecordFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CancellationRecordFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancellationRecordPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CancellationRecordFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancellationRecordPayload>;
                };
                findFirst: {
                    args: Prisma.CancellationRecordFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancellationRecordPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CancellationRecordFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancellationRecordPayload>;
                };
                findMany: {
                    args: Prisma.CancellationRecordFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancellationRecordPayload>[];
                };
                create: {
                    args: Prisma.CancellationRecordCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancellationRecordPayload>;
                };
                createMany: {
                    args: Prisma.CancellationRecordCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CancellationRecordCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancellationRecordPayload>[];
                };
                delete: {
                    args: Prisma.CancellationRecordDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancellationRecordPayload>;
                };
                update: {
                    args: Prisma.CancellationRecordUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancellationRecordPayload>;
                };
                deleteMany: {
                    args: Prisma.CancellationRecordDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CancellationRecordUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CancellationRecordUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancellationRecordPayload>[];
                };
                upsert: {
                    args: Prisma.CancellationRecordUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancellationRecordPayload>;
                };
                aggregate: {
                    args: Prisma.CancellationRecordAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCancellationRecord>;
                };
                groupBy: {
                    args: Prisma.CancellationRecordGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CancellationRecordGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CancellationRecordCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CancellationRecordCountAggregateOutputType> | number;
                };
            };
        };
        VerificationRequest: {
            payload: Prisma.$VerificationRequestPayload<ExtArgs>;
            fields: Prisma.VerificationRequestFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VerificationRequestFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationRequestPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VerificationRequestFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationRequestPayload>;
                };
                findFirst: {
                    args: Prisma.VerificationRequestFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationRequestPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VerificationRequestFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationRequestPayload>;
                };
                findMany: {
                    args: Prisma.VerificationRequestFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationRequestPayload>[];
                };
                create: {
                    args: Prisma.VerificationRequestCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationRequestPayload>;
                };
                createMany: {
                    args: Prisma.VerificationRequestCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VerificationRequestCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationRequestPayload>[];
                };
                delete: {
                    args: Prisma.VerificationRequestDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationRequestPayload>;
                };
                update: {
                    args: Prisma.VerificationRequestUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationRequestPayload>;
                };
                deleteMany: {
                    args: Prisma.VerificationRequestDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VerificationRequestUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VerificationRequestUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationRequestPayload>[];
                };
                upsert: {
                    args: Prisma.VerificationRequestUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationRequestPayload>;
                };
                aggregate: {
                    args: Prisma.VerificationRequestAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVerificationRequest>;
                };
                groupBy: {
                    args: Prisma.VerificationRequestGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VerificationRequestGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VerificationRequestCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VerificationRequestCountAggregateOutputType> | number;
                };
            };
        };
        Dispute: {
            payload: Prisma.$DisputePayload<ExtArgs>;
            fields: Prisma.DisputeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DisputeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DisputeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>;
                };
                findFirst: {
                    args: Prisma.DisputeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DisputeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>;
                };
                findMany: {
                    args: Prisma.DisputeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>[];
                };
                create: {
                    args: Prisma.DisputeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>;
                };
                createMany: {
                    args: Prisma.DisputeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DisputeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>[];
                };
                delete: {
                    args: Prisma.DisputeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>;
                };
                update: {
                    args: Prisma.DisputeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>;
                };
                deleteMany: {
                    args: Prisma.DisputeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DisputeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DisputeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>[];
                };
                upsert: {
                    args: Prisma.DisputeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>;
                };
                aggregate: {
                    args: Prisma.DisputeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDispute>;
                };
                groupBy: {
                    args: Prisma.DisputeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DisputeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DisputeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DisputeCountAggregateOutputType> | number;
                };
            };
        };
        DisputeEvidence: {
            payload: Prisma.$DisputeEvidencePayload<ExtArgs>;
            fields: Prisma.DisputeEvidenceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DisputeEvidenceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DisputeEvidenceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>;
                };
                findFirst: {
                    args: Prisma.DisputeEvidenceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DisputeEvidenceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>;
                };
                findMany: {
                    args: Prisma.DisputeEvidenceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>[];
                };
                create: {
                    args: Prisma.DisputeEvidenceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>;
                };
                createMany: {
                    args: Prisma.DisputeEvidenceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DisputeEvidenceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>[];
                };
                delete: {
                    args: Prisma.DisputeEvidenceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>;
                };
                update: {
                    args: Prisma.DisputeEvidenceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>;
                };
                deleteMany: {
                    args: Prisma.DisputeEvidenceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DisputeEvidenceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DisputeEvidenceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>[];
                };
                upsert: {
                    args: Prisma.DisputeEvidenceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>;
                };
                aggregate: {
                    args: Prisma.DisputeEvidenceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDisputeEvidence>;
                };
                groupBy: {
                    args: Prisma.DisputeEvidenceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DisputeEvidenceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DisputeEvidenceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DisputeEvidenceCountAggregateOutputType> | number;
                };
            };
        };
        DisputeTimeline: {
            payload: Prisma.$DisputeTimelinePayload<ExtArgs>;
            fields: Prisma.DisputeTimelineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DisputeTimelineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeTimelinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DisputeTimelineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeTimelinePayload>;
                };
                findFirst: {
                    args: Prisma.DisputeTimelineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeTimelinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DisputeTimelineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeTimelinePayload>;
                };
                findMany: {
                    args: Prisma.DisputeTimelineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeTimelinePayload>[];
                };
                create: {
                    args: Prisma.DisputeTimelineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeTimelinePayload>;
                };
                createMany: {
                    args: Prisma.DisputeTimelineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DisputeTimelineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeTimelinePayload>[];
                };
                delete: {
                    args: Prisma.DisputeTimelineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeTimelinePayload>;
                };
                update: {
                    args: Prisma.DisputeTimelineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeTimelinePayload>;
                };
                deleteMany: {
                    args: Prisma.DisputeTimelineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DisputeTimelineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DisputeTimelineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeTimelinePayload>[];
                };
                upsert: {
                    args: Prisma.DisputeTimelineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeTimelinePayload>;
                };
                aggregate: {
                    args: Prisma.DisputeTimelineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDisputeTimeline>;
                };
                groupBy: {
                    args: Prisma.DisputeTimelineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DisputeTimelineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DisputeTimelineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DisputeTimelineCountAggregateOutputType> | number;
                };
            };
        };
        ProviderPenalty: {
            payload: Prisma.$ProviderPenaltyPayload<ExtArgs>;
            fields: Prisma.ProviderPenaltyFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProviderPenaltyFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderPenaltyPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProviderPenaltyFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderPenaltyPayload>;
                };
                findFirst: {
                    args: Prisma.ProviderPenaltyFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderPenaltyPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProviderPenaltyFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderPenaltyPayload>;
                };
                findMany: {
                    args: Prisma.ProviderPenaltyFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderPenaltyPayload>[];
                };
                create: {
                    args: Prisma.ProviderPenaltyCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderPenaltyPayload>;
                };
                createMany: {
                    args: Prisma.ProviderPenaltyCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProviderPenaltyCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderPenaltyPayload>[];
                };
                delete: {
                    args: Prisma.ProviderPenaltyDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderPenaltyPayload>;
                };
                update: {
                    args: Prisma.ProviderPenaltyUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderPenaltyPayload>;
                };
                deleteMany: {
                    args: Prisma.ProviderPenaltyDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProviderPenaltyUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProviderPenaltyUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderPenaltyPayload>[];
                };
                upsert: {
                    args: Prisma.ProviderPenaltyUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderPenaltyPayload>;
                };
                aggregate: {
                    args: Prisma.ProviderPenaltyAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProviderPenalty>;
                };
                groupBy: {
                    args: Prisma.ProviderPenaltyGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProviderPenaltyGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProviderPenaltyCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProviderPenaltyCountAggregateOutputType> | number;
                };
            };
        };
        Appeal: {
            payload: Prisma.$AppealPayload<ExtArgs>;
            fields: Prisma.AppealFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AppealFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppealPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AppealFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppealPayload>;
                };
                findFirst: {
                    args: Prisma.AppealFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppealPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AppealFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppealPayload>;
                };
                findMany: {
                    args: Prisma.AppealFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppealPayload>[];
                };
                create: {
                    args: Prisma.AppealCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppealPayload>;
                };
                createMany: {
                    args: Prisma.AppealCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AppealCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppealPayload>[];
                };
                delete: {
                    args: Prisma.AppealDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppealPayload>;
                };
                update: {
                    args: Prisma.AppealUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppealPayload>;
                };
                deleteMany: {
                    args: Prisma.AppealDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AppealUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AppealUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppealPayload>[];
                };
                upsert: {
                    args: Prisma.AppealUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppealPayload>;
                };
                aggregate: {
                    args: Prisma.AppealAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAppeal>;
                };
                groupBy: {
                    args: Prisma.AppealGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AppealGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AppealCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AppealCountAggregateOutputType> | number;
                };
            };
        };
        Review: {
            payload: Prisma.$ReviewPayload<ExtArgs>;
            fields: Prisma.ReviewFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ReviewFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                findFirst: {
                    args: Prisma.ReviewFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                findMany: {
                    args: Prisma.ReviewFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>[];
                };
                create: {
                    args: Prisma.ReviewCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                createMany: {
                    args: Prisma.ReviewCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>[];
                };
                delete: {
                    args: Prisma.ReviewDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                update: {
                    args: Prisma.ReviewUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                deleteMany: {
                    args: Prisma.ReviewDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ReviewUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ReviewUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>[];
                };
                upsert: {
                    args: Prisma.ReviewUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                aggregate: {
                    args: Prisma.ReviewAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReview>;
                };
                groupBy: {
                    args: Prisma.ReviewGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReviewGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ReviewCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReviewCountAggregateOutputType> | number;
                };
            };
        };
        RatingSummary: {
            payload: Prisma.$RatingSummaryPayload<ExtArgs>;
            fields: Prisma.RatingSummaryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RatingSummaryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingSummaryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RatingSummaryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingSummaryPayload>;
                };
                findFirst: {
                    args: Prisma.RatingSummaryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingSummaryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RatingSummaryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingSummaryPayload>;
                };
                findMany: {
                    args: Prisma.RatingSummaryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingSummaryPayload>[];
                };
                create: {
                    args: Prisma.RatingSummaryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingSummaryPayload>;
                };
                createMany: {
                    args: Prisma.RatingSummaryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RatingSummaryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingSummaryPayload>[];
                };
                delete: {
                    args: Prisma.RatingSummaryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingSummaryPayload>;
                };
                update: {
                    args: Prisma.RatingSummaryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingSummaryPayload>;
                };
                deleteMany: {
                    args: Prisma.RatingSummaryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RatingSummaryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RatingSummaryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingSummaryPayload>[];
                };
                upsert: {
                    args: Prisma.RatingSummaryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingSummaryPayload>;
                };
                aggregate: {
                    args: Prisma.RatingSummaryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRatingSummary>;
                };
                groupBy: {
                    args: Prisma.RatingSummaryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RatingSummaryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RatingSummaryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RatingSummaryCountAggregateOutputType> | number;
                };
            };
        };
        RatingFlag: {
            payload: Prisma.$RatingFlagPayload<ExtArgs>;
            fields: Prisma.RatingFlagFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RatingFlagFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingFlagPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RatingFlagFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingFlagPayload>;
                };
                findFirst: {
                    args: Prisma.RatingFlagFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingFlagPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RatingFlagFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingFlagPayload>;
                };
                findMany: {
                    args: Prisma.RatingFlagFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingFlagPayload>[];
                };
                create: {
                    args: Prisma.RatingFlagCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingFlagPayload>;
                };
                createMany: {
                    args: Prisma.RatingFlagCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RatingFlagCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingFlagPayload>[];
                };
                delete: {
                    args: Prisma.RatingFlagDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingFlagPayload>;
                };
                update: {
                    args: Prisma.RatingFlagUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingFlagPayload>;
                };
                deleteMany: {
                    args: Prisma.RatingFlagDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RatingFlagUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RatingFlagUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingFlagPayload>[];
                };
                upsert: {
                    args: Prisma.RatingFlagUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingFlagPayload>;
                };
                aggregate: {
                    args: Prisma.RatingFlagAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRatingFlag>;
                };
                groupBy: {
                    args: Prisma.RatingFlagGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RatingFlagGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RatingFlagCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RatingFlagCountAggregateOutputType> | number;
                };
            };
        };
        Conversation: {
            payload: Prisma.$ConversationPayload<ExtArgs>;
            fields: Prisma.ConversationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ConversationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                findFirst: {
                    args: Prisma.ConversationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                findMany: {
                    args: Prisma.ConversationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>[];
                };
                create: {
                    args: Prisma.ConversationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                createMany: {
                    args: Prisma.ConversationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ConversationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>[];
                };
                delete: {
                    args: Prisma.ConversationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                update: {
                    args: Prisma.ConversationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                deleteMany: {
                    args: Prisma.ConversationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ConversationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ConversationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>[];
                };
                upsert: {
                    args: Prisma.ConversationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                aggregate: {
                    args: Prisma.ConversationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateConversation>;
                };
                groupBy: {
                    args: Prisma.ConversationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConversationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ConversationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConversationCountAggregateOutputType> | number;
                };
            };
        };
        Message: {
            payload: Prisma.$MessagePayload<ExtArgs>;
            fields: Prisma.MessageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MessageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                findFirst: {
                    args: Prisma.MessageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                findMany: {
                    args: Prisma.MessageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>[];
                };
                create: {
                    args: Prisma.MessageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                createMany: {
                    args: Prisma.MessageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>[];
                };
                delete: {
                    args: Prisma.MessageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                update: {
                    args: Prisma.MessageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                deleteMany: {
                    args: Prisma.MessageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MessageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>[];
                };
                upsert: {
                    args: Prisma.MessageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                aggregate: {
                    args: Prisma.MessageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMessage>;
                };
                groupBy: {
                    args: Prisma.MessageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MessageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MessageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MessageCountAggregateOutputType> | number;
                };
            };
        };
        Notification: {
            payload: Prisma.$NotificationPayload<ExtArgs>;
            fields: Prisma.NotificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findMany: {
                    args: Prisma.NotificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                create: {
                    args: Prisma.NotificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                createMany: {
                    args: Prisma.NotificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                delete: {
                    args: Prisma.NotificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                update: {
                    args: Prisma.NotificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                upsert: {
                    args: Prisma.NotificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotification>;
                };
                groupBy: {
                    args: Prisma.NotificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationCountAggregateOutputType> | number;
                };
            };
        };
        DeviceRegistration: {
            payload: Prisma.$DeviceRegistrationPayload<ExtArgs>;
            fields: Prisma.DeviceRegistrationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DeviceRegistrationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DeviceRegistrationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>;
                };
                findFirst: {
                    args: Prisma.DeviceRegistrationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DeviceRegistrationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>;
                };
                findMany: {
                    args: Prisma.DeviceRegistrationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>[];
                };
                create: {
                    args: Prisma.DeviceRegistrationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>;
                };
                createMany: {
                    args: Prisma.DeviceRegistrationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DeviceRegistrationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>[];
                };
                delete: {
                    args: Prisma.DeviceRegistrationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>;
                };
                update: {
                    args: Prisma.DeviceRegistrationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>;
                };
                deleteMany: {
                    args: Prisma.DeviceRegistrationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DeviceRegistrationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DeviceRegistrationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>[];
                };
                upsert: {
                    args: Prisma.DeviceRegistrationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>;
                };
                aggregate: {
                    args: Prisma.DeviceRegistrationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDeviceRegistration>;
                };
                groupBy: {
                    args: Prisma.DeviceRegistrationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeviceRegistrationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DeviceRegistrationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeviceRegistrationCountAggregateOutputType> | number;
                };
            };
        };
        NotificationPreference: {
            payload: Prisma.$NotificationPreferencePayload<ExtArgs>;
            fields: Prisma.NotificationPreferenceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationPreferenceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                findFirst: {
                    args: Prisma.NotificationPreferenceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationPreferenceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                findMany: {
                    args: Prisma.NotificationPreferenceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[];
                };
                create: {
                    args: Prisma.NotificationPreferenceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                createMany: {
                    args: Prisma.NotificationPreferenceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationPreferenceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[];
                };
                delete: {
                    args: Prisma.NotificationPreferenceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                update: {
                    args: Prisma.NotificationPreferenceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationPreferenceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationPreferenceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationPreferenceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[];
                };
                upsert: {
                    args: Prisma.NotificationPreferenceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                aggregate: {
                    args: Prisma.NotificationPreferenceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotificationPreference>;
                };
                groupBy: {
                    args: Prisma.NotificationPreferenceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationPreferenceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationPreferenceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationPreferenceCountAggregateOutputType> | number;
                };
            };
        };
        Wallet: {
            payload: Prisma.$WalletPayload<ExtArgs>;
            fields: Prisma.WalletFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WalletFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WalletFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                findFirst: {
                    args: Prisma.WalletFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WalletFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                findMany: {
                    args: Prisma.WalletFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>[];
                };
                create: {
                    args: Prisma.WalletCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                createMany: {
                    args: Prisma.WalletCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WalletCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>[];
                };
                delete: {
                    args: Prisma.WalletDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                update: {
                    args: Prisma.WalletUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                deleteMany: {
                    args: Prisma.WalletDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WalletUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WalletUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>[];
                };
                upsert: {
                    args: Prisma.WalletUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                aggregate: {
                    args: Prisma.WalletAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWallet>;
                };
                groupBy: {
                    args: Prisma.WalletGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WalletGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WalletCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WalletCountAggregateOutputType> | number;
                };
            };
        };
        WalletTransaction: {
            payload: Prisma.$WalletTransactionPayload<ExtArgs>;
            fields: Prisma.WalletTransactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WalletTransactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WalletTransactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                findFirst: {
                    args: Prisma.WalletTransactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WalletTransactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                findMany: {
                    args: Prisma.WalletTransactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>[];
                };
                create: {
                    args: Prisma.WalletTransactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                createMany: {
                    args: Prisma.WalletTransactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WalletTransactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>[];
                };
                delete: {
                    args: Prisma.WalletTransactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                update: {
                    args: Prisma.WalletTransactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                deleteMany: {
                    args: Prisma.WalletTransactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WalletTransactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WalletTransactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>[];
                };
                upsert: {
                    args: Prisma.WalletTransactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                aggregate: {
                    args: Prisma.WalletTransactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWalletTransaction>;
                };
                groupBy: {
                    args: Prisma.WalletTransactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WalletTransactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WalletTransactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WalletTransactionCountAggregateOutputType> | number;
                };
            };
        };
        TopUpRequest: {
            payload: Prisma.$TopUpRequestPayload<ExtArgs>;
            fields: Prisma.TopUpRequestFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TopUpRequestFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopUpRequestPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TopUpRequestFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopUpRequestPayload>;
                };
                findFirst: {
                    args: Prisma.TopUpRequestFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopUpRequestPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TopUpRequestFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopUpRequestPayload>;
                };
                findMany: {
                    args: Prisma.TopUpRequestFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopUpRequestPayload>[];
                };
                create: {
                    args: Prisma.TopUpRequestCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopUpRequestPayload>;
                };
                createMany: {
                    args: Prisma.TopUpRequestCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TopUpRequestCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopUpRequestPayload>[];
                };
                delete: {
                    args: Prisma.TopUpRequestDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopUpRequestPayload>;
                };
                update: {
                    args: Prisma.TopUpRequestUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopUpRequestPayload>;
                };
                deleteMany: {
                    args: Prisma.TopUpRequestDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TopUpRequestUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TopUpRequestUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopUpRequestPayload>[];
                };
                upsert: {
                    args: Prisma.TopUpRequestUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopUpRequestPayload>;
                };
                aggregate: {
                    args: Prisma.TopUpRequestAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTopUpRequest>;
                };
                groupBy: {
                    args: Prisma.TopUpRequestGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TopUpRequestGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TopUpRequestCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TopUpRequestCountAggregateOutputType> | number;
                };
            };
        };
        WithdrawalRequest: {
            payload: Prisma.$WithdrawalRequestPayload<ExtArgs>;
            fields: Prisma.WithdrawalRequestFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WithdrawalRequestFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WithdrawalRequestFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>;
                };
                findFirst: {
                    args: Prisma.WithdrawalRequestFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WithdrawalRequestFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>;
                };
                findMany: {
                    args: Prisma.WithdrawalRequestFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>[];
                };
                create: {
                    args: Prisma.WithdrawalRequestCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>;
                };
                createMany: {
                    args: Prisma.WithdrawalRequestCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WithdrawalRequestCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>[];
                };
                delete: {
                    args: Prisma.WithdrawalRequestDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>;
                };
                update: {
                    args: Prisma.WithdrawalRequestUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>;
                };
                deleteMany: {
                    args: Prisma.WithdrawalRequestDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WithdrawalRequestUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WithdrawalRequestUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>[];
                };
                upsert: {
                    args: Prisma.WithdrawalRequestUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>;
                };
                aggregate: {
                    args: Prisma.WithdrawalRequestAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWithdrawalRequest>;
                };
                groupBy: {
                    args: Prisma.WithdrawalRequestGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WithdrawalRequestGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WithdrawalRequestCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WithdrawalRequestCountAggregateOutputType> | number;
                };
            };
        };
        WalletAuditLog: {
            payload: Prisma.$WalletAuditLogPayload<ExtArgs>;
            fields: Prisma.WalletAuditLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WalletAuditLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletAuditLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WalletAuditLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletAuditLogPayload>;
                };
                findFirst: {
                    args: Prisma.WalletAuditLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletAuditLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WalletAuditLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletAuditLogPayload>;
                };
                findMany: {
                    args: Prisma.WalletAuditLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletAuditLogPayload>[];
                };
                create: {
                    args: Prisma.WalletAuditLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletAuditLogPayload>;
                };
                createMany: {
                    args: Prisma.WalletAuditLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WalletAuditLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletAuditLogPayload>[];
                };
                delete: {
                    args: Prisma.WalletAuditLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletAuditLogPayload>;
                };
                update: {
                    args: Prisma.WalletAuditLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletAuditLogPayload>;
                };
                deleteMany: {
                    args: Prisma.WalletAuditLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WalletAuditLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WalletAuditLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletAuditLogPayload>[];
                };
                upsert: {
                    args: Prisma.WalletAuditLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletAuditLogPayload>;
                };
                aggregate: {
                    args: Prisma.WalletAuditLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWalletAuditLog>;
                };
                groupBy: {
                    args: Prisma.WalletAuditLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WalletAuditLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WalletAuditLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WalletAuditLogCountAggregateOutputType> | number;
                };
            };
        };
        Admin: {
            payload: Prisma.$AdminPayload<ExtArgs>;
            fields: Prisma.AdminFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AdminFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                findFirst: {
                    args: Prisma.AdminFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                findMany: {
                    args: Prisma.AdminFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>[];
                };
                create: {
                    args: Prisma.AdminCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                createMany: {
                    args: Prisma.AdminCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>[];
                };
                delete: {
                    args: Prisma.AdminDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                update: {
                    args: Prisma.AdminUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                deleteMany: {
                    args: Prisma.AdminDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AdminUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>[];
                };
                upsert: {
                    args: Prisma.AdminUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                aggregate: {
                    args: Prisma.AdminAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAdmin>;
                };
                groupBy: {
                    args: Prisma.AdminGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AdminGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AdminCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AdminCountAggregateOutputType> | number;
                };
            };
        };
        AdminAuditLog: {
            payload: Prisma.$AdminAuditLogPayload<ExtArgs>;
            fields: Prisma.AdminAuditLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AdminAuditLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminAuditLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AdminAuditLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>;
                };
                findFirst: {
                    args: Prisma.AdminAuditLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminAuditLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AdminAuditLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>;
                };
                findMany: {
                    args: Prisma.AdminAuditLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>[];
                };
                create: {
                    args: Prisma.AdminAuditLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>;
                };
                createMany: {
                    args: Prisma.AdminAuditLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AdminAuditLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>[];
                };
                delete: {
                    args: Prisma.AdminAuditLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>;
                };
                update: {
                    args: Prisma.AdminAuditLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>;
                };
                deleteMany: {
                    args: Prisma.AdminAuditLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AdminAuditLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AdminAuditLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>[];
                };
                upsert: {
                    args: Prisma.AdminAuditLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>;
                };
                aggregate: {
                    args: Prisma.AdminAuditLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAdminAuditLog>;
                };
                groupBy: {
                    args: Prisma.AdminAuditLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AdminAuditLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AdminAuditLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AdminAuditLogCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const CityScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CityScalarFieldEnum = (typeof CityScalarFieldEnum)[keyof typeof CityScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly fullName: "fullName";
    readonly phone: "phone";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly role: "role";
    readonly cityId: "cityId";
    readonly address: "address";
    readonly status: "status";
    readonly profileCompleted: "profileCompleted";
    readonly verificationStatus: "verificationStatus";
    readonly refreshToken: "refreshToken";
    readonly isActive: "isActive";
    readonly profilePhoto: "profilePhoto";
    readonly walletBalance: "walletBalance";
    readonly totalSpent: "totalSpent";
    readonly totalTopups: "totalTopups";
    readonly deletedAt: "deletedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const RefreshTokenScalarFieldEnum: {
    readonly id: "id";
    readonly token: "token";
    readonly userId: "userId";
    readonly deviceInfo: "deviceInfo";
    readonly ipAddress: "ipAddress";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];
export declare const ServiceCategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly description: "description";
    readonly icon: "icon";
    readonly isActive: "isActive";
    readonly displayOrder: "displayOrder";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ServiceCategoryScalarFieldEnum = (typeof ServiceCategoryScalarFieldEnum)[keyof typeof ServiceCategoryScalarFieldEnum];
export declare const ProviderProfileScalarFieldEnum: {
    readonly userId: "userId";
    readonly bio: "bio";
    readonly hourlyRate: "hourlyRate";
    readonly serviceRadius: "serviceRadius";
    readonly serviceLocation: "serviceLocation";
    readonly facePhoto: "facePhoto";
    readonly cnicNumber: "cnicNumber";
    readonly cnicFrontImage: "cnicFrontImage";
    readonly cnicBackImage: "cnicBackImage";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProviderProfileScalarFieldEnum = (typeof ProviderProfileScalarFieldEnum)[keyof typeof ProviderProfileScalarFieldEnum];
export declare const ProviderServiceCategoryScalarFieldEnum: {
    readonly providerId: "providerId";
    readonly categoryId: "categoryId";
};
export type ProviderServiceCategoryScalarFieldEnum = (typeof ProviderServiceCategoryScalarFieldEnum)[keyof typeof ProviderServiceCategoryScalarFieldEnum];
export declare const GalleryImageScalarFieldEnum: {
    readonly id: "id";
    readonly providerId: "providerId";
    readonly imageUrl: "imageUrl";
    readonly createdAt: "createdAt";
};
export type GalleryImageScalarFieldEnum = (typeof GalleryImageScalarFieldEnum)[keyof typeof GalleryImageScalarFieldEnum];
export declare const BookingScalarFieldEnum: {
    readonly id: "id";
    readonly jobId: "jobId";
    readonly customerId: "customerId";
    readonly providerId: "providerId";
    readonly status: "status";
    readonly bookingType: "bookingType";
    readonly totalAmount: "totalAmount";
    readonly acceptedAt: "acceptedAt";
    readonly startedAt: "startedAt";
    readonly completedAt: "completedAt";
    readonly confirmedAt: "confirmedAt";
    readonly cancelledAt: "cancelledAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum];
export declare const JobScalarFieldEnum: {
    readonly id: "id";
    readonly customerId: "customerId";
    readonly categoryId: "categoryId";
    readonly title: "title";
    readonly description: "description";
    readonly address: "address";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly offeredPrice: "offeredPrice";
    readonly status: "status";
    readonly expiresAt: "expiresAt";
    readonly preferredSchedule: "preferredSchedule";
    readonly additionalNotes: "additionalNotes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum];
export declare const JobImageScalarFieldEnum: {
    readonly id: "id";
    readonly jobId: "jobId";
    readonly imageUrl: "imageUrl";
    readonly createdAt: "createdAt";
};
export type JobImageScalarFieldEnum = (typeof JobImageScalarFieldEnum)[keyof typeof JobImageScalarFieldEnum];
export declare const BidScalarFieldEnum: {
    readonly id: "id";
    readonly jobId: "jobId";
    readonly providerId: "providerId";
    readonly offeredPrice: "offeredPrice";
    readonly message: "message";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BidScalarFieldEnum = (typeof BidScalarFieldEnum)[keyof typeof BidScalarFieldEnum];
export declare const JobTimelineScalarFieldEnum: {
    readonly id: "id";
    readonly jobId: "jobId";
    readonly event: "event";
    readonly description: "description";
    readonly createdAt: "createdAt";
};
export type JobTimelineScalarFieldEnum = (typeof JobTimelineScalarFieldEnum)[keyof typeof JobTimelineScalarFieldEnum];
export declare const CancellationRecordScalarFieldEnum: {
    readonly id: "id";
    readonly jobId: "jobId";
    readonly bookingId: "bookingId";
    readonly cancelledBy: "cancelledBy";
    readonly cancellationType: "cancellationType";
    readonly penaltyApplied: "penaltyApplied";
    readonly penaltyId: "penaltyId";
    readonly reason: "reason";
    readonly createdAt: "createdAt";
};
export type CancellationRecordScalarFieldEnum = (typeof CancellationRecordScalarFieldEnum)[keyof typeof CancellationRecordScalarFieldEnum];
export declare const VerificationRequestScalarFieldEnum: {
    readonly id: "id";
    readonly providerId: "providerId";
    readonly cnicNumber: "cnicNumber";
    readonly facePhoto: "facePhoto";
    readonly cnicFrontImage: "cnicFrontImage";
    readonly cnicBackImage: "cnicBackImage";
    readonly status: "status";
    readonly submittedAt: "submittedAt";
    readonly reviewedAt: "reviewedAt";
    readonly reviewedBy: "reviewedBy";
    readonly rejectionReason: "rejectionReason";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VerificationRequestScalarFieldEnum = (typeof VerificationRequestScalarFieldEnum)[keyof typeof VerificationRequestScalarFieldEnum];
export declare const DisputeScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly jobId: "jobId";
    readonly raisedById: "raisedById";
    readonly opponentId: "opponentId";
    readonly reason: "reason";
    readonly description: "description";
    readonly status: "status";
    readonly resolution: "resolution";
    readonly refundAmount: "refundAmount";
    readonly evidenceCount: "evidenceCount";
    readonly resolvedAt: "resolvedAt";
    readonly resolvedBy: "resolvedBy";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DisputeScalarFieldEnum = (typeof DisputeScalarFieldEnum)[keyof typeof DisputeScalarFieldEnum];
export declare const DisputeEvidenceScalarFieldEnum: {
    readonly id: "id";
    readonly disputeId: "disputeId";
    readonly uploaderId: "uploaderId";
    readonly type: "type";
    readonly fileUrl: "fileUrl";
    readonly mimeType: "mimeType";
    readonly size: "size";
    readonly createdAt: "createdAt";
};
export type DisputeEvidenceScalarFieldEnum = (typeof DisputeEvidenceScalarFieldEnum)[keyof typeof DisputeEvidenceScalarFieldEnum];
export declare const DisputeTimelineScalarFieldEnum: {
    readonly id: "id";
    readonly disputeId: "disputeId";
    readonly actorId: "actorId";
    readonly action: "action";
    readonly description: "description";
    readonly createdAt: "createdAt";
};
export type DisputeTimelineScalarFieldEnum = (typeof DisputeTimelineScalarFieldEnum)[keyof typeof DisputeTimelineScalarFieldEnum];
export declare const ProviderPenaltyScalarFieldEnum: {
    readonly id: "id";
    readonly providerId: "providerId";
    readonly penaltyType: "penaltyType";
    readonly reason: "reason";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly active: "active";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProviderPenaltyScalarFieldEnum = (typeof ProviderPenaltyScalarFieldEnum)[keyof typeof ProviderPenaltyScalarFieldEnum];
export declare const AppealScalarFieldEnum: {
    readonly id: "id";
    readonly penaltyId: "penaltyId";
    readonly providerId: "providerId";
    readonly explanation: "explanation";
    readonly supportingFile: "supportingFile";
    readonly status: "status";
    readonly reviewedBy: "reviewedBy";
    readonly reviewedAt: "reviewedAt";
    readonly adminNote: "adminNote";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AppealScalarFieldEnum = (typeof AppealScalarFieldEnum)[keyof typeof AppealScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly jobId: "jobId";
    readonly customerId: "customerId";
    readonly providerId: "providerId";
    readonly reviewerId: "reviewerId";
    readonly revieweeId: "revieweeId";
    readonly rating: "rating";
    readonly reviewText: "reviewText";
    readonly status: "status";
    readonly deletedAt: "deletedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const RatingSummaryScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly averageRating: "averageRating";
    readonly totalReviews: "totalReviews";
    readonly fiveStarCount: "fiveStarCount";
    readonly fourStarCount: "fourStarCount";
    readonly threeStarCount: "threeStarCount";
    readonly twoStarCount: "twoStarCount";
    readonly oneStarCount: "oneStarCount";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RatingSummaryScalarFieldEnum = (typeof RatingSummaryScalarFieldEnum)[keyof typeof RatingSummaryScalarFieldEnum];
export declare const RatingFlagScalarFieldEnum: {
    readonly id: "id";
    readonly providerId: "providerId";
    readonly reason: "reason";
    readonly averageRating: "averageRating";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type RatingFlagScalarFieldEnum = (typeof RatingFlagScalarFieldEnum)[keyof typeof RatingFlagScalarFieldEnum];
export declare const ConversationScalarFieldEnum: {
    readonly id: "id";
    readonly jobId: "jobId";
    readonly bookingId: "bookingId";
    readonly customerId: "customerId";
    readonly providerId: "providerId";
    readonly lastMessage: "lastMessage";
    readonly lastMessageAt: "lastMessageAt";
    readonly lastActivity: "lastActivity";
    readonly customerDeletedAt: "customerDeletedAt";
    readonly providerDeletedAt: "providerDeletedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum];
export declare const MessageScalarFieldEnum: {
    readonly id: "id";
    readonly conversationId: "conversationId";
    readonly senderId: "senderId";
    readonly type: "type";
    readonly content: "content";
    readonly attachmentUrl: "attachmentUrl";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly deliveredAt: "deliveredAt";
    readonly readAt: "readAt";
    readonly editedAt: "editedAt";
    readonly deletedAt: "deletedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly category: "category";
    readonly title: "title";
    readonly message: "message";
    readonly relatedEntityType: "relatedEntityType";
    readonly relatedEntityId: "relatedEntityId";
    readonly isRead: "isRead";
    readonly deliveryStatus: "deliveryStatus";
    readonly deliveryError: "deliveryError";
    readonly sentAt: "sentAt";
    readonly readAt: "readAt";
    readonly deliveredAt: "deliveredAt";
    readonly deletedAt: "deletedAt";
    readonly createdAt: "createdAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const DeviceRegistrationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly deviceToken: "deviceToken";
    readonly platform: "platform";
    readonly lastActiveAt: "lastActiveAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DeviceRegistrationScalarFieldEnum = (typeof DeviceRegistrationScalarFieldEnum)[keyof typeof DeviceRegistrationScalarFieldEnum];
export declare const NotificationPreferenceScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly jobEnabled: "jobEnabled";
    readonly chatEnabled: "chatEnabled";
    readonly bookingEnabled: "bookingEnabled";
    readonly marketingEnabled: "marketingEnabled";
    readonly systemEnabled: "systemEnabled";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NotificationPreferenceScalarFieldEnum = (typeof NotificationPreferenceScalarFieldEnum)[keyof typeof NotificationPreferenceScalarFieldEnum];
export declare const WalletScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly balance: "balance";
    readonly heldBalance: "heldBalance";
    readonly lifetimeCredits: "lifetimeCredits";
    readonly lifetimeDebits: "lifetimeDebits";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum];
export declare const WalletTransactionScalarFieldEnum: {
    readonly id: "id";
    readonly walletId: "walletId";
    readonly type: "type";
    readonly amount: "amount";
    readonly balanceBefore: "balanceBefore";
    readonly balanceAfter: "balanceAfter";
    readonly referenceType: "referenceType";
    readonly referenceId: "referenceId";
    readonly processingKey: "processingKey";
    readonly description: "description";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type WalletTransactionScalarFieldEnum = (typeof WalletTransactionScalarFieldEnum)[keyof typeof WalletTransactionScalarFieldEnum];
export declare const TopUpRequestScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly walletId: "walletId";
    readonly amount: "amount";
    readonly paymentMethod: "paymentMethod";
    readonly transactionReference: "transactionReference";
    readonly proofImage: "proofImage";
    readonly notes: "notes";
    readonly status: "status";
    readonly submittedAt: "submittedAt";
    readonly reviewedAt: "reviewedAt";
    readonly reviewedBy: "reviewedBy";
    readonly rejectionReason: "rejectionReason";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TopUpRequestScalarFieldEnum = (typeof TopUpRequestScalarFieldEnum)[keyof typeof TopUpRequestScalarFieldEnum];
export declare const WithdrawalRequestScalarFieldEnum: {
    readonly id: "id";
    readonly providerId: "providerId";
    readonly walletId: "walletId";
    readonly amount: "amount";
    readonly paymentMethod: "paymentMethod";
    readonly accountName: "accountName";
    readonly accountNumber: "accountNumber";
    readonly bankName: "bankName";
    readonly status: "status";
    readonly submittedAt: "submittedAt";
    readonly processedAt: "processedAt";
    readonly processedBy: "processedBy";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WithdrawalRequestScalarFieldEnum = (typeof WithdrawalRequestScalarFieldEnum)[keyof typeof WithdrawalRequestScalarFieldEnum];
export declare const WalletAuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly walletId: "walletId";
    readonly actorUserId: "actorUserId";
    readonly actorAdminId: "actorAdminId";
    readonly action: "action";
    readonly previousValues: "previousValues";
    readonly newValues: "newValues";
    readonly referenceType: "referenceType";
    readonly referenceId: "referenceId";
    readonly createdAt: "createdAt";
};
export type WalletAuditLogScalarFieldEnum = (typeof WalletAuditLogScalarFieldEnum)[keyof typeof WalletAuditLogScalarFieldEnum];
export declare const AdminScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly role: "role";
    readonly permissions: "permissions";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum];
export declare const AdminAuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly adminId: "adminId";
    readonly action: "action";
    readonly entityType: "entityType";
    readonly entityId: "entityId";
    readonly previousValues: "previousValues";
    readonly newValues: "newValues";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly createdAt: "createdAt";
};
export type AdminAuditLogScalarFieldEnum = (typeof AdminAuditLogScalarFieldEnum)[keyof typeof AdminAuditLogScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly AnyNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>;
export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>;
export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>;
export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type EnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus'>;
export type ListEnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus[]'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>;
export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>;
export type EnumBookingTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingType'>;
export type ListEnumBookingTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingType[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type EnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus'>;
export type ListEnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus[]'>;
export type EnumBidStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BidStatus'>;
export type ListEnumBidStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BidStatus[]'>;
export type EnumCancellationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CancellationType'>;
export type ListEnumCancellationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CancellationType[]'>;
export type EnumDisputeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeStatus'>;
export type ListEnumDisputeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeStatus[]'>;
export type EnumDisputeResolutionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeResolution'>;
export type ListEnumDisputeResolutionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeResolution[]'>;
export type EnumDisputeEvidenceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeEvidenceType'>;
export type ListEnumDisputeEvidenceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeEvidenceType[]'>;
export type EnumPenaltyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PenaltyType'>;
export type ListEnumPenaltyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PenaltyType[]'>;
export type EnumAppealStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppealStatus'>;
export type ListEnumAppealStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppealStatus[]'>;
export type EnumReviewStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewStatus'>;
export type ListEnumReviewStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewStatus[]'>;
export type EnumRatingFlagStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RatingFlagStatus'>;
export type ListEnumRatingFlagStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RatingFlagStatus[]'>;
export type EnumMessageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageType'>;
export type ListEnumMessageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageType[]'>;
export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>;
export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>;
export type EnumNotificationCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationCategory'>;
export type ListEnumNotificationCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationCategory[]'>;
export type EnumNotificationDeliveryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationDeliveryStatus'>;
export type ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationDeliveryStatus[]'>;
export type EnumWalletTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletType'>;
export type ListEnumWalletTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletType[]'>;
export type EnumWalletStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletStatus'>;
export type ListEnumWalletStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletStatus[]'>;
export type EnumWalletTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletTransactionType'>;
export type ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletTransactionType[]'>;
export type EnumWalletTransactionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletTransactionStatus'>;
export type ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletTransactionStatus[]'>;
export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>;
export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>;
export type EnumTopUpStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TopUpStatus'>;
export type ListEnumTopUpStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TopUpStatus[]'>;
export type EnumWithdrawalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WithdrawalStatus'>;
export type ListEnumWithdrawalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WithdrawalStatus[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type EnumAdminRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AdminRole'>;
export type ListEnumAdminRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AdminRole[]'>;
export type BatchPayload = {
    count: number;
};
export type Datasource = {
    url?: string;
};
export type Datasources = {
    db?: Datasource;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientOptions {
    datasources?: Datasources;
    datasourceUrl?: string;
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    adapter?: runtime.SqlDriverAdapterFactory | null;
    omit?: GlobalOmitConfig;
}
export type GlobalOmitConfig = {
    city?: Prisma.CityOmit;
    user?: Prisma.UserOmit;
    refreshToken?: Prisma.RefreshTokenOmit;
    serviceCategory?: Prisma.ServiceCategoryOmit;
    providerProfile?: Prisma.ProviderProfileOmit;
    providerServiceCategory?: Prisma.ProviderServiceCategoryOmit;
    galleryImage?: Prisma.GalleryImageOmit;
    booking?: Prisma.BookingOmit;
    job?: Prisma.JobOmit;
    jobImage?: Prisma.JobImageOmit;
    bid?: Prisma.BidOmit;
    jobTimeline?: Prisma.JobTimelineOmit;
    cancellationRecord?: Prisma.CancellationRecordOmit;
    verificationRequest?: Prisma.VerificationRequestOmit;
    dispute?: Prisma.DisputeOmit;
    disputeEvidence?: Prisma.DisputeEvidenceOmit;
    disputeTimeline?: Prisma.DisputeTimelineOmit;
    providerPenalty?: Prisma.ProviderPenaltyOmit;
    appeal?: Prisma.AppealOmit;
    review?: Prisma.ReviewOmit;
    ratingSummary?: Prisma.RatingSummaryOmit;
    ratingFlag?: Prisma.RatingFlagOmit;
    conversation?: Prisma.ConversationOmit;
    message?: Prisma.MessageOmit;
    notification?: Prisma.NotificationOmit;
    deviceRegistration?: Prisma.DeviceRegistrationOmit;
    notificationPreference?: Prisma.NotificationPreferenceOmit;
    wallet?: Prisma.WalletOmit;
    walletTransaction?: Prisma.WalletTransactionOmit;
    topUpRequest?: Prisma.TopUpRequestOmit;
    withdrawalRequest?: Prisma.WithdrawalRequestOmit;
    walletAuditLog?: Prisma.WalletAuditLogOmit;
    admin?: Prisma.AdminOmit;
    adminAuditLog?: Prisma.AdminAuditLogOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
