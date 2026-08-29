import { IsOptional, IsEnum, IsString, MaxLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { PaymentGatewayType, PaymentStatus } from "generated/prisma/client";

export class PaymentQueryDto extends PaginationDto {
  @ApiPropertyOptional({ enum: PaymentStatus })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @ApiPropertyOptional({ enum: PaymentGatewayType })
  @IsOptional()
  @IsEnum(PaymentGatewayType)
  gateway?: PaymentGatewayType;

  @ApiPropertyOptional({
    description: "Search by user ID or gateway transaction ID",
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;
}
