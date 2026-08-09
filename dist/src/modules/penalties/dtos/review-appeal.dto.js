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
exports.RejectAppealDto = exports.ApproveAppealDto = void 0;
const class_validator_1 = require("class-validator");
class ApproveAppealDto {
    note;
}
exports.ApproveAppealDto = ApproveAppealDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], ApproveAppealDto.prototype, "note", void 0);
class RejectAppealDto {
    note;
}
exports.RejectAppealDto = RejectAppealDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Rejection note is required' }),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], RejectAppealDto.prototype, "note", void 0);
//# sourceMappingURL=review-appeal.dto.js.map