-- AlterTable
ALTER TABLE "gallery_images" ADD COLUMN     "categoryId" TEXT;

-- CreateIndex
CREATE INDEX "gallery_images_categoryId_idx" ON "gallery_images"("categoryId");

-- AddForeignKey
ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "service_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
