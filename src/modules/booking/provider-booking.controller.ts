import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { BookingService } from "./booking.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "generated/prisma/client";
import { BookingQueryDto } from "./dtos/booking-query.dto";

@ApiTags("Booking (Provider)")
@Controller("provider/booking")
@Roles(UserRole.PROVIDER)
export class ProviderBookingController {
  constructor(private readonly bookingService: BookingService) {}

  // ─── Booking Listing ─────────────────────────────────────────────────

  @Get("/")
  @ApiOperation({ summary: "View booking history with filters" })
  async listBookings(
    @GetUser("sub") userId: string,
    @Query() query: BookingQueryDto,
  ) {
    return this.bookingService.listProviderBookings(userId, query);
  }

  @Get("/active")
  @ApiOperation({ summary: "View active work (accepted + in-progress)" })
  async getActiveWork(@GetUser("sub") userId: string) {
    return this.bookingService.getProviderActiveWork(userId);
  }

  @Get("/stats")
  @ApiOperation({ summary: "Get provider booking statistics" })
  async getStats(@GetUser("sub") userId: string) {
    return this.bookingService.getProviderBookingStats(userId);
  }

  @Get("/:id")
  @ApiOperation({ summary: "View a single booking by ID" })
  async getBookingById(
    @GetUser("sub") userId: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.bookingService.getBookingById(userId, id);
  }

  // ─── Job Tracking ────────────────────────────────────────────────────

  @Get("/jobs/:jobId/timeline")
  @ApiOperation({ summary: "View full job tracking timeline" })
  async getJobTimeline(
    @GetUser("sub") userId: string,
    @Param("jobId", ParseUUIDPipe) jobId: string,
  ) {
    return this.bookingService.getJobTimeline(userId, jobId);
  }

  @Post("/:bookingId/accept")
  @ApiOperation({ summary: "Accept a direct booking request" })
  async acceptRequest(
    @GetUser("sub") userId: string,
    @Param("bookingId", ParseUUIDPipe) bookingId: string,
  ) {
    return this.bookingService.acceptBookingRequest(userId, bookingId);
  }

  @Post("/:bookingId/decline")
  @ApiOperation({ summary: "Decline a direct booking request" })
  async declineRequest(
    @GetUser("sub") userId: string,
    @Param("bookingId", ParseUUIDPipe) bookingId: string,
    @Body() body: { reason?: string },
  ) {
    return this.bookingService.declineBookingRequest(
      userId,
      bookingId,
      body?.reason,
    );
  }

  @Post("/:bookingId/start")
  @ApiOperation({ summary: "Start work on a job" })
  async startJob(
    @GetUser("sub") userId: string,
    @Param("bookingId", ParseUUIDPipe) bookingId: string,
  ) {
    return this.bookingService.startJob(userId, bookingId);
  }

  @Post("/:bookingId/complete")
  @ApiOperation({ summary: "Mark job as completed" })
  async markCompleted(
    @GetUser("sub") userId: string,
    @Param("bookingId", ParseUUIDPipe) bookingId: string,
  ) {
    return this.bookingService.markJobCompleted(userId, bookingId);
  }

  @Post("/:bookingId/cancel")
  @ApiOperation({ summary: "Cancel booking before work starts" })
  async cancelBooking(
    @GetUser("sub") userId: string,
    @Param("bookingId", ParseUUIDPipe) bookingId: string,
    @Body("reason") reason?: string,
  ) {
    return this.bookingService.cancelBookingByProvider(
      userId,
      bookingId,
      reason,
    );
  }
}
