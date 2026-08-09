import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { DisputeStatus } from 'generated/prisma/client';
export declare class DisputeQueryDto extends PaginationDto {
    status?: DisputeStatus;
}
