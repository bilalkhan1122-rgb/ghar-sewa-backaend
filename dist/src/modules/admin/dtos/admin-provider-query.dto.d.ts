import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UserStatus, VerificationStatus } from 'generated/prisma/client';
export declare class AdminProviderQueryDto extends PaginationDto {
    search?: string;
    status?: UserStatus;
    verificationStatus?: VerificationStatus;
}
