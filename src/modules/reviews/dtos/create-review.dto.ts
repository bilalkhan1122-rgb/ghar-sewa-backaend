import {
  IsUUID,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateReviewDto {
  @ApiProperty({
    description: "Completed booking ID being reviewed",
    example: "uuid-here",
  })
  @IsUUID("4")
  bookingId: string;

  @ApiProperty({
    description: "Rating from 1 to 5 stars",
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1, { message: "Rating must be at least 1" })
  @Max(5, { message: "Rating cannot exceed 5" })
  rating: number;

  @ApiPropertyOptional({
    description: "Optional review text",
    example: "Great work, very professional!",
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  reviewText?: string;
}
