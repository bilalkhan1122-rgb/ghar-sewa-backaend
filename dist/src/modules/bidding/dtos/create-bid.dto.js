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
exports.CreateBidDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateBidDto {
    jobId;
    offeredPrice;
    message;
}
exports.CreateBidDto = CreateBidDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Job ID to bid on',
        example: 'uuid-here',
    }),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], CreateBidDto.prototype, "jobId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Offered price in PKR',
        example: 1200,
        minimum: 1,
        maximum: 9999999,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(9999999),
    __metadata("design:type", Number)
], CreateBidDto.prototype, "offeredPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional message to the customer',
        example: 'I can do this job. I have 5 years of experience.',
        maxLength: 500,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateBidDto.prototype, "message", void 0);
//# sourceMappingURL=create-bid.dto.js.map