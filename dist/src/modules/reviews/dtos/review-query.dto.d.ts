import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare enum ReviewSortField {
    CREATED_AT = "createdAt",
    RATING = "rating"
}
export declare class ReviewQueryDto extends PaginationDto {
    rating?: number;
    sortBy?: ReviewSortField;
    sortOrder?: 'asc' | 'desc';
}
