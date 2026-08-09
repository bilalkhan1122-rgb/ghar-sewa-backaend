import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentMethod } from 'generated/prisma/client';

export class CreateWithdrawalDto {
  @ApiProperty({ description: 'Amount to withdraw (PKR)', example: 5000 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1, { message: 'Withdrawal amount must be positive' })
  amount!: number;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod!: PaymentMethod;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Account name is required' })
  @MaxLength(100)
  accountName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Account number is required' })
  @MaxLength(50)
  accountNumber!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  bankName?: string;
}
