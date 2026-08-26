import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Logger } from "nestjs-pino";
import { Prisma } from "generated/prisma/client";
import { CreateSubcategoryDto } from "./dtos/create-subcategory.dto";
import { UpdateSubcategoryDto } from "./dtos/update-subcategory.dto";
import { SubcategoryQueryDto } from "./dtos/subcategory-query.dto";
import { ReorderSubcategoriesDto } from "./dtos/reorder-subcategories.dto";

/**
 * The sub-types inside a category — "Gas refill" and "Jet wash" under
 * "AC Repair".
 *
 * Kept out of CategoriesService rather than bolted onto it: the two share no
 * state, and that file already carries the public, provider and admin surfaces
 * of categories.
 *
 * Slugs are unique *within a parent*, not globally, so the uniqueness checks
 * here are all scoped by `categoryId`. That is what lets both "AC Repair" and
 * "Solar Installation" own a readable `installation` sub-type.
 */
@Injectable()
export class SubcategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  // ─── Slug Generation ─────────────────────────────────────────────────

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .replace(/-+/g, "-");
  }

  /**
   * Appends `-1`, `-2`, … until the slug is free within `categoryId`.
   *
   * A name of only punctuation slugifies to an empty string, which would
   * otherwise be stored and then collide with the next one. Callers validate
   * the name length, so this only guards the degenerate case.
   */
  private async ensureUniqueSlug(
    categoryId: string,
    slug: string,
    excludeId?: string,
  ): Promise<string> {
    const base = slug || "item";
    let finalSlug = base;
    let counter = 1;
    while (true) {
      const existing = await this.prisma.serviceSubcategory.findUnique({
        where: { categoryId_slug: { categoryId, slug: finalSlug } },
      });
      if (!existing || (excludeId && existing.id === excludeId)) {
        return finalSlug;
      }
      finalSlug = `${base}-${counter}`;
      counter++;
    }
  }

  /** Throws unless the category exists. Returns it, since callers want the name. */
  private async requireCategory(categoryId: string) {
    const category = await this.prisma.serviceCategory.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException("Category not found");
    }
    return category;
  }

  private async requireSubcategory(id: string) {
    const subcategory = await this.prisma.serviceSubcategory.findUnique({
      where: { id },
    });
    if (!subcategory) {
      throw new NotFoundException("Subcategory not found");
    }
    return subcategory;
  }

  // ─── Customer / Public ───────────────────────────────────────────────

  /**
   * The active sub-types of one category, in display order.
   *
   * The parent is checked first so a bad category id is a 404 rather than an
   * empty list — "this category has no sub-types" and "this category does not
   * exist" are different answers for the app.
   *
   * A hidden parent is a 404 too, matching `getCategoryBySlug`. Hiding a
   * category is how a service is withdrawn from the app; if this route kept
   * answering, a client holding an old category id could still walk to its
   * sub-types and post a job against a service that is meant to be gone.
   */
  async listActiveSubcategories(categoryId: string) {
    const category = await this.requireCategory(categoryId);
    if (!category.isActive) {
      throw new NotFoundException("Category not found");
    }

    return this.prisma.serviceSubcategory.findMany({
      where: { categoryId, isActive: true },
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    });
  }

  /**
   * Throws unless `subcategoryId` is real, active, and a child of
   * `categoryId`.
   *
   * The parent check is the one that matters. A sub-type id belonging to a
   * *different* category passes a bare existence check and would quietly file
   * the work as, say, "AC Repair / Solar panel cleaning" — matching providers
   * on one thing and telling them another.
   *
   * Lives here because the rule belongs to sub-types, and both ways of
   * creating work — posting a job and booking a provider directly — have to
   * apply the same one. (`JobsService` still carries an inline copy that
   * predates this; folding it in is a safe follow-up, but its tests mock
   * Prisma directly so it is not a no-op edit.)
   */
  async assertBelongsToCategory(
    categoryId: string,
    subcategoryId: string,
  ): Promise<void> {
    const subcategory = await this.prisma.serviceSubcategory.findUnique({
      where: { id: subcategoryId },
    });

    if (!subcategory || !subcategory.isActive) {
      throw new BadRequestException("Invalid or inactive subcategory");
    }

    if (subcategory.categoryId !== categoryId) {
      throw new BadRequestException(
        "The subcategory does not belong to the selected category",
      );
    }
  }

  // ─── Admin ───────────────────────────────────────────────────────────

  /** Every sub-type of a category, hidden ones included. */
  async adminListSubcategories(categoryId: string, query: SubcategoryQueryDto) {
    await this.requireCategory(categoryId);
    const { search, isActive } = query;

    const where: Prisma.ServiceSubcategoryWhereInput = {
      categoryId,
      ...(search && { name: { contains: search, mode: "insensitive" } }),
      ...(isActive !== undefined && { isActive: isActive === "true" }),
    };

    return this.prisma.serviceSubcategory.findMany({
      where,
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    });
  }

  async createSubcategory(categoryId: string, dto: CreateSubcategoryDto) {
    await this.requireCategory(categoryId);

    const duplicateName = await this.prisma.serviceSubcategory.findFirst({
      where: { categoryId, name: { equals: dto.name, mode: "insensitive" } },
    });
    if (duplicateName) {
      throw new ConflictException(
        "This category already has a subcategory with that name",
      );
    }

    const slug = await this.ensureUniqueSlug(
      categoryId,
      this.generateSlug(dto.name),
    );

    // Appended to the end unless the caller says otherwise, so a new sub-type
    // never silently displaces one the admin already positioned.
    const displayOrder =
      dto.displayOrder ??
      (await this.prisma.serviceSubcategory.count({ where: { categoryId } })) +
        1;

    const subcategory = await this.prisma.serviceSubcategory.create({
      data: {
        categoryId,
        name: dto.name,
        slug,
        description: dto.description,
        icon: dto.icon,
        displayOrder,
        isActive: dto.isActive ?? true,
      },
    });

    this.logger.log({
      message: "Subcategory created",
      subcategoryId: subcategory.id,
      categoryId,
      name: subcategory.name,
    });

    return subcategory;
  }

  async updateSubcategory(id: string, dto: UpdateSubcategoryDto) {
    const existing = await this.requireSubcategory(id);

    // Moving to another parent re-scopes every uniqueness check below.
    const categoryId = dto.categoryId ?? existing.categoryId;
    if (dto.categoryId && dto.categoryId !== existing.categoryId) {
      await this.requireCategory(dto.categoryId);
    }

    if (dto.name) {
      const duplicateName = await this.prisma.serviceSubcategory.findFirst({
        where: {
          categoryId,
          name: { equals: dto.name, mode: "insensitive" },
          id: { not: id },
        },
      });
      if (duplicateName) {
        throw new ConflictException(
          "This category already has a subcategory with that name",
        );
      }
    }

    // An explicit slug wins; otherwise a rename regenerates one. Both go
    // through the same uniqueness pass, scoped to whichever parent it ends up
    // under.
    let slug: string | undefined;
    if (dto.slug) {
      slug = this.generateSlug(dto.slug);
    } else if (dto.name) {
      slug = this.generateSlug(dto.name);
    } else if (dto.categoryId && dto.categoryId !== existing.categoryId) {
      // Same slug, new parent — it may already be taken over there.
      slug = existing.slug;
    }
    if (slug !== undefined) {
      slug = await this.ensureUniqueSlug(categoryId, slug, id);
    }

    const updated = await this.prisma.serviceSubcategory.update({
      where: { id },
      data: {
        ...(dto.categoryId !== undefined && { categoryId: dto.categoryId }),
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

    this.logger.log({ message: "Subcategory updated", subcategoryId: id });

    return updated;
  }

  async toggleSubcategoryStatus(id: string) {
    const existing = await this.requireSubcategory(id);

    return this.prisma.serviceSubcategory.update({
      where: { id },
      data: { isActive: !existing.isActive },
    });
  }

  /**
   * Hides the sub-type, or removes it outright when nothing points at it.
   *
   * Categories are only ever soft-deleted because their rows are referenced by
   * historical jobs. A sub-type that no job has ever used carries no history,
   * so a mistyped one can be cleared away properly instead of lingering as a
   * hidden row the admin cannot get rid of.
   */
  async deleteSubcategory(id: string) {
    const existing = await this.requireSubcategory(id);

    const jobsUsingIt = await this.prisma.job.count({
      where: { subcategoryId: id },
    });

    if (jobsUsingIt > 0) {
      await this.prisma.serviceSubcategory.update({
        where: { id },
        data: { isActive: false },
      });

      this.logger.log({
        message: "Subcategory hidden (referenced by jobs)",
        subcategoryId: id,
        jobsUsingIt,
      });

      return {
        message:
          `Subcategory hidden. ${jobsUsingIt} job(s) reference it, so it ` +
          `was kept rather than deleted.`,
        deleted: false,
      };
    }

    await this.prisma.serviceSubcategory.delete({ where: { id } });

    this.logger.log({
      message: "Subcategory deleted",
      subcategoryId: id,
      name: existing.name,
    });

    return { message: "Subcategory deleted successfully", deleted: true };
  }

  /**
   * Persists a new order within one category.
   *
   * The ids must be exactly that category's subcategories — no more, no fewer.
   * A partial list would leave the omitted rows holding stale `displayOrder`
   * values that collide with the reordered ones, which is how the list ends up
   * shuffling on the next load.
   */
  async reorderSubcategories(categoryId: string, dto: ReorderSubcategoriesDto) {
    await this.requireCategory(categoryId);

    const existing = await this.prisma.serviceSubcategory.findMany({
      where: { categoryId },
      select: { id: true },
    });
    const existingIds = new Set(existing.map((s) => s.id));

    const uniqueIds = new Set(dto.subcategoryIds);
    if (uniqueIds.size !== dto.subcategoryIds.length) {
      throw new BadRequestException(
        "Duplicate subcategory IDs are not allowed",
      );
    }

    const allBelong = dto.subcategoryIds.every((id) => existingIds.has(id));
    if (!allBelong || dto.subcategoryIds.length !== existing.length) {
      throw new BadRequestException(
        "The list must contain every subcategory of this category, exactly once",
      );
    }

    await this.prisma.$transaction(
      dto.subcategoryIds.map((id, index) =>
        this.prisma.serviceSubcategory.update({
          where: { id },
          data: { displayOrder: index + 1 },
        }),
      ),
    );

    return { message: "Subcategories reordered successfully" };
  }

  /** Job counts for one sub-type, for the admin detail view. */
  async getSubcategoryStats(id: string) {
    const existing = await this.requireSubcategory(id);

    const [totalJobs, completedJobs] = await Promise.all([
      this.prisma.job.count({ where: { subcategoryId: id } }),
      this.prisma.job.count({
        where: { subcategoryId: id, status: "COMPLETED" },
      }),
    ]);

    return {
      subcategoryId: id,
      subcategoryName: existing.name,
      categoryId: existing.categoryId,
      totalJobs,
      completedJobs,
    };
  }
}
