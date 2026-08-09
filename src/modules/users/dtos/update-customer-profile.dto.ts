import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCustomerProfileDto {
  @ApiPropertyOptional({
    description: 'Full name of the customer',
    example: 'John Doe',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName?: string;

  @ApiPropertyOptional({
    description: 'ID of the city',
    example: 'city-lahore',
  })
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional({
    description: 'Street address',
    example: '123 Main Street, Lahore',
    minLength: 3,
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  address?: string;
}
