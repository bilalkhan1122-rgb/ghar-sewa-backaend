import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "generated/prisma/client";
import { DateRangeDto } from "./dtos/date-range.dto";
import { Permissions } from "src/common/decorators/permissions.decorator";

@ApiTags("Admin Dashboard")
@Controller("admin/dashboard")
@Roles(UserRole.ADMIN)
@Permissions("overview.view")
export class AdminDashboardController {
  constructor(private readonly adminService: AdminService) {}

  @Get("/summary")
  @ApiOperation({
    summary: "Overall platform statistics (optional date range)",
  })
  async summary(@Query() dto: DateRangeDto) {
    return this.adminService.getDashboardSummary(dto);
  }

  @Get("/widgets")
  @ApiOperation({
    summary: "Summary metrics optimized for dashboard cards/widgets",
  })
  async widgets() {
    return this.adminService.getDashboardWidgets();
  }
}
