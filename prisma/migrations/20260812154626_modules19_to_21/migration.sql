-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_cityId_fkey";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
