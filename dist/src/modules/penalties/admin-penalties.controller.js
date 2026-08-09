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
exports.AdminPenaltiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const penalties_service_1 = require("./penalties.service");
const admin_audit_service_1 = require("../../common/services/admin-audit.service");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const client_1 = require("../../../generated/prisma/client");
const penalty_query_dto_1 = require("./dtos/penalty-query.dto");
const review_appeal_dto_1 = require("./dtos/review-appeal.dto");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
let AdminPenaltiesController = class AdminPenaltiesController {
    penaltiesService;
    audit;
    constructor(penaltiesService, audit) {
        this.penaltiesService = penaltiesService;
        this.audit = audit;
    }
    async listAllPenalties(query) {
        return this.penaltiesService.adminListAllPenalties(query);
    }
    async getProviderPenalties(providerId, query) {
        return this.penaltiesService.adminGetProviderPenalties(providerId, query);
    }
    async listAppeals(query) {
        return this.penaltiesService.adminListAppeals(query);
    }
    async getAppeal(id) {
        return this.penaltiesService.adminGetAppeal(id);
    }
    async approveAppeal(adminId, id, dto) {
        const result = await this.penaltiesService.adminApproveAppeal(adminId, id, dto.note);
        await this.audit.record({
            adminId,
            action: 'APPEAL_APPROVED',
            entityType: 'APPEAL',
            entityId: id,
            newValues: { note: dto.note ?? null },
        });
        return result;
    }
    async rejectAppeal(adminId, id, dto) {
        const result = await this.penaltiesService.adminRejectAppeal(adminId, id, dto.note);
        await this.audit.record({
            adminId,
            action: 'APPEAL_REJECTED',
            entityType: 'APPEAL',
            entityId: id,
            newValues: { note: dto.note },
        });
        return result;
    }
};
exports.AdminPenaltiesController = AdminPenaltiesController;
__decorate([
    (0, common_1.Get)('/penalties'),
    (0, swagger_1.ApiOperation)({ summary: 'View all penalty records' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [penalty_query_dto_1.PenaltyQueryDto]),
    __metadata("design:returntype", Promise)
], AdminPenaltiesController.prototype, "listAllPenalties", null);
__decorate([
    (0, common_1.Get)('/penalties/providers/:providerId'),
    (0, swagger_1.ApiOperation)({ summary: 'View all penalty records for a provider' }),
    __param(0, (0, common_1.Param)('providerId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, penalty_query_dto_1.PenaltyQueryDto]),
    __metadata("design:returntype", Promise)
], AdminPenaltiesController.prototype, "getProviderPenalties", null);
__decorate([
    (0, common_1.Get)('/appeals'),
    (0, swagger_1.ApiOperation)({ summary: 'View all appeals (filter by status)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [penalty_query_dto_1.AppealQueryDto]),
    __metadata("design:returntype", Promise)
], AdminPenaltiesController.prototype, "listAppeals", null);
__decorate([
    (0, common_1.Get)('/appeals/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View a single appeal' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminPenaltiesController.prototype, "getAppeal", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('penalties.review'),
    (0, common_1.Post)('/appeals/:id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve an appeal (lifts suspension/ban)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, review_appeal_dto_1.ApproveAppealDto]),
    __metadata("design:returntype", Promise)
], AdminPenaltiesController.prototype, "approveAppeal", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('penalties.review'),
    (0, common_1.Post)('/appeals/:id/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject an appeal (note required)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, review_appeal_dto_1.RejectAppealDto]),
    __metadata("design:returntype", Promise)
], AdminPenaltiesController.prototype, "rejectAppeal", null);
exports.AdminPenaltiesController = AdminPenaltiesController = __decorate([
    (0, swagger_1.ApiTags)('Penalties (Admin)'),
    (0, common_1.Controller)('admin'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [penalties_service_1.PenaltiesService,
        admin_audit_service_1.AdminAuditService])
], AdminPenaltiesController);
//# sourceMappingURL=admin-penalties.controller.js.map