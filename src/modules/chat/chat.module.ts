import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationsModule } from 'src/modules/notifications/notifications.module';
import { FileUploadService } from 'src/common/services/file-upload.service';

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, FileUploadService],
  exports: [ChatService],
})
export class ChatModule {}
