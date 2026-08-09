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
exports.CompleteProviderProfileDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CompleteProviderProfileDto {
    bio;
    hourlyRate;
    serviceLocation;
    serviceRadius;
    cnicNumber;
    categoryIds;
}
exports.CompleteProviderProfileDto = CompleteProviderProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Provider bio / description',
        example: 'Professional plumber with 10 years of experience',
        minLength: 20,
        maxLength: 1000,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(20),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CompleteProviderProfileDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hourly rate in PKR',
        example: 500,
        minimum: 50,
        maximum: 50000,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(50),
    (0, class_validator_1.Max)(50000),
    __metadata("design:type", Number)
], CompleteProviderProfileDto.prototype, "hourlyRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Service location / area',
        example: 'Gulberg, Lahore',
        minLength: 3,
        maxLength: 500,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CompleteProviderProfileDto.prototype, "serviceLocation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Service radius in kilometers',
        example: 10,
        minimum: 1,
        maximum: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CompleteProviderProfileDto.prototype, "serviceRadius", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'CNIC number (without dashes)',
        example: '1234567890123',
        minLength: 13,
        maxLength: 15,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(13),
    (0, class_validator_1.MaxLength)(15),
    __metadata("design:type", String)
], CompleteProviderProfileDto.prototype, "cnicNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of service category IDs',
        example: ['category-id-1', 'category-id-2'],
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(10),
    __metadata("design:type", Array)
], CompleteProviderProfileDto.prototype, "categoryIds", void 0);
//# sourceMappingURL=complete-provider-profile.dto.js.map