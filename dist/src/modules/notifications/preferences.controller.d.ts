import { NotificationsService } from './notifications.service';
import { UpdateNotificationPreferencesDto } from './dtos/update-notification-preferences.dto';
export declare class PreferencesController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getPreferences(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        jobEnabled: boolean;
        chatEnabled: boolean;
        bookingEnabled: boolean;
        marketingEnabled: boolean;
        systemEnabled: boolean;
    }>;
    updatePreferences(userId: string, dto: UpdateNotificationPreferencesDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        jobEnabled: boolean;
        chatEnabled: boolean;
        bookingEnabled: boolean;
        marketingEnabled: boolean;
        systemEnabled: boolean;
    }>;
}
