import { IsEnum, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { ProviderRank } from "generated/prisma/client";
import { PaginationDto } from "src/common/dtos/pagination.dto";

export class RankingQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: "Filter providers by current rank",
    enum: ProviderRank,
  })
  @IsOptional()
  @IsEnum(ProviderRank)
  rank?: ProviderRank;

  @ApiPropertyOptional({
    description: "Search by provider name or email",
  })
  @IsOptional()
  @IsString()
  search?: string;
}
