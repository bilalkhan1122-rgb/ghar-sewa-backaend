import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ChatService } from './chat.service';
import { Logger } from 'nestjs-pino';
interface AuthenticatedSocket extends Socket {
    userId?: string;
    role?: string;
}
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly jwtService;
    private readonly config;
    private readonly chatService;
    private readonly logger;
    server: Server;
    constructor(jwtService: JwtService, config: ConfigService, chatService: ChatService, logger: Logger);
    afterInit(): void;
    handleConnection(client: AuthenticatedSocket): Promise<void>;
    handleDisconnect(client: AuthenticatedSocket): void;
    handleJoinConversation(client: AuthenticatedSocket, data: {
        conversationId: string;
    }): Promise<void>;
    handleLeaveConversation(client: AuthenticatedSocket, data: {
        conversationId: string;
    }): Promise<void>;
    handleTyping(client: AuthenticatedSocket, data: {
        conversationId: string;
        isTyping: boolean;
    }): Promise<void>;
    private otherPartyId;
    emitNewMessage(conversationId: string, message: unknown, conversation?: {
        customerId: string;
        providerId: string;
    }, senderId?: string): void;
    emitMessageEdited(conversationId: string, message: unknown, conversation?: {
        customerId: string;
        providerId: string;
    }, senderId?: string): void;
    emitMessageDeleted(conversationId: string, message: unknown, conversation?: {
        customerId: string;
        providerId: string;
    }, senderId?: string): void;
    emitReadReceipt(conversationId: string, userId: string, readAt: Date, unreadCount: number, conversation?: {
        customerId: string;
        providerId: string;
    }): void;
    emitTyping(conversationId: string, userId: string, isTyping: boolean, conversation?: {
        customerId: string;
        providerId: string;
    }): void;
    private extractToken;
}
export {};
