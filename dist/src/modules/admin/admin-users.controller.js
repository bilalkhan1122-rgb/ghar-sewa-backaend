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
exports.AdminUsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_users_service_1 = require("./admin-users.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const client_1 = require("../../../generated/prisma/client");
const admin_user_query_dto_1 = require("./dtos/admin-user-query.dto");
const action_reason_dto_1 = require("../../common/dtos/action-reason.dto");
let AdminUsersController = class AdminUsersController {
    adminUsersService;
    constructor(adminUsersService) {
        this.adminUsersService = adminUsersService;
    }
    async list(query) {
        return this.adminUsersService.listUsers(query);
    }
    async getDetail(id) {
        return this.adminUsersService.getUserDetail(id);
    }
    async suspend(adminId, id, dto) {
        return this.adminUsersService.suspendUser(adminId, id, dto.reason);
    }
    async unsuspend(adminId, id) {
        return this.adminUsersService.unsuspendUser(adminId, id);
    }
    async softDelete(adminId, id, dto) {
        return this.adminUsersService.softDeleteUser(adminId, id, dto.reason);
    }
    async restore(adminId, id) {
        return this.adminUsersService.restoreUser(adminId, id);
    }
};
exports.AdminUsersController = AdminUsersController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'List users with search/filter/pagination' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_user_query_dto_1.AdminUserQueryDto]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View full user details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "getDetail", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('users.suspend'),
    (0, common_1.Post)('/:id/suspend'),
    (0, swagger_1.ApiOperation)({ summary: 'Suspend a user (reason required)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, action_reason_dto_1.ActionReasonDto]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "suspend", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('users.suspend'),
    (0, common_1.Post)('/:id/unsuspend'),
    (0, swagger_1.ApiOperation)({ summary: 'Unsuspend a user' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "unsuspend", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('users.delete'),
    (0, common_1.Post)('/:id/delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a user (reason required)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, action_reason_dto_1.ActionReasonDto]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "softDelete", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('users.delete'),
    (0, common_1.Post)('/:id/restore'),
    (0, swagger_1.ApiOperation)({ summary: 'Restore a soft-deleted user' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "restore", null);
exports.AdminUsersController = AdminUsersController = __decorate([
    (0, swagger_1.ApiTags)('Admin Users'),
    (0, common_1.Controller)('admin/users'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [admin_users_service_1.AdminUsersService])
], AdminUsersController);
//# sourceMappingURL=admin-users.controller.js.map