import { IsString, MaxLength, IsOptional, IsUrl } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMessageDto {
  @ApiPropertyOptional({
    description: 'Updated message content',
    maxLength: 5000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  content?: string;

  @ApiPropertyOptional({
    description: 'Updated attachment URL',
  })
  @IsOptional()
  @IsUrl({ require_protocol: true })
  attachmentUrl?: string;
}
