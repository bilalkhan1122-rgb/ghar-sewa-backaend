import { IsOptional, IsEnum, IsString, MaxLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { WithdrawalStatus } from "generated/prisma/client";

export class WithdrawalQueryDto extends PaginationDto {
  @ApiPropertyOptional({ enum: WithdrawalStatus })
  @IsOptional()
  @IsEnum(WithdrawalStatus)
  status?: WithdrawalStatus;

  @ApiPropertyOptional({
    description: "Search by provider name, account name or account number",
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;
}
