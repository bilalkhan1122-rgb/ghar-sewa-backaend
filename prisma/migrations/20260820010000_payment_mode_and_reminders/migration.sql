-- Timestamped after 20260820000000_dual_confirm_and_payment_status on purpose:
-- this migration's index depends on the "paymentStatus" column that one adds.

-- CreateEnum
CREATE TYPE "payment_mode" AS ENUM ('PREPAID', 'POSTPAID');

-- AlterEnum
ALTER TYPE "notification_type" ADD VALUE 'PAYMENT_DUE';
ALTER TYPE "notification_type" ADD VALUE 'PAYMENT_SETTLED';

-- AlterTable: reminder bookkeeping for the payment-chasing cron. Whether a
-- booking is owed for lives in "paymentStatus"; these only record how often the
-- customer has been nagged about it.
ALTER TABLE "bookings" ADD COLUMN     "paymentRemindedAt" TIMESTAMP(3),
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
CREATE INDEX "bookings_customerId_paymentStatus_idx" ON "bookings"("customerId", "paymentStatus");
