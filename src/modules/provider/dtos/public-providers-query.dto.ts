import { IsIn, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Transform } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";

export const PROVIDER_SORTS = ["rating", "name", "price"] as const;
export type ProviderSort = (typeof PROVIDER_SORTS)[number];

/**
 * Filters for the public provider listings — both `/public/providers` and
 * `/categories/:id/providers`, which share one implementation.
 *
 * Every field is validated here rather than coerced in the controller so a
 * client that fires filter changes faster than they resolve gets a 400 for a
 * malformed value instead of a silently different result set.
 */
export class PublicProvidersQueryDto extends PaginationDto {
  @ApiPropertyOptional({ description: "Only providers offering this service" })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({
    description: "Matches provider name, service area or city",
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === "string" ? value.trim() : value,
  )
  search?: string;

  @ApiPropertyOptional({ enum: PROVIDER_SORTS, default: "rating" })
  @IsOptional()
  @IsIn(PROVIDER_SORTS)
  sortBy?: ProviderSort;
}
