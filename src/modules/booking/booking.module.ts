import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CustomerBookingController } from './customer-booking.controller';
import { ProviderBookingController } from './provider-booking.controller';
import { AdminBookingsController } from './admin-booking.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { PenaltiesModule } from '../penalties/penalties.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [PrismaModule, NotificationsModule, PenaltiesModule, WalletModule],
  controllers: [
    CustomerBookingController,
    ProviderBookingController,
    AdminBookingsController,
  ],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
