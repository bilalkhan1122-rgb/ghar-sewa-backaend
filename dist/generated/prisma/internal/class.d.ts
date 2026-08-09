import * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options?: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = Prisma.PrismaClientOptions['omit'], in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get city(): Prisma.CityDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get serviceCategory(): Prisma.ServiceCategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get providerProfile(): Prisma.ProviderProfileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get providerServiceCategory(): Prisma.ProviderServiceCategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get galleryImage(): Prisma.GalleryImageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get booking(): Prisma.BookingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get job(): Prisma.JobDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get jobImage(): Prisma.JobImageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get bid(): Prisma.BidDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get jobTimeline(): Prisma.JobTimelineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get cancellationRecord(): Prisma.CancellationRecordDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get verificationRequest(): Prisma.VerificationRequestDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get dispute(): Prisma.DisputeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get disputeEvidence(): Prisma.DisputeEvidenceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get disputeTimeline(): Prisma.DisputeTimelineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get providerPenalty(): Prisma.ProviderPenaltyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get appeal(): Prisma.AppealDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get review(): Prisma.ReviewDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get ratingSummary(): Prisma.RatingSummaryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get ratingFlag(): Prisma.RatingFlagDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get conversation(): Prisma.ConversationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get message(): Prisma.MessageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get deviceRegistration(): Prisma.DeviceRegistrationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notificationPreference(): Prisma.NotificationPreferenceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get wallet(): Prisma.WalletDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get topUpRequest(): Prisma.TopUpRequestDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get withdrawalRequest(): Prisma.WithdrawalRequestDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get walletAuditLog(): Prisma.WalletAuditLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get admin(): Prisma.AdminDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get adminAuditLog(): Prisma.AdminAuditLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(dirname: string): PrismaClientConstructor;
