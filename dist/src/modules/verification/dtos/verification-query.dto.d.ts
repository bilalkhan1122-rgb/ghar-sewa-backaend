import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { VerificationStatus } from 'generated/prisma/client';
export declare class VerificationQueryDto extends PaginationDto {
    status?: VerificationStatus;
}
