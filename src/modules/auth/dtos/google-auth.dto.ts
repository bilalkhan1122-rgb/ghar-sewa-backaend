import { IsString, IsNotEmpty, IsOptional, IsIn } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "generated/prisma/client";

export class GoogleAuthDto {
  @ApiProperty({
    description:
      "Google ID token obtained from the Google Sign-In SDK on the client",
    example: "eyJhbGciOiJSUzI1NiIs...",
  })
  @IsString()
  @IsNotEmpty()
  idToken: string;

  @ApiPropertyOptional({
    description:
      "Role for NEW accounts only (CUSTOMER or PROVIDER). Ignored for existing users.",
    enum: UserRole,
    example: UserRole.CUSTOMER,
  })
  // Only customer/provider can ever be chosen via social sign-up — ADMIN
  // must be provisioned by a real admin.
  @IsOptional()
  @IsIn([UserRole.CUSTOMER, UserRole.PROVIDER])
  role?: UserRole;
}
