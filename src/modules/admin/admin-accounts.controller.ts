import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AdminAccountsService } from "./admin-accounts.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { Permissions } from "src/common/decorators/permissions.decorator";
import { UserRole } from "generated/prisma/client";
import {
  CreateAdminAccountDto,
  UpdateAdminAccountDto,
  UpdateAdminProfileDto,
  ChangePasswordDto,
} from "./dtos/admin-account.dto";

/**
 * Admin account management plus admin self-service.
 *
 * The `/me` routes carry no @Permissions: every admin must be able to read
 * their own access and change their own password, including one whose module
 * grants are otherwise empty.
 */
@ApiTags("Admin Accounts")
@Controller("admin/accounts")
@Roles(UserRole.ADMIN)
export class AdminAccountsController {
  constructor(private readonly accounts: AdminAccountsService) {}

  @Get("/me")
  @ApiOperation({
    summary: "The signed-in admin's profile and effective access",
  })
  async me(@GetUser("sub") userId: string) {
    return this.accounts.getMyProfile(userId);
  }

  @Patch("/me")
  @ApiOperation({ summary: "Update your own name and phone" })
  async updateMe(
    @GetUser("sub") userId: string,
    @Body() dto: UpdateAdminProfileDto,
  ) {
    return this.accounts.updateMyProfile(userId, dto);
  }

  @Post("/me/password")
  @ApiOperation({ summary: "Change your own password" })
  async changePassword(
    @GetUser("sub") userId: string,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.accounts.changeMyPassword(userId, dto);
  }

  @Get("/modules")
  @Permissions("admins.view")
  @ApiOperation({ summary: "The module catalogue access is granted against" })
  modules() {
    return this.accounts.getModules();
  }

  @Get("/")
  @Permissions("admins.view")
  @ApiOperation({ summary: "List admin accounts and their module access" })
  async list() {
    return this.accounts.list();
  }

  @Post("/")
  @Permissions("admins.manage")
  @ApiOperation({ summary: "Create an admin account (super admins only)" })
  async create(
    @GetUser("sub") adminId: string,
    @Body() dto: CreateAdminAccountDto,
  ) {
    return this.accounts.create(adminId, dto);
  }

  @Patch("/:id")
  @Permissions("admins.manage")
  @ApiOperation({ summary: "Change an admin's module access or active state" })
  async update(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateAdminAccountDto,
  ) {
    return this.accounts.update(adminId, id, dto);
  }
}
