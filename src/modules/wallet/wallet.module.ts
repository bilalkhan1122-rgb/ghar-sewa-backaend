import { Module } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { TopUpsService } from "./topups.service";
import { WithdrawalsService } from "./withdrawals.service";
import { CustomerWalletController } from "./customer-wallet.controller";
import { ProviderWalletController } from "./provider-wallet.controller";
import { ProviderWithdrawalsController } from "./provider-withdrawals.controller";
import { AdminWalletController } from "./admin-wallet.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { FileUploadService } from "src/common/services/file-upload.service";
import { AdminAuditService } from "src/common/services/admin-audit.service";

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [
    CustomerWalletController,
    ProviderWalletController,
    ProviderWithdrawalsController,
    AdminWalletController,
  ],
  providers: [
    WalletService,
    TopUpsService,
    WithdrawalsService,
    FileUploadService,
    AdminAuditService,
  ],
  exports: [WalletService],
})
export class WalletModule {}
