import {
  IsString,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum DevicePlatform {
  IOS = "ios",
  ANDROID = "android",
  WEB = "web",
}

export class RegisterDeviceDto {
  @ApiProperty({
    description: "FCM device token",
    example: "fcm-token-abc123",
    minLength: 8,
    maxLength: 500,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(500)
  @Matches(/^[\w.:\-_]+$/, {
    message: "Device token contains invalid characters",
  })
  deviceToken: string;

  @ApiProperty({
    description: "Device platform",
    enum: DevicePlatform,
    example: DevicePlatform.ANDROID,
  })
  @IsEnum(DevicePlatform)
  platform: DevicePlatform;

  @ApiPropertyOptional({
    description: "Optional device name / model for reference",
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  deviceName?: string;
}
