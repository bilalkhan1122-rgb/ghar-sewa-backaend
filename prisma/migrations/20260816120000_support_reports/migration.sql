-- CreateEnum
CREATE TYPE "support_report_category" AS ENUM ('APP_BUG', 'PROVIDER_ISSUE', 'CUSTOMER_ISSUE', 'PAYMENT_ISSUE', 'OTHER');

-- CreateEnum
CREATE TYPE "support_report_status" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- CreateTable
CREATE TABLE "support_reports" (
    "id" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "category" "support_report_category" NOT NULL,
    "subject" VARCHAR(200) NOT NULL,
    "description" VARCHAR(2000) NOT NULL,
    "attachmentUrl" VARCHAR(500),
    "aboutUserId" TEXT,
    "status" "support_report_status" NOT NULL DEFAULT 'OPEN',
    "adminNote" VARCHAR(2000),
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "support_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "support_reports_reporterId_idx" ON "support_reports"("reporterId");

-- CreateIndex
CREATE INDEX "support_reports_status_idx" ON "support_reports"("status");

-- CreateIndex
CREATE INDEX "support_reports_createdAt_idx" ON "support_reports"("createdAt");

-- AddForeignKey
ALTER TABLE "support_reports" ADD CONSTRAINT "support_reports_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_reports" ADD CONSTRAINT "support_reports_aboutUserId_fkey" FOREIGN KEY ("aboutUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
