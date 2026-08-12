import { IsOptional, IsInt, Min, Max, IsEnum, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";

export enum ReviewSortField {
  CREATED_AT = "createdAt",
  RATING = "rating",
}

export class ReviewQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: "Filter by rating (1-5)",
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({
    description: "Sort field",
    enum: ReviewSortField,
    default: ReviewSortField.CREATED_AT,
  })
  @IsOptional()
  @IsEnum(ReviewSortField)
  sortBy?: ReviewSortField = ReviewSortField.CREATED_AT;

  @ApiPropertyOptional({
    description: "Sort order",
    enum: ["asc", "desc"],
    default: "desc",
  })
  @IsOptional()
  @IsString()
  sortOrder?: "asc" | "desc" = "desc";
}
