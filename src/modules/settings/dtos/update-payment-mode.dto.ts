import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { PaymentMode } from "generated/prisma/client";

export class UpdatePaymentModeDto {
  @ApiProperty({
    enum: PaymentMode,
    description:
      "PREPAID requires a funded wallet before posting or booking. " +
      "POSTPAID lets customers post first and settle once they confirm the " +
      "work is done, and blocks them from posting again while a bill is unpaid.",
  })
  @IsEnum(PaymentMode)
  paymentMode!: PaymentMode;
}
