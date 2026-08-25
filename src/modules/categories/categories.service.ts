import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDto } from "./dtos/create-category.dto";
import { UpdateCategoryDto } from "./dtos/update-category.dto";
import { CategoryQueryDto, CategorySortField } from "./dtos/category-query.dto";
import { ReorderCategoriesDto } from "./dtos/reorder-categories.dto";
import { Logger } from "nestjs-pino";
import { ProviderService } from "../provider/provider.service";
import { PublicProvidersQueryDto } from "../provider/dtos/public-providers-query.dto";
import {
  Prisma,
  UserRole,
  UserStatus,
  VerificationStatus,
} from "generated/prisma/client";

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly providerService: ProviderService,
  ) {}

  // ─── Slug Generation ─────────────────────────────────────────────────

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .replace(/-+/g, "-");
  }

  private async ensureUniqueSlug(
    slug: string,
    excludeId?: string,
  ): Promise<string> {
    let finalSlug = slug;
    let counter = 1;
    while (true) {
      const existing = await this.prisma.serviceCategory.findUnique({
        where: { slug: finalSlug },
      });
      if (!existing || (excludeId && existing.id === excludeId)) {
        return finalSlug;
      }
      finalSlug = `${slug}-${counter}`;
      counter++;
    }
  }

  // ─── Customer / Public ────────────────────────────────────────────────

  async listActiveCategories(query: CategoryQueryDto) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = CategorySortField.DISPLAY_ORDER,
      sortOrder = "asc",
      includeSubcategories,
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.ServiceCategoryWhereInput = {
      isActive: true,
      ...(search && {
        name: { contains: search, mode: "insensitive" },
      }),
    };

    const orderByField =
      sortBy === CategorySortField.NAME
        ? "name"
        : sortBy === CategorySortField.CREATED_AT
          ? "createdAt"
          : "displayOrder";

    // Embedding is opt-in: the app's home grid does not need the sub-types to
    // draw the tiles, and pulling them for every category on every load would
    // be a much larger payload for nothing.
    const embedSubcategories = includeSubcategories === "true";

    const [categories, total] = await Promise.all([
      this.prisma.serviceCategory.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderByField]: sortOrder },
        ...(embedSubcategories && {
          include: {
            subcategories: {
              where: { isActive: true },
              orderBy: [
                { displayOrder: "asc" as const },
                { name: "asc" as const },
              ],
            },
          },
        }),
      }),
      this.prisma.serviceCategory.count({ where }),
    ]);

    // Provider counts for the badges on the app's service grid. Counted with
    // the same filter the browse list uses (approved, active, complete) so the
    // badge never promises providers the customer cannot actually book.
    const providerCounts = await this.prisma.providerServiceCategory.groupBy({
      by: ["categoryId"],
      where: {
        categoryId: { in: categories.map((c) => c.id) },
        provider: {
          user: {
            roles: { has: UserRole.PROVIDER },
            isActive: true,
            status: UserStatus.ACTIVE,
            verificationStatus: VerificationStatus.APPROVED,
            profileCompleted: true,
          },
        },
      },
      _count: { providerId: true },
    });
    const countByCategory = new Map(
      providerCounts.map((row) => [row.categoryId, row._count.providerId]),
    );

    const totalPages = Math.ceil(total / limit);

    return {
      data: categories.map((category) => ({
        ...category,
        providerCount: countByCategory.get(category.id) ?? 0,
      })),
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  async getCategoryBySlug(slug: string) {
    const category = await this.prisma.serviceCategory.findFirst({
      where: { slug, isActive: true },
    });

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    return category;
  }

  async getCategoryById(id: string) {
    const category = await this.prisma.serviceCategory.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    return category;
  }

  // ─── Search Categories ───────────────────────────────────────────────

  async searchCategories(query: string) {
    if (!query || query.length < 2) {
      throw new BadRequestException(
        "Search query must be at least 2 characters",
      );
    }

    return this.prisma.serviceCategory.findMany({
      where: {
        isActive: true,
        name: { contains: query, mode: "insensitive" },
      },
      orderBy: { displayOrder: "asc" },
      take: 20,
    });
  }

  // ─── Providers by Category ───────────────────────────────────────────

  /**
   * Providers offering one service.
   *
   * The filtering, searching and sorting is the same problem as the browse-all
   * listing, so this delegates rather than keeping a second copy of the
   * visibility rules — the two used to drift, and a provider could appear in one
   * listing but not the other.
   */
  async getCategoryProviders(
    categoryId: string,
    query: PublicProvidersQueryDto,
  ) {
    const category = await this.prisma.serviceCategory.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException("Category not found");
    }

    return this.providerService.listPublicProviders({ ...query, categoryId });
  }

  // ─── Provider Category Selection ─────────────────────────────────────

  async getAvailableCategories() {
    return this.prisma.serviceCategory.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });
  }

  async selectProviderCategories(userId: string, categoryIds: string[]) {
    // Validate all categories exist and are active
    const categories = await this.prisma.serviceCategory.findMany({
      where: {
        id: { in: categoryIds },
        isActive: true,
      },
    });

    if (categories.length !== categoryIds.length) {
      throw new BadRequestException(
        "One or more categories are invalid or inactive",
      );
    }

    // Check for duplicates
    const uniqueIds = new Set(categoryIds);
    if (uniqueIds.size !== categoryIds.length) {
      throw new BadRequestException("Duplicate category IDs are not allowed");
    }

    // Remove existing selections and add new ones
    await this.prisma.providerServiceCategory.deleteMany({
      where: { providerId: userId },
    });

    if (categoryIds.length > 0) {
      await this.prisma.providerServiceCategory.createMany({
        data: categoryIds.map((catId) => ({
          providerId: userId,
          categoryId: catId,
        })),
      });
    }

    this.logger.log({
      message: "Provider categories updated",
      userId,
      categoryCount: categoryIds.length,
    });

    return { message: "Categories updated successfully", categoryIds };
  }

  async getProviderSelectedCategories(userId: string) {
    const relations = await this.prisma.providerServiceCategory.findMany({
      where: { providerId: userId },
      include: { category: true },
    });

    return relations.map((r) => r.category);
  }

  // ─── Admin ───────────────────────────────────────────────────────────

  async createCategory(dto: CreateCategoryDto) {
    const slug = this.generateSlug(dto.name);
    const uniqueSlug = await this.ensureUniqueSlug(slug);

    // Check for duplicate name
    const existingName = await this.prisma.serviceCategory.findFirst({
      where: { name: { equals: dto.name, mode: "insensitive" } },
    });
    if (existingName) {
      throw new ConflictException("A category with this name already exists");
    }

    const category = await this.prisma.serviceCategory.create({
      data: {
        name: dto.name,
        slug: uniqueSlug,
        description: dto.description,
        icon: dto.icon,
        displayOrder: dto.displayOrder ?? 0,
        isActive: dto.isActive ?? true,
      },
    });

    this.logger.log({
      message: "Category created",
      categoryId: category.id,
      name: category.name,
    });

    return category;
  }

  async updateCategory(id: string, dto: UpdateCategoryDto) {
    const existing = await this.prisma.serviceCategory.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException("Category not found");
    }

    // Check for duplicate name
    if (dto.name) {
      const duplicateName = await this.prisma.serviceCategory.findFirst({
        where: {
          name: { equals: dto.name, mode: "insensitive" },
          id: { not: id },
        },
      });
      if (duplicateName) {
        throw new ConflictException("A category with this name already exists");
      }
    }

    // Handle slug
    let slug = dto.slug;
    if (dto.name && !dto.slug) {
      slug = this.generateSlug(dto.name);
    }
    if (slug) {
      const uniqueSlug = await this.ensureUniqueSlug(slug, id);
      slug = uniqueSlug;

      // Check for duplicate slug
      const duplicateSlug = await this.prisma.serviceCategory.findFirst({
        where: { slug, id: { not: id } },
      });
      if (duplicateSlug) {
        throw new ConflictException("A category with this slug already exists");
      }
    }

    const updated = await this.prisma.serviceCategory.update({
      where: { id },
      data: {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(slug !== undefined && { slug }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.icon !== undefined && { icon: dto.icon }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        ...(dto.displayOrder !== undefined && {
          displayOrder: dto.displayOrder,
        }),
      },
    });

    this.logger.log({
      message: "Category updated",
      categoryId: id,
    });

    return updated;
  }

  async deleteCategory(id: string) {
    const existing = await this.prisma.serviceCategory.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException("Category not found");
    }

    // Soft delete by setting isActive to false
    await this.prisma.serviceCategory.update({
      where: { id },
      data: { isActive: false },
    });

    this.logger.log({
      message: "Category soft-deleted",
      categoryId: id,
      name: existing.name,
    });

    return { message: "Category deleted successfully" };
  }

  async toggleCategoryStatus(id: string) {
    const existing = await this.prisma.serviceCategory.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException("Category not found");
    }

    const updated = await this.prisma.serviceCategory.update({
      where: { id },
      data: { isActive: !existing.isActive },
    });

    return updated;
  }

  async reorderCategories(dto: ReorderCategoriesDto) {
    // Validate all IDs exist
    const categories = await this.prisma.serviceCategory.findMany({
      where: { id: { in: dto.categoryIds } },
      select: { id: true },
    });

    if (categories.length !== dto.categoryIds.length) {
      throw new BadRequestException("One or more category IDs are invalid");
    }

    // Update display order in a transaction
    await this.prisma.$transaction(
      dto.categoryIds.map((id, index) =>
        this.prisma.serviceCategory.update({
          where: { id },
          data: { displayOrder: index + 1 },
        }),
      ),
    );

    return { message: "Categories reordered successfully" };
  }

  async getCategoryStats(id: string) {
    const existing = await this.prisma.serviceCategory.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException("Category not found");
    }

    const [totalProviders, activeProviders, totalJobs, completedJobs] =
      await Promise.all([
        this.prisma.providerServiceCategory.count({
          where: { categoryId: id },
        }),
        this.prisma.providerServiceCategory.count({
          where: {
            categoryId: id,
            provider: {
              user: {
                isActive: true,
                verificationStatus: "APPROVED",
                profileCompleted: true,
              },
            },
          },
        }),
        this.prisma.job.count({
          where: { categoryId: id },
        }),
        this.prisma.job.count({
          where: { categoryId: id, status: "COMPLETED" },
        }),
      ]);

    return {
      categoryId: id,
      categoryName: existing.name,
      totalProviders,
      activeProviders,
      totalJobs,
      completedJobs,
    };
  }

  // ─── Admin List All ──────────────────────────────────────────────────

  async adminListCategories(query: CategoryQueryDto) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = CategorySortField.DISPLAY_ORDER,
      sortOrder = "asc",
      isActive,
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.ServiceCategoryWhereInput = {
      ...(search && {
        name: { contains: search, mode: "insensitive" },
      }),
      ...(isActive !== undefined && {
        isActive: isActive === "true",
      }),
    };

    const orderByField =
      sortBy === CategorySortField.NAME
        ? "name"
        : sortBy === CategorySortField.CREATED_AT
          ? "createdAt"
          : "displayOrder";

    const [categories, total] = await Promise.all([
      this.prisma.serviceCategory.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderByField]: sortOrder },
        // Always embedded, and hidden ones included — the admin screen manages
        // sub-types inline, so fetching them per row would be one request per
        // category on every load.
        include: {
          subcategories: {
            orderBy: [
              { displayOrder: "asc" as const },
              { name: "asc" as const },
            ],
          },
        },
      }),
      this.prisma.serviceCategory.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: categories,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }
}
