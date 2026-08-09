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
exports.SendBroadcastNotificationDto = exports.SendRoleNotificationDto = exports.SendUserNotificationDto = exports.NotificationPayloadDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("../../../../generated/prisma/client");
class NotificationPayloadDto {
    type;
    title;
    message;
    scheduledAt;
}
exports.NotificationPayloadDto = NotificationPayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.NotificationType }),
    (0, class_validator_1.IsEnum)(client_1.NotificationType),
    __metadata("design:type", String)
], NotificationPayloadDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Platform announcement', maxLength: 200 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], NotificationPayloadDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dear user, ...', maxLength: 2000 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], NotificationPayloadDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Future-ready scheduled delivery time (not yet supported)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], NotificationPayloadDto.prototype, "scheduledAt", void 0);
class SendUserNotificationDto extends NotificationPayloadDto {
    userId;
}
exports.SendUserNotificationDto = SendUserNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Recipient user id' }),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], SendUserNotificationDto.prototype, "userId", void 0);
class SendRoleNotificationDto extends NotificationPayloadDto {
    role;
}
exports.SendRoleNotificationDto = SendRoleNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.UserRole, description: 'Target role' }),
    (0, class_validator_1.IsEnum)(client_1.UserRole),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendRoleNotificationDto.prototype, "role", void 0);
class SendBroadcastNotificationDto extends NotificationPayloadDto {
}
exports.SendBroadcastNotificationDto = SendBroadcastNotificationDto;
//# sourceMappingURL=send-notification.dto.js.map