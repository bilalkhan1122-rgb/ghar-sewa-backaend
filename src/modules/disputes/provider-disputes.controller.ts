import {
  Controller,
  Get,
  Post,
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
import { DisputesService } from './disputes.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/client';
import { DisputeQueryDto } from './dtos/dispute-query.dto';
import { RespondDisputeDto } from './dtos/respond-dispute.dto';

@ApiTags('Disputes (Provider)')
@Controller('provider/disputes')
@Roles(UserRole.PROVIDER)
export class ProviderDisputesController {
  constructor(private readonly disputesService: DisputesService) {}

  @Get('/')
  @ApiOperation({ summary: 'View disputes I am involved in (paginated)' })
  async list(@GetUser('sub') userId: string, @Query() query: DisputeQueryDto) {
    return this.disputesService.listMyDisputes(userId, query);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'View a dispute' })
  async get(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.disputesService.getDispute(userId, id);
  }

  @Get('/:id/history')
  @ApiOperation({ summary: 'View the dispute timeline' })
  async getHistory(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.disputesService.getDisputeHistory(userId, id);
  }

  @Post('/:id/evidence')
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
  @ApiOperation({
    summary: 'Upload dispute evidence (images/videos/PDF, max 10MB)',
  })
  async uploadEvidence(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif|mp4|webm|mov|pdf)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.disputesService.uploadEvidence(userId, id, file);
  }

  @Post('/:id/response')
  @ApiOperation({ summary: 'Respond with an explanation' })
  async respond(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RespondDisputeDto,
  ) {
    return this.disputesService.respond(userId, id, dto);
  }
}
