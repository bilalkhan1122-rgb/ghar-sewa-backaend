import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
  MaxLength,
  IsUUID,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateBidDto {
  @ApiProperty({
    description: "Job ID to bid on",
    example: "uuid-here",
  })
  @IsUUID("4")
  jobId: string;

  @ApiProperty({
    description: "Offered price in PKR",
    example: 1200,
    minimum: 1,
    maximum: 9999999,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(9999999)
  offeredPrice: number;

  @ApiPropertyOptional({
    description: "Optional message to the customer",
    example: "I can do this job. I have 5 years of experience.",
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  message?: string;
}
