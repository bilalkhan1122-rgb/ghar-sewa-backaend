import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CustomerReviewsController } from "./customer-reviews.controller";
import { ProviderReviewsController } from "./provider-reviews.controller";
import { PublicReviewsController } from "./public-reviews.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { RankingModule } from "../ranking/ranking.module";
import { RealtimeModule } from "../realtime/realtime.module";

@Module({
  imports: [PrismaModule, NotificationsModule, RankingModule, RealtimeModule],
  controllers: [
    CustomerReviewsController,
    ProviderReviewsController,
    PublicReviewsController,
  ],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
