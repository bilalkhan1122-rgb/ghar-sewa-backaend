import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dtos/create-category.dto";
import { UpdateCategoryDto } from "./dtos/update-category.dto";
import { CategoryQueryDto } from "./dtos/category-query.dto";
import { ReorderCategoriesDto } from "./dtos/reorder-categories.dto";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { Public } from "src/common/decorators/public.decorator";
import { UserRole } from "generated/prisma/client";
import { PublicProvidersQueryDto } from "../provider/dtos/public-providers-query.dto";
import { Permissions } from "src/common/decorators/permissions.decorator";

// ─── Customer / Public Controller ──────────────────────────────────────

@ApiTags("Categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @Get("/")
  @ApiOperation({ summary: "List all active categories" })
  async listActiveCategories(@Query() query: CategoryQueryDto) {
    return this.categoriesService.listActiveCategories(query);
  }

  @Public()
  @Get("/search")
  @ApiOperation({ summary: "Search categories by name" })
  async searchCategories(@Query("q") q: string) {
    return this.categoriesService.searchCategories(q);
  }

  @Public()
  @Get("/:slug")
  @ApiOperation({ summary: "Get a single category by slug" })
  async getCategoryBySlug(@Param("slug") slug: string) {
    return this.categoriesService.getCategoryBySlug(slug);
  }

  @Public()
  @Get("/:id/providers")
  @ApiOperation({
    summary:
      "Get approved providers for a category — searched and sorted server-side",
  })
  async getCategoryProviders(
    @Param("id", ParseUUIDPipe) id: string,
    @Query() query: PublicProvidersQueryDto,
  ) {
    return this.categoriesService.getCategoryProviders(id, query);
  }
}

// ─── Provider Controller ───────────────────────────────────────────────

@ApiTags("Provider Categories")
@Controller("provider/categories")
export class ProviderCategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get("/")
  @ApiOperation({ summary: "View all available (active) categories" })
  async getAvailableCategories() {
    return this.categoriesService.getAvailableCategories();
  }

  @Get("/my")
  @ApiOperation({ summary: "Get categories selected by the provider" })
  async getMyCategories(@GetUser("sub") userId: string) {
    return this.categoriesService.getProviderSelectedCategories(userId);
  }

  @Post("/")
  @ApiOperation({ summary: "Select multiple categories for the provider" })
  async selectCategories(
    @GetUser("sub") userId: string,
    @Body() body: { categoryIds: string[] },
  ) {
    return this.categoriesService.selectProviderCategories(
      userId,
      body.categoryIds,
    );
  }

  @Patch("/")
  @ApiOperation({ summary: "Update selected categories for the provider" })
  async updateCategories(
    @GetUser("sub") userId: string,
    @Body() body: { categoryIds: string[] },
  ) {
    return this.categoriesService.selectProviderCategories(
      userId,
      body.categoryIds,
    );
  }
}

// ─── Admin Controller ──────────────────────────────────────────────────

@ApiTags("Admin Categories")
@Controller("admin/categories")
@Roles(UserRole.ADMIN)
@Permissions("categories.view")
export class AdminCategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get("/")
  @ApiOperation({ summary: "List all categories (admin)" })
  async listAllCategories(@Query() query: CategoryQueryDto) {
    return this.categoriesService.adminListCategories(query);
  }

  @Permissions("categories.manage")
  @Post("/")
  @ApiOperation({ summary: "Create a new category" })
  async createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.createCategory(dto);
  }

  @Permissions("categories.manage")
  @Patch("/:id")
  @ApiOperation({ summary: "Update a category" })
  async updateCategory(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, dto);
  }

  @Permissions("categories.manage")
  @Delete("/:id")
  @ApiOperation({ summary: "Soft delete a category" })
  async deleteCategory(@Param("id", ParseUUIDPipe) id: string) {
    return this.categoriesService.deleteCategory(id);
  }

  @Permissions("categories.manage")
  @Patch("/:id/status")
  @ApiOperation({ summary: "Activate or deactivate a category" })
  async toggleCategoryStatus(@Param("id", ParseUUIDPipe) id: string) {
    return this.categoriesService.toggleCategoryStatus(id);
  }

  @Permissions("categories.manage")
  @Post("/reorder")
  @ApiOperation({ summary: "Reorder categories" })
  async reorderCategories(@Body() dto: ReorderCategoriesDto) {
    return this.categoriesService.reorderCategories(dto);
  }

  @Get("/:id/stats")
  @ApiOperation({ summary: "Get category statistics" })
  async getCategoryStats(@Param("id", ParseUUIDPipe) id: string) {
    return this.categoriesService.getCategoryStats(id);
  }
}
