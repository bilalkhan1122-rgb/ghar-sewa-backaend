import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsBoolean,
  IsIn,
  IsInt,
  Min,
  Max,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { BANNER_ACCENTS, BANNER_TARGETS } from "../banner-options";

export class CreateBannerDto {
  @ApiProperty({
    description: "Banner headline",
    example: "50% OFF on First Plumbing Service",
    minLength: 2,
    maxLength: 120,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  title: string;

  @ApiPropertyOptional({
    description: "Supporting line under the headline",
    example: "Limited-time offer for new customers",
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  subtitle?: string;

  @ApiPropertyOptional({
    description: "Text on the call-to-action pill",
    example: "Book Now",
    maxLength: 40,
  })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  ctaLabel?: string;

  @ApiPropertyOptional({
    description: "Screen the banner opens when tapped",
    enum: BANNER_TARGETS,
    example: "post-job",
  })
  @IsOptional()
  @IsIn(BANNER_TARGETS)
  ctaTarget?: string;

  @ApiPropertyOptional({
    description: "Theme accent the card is painted with",
    enum: BANNER_ACCENTS,
    default: "primary",
  })
  @IsOptional()
  @IsIn(BANNER_ACCENTS)
  accentColor?: string;

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
    description: "Whether the banner is published to the app",
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
