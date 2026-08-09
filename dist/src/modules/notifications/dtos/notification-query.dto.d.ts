import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { NotificationType, NotificationCategory } from 'generated/prisma/client';
export declare class NotificationQueryDto extends PaginationDto {
    type?: NotificationType;
    category?: NotificationCategory;
    isRead?: boolean;
}
