import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PenaltyType, AppealStatus } from 'generated/prisma/client';
export declare class PenaltyQueryDto extends PaginationDto {
    type?: PenaltyType;
}
export declare class AppealQueryDto extends PaginationDto {
    status?: AppealStatus;
}
