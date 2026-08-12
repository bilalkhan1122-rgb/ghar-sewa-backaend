import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import {
  CategoriesController,
  ProviderCategoriesController,
  AdminCategoriesController,
} from "./categories.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [
    CategoriesController,
    ProviderCategoriesController,
    AdminCategoriesController,
  ],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
