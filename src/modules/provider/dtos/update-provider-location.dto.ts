import { Type } from "class-transformer";
import { IsNumber, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Provider-reported live position. Only ever written for the authenticated
 * provider's own profile; customers have no endpoint that can touch it.
 */
export class UpdateProviderLocationDto {
  @ApiProperty({
    description: "Current latitude (WGS84)",
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
    description: "Current longitude (WGS84)",
    example: 74.3587,
    minimum: -180,
    maximum: 180,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
}
