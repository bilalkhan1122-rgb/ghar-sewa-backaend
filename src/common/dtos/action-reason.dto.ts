import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ActionReasonDto {
  @ApiProperty({ example: 'Violation of platform policy', maxLength: 500 })
  @IsString()
  @IsNotEmpty({ message: 'A reason is required' })
  @MaxLength(500)
  reason!: string;
}

export class OptionalReasonDto {
  @ApiPropertyOptional({ maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
