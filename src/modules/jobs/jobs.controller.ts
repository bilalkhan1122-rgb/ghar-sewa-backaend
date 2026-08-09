import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { ActionReasonDto } from 'src/common/dtos/action-reason.dto';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { JobQueryDto } from './dtos/job-query.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/client';

// ─── Customer Controller ───────────────────────────────────────────────

@ApiTags('Jobs (Customer)')
@Controller('jobs')
@Roles(UserRole.CUSTOMER)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // ─── Job CRUD ────────────────────────────────────────────────────────

  @Post('/')
  @ApiOperation({ summary: 'Create a new job (customer only)' })
  async createJob(@GetUser('sub') userId: string, @Body() dto: CreateJobDto) {
    return this.jobsService.createJob(userId, dto);
  }

  @Get('/')
  @ApiOperation({ summary: 'List own jobs with filters and pagination' })
  async listMyJobs(
    @GetUser('sub') userId: string,
    @Query() query: JobQueryDto,
  ) {
    return this.jobsService.listMyJobs(userId, query);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a single job by ID' })
  async getJobById(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.jobsService.getJobById(userId, id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a job (only before acceptance)' })
  async updateJob(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateJobDto,
  ) {
    return this.jobsService.updateJob(userId, id, dto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a job (only before acceptance)' })
  async deleteJob(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.jobsService.deleteJob(userId, id);
  }

  // ─── Job Actions ─────────────────────────────────────────────────────

  @Post('/:id/cancel')
  @ApiOperation({ summary: 'Cancel a pending job' })
  async cancelJob(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.jobsService.cancelJob(userId, id);
  }

  @Post('/:id/repost')
  @ApiOperation({ summary: 'Repost an expired job' })
  async repostJob(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.jobsService.repostJob(userId, id);
  }

  // ─── Image Management ────────────────────────────────────────────────

  @Post('/:id/images')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Upload an image for a job' })
  async uploadJobImage(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp|gif)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.jobsService.uploadJobImage(userId, id, file);
  }

  @Get('/:id/images')
  @ApiOperation({ summary: 'List all images for a job' })
  async listJobImages(@Param('id', ParseUUIDPipe) id: string) {
    return this.jobsService.listJobImages(id);
  }

  @Delete('/:jobId/images/:imageId')
  @ApiOperation({ summary: 'Delete an image from a job' })
  async deleteJobImage(
    @GetUser('sub') userId: string,
    @Param('jobId', ParseUUIDPipe) jobId: string,
    @Param('imageId', ParseUUIDPipe) imageId: string,
  ) {
    return this.jobsService.deleteJobImage(userId, jobId, imageId);
  }
}

// ─── Provider Controller ───────────────────────────────────────────────

@ApiTags('Jobs (Provider)')
@Controller('provider/jobs')
export class ProviderJobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('/feed')
  @ApiOperation({
    summary: 'View matching available jobs (approved providers only)',
  })
  async getJobFeed(
    @GetUser('sub') userId: string,
    @Query() query: JobQueryDto,
  ) {
    return this.jobsService.getProviderJobFeed(userId, query);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'View a single job from the feed' })
  async getJobById(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.jobsService.getJobForProvider(userId, id);
  }
}

// ─── Admin Controller ──────────────────────────────────────────────────

@ApiTags('Jobs (Admin)')
@Controller('admin/jobs')
@Roles(UserRole.ADMIN)
export class AdminJobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('/')
  @ApiOperation({ summary: 'List all jobs with search/filters (admin)' })
  async listAllJobs(@Query() query: JobQueryDto) {
    return this.jobsService.adminListJobs(query);
  }

  @Get('/stats')
  @ApiOperation({ summary: 'Get job statistics' })
  async getJobStats() {
    return this.jobsService.getJobStats();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'View full job details (bids, bookings, timeline)' })
  async getJobDetail(@Param('id', ParseUUIDPipe) id: string) {
    return this.jobsService.adminGetJobDetail(id);
  }

  @Get('/:id/timeline')
  @ApiOperation({ summary: 'View a job timeline' })
  async getJobTimeline(@Param('id', ParseUUIDPipe) id: string) {
    return this.jobsService.adminGetJobTimeline(id);
  }

  @Permissions('jobs.cancel')
  @Permissions('jobs.cancel')
  @Post('/:id/cancel')
  @ApiOperation({ summary: 'Cancel a pending job (reason required)' })
  async cancelJob(
    @GetUser('sub') adminId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ActionReasonDto,
  ) {
    return this.jobsService.adminCancelJob(adminId, id, dto.reason);
  }

  @Permissions('jobs.cancel')
  @Post('/:id/force-close')
  @ApiOperation({ summary: 'Force close a job in any non-terminal state' })
  async forceCloseJob(
    @GetUser('sub') adminId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ActionReasonDto,
  ) {
    return this.jobsService.adminForceCloseJob(adminId, id, dto.reason);
  }

  @Post('/expire-overdue')
  @ApiOperation({ summary: 'Manually trigger expiration of overdue jobs' })
  async expireOverdueJobs() {
    const count = await this.jobsService.expireOverdueJobs();
    return { message: `Expired ${count} overdue jobs` };
  }
}
