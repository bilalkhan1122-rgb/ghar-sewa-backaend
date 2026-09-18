import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Logger } from "nestjs-pino";
import { CreateBannerDto } from "./dtos/create-banner.dto";
import { UpdateBannerDto } from "./dtos/update-banner.dto";
import { BannerQueryDto } from "./dtos/banner-query.dto";
import { ReorderBannersDto } from "./dtos/reorder-banners.dto";
import { Prisma } from "generated/prisma/client";

@Injectable()
export class BannersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  // ─── Customer / Public ────────────────────────────────────────────────

  /**
   * The customer-home slider (KAN-9). Published banners only, in display
   * order — an empty array is a normal, expected result whenever the admin
   * hasn't published anything, and the app is expected to hide the whole
   * slider rather than render a placeholder for it.
   */
  async listActiveBanners() {
    return this.prisma.banner.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    });
  }

  // ─── Admin ───────────────────────────────────────────────────────────

  async adminListBanners(query: BannerQueryDto) {
    const { search, isActive } = query;

    const where: Prisma.BannerWhereInput = {
      ...(search && { title: { contains: search, mode: "insensitive" } }),
      ...(isActive !== undefined && { isActive: isActive === "true" }),
    };

    return this.prisma.banner.findMany({
      where,
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    });
  }

  async createBanner(dto: CreateBannerDto) {
    const banner = await this.prisma.banner.create({
      data: {
        title: dto.title,
        subtitle: dto.subtitle,
        ctaLabel: dto.ctaLabel,
        ctaTarget: dto.ctaTarget,
        accentColor: dto.accentColor ?? "primary",
        displayOrder: dto.displayOrder ?? 0,
        isActive: dto.isActive ?? true,
      },
    });

    this.logger.log({
      message: "Banner created",
      bannerId: banner.id,
      title: banner.title,
    });

    return banner;
  }

  async updateBanner(id: string, dto: UpdateBannerDto) {
    await this.requireBanner(id);

    const updated = await this.prisma.banner.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.subtitle !== undefined && { subtitle: dto.subtitle }),
        ...(dto.ctaLabel !== undefined && { ctaLabel: dto.ctaLabel }),
        ...(dto.ctaTarget !== undefined && { ctaTarget: dto.ctaTarget }),
        ...(dto.accentColor !== undefined && { accentColor: dto.accentColor }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        ...(dto.displayOrder !== undefined && {
          displayOrder: dto.displayOrder,
        }),
      },
    });

    this.logger.log({ message: "Banner updated", bannerId: id });

    return updated;
  }

  async deleteBanner(id: string) {
    const existing = await this.requireBanner(id);

    await this.prisma.banner.delete({ where: { id } });

    this.logger.log({
      message: "Banner deleted",
      bannerId: id,
      title: existing.title,
    });

    return { message: "Banner deleted successfully" };
  }

  async toggleBannerStatus(id: string) {
    const existing = await this.requireBanner(id);

    return this.prisma.banner.update({
      where: { id },
      data: { isActive: !existing.isActive },
    });
  }

  async reorderBanners(dto: ReorderBannersDto) {
    const banners = await this.prisma.banner.findMany({
      where: { id: { in: dto.bannerIds } },
      select: { id: true },
    });

    if (banners.length !== dto.bannerIds.length) {
      throw new BadRequestException("One or more banner IDs are invalid");
    }

    await this.prisma.$transaction(
      dto.bannerIds.map((id, index) =>
        this.prisma.banner.update({
          where: { id },
          data: { displayOrder: index + 1 },
        }),
      ),
    );

    return { message: "Banners reordered successfully" };
  }

  private async requireBanner(id: string) {
    const existing = await this.prisma.banner.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException("Banner not found");
    }
    return existing;
  }
}
