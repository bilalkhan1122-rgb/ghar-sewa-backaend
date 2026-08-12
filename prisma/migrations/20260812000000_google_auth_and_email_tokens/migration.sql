-- Google sign-in/sign-up (social auth) and one-time email tokens
-- (email verification + password reset).
--
-- `phone`, `passwordHash` and `cityId` become optional because Google
-- accounts have neither a phone number nor a password, and the city is
-- picked later from the profile screen.

-- CreateEnum
CREATE TYPE "auth_provider" AS ENUM ('LOCAL', 'GOOGLE');

-- CreateEnum
CREATE TYPE "email_token_type" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- AlterTable
ALTER TABLE "users"
    ALTER COLUMN "phone" DROP NOT NULL,
    ALTER COLUMN "passwordHash" DROP NOT NULL,
    ALTER COLUMN "cityId" DROP NOT NULL,
    ADD COLUMN "authProvider" "auth_provider" NOT NULL DEFAULT 'LOCAL',
    ADD COLUMN "googleId" TEXT,
    ADD COLUMN "avatarUrl" VARCHAR(500),
    -- Default true so pre-existing and password-registered accounts stay
    -- fully functional; Google sign-ups are created with it set to false.
    ADD COLUMN "emailVerified" BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN "emailVerifiedAt" TIMESTAMP(3);

-- Postgres allows multiple NULLs in a unique index, so every password
-- account can keep googleId = NULL while Google accounts stay unique.
-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");

-- CreateTable
CREATE TABLE "email_tokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "email_token_type" NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_tokens_tokenHash_key" ON "email_tokens"("tokenHash");

-- CreateIndex
CREATE INDEX "email_tokens_userId_type_idx" ON "email_tokens"("userId", "type");

-- AddForeignKey
ALTER TABLE "email_tokens" ADD CONSTRAINT "email_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
