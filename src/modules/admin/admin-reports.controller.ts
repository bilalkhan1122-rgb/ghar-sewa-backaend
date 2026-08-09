import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/client';
import { DateRangeDto } from './dtos/date-range.dto';

@ApiTags('Admin Reports')
@Controller('admin/reports')
@Roles(UserRole.ADMIN)
export class AdminReportsController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/users')
  @ApiOperation({ summary: 'User report: totals, registrations, statuses' })
  async users(@Query() dto: DateRangeDto) {
    return this.adminService.reportUsers(dto);
  }

  @Get('/providers')
  @ApiOperation({
    summary: 'Provider report: verification stats, ratings, top providers',
  })
  async providers(@Query() dto: DateRangeDto) {
    return this.adminService.reportProviders(dto);
  }

  @Get('/jobs')
  @ApiOperation({ summary: 'Job report: created/completed/cancelled/expired' })
  async jobs(@Query() dto: DateRangeDto) {
    return this.adminService.reportJobs(dto);
  }

  @Get('/financial')
  @ApiOperation({
    summary: 'Financial report: revenue, commission, wallet balances',
  })
  async financial(@Query() dto: DateRangeDto) {
    return this.adminService.reportFinancial(dto);
  }

  @Get('/disputes')
  @ApiOperation({ summary: 'Dispute report: totals, status, resolutions' })
  async disputes(@Query() dto: DateRangeDto) {
    return this.adminService.reportDisputes(dto);
  }
}
