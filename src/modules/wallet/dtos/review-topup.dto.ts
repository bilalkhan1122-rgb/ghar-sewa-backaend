import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RejectTopUpDto {
  @ApiProperty({ description: 'Rejection reason (mandatory)' })
  @IsString()
  @IsNotEmpty({ message: 'Rejection reason is required' })
  @MaxLength(500)
  reason!: string;
}

export class ApproveTopUpDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
