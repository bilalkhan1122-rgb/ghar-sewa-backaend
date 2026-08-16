import { Module } from "@nestjs/common";
import { SupportService } from "./support.service";
import {
  AdminSupportController,
  SupportController,
} from "./support.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { FileUploadService } from "src/common/services/file-upload.service";
import { NotificationsModule } from "../notifications/notifications.module";

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [SupportController, AdminSupportController],
  providers: [SupportService, FileUploadService],
  exports: [SupportService],
})
export class SupportModule {}
