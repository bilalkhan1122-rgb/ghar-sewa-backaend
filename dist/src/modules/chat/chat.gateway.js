"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const chat_service_1 = require("./chat.service");
const nestjs_pino_1 = require("nestjs-pino");
let ChatGateway = class ChatGateway {
    jwtService;
    config;
    chatService;
    logger;
    server;
    constructor(jwtService, config, chatService, logger) {
        this.jwtService = jwtService;
        this.config = config;
        this.chatService = chatService;
        this.logger = logger;
    }
    afterInit() {
        this.logger.log('Chat gateway initialized', 'ChatGateway');
    }
    async handleConnection(client) {
        try {
            const token = this.extractToken(client);
            if (!token) {
                client.disconnect(true);
                return;
            }
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.config.get('JWT_ACCESS_SECRET'),
            });
            client.userId = payload.sub;
            client.role = payload.role;
            await client.join(`user:${client.userId}`);
        }
        catch {
            client.disconnect(true);
        }
    }
    handleDisconnect(client) {
        this.logger.log({ userId: client.userId, socketId: client.id }, 'Chat client disconnected');
    }
    async handleJoinConversation(client, data) {
        if (!client.userId || !data?.conversationId)
            return;
        try {
            await this.chatService.getConversationForUser(data.conversationId, client.userId);
            await client.join(`conversation:${data.conversationId}`);
            client.emit('conversation:joined', {
                conversationId: data.conversationId,
            });
        }
        catch {
            client.emit('conversation:error', {
                conversationId: data.conversationId,
                message: 'You are not part of this conversation',
            });
        }
    }
    async handleLeaveConversation(client, data) {
        if (!data?.conversationId)
            return;
        await client.leave(`conversation:${data.conversationId}`);
    }
    async handleTyping(client, data) {
        if (!client.userId || !data?.conversationId)
            return;
        try {
            await this.chatService.getConversationForUser(data.conversationId, client.userId);
            this.emitTyping(data.conversationId, client.userId, !!data.isTyping);
        }
        catch {
        }
    }
    otherPartyId(conversation, senderId) {
        return conversation.customerId === senderId
            ? conversation.providerId
            : conversation.customerId;
    }
    emitNewMessage(conversationId, message, conversation, senderId) {
        const payload = { conversationId, message };
        this.server
            .to(`conversation:${conversationId}`)
            .emit('message:new', payload);
        if (conversation && senderId) {
            this.server
                .to(`user:${this.otherPartyId(conversation, senderId)}`)
                .emit('message:new', payload);
        }
    }
    emitMessageEdited(conversationId, message, conversation, senderId) {
        const payload = { conversationId, message };
        this.server
            .to(`conversation:${conversationId}`)
            .emit('message:edited', payload);
        if (conversation && senderId) {
            this.server
                .to(`user:${this.otherPartyId(conversation, senderId)}`)
                .emit('message:edited', payload);
        }
    }
    emitMessageDeleted(conversationId, message, conversation, senderId) {
        const payload = { conversationId, message };
        this.server
            .to(`conversation:${conversationId}`)
            .emit('message:deleted', payload);
        if (conversation && senderId) {
            this.server
                .to(`user:${this.otherPartyId(conversation, senderId)}`)
                .emit('message:deleted', payload);
        }
    }
    emitReadReceipt(conversationId, userId, readAt, unreadCount, conversation) {
        const payload = { conversationId, userId, readAt, unreadCount };
        this.server
            .to(`conversation:${conversationId}`)
            .emit('read:receipt', payload);
        if (conversation) {
            this.server
                .to(`user:${this.otherPartyId(conversation, userId)}`)
                .emit('read:receipt', payload);
        }
    }
    emitTyping(conversationId, userId, isTyping, conversation) {
        this.server.to(`conversation:${conversationId}`).emit('typing', {
            conversationId,
            userId,
            isTyping,
        });
        if (conversation) {
            this.server
                .to(`user:${this.otherPartyId(conversation, userId)}`)
                .emit('typing', { conversationId, userId, isTyping });
        }
    }
    extractToken(client) {
        const handshake = client.handshake;
        const authToken = handshake.auth?.token;
        if (typeof authToken === 'string' && authToken)
            return authToken;
        const queryToken = handshake.query?.token;
        if (typeof queryToken === 'string' && queryToken)
            return queryToken;
        const cookieHeader = handshake.headers?.cookie;
        if (cookieHeader) {
            const match = cookieHeader.match(/(?:^|;\s*)accessToken=([^;]+)/);
            if (match)
                return decodeURIComponent(match[1]);
        }
        return null;
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('conversation:join'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleJoinConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('conversation:leave'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleLeaveConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleTyping", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: true,
            credentials: true,
        },
        namespace: '/chat',
    }),
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => chat_service_1.ChatService))),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        chat_service_1.ChatService,
        nestjs_pino_1.Logger])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map