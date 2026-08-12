import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsBoolean,
  IsInt,
  Min,
  Max,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateCategoryDto {
  @ApiProperty({
    description: "Category name",
    example: "Plumber",
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: "Category description",
    example: "Pipe repair, faucet installation, water heater services",
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    description: "Icon emoji or URL",
    example: "🔧",
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  icon?: string;

  @ApiPropertyOptional({
    description: "Display order (lower = earlier)",
    example: 1,
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(9999)
  displayOrder?: number;

  @ApiPropertyOptional({
    description: "Whether the category is active",
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
