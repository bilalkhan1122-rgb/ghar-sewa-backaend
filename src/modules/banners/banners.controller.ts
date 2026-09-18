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
import { BannersService } from "./banners.service";
import { CreateBannerDto } from "./dtos/create-banner.dto";
import { UpdateBannerDto } from "./dtos/update-banner.dto";
import { BannerQueryDto } from "./dtos/banner-query.dto";
import { ReorderBannersDto } from "./dtos/reorder-banners.dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { Public } from "src/common/decorators/public.decorator";
import { Permissions } from "src/common/decorators/permissions.decorator";
import { UserRole } from "generated/prisma/client";

// ─── Customer / Public Controller ──────────────────────────────────────

@ApiTags("Banners")
@Controller("banners")
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Public()
  @Get("/")
  @ApiOperation({
    summary: "List published banners for the customer-home slider",
  })
  async listActiveBanners() {
    return this.bannersService.listActiveBanners();
  }
}

// ─── Admin Controller ──────────────────────────────────────────────────

@ApiTags("Admin Banners")
@Controller("admin/banners")
@Roles(UserRole.ADMIN)
@Permissions("banners.view")
export class AdminBannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get("/")
  @ApiOperation({ summary: "List all banners, published and hidden (admin)" })
  async listAllBanners(@Query() query: BannerQueryDto) {
    return this.bannersService.adminListBanners(query);
  }

  @Permissions("banners.manage")
  @Post("/")
  @ApiOperation({ summary: "Create a banner" })
  async createBanner(@Body() dto: CreateBannerDto) {
    return this.bannersService.createBanner(dto);
  }

  @Permissions("banners.manage")
  @Patch("/:id")
  @ApiOperation({ summary: "Update a banner" })
  async updateBanner(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateBannerDto,
  ) {
    return this.bannersService.updateBanner(id, dto);
  }

  @Permissions("banners.manage")
  @Delete("/:id")
  @ApiOperation({ summary: "Delete a banner" })
  async deleteBanner(@Param("id", ParseUUIDPipe) id: string) {
    return this.bannersService.deleteBanner(id);
  }

  @Permissions("banners.manage")
  @Patch("/:id/status")
  @ApiOperation({ summary: "Publish or unpublish a banner" })
  async toggleBannerStatus(@Param("id", ParseUUIDPipe) id: string) {
    return this.bannersService.toggleBannerStatus(id);
  }

  @Permissions("banners.manage")
  @Post("/reorder")
  @ApiOperation({ summary: "Reorder banners" })
  async reorderBanners(@Body() dto: ReorderBannersDto) {
    return this.bannersService.reorderBanners(dto);
  }
}
