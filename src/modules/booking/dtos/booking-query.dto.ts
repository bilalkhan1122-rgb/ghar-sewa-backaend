import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export enum BookingSortField {
  CREATED_AT = 'createdAt',
  TOTAL_AMOUNT = 'totalAmount',
}

export class BookingQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter by booking status',
    example: 'ACCEPTED',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    description: 'Filter by category ID',
  })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Filter by date range start (ISO date)',
    example: '2026-01-01',
  })
  @IsOptional()
  @IsString()
  dateFrom?: string;

  @ApiPropertyOptional({
    description: 'Filter by date range end (ISO date)',
    example: '2026-12-31',
  })
  @IsOptional()
  @IsString()
  dateTo?: string;

  @ApiPropertyOptional({
    description: 'Sort field',
    enum: BookingSortField,
    default: BookingSortField.CREATED_AT,
  })
  @IsOptional()
  @IsEnum(BookingSortField)
  sortBy?: BookingSortField = BookingSortField.CREATED_AT;

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';

  @ApiPropertyOptional({
    description: 'Search by job title or booking ID (admin)',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Filter by customer ID (admin)' })
  @IsOptional()
  @IsString()
  customerId?: string;

  @ApiPropertyOptional({ description: 'Filter by provider ID (admin)' })
  @IsOptional()
  @IsString()
  providerId?: string;

  @ApiPropertyOptional({
    description: 'Filter by customer city ID (admin)',
  })
  @IsOptional()
  @IsString()
  cityId?: string;
}
