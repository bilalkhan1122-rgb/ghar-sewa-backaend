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
exports.AdminDisputesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const disputes_service_1 = require("./disputes.service");
const admin_audit_service_1 = require("../../common/services/admin-audit.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const client_1 = require("../../../generated/prisma/client");
const dispute_query_dto_1 = require("./dtos/dispute-query.dto");
const resolve_dispute_dto_1 = require("./dtos/resolve-dispute.dto");
const update_dispute_status_dto_1 = require("./dtos/update-dispute-status.dto");
const reject_dispute_dto_1 = require("./dtos/reject-dispute.dto");
let AdminDisputesController = class AdminDisputesController {
    disputesService;
    audit;
    constructor(disputesService, audit) {
        this.disputesService = disputesService;
        this.audit = audit;
    }
    async list(query) {
        return this.disputesService.adminListDisputes(query);
    }
    async get(id) {
        return this.disputesService.adminGetDispute(id);
    }
    async getEvidence(id) {
        return this.disputesService.adminListEvidence(id);
    }
    async getTimeline(id) {
        return this.disputesService.adminGetTimeline(id);
    }
    async getChat(id, query) {
        const { page = 1, limit = 20 } = query;
        return this.disputesService.adminGetChatHistory(id, page, limit);
    }
    async updateStatus(adminId, id, dto) {
        const result = await this.disputesService.adminUpdateStatus(adminId, id, dto);
        await this.audit.record({
            adminId,
            action: 'DISPUTE_STATUS_UPDATED',
            entityType: 'DISPUTE',
            entityId: id,
            newValues: { status: dto.status },
        });
        return result;
    }
    async resolve(adminId, id, dto) {
        const result = await this.disputesService.adminResolve(adminId, id, dto);
        await this.audit.record({
            adminId,
            action: 'DISPUTE_RESOLVED',
            entityType: 'DISPUTE',
            entityId: id,
            newValues: {
                resolution: dto.resolution,
                refundAmount: dto.refundAmount ?? null,
            },
        });
        return result;
    }
    async reject(adminId, id, dto) {
        const result = await this.disputesService.adminReject(adminId, id, dto.reason);
        await this.audit.record({
            adminId,
            action: 'DISPUTE_REJECTED',
            entityType: 'DISPUTE',
            entityId: id,
            newValues: { reason: dto.reason },
        });
        return result;
    }
};
exports.AdminDisputesController = AdminDisputesController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'View all disputes (filter by status)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dispute_query_dto_1.DisputeQueryDto]),
    __metadata("design:returntype", Promise)
], AdminDisputesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'View dispute details (evidence, timeline, booking)',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminDisputesController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('/:id/evidence'),
    (0, swagger_1.ApiOperation)({ summary: 'View dispute evidence' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminDisputesController.prototype, "getEvidence", null);
__decorate([
    (0, common_1.Get)('/:id/timeline'),
    (0, swagger_1.ApiOperation)({ summary: 'View the full dispute timeline' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminDisputesController.prototype, "getTimeline", null);
__decorate([
    (0, common_1.Get)('/:id/chat'),
    (0, swagger_1.ApiOperation)({ summary: 'View chat history between the parties' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dispute_query_dto_1.DisputeQueryDto]),
    __metadata("design:returntype", Promise)
], AdminDisputesController.prototype, "getChat", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('disputes.manage'),
    (0, common_1.Post)('/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update dispute status (tracked in timeline)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_dispute_status_dto_1.UpdateDisputeStatusDto]),
    __metadata("design:returntype", Promise)
], AdminDisputesController.prototype, "updateStatus", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('disputes.resolve'),
    (0, common_1.Post)('/:id/resolve'),
    (0, swagger_1.ApiOperation)({
        summary: 'Resolve a dispute (full/partial refund, redo, none)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, resolve_dispute_dto_1.ResolveDisputeDto]),
    __metadata("design:returntype", Promise)
], AdminDisputesController.prototype, "resolve", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('disputes.resolve'),
    (0, common_1.Post)('/:id/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject a dispute (mandatory reason)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, reject_dispute_dto_1.RejectDisputeDto]),
    __metadata("design:returntype", Promise)
], AdminDisputesController.prototype, "reject", null);
exports.AdminDisputesController = AdminDisputesController = __decorate([
    (0, swagger_1.ApiTags)('Disputes (Admin)'),
    (0, common_1.Controller)('admin/disputes'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [disputes_service_1.DisputesService,
        admin_audit_service_1.AdminAuditService])
], AdminDisputesController);
//# sourceMappingURL=admin-disputes.controller.js.map