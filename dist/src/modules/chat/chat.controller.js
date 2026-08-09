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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
const chat_service_1 = require("./chat.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const create_conversation_dto_1 = require("./dtos/create-conversation.dto");
const send_message_dto_1 = require("./dtos/send-message.dto");
const update_message_dto_1 = require("./dtos/update-message.dto");
const mark_read_dto_1 = require("./dtos/mark-read.dto");
const conversation_query_dto_1 = require("./dtos/conversation-query.dto");
const message_query_dto_1 = require("./dtos/message-query.dto");
let ChatController = class ChatController {
    chatService;
    constructor(chatService) {
        this.chatService = chatService;
    }
    async getOrCreateConversation(userId, dto) {
        return this.chatService.getOrCreateConversation(userId, dto);
    }
    async listConversations(userId, query) {
        return this.chatService.listConversations(userId, query);
    }
    async deleteConversation(userId, id) {
        return this.chatService.deleteConversation(userId, id);
    }
    async markAsRead(userId, id, dto) {
        return this.chatService.markAsRead(userId, id, dto);
    }
    async typingIndicator(userId, id, isTyping) {
        return this.chatService.sendTypingIndicator(userId, id, !!isTyping);
    }
    async getHistory(userId, id, query) {
        return this.chatService.getConversationHistory(userId, id, query);
    }
    async sendMessage(userId, id, dto) {
        return this.chatService.sendMessage(userId, id, dto);
    }
    async sendImageMessage(userId, id, file, caption) {
        return this.chatService.sendImageMessage(userId, id, file, caption);
    }
    async editMessage(userId, id, dto) {
        return this.chatService.editMessage(userId, id, dto);
    }
    async deleteMessage(userId, id) {
        return this.chatService.deleteMessage(userId, id);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)('/conversations'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create or retrieve a conversation for a job (customer↔provider who bid or was booked)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_conversation_dto_1.CreateConversationDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getOrCreateConversation", null);
__decorate([
    (0, common_1.Get)('/conversations'),
    (0, swagger_1.ApiOperation)({ summary: 'List my conversations with unread counts' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, conversation_query_dto_1.ConversationQueryDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "listConversations", null);
__decorate([
    (0, common_1.Delete)('/conversations/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove conversation from my list (soft delete — history retained for disputes)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "deleteConversation", null);
__decorate([
    (0, common_1.Post)('/conversations/:id/read'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark messages as read (read receipt)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, mark_read_dto_1.MarkReadDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Post)('/conversations/:id/typing'),
    (0, swagger_1.ApiOperation)({ summary: 'Broadcast typing indicator to the other party' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)('isTyping')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "typingIndicator", null);
__decorate([
    (0, common_1.Get)('/conversations/:id/messages'),
    (0, swagger_1.ApiOperation)({
        summary: 'Fetch conversation history (chronological, paginated)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, message_query_dto_1.MessageQueryDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Post)('/conversations/:id/messages'),
    (0, swagger_1.ApiOperation)({
        summary: 'Send a message (TEXT, IMAGE with attachmentUrl, or LOCATION)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, send_message_dto_1.SendMessageDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)('/conversations/:id/messages/image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
                caption: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Upload and send an image message' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: /(jpg|jpeg|png|webp|gif)$/ }),
        ],
    }))),
    __param(3, (0, common_1.Body)('caption')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendImageMessage", null);
__decorate([
    (0, common_1.Patch)('/messages/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Edit your own message (within edit window)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_message_dto_1.UpdateMessageDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "editMessage", null);
__decorate([
    (0, common_1.Delete)('/messages/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Soft delete your own message (within edit window)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "deleteMessage", null);
exports.ChatController = ChatController = __decorate([
    (0, swagger_1.ApiTags)('Chat'),
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map