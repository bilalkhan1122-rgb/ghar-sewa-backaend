import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UserRole, UserStatus, VerificationStatus } from 'generated/prisma/client';
export declare class AdminUserQueryDto extends PaginationDto {
    search?: string;
    role?: UserRole;
    status?: UserStatus;
    verificationStatus?: VerificationStatus;
    deleted?: string;
    dateFrom?: string;
    dateTo?: string;
}
