import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";
import { IsStrongPassword } from "src/common/validators/password.validator";

export class SetPasswordDto {
  @ApiPropertyOptional({
    description:
      "Current password. Required only if the account already has one — accounts created through Google have none, and set their first password without it.",
    example: "OldPass@123",
  })
  @IsOptional()
  @IsString()
  currentPassword?: string;

  @ApiProperty({
    description:
      "New password (min 8 chars, uppercase, lowercase, number, special char)",
    example: "NewPass@123",
  })
  @IsString()
  @IsStrongPassword()
  newPassword: string;
}
