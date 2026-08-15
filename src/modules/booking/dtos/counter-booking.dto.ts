import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CounterBookingDto {
  @ApiProperty({
    description:
      "The price the provider wants instead of the one the customer booked at",
    example: 2000,
    minimum: 1,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  offeredPrice: number;

  @ApiPropertyOptional({
    description: "Why the price differs — shown to the customer with the offer",
    example: "The car is a 7-seater, so it takes longer than a standard wash.",
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  message?: string;
}
