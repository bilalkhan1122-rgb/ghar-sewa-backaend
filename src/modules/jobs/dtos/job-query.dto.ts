import {
  IsISO8601,
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Type } from 'class-transformer';

export enum JobSortField {
  CREATED_AT = 'createdAt',
  OFFERED_PRICE = 'offeredPrice',
}

export class JobQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter by job status',
    example: 'PENDING',
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
    description: 'Filter by minimum offered price',
    example: 500,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Filter by maximum offered price',
    example: 10000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({
    description: 'Sort field',
    enum: JobSortField,
    default: JobSortField.CREATED_AT,
  })
  @IsOptional()
  @IsEnum(JobSortField)
  sortBy?: JobSortField = JobSortField.CREATED_AT;

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';

  @ApiPropertyOptional({
    description: 'Search by title or description (admin)',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Filter by customer ID (admin)' })
  @IsOptional()
  @IsString()
  customerId?: string;

  @ApiPropertyOptional({
    description: 'Filter by provider ID via bookings (admin)',
  })
  @IsOptional()
  @IsString()
  providerId?: string;

  @ApiPropertyOptional({ description: 'Filter by customer city ID (admin)' })
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional({
    description: 'Filter by date range start (ISO, admin)',
    example: '2026-01-01',
  })
  @IsOptional()
  @IsISO8601()
  dateFrom?: string;

  @ApiPropertyOptional({
    description: 'Filter by date range end (ISO, admin)',
    example: '2026-12-31',
  })
  @IsOptional()
  @IsISO8601()
  dateTo?: string;
}
