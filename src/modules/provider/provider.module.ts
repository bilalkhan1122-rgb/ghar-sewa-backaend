import { Module } from "@nestjs/common";
import { ProviderService } from "./provider.service";
import {
  ProviderController,
  PublicProviderController,
} from "./provider.controller";
import { NearbyProvidersController } from "./nearby-providers.controller";
import { ProviderPresenceService } from "./provider-presence.service";
import { NearbyProvidersService } from "./nearby-providers.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { FileUploadService } from "src/common/services/file-upload.service";
import { VerificationModule } from "../verification/verification.module";
import { RealtimeModule } from "../realtime/realtime.module";

@Module({
  imports: [PrismaModule, VerificationModule, RealtimeModule],
  controllers: [
    ProviderController,
    PublicProviderController,
    NearbyProvidersController,
  ],
  providers: [
    ProviderService,
    ProviderPresenceService,
    NearbyProvidersService,
    FileUploadService,
  ],
  exports: [ProviderService, ProviderPresenceService],
})
export class ProviderModule {}
