import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Logger } from "nestjs-pino";
import { PrismaService } from "src/prisma/prisma.service";
import { BannersService } from "./banners.service";

describe("BannersService", () => {
  let service: BannersService;

  const prisma = {
    banner: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  const logger = { log: jest.fn(), error: jest.fn(), warn: jest.fn() };

  const banner = (overrides: Record<string, unknown> = {}) => ({
    id: "b1",
    title: "50% OFF on First Plumbing Service",
    subtitle: null,
    ctaLabel: null,
    ctaTarget: null,
    accentColor: "primary",
    isActive: true,
    displayOrder: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  });

  beforeEach(async () => {
    jest.clearAllMocks();

    prisma.banner.findUnique.mockResolvedValue(banner());
    prisma.banner.findMany.mockResolvedValue([]);
    prisma.banner.create.mockImplementation(({ data }) =>
      Promise.resolve(banner(data)),
    );
    prisma.banner.update.mockImplementation(({ where, data }) =>
      Promise.resolve(banner({ id: where.id, ...data })),
    );
    prisma.$transaction.mockResolvedValue([]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BannersService,
        { provide: PrismaService, useValue: prisma },
        { provide: Logger, useValue: logger },
      ],
    }).compile();

    service = module.get<BannersService>(BannersService);
  });

  describe("listActiveBanners", () => {
    it("only asks for published banners, ordered", async () => {
      await service.listActiveBanners();

      expect(prisma.banner.findMany).toHaveBeenCalledWith({
        where: { isActive: true },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
      });
    });

    it("returns an empty list rather than throwing when nothing is published", async () => {
      prisma.banner.findMany.mockResolvedValue([]);
      await expect(service.listActiveBanners()).resolves.toEqual([]);
    });
  });

  describe("createBanner", () => {
    it("defaults accentColor, displayOrder and isActive", async () => {
      await service.createBanner({ title: "New promo" });

      expect(prisma.banner.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          title: "New promo",
          accentColor: "primary",
          displayOrder: 0,
          isActive: true,
        }),
      });
    });
  });

  describe("updateBanner", () => {
    it("throws when the banner does not exist", async () => {
      prisma.banner.findUnique.mockResolvedValue(null);
      await expect(
        service.updateBanner("missing", { title: "X" }),
      ).rejects.toThrow(NotFoundException);
    });

    it("only sends the fields that were provided", async () => {
      await service.updateBanner("b1", { isActive: false });

      expect(prisma.banner.update).toHaveBeenCalledWith({
        where: { id: "b1" },
        data: { isActive: false },
      });
    });
  });

  describe("toggleBannerStatus", () => {
    it("flips isActive", async () => {
      prisma.banner.findUnique.mockResolvedValue(banner({ isActive: true }));
      await service.toggleBannerStatus("b1");

      expect(prisma.banner.update).toHaveBeenCalledWith({
        where: { id: "b1" },
        data: { isActive: false },
      });
    });
  });

  describe("deleteBanner", () => {
    it("throws when the banner does not exist", async () => {
      prisma.banner.findUnique.mockResolvedValue(null);
      await expect(service.deleteBanner("missing")).rejects.toThrow(
        NotFoundException,
      );
    });

    it("deletes an existing banner", async () => {
      await service.deleteBanner("b1");
      expect(prisma.banner.delete).toHaveBeenCalledWith({
        where: { id: "b1" },
      });
    });
  });

  describe("reorderBanners", () => {
    it("rejects an id that doesn't exist", async () => {
      prisma.banner.findMany.mockResolvedValue([{ id: "b1" }]);
      await expect(
        service.reorderBanners({ bannerIds: ["b1", "missing"] }),
      ).rejects.toThrow(BadRequestException);
    });

    it("persists the new order via a transaction", async () => {
      prisma.banner.findMany.mockResolvedValue([{ id: "b1" }, { id: "b2" }]);
      await service.reorderBanners({ bannerIds: ["b2", "b1"] });
      expect(prisma.$transaction).toHaveBeenCalled();
    });
  });
});
