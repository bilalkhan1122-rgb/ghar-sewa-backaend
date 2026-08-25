import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { SubcategoriesService } from "./subcategories.service";
import {
  CategoriesController,
  ProviderCategoriesController,
  AdminCategoriesController,
  AdminSubcategoriesController,
} from "./categories.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProviderModule } from "../provider/provider.module";

@Module({
  imports: [PrismaModule, ProviderModule],
  controllers: [
    CategoriesController,
    ProviderCategoriesController,
    AdminCategoriesController,
    AdminSubcategoriesController,
  ],
  providers: [CategoriesService, SubcategoriesService],
  exports: [CategoriesService, SubcategoriesService],
})
export class CategoriesModule {}
