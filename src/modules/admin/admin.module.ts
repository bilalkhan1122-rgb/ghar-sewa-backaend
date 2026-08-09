import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { AdminService } from './admin.service';
import { AdminUsersService } from './admin-users.service';
import { AdminNotificationsService } from './admin-notifications.service';
import { AdminAuditService } from 'src/common/services/admin-audit.service';
import { AdminDashboardController } from './admin-dashboard.controller';
import { AdminReportsController } from './admin-reports.controller';
import { AdminSearchController } from './admin-search.controller';
import { AdminAuditController } from './admin-audit.controller';
import { AdminUsersController } from './admin-users.controller';
import { AdminProvidersController } from './admin-providers.controller';
import { AdminNotificationsController } from './admin-notifications.controller';

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
    AdminProvidersController,
    AdminNotificationsController,
  ],
  providers: [
    AdminService,
    AdminUsersService,
    AdminNotificationsService,
    AdminAuditService,
  ],
})
export class AdminModule {}
