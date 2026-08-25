-- Sub-types within a category: "Gas refill" and "Jet wash" under "AC Repair".
--
-- Modelled as its own table rather than a parent/child self-relation on
-- "service_categories". A self-relation would have meant every existing
-- `findMany` on that table silently started returning sub-types as if they were
-- top-level services — the customer app's home grid, the provider feed and
-- provider sign-up all read it — and each call site would have needed a
-- `parentId IS NULL` filter to keep behaving. A separate table leaves all of
-- them returning exactly what they returned before.
--
-- Entirely additive: nothing is dropped, and the one column added to "jobs" is
-- nullable, so existing rows and clients that do not send a sub-type yet stay
-- valid.

CREATE TABLE "service_subcategories" (
  "id"           TEXT NOT NULL,
  "categoryId"   TEXT NOT NULL,
  "name"         VARCHAR(100) NOT NULL,
  "slug"         VARCHAR(100) NOT NULL,
  "description"  VARCHAR(500),
  "icon"         VARCHAR(255),
  "isActive"     BOOLEAN NOT NULL DEFAULT true,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"    TIMESTAMP(3) NOT NULL,

  CONSTRAINT "service_subcategories_pkey" PRIMARY KEY ("id")
);

-- Scoped to the parent, not global: "Installation" belongs under both AC Repair
-- and Solar, and both should keep the readable slug.
CREATE UNIQUE INDEX "service_subcategories_categoryId_slug_key"
  ON "service_subcategories"("categoryId", "slug");

-- Covers the only read that matters at customer-facing volume: the active
-- sub-types of one category, already in display order.
CREATE INDEX "service_subcategories_categoryId_isActive_displayOrder_idx"
  ON "service_subcategories"("categoryId", "isActive", "displayOrder");

-- Deleting a category takes its sub-types with it. Categories are soft-deleted
-- (isActive = false) in practice, so this only fires on a genuine hard delete.
ALTER TABLE "service_subcategories"
  ADD CONSTRAINT "service_subcategories_categoryId_fkey"
  FOREIGN KEY ("categoryId") REFERENCES "service_categories"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

-- Which sub-type a job is for. Nullable, and RESTRICT on delete to match the
-- existing "jobs" -> "service_categories" behaviour: a sub-type that jobs point
-- at cannot be deleted out from under them, it can only be hidden.
ALTER TABLE "jobs" ADD COLUMN "subcategoryId" TEXT;

CREATE INDEX "jobs_subcategoryId_idx" ON "jobs"("subcategoryId");

ALTER TABLE "jobs"
  ADD CONSTRAINT "jobs_subcategoryId_fkey"
  FOREIGN KEY ("subcategoryId") REFERENCES "service_subcategories"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
