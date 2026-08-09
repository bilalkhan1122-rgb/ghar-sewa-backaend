import { Module } from '@nestjs/common';
import { DisputesService } from './disputes.service';
import { CustomerDisputesController } from './customer-disputes.controller';
import { ProviderDisputesController } from './provider-disputes.controller';
import { AdminDisputesController } from './admin-disputes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { AdminAuditService } from 'src/common/services/admin-audit.service';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [PrismaModule, NotificationsModule, WalletModule],
  controllers: [
    CustomerDisputesController,
    ProviderDisputesController,
    AdminDisputesController,
  ],
  providers: [DisputesService, FileUploadService, AdminAuditService],
  exports: [DisputesService],
})
export class DisputesModule {}
