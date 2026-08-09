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
exports.CategoryQueryDto = exports.CategorySortField = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const pagination_dto_1 = require("../../../common/dtos/pagination.dto");
const class_transformer_1 = require("class-transformer");
var CategorySortField;
(function (CategorySortField) {
    CategorySortField["NAME"] = "name";
    CategorySortField["DISPLAY_ORDER"] = "displayOrder";
    CategorySortField["CREATED_AT"] = "createdAt";
})(CategorySortField || (exports.CategorySortField = CategorySortField = {}));
class CategoryQueryDto extends pagination_dto_1.PaginationDto {
    search;
    sortBy = CategorySortField.DISPLAY_ORDER;
    sortOrder = 'asc';
    isActive;
}
exports.CategoryQueryDto = CategoryQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search term for category name',
        example: 'plumber',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CategoryQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort field',
        enum: CategorySortField,
        default: CategorySortField.DISPLAY_ORDER,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(CategorySortField),
    __metadata("design:type", String)
], CategoryQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort order',
        enum: ['asc', 'desc'],
        default: 'asc',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CategoryQueryDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by active status',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CategoryQueryDto.prototype, "isActive", void 0);
//# sourceMappingURL=category-query.dto.js.map