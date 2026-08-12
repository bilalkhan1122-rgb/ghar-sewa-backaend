import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from "class-validator";
import { DisputeResolution } from "generated/prisma/client";

export class ResolveDisputeDto {
  @IsEnum(DisputeResolution, { message: "Invalid resolution type" })
  @IsNotEmpty()
  resolution!: DisputeResolution;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  refundAmount?: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
