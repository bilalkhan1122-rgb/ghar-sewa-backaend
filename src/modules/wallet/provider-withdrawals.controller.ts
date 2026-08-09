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
import { WithdrawalsService } from './withdrawals.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/client';
import { CreateWithdrawalDto } from './dtos/create-withdrawal.dto';
import { WithdrawalQueryDto } from './dtos/withdrawal-query.dto';

@ApiTags('Withdrawals (Provider)')
@Controller('provider/withdrawals')
@Roles(UserRole.PROVIDER)
export class ProviderWithdrawalsController {
  constructor(private readonly withdrawalsService: WithdrawalsService) {}

  @Post('/')
  @ApiOperation({
    summary:
      'Submit a withdrawal request (amount moves to held balance immediately)',
  })
  async submit(
    @GetUser('sub') userId: string,
    @Body() dto: CreateWithdrawalDto,
  ) {
    return this.withdrawalsService.submitWithdrawal(userId, dto);
  }

  @Get('/')
  @ApiOperation({ summary: 'View my withdrawal history' })
  async list(
    @GetUser('sub') userId: string,
    @Query() query: WithdrawalQueryDto,
  ) {
    return this.withdrawalsService.listMyWithdrawals(userId, query);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'View a withdrawal request' })
  async get(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.withdrawalsService.getMyWithdrawal(userId, id);
  }

  @Post('/:id/cancel')
  @ApiOperation({ summary: 'Cancel a pending withdrawal (funds released)' })
  async cancel(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.withdrawalsService.cancelWithdrawal(userId, id);
  }
}
