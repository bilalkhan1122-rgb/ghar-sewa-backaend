import {
  IsString,
  IsNumber,
  IsOptional,
  MinLength,
  MaxLength,
  Min,
  Max,
  IsUUID,
  IsISO8601,
  ValidateIf,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class UpdateJobDto {
  @ApiPropertyOptional({
    description: "Service category ID",
    example: "uuid-here",
  })
  @IsOptional()
  @IsUUID("4")
  categoryId?: string;

  @ApiPropertyOptional({
    description:
      "Sub-type within the category. Send null to clear it. Changing " +
      "`categoryId` without sending one clears it, since a sub-type belongs " +
      "to exactly one category.",
    example: "uuid-here",
    nullable: true,
  })
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsUUID("4")
  subcategoryId?: string | null;

  @ApiPropertyOptional({
    description: "Job title",
    example: "Fix leaking kitchen faucet",
    minLength: 5,
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional({
    description: "Detailed job description",
    example: "The kitchen sink faucet has been leaking for 2 days.",
    minLength: 20,
    maxLength: 5000,
  })
  @IsOptional()
  @IsString()
  @MinLength(20)
  @MaxLength(5000)
  description?: string;

  @ApiPropertyOptional({
    description: "Job address",
    example: "House #12, Street 5, Gulberg, Lahore",
    minLength: 5,
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  address?: string;

  @ApiPropertyOptional({
    description: "Latitude coordinate",
    example: 31.5204,
    minimum: -90,
    maximum: 90,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiPropertyOptional({
    description: "Longitude coordinate",
    example: 74.3587,
    minimum: -180,
    maximum: 180,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @ApiPropertyOptional({
    description: "Offered price in PKR",
    example: 1500,
    minimum: 1,
    maximum: 9999999,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(9999999)
  offeredPrice?: number;

  @ApiPropertyOptional({
    description: "Preferred schedule (ISO date)",
    example: "2026-08-15T10:00:00Z",
  })
  @IsOptional()
  @IsISO8601()
  preferredSchedule?: string;

  @ApiPropertyOptional({
    description: "Additional notes for the provider",
    example: "Please bring your own tools",
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  additionalNotes?: string;

  // NOTE: isUrgent is intentionally NOT updatable. Urgency is chosen at
  // creation only — allowing clients to flip it would let them extend a
  // job's life beyond its normal lifecycle (Module 20 business rule).
}
