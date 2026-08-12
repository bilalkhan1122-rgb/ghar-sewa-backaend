import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AdminUsersService } from "./admin-users.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { Permissions } from "src/common/decorators/permissions.decorator";
import { UserRole } from "generated/prisma/client";
import { AdminUserQueryDto } from "./dtos/admin-user-query.dto";
import { ActionReasonDto } from "src/common/dtos/action-reason.dto";

@ApiTags("Admin Users")
@Controller("admin/users")
@Roles(UserRole.ADMIN)
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get("/")
  @ApiOperation({ summary: "List users with search/filter/pagination" })
  async list(@Query() query: AdminUserQueryDto) {
    return this.adminUsersService.listUsers(query);
  }

  @Get("/:id")
  @ApiOperation({ summary: "View full user details" })
  async getDetail(@Param("id", ParseUUIDPipe) id: string) {
    return this.adminUsersService.getUserDetail(id);
  }

  @Permissions("users.suspend")
  @Post("/:id/suspend")
  @ApiOperation({ summary: "Suspend a user (reason required)" })
  async suspend(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: ActionReasonDto,
  ) {
    return this.adminUsersService.suspendUser(adminId, id, dto.reason);
  }

  @Permissions("users.suspend")
  @Post("/:id/unsuspend")
  @ApiOperation({ summary: "Unsuspend a user" })
  async unsuspend(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.adminUsersService.unsuspendUser(adminId, id);
  }

  @Permissions("users.delete")
  @Post("/:id/delete")
  @ApiOperation({ summary: "Soft delete a user (reason required)" })
  async softDelete(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: ActionReasonDto,
  ) {
    return this.adminUsersService.softDeleteUser(adminId, id, dto.reason);
  }

  @Permissions("users.delete")
  @Post("/:id/restore")
  @ApiOperation({ summary: "Restore a soft-deleted user" })
  async restore(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.adminUsersService.restoreUser(adminId, id);
  }
}
