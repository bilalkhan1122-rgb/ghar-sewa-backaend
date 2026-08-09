import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare enum CategorySortField {
    NAME = "name",
    DISPLAY_ORDER = "displayOrder",
    CREATED_AT = "createdAt"
}
export declare class CategoryQueryDto extends PaginationDto {
    search?: string;
    sortBy?: CategorySortField;
    sortOrder?: 'asc' | 'desc';
    isActive?: string;
}
