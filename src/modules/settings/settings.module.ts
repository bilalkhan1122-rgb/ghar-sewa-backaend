import { Global, Module } from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { AdminSettingsController } from "./admin-settings.controller";
import { PrismaModule } from "src/prisma/prisma.module";

/**
 * Global because the payment mode is consulted by jobs, bookings and the
 * wallet — three modules that would otherwise all have to import it, and two
 * of which already depend on each other.
 */
@Global()
@Module({
  imports: [PrismaModule],
  controllers: [AdminSettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
