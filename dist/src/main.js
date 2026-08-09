"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const common_1 = require("@nestjs/common");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const config_1 = require("@nestjs/config");
const nestjs_pino_1 = require("nestjs-pino");
const swagger_1 = require("@nestjs/swagger");
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const path_1 = require("path");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    app.setGlobalPrefix('api/v1');
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT');
    const corsOrigins = configService.get('CORS_ORIGIN')?.split(',');
    app.enableCors({
        origin: corsOrigins,
        credentials: true,
    });
    app.use((0, cookie_parser_1.default)());
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: true,
        crossOriginOpenerPolicy: { policy: 'same-origin' },
        crossOriginResourcePolicy: { policy: 'same-origin' },
        dnsPrefetchControl: { allow: false },
        frameguard: { action: 'deny' },
        hidePoweredBy: true,
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
        ieNoOpen: true,
        noSniff: true,
        referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
        xssFilter: true,
    }));
    app.use('/docs', (0, express_basic_auth_1.default)({
        users: { faddy: '123456' },
        challenge: true,
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Ghar Sewa API')
        .setDescription('Home Services Platform API')
        .setVersion('1.0')
        .addCookieAuth('accessToken')
        .addBearerAuth()
        .addTag('Auth', 'Authentication endpoints')
        .addTag('Users', 'User management endpoints')
        .addTag('Cities', 'Cities endpoints')
        .addTag('Health', 'Health check endpoints')
        .addTag('Provider', 'Provider profile management')
        .addTag('Provider (Public)', 'Public provider profiles')
        .addTag('Jobs (Customer)', 'Customer job posting and management')
        .addTag('Jobs (Provider)', 'Provider job feed')
        .addTag('Jobs (Admin)', 'Admin job management')
        .addTag('Categories', 'Public service categories')
        .addTag('Provider Categories', 'Provider category management')
        .addTag('Admin Categories', 'Admin category management')
        .addTag('Bidding (Customer)', 'Customer bid management')
        .addTag('Bidding (Provider)', 'Provider bid management')
        .addTag('Booking (Customer)', 'Customer booking management')
        .addTag('Booking (Provider)', 'Provider booking management')
        .addTag('Reviews (Customer)', 'Customer review management')
        .addTag('Reviews (Provider)', 'Provider review management')
        .addTag('Reviews (Public)', 'Public provider reviews')
        .addTag('Chat', 'In-app customer-provider chat')
        .addTag('Notifications', 'User notification management')
        .addTag('Notifications (Devices)', 'Push device registration')
        .addTag('Notifications (Preferences)', 'Notification preferences')
        .addTag('Wallet (Customer)', 'Customer wallet, top-ups and transactions')
        .addTag('Wallet (Provider)', 'Provider wallet, earnings and transactions')
        .addTag('Wallet (Admin)', 'Admin wallet, top-up and withdrawal management')
        .addTag('Withdrawals (Provider)', 'Provider withdrawal requests')
        .addTag('Admin Dashboard', 'Platform dashboard summary and widgets')
        .addTag('Admin Reports', 'Users, providers, jobs, financial and dispute reports')
        .addTag('Admin Search', 'Global admin search')
        .addTag('Admin Audit Logs', 'Immutable admin action audit logs')
        .addTag('Admin Users', 'Admin user management')
        .addTag('Admin Providers', 'Admin provider management')
        .addTag('Admin Notifications', 'Admin-initiated notifications')
        .addTag('Bookings (Admin)', 'Admin booking management')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    app.useStaticAssets((0, path_1.join)(process.cwd(), 'uploads'), {
        prefix: '/uploads/',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const logger = app.get(nestjs_pino_1.Logger);
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(logger));
    const server = app.getHttpServer();
    await app.listen(port || 8080);
    server.keepAliveTimeout = 65000;
    server.headersTimeout = 66000;
    logger.log(`🚀 Application is running on: http://localhost:${port || 8080}/api/v1`, 'Bootstrap');
    logger.log(`📖 Swagger docs available at: http://localhost:${port || 8080}/docs`, 'Bootstrap');
}
void bootstrap();
//# sourceMappingURL=main.js.map