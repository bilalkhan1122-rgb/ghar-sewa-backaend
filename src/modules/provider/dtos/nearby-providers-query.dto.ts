import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsUUID, Max, Min } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  NEARBY_DEFAULT_LIMIT,
  NEARBY_DEFAULT_RADIUS_KM,
  NEARBY_MAX_RADIUS_KM,
} from "../provider-presence.config";

/**
 * Query parameters for `GET /providers/nearby` — the customer's position, the
 * service they are looking for, and the radius to search inside.
 */
export class NearbyProvidersQueryDto {
  @ApiProperty({
    description: "Search centre latitude (WGS84)",
    example: 31.5204,
    minimum: -90,
    maximum: 90,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({
    description: "Search centre longitude (WGS84)",
    example: 74.3587,
    minimum: -180,
    maximum: 180,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiPropertyOptional({
    description:
      "Only show providers offering this service category (e.g. a plumber search passes the Plumber category id)",
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({
    description: "Search radius in kilometres",
    example: NEARBY_DEFAULT_RADIUS_KM,
    default: NEARBY_DEFAULT_RADIUS_KM,
    minimum: 1,
    maximum: NEARBY_MAX_RADIUS_KM,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(NEARBY_MAX_RADIUS_KM)
  radiusKm?: number = NEARBY_DEFAULT_RADIUS_KM;

  @ApiPropertyOptional({
    description: "Maximum number of providers to return",
    example: NEARBY_DEFAULT_LIMIT,
    default: NEARBY_DEFAULT_LIMIT,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = NEARBY_DEFAULT_LIMIT;
}
