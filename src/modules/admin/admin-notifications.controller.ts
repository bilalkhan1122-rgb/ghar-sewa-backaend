import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AdminNotificationsService } from "./admin-notifications.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { Permissions } from "src/common/decorators/permissions.decorator";
import { UserRole } from "generated/prisma/client";
import {
  SendUserNotificationDto,
  SendRoleNotificationDto,
  SendBroadcastNotificationDto,
} from "./dtos/send-notification.dto";

@ApiTags("Admin Notifications")
@Controller("admin/notifications")
@Roles(UserRole.ADMIN)
@Permissions("notifications.view")
export class AdminNotificationsController {
  constructor(
    private readonly adminNotificationsService: AdminNotificationsService,
  ) {}

  @Permissions("notifications.send")
  @Post("/send")
  @ApiOperation({ summary: "Send a notification to a single user" })
  async sendToUser(
    @GetUser("sub") adminId: string,
    @Body() dto: SendUserNotificationDto,
  ) {
    return this.adminNotificationsService.sendToUser(adminId, dto);
  }

  @Permissions("notifications.send")
  @Post("/send/role")
  @ApiOperation({
    summary: "Send a notification to all customers or providers",
  })
  async sendToRole(
    @GetUser("sub") adminId: string,
    @Body() dto: SendRoleNotificationDto,
  ) {
    return this.adminNotificationsService.sendToRole(adminId, dto);
  }

  @Permissions("notifications.broadcast")
  @Post("/broadcast")
  @ApiOperation({ summary: "Broadcast a notification to every active user" })
  async broadcast(
    @GetUser("sub") adminId: string,
    @Body() dto: SendBroadcastNotificationDto,
  ) {
    return this.adminNotificationsService.broadcast(adminId, dto);
  }
}
