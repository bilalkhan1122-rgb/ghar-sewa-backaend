import 'reflect-metadata';
import type { IncomingMessage, ServerResponse } from 'http';
import express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/create-app';

// Vercel serverless entrypoint. Boots the Nest app once per warm lambda
// instance (on top of a bare Express instance) and reuses it for
// subsequent invocations instead of re-bootstrapping on every request.
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
