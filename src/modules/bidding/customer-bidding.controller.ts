import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BiddingService } from './bidding.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/client';
import { CounterBidDto } from './dtos/counter-bid.dto';
import { BidQueryDto } from './dtos/bid-query.dto';

@ApiTags('Bidding (Customer)')
@Controller('bidding')
@Roles(UserRole.CUSTOMER)
export class CustomerBiddingController {
  constructor(private readonly biddingService: BiddingService) {}

  @Get('/jobs/:jobId/bids')
  @ApiOperation({ summary: 'View all bids for a job' })
  async getBidsForJob(
    @GetUser('sub') userId: string,
    @Param('jobId', ParseUUIDPipe) jobId: string,
    @Query() query: BidQueryDto,
  ) {
    return this.biddingService.getBidsForJob(userId, jobId, query);
  }

  @Post('/bids/:bidId/accept')
  @ApiOperation({ summary: 'Accept a bid and assign provider' })
  async acceptBid(
    @GetUser('sub') userId: string,
    @Param('bidId', ParseUUIDPipe) bidId: string,
  ) {
    return this.biddingService.acceptBid(userId, bidId);
  }

  @Post('/bids/:bidId/counter')
  @ApiOperation({ summary: 'Counter a bid with a different price' })
  async counterBid(
    @GetUser('sub') userId: string,
    @Param('bidId', ParseUUIDPipe) bidId: string,
    @Body() dto: CounterBidDto,
  ) {
    return this.biddingService.counterBid(userId, bidId, dto);
  }

  @Post('/bids/:bidId/reject')
  @ApiOperation({ summary: 'Reject a bid' })
  async rejectBid(
    @GetUser('sub') userId: string,
    @Param('bidId', ParseUUIDPipe) bidId: string,
  ) {
    return this.biddingService.rejectBid(userId, bidId);
  }

  @Get('/jobs/:jobId/provider')
  @ApiOperation({ summary: 'View selected provider for a job' })
  async getSelectedProvider(
    @GetUser('sub') userId: string,
    @Param('jobId', ParseUUIDPipe) jobId: string,
  ) {
    return this.biddingService.getSelectedProvider(userId, jobId);
  }

  @Post('/jobs/:jobId/cancel-selection')
  @ApiOperation({ summary: 'Cancel provider selection before work starts' })
  async cancelSelection(
    @GetUser('sub') userId: string,
    @Param('jobId', ParseUUIDPipe) jobId: string,
  ) {
    return this.biddingService.cancelProviderSelection(userId, jobId);
  }
}
