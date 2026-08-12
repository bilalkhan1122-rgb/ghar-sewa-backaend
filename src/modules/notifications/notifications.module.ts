import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { PushDeliveryService } from "./push-delivery.service";
import { NotificationsController } from "./notifications.controller";
import { DevicesController } from "./devices.controller";
import { PreferencesController } from "./preferences.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  // NOTE: order matters — the more specific controllers (preferences,
  // devices) must be registered before `notifications/:id`.
  controllers: [
    PreferencesController,
    DevicesController,
    NotificationsController,
  ],
  providers: [NotificationsService, PushDeliveryService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
