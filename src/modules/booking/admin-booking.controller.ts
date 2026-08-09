import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/client';
import { BookingQueryDto } from './dtos/booking-query.dto';

@ApiTags('Bookings (Admin)')
@Controller('admin/bookings')
@Roles(UserRole.ADMIN)
export class AdminBookingsController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('/')
  @ApiOperation({
    summary: 'List all bookings with search/filter/pagination',
  })
  async list(@Query() query: BookingQueryDto) {
    return this.bookingService.adminListBookings(query);
  }

  @Get('/jobs/:jobId/timeline')
  @ApiOperation({ summary: 'View a booking/job tracking timeline' })
  async getTimeline(
    @GetUser('sub') adminId: string,
    @Param('jobId', ParseUUIDPipe) jobId: string,
  ) {
    return this.bookingService.getJobTimeline(adminId, jobId);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'View full booking details' })
  async getDetail(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookingService.adminGetBooking(id);
  }
}
