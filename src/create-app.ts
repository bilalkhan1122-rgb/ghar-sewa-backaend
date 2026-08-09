import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import basicAuth from 'express-basic-auth';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

// Shared Nest app configuration, used by both the local/production server
// entrypoint (src/main.ts) and the Vercel serverless entrypoint (api/index.ts).
export async function configureApp(
  app: INestApplication,
): Promise<INestApplication> {
  const logger = app.get(Logger);
  app.useLogger(logger);

  app.setGlobalPrefix('api/v1');

  const configService = app.get(ConfigService);
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
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global response interceptor for standard API responses
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Global exception filter for standard error responses
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  return app;
}
