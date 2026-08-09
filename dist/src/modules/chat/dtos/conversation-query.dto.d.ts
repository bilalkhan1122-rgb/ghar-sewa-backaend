import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare enum ConversationSortField {
    LAST_ACTIVITY = "lastActivity",
    CREATED_AT = "createdAt"
}
export declare class ConversationQueryDto extends PaginationDto {
    jobId?: string;
    sortBy?: ConversationSortField;
    sortOrder?: 'asc' | 'desc';
}
