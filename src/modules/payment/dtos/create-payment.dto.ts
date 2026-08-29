import { Type } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PaymentGatewayType, PaymentMethod } from "generated/prisma/client";

export class CreatePaymentDto {
  @ApiProperty({ description: "Amount to pay (PKR)", example: 5000 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1, { message: "Payment amount must be at least 1" })
  @Max(1000000, { message: "Payment amount cannot exceed 1,000,000" })
  amount!: number;

  @ApiProperty({
    enum: PaymentGatewayType,
    description: "Payment gateway to use",
  })
  @IsEnum(PaymentGatewayType)
  @IsNotEmpty()
  gateway!: PaymentGatewayType;

  @ApiProperty({ enum: PaymentMethod, description: "Payment method" })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod!: PaymentMethod;

  @ApiPropertyOptional({
    description: "Booking ID to associate with this payment",
  })
  @IsOptional()
  @IsUUID()
  bookingId?: string;

  @ApiPropertyOptional({ description: "Wallet ID to credit on success" })
  @IsOptional()
  @IsUUID()
  walletId?: string;

  @ApiPropertyOptional({ description: "Callback URL for gateway webhook" })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  callbackUrl?: string;

  @ApiPropertyOptional({ description: "Additional metadata" })
  @IsOptional()
  metadata?: Record<string, unknown>;
}
