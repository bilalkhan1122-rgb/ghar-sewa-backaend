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
exports.AdminSearchController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("./admin.service");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("../../../generated/prisma/client");
const admin_search_query_dto_1 = require("./dtos/admin-search-query.dto");
let AdminSearchController = class AdminSearchController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    async search(dto) {
        return this.adminService.globalSearch(dto);
    }
};
exports.AdminSearchController = AdminSearchController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({
        summary: 'Global search across users, providers, jobs, bookings, disputes, withdrawals and wallet transactions',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_search_query_dto_1.AdminSearchQueryDto]),
    __metadata("design:returntype", Promise)
], AdminSearchController.prototype, "search", null);
exports.AdminSearchController = AdminSearchController = __decorate([
    (0, swagger_1.ApiTags)('Admin Search'),
    (0, common_1.Controller)('admin/search'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminSearchController);
//# sourceMappingURL=admin-search.controller.js.map