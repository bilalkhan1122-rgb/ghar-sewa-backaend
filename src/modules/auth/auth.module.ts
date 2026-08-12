import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { NotificationsModule } from "../notifications/notifications.module";
import { EmailModule } from "../email/email.module";

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
    }),
    NotificationsModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
