import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FreezeWalletDto {
  @ApiProperty({ example: 'Suspicious activity', maxLength: 500 })
  @IsString()
  @IsNotEmpty({ message: 'A reason is required to freeze a wallet' })
  @MaxLength(500)
  reason!: string;
}

export class UnfreezeWalletDto {
  @ApiPropertyOptional({ maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
