import { IsEnum, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import {
  SupportReportCategory,
  SupportReportStatus,
} from "generated/prisma/client";

export class SupportReportQueryDto extends PaginationDto {
  @ApiPropertyOptional({ enum: SupportReportStatus })
  @IsOptional()
  @IsEnum(SupportReportStatus)
  status?: SupportReportStatus;

  @ApiPropertyOptional({ enum: SupportReportCategory })
  @IsOptional()
  @IsEnum(SupportReportCategory)
  category?: SupportReportCategory;
}
