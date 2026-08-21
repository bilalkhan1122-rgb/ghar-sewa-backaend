-- CreateEnum
CREATE TYPE "payment_mode" AS ENUM ('PREPAID', 'POSTPAID');

-- AlterEnum
ALTER TYPE "notification_type" ADD VALUE 'PAYMENT_DUE';
ALTER TYPE "notification_type" ADD VALUE 'PAYMENT_SETTLED';

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "paymentDueAt" TIMESTAMP(3),
ADD COLUMN     "paymentRemindedAt" TIMESTAMP(3),
ADD COLUMN     "paymentReminderCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "platform_settings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "paymentMode" "payment_mode" NOT NULL DEFAULT 'PREPAID',
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bookings_customerId_paymentDueAt_idx" ON "bookings"("customerId", "paymentDueAt");
