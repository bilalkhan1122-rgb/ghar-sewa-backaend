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
exports.AdminAuditController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_audit_service_1 = require("../../common/services/admin-audit.service");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("../../../generated/prisma/client");
const admin_audit_query_dto_1 = require("./dtos/admin-audit-query.dto");
let AdminAuditController = class AdminAuditController {
    auditService;
    constructor(auditService) {
        this.auditService = auditService;
    }
    async list(query) {
        return this.auditService.list(query);
    }
    async getById(id) {
        return this.auditService.getById(id);
    }
};
exports.AdminAuditController = AdminAuditController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({
        summary: 'List admin audit logs (immutable; filterable)',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_audit_query_dto_1.AdminAuditQueryDto]),
    __metadata("design:returntype", Promise)
], AdminAuditController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View a single audit log entry' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminAuditController.prototype, "getById", null);
exports.AdminAuditController = AdminAuditController = __decorate([
    (0, swagger_1.ApiTags)('Admin Audit Logs'),
    (0, common_1.Controller)('admin/audit-logs'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [admin_audit_service_1.AdminAuditService])
], AdminAuditController);
//# sourceMappingURL=admin-audit.controller.js.map