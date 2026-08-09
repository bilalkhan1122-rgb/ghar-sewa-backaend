"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../prisma/prisma.module");
const notifications_module_1 = require("../notifications/notifications.module");
const admin_service_1 = require("./admin.service");
const admin_users_service_1 = require("./admin-users.service");
const admin_notifications_service_1 = require("./admin-notifications.service");
const admin_audit_service_1 = require("../../common/services/admin-audit.service");
const admin_dashboard_controller_1 = require("./admin-dashboard.controller");
const admin_reports_controller_1 = require("./admin-reports.controller");
const admin_search_controller_1 = require("./admin-search.controller");
const admin_audit_controller_1 = require("./admin-audit.controller");
const admin_users_controller_1 = require("./admin-users.controller");
const admin_providers_controller_1 = require("./admin-providers.controller");
const admin_notifications_controller_1 = require("./admin-notifications.controller");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, notifications_module_1.NotificationsModule],
        controllers: [
            admin_dashboard_controller_1.AdminDashboardController,
            admin_reports_controller_1.AdminReportsController,
            admin_search_controller_1.AdminSearchController,
            admin_audit_controller_1.AdminAuditController,
            admin_users_controller_1.AdminUsersController,
            admin_providers_controller_1.AdminProvidersController,
            admin_notifications_controller_1.AdminNotificationsController,
        ],
        providers: [
            admin_service_1.AdminService,
            admin_users_service_1.AdminUsersService,
            admin_notifications_service_1.AdminNotificationsService,
            admin_audit_service_1.AdminAuditService,
        ],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map