import { IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ProviderBusyOverride } from "generated/prisma/client";

export class SetProviderBusyDto {
  @ApiProperty({
    enum: ProviderBusyOverride,
    description:
      "AUTO = derived from active bookings; BUSY / AVAILABLE force the state regardless of bookings.",
    example: ProviderBusyOverride.AUTO,
  })
  @IsEnum(ProviderBusyOverride)
  busyOverride: ProviderBusyOverride;
}
