import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { RealtimeModule } from "../realtime/realtime.module";
import { RankingService } from "./ranking.service";
import { ProviderRankingController } from "./provider-ranking.controller";
import { AdminRankingsController } from "./admin-rankings.controller";

@Module({
  imports: [PrismaModule, NotificationsModule, RealtimeModule],
  controllers: [ProviderRankingController, AdminRankingsController],
  providers: [RankingService],
  exports: [RankingService],
})
export class RankingModule {}
