import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
  Min,
  Max,
  IsUrl,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum ChatMessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  LOCATION = "LOCATION",
}

export class SendMessageDto {
  @ApiProperty({
    description: "Message type",
    enum: ChatMessageType,
    default: ChatMessageType.TEXT,
  })
  @IsEnum(ChatMessageType)
  type: ChatMessageType = ChatMessageType.TEXT;

  @ApiPropertyOptional({
    description: "Message content (required for TEXT)",
    example: "Assalam-o-Alaikum, when can you start?",
    maxLength: 5000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  content?: string;

  @ApiPropertyOptional({
    description:
      "Attachment URL (required for IMAGE, from the upload endpoint)",
  })
  @IsOptional()
  @IsUrl({ require_protocol: true })
  attachmentUrl?: string;

  @ApiPropertyOptional({
    description: "Latitude (required for LOCATION)",
    example: 31.5204,
    minimum: -90,
    maximum: 90,
  })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiPropertyOptional({
    description: "Longitude (required for LOCATION)",
    example: 74.3587,
    minimum: -180,
    maximum: 180,
  })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;
}
