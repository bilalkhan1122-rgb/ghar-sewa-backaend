"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureApp = configureApp;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const helmet_1 = __importDefault(require("helmet"));
const nestjs_pino_1 = require("nestjs-pino");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
async function configureApp(app) {
    const logger = app.get(nestjs_pino_1.Logger);
    app.useLogger(logger);
    app.setGlobalPrefix('api/v1');
    const configService = app.get(config_1.ConfigService);
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
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(logger));
    return app;
}
//# sourceMappingURL=create-app.js.map