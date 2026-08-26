import { Module } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CustomerBookingController } from "./customer-booking.controller";
import { ProviderBookingController } from "./provider-booking.controller";
import { AdminBookingsController } from "./admin-booking.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { PenaltiesModule } from "../penalties/penalties.module";
import { WalletModule } from "../wallet/wallet.module";
import { RankingModule } from "../ranking/ranking.module";
import { RealtimeModule } from "../realtime/realtime.module";
import { CategoriesModule } from "../categories/categories.module";

@Module({
  imports: [
    PrismaModule,
    NotificationsModule,
    PenaltiesModule,
    WalletModule,
    RankingModule,
    RealtimeModule,
    // For SubcategoriesService — a direct booking creates a job, so it has
    // to validate a sub-type the same way posting one does.
    CategoriesModule,
  ],
  controllers: [
    CustomerBookingController,
    ProviderBookingController,
    AdminBookingsController,
  ],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
