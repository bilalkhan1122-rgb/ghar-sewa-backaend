import { NotificationsService } from './notifications.service';
import { RegisterDeviceDto } from './dtos/register-device.dto';
export declare class DevicesController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    register(userId: string, dto: RegisterDeviceDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        deviceToken: string;
        platform: string;
        lastActiveAt: Date;
    }>;
    listDevices(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        deviceToken: string;
        platform: string;
        lastActiveAt: Date;
    }[]>;
    unregister(userId: string, id: string): Promise<{
        message: string;
    }>;
}
