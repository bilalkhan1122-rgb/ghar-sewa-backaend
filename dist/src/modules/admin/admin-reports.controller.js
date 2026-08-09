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
exports.AdminReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("./admin.service");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("../../../generated/prisma/client");
const date_range_dto_1 = require("./dtos/date-range.dto");
let AdminReportsController = class AdminReportsController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    async users(dto) {
        return this.adminService.reportUsers(dto);
    }
    async providers(dto) {
        return this.adminService.reportProviders(dto);
    }
    async jobs(dto) {
        return this.adminService.reportJobs(dto);
    }
    async financial(dto) {
        return this.adminService.reportFinancial(dto);
    }
    async disputes(dto) {
        return this.adminService.reportDisputes(dto);
    }
};
exports.AdminReportsController = AdminReportsController;
__decorate([
    (0, common_1.Get)('/users'),
    (0, swagger_1.ApiOperation)({ summary: 'User report: totals, registrations, statuses' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_range_dto_1.DateRangeDto]),
    __metadata("design:returntype", Promise)
], AdminReportsController.prototype, "users", null);
__decorate([
    (0, common_1.Get)('/providers'),
    (0, swagger_1.ApiOperation)({
        summary: 'Provider report: verification stats, ratings, top providers',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_range_dto_1.DateRangeDto]),
    __metadata("design:returntype", Promise)
], AdminReportsController.prototype, "providers", null);
__decorate([
    (0, common_1.Get)('/jobs'),
    (0, swagger_1.ApiOperation)({ summary: 'Job report: created/completed/cancelled/expired' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_range_dto_1.DateRangeDto]),
    __metadata("design:returntype", Promise)
], AdminReportsController.prototype, "jobs", null);
__decorate([
    (0, common_1.Get)('/financial'),
    (0, swagger_1.ApiOperation)({
        summary: 'Financial report: revenue, commission, wallet balances',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_range_dto_1.DateRangeDto]),
    __metadata("design:returntype", Promise)
], AdminReportsController.prototype, "financial", null);
__decorate([
    (0, common_1.Get)('/disputes'),
    (0, swagger_1.ApiOperation)({ summary: 'Dispute report: totals, status, resolutions' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_range_dto_1.DateRangeDto]),
    __metadata("design:returntype", Promise)
], AdminReportsController.prototype, "disputes", null);
exports.AdminReportsController = AdminReportsController = __decorate([
    (0, swagger_1.ApiTags)('Admin Reports'),
    (0, common_1.Controller)('admin/reports'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminReportsController);
//# sourceMappingURL=admin-reports.controller.js.map