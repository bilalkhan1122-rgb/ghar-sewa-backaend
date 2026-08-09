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
exports.AdminProvidersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_users_service_1 = require("./admin-users.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const client_1 = require("../../../generated/prisma/client");
const admin_provider_query_dto_1 = require("./dtos/admin-provider-query.dto");
const action_reason_dto_1 = require("../../common/dtos/action-reason.dto");
let AdminProvidersController = class AdminProvidersController {
    adminUsersService;
    constructor(adminUsersService) {
        this.adminUsersService = adminUsersService;
    }
    async list(query) {
        return this.adminUsersService.listProviders(query);
    }
    async getDetail(id) {
        return this.adminUsersService.getProviderDetail(id);
    }
    async getDocuments(id) {
        return this.adminUsersService.getProviderDocuments(id);
    }
    async getPerformance(id) {
        return this.adminUsersService.getProviderPerformance(id);
    }
    async suspend(adminId, id, dto) {
        return this.adminUsersService.suspendProvider(adminId, id, dto.reason);
    }
    async unsuspend(adminId, id) {
        return this.adminUsersService.unsuspendProvider(adminId, id);
    }
};
exports.AdminProvidersController = AdminProvidersController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'List providers with search/filter/pagination' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_provider_query_dto_1.AdminProviderQueryDto]),
    __metadata("design:returntype", Promise)
], AdminProvidersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View provider profile, documents and stats' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminProvidersController.prototype, "getDetail", null);
__decorate([
    (0, common_1.Get)('/:id/documents'),
    (0, swagger_1.ApiOperation)({ summary: 'View provider documents + verification history' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminProvidersController.prototype, "getDocuments", null);
__decorate([
    (0, common_1.Get)('/:id/performance'),
    (0, swagger_1.ApiOperation)({
        summary: 'Provider performance: rating, earnings, cancellations, penalties',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminProvidersController.prototype, "getPerformance", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('providers.suspend'),
    (0, common_1.Post)('/:id/suspend'),
    (0, swagger_1.ApiOperation)({ summary: 'Suspend a provider (reason required)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, action_reason_dto_1.ActionReasonDto]),
    __metadata("design:returntype", Promise)
], AdminProvidersController.prototype, "suspend", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('providers.suspend'),
    (0, common_1.Post)('/:id/unsuspend'),
    (0, swagger_1.ApiOperation)({ summary: 'Unsuspend a provider' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminProvidersController.prototype, "unsuspend", null);
exports.AdminProvidersController = AdminProvidersController = __decorate([
    (0, swagger_1.ApiTags)('Admin Providers'),
    (0, common_1.Controller)('admin/providers'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [admin_users_service_1.AdminUsersService])
], AdminProvidersController);
//# sourceMappingURL=admin-providers.controller.js.map