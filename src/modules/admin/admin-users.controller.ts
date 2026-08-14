import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Query,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import {
  AdminUsersService,
  IdentityDocumentParam,
  type IdentityDocument,
} from "./admin-users.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { Permissions } from "src/common/decorators/permissions.decorator";
import { UserRole } from "generated/prisma/client";
import { AdminUserQueryDto } from "./dtos/admin-user-query.dto";
import { ActionReasonDto } from "src/common/dtos/action-reason.dto";

@ApiTags("Admin Users")
@Controller("admin/users")
@Roles(UserRole.ADMIN)
@Permissions("users.view")
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

  // POST rather than DELETE for both takedowns below: they carry a required
  // reason in the body, and a DELETE body is the one place proxies are allowed
  // to drop the payload — which would surface as a confusing validation error.

  @Permissions("users.delete")
  @Post("/:id/profile-photo/remove")
  @ApiOperation({ summary: "Remove a user's profile photo (reason required)" })
  async removeProfilePhoto(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: ActionReasonDto,
  ) {
    return this.adminUsersService.removeProfilePhoto(adminId, id, dto.reason);
  }

  @Permissions("users.delete")
  @Post("/:id/gallery/:imageId/remove")
  @ApiOperation({
    summary: "Remove one image from a provider's gallery (reason required)",
  })
  async removeGalleryImage(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Param("imageId", ParseUUIDPipe) imageId: string,
    @Body() dto: ActionReasonDto,
  ) {
    return this.adminUsersService.removeGalleryImage(
      adminId,
      id,
      imageId,
      dto.reason,
    );
  }

  @Permissions("users.delete")
  @Post("/:id/documents/:document/remove")
  @ApiOperation({
    summary:
      "Remove an identity document — facePhoto | cnicFront | cnicBack (reason required)",
  })
  async removeIdentityDocument(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Param("document", new ParseEnumPipe(IdentityDocumentParam))
    document: IdentityDocument,
    @Body() dto: ActionReasonDto,
  ) {
    return this.adminUsersService.removeIdentityDocument(
      adminId,
      id,
      document,
      dto.reason,
    );
  }
}
