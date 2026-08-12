import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { DisputeStatus } from "generated/prisma/client";

export class DisputeQueryDto extends PaginationDto {
  @IsOptional()
  @IsEnum(DisputeStatus, { message: "status must be a valid dispute status" })
  status?: DisputeStatus;
}
