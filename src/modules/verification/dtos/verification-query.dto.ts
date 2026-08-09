import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { VerificationStatus } from 'generated/prisma/client';

export class VerificationQueryDto extends PaginationDto {
  @IsOptional()
  @IsEnum(VerificationStatus, {
    message: 'status must be a valid verification status',
  })
  status?: VerificationStatus;
}
