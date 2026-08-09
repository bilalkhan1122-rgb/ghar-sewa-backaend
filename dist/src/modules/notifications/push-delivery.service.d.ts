import { ConfigService } from '@nestjs/config';
export interface PushPayload {
    title: string;
    body: string;
    data?: Record<string, string>;
}
export interface PushResult {
    delivered: boolean;
    error?: string;
}
export declare class PushDeliveryService {
    private readonly config;
    private readonly logger;
    private fcmInitialized;
    private fcmAvailable;
    constructor(config: ConfigService);
    private initFcm;
    send(token: string, payload: PushPayload): Promise<PushResult>;
}
