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
exports.UpdateProviderProfileDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class UpdateProviderProfileDto {
    bio;
    hourlyRate;
    serviceLocation;
    serviceRadius;
    categoryIds;
}
exports.UpdateProviderProfileDto = UpdateProviderProfileDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Provider bio / description',
        example: 'Professional plumber with 10 years of experience',
        minLength: 20,
        maxLength: 1000,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(20),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], UpdateProviderProfileDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Hourly rate in PKR',
        example: 500,
        minimum: 50,
        maximum: 50000,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(50),
    (0, class_validator_1.Max)(50000),
    __metadata("design:type", Number)
], UpdateProviderProfileDto.prototype, "hourlyRate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Service location / area',
        example: 'Gulberg, Lahore',
        minLength: 3,
        maxLength: 500,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateProviderProfileDto.prototype, "serviceLocation", void 0);
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
], UpdateProviderProfileDto.prototype, "serviceRadius", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Array of service category IDs',
        example: ['category-id-1', 'category-id-2'],
        type: [String],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(10),
    __metadata("design:type", Array)
], UpdateProviderProfileDto.prototype, "categoryIds", void 0);
//# sourceMappingURL=update-provider-profile.dto.js.map