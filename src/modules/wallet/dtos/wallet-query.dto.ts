import { IsOptional, IsEnum } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { WalletType, WalletStatus } from "generated/prisma/client";

export class WalletQueryDto extends PaginationDto {
  @ApiPropertyOptional({ enum: WalletType })
  @IsOptional()
  @IsEnum(WalletType)
  type?: WalletType;

  @ApiPropertyOptional({ enum: WalletStatus })
  @IsOptional()
  @IsEnum(WalletStatus)
  status?: WalletStatus;
}
