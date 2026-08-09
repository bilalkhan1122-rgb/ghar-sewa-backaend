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
exports.WalletTransactionQueryDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const pagination_dto_1 = require("../../../common/dtos/pagination.dto");
const client_1 = require("../../../../generated/prisma/client");
class WalletTransactionQueryDto extends pagination_dto_1.PaginationDto {
    type;
    status;
    dateFrom;
    dateTo;
}
exports.WalletTransactionQueryDto = WalletTransactionQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.WalletTransactionType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.WalletTransactionType),
    __metadata("design:type", String)
], WalletTransactionQueryDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.WalletTransactionStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.WalletTransactionStatus),
    __metadata("design:type", String)
], WalletTransactionQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Start date (ISO)',
        example: '2026-01-01',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], WalletTransactionQueryDto.prototype, "dateFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'End date (ISO)', example: '2026-12-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], WalletTransactionQueryDto.prototype, "dateTo", void 0);
//# sourceMappingURL=wallet-transaction-query.dto.js.map