import { ChatService } from './chat.service';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { SendMessageDto } from './dtos/send-message.dto';
import { UpdateMessageDto } from './dtos/update-message.dto';
import { MarkReadDto } from './dtos/mark-read.dto';
import { ConversationQueryDto } from './dtos/conversation-query.dto';
import { MessageQueryDto } from './dtos/message-query.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getOrCreateConversation(userId: string, dto: CreateConversationDto): Promise<{
        job: {
            id: string;
            status: import("../../../generated/prisma/enums").JobStatus;
            title: string;
            category: {
                id: string;
                name: string;
                icon: string | null;
            };
        };
        customer: {
            id: string;
            fullName: string;
            profilePhoto: string | null;
        };
        provider: {
            id: string;
            fullName: string;
            profilePhoto: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        providerId: string;
        jobId: string;
        customerId: string;
        bookingId: string | null;
        lastMessage: string | null;
        lastMessageAt: Date | null;
        lastActivity: Date;
        customerDeletedAt: Date | null;
        providerDeletedAt: Date | null;
    }>;
    listConversations(userId: string, query: ConversationQueryDto): Promise<{
        data: {
            unreadCount: number;
            job: {
                id: string;
                status: import("../../../generated/prisma/enums").JobStatus;
                title: string;
                category: {
                    id: string;
                    name: string;
                    icon: string | null;
                };
            };
            customer: {
                id: string;
                fullName: string;
                profilePhoto: string | null;
            };
            provider: {
                id: string;
                fullName: string;
                profilePhoto: string | null;
            };
            id: string;
            createdAt: Date;
            updatedAt: Date;
            providerId: string;
            jobId: string;
            customerId: string;
            bookingId: string | null;
            lastMessage: string | null;
            lastMessageAt: Date | null;
            lastActivity: Date;
            customerDeletedAt: Date | null;
            providerDeletedAt: Date | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    }>;
    deleteConversation(userId: string, id: string): Promise<{
        message: string;
    }>;
    markAsRead(userId: string, id: string, dto: MarkReadDto): Promise<{
        conversationId: string;
        readAt: Date;
        unreadCount: number;
    }>;
    typingIndicator(userId: string, id: string, isTyping: boolean): Promise<{
        conversationId: string;
        isTyping: boolean;
    }>;
    getHistory(userId: string, id: string, query: MessageQueryDto): Promise<{
        data: ({
            sender: {
                id: string;
                fullName: string;
                role: import("../../../generated/prisma/enums").UserRole;
                profilePhoto: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            latitude: number | null;
            longitude: number | null;
            type: import("../../../generated/prisma/enums").MessageType;
            conversationId: string;
            senderId: string;
            content: string | null;
            attachmentUrl: string | null;
            deliveredAt: Date | null;
            readAt: Date | null;
            editedAt: Date | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    }>;
    sendMessage(userId: string, id: string, dto: SendMessageDto): Promise<{
        sender: {
            id: string;
            fullName: string;
            role: import("../../../generated/prisma/enums").UserRole;
            profilePhoto: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        latitude: number | null;
        longitude: number | null;
        type: import("../../../generated/prisma/enums").MessageType;
        conversationId: string;
        senderId: string;
        content: string | null;
        attachmentUrl: string | null;
        deliveredAt: Date | null;
        readAt: Date | null;
        editedAt: Date | null;
    }>;
    sendImageMessage(userId: string, id: string, file: Express.Multer.File, caption?: string): Promise<{
        sender: {
            id: string;
            fullName: string;
            role: import("../../../generated/prisma/enums").UserRole;
            profilePhoto: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        latitude: number | null;
        longitude: number | null;
        type: import("../../../generated/prisma/enums").MessageType;
        conversationId: string;
        senderId: string;
        content: string | null;
        attachmentUrl: string | null;
        deliveredAt: Date | null;
        readAt: Date | null;
        editedAt: Date | null;
    }>;
    editMessage(userId: string, id: string, dto: UpdateMessageDto): Promise<{
        sender: {
            id: string;
            fullName: string;
            role: import("../../../generated/prisma/enums").UserRole;
            profilePhoto: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        latitude: number | null;
        longitude: number | null;
        type: import("../../../generated/prisma/enums").MessageType;
        conversationId: string;
        senderId: string;
        content: string | null;
        attachmentUrl: string | null;
        deliveredAt: Date | null;
        readAt: Date | null;
        editedAt: Date | null;
    }>;
    deleteMessage(userId: string, id: string): Promise<{
        message: string;
        id: string;
    }>;
}
