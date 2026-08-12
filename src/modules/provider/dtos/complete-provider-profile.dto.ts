import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  Min,
  Max,
  MinLength,
  MaxLength,
  ArrayMinSize,
  ArrayMaxSize,
  IsUUID,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CompleteProviderProfileDto {
  @ApiProperty({
    description: "Provider bio / description",
    example: "Professional plumber with 10 years of experience",
    minLength: 20,
    maxLength: 1000,
  })
  @IsString()
  @MinLength(20)
  @MaxLength(1000)
  bio: string;

  @ApiProperty({
    description: "Hourly rate in PKR",
    example: 500,
    minimum: 50,
    maximum: 50000,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(50)
  @Max(50000)
  hourlyRate: number;

  @ApiProperty({
    description: "Service location / area",
    example: "Gulberg, Lahore",
    minLength: 3,
    maxLength: 500,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  serviceLocation: string;

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

  @ApiProperty({
    description: "CNIC number (without dashes)",
    example: "1234567890123",
    minLength: 13,
    maxLength: 15,
  })
  @IsString()
  @MinLength(13)
  @MaxLength(15)
  cnicNumber: string;

  @ApiProperty({
    description: "Array of service category IDs",
    example: ["category-id-1", "category-id-2"],
    type: [String],
  })
  @IsArray()
  @IsUUID("4", { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  categoryIds: string[];
}
