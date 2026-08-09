import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateBidDto {
  @ApiPropertyOptional({
    description: 'Updated offered price in PKR',
    example: 1500,
    minimum: 1,
    maximum: 9999999,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(9999999)
  offeredPrice?: number;

  @ApiPropertyOptional({
    description: 'Updated message to the customer',
    example: 'I can do it for 1500 instead.',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  message?: string;
}
