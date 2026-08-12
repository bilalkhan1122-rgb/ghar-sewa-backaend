import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { BiddingService } from "./bidding.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "generated/prisma/client";
import { CreateBidDto } from "./dtos/create-bid.dto";
import { UpdateBidDto } from "./dtos/update-bid.dto";
import { BidQueryDto } from "./dtos/bid-query.dto";

@ApiTags("Bidding (Provider)")
@Controller("provider/bidding")
@Roles(UserRole.PROVIDER)
export class ProviderBiddingController {
  constructor(private readonly biddingService: BiddingService) {}

  @Post("/bids")
  @ApiOperation({ summary: "Submit a bid on a job" })
  async submitBid(@GetUser("sub") userId: string, @Body() dto: CreateBidDto) {
    return this.biddingService.submitBid(userId, dto);
  }

  @Post("/jobs/:jobId/accept-price")
  @ApiOperation({ summary: "Accept customer offered price (instant booking)" })
  async acceptPrice(
    @GetUser("sub") userId: string,
    @Param("jobId", ParseUUIDPipe) jobId: string,
  ) {
    return this.biddingService.acceptCustomerPrice(userId, jobId);
  }

  @Patch("/bids/:bidId")
  @ApiOperation({ summary: "Update own bid (while pending)" })
  async updateBid(
    @GetUser("sub") userId: string,
    @Param("bidId", ParseUUIDPipe) bidId: string,
    @Body() dto: UpdateBidDto,
  ) {
    return this.biddingService.updateBid(userId, bidId, dto);
  }

  @Post("/bids/:bidId/counter/accept")
  @ApiOperation({ summary: "Accept the customer's counter-offer" })
  async acceptCounter(
    @GetUser("sub") userId: string,
    @Param("bidId", ParseUUIDPipe) bidId: string,
  ) {
    return this.biddingService.acceptCounter(userId, bidId);
  }

  @Post("/bids/:bidId/counter/decline")
  @ApiOperation({ summary: "Decline the customer's counter-offer" })
  async declineCounter(
    @GetUser("sub") userId: string,
    @Param("bidId", ParseUUIDPipe) bidId: string,
  ) {
    return this.biddingService.declineCounter(userId, bidId);
  }

  @Post("/bids/:bidId/withdraw")
  @ApiOperation({ summary: "Withdraw own bid" })
  async withdrawBid(
    @GetUser("sub") userId: string,
    @Param("bidId", ParseUUIDPipe) bidId: string,
  ) {
    return this.biddingService.withdrawBid(userId, bidId);
  }

  @Get("/bids")
  @ApiOperation({ summary: "View submitted bids" })
  async listMyBids(
    @GetUser("sub") userId: string,
    @Query() query: BidQueryDto,
  ) {
    return this.biddingService.listMyBids(userId, query);
  }

  @Get("/available-jobs")
  @ApiOperation({ summary: "View available jobs with bid status" })
  async getAvailableJobs(@GetUser("sub") userId: string) {
    return this.biddingService.getAvailableJobsWithBidStatus(userId);
  }
}
