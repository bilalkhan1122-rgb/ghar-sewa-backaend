"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./modules/auth/auth.module");
const nestjs_pino_1 = require("nestjs-pino");
const prisma_module_1 = require("./prisma/prisma.module");
const users_module_1 = require("./modules/users/users.module");
const cities_module_1 = require("./modules/cities/cities.module");
const health_module_1 = require("./modules/health/health.module");
const provider_module_1 = require("./modules/provider/provider.module");
const categories_module_1 = require("./modules/categories/categories.module");
const jobs_module_1 = require("./modules/jobs/jobs.module");
const bidding_module_1 = require("./modules/bidding/bidding.module");
const booking_module_1 = require("./modules/booking/booking.module");
const reviews_module_1 = require("./modules/reviews/reviews.module");
const chat_module_1 = require("./modules/chat/chat.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const verification_module_1 = require("./modules/verification/verification.module");
const disputes_module_1 = require("./modules/disputes/disputes.module");
const penalties_module_1 = require("./modules/penalties/penalties.module");
const wallet_module_1 = require("./modules/wallet/wallet.module");
const admin_module_1 = require("./modules/admin/admin.module");
const config_module_1 = require("./config/config.module");
const logger_config_1 = require("./config/logger.config");
const correlation_id_middleware_1 = require("./common/middleware/correlation-id.middleware");
const roles_guard_1 = require("./common/guards/roles.guard");
const permissions_guard_1 = require("./common/guards/permissions.guard");
const auth_guard_1 = require("./common/guards/auth.guard");
const schedule_1 = require("@nestjs/schedule");
const throttler_1 = require("@nestjs/throttler");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(correlation_id_middleware_1.CorrelationIdMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_pino_1.LoggerModule.forRoot(logger_config_1.loggerConfig),
            schedule_1.ScheduleModule.forRoot(),
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: 'default',
                    ttl: 60000,
                    limit: 10,
                },
                {
                    name: 'strict',
                    ttl: 60000,
                    limit: 5,
                },
            ]),
            config_module_1.AppConfigModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            cities_module_1.CitiesModule,
            health_module_1.HealthModule,
            provider_module_1.ProviderModule,
            categories_module_1.CategoriesModule,
            jobs_module_1.JobsModule,
            bidding_module_1.BiddingModule,
            booking_module_1.BookingModule,
            reviews_module_1.ReviewsModule,
            chat_module_1.ChatModule,
            notifications_module_1.NotificationsModule,
            verification_module_1.VerificationModule,
            disputes_module_1.DisputesModule,
            penalties_module_1.PenaltiesModule,
            wallet_module_1.WalletModule,
            admin_module_1.AdminModule,
            prisma_module_1.PrismaModule,
        ],
        controllers: [],
        providers: [
            {
                provide: 'APP_GUARD',
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: 'APP_GUARD',
                useClass: auth_guard_1.AuthGuard,
            },
            {
                provide: 'APP_GUARD',
                useClass: roles_guard_1.RolesGuard,
            },
            {
                provide: 'APP_GUARD',
                useClass: permissions_guard_1.PermissionsGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map