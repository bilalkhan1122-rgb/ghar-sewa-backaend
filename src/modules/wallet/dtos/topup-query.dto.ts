import { IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { TopUpStatus } from 'generated/prisma/client';

export class TopUpQueryDto extends PaginationDto {
  @ApiPropertyOptional({ enum: TopUpStatus })
  @IsOptional()
  @IsEnum(TopUpStatus)
  status?: TopUpStatus;
}
