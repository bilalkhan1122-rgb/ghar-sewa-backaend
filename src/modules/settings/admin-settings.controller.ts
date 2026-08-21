import { Body, Controller, Get, Patch } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SettingsService } from "./settings.service";
import { UpdatePaymentModeDto } from "./dtos/update-payment-mode.dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { Permissions } from "src/common/decorators/permissions.decorator";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { UserRole } from "generated/prisma/client";

@ApiTags("Admin Settings")
@Controller("admin/settings")
@Roles(UserRole.ADMIN)
export class AdminSettingsController {
  constructor(private readonly settings: SettingsService) {}

  @Get("/")
  @Permissions("settings.view")
  @ApiOperation({ summary: "Current platform settings" })
  async get() {
    return this.settings.get();
  }

  @Patch("/payment-mode")
  @Permissions("settings.manage")
  @ApiOperation({
    summary: "Switch between prepaid and post-paid customer payments",
  })
  async setPaymentMode(
    @GetUser("sub") adminId: string,
    @Body() dto: UpdatePaymentModeDto,
  ) {
    return this.settings.setPaymentMode(dto.paymentMode, adminId);
  }
}
