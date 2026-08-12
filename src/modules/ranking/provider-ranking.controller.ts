import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { RankingService } from "./ranking.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { PaginationDto } from "src/common/dtos/pagination.dto";

/**
 * Module 19 — provider-facing ranking endpoints. Providers can see their
 * own rank and history; they can never change it (no write endpoints here).
 */
@ApiTags("Provider Rank")
@Controller("provider/rank")
export class ProviderRankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get("/")
  @ApiOperation({
    summary: "Get my current rank, completed jobs and average rating",
  })
  async getMyRank(@GetUser("sub") userId: string) {
    return this.rankingService.getMyRank(userId);
  }

  @Get("/history")
  @ApiOperation({ summary: "View my ranking change history (paginated)" })
  async getMyHistory(
    @GetUser("sub") userId: string,
    @Query() query: PaginationDto,
  ) {
    const { page = 1, limit = 10 } = query;
    return this.rankingService.getMyRankHistory(userId, page, limit);
  }
}
