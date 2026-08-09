import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { ChatGateway } from './chat.gateway';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { SendMessageDto } from './dtos/send-message.dto';
import { UpdateMessageDto } from './dtos/update-message.dto';
import { MarkReadDto } from './dtos/mark-read.dto';
import { ConversationQueryDto } from './dtos/conversation-query.dto';
import { MessageQueryDto } from './dtos/message-query.dto';
import { Logger } from 'nestjs-pino';
import { UserRole, MessageType } from 'generated/prisma/client';
export declare const MESSAGE_EDIT_WINDOW_MINUTES = 5;
export declare class ChatService {
    private readonly prisma;
    private readonly fileUpload;
    private readonly gateway;
    private readonly logger;
    constructor(prisma: PrismaService, fileUpload: FileUploadService, gateway: ChatGateway, logger: Logger);
    getOrCreateConversation(userId: string, dto: CreateConversationDto): Promise<{
        job: {
            id: string;
            status: import("generated/prisma/client").JobStatus;
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
    sendMessage(userId: string, conversationId: string, dto: SendMessageDto): Promise<{
        sender: {
            id: string;
            fullName: string;
            role: UserRole;
            profilePhoto: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        latitude: number | null;
        longitude: number | null;
        type: MessageType;
        conversationId: string;
        senderId: string;
        content: string | null;
        attachmentUrl: string | null;
        deliveredAt: Date | null;
        readAt: Date | null;
        editedAt: Date | null;
    }>;
    sendImageMessage(userId: string, conversationId: string, file: Express.Multer.File, caption?: string): Promise<{
        sender: {
            id: string;
            fullName: string;
            role: UserRole;
            profilePhoto: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        latitude: number | null;
        longitude: number | null;
        type: MessageType;
        conversationId: string;
        senderId: string;
        content: string | null;
        attachmentUrl: string | null;
        deliveredAt: Date | null;
        readAt: Date | null;
        editedAt: Date | null;
    }>;
    editMessage(userId: string, messageId: string, dto: UpdateMessageDto): Promise<{
        sender: {
            id: string;
            fullName: string;
            role: UserRole;
            profilePhoto: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        latitude: number | null;
        longitude: number | null;
        type: MessageType;
        conversationId: string;
        senderId: string;
        content: string | null;
        attachmentUrl: string | null;
        deliveredAt: Date | null;
        readAt: Date | null;
        editedAt: Date | null;
    }>;
    deleteMessage(userId: string, messageId: string): Promise<{
        message: string;
        id: string;
    }>;
    getConversationHistory(userId: string, conversationId: string, query: MessageQueryDto): Promise<{
        data: ({
            sender: {
                id: string;
                fullName: string;
                role: UserRole;
                profilePhoto: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            latitude: number | null;
            longitude: number | null;
            type: MessageType;
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
    markAsRead(userId: string, conversationId: string, dto: MarkReadDto): Promise<{
        conversationId: string;
        readAt: Date;
        unreadCount: number;
    }>;
    listConversations(userId: string, query: ConversationQueryDto): Promise<{
        data: {
            unreadCount: number;
            job: {
                id: string;
                status: import("generated/prisma/client").JobStatus;
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
    deleteConversation(userId: string, conversationId: string): Promise<{
        message: string;
    }>;
    sendTypingIndicator(userId: string, conversationId: string, isTyping: boolean): Promise<{
        conversationId: string;
        isTyping: boolean;
    }>;
    private validateMessagePayload;
    getConversationForUser(conversationId: string, userId: string): Promise<{
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
    private getOwnMessage;
    private unreadCount;
    private messagePreview;
    private messageIncludes;
    private conversationIncludes;
}
