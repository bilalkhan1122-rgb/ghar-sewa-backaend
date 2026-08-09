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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageDto = exports.ChatMessageType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ChatMessageType;
(function (ChatMessageType) {
    ChatMessageType["TEXT"] = "TEXT";
    ChatMessageType["IMAGE"] = "IMAGE";
    ChatMessageType["LOCATION"] = "LOCATION";
})(ChatMessageType || (exports.ChatMessageType = ChatMessageType = {}));
class SendMessageDto {
    type = ChatMessageType.TEXT;
    content;
    attachmentUrl;
    latitude;
    longitude;
}
exports.SendMessageDto = SendMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Message type',
        enum: ChatMessageType,
        default: ChatMessageType.TEXT,
    }),
    (0, class_validator_1.IsEnum)(ChatMessageType),
    __metadata("design:type", String)
], SendMessageDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Message content (required for TEXT)',
        example: 'Assalam-o-Alaikum, when can you start?',
        maxLength: 5000,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(5000),
    __metadata("design:type", String)
], SendMessageDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Attachment URL (required for IMAGE, from the upload endpoint)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({ require_protocol: true }),
    __metadata("design:type", String)
], SendMessageDto.prototype, "attachmentUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Latitude (required for LOCATION)',
        example: 31.5204,
        minimum: -90,
        maximum: 90,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-90),
    (0, class_validator_1.Max)(90),
    __metadata("design:type", Number)
], SendMessageDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Longitude (required for LOCATION)',
        example: 74.3587,
        minimum: -180,
        maximum: 180,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-180),
    (0, class_validator_1.Max)(180),
    __metadata("design:type", Number)
], SendMessageDto.prototype, "longitude", void 0);
//# sourceMappingURL=send-message.dto.js.map