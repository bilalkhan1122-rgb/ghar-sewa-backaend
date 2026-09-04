import { Module } from "@nestjs/common";
import { CronController } from "./cron.controller";
import { CronService } from "./cron.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { WalletModule } from "../wallet/wallet.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { JobsModule } from "../jobs/jobs.module";

@Module({
  imports: [PrismaModule, WalletModule, NotificationsModule, JobsModule],
  controllers: [CronController],
  providers: [CronService],
})
export class CronModule {}
