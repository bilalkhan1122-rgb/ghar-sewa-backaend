import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare enum JobSortField {
    CREATED_AT = "createdAt",
    OFFERED_PRICE = "offeredPrice"
}
export declare class JobQueryDto extends PaginationDto {
    status?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: JobSortField;
    sortOrder?: 'asc' | 'desc';
    search?: string;
    customerId?: string;
    providerId?: string;
    cityId?: string;
    dateFrom?: string;
    dateTo?: string;
}
