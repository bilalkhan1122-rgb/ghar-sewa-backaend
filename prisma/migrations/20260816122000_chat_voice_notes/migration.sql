-- AlterEnum
ALTER TYPE "message_type" ADD VALUE 'VOICE';

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "durationMs" INTEGER;
