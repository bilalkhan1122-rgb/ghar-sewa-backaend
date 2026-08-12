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
import { ReviewsService } from "./reviews.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "generated/prisma/client";
import { CreateReviewDto } from "./dtos/create-review.dto";
import { UpdateReviewDto } from "./dtos/update-review.dto";
import { ReviewQueryDto } from "./dtos/review-query.dto";

@ApiTags("Reviews (Provider)")
@Controller("provider/reviews")
@Roles(UserRole.PROVIDER)
export class ProviderReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post("/")
  @ApiOperation({
    summary: "Submit a review for a completed booking (customer review)",
  })
  async createReview(
    @GetUser("sub") userId: string,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewsService.createReview(userId, dto);
  }

  @Get("/written")
  @ApiOperation({ summary: "View reviews you have written" })
  async listWritten(
    @GetUser("sub") userId: string,
    @Query() query: ReviewQueryDto,
  ) {
    return this.reviewsService.listWrittenReviews(userId, query);
  }

  @Get("/received")
  @ApiOperation({ summary: "View reviews you have received" })
  async listReceived(
    @GetUser("sub") userId: string,
    @Query() query: ReviewQueryDto,
  ) {
    return this.reviewsService.listReceivedReviews(userId, query);
  }

  @Get("/summary")
  @ApiOperation({ summary: "Get your rating summary" })
  async getSummary(@GetUser("sub") userId: string) {
    return this.reviewsService.getRatingSummary(userId);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Update your review (within edit window)" })
  async updateReview(
    @GetUser("sub") userId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateReviewDto,
  ) {
    return this.reviewsService.updateReview(userId, id, dto);
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Delete your review (soft delete, within edit window)",
  })
  async deleteReview(
    @GetUser("sub") userId: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.reviewsService.deleteReview(userId, id);
  }
}
