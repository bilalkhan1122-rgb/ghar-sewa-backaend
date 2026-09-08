-- Nearby Online Providers (Module 22)
--
-- Geospatial radius search uses Postgres' cube + earthdistance extensions:
-- great-circle distance is computed in the database, never in the app.
-- Both extensions ship with the official postgres:16 image used locally and
-- are supported on Neon (CREATE EXTENSION ... as shown in Neon's docs).

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "cube";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "earthdistance";

-- CreateEnum
CREATE TYPE "provider_busy_override" AS ENUM ('AUTO', 'BUSY', 'AVAILABLE');

-- AlterTable
ALTER TABLE "provider_profiles"
    ADD COLUMN "latitude" DOUBLE PRECISION,
    ADD COLUMN "longitude" DOUBLE PRECISION,
    ADD COLUMN "locationUpdatedAt" TIMESTAMP(3),
    ADD COLUMN "busyOverride" "provider_busy_override" NOT NULL DEFAULT 'AUTO';

-- Radius lookups run earth_box(earth, meters) @> ll_to_earth(lat, lng);
-- this GiST index makes that containment test fast. Rows without a location
-- fix (NULL lat/lng) make the index expression NULL and are skipped, which is
-- exactly what we want — a provider with no fix is never in a radius result.
-- Prisma cannot express functional/GiST indexes, so it lives here in SQL only.
CREATE INDEX "provider_profiles_location_idx"
    ON "provider_profiles"
    USING gist (ll_to_earth("latitude", "longitude"));
