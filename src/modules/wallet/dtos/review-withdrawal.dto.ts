import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class ReviewWithdrawalDto {
  @ApiPropertyOptional({
    description: "Admin note / rejection reason",
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}

export class RejectWithdrawalDto {
  @ApiPropertyOptional({
    description: "Rejection reason (mandatory)",
  })
  @IsString()
  @IsNotEmpty({ message: "Rejection reason is required" })
  @MaxLength(500)
  reason!: string;
}
