import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationType, UserRole } from 'generated/prisma/client';

export class NotificationPayloadDto {
  @ApiProperty({ enum: NotificationType })
  @IsEnum(NotificationType)
  type!: NotificationType;

  @ApiProperty({ example: 'Platform announcement', maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  title!: string;

  @ApiProperty({ example: 'Dear user, ...', maxLength: 2000 })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(2000)
  message!: string;

  /**
   * Future-ready: accepted for API compatibility, but scheduling
   * infrastructure is not available yet — omit it (or set in the past)
   * to send immediately.
   */
  @ApiPropertyOptional({
    description: 'Future-ready scheduled delivery time (not yet supported)',
  })
  @IsOptional()
  @IsISO8601()
  scheduledAt?: string;
}

export class SendUserNotificationDto extends NotificationPayloadDto {
  @ApiProperty({ description: 'Recipient user id' })
  @IsUUID('4')
  userId!: string;
}

export class SendRoleNotificationDto extends NotificationPayloadDto {
  @ApiProperty({ enum: UserRole, description: 'Target role' })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role!: UserRole;
}

export class SendBroadcastNotificationDto extends NotificationPayloadDto {}
