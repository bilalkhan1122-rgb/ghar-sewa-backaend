import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class BannerQueryDto {
  @ApiPropertyOptional({
    description: "Search term for banner title",
    example: "plumbing",
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: "Filter by published status",
  })
  @IsOptional()
  @Type(() => String)
  isActive?: string; // 'true' or 'false' as string from query param
}
