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
exports.AdminVerificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const verification_service_1 = require("./verification.service");
const admin_audit_service_1 = require("../../common/services/admin-audit.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const client_1 = require("../../../generated/prisma/client");
const verification_query_dto_1 = require("./dtos/verification-query.dto");
const reject_verification_dto_1 = require("./dtos/reject-verification.dto");
let AdminVerificationController = class AdminVerificationController {
    verificationService;
    audit;
    constructor(verificationService, audit) {
        this.verificationService = verificationService;
        this.audit = audit;
    }
    async listRequests(query) {
        return this.verificationService.adminListRequests(query);
    }
    async getRequest(id) {
        return this.verificationService.adminGetRequest(id);
    }
    async approve(adminId, id) {
        const result = await this.verificationService.adminApprove(adminId, id);
        await this.audit.record({
            adminId,
            action: 'VERIFICATION_APPROVED',
            entityType: 'VERIFICATION_REQUEST',
            entityId: id,
            newValues: { requestId: id },
        });
        return result;
    }
    async reject(adminId, id, dto) {
        const result = await this.verificationService.adminReject(adminId, id, dto.reason);
        await this.audit.record({
            adminId,
            action: 'VERIFICATION_REJECTED',
            entityType: 'VERIFICATION_REQUEST',
            entityId: id,
            newValues: { reason: dto.reason, requestId: id },
        });
        return result;
    }
    async getProviderHistory(providerId, query) {
        return this.verificationService.adminGetProviderHistory(providerId, query);
    }
    async ban(adminId, providerId) {
        const result = await this.verificationService.adminBan(adminId, providerId);
        await this.audit.record({
            adminId,
            action: 'PROVIDER_BANNED',
            entityType: 'PROVIDER',
            entityId: providerId,
        });
        return result;
    }
    async unban(adminId, providerId) {
        const result = await this.verificationService.adminUnban(adminId, providerId);
        await this.audit.record({
            adminId,
            action: 'PROVIDER_UNBANNED',
            entityType: 'PROVIDER',
            entityId: providerId,
        });
        return result;
    }
};
exports.AdminVerificationController = AdminVerificationController;
__decorate([
    (0, common_1.Get)('/requests'),
    (0, swagger_1.ApiOperation)({ summary: 'List verification requests, filter by status' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verification_query_dto_1.VerificationQueryDto]),
    __metadata("design:returntype", Promise)
], AdminVerificationController.prototype, "listRequests", null);
__decorate([
    (0, common_1.Get)('/requests/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View verification request details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminVerificationController.prototype, "getRequest", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('verification.review'),
    (0, common_1.Post)('/requests/:id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a verification request' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminVerificationController.prototype, "approve", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('verification.review'),
    (0, common_1.Post)('/requests/:id/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject a verification request (reason required)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, reject_verification_dto_1.RejectVerificationDto]),
    __metadata("design:returntype", Promise)
], AdminVerificationController.prototype, "reject", null);
__decorate([
    (0, common_1.Get)('/providers/:providerId/history'),
    (0, swagger_1.ApiOperation)({ summary: "View a provider's full verification history" }),
    __param(0, (0, common_1.Param)('providerId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, verification_query_dto_1.VerificationQueryDto]),
    __metadata("design:returntype", Promise)
], AdminVerificationController.prototype, "getProviderHistory", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('providers.ban'),
    (0, common_1.Post)('/providers/:providerId/ban'),
    (0, swagger_1.ApiOperation)({ summary: 'Ban a provider' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('providerId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminVerificationController.prototype, "ban", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('providers.ban'),
    (0, common_1.Post)('/providers/:providerId/unban'),
    (0, swagger_1.ApiOperation)({ summary: 'Unban a provider (resets verification status)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('providerId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminVerificationController.prototype, "unban", null);
exports.AdminVerificationController = AdminVerificationController = __decorate([
    (0, swagger_1.ApiTags)('Verification (Admin)'),
    (0, common_1.Controller)('admin/verification'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [verification_service_1.VerificationService,
        admin_audit_service_1.AdminAuditService])
], AdminVerificationController);
//# sourceMappingURL=admin-verification.controller.js.map