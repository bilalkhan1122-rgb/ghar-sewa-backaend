import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class SubcategoryQueryDto {
  @ApiPropertyOptional({
    description: "Search term for subcategory name",
    example: "gas",
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: "Filter by active status",
  })
  @IsOptional()
  @Type(() => String)
  isActive?: string; // 'true' or 'false' as string from query param
}
