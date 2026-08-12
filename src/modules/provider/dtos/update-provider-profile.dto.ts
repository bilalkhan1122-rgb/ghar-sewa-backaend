import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsUUID,
  ArrayMinSize,
  ArrayMaxSize,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class UpdateProviderProfileDto {
  @ApiPropertyOptional({
    description: "Provider bio / description",
    example: "Professional plumber with 10 years of experience",
    minLength: 20,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MinLength(20)
  @MaxLength(1000)
  bio?: string;

  @ApiPropertyOptional({
    description: "Hourly rate in PKR",
    example: 500,
    minimum: 50,
    maximum: 50000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(50)
  @Max(50000)
  hourlyRate?: number;

  @ApiPropertyOptional({
    description: "Service location / area",
    example: "Gulberg, Lahore",
    minLength: 3,
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  serviceLocation?: string;

  @ApiPropertyOptional({
    description: "Service radius in kilometers",
    example: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  serviceRadius?: number;

  @ApiPropertyOptional({
    description: "Array of service category IDs",
    example: ["category-id-1", "category-id-2"],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsUUID("4", { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  categoryIds?: string[];
}
