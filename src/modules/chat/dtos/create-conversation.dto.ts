import { IsUUID, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateConversationDto {
  @ApiProperty({
    description: "Job ID the conversation is tied to",
    example: "uuid-here",
  })
  @IsUUID("4")
  jobId: string;

  @ApiProperty({
    description: "The other participant (provider or customer) ID",
    example: "uuid-here",
  })
  @IsUUID("4")
  participantId: string;

  @ApiPropertyOptional({
    description: "Optional booking ID (set once the booking is accepted)",
  })
  @IsOptional()
  @IsUUID("4")
  bookingId?: string;
}
