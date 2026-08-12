import { IsISO8601, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class DateRangeDto {
  @ApiPropertyOptional({
    description: "Start date (ISO)",
    example: "2026-01-01",
  })
  @IsOptional()
  @IsISO8601()
  dateFrom?: string;

  @ApiPropertyOptional({ description: "End date (ISO)", example: "2026-12-31" })
  @IsOptional()
  @IsISO8601()
  dateTo?: string;
}

export interface DateRangeFilter {
  gte?: Date;
  lte?: Date;
}

/** Build a Prisma date filter (end-of-day inclusive) from a date range. */
export function buildDateRange(
  dateFrom?: string,
  dateTo?: string,
): DateRangeFilter | undefined {
  if (!dateFrom && !dateTo) return undefined;
  return {
    ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
    ...(dateTo
      ? { lte: new Date(new Date(dateTo).setHours(23, 59, 59, 999)) }
      : {}),
  };
}
