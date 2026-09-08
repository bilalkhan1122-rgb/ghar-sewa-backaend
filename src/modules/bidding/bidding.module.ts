import { Module } from "@nestjs/common";
import { BiddingService } from "./bidding.service";
import { CustomerBiddingController } from "./customer-bidding.controller";
import { ProviderBiddingController } from "./provider-bidding.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { PenaltiesModule } from "../penalties/penalties.module";
import { RealtimeModule } from "../realtime/realtime.module";
// ProviderPresenceService — an accepted bid engages the provider, which the
// nearby map must learn about in real time.
import { ProviderModule } from "../provider/provider.module";

@Module({
  imports: [
    PrismaModule,
    NotificationsModule,
    PenaltiesModule,
    RealtimeModule,
    ProviderModule,
  ],
  controllers: [CustomerBiddingController, ProviderBiddingController],
  providers: [BiddingService],
  exports: [BiddingService],
})
export class BiddingModule {}
