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
exports.RejectWithdrawalDto = exports.ReviewWithdrawalDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ReviewWithdrawalDto {
    note;
}
exports.ReviewWithdrawalDto = ReviewWithdrawalDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Admin note / rejection reason',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], ReviewWithdrawalDto.prototype, "note", void 0);
class RejectWithdrawalDto {
    reason;
}
exports.RejectWithdrawalDto = RejectWithdrawalDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Rejection reason (mandatory)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Rejection reason is required' }),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], RejectWithdrawalDto.prototype, "reason", void 0);
//# sourceMappingURL=review-withdrawal.dto.js.map