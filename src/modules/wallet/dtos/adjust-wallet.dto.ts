import { Type } from "class-transformer";
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AdjustWalletDto {
  @ApiProperty({
    description:
      "Adjustment amount. Positive credits the wallet, negative debits it (PKR).",
    example: 500,
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01, { message: "Adjustment amount must be non-zero" })
  amount!: number;

  @ApiProperty({ description: "Direction: credit or debit" })
  @IsString()
  @IsNotEmpty()
  @IsIn(["credit", "debit"])
  direction!: "credit" | "debit";

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "Reason is required" })
  @MaxLength(500)
  reason!: string;
}
