-- AlterTable
ALTER TABLE "provider_profiles" ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastOnlineAt" TIMESTAMP(3);
