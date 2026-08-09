import { Controller, Get, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ReviewQueryDto } from './dtos/review-query.dto';

@ApiTags('Reviews (Public)')
@Controller('public')
export class PublicReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Public()
  @Get('/providers/:providerId/reviews')
  @ApiOperation({
    summary:
      'Public provider reviews: average rating, distribution, paginated list (approved only)',
  })
  async getProviderReviews(
    @Param('providerId', ParseUUIDPipe) providerId: string,
    @Query() query: ReviewQueryDto,
  ) {
    return this.reviewsService.getProviderPublicReviews(providerId, query);
  }
}
