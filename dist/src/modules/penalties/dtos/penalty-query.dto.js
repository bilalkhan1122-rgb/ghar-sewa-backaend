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
exports.AppealQueryDto = exports.PenaltyQueryDto = void 0;
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../common/dtos/pagination.dto");
const client_1 = require("../../../../generated/prisma/client");
class PenaltyQueryDto extends pagination_dto_1.PaginationDto {
    type;
}
exports.PenaltyQueryDto = PenaltyQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.PenaltyType, { message: 'type must be a valid penalty type' }),
    __metadata("design:type", String)
], PenaltyQueryDto.prototype, "type", void 0);
class AppealQueryDto extends pagination_dto_1.PaginationDto {
    status;
}
exports.AppealQueryDto = AppealQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.AppealStatus, { message: 'status must be a valid appeal status' }),
    __metadata("design:type", String)
], AppealQueryDto.prototype, "status", void 0);
//# sourceMappingURL=penalty-query.dto.js.map