import { IsOptional, IsBoolean } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateNotificationPreferencesDto {
  @ApiPropertyOptional({
    description: "Job notifications (new jobs, bids)",
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  jobEnabled?: boolean;

  @ApiPropertyOptional({
    description: "Chat notifications",
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  chatEnabled?: boolean;

  @ApiPropertyOptional({
    description: "Booking notifications (started, completed, confirmed)",
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  bookingEnabled?: boolean;

  @ApiPropertyOptional({
    description: "Marketing notifications",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  marketingEnabled?: boolean;

  @ApiPropertyOptional({
    description: "System notifications (verification, wallet, disputes)",
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  systemEnabled?: boolean;
}
