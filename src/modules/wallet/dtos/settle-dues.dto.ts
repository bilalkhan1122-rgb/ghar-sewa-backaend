import { IsOptional, IsUUID } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class SettleDuesDto {
  @ApiPropertyOptional({
    description:
      "Settle only this booking. Omit to clear as much of the outstanding " +
      "total as the wallet balance covers, oldest bill first.",
  })
  @IsOptional()
  @IsUUID()
  bookingId?: string;
}
