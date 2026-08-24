import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordDto {
  @ApiProperty({
    description:
      "Registered email address or phone number. Either is accepted — the " +
      "code is always delivered to the email on the account.",
    example: "user@example.com",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  identifier: string;
}
