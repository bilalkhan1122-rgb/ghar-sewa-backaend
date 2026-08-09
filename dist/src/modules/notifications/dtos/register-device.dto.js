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
exports.RegisterDeviceDto = exports.DevicePlatform = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var DevicePlatform;
(function (DevicePlatform) {
    DevicePlatform["IOS"] = "ios";
    DevicePlatform["ANDROID"] = "android";
    DevicePlatform["WEB"] = "web";
})(DevicePlatform || (exports.DevicePlatform = DevicePlatform = {}));
class RegisterDeviceDto {
    deviceToken;
    platform;
    deviceName;
}
exports.RegisterDeviceDto = RegisterDeviceDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'FCM device token',
        example: 'fcm-token-abc123',
        minLength: 8,
        maxLength: 500,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(500),
    (0, class_validator_1.Matches)(/^[\w.:\-_]+$/, {
        message: 'Device token contains invalid characters',
    }),
    __metadata("design:type", String)
], RegisterDeviceDto.prototype, "deviceToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Device platform',
        enum: DevicePlatform,
        example: DevicePlatform.ANDROID,
    }),
    (0, class_validator_1.IsEnum)(DevicePlatform),
    __metadata("design:type", String)
], RegisterDeviceDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional device name / model for reference',
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], RegisterDeviceDto.prototype, "deviceName", void 0);
//# sourceMappingURL=register-device.dto.js.map