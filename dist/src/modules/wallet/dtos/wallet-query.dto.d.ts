import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { WalletType, WalletStatus } from 'generated/prisma/client';
export declare class WalletQueryDto extends PaginationDto {
    type?: WalletType;
    status?: WalletStatus;
}
