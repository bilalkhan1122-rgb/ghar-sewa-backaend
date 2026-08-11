import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { VerificationStatus } from 'generated/prisma/client';

export class VerificationQueryDto extends PaginationDto {
  @IsOptional()
  @IsEnum(VerificationStatus, {
    message: 'status must be a valid verification status',
  })
  status?: VerificationStatus;

  @ApiPropertyOptional({
    description:
      "Return only this provider's requests. Lets an admin review the " +
      'submitted documents after a request leaves the pending queue.',
  })
  @IsOptional()
  @IsUUID()
  providerId?: string;
}
