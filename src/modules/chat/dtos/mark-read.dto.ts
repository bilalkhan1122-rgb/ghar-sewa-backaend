import { IsArray, IsOptional, IsUUID } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class MarkReadDto {
  @ApiPropertyOptional({
    description:
      "Optional list of message IDs to mark read. If omitted, all messages from the other party are marked read.",
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsUUID("4", { each: true })
  messageIds?: string[];
}
