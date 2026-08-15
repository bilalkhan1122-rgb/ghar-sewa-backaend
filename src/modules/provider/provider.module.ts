import { Module } from "@nestjs/common";
import { ProviderService } from "./provider.service";
import {
  ProviderController,
  PublicProviderController,
} from "./provider.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { FileUploadService } from "src/common/services/file-upload.service";
import { VerificationModule } from "../verification/verification.module";

@Module({
  imports: [PrismaModule, VerificationModule],
  controllers: [ProviderController, PublicProviderController],
  providers: [ProviderService, FileUploadService],
  exports: [ProviderService],
})
export class ProviderModule {}
