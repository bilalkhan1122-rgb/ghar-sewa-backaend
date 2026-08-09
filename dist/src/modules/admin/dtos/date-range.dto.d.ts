export declare class DateRangeDto {
    dateFrom?: string;
    dateTo?: string;
}
export interface DateRangeFilter {
    gte?: Date;
    lte?: Date;
}
export declare function buildDateRange(dateFrom?: string, dateTo?: string): DateRangeFilter | undefined;
