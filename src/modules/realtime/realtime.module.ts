import { Module } from "@nestjs/common";
import { RealtimeService } from "./realtime.service";
import { RealtimeAuthController } from "./realtime-auth.controller";

@Module({
  controllers: [RealtimeAuthController],
  providers: [RealtimeService],
  exports: [RealtimeService],
})
export class RealtimeModule {}
