import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { VerificationService } from './verification.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/client';
import { VerificationQueryDto } from './dtos/verification-query.dto';

@ApiTags('Verification (Provider)')
@Controller('verification')
@Roles(UserRole.PROVIDER)
export class ProviderVerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post('/submit')
  @ApiOperation({ summary: 'Submit (or resubmit) my profile for verification' })
  async submit(@GetUser('sub') userId: string) {
    return this.verificationService.submit(userId);
  }

  @Get('/status')
  @ApiOperation({
    summary: 'Get my current verification status and latest request',
  })
  async getStatus(@GetUser('sub') userId: string) {
    return this.verificationService.getStatus(userId);
  }

  @Get('/history')
  @ApiOperation({ summary: 'View my verification history (paginated)' })
  async getHistory(
    @GetUser('sub') userId: string,
    @Query() query: VerificationQueryDto,
  ) {
    return this.verificationService.getHistory(userId, query);
  }
}
