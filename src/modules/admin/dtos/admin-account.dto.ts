import {
  IsBoolean,
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  ADMIN_MODULE_KEYS,
  type AdminAccessLevel,
  type AdminModuleKey,
} from "src/common/constants/admin-permissions";

const ACCESS_LEVELS: AdminAccessLevel[] = ["none", "view", "full"];

/**
 * Per-module access, e.g. `{ "wallet": "full", "disputes": "view" }`.
 * Validated by hand: the shape is a dynamic key map, which the class-validator
 * decorators cannot describe.
 */
export function validateAccessMap(
  access: Record<string, unknown>,
): Record<AdminModuleKey, AdminAccessLevel> {
  const result: Record<string, AdminAccessLevel> = {};
  for (const [key, value] of Object.entries(access)) {
    if (!(ADMIN_MODULE_KEYS as readonly string[]).includes(key)) {
      throw new Error(`Unknown module "${key}"`);
    }
    if (
      typeof value !== "string" ||
      !ACCESS_LEVELS.includes(value as AdminAccessLevel)
    ) {
      throw new Error(
        `Access for "${key}" must be one of: ${ACCESS_LEVELS.join(", ")}`,
      );
    }
    result[key] = value as AdminAccessLevel;
  }
  return result;
}

export class CreateAdminAccountDto {
  @ApiProperty({ example: "Ayesha Khan" })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName!: string;

  @ApiProperty({ example: "ayesha@gharsewa.pk" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "+923001234567" })
  @IsString()
  @MaxLength(20)
  phone!: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  @Matches(/[A-Za-z]/, { message: "Password must contain a letter" })
  @Matches(/\d/, { message: "Password must contain a number" })
  password!: string;

  /** Super admins ignore `access` entirely — they hold every permission. */
  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isSuperAdmin?: boolean;

  @ApiPropertyOptional({ example: { wallet: "full", disputes: "view" } })
  @IsOptional()
  @IsObject()
  access?: Record<string, unknown>;
}

export class UpdateAdminAccountDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isSuperAdmin?: boolean;

  @ApiPropertyOptional({ example: { wallet: "full" } })
  @IsOptional()
  @IsObject()
  access?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateAdminProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;
}

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  currentPassword!: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  @Matches(/[A-Za-z]/, { message: "Password must contain a letter" })
  @Matches(/\d/, { message: "Password must contain a number" })
  newPassword!: string;
}

export const ACCESS_LEVEL_VALUES = ACCESS_LEVELS;
