import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SupportReportCategory } from "generated/prisma/client";

export class CreateSupportReportDto {
  @ApiProperty({ enum: SupportReportCategory })
  @IsEnum(SupportReportCategory)
  category!: SupportReportCategory;

  @ApiProperty({ description: "One-line summary" })
  @IsString()
  @IsNotEmpty({ message: "A short subject is required" })
  @MaxLength(200)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === "string" ? value.trim() : value,
  )
  subject!: string;

  @ApiProperty({ description: "What happened" })
  @IsString()
  @IsNotEmpty({ message: "Describe the problem so support can act on it" })
  @MaxLength(2000)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === "string" ? value.trim() : value,
  )
  description!: string;

  @ApiPropertyOptional({
    description: "The other party this is about, when the report names one",
  })
  @IsOptional()
  @IsUUID()
  aboutUserId?: string;
}
