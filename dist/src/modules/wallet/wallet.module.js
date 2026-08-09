"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModule = void 0;
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
const topups_service_1 = require("./topups.service");
const withdrawals_service_1 = require("./withdrawals.service");
const customer_wallet_controller_1 = require("./customer-wallet.controller");
const provider_wallet_controller_1 = require("./provider-wallet.controller");
const provider_withdrawals_controller_1 = require("./provider-withdrawals.controller");
const admin_wallet_controller_1 = require("./admin-wallet.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const notifications_module_1 = require("../notifications/notifications.module");
const file_upload_service_1 = require("../../common/services/file-upload.service");
const admin_audit_service_1 = require("../../common/services/admin-audit.service");
let WalletModule = class WalletModule {
};
exports.WalletModule = WalletModule;
exports.WalletModule = WalletModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, notifications_module_1.NotificationsModule],
        controllers: [
            customer_wallet_controller_1.CustomerWalletController,
            provider_wallet_controller_1.ProviderWalletController,
            provider_withdrawals_controller_1.ProviderWithdrawalsController,
            admin_wallet_controller_1.AdminWalletController,
        ],
        providers: [
            wallet_service_1.WalletService,
            topups_service_1.TopUpsService,
            withdrawals_service_1.WithdrawalsService,
            file_upload_service_1.FileUploadService,
            admin_audit_service_1.AdminAuditService,
        ],
        exports: [wallet_service_1.WalletService],
    })
], WalletModule);
//# sourceMappingURL=wallet.module.js.map