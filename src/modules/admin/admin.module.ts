import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { AdminService } from "./admin.service";
import { AdminUsersService } from "./admin-users.service";
import { AdminAccountsService } from "./admin-accounts.service";
import { AdminNotificationsService } from "./admin-notifications.service";
import { AdminAuditService } from "src/common/services/admin-audit.service";
import { FileUploadService } from "src/common/services/file-upload.service";
import { AdminDashboardController } from "./admin-dashboard.controller";
import { AdminReportsController } from "./admin-reports.controller";
import { AdminSearchController } from "./admin-search.controller";
import { AdminAuditController } from "./admin-audit.controller";
import { AdminUsersController } from "./admin-users.controller";
import { AdminAccountsController } from "./admin-accounts.controller";
import { AdminProvidersController } from "./admin-providers.controller";
import { AdminNotificationsController } from "./admin-notifications.controller";

/**
 * Module 17 — Admin Dashboard.
 *
 * Platform statistics, reports, global search, audit logs, user/provider
 * management and admin-initiated notifications. All routes are guarded by
 * @Roles(UserRole.ADMIN); granular permissions are enforced per-route via
 * @Permissions() + PermissionsGuard (future-ready).
 */
@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [
    AdminDashboardController,
    AdminReportsController,
    AdminSearchController,
    AdminAuditController,
    AdminUsersController,
    AdminAccountsController,
    AdminProvidersController,
    AdminNotificationsController,
  ],
  providers: [
    AdminService,
    AdminUsersService,
    AdminAccountsService,
    AdminNotificationsService,
    AdminAuditService,
    FileUploadService,
  ],
})
export class AdminModule {}
