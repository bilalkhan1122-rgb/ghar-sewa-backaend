import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import basicAuth from "express-basic-auth";
import helmet from "helmet";
import { Logger } from "nestjs-pino";
import { randomUUID } from "crypto";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";

// Shared Nest app configuration, used by both the local/production server
// entrypoint (src/main.ts) and the Vercel serverless entrypoint (api/index.ts).
export async function configureApp(
  app: INestApplication,
): Promise<INestApplication> {
  const logger = app.get(Logger);
  app.useLogger(logger);

  app.setGlobalPrefix("api/v1");

  const configService = app.get(ConfigService);
  // Trimmed and filtered: the env-validation schema tolerates whitespace after
  // the commas, so a value like "http://a.com, https://b.com" passes validation
  // but would otherwise put " https://b.com" in the allowlist, which matches no
  // Origin header and fails CORS in a way that looks like a correct config.
  const corsOrigins = configService
    .get<string>("CORS_ORIGIN")
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

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
      crossOriginOpenerPolicy: { policy: "same-origin" },
      // Uploaded images (CNIC scans, face photos, gallery) are embedded by the
      // admin dashboard, which runs on a different origin — 'same-origin' makes
      // the browser refuse to render them. Blob-hosted uploads are public URLs
      // already, so this does not widen access to anything.
      crossOriginResourcePolicy: { policy: "cross-origin" },
      dnsPrefetchControl: { allow: false },
      frameguard: { action: "deny" },
      hidePoweredBy: true,
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      ieNoOpen: true,
      noSniff: true,
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
      xssFilter: true,
    }),
  );

  // Swagger, behind basic auth.
  //
  // The guard covers /docs-json and /docs-yaml as well as /docs: those are
  // sibling paths, not children, so a guard mounted on "/docs" alone left the
  // entire API spec publicly readable — every route, DTO and example.
  //
  // Credentials come from the environment; the previous hardcoded pair was
  // committed to the repo and therefore public.
  const docsUser = process.env.SWAGGER_USER || "gharsewa";
  const docsPassword = process.env.SWAGGER_PASSWORD;
  app.use(
    ["/docs", "/docs-json", "/docs-yaml"],
    basicAuth({
      users: { [docsUser]: docsPassword || randomUUID() },
      challenge: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Ghar Sewa API")
    .setDescription("Home Services Platform API")
    .setVersion("1.0")
    .addCookieAuth("accessToken")
    .addBearerAuth()
    .addTag("Auth", "Authentication endpoints")
    .addTag("Users", "User management endpoints")
    .addTag("Cities", "Cities endpoints")
    .addTag("Health", "Health check endpoints")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document, {
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
