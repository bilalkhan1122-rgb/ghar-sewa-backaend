import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { TopUpStatus } from 'generated/prisma/client';
export declare class TopUpQueryDto extends PaginationDto {
    status?: TopUpStatus;
}
