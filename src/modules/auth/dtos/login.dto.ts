import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'src/common/validators/password.validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email address (provide if not using phone)',
    example: 'user@example.com',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Pakistani mobile number (provide if not using email)',
    example: '+923001234567',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Account password',
    example: 'User@123',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
