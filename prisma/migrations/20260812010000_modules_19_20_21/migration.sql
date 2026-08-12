-- Modules 19/20/21:
--   Module 19 — Provider Ranking (tiers + immutable change history)
--   Module 20 — Urgent Jobs (isUrgent flag on jobs)
--   Module 21 — Analytics (no schema: computed from existing data)

-- CreateEnum (Module 19)
CREATE TYPE "provider_rank" AS ENUM ('NONE', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM');

-- AlterEnum (Module 19/20 notifications)
ALTER TYPE "notification_type" ADD VALUE IF NOT EXISTS 'RANK_UPGRADED';
ALTER TYPE "notification_type" ADD VALUE IF NOT EXISTS 'RANK_DOWNGRADED';
ALTER TYPE "notification_type" ADD VALUE IF NOT EXISTS 'URGENT_JOB_POSTED';

-- AlterTable (Module 20)
ALTER TABLE "jobs" ADD COLUMN "isUrgent" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex (Module 20: urgent-first feed)
CREATE INDEX "jobs_isUrgent_status_expiresAt_idx" ON "jobs"("isUrgent", "status", "expiresAt");

-- CreateTable (Module 19)
CREATE TABLE "provider_rankings" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "currentRank" "provider_rank" NOT NULL DEFAULT 'NONE',
    "completedJobs" INTEGER NOT NULL DEFAULT 0,
    "averageRating" DECIMAL(3,2) NOT NULL DEFAULT 0,
    "rankAchievedAt" TIMESTAMP(3),
    "lastEvaluatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "provider_rankings_pkey" PRIMARY KEY ("id")
);

-- CreateTable (Module 19)
CREATE TABLE "provider_rank_history" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "fromRank" "provider_rank" NOT NULL,
    "toRank" "provider_rank" NOT NULL,
    "completedJobs" INTEGER NOT NULL,
    "averageRating" DECIMAL(3,2) NOT NULL,
    "reason" VARCHAR(200),
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "provider_rank_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "provider_rankings_providerId_key" ON "provider_rankings"("providerId");

-- CreateIndex
CREATE INDEX "provider_rankings_currentRank_idx" ON "provider_rankings"("currentRank");

-- CreateIndex
CREATE INDEX "provider_rank_history_providerId_changedAt_idx" ON "provider_rank_history"("providerId", "changedAt");

-- AddForeignKey
ALTER TABLE "provider_rankings" ADD CONSTRAINT "provider_rankings_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_rank_history" ADD CONSTRAINT "provider_rank_history_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
