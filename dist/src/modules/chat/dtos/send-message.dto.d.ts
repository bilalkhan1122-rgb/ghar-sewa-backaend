export declare enum ChatMessageType {
    TEXT = "TEXT",
    IMAGE = "IMAGE",
    LOCATION = "LOCATION"
}
export declare class SendMessageDto {
    type: ChatMessageType;
    content?: string;
    attachmentUrl?: string;
    latitude?: number;
    longitude?: number;
}
