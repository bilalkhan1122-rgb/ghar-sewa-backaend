import { IsOptional, IsEnum, IsBoolean } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import {
  NotificationType,
  NotificationCategory,
} from "generated/prisma/client";

export class NotificationQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: "Filter by notification type",
    enum: NotificationType,
  })
  @IsOptional()
  @IsEnum(NotificationType)
  type?: NotificationType;

  @ApiPropertyOptional({
    description: "Filter by notification category",
    enum: NotificationCategory,
  })
  @IsOptional()
  @IsEnum(NotificationCategory)
  category?: NotificationCategory;

  @ApiPropertyOptional({
    description: "Filter by read status",
    example: true,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isRead?: boolean;
}
