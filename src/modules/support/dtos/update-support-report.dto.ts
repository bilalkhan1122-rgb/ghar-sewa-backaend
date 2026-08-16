import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SupportReportStatus } from "generated/prisma/client";

export class UpdateSupportReportDto {
  @ApiProperty({ enum: SupportReportStatus })
  @IsEnum(SupportReportStatus)
  status!: SupportReportStatus;

  @ApiPropertyOptional({ description: "Shown to the reporter with the update" })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  adminNote?: string;
}
