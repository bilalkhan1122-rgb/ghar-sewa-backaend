-- Allow admins to purge an abusive identity document while keeping the
-- verification request, its decision and its audit trail intact.
ALTER TABLE "verification_requests" ALTER COLUMN "facePhoto" DROP NOT NULL;
ALTER TABLE "verification_requests" ALTER COLUMN "cnicFrontImage" DROP NOT NULL;
ALTER TABLE "verification_requests" ALTER COLUMN "cnicBackImage" DROP NOT NULL;
