import "reflect-metadata";
import type { IncomingMessage, ServerResponse } from "http";
import express from "express";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { configureApp } from "./create-app";

// Serverless entrypoint. Boots the Nest app once per warm lambda instance (on
// top of a bare Express instance) and reuses it for subsequent invocations
// instead of re-bootstrapping on every request.
//
// This lives under src/ so `nest build` compiles it into dist/ along with the
// rest of the app, resolving the 'src/*' and 'generated/*' path aliases into
// plain relative requires. api/index.js is a thin loader for the compiled
// output — Vercel's bundler does not honour tsconfig "paths", so letting it
// compile the TypeScript directly failed with "Cannot find module 'src/...'".
const expressApp = express();
let bootstrapPromise: Promise<void> | null = null;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    { bufferLogs: true },
  );
  await configureApp(app);
  await app.init();
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (!bootstrapPromise) {
    bootstrapPromise = bootstrap().catch((err) => {
      // Don't cache a failed boot — let the next invocation retry instead
      // of permanently 500ing every request on this warm lambda instance.
      bootstrapPromise = null;
      throw err;
    });
  }
  await bootstrapPromise;
  expressApp(req, res);
}
