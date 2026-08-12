import {
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  Max,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { Type } from "class-transformer";

export enum AnalyticsRangeType {
  TODAY = "today",
  LAST_7_DAYS = "last_7_days",
  LAST_30_DAYS = "last_30_days",
  CUSTOM = "custom",
}

export class AnalyticsQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: "Preset analytics window",
    enum: AnalyticsRangeType,
    default: AnalyticsRangeType.LAST_30_DAYS,
  })
  @IsOptional()
  @IsEnum(AnalyticsRangeType)
  range?: AnalyticsRangeType = AnalyticsRangeType.LAST_30_DAYS;

  @ApiPropertyOptional({
    description: "Custom range start (ISO). Requires range=custom.",
    example: "2026-01-01",
  })
  @IsOptional()
  @IsISO8601()
  dateFrom?: string;

  @ApiPropertyOptional({
    description: "Custom range end (ISO). Requires range=custom.",
    example: "2026-12-31",
  })
  @IsOptional()
  @IsISO8601()
  dateTo?: string;

  @ApiPropertyOptional({
    description: "Optional provider/category/dispute-reason filter for lists",
  })
  @IsOptional()
  @IsString()
  filterBy?: string;

  @ApiPropertyOptional({
    description: "Top-N limit for ranked lists",
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  topN?: number = 10;
}
