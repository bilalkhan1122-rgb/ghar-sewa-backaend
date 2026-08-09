import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { WithdrawalStatus } from 'generated/prisma/client';
export declare class WithdrawalQueryDto extends PaginationDto {
    status?: WithdrawalStatus;
    search?: string;
}
