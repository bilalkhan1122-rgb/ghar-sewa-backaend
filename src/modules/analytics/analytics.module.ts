import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsExportService } from "./analytics-export.service";
import { AnalyticsController } from "./analytics.controller";

@Module({
  imports: [PrismaModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsExportService],
})
export class AnalyticsModule {}
