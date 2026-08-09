import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PenaltyType, AppealStatus } from 'generated/prisma/client';

export class PenaltyQueryDto extends PaginationDto {
  @IsOptional()
  @IsEnum(PenaltyType, { message: 'type must be a valid penalty type' })
  type?: PenaltyType;
}

export class AppealQueryDto extends PaginationDto {
  @IsOptional()
  @IsEnum(AppealStatus, { message: 'status must be a valid appeal status' })
  status?: AppealStatus;
}
