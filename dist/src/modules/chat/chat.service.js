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
exports.ChatService = exports.MESSAGE_EDIT_WINDOW_MINUTES = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const file_upload_service_1 = require("../../common/services/file-upload.service");
const chat_gateway_1 = require("./chat.gateway");
const send_message_dto_1 = require("./dtos/send-message.dto");
const conversation_query_dto_1 = require("./dtos/conversation-query.dto");
const nestjs_pino_1 = require("nestjs-pino");
const client_1 = require("../../../generated/prisma/client");
exports.MESSAGE_EDIT_WINDOW_MINUTES = 5;
let ChatService = class ChatService {
    prisma;
    fileUpload;
    gateway;
    logger;
    constructor(prisma, fileUpload, gateway, logger) {
        this.prisma = prisma;
        this.fileUpload = fileUpload;
        this.gateway = gateway;
        this.logger = logger;
    }
    async getOrCreateConversation(userId, dto) {
        const job = await this.prisma.job.findUnique({
            where: { id: dto.jobId },
            select: { id: true, customerId: true, status: true },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (dto.participantId === userId) {
            throw new common_1.BadRequestException('You cannot start a chat with yourself');
        }
        let customerId;
        let providerId;
        if (job.customerId === userId) {
            customerId = userId;
            providerId = dto.participantId;
        }
        else if (job.customerId === dto.participantId) {
            providerId = userId;
            customerId = dto.participantId;
        }
        else {
            throw new common_1.ForbiddenException('You are not part of this job and cannot start this conversation');
        }
        const providerUser = await this.prisma.user.findUnique({
            where: { id: providerId },
            select: { id: true, role: true },
        });
        if (!providerUser || providerUser.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.BadRequestException('Conversations can only be started with a provider involved in the job');
        }
        const [bid, booking] = await Promise.all([
            this.prisma.bid.findFirst({
                where: { jobId: job.id, providerId },
                select: { id: true, status: true },
            }),
            this.prisma.booking.findFirst({
                where: { jobId: job.id, providerId },
                select: { id: true, status: true },
            }),
        ]);
        if (!bid && !booking) {
            throw new common_1.ForbiddenException('You can only chat with a provider who submitted a bid or was booked for this job');
        }
        const existing = await this.prisma.conversation.findUnique({
            where: {
                jobId_customerId_providerId: {
                    jobId: job.id,
                    customerId,
                    providerId,
                },
            },
            include: this.conversationIncludes(),
        });
        if (existing) {
            return existing;
        }
        const activeBooking = booking && booking.status !== client_1.BookingStatus.CANCELLED ? booking : null;
        const conversation = await this.prisma.conversation.create({
            data: {
                jobId: job.id,
                bookingId: activeBooking?.id ?? dto.bookingId ?? null,
                customerId,
                providerId,
                lastActivity: new Date(),
            },
            include: this.conversationIncludes(),
        });
        this.logger.log({
            message: 'Conversation created',
            conversationId: conversation.id,
            jobId: job.id,
            customerId,
            providerId,
        });
        return conversation;
    }
    async sendMessage(userId, conversationId, dto) {
        const conversation = await this.getConversationForUser(conversationId, userId);
        this.validateMessagePayload(dto);
        const message = await this.prisma.message.create({
            data: {
                conversationId,
                senderId: userId,
                type: dto.type,
                content: dto.content,
                attachmentUrl: dto.attachmentUrl,
                latitude: dto.latitude,
                longitude: dto.longitude,
                deliveredAt: new Date(),
            },
            include: this.messageIncludes(),
        });
        const lastMessage = this.messagePreview(message);
        await this.prisma.conversation.update({
            where: { id: conversationId },
            data: {
                lastMessage,
                lastMessageAt: new Date(),
                lastActivity: new Date(),
            },
        });
        this.gateway.emitNewMessage(conversationId, message, conversation, userId);
        this.logger.log({
            message: 'Message sent',
            conversationId,
            senderId: userId,
            type: dto.type,
        });
        return message;
    }
    async sendImageMessage(userId, conversationId, file, caption) {
        const conversation = await this.getConversationForUser(conversationId, userId);
        const attachmentUrl = await this.fileUpload.uploadChatImage(file);
        const message = await this.prisma.message.create({
            data: {
                conversationId,
                senderId: userId,
                type: client_1.MessageType.IMAGE,
                content: caption,
                attachmentUrl,
                deliveredAt: new Date(),
            },
            include: this.messageIncludes(),
        });
        const lastMessage = this.messagePreview(message);
        await this.prisma.conversation.update({
            where: { id: conversationId },
            data: {
                lastMessage,
                lastMessageAt: new Date(),
                lastActivity: new Date(),
            },
        });
        this.gateway.emitNewMessage(conversationId, message, conversation, userId);
        return message;
    }
    async editMessage(userId, messageId, dto) {
        const message = await this.getOwnMessage(userId, messageId);
        const editDeadline = new Date(message.createdAt.getTime() + exports.MESSAGE_EDIT_WINDOW_MINUTES * 60 * 1000);
        if (new Date() > editDeadline) {
            throw new common_1.ForbiddenException(`Messages can only be edited within ${exports.MESSAGE_EDIT_WINDOW_MINUTES} minutes of sending`);
        }
        const updated = await this.prisma.message.update({
            where: { id: messageId },
            data: {
                ...(dto.content !== undefined && { content: dto.content }),
                ...(dto.attachmentUrl !== undefined && {
                    attachmentUrl: dto.attachmentUrl,
                }),
                editedAt: new Date(),
            },
            include: this.messageIncludes(),
        });
        await this.prisma.conversation.update({
            where: { id: message.conversationId },
            data: { lastMessage: this.messagePreview(updated) },
        });
        const conversation = await this.getConversationForUser(message.conversationId, userId);
        this.gateway.emitMessageEdited(message.conversationId, updated, conversation, userId);
        return updated;
    }
    async deleteMessage(userId, messageId) {
        const message = await this.getOwnMessage(userId, messageId);
        const editDeadline = new Date(message.createdAt.getTime() + exports.MESSAGE_EDIT_WINDOW_MINUTES * 60 * 1000);
        if (new Date() > editDeadline) {
            throw new common_1.ForbiddenException(`Messages can only be deleted within ${exports.MESSAGE_EDIT_WINDOW_MINUTES} minutes of sending`);
        }
        const deleted = await this.prisma.message.update({
            where: { id: messageId },
            data: { deletedAt: new Date() },
            include: this.messageIncludes(),
        });
        const latest = await this.prisma.message.findFirst({
            where: {
                conversationId: message.conversationId,
                deletedAt: null,
            },
            orderBy: { createdAt: 'desc' },
        });
        await this.prisma.conversation.update({
            where: { id: message.conversationId },
            data: {
                lastMessage: latest ? this.messagePreview(latest) : null,
                lastMessageAt: latest?.createdAt ?? null,
            },
        });
        const conversation = await this.getConversationForUser(message.conversationId, userId);
        this.gateway.emitMessageDeleted(message.conversationId, deleted, conversation, userId);
        return { message: 'Message deleted successfully', id: messageId };
    }
    async getConversationHistory(userId, conversationId, query) {
        const { page = 1, limit = 20, before } = query;
        const skip = (page - 1) * limit;
        await this.getConversationForUser(conversationId, userId);
        const where = {
            conversationId,
            deletedAt: null,
            ...(before ? { createdAt: { lt: new Date(before) } } : {}),
        };
        const [messages, total] = await Promise.all([
            this.prisma.message.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: this.messageIncludes(),
            }),
            this.prisma.message.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: messages.reverse(),
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNext: page < totalPages,
                hasPrevious: page > 1,
            },
        };
    }
    async markAsRead(userId, conversationId, dto) {
        const conversation = await this.getConversationForUser(conversationId, userId);
        const readAt = new Date();
        if (dto.messageIds && dto.messageIds.length > 0) {
            await this.prisma.message.updateMany({
                where: {
                    id: { in: dto.messageIds },
                    conversationId,
                    senderId: { not: userId },
                    readAt: null,
                    deletedAt: null,
                },
                data: { readAt },
            });
        }
        else {
            await this.prisma.message.updateMany({
                where: {
                    conversationId,
                    senderId: { not: userId },
                    readAt: null,
                    deletedAt: null,
                },
                data: { readAt },
            });
        }
        const unreadCount = await this.unreadCount(conversationId, userId);
        this.gateway.emitReadReceipt(conversationId, userId, readAt, unreadCount, conversation);
        return { conversationId, readAt, unreadCount };
    }
    async listConversations(userId, query) {
        const { page = 1, limit = 10, jobId, sortBy = conversation_query_dto_1.ConversationSortField.LAST_ACTIVITY, sortOrder = 'desc', } = query;
        const skip = (page - 1) * limit;
        const where = {
            OR: [
                { customerId: userId, customerDeletedAt: null },
                { providerId: userId, providerDeletedAt: null },
            ],
            ...(jobId ? { jobId } : {}),
        };
        const orderByField = sortBy === conversation_query_dto_1.ConversationSortField.CREATED_AT
            ? 'createdAt'
            : 'lastActivity';
        const [conversations, total] = await Promise.all([
            this.prisma.conversation.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [orderByField]: sortOrder },
                include: this.conversationIncludes(),
            }),
            this.prisma.conversation.count({ where }),
        ]);
        const withUnread = await Promise.all(conversations.map(async (c) => ({
            ...c,
            unreadCount: await this.unreadCount(c.id, userId),
        })));
        const totalPages = Math.ceil(total / limit);
        return {
            data: withUnread,
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNext: page < totalPages,
                hasPrevious: page > 1,
            },
        };
    }
    async deleteConversation(userId, conversationId) {
        const conversation = await this.getConversationForUser(conversationId, userId);
        const isCustomer = conversation.customerId === userId;
        const now = new Date();
        await this.prisma.conversation.update({
            where: { id: conversationId },
            data: isCustomer
                ? { customerDeletedAt: now }
                : { providerDeletedAt: now },
        });
        return {
            message: 'Conversation removed from your list. Chat history is retained for dispute resolution.',
        };
    }
    async sendTypingIndicator(userId, conversationId, isTyping) {
        const conversation = await this.getConversationForUser(conversationId, userId);
        this.gateway.emitTyping(conversationId, userId, isTyping, conversation);
        return { conversationId, isTyping };
    }
    validateMessagePayload(dto) {
        switch (dto.type) {
            case send_message_dto_1.ChatMessageType.TEXT:
                if (!dto.content || !dto.content.trim()) {
                    throw new common_1.BadRequestException('Content is required for text messages');
                }
                break;
            case send_message_dto_1.ChatMessageType.IMAGE:
                if (!dto.attachmentUrl) {
                    throw new common_1.BadRequestException('Attachment URL is required for image messages');
                }
                break;
            case send_message_dto_1.ChatMessageType.LOCATION:
                if (dto.latitude == null || dto.longitude == null) {
                    throw new common_1.BadRequestException('Latitude and longitude are required for location messages');
                }
                break;
        }
    }
    async getConversationForUser(conversationId, userId) {
        const conversation = await this.prisma.conversation.findUnique({
            where: { id: conversationId },
        });
        if (!conversation) {
            throw new common_1.NotFoundException('Conversation not found');
        }
        const isCustomer = conversation.customerId === userId;
        const isProvider = conversation.providerId === userId;
        if (!isCustomer && !isProvider) {
            throw new common_1.ForbiddenException('You are not part of this conversation');
        }
        if (isCustomer && conversation.customerDeletedAt) {
            throw new common_1.NotFoundException('Conversation not found');
        }
        if (isProvider && conversation.providerDeletedAt) {
            throw new common_1.NotFoundException('Conversation not found');
        }
        return conversation;
    }
    async getOwnMessage(userId, messageId) {
        const message = await this.prisma.message.findUnique({
            where: { id: messageId },
        });
        if (!message || message.deletedAt) {
            throw new common_1.NotFoundException('Message not found');
        }
        if (message.senderId !== userId) {
            throw new common_1.ForbiddenException('You can only manage your own messages');
        }
        return message;
    }
    async unreadCount(conversationId, userId) {
        return this.prisma.message.count({
            where: {
                conversationId,
                senderId: { not: userId },
                readAt: null,
                deletedAt: null,
            },
        });
    }
    messagePreview(message) {
        if (message.content)
            return message.content;
        switch (message.type) {
            case client_1.MessageType.IMAGE:
                return '📷 Image';
            case client_1.MessageType.LOCATION:
                return '📍 Location';
            default:
                return '';
        }
    }
    messageIncludes() {
        return {
            sender: {
                select: { id: true, fullName: true, profilePhoto: true, role: true },
            },
        };
    }
    conversationIncludes() {
        return {
            job: {
                select: {
                    id: true,
                    title: true,
                    status: true,
                    category: { select: { id: true, name: true, icon: true } },
                },
            },
            customer: {
                select: { id: true, fullName: true, profilePhoto: true },
            },
            provider: {
                select: { id: true, fullName: true, profilePhoto: true },
            },
        };
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => chat_gateway_1.ChatGateway))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        file_upload_service_1.FileUploadService,
        chat_gateway_1.ChatGateway,
        nestjs_pino_1.Logger])
], ChatService);
//# sourceMappingURL=chat.service.js.map