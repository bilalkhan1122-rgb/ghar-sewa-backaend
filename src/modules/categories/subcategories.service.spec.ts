import { Test, TestingModule } from "@nestjs/testing";
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { Logger } from "nestjs-pino";
import { PrismaService } from "src/prisma/prisma.service";
import { SubcategoriesService } from "./subcategories.service";

describe("SubcategoriesService", () => {
  let service: SubcategoriesService;

  const prisma = {
    serviceCategory: { findUnique: jest.fn() },
    serviceSubcategory: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    job: { count: jest.fn() },
    $transaction: jest.fn(),
  };

  const logger = { log: jest.fn(), error: jest.fn(), warn: jest.fn() };

  const CATEGORY = { id: "cat1", name: "AC Repair", isActive: true };

  const subcategory = (overrides: Record<string, unknown> = {}) => ({
    id: "sub1",
    categoryId: "cat1",
    name: "Gas refill",
    slug: "gas-refill",
    description: null,
    icon: null,
    isActive: true,
    displayOrder: 1,
    ...overrides,
  });

  beforeEach(async () => {
    jest.clearAllMocks();

    // The happy path for the two lookups nearly every method starts with.
    prisma.serviceCategory.findUnique.mockResolvedValue(CATEGORY);
    prisma.serviceSubcategory.findUnique.mockResolvedValue(null);
    prisma.serviceSubcategory.findFirst.mockResolvedValue(null);
    prisma.serviceSubcategory.count.mockResolvedValue(0);
    prisma.serviceSubcategory.create.mockImplementation(({ data }) =>
      Promise.resolve({ id: "new", ...data }),
    );
    prisma.serviceSubcategory.update.mockImplementation(({ where, data }) =>
      Promise.resolve({ ...subcategory(), id: where.id, ...data }),
    );
    prisma.$transaction.mockResolvedValue([]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubcategoriesService,
        { provide: PrismaService, useValue: prisma },
        { provide: Logger, useValue: logger },
      ],
    }).compile();

    service = module.get<SubcategoriesService>(SubcategoriesService);
  });

  // ─── Create ──────────────────────────────────────────────────────────

  describe("createSubcategory", () => {
    it("derives a slug from the name", async () => {
      await service.createSubcategory("cat1", { name: "Gas Refill" });

      expect(prisma.serviceSubcategory.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ slug: "gas-refill" }),
        }),
      );
    });

    it("strips punctuation and collapses runs of separators in the slug", async () => {
      await service.createSubcategory("cat1", {
        name: "Water heater  (geyser) — service!",
      });

      expect(prisma.serviceSubcategory.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            slug: "water-heater-geyser-service",
          }),
        }),
      );
    });

    it("suffixes the slug when the parent already has that slug", async () => {
      prisma.serviceSubcategory.findUnique
        .mockResolvedValueOnce(subcategory({ id: "other" }))
        .mockResolvedValueOnce(null);

      await service.createSubcategory("cat1", { name: "Gas refill" });

      expect(prisma.serviceSubcategory.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ slug: "gas-refill-1" }),
        }),
      );
    });

    it("scopes the slug check to the parent, so two categories can share one", async () => {
      await service.createSubcategory("cat2", { name: "Installation" });

      expect(prisma.serviceSubcategory.findUnique).toHaveBeenCalledWith({
        where: {
          categoryId_slug: { categoryId: "cat2", slug: "installation" },
        },
      });
    });

    it("rejects a name the parent already uses, case-insensitively", async () => {
      prisma.serviceSubcategory.findFirst.mockResolvedValue(subcategory());

      await expect(
        service.createSubcategory("cat1", { name: "GAS REFILL" }),
      ).rejects.toBeInstanceOf(ConflictException);

      expect(prisma.serviceSubcategory.create).not.toHaveBeenCalled();
    });

    it("404s when the parent category does not exist", async () => {
      prisma.serviceCategory.findUnique.mockResolvedValue(null);

      await expect(
        service.createSubcategory("nope", { name: "Gas refill" }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it("appends to the end of the parent's list by default", async () => {
      prisma.serviceSubcategory.count.mockResolvedValue(4);

      await service.createSubcategory("cat1", { name: "Gas refill" });

      expect(prisma.serviceSubcategory.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ displayOrder: 5 }),
        }),
      );
    });

    it("honours an explicit displayOrder, including 0", async () => {
      prisma.serviceSubcategory.count.mockResolvedValue(4);

      await service.createSubcategory("cat1", {
        name: "Gas refill",
        displayOrder: 0,
      });

      expect(prisma.serviceSubcategory.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ displayOrder: 0 }),
        }),
      );
    });

    it("defaults to active", async () => {
      await service.createSubcategory("cat1", { name: "Gas refill" });

      expect(prisma.serviceSubcategory.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ isActive: true }),
        }),
      );
    });
  });

  // ─── Update ──────────────────────────────────────────────────────────

  describe("updateSubcategory", () => {
    beforeEach(() => {
      prisma.serviceSubcategory.findUnique.mockResolvedValue(subcategory());
    });

    it("404s on an unknown subcategory", async () => {
      prisma.serviceSubcategory.findUnique.mockResolvedValue(null);

      await expect(
        service.updateSubcategory("nope", { name: "X" }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it("regenerates the slug when the name changes", async () => {
      prisma.serviceSubcategory.findUnique
        .mockResolvedValueOnce(subcategory())
        .mockResolvedValueOnce(null);

      await service.updateSubcategory("sub1", { name: "Cooling issue" });

      expect(prisma.serviceSubcategory.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ slug: "cooling-issue" }),
        }),
      );
    });

    it("leaves the slug alone when only the icon changes", async () => {
      await service.updateSubcategory("sub1", { icon: "🧊" });

      const { data } = prisma.serviceSubcategory.update.mock.calls[0][0];
      expect(data).not.toHaveProperty("slug");
      expect(data).toEqual({ icon: "🧊" });
    });

    it("does not treat the row being edited as its own slug clash", async () => {
      // The lookup returns this very subcategory — it must not become
      // `gas-refill-1` just because it already owns `gas-refill`.
      prisma.serviceSubcategory.findUnique.mockResolvedValue(subcategory());

      await service.updateSubcategory("sub1", { name: "Gas refill" });

      expect(prisma.serviceSubcategory.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ slug: "gas-refill" }),
        }),
      );
    });

    it("rejects a rename onto a sibling's name", async () => {
      prisma.serviceSubcategory.findFirst.mockResolvedValue(
        subcategory({ id: "sub2" }),
      );

      await expect(
        service.updateSubcategory("sub1", { name: "Cooling issue" }),
      ).rejects.toBeInstanceOf(ConflictException);
    });

    it("re-checks the slug against the new parent when moving category", async () => {
      prisma.serviceSubcategory.findUnique
        .mockResolvedValueOnce(subcategory())
        .mockResolvedValueOnce(subcategory({ id: "other", categoryId: "cat2" }))
        .mockResolvedValueOnce(null);

      await service.updateSubcategory("sub1", { categoryId: "cat2" });

      expect(prisma.serviceSubcategory.findUnique).toHaveBeenCalledWith({
        where: { categoryId_slug: { categoryId: "cat2", slug: "gas-refill" } },
      });
      expect(prisma.serviceSubcategory.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            categoryId: "cat2",
            slug: "gas-refill-1",
          }),
        }),
      );
    });

    it("404s when moving to a category that does not exist", async () => {
      prisma.serviceCategory.findUnique.mockResolvedValue(null);

      await expect(
        service.updateSubcategory("sub1", { categoryId: "nope" }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it("normalises an explicitly supplied slug", async () => {
      prisma.serviceSubcategory.findUnique
        .mockResolvedValueOnce(subcategory())
        .mockResolvedValueOnce(null);

      await service.updateSubcategory("sub1", { slug: "Gas Refill!!" });

      expect(prisma.serviceSubcategory.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ slug: "gas-refill" }),
        }),
      );
    });

    it("can clear a description by sending an empty string", async () => {
      await service.updateSubcategory("sub1", { description: "" });

      const { data } = prisma.serviceSubcategory.update.mock.calls[0][0];
      expect(data).toEqual({ description: "" });
    });
  });

  // ─── Visibility ──────────────────────────────────────────────────────

  describe("toggleSubcategoryStatus", () => {
    it("flips isActive", async () => {
      prisma.serviceSubcategory.findUnique.mockResolvedValue(
        subcategory({ isActive: true }),
      );

      await service.toggleSubcategoryStatus("sub1");

      expect(prisma.serviceSubcategory.update).toHaveBeenCalledWith({
        where: { id: "sub1" },
        data: { isActive: false },
      });
    });

    it("404s on an unknown subcategory", async () => {
      prisma.serviceSubcategory.findUnique.mockResolvedValue(null);

      await expect(
        service.toggleSubcategoryStatus("nope"),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  // ─── Delete ──────────────────────────────────────────────────────────

  describe("deleteSubcategory", () => {
    beforeEach(() => {
      prisma.serviceSubcategory.findUnique.mockResolvedValue(subcategory());
    });

    it("deletes outright when no job references it", async () => {
      prisma.job.count.mockResolvedValue(0);

      const result = await service.deleteSubcategory("sub1");

      expect(prisma.serviceSubcategory.delete).toHaveBeenCalledWith({
        where: { id: "sub1" },
      });
      expect(result.deleted).toBe(true);
    });

    it("hides rather than deletes when jobs reference it", async () => {
      prisma.job.count.mockResolvedValue(3);

      const result = await service.deleteSubcategory("sub1");

      expect(prisma.serviceSubcategory.delete).not.toHaveBeenCalled();
      expect(prisma.serviceSubcategory.update).toHaveBeenCalledWith({
        where: { id: "sub1" },
        data: { isActive: false },
      });
      expect(result.deleted).toBe(false);
      expect(result.message).toContain("3 job(s)");
    });

    it("404s on an unknown subcategory", async () => {
      prisma.serviceSubcategory.findUnique.mockResolvedValue(null);

      await expect(service.deleteSubcategory("nope")).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(prisma.serviceSubcategory.delete).not.toHaveBeenCalled();
    });
  });

  // ─── Reorder ─────────────────────────────────────────────────────────

  describe("reorderSubcategories", () => {
    const threeSubs = [{ id: "a" }, { id: "b" }, { id: "c" }];

    it("writes 1-based positions in the order given", async () => {
      prisma.serviceSubcategory.findMany.mockResolvedValue(threeSubs);

      await service.reorderSubcategories("cat1", {
        subcategoryIds: ["c", "a", "b"],
      });

      expect(prisma.serviceSubcategory.update).toHaveBeenNthCalledWith(1, {
        where: { id: "c" },
        data: { displayOrder: 1 },
      });
      expect(prisma.serviceSubcategory.update).toHaveBeenNthCalledWith(2, {
        where: { id: "a" },
        data: { displayOrder: 2 },
      });
      expect(prisma.serviceSubcategory.update).toHaveBeenNthCalledWith(3, {
        where: { id: "b" },
        data: { displayOrder: 3 },
      });
      expect(prisma.$transaction).toHaveBeenCalled();
    });

    it("rejects a partial list, which would leave stale positions behind", async () => {
      prisma.serviceSubcategory.findMany.mockResolvedValue(threeSubs);

      await expect(
        service.reorderSubcategories("cat1", { subcategoryIds: ["a", "b"] }),
      ).rejects.toBeInstanceOf(BadRequestException);

      expect(prisma.$transaction).not.toHaveBeenCalled();
    });

    it("rejects an id belonging to another category", async () => {
      prisma.serviceSubcategory.findMany.mockResolvedValue(threeSubs);

      await expect(
        service.reorderSubcategories("cat1", {
          subcategoryIds: ["a", "b", "elsewhere"],
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it("rejects duplicates", async () => {
      prisma.serviceSubcategory.findMany.mockResolvedValue(threeSubs);

      await expect(
        service.reorderSubcategories("cat1", {
          subcategoryIds: ["a", "a", "b"],
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it("404s on an unknown category", async () => {
      prisma.serviceCategory.findUnique.mockResolvedValue(null);

      await expect(
        service.reorderSubcategories("nope", { subcategoryIds: ["a"] }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  // ─── Listing ─────────────────────────────────────────────────────────

  describe("listActiveSubcategories", () => {
    it("returns only active rows, in display order", async () => {
      prisma.serviceSubcategory.findMany.mockResolvedValue([subcategory()]);

      await service.listActiveSubcategories("cat1");

      expect(prisma.serviceSubcategory.findMany).toHaveBeenCalledWith({
        where: { categoryId: "cat1", isActive: true },
        orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
      });
    });

    it("404s on an unknown category rather than returning an empty list", async () => {
      prisma.serviceCategory.findUnique.mockResolvedValue(null);

      await expect(
        service.listActiveSubcategories("nope"),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it("404s when the parent category is hidden", async () => {
      prisma.serviceCategory.findUnique.mockResolvedValue({
        ...CATEGORY,
        isActive: false,
      });

      await expect(
        service.listActiveSubcategories("cat1"),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(prisma.serviceSubcategory.findMany).not.toHaveBeenCalled();
    });
  });

  describe("assertBelongsToCategory", () => {
    it("passes for an active sub-type of the given category", async () => {
      prisma.serviceSubcategory.findUnique.mockResolvedValue(subcategory());

      await expect(
        service.assertBelongsToCategory("cat1", "sub1"),
      ).resolves.toBeUndefined();
    });

    it("rejects a sub-type that does not exist", async () => {
      prisma.serviceSubcategory.findUnique.mockResolvedValue(null);

      await expect(
        service.assertBelongsToCategory("cat1", "nope"),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it("rejects a hidden sub-type", async () => {
      prisma.serviceSubcategory.findUnique.mockResolvedValue(
        subcategory({ isActive: false }),
      );

      await expect(
        service.assertBelongsToCategory("cat1", "sub1"),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    // The check that actually matters: a real, active sub-type of some *other*
    // category would pass a bare existence test and file the work under a
    // pairing that does not exist.
    it("rejects a sub-type belonging to a different category", async () => {
      prisma.serviceSubcategory.findUnique.mockResolvedValue(
        subcategory({ categoryId: "cat2" }),
      );

      await expect(
        service.assertBelongsToCategory("cat1", "sub1"),
      ).rejects.toThrow(/does not belong to the selected category/);
    });
  });

  describe("adminListSubcategories", () => {
    it("returns hidden rows too when no filter is given", async () => {
      prisma.serviceSubcategory.findMany.mockResolvedValue([]);

      await service.adminListSubcategories("cat1", {});

      expect(prisma.serviceSubcategory.findMany).toHaveBeenCalledWith({
        where: { categoryId: "cat1" },
        orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
      });
    });

    it("filters on isActive=false without dropping it as falsy", async () => {
      prisma.serviceSubcategory.findMany.mockResolvedValue([]);

      await service.adminListSubcategories("cat1", { isActive: "false" });

      expect(prisma.serviceSubcategory.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { categoryId: "cat1", isActive: false },
        }),
      );
    });

    it("searches by name, case-insensitively", async () => {
      prisma.serviceSubcategory.findMany.mockResolvedValue([]);

      await service.adminListSubcategories("cat1", { search: "gas" });

      expect(prisma.serviceSubcategory.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            categoryId: "cat1",
            name: { contains: "gas", mode: "insensitive" },
          },
        }),
      );
    });
  });

  // ─── Stats ───────────────────────────────────────────────────────────

  describe("getSubcategoryStats", () => {
    it("counts total and completed jobs for the sub-type", async () => {
      prisma.serviceSubcategory.findUnique.mockResolvedValue(subcategory());
      prisma.job.count.mockResolvedValueOnce(9).mockResolvedValueOnce(4);

      const stats = await service.getSubcategoryStats("sub1");

      expect(stats).toEqual({
        subcategoryId: "sub1",
        subcategoryName: "Gas refill",
        categoryId: "cat1",
        totalJobs: 9,
        completedJobs: 4,
      });
    });
  });
});
