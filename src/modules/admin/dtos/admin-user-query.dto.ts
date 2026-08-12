import {
  IsBooleanString,
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import {
  UserRole,
  UserStatus,
  VerificationStatus,
} from "generated/prisma/client";

export class AdminUserQueryDto extends PaginationDto {
  @ApiPropertyOptional({ description: "Search by name, email or phone" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @ApiPropertyOptional({ enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ enum: UserStatus })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiPropertyOptional({ enum: VerificationStatus })
  @IsOptional()
  @IsEnum(VerificationStatus)
  verificationStatus?: VerificationStatus;

  @ApiPropertyOptional({ description: "true = only deleted users" })
  @IsOptional()
  @IsBooleanString()
  deleted?: string;

  @ApiPropertyOptional({
    description: "Start date (ISO)",
    example: "2026-01-01",
  })
  @IsOptional()
  @IsISO8601()
  dateFrom?: string;

  @ApiPropertyOptional({ description: "End date (ISO)", example: "2026-12-31" })
  @IsOptional()
  @IsISO8601()
  dateTo?: string;
}
