import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";

export class MessageQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description:
      "Fetch messages created before this ISO timestamp (for infinite scroll)",
  })
  @IsOptional()
  @IsString()
  before?: string;
}
