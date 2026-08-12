import { Type } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AdminSearchQueryDto {
  @ApiProperty({ description: "Search query", example: "Ahmed" })
  @IsString()
  @IsNotEmpty({ message: "Search query is required" })
  @MaxLength(100)
  q!: string;

  @ApiPropertyOptional({ description: "Max results per entity", default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;
}
