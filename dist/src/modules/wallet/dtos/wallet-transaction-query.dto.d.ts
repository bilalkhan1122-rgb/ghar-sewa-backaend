import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { WalletTransactionType, WalletTransactionStatus } from 'generated/prisma/client';
export declare class WalletTransactionQueryDto extends PaginationDto {
    type?: WalletTransactionType;
    status?: WalletTransactionStatus;
    dateFrom?: string;
    dateTo?: string;
}
