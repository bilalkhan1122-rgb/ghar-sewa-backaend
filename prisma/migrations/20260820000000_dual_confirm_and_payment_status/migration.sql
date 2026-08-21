-- CreateEnum
CREATE TYPE "booking_payment_status" AS ENUM ('NONE', 'PAYMENT_PENDING', 'COMPLETED');

-- AlterTable: Add dual-completion confirmation fields to bookings
ALTER TABLE "bookings" ADD COLUMN "providerConfirmedCompletion" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "bookings" ADD COLUMN "customerConfirmedCompletion" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "bookings" ADD COLUMN "providerConfirmedAt" TIMESTAMP(3);
ALTER TABLE "bookings" ADD COLUMN "customerConfirmedAt" TIMESTAMP(3);
ALTER TABLE "bookings" ADD COLUMN "paymentStatus" "booking_payment_status" NOT NULL DEFAULT 'NONE';
ALTER TABLE "bookings" ADD COLUMN "paymentReference" VARCHAR(200);

-- CreateIndex
CREATE UNIQUE INDEX "bookings_paymentReference_key" ON "bookings"("paymentReference");
CREATE INDEX "bookings_paymentStatus_idx" ON "bookings"("paymentStatus");
