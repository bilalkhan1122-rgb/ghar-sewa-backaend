import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileUploadService } from 'src/common/services/file-upload.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, FileUploadService],
})
export class UsersModule {}
