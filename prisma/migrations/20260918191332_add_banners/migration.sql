-- CreateTable
CREATE TABLE "banners" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "subtitle" VARCHAR(200),
    "ctaLabel" VARCHAR(40),
    "ctaTarget" VARCHAR(30),
    "accentColor" VARCHAR(20) NOT NULL DEFAULT 'primary',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "banners_isActive_displayOrder_idx" ON "banners"("isActive", "displayOrder");
