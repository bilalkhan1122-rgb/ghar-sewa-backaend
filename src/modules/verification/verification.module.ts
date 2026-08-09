import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { ProviderVerificationController } from './provider-verification.controller';
import { AdminVerificationController } from './admin-verification.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { AdminAuditService } from 'src/common/services/admin-audit.service';

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [ProviderVerificationController, AdminVerificationController],
  providers: [VerificationService, AdminAuditService],
  exports: [VerificationService],
})
export class VerificationModule {}
