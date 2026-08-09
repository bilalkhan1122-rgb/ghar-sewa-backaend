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
exports.DirectBookingDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class DirectBookingDto {
    providerId;
    categoryId;
    title;
    description;
    address;
    latitude;
    longitude;
    totalAmount;
}
exports.DirectBookingDto = DirectBookingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Provider ID to book directly',
        example: 'uuid-here',
    }),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], DirectBookingDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Service category ID',
        example: 'uuid-here',
    }),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], DirectBookingDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Job title',
        example: 'Fix leaking kitchen faucet',
        minLength: 5,
        maxLength: 200,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], DirectBookingDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed job description',
        example: 'The kitchen sink faucet has been leaking for 2 days.',
        minLength: 20,
        maxLength: 5000,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(20),
    (0, class_validator_1.MaxLength)(5000),
    __metadata("design:type", String)
], DirectBookingDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Job address',
        example: 'House #12, Street 5, Gulberg, Lahore',
        minLength: 5,
        maxLength: 500,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], DirectBookingDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Latitude coordinate',
        example: 31.5204,
        minimum: -90,
        maximum: 90,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-90),
    (0, class_validator_1.Max)(90),
    __metadata("design:type", Number)
], DirectBookingDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Longitude coordinate',
        example: 74.3587,
        minimum: -180,
        maximum: 180,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-180),
    (0, class_validator_1.Max)(180),
    __metadata("design:type", Number)
], DirectBookingDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Agreed price in PKR',
        example: 1500,
        minimum: 1,
        maximum: 9999999,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(9999999),
    __metadata("design:type", Number)
], DirectBookingDto.prototype, "totalAmount", void 0);
//# sourceMappingURL=direct-booking.dto.js.map