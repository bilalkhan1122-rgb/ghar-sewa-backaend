import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/client';
import { DirectBookingDto } from './dtos/direct-booking.dto';
import { BookingQueryDto } from './dtos/booking-query.dto';

@ApiTags('Booking (Customer)')
@Controller('booking')
@Roles(UserRole.CUSTOMER)
export class CustomerBookingController {
  constructor(private readonly bookingService: BookingService) {}

  // ─── Direct Booking ──────────────────────────────────────────────────

  @Post('/direct')
  @ApiOperation({ summary: 'Create a direct booking (fixed price)' })
  async createDirectBooking(
    @GetUser('sub') userId: string,
    @Body() dto: DirectBookingDto,
  ) {
    return this.bookingService.createDirectBooking(userId, dto);
  }

  // ─── Booking Listing ─────────────────────────────────────────────────

  @Get('/')
  @ApiOperation({ summary: 'View booking history with filters' })
  async listBookings(
    @GetUser('sub') userId: string,
    @Query() query: BookingQueryDto,
  ) {
    return this.bookingService.listCustomerBookings(userId, query);
  }

  @Get('/active')
  @ApiOperation({ summary: 'View active bookings' })
  async getActiveBookings(@GetUser('sub') userId: string) {
    return this.bookingService.getCustomerActiveBookings(userId);
  }

  @Get('/stats')
  @ApiOperation({ summary: 'Get booking statistics' })
  async getStats(@GetUser('sub') userId: string) {
    return this.bookingService.getCustomerBookingStats(userId);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'View a single booking by ID' })
  async getBookingById(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.bookingService.getBookingById(userId, id);
  }

  // ─── Job Tracking ────────────────────────────────────────────────────

  @Get('/jobs/:jobId/timeline')
  @ApiOperation({ summary: 'View full job tracking timeline' })
  async getJobTimeline(
    @GetUser('sub') userId: string,
    @Param('jobId', ParseUUIDPipe) jobId: string,
  ) {
    return this.bookingService.getJobTimeline(userId, jobId);
  }

  @Post('/:bookingId/confirm-completion')
  @ApiOperation({ summary: 'Confirm job completion' })
  async confirmCompletion(
    @GetUser('sub') userId: string,
    @Param('bookingId', ParseUUIDPipe) bookingId: string,
  ) {
    return this.bookingService.confirmCompletion(userId, bookingId);
  }

  @Post('/:bookingId/cancel')
  @ApiOperation({ summary: 'Cancel booking (before work starts)' })
  async cancelBooking(
    @GetUser('sub') userId: string,
    @Param('bookingId', ParseUUIDPipe) bookingId: string,
    @Body('reason') reason?: string,
  ) {
    return this.bookingService.cancelBooking(userId, bookingId, reason);
  }
}
