import { IsOptional, IsString, IsEnum } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";

export enum BidSortField {
  CREATED_AT = "createdAt",
  OFFERED_PRICE = "offeredPrice",
}

export class BidQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: "Filter by bid status",
    example: "PENDING",
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    description: "Filter by job ID",
  })
  @IsOptional()
  @IsString()
  jobId?: string;

  @ApiPropertyOptional({
    description: "Sort field",
    enum: BidSortField,
    default: BidSortField.CREATED_AT,
  })
  @IsOptional()
  @IsEnum(BidSortField)
  sortBy?: BidSortField = BidSortField.CREATED_AT;

  @ApiPropertyOptional({
    description: "Sort order",
    enum: ["asc", "desc"],
    default: "desc",
  })
  @IsOptional()
  @IsString()
  sortOrder?: "asc" | "desc" = "desc";
}
