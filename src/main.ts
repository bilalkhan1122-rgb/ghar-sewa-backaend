import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';
import { join } from 'path';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  // Use Pino logger
  app.useLogger(app.get(Logger));

  // Socket.IO adapter for real-time chat (Module 9)
  app.useWebSocketAdapter(new IoAdapter(app));

  app.setGlobalPrefix('api/v1');

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const corsOrigins = configService.get<string>('CORS_ORIGIN')?.split(',');

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  app.use(cookieParser());

  // Configure Helmet with strict security headers
  // Note: CSP is disabled for Swagger UI compatibility
  app.use(
    helmet({
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
    }),
  );

  // Swagger setup with basic auth
  app.use(
    '/docs',
    basicAuth({
      users: { faddy: '123456' },
      challenge: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
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
    .addTag(
      'Admin Reports',
      'Users, providers, jobs, financial and dispute reports',
    )
    .addTag('Admin Search', 'Global admin search')
    .addTag('Admin Audit Logs', 'Immutable admin action audit logs')
    .addTag('Admin Users', 'Admin user management')
    .addTag('Admin Providers', 'Admin provider management')
    .addTag('Admin Notifications', 'Admin-initiated notifications')
    .addTag('Bookings (Admin)', 'Admin booking management')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Serve uploaded files
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Get logger instance
  const logger = app.get(Logger);

  // Global response interceptor for standard API responses
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Global exception filter for standard error responses
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  const server = app.getHttpServer();
  await app.listen(port || 8080);

  // Android's OkHttp (used by React Native's fetch) pools keep-alive connections for
  // minutes, but Node's HTTP server default keepAliveTimeout is only 5s — a client can
  // try to reuse a connection the server already closed, which surfaces to fetch() as a
  // bare network failure with nothing logged server-side. Match the server's timeout to
  // safely outlast realistic client-side idle gaps (headersTimeout must exceed it).
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;

  logger.log(
    `🚀 Application is running on: http://localhost:${port || 8080}/api/v1`,
    'Bootstrap',
  );
  logger.log(
    `📖 Swagger docs available at: http://localhost:${port || 8080}/docs`,
    'Bootstrap',
  );
}
void bootstrap();
