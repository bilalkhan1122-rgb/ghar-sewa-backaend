import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsBoolean,
  Equals,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsStrongPassword } from "src/common/validators/password.validator";
import { IsPakistaniPhone } from "src/common/validators/phone.validator";

export class CustomerRegisterDto {
  @ApiProperty({
    description: "Full name of the customer",
    example: "John Doe",
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName: string;

  @ApiProperty({
    description: "Pakistani mobile number",
    example: "+923001234567",
  })
  @IsString()
  @IsPakistaniPhone()
  phone: string;

  @ApiProperty({
    description: "Email address",
    example: "customer@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      "Strong password (min 8 chars, uppercase, lowercase, number, special char)",
    example: "Customer@123",
    minLength: 8,
  })
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: "ID of the city",
    example: "city-lahore",
  })
  @IsString()
  @MinLength(1)
  cityId: string;

  @ApiProperty({
    description: "Street address",
    example: "123 Main Street, Lahore",
    minLength: 3,
    maxLength: 500,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  address: string;

  @ApiProperty({
    description: "Must accept terms and conditions",
    example: true,
  })
  @IsBoolean()
  @Equals(true, { message: "You must accept the terms and conditions" })
  acceptTerms: boolean;
}
