import { Module } from "@nestjs/common";
import { BannersService } from "./banners.service";
import {
  BannersController,
  AdminBannersController,
} from "./banners.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [BannersController, AdminBannersController],
  providers: [BannersService],
  exports: [BannersService],
})
export class BannersModule {}
