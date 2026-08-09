export declare enum DevicePlatform {
    IOS = "ios",
    ANDROID = "android",
    WEB = "web"
}
export declare class RegisterDeviceDto {
    deviceToken: string;
    platform: DevicePlatform;
    deviceName?: string;
}
