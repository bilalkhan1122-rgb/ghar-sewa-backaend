import { Type } from "class-transformer";
import { IsEnum, IsISO8601, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import {
  WalletTransactionType,
  WalletTransactionStatus,
} from "generated/prisma/client";

export class WalletTransactionQueryDto extends PaginationDto {
  @ApiPropertyOptional({ enum: WalletTransactionType })
  @IsOptional()
  @IsEnum(WalletTransactionType)
  type?: WalletTransactionType;

  @ApiPropertyOptional({ enum: WalletTransactionStatus })
  @IsOptional()
  @IsEnum(WalletTransactionStatus)
  status?: WalletTransactionStatus;

  @ApiPropertyOptional({
    description: "Start date (ISO)",
    example: "2026-01-01",
  })
  @IsOptional()
  @IsISO8601()
  @Type(() => String)
  dateFrom?: string;

  @ApiPropertyOptional({ description: "End date (ISO)", example: "2026-12-31" })
  @IsOptional()
  @IsISO8601()
  @Type(() => String)
  dateTo?: string;
}
