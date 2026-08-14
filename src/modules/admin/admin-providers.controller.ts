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
import { AdminProviderQueryDto } from "./dtos/admin-provider-query.dto";
import { ActionReasonDto } from "src/common/dtos/action-reason.dto";

@ApiTags("Admin Providers")
@Controller("admin/providers")
@Roles(UserRole.ADMIN)
@Permissions("providers.view")
export class AdminProvidersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get("/")
  @ApiOperation({ summary: "List providers with search/filter/pagination" })
  async list(@Query() query: AdminProviderQueryDto) {
    return this.adminUsersService.listProviders(query);
  }

  @Get("/:id")
  @ApiOperation({ summary: "View provider profile, documents and stats" })
  async getDetail(@Param("id", ParseUUIDPipe) id: string) {
    return this.adminUsersService.getProviderDetail(id);
  }

  @Get("/:id/documents")
  @ApiOperation({ summary: "View provider documents + verification history" })
  async getDocuments(@Param("id", ParseUUIDPipe) id: string) {
    return this.adminUsersService.getProviderDocuments(id);
  }

  @Get("/:id/performance")
  @ApiOperation({
    summary: "Provider performance: rating, earnings, cancellations, penalties",
  })
  async getPerformance(@Param("id", ParseUUIDPipe) id: string) {
    return this.adminUsersService.getProviderPerformance(id);
  }

  @Permissions("providers.suspend")
  @Post("/:id/suspend")
  @ApiOperation({ summary: "Suspend a provider (reason required)" })
  async suspend(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: ActionReasonDto,
  ) {
    return this.adminUsersService.suspendProvider(adminId, id, dto.reason);
  }

  @Permissions("providers.suspend")
  @Post("/:id/unsuspend")
  @ApiOperation({ summary: "Unsuspend a provider" })
  async unsuspend(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.adminUsersService.unsuspendProvider(adminId, id);
  }
}
