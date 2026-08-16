import { IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AvailabilityDto {
  @ApiProperty({
    description:
      "Whether the provider is available right now. Shown to customers as an online indicator; does not affect what jobs they can see or accept.",
    example: true,
  })
  @IsBoolean()
  isOnline: boolean;
}
