import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyEmailDto {
  @ApiProperty({
    description: "One-time email verification token from the verification link",
    example: "a1b2c3d4e5f6...",
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
