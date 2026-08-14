import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "generated/prisma/client";
import { AdminSearchQueryDto } from "./dtos/admin-search-query.dto";
import { Permissions } from "src/common/decorators/permissions.decorator";

@ApiTags("Admin Search")
@Controller("admin/search")
@Roles(UserRole.ADMIN)
@Permissions("overview.view")
export class AdminSearchController {
  constructor(private readonly adminService: AdminService) {}

  @Get("/")
  @ApiOperation({
    summary:
      "Global search across users, providers, jobs, bookings, disputes, withdrawals and wallet transactions",
  })
  async search(@Query() dto: AdminSearchQueryDto) {
    return this.adminService.globalSearch(dto);
  }
}
