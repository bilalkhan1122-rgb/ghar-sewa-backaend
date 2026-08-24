import { IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyResetOtpDto {
  @ApiProperty({
    description: "The email or phone the code was requested with",
    example: "user@example.com",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  identifier: string;

  @ApiProperty({
    description: "Six-digit code from the email",
    example: "418302",
  })
  @IsString()
  @Matches(/^\d{6}$/, { message: "Enter the six-digit code from the email" })
  otp: string;
}
