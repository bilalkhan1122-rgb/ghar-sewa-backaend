import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { LoggerModule } from "nestjs-pino";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./modules/users/users.module";
import { CitiesModule } from "./modules/cities/cities.module";
import { HealthModule } from "./modules/health/health.module";
import { ProviderModule } from "./modules/provider/provider.module";
import { CategoriesModule } from "./modules/categories/categories.module";
import { JobsModule } from "./modules/jobs/jobs.module";
import { BiddingModule } from "./modules/bidding/bidding.module";
import { BookingModule } from "./modules/booking/booking.module";
import { ReviewsModule } from "./modules/reviews/reviews.module";
import { ChatModule } from "./modules/chat/chat.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { VerificationModule } from "./modules/verification/verification.module";
import { DisputesModule } from "./modules/disputes/disputes.module";
import { SupportModule } from "./modules/support/support.module";
import { PenaltiesModule } from "./modules/penalties/penalties.module";
import { WalletModule } from "./modules/wallet/wallet.module";
import { AdminModule } from "./modules/admin/admin.module";
import { RankingModule } from "./modules/ranking/ranking.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { RealtimeModule } from "./modules/realtime/realtime.module";
import { AppConfigModule } from "./config/config.module";
import { loggerConfig } from "./config/logger.config";
import { CorrelationIdMiddleware } from "./common/middleware/correlation-id.middleware";
import { RolesGuard } from "./common/guards/roles.guard";
import { PermissionsGuard } from "./common/guards/permissions.guard";
import { AuthGuard } from "./common/guards/auth.guard";
import { ScheduleModule } from "@nestjs/schedule";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";

@Module({
  imports: [
    LoggerModule.forRoot(loggerConfig),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        name: "default",
        ttl: 60000, // 1 minute
        // Applies to every endpoint that does not set its own @Throttle. The
        // previous value (10/min) was low enough that ordinary authenticated
        // use — an admin opening a few pages, or a customer browsing the app —
        // returned 429 within seconds. This is DoS protection only; per-endpoint
        // brute-force limits live on the auth routes via @Throttle decorators.
        limit: 300,
      },
      {
        name: "strict",
        ttl: 60000, // 1 minute
        limit: 5, // 5 requests per minute for auth endpoints
      },
    ]),
    AppConfigModule,
    AuthModule,
    UsersModule,
    CitiesModule,
    HealthModule,
    ProviderModule,
    CategoriesModule,
    JobsModule,
    BiddingModule,
    BookingModule,
    ReviewsModule,
    ChatModule,
    NotificationsModule,
    VerificationModule,
    DisputesModule,
    SupportModule,
    PenaltiesModule,
    WalletModule,
    AdminModule,
    RankingModule,
    AnalyticsModule,
    RealtimeModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [
    {
      provide: "APP_GUARD",
      useClass: ThrottlerGuard,
    },
    {
      provide: "APP_GUARD",
      useClass: AuthGuard,
    },
    {
      provide: "APP_GUARD",
      useClass: RolesGuard,
    },
    {
      provide: "APP_GUARD",
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes("*");
  }
}
