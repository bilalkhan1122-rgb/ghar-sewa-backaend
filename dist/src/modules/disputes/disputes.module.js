"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisputesModule = void 0;
const common_1 = require("@nestjs/common");
const disputes_service_1 = require("./disputes.service");
const customer_disputes_controller_1 = require("./customer-disputes.controller");
const provider_disputes_controller_1 = require("./provider-disputes.controller");
const admin_disputes_controller_1 = require("./admin-disputes.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const notifications_module_1 = require("../notifications/notifications.module");
const file_upload_service_1 = require("../../common/services/file-upload.service");
const admin_audit_service_1 = require("../../common/services/admin-audit.service");
const wallet_module_1 = require("../wallet/wallet.module");
let DisputesModule = class DisputesModule {
};
exports.DisputesModule = DisputesModule;
exports.DisputesModule = DisputesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, notifications_module_1.NotificationsModule, wallet_module_1.WalletModule],
        controllers: [
            customer_disputes_controller_1.CustomerDisputesController,
            provider_disputes_controller_1.ProviderDisputesController,
            admin_disputes_controller_1.AdminDisputesController,
        ],
        providers: [disputes_service_1.DisputesService, file_upload_service_1.FileUploadService, admin_audit_service_1.AdminAuditService],
        exports: [disputes_service_1.DisputesService],
    })
], DisputesModule);
//# sourceMappingURL=disputes.module.js.map