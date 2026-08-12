import { Module } from "@nestjs/common";
import { PenaltiesService } from "./penalties.service";
import { ProviderPenaltiesController } from "./provider-penalties.controller";
import { AdminPenaltiesController } from "./admin-penalties.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { FileUploadService } from "src/common/services/file-upload.service";
import { AdminAuditService } from "src/common/services/admin-audit.service";

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [ProviderPenaltiesController, AdminPenaltiesController],
  providers: [PenaltiesService, FileUploadService, AdminAuditService],
  exports: [PenaltiesService],
})
export class PenaltiesModule {}
