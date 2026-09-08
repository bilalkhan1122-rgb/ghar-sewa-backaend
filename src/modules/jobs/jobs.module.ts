import { Module } from "@nestjs/common";
import { JobsService } from "./jobs.service";
import {
  JobsController,
  ProviderJobsController,
  AdminJobsController,
} from "./jobs.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { FileUploadService } from "src/common/services/file-upload.service";
import { AdminAuditService } from "src/common/services/admin-audit.service";
import { NotificationsModule } from "../notifications/notifications.module";
import { PenaltiesModule } from "../penalties/penalties.module";
import { RealtimeModule } from "../realtime/realtime.module";
import { WalletModule } from "../wallet/wallet.module";
// ProviderPresenceService — force-closing a job frees its engaged providers,
// which the nearby map must learn about in real time.
import { ProviderModule } from "../provider/provider.module";

@Module({
  imports: [
    PrismaModule,
    NotificationsModule,
    PenaltiesModule,
    RealtimeModule,
    WalletModule,
    ProviderModule,
  ],
  controllers: [JobsController, ProviderJobsController, AdminJobsController],
  providers: [JobsService, FileUploadService, AdminAuditService],
  exports: [JobsService],
})
export class JobsModule {}
