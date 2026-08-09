import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare enum BookingSortField {
    CREATED_AT = "createdAt",
    TOTAL_AMOUNT = "totalAmount"
}
export declare class BookingQueryDto extends PaginationDto {
    status?: string;
    categoryId?: string;
    dateFrom?: string;
    dateTo?: string;
    sortBy?: BookingSortField;
    sortOrder?: 'asc' | 'desc';
    search?: string;
    customerId?: string;
    providerId?: string;
    cityId?: string;
}
