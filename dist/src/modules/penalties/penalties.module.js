"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenaltiesModule = void 0;
const common_1 = require("@nestjs/common");
const penalties_service_1 = require("./penalties.service");
const provider_penalties_controller_1 = require("./provider-penalties.controller");
const admin_penalties_controller_1 = require("./admin-penalties.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const notifications_module_1 = require("../notifications/notifications.module");
const file_upload_service_1 = require("../../common/services/file-upload.service");
const admin_audit_service_1 = require("../../common/services/admin-audit.service");
let PenaltiesModule = class PenaltiesModule {
};
exports.PenaltiesModule = PenaltiesModule;
exports.PenaltiesModule = PenaltiesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, notifications_module_1.NotificationsModule],
        controllers: [provider_penalties_controller_1.ProviderPenaltiesController, admin_penalties_controller_1.AdminPenaltiesController],
        providers: [penalties_service_1.PenaltiesService, file_upload_service_1.FileUploadService, admin_audit_service_1.AdminAuditService],
        exports: [penalties_service_1.PenaltiesService],
    })
], PenaltiesModule);
//# sourceMappingURL=penalties.module.js.map