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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCategoriesController = exports.ProviderCategoriesController = exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const categories_service_1 = require("./categories.service");
const create_category_dto_1 = require("./dtos/create-category.dto");
const update_category_dto_1 = require("./dtos/update-category.dto");
const category_query_dto_1 = require("./dtos/category-query.dto");
const reorder_categories_dto_1 = require("./dtos/reorder-categories.dto");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const client_1 = require("../../../generated/prisma/client");
const pagination_dto_1 = require("../../common/dtos/pagination.dto");
let CategoriesController = class CategoriesController {
    categoriesService;
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async listActiveCategories(query) {
        return this.categoriesService.listActiveCategories(query);
    }
    async searchCategories(q) {
        return this.categoriesService.searchCategories(q);
    }
    async getCategoryBySlug(slug) {
        return this.categoriesService.getCategoryBySlug(slug);
    }
    async getCategoryProviders(id, pagination) {
        const { page = 1, limit = 10 } = pagination;
        return this.categoriesService.getCategoryProviders(id, page, limit);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'List all active categories' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_query_dto_1.CategoryQueryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "listActiveCategories", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search categories by name' }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "searchCategories", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single category by slug' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategoryBySlug", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/:id/providers'),
    (0, swagger_1.ApiOperation)({ summary: 'Get approved providers for a category' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategoryProviders", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, swagger_1.ApiTags)('Categories'),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
let ProviderCategoriesController = class ProviderCategoriesController {
    categoriesService;
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async getAvailableCategories() {
        return this.categoriesService.getAvailableCategories();
    }
    async getMyCategories(userId) {
        return this.categoriesService.getProviderSelectedCategories(userId);
    }
    async selectCategories(userId, body) {
        return this.categoriesService.selectProviderCategories(userId, body.categoryIds);
    }
    async updateCategories(userId, body) {
        return this.categoriesService.selectProviderCategories(userId, body.categoryIds);
    }
};
exports.ProviderCategoriesController = ProviderCategoriesController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'View all available (active) categories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProviderCategoriesController.prototype, "getAvailableCategories", null);
__decorate([
    (0, common_1.Get)('/my'),
    (0, swagger_1.ApiOperation)({ summary: 'Get categories selected by the provider' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderCategoriesController.prototype, "getMyCategories", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Select multiple categories for the provider' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProviderCategoriesController.prototype, "selectCategories", null);
__decorate([
    (0, common_1.Patch)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Update selected categories for the provider' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProviderCategoriesController.prototype, "updateCategories", null);
exports.ProviderCategoriesController = ProviderCategoriesController = __decorate([
    (0, swagger_1.ApiTags)('Provider Categories'),
    (0, common_1.Controller)('provider/categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], ProviderCategoriesController);
let AdminCategoriesController = class AdminCategoriesController {
    categoriesService;
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async listAllCategories(query) {
        return this.categoriesService.adminListCategories(query);
    }
    async createCategory(dto) {
        return this.categoriesService.createCategory(dto);
    }
    async updateCategory(id, dto) {
        return this.categoriesService.updateCategory(id, dto);
    }
    async deleteCategory(id) {
        return this.categoriesService.deleteCategory(id);
    }
    async toggleCategoryStatus(id) {
        return this.categoriesService.toggleCategoryStatus(id);
    }
    async reorderCategories(dto) {
        return this.categoriesService.reorderCategories(dto);
    }
    async getCategoryStats(id) {
        return this.categoriesService.getCategoryStats(id);
    }
};
exports.AdminCategoriesController = AdminCategoriesController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'List all categories (admin)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_query_dto_1.CategoryQueryDto]),
    __metadata("design:returntype", Promise)
], AdminCategoriesController.prototype, "listAllCategories", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new category' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], AdminCategoriesController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a category' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], AdminCategoriesController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a category' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCategoriesController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Patch)('/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Activate or deactivate a category' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCategoriesController.prototype, "toggleCategoryStatus", null);
__decorate([
    (0, common_1.Post)('/reorder'),
    (0, swagger_1.ApiOperation)({ summary: 'Reorder categories' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reorder_categories_dto_1.ReorderCategoriesDto]),
    __metadata("design:returntype", Promise)
], AdminCategoriesController.prototype, "reorderCategories", null);
__decorate([
    (0, common_1.Get)('/:id/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get category statistics' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCategoriesController.prototype, "getCategoryStats", null);
exports.AdminCategoriesController = AdminCategoriesController = __decorate([
    (0, swagger_1.ApiTags)('Admin Categories'),
    (0, common_1.Controller)('admin/categories'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], AdminCategoriesController);
//# sourceMappingURL=categories.controller.js.map