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

export class ProviderRegisterDto {
  @ApiProperty({
    description: "Full name of the provider",
    example: "John Provider",
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
    example: "provider@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      "Strong password (min 8 chars, uppercase, lowercase, number, special char)",
    example: "Provider@123",
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
    description: "Must accept terms and conditions",
    example: true,
  })
  @IsBoolean()
  @Equals(true, { message: "You must accept the terms and conditions" })
  acceptTerms: boolean;
}
