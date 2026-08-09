import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DisputesService } from './disputes.service';
import { AdminAuditService } from 'src/common/services/admin-audit.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { UserRole } from 'generated/prisma/client';
import { DisputeQueryDto } from './dtos/dispute-query.dto';
import { ResolveDisputeDto } from './dtos/resolve-dispute.dto';
import { UpdateDisputeStatusDto } from './dtos/update-dispute-status.dto';
import { RejectDisputeDto } from './dtos/reject-dispute.dto';

@ApiTags('Disputes (Admin)')
@Controller('admin/disputes')
@Roles(UserRole.ADMIN)
export class AdminDisputesController {
  constructor(
    private readonly disputesService: DisputesService,
    private readonly audit: AdminAuditService,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'View all disputes (filter by status)' })
  async list(@Query() query: DisputeQueryDto) {
    return this.disputesService.adminListDisputes(query);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'View dispute details (evidence, timeline, booking)',
  })
  async get(@Param('id', ParseUUIDPipe) id: string) {
    return this.disputesService.adminGetDispute(id);
  }

  @Get('/:id/evidence')
  @ApiOperation({ summary: 'View dispute evidence' })
  async getEvidence(@Param('id', ParseUUIDPipe) id: string) {
    return this.disputesService.adminListEvidence(id);
  }

  @Get('/:id/timeline')
  @ApiOperation({ summary: 'View the full dispute timeline' })
  async getTimeline(@Param('id', ParseUUIDPipe) id: string) {
    return this.disputesService.adminGetTimeline(id);
  }

  @Get('/:id/chat')
  @ApiOperation({ summary: 'View chat history between the parties' })
  async getChat(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: DisputeQueryDto,
  ) {
    const { page = 1, limit = 20 } = query;
    return this.disputesService.adminGetChatHistory(id, page, limit);
  }

  @Permissions('disputes.manage')
  @Post('/:id/status')
  @ApiOperation({ summary: 'Update dispute status (tracked in timeline)' })
  async updateStatus(
    @GetUser('sub') adminId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDisputeStatusDto,
  ) {
    const result = await this.disputesService.adminUpdateStatus(
      adminId,
      id,
      dto,
    );
    await this.audit.record({
      adminId,
      action: 'DISPUTE_STATUS_UPDATED',
      entityType: 'DISPUTE',
      entityId: id,
      newValues: { status: dto.status },
    });
    return result;
  }

  @Permissions('disputes.resolve')
  @Post('/:id/resolve')
  @ApiOperation({
    summary: 'Resolve a dispute (full/partial refund, redo, none)',
  })
  async resolve(
    @GetUser('sub') adminId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ResolveDisputeDto,
  ) {
    const result = await this.disputesService.adminResolve(adminId, id, dto);
    await this.audit.record({
      adminId,
      action: 'DISPUTE_RESOLVED',
      entityType: 'DISPUTE',
      entityId: id,
      newValues: {
        resolution: dto.resolution,
        refundAmount: dto.refundAmount ?? null,
      },
    });
    return result;
  }

  @Permissions('disputes.resolve')
  @Post('/:id/reject')
  @ApiOperation({ summary: 'Reject a dispute (mandatory reason)' })
  async reject(
    @GetUser('sub') adminId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RejectDisputeDto,
  ) {
    const result = await this.disputesService.adminReject(
      adminId,
      id,
      dto.reason,
    );
    await this.audit.record({
      adminId,
      action: 'DISPUTE_REJECTED',
      entityType: 'DISPUTE',
      entityId: id,
      newValues: { reason: dto.reason },
    });
    return result;
  }
}
