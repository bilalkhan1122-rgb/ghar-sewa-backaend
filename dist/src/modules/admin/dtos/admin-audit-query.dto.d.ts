import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class AdminAuditQueryDto extends PaginationDto {
    adminId?: string;
    action?: string;
    entityType?: string;
    dateFrom?: string;
    dateTo?: string;
}
