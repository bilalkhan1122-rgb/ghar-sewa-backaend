import { Module } from '@nestjs/common';
import { BiddingService } from './bidding.service';
import { CustomerBiddingController } from './customer-bidding.controller';
import { ProviderBiddingController } from './provider-bidding.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { PenaltiesModule } from '../penalties/penalties.module';

@Module({
  imports: [PrismaModule, NotificationsModule, PenaltiesModule],
  controllers: [CustomerBiddingController, ProviderBiddingController],
  providers: [BiddingService],
  exports: [BiddingService],
})
export class BiddingModule {}
