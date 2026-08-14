import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { RankingService } from "./ranking.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { Permissions } from "src/common/decorators/permissions.decorator";
import { UserRole } from "generated/prisma/client";
import { RankingQueryDto } from "./dtos/ranking-query.dto";

/**
 * Module 19 — admin ranking endpoints. Admin recalculation routes call the
 * exact same RankingService as the automatic hooks — there is no second
 * ranking implementation.
 */
@ApiTags("Admin Rankings")
@Controller("admin/rankings")
@Roles(UserRole.ADMIN)
@Permissions("providers.view")
export class AdminRankingsController {
  constructor(private readonly rankingService: RankingService) {}

  @Get("/")
  @ApiOperation({ summary: "List provider ranks (filter by rank, search)" })
  async list(@Query() query: RankingQueryDto) {
    return this.rankingService.listRankings({
      page: query.page,
      limit: query.limit,
      rank: query.rank,
      search: query.search,
    });
  }

  @Get("/stats")
  @ApiOperation({ summary: "Rank distribution across all providers" })
  async stats() {
    return this.rankingService.getRankStats();
  }

  @Get("/:providerId/history")
  @ApiOperation({ summary: "View a provider's ranking history" })
  async history(
    @Param("providerId", ParseUUIDPipe) providerId: string,
    @Query() query: RankingQueryDto,
  ) {
    return this.rankingService.getMyRankHistory(
      providerId,
      query.page ?? 1,
      query.limit ?? 10,
    );
  }

  @Permissions("ranking.recalculate")
  @Post("/:providerId/recalculate")
  @ApiOperation({ summary: "Recalculate a single provider's rank" })
  async recalculateProvider(
    @Param("providerId", ParseUUIDPipe) providerId: string,
  ) {
    const ranking = await this.rankingService.evaluateProviderRank(
      providerId,
      "Manual admin recalculation",
    );
    return ranking ?? { message: "Provider not found" };
  }

  @Permissions("ranking.recalculate")
  @Post("/recalculate")
  @ApiOperation({ summary: "Recalculate ranks for all providers" })
  async recalculateAll() {
    return this.rankingService.evaluateAllProviders();
  }
}
