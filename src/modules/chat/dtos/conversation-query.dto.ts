import { IsOptional, IsEnum, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export enum ConversationSortField {
  LAST_ACTIVITY = 'lastActivity',
  CREATED_AT = 'createdAt',
}

export class ConversationQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter by job ID',
  })
  @IsOptional()
  @IsString()
  jobId?: string;

  @ApiPropertyOptional({
    description: 'Sort field',
    enum: ConversationSortField,
    default: ConversationSortField.LAST_ACTIVITY,
  })
  @IsOptional()
  @IsEnum(ConversationSortField)
  sortBy?: ConversationSortField = ConversationSortField.LAST_ACTIVITY;

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';
}
