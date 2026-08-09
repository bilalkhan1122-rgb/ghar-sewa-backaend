import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare enum BidSortField {
    CREATED_AT = "createdAt",
    OFFERED_PRICE = "offeredPrice"
}
export declare class BidQueryDto extends PaginationDto {
    status?: string;
    jobId?: string;
    sortBy?: BidSortField;
    sortOrder?: 'asc' | 'desc';
}
