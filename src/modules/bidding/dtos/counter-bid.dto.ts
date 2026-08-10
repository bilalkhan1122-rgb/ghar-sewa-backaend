import { IsString, IsNumber, IsOptional, Min, Max, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CounterBidDto {
  @ApiProperty({
    description: 'Price the customer is proposing instead of the bid amount, in PKR',
    example: 1000,
    minimum: 1,
    maximum: 9999999,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(9999999)
  counterPrice: number;

  @ApiPropertyOptional({
    description: 'Optional note explaining the counter-offer',
    example: 'Can you do it for this price? The job is smaller than it looks.',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  message?: string;
}
