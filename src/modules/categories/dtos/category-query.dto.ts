import { IsOptional, IsString, IsEnum } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { Type } from "class-transformer";

export enum CategorySortField {
  NAME = "name",
  DISPLAY_ORDER = "displayOrder",
  CREATED_AT = "createdAt",
}

export class CategoryQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: "Search term for category name",
    example: "plumber",
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: "Sort field",
    enum: CategorySortField,
    default: CategorySortField.DISPLAY_ORDER,
  })
  @IsOptional()
  @IsEnum(CategorySortField)
  sortBy?: CategorySortField = CategorySortField.DISPLAY_ORDER;

  @ApiPropertyOptional({
    description: "Sort order",
    enum: ["asc", "desc"],
    default: "asc",
  })
  @IsOptional()
  @IsString()
  sortOrder?: "asc" | "desc" = "asc";

  @ApiPropertyOptional({
    description: "Filter by active status",
  })
  @IsOptional()
  @Type(() => String)
  isActive?: string; // 'true' or 'false' as string from query param
}
