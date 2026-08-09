import { IsISO8601, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class AdminAuditQueryDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filter by admin user id' })
  @IsOptional()
  @IsString()
  adminId?: string;

  @ApiPropertyOptional({
    description: 'Filter by action',
    example: 'USER_SUSPENDED',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  action?: string;

  @ApiPropertyOptional({
    description: 'Filter by entity type',
    example: 'USER',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  entityType?: string;

  @ApiPropertyOptional({
    description: 'Start date (ISO)',
    example: '2026-01-01',
  })
  @IsOptional()
  @IsISO8601()
  dateFrom?: string;

  @ApiPropertyOptional({ description: 'End date (ISO)', example: '2026-12-31' })
  @IsOptional()
  @IsISO8601()
  dateTo?: string;
}
