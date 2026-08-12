import {
  IsString,
  IsNumber,
  IsUUID,
  Min,
  Max,
  MinLength,
  MaxLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class DirectBookingDto {
  @ApiProperty({
    description: "Provider ID to book directly",
    example: "uuid-here",
  })
  @IsUUID("4")
  providerId: string;

  @ApiProperty({
    description: "Service category ID",
    example: "uuid-here",
  })
  @IsUUID("4")
  categoryId: string;

  @ApiProperty({
    description: "Job title",
    example: "Fix leaking kitchen faucet",
    minLength: 5,
    maxLength: 200,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  title: string;

  @ApiProperty({
    description: "Detailed job description",
    example: "The kitchen sink faucet has been leaking for 2 days.",
    minLength: 20,
    maxLength: 5000,
  })
  @IsString()
  @MinLength(20)
  @MaxLength(5000)
  description: string;

  @ApiProperty({
    description: "Job address",
    example: "House #12, Street 5, Gulberg, Lahore",
    minLength: 5,
    maxLength: 500,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  address: string;

  @ApiProperty({
    description: "Latitude coordinate",
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
    description: "Longitude coordinate",
    example: 74.3587,
    minimum: -180,
    maximum: 180,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiProperty({
    description: "Agreed price in PKR",
    example: 1500,
    minimum: 1,
    maximum: 9999999,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(9999999)
  totalAmount: number;
}
