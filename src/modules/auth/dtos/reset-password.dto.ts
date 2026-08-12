import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsStrongPassword } from "src/common/validators/password.validator";

export class ResetPasswordDto {
  @ApiProperty({
    description: "One-time password reset token from the reset link",
    example: "a1b2c3d4e5f6...",
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    description:
      "New password (min 8 chars, uppercase, lowercase, number, special char)",
    example: "NewPass@123",
  })
  @IsString()
  @IsStrongPassword()
  newPassword: string;
}
