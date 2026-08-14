import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { VerificationService } from "./verification.service";
import { AdminAuditService } from "src/common/services/admin-audit.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { Permissions } from "src/common/decorators/permissions.decorator";
import { UserRole } from "generated/prisma/client";
import { VerificationQueryDto } from "./dtos/verification-query.dto";
import { RejectVerificationDto } from "./dtos/reject-verification.dto";

@ApiTags("Verification (Admin)")
@Controller("admin/verification")
@Roles(UserRole.ADMIN)
@Permissions("verification.view")
export class AdminVerificationController {
  constructor(
    private readonly verificationService: VerificationService,
    private readonly audit: AdminAuditService,
  ) {}

  @Get("/requests")
  @ApiOperation({ summary: "List verification requests, filter by status" })
  async listRequests(@Query() query: VerificationQueryDto) {
    return this.verificationService.adminListRequests(query);
  }

  @Get("/requests/:id")
  @ApiOperation({ summary: "View verification request details" })
  async getRequest(@Param("id", ParseUUIDPipe) id: string) {
    return this.verificationService.adminGetRequest(id);
  }

  @Permissions("verification.review")
  @Post("/requests/:id/approve")
  @ApiOperation({ summary: "Approve a verification request" })
  async approve(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    const result = await this.verificationService.adminApprove(adminId, id);
    await this.audit.record({
      adminId,
      action: "VERIFICATION_APPROVED",
      entityType: "VERIFICATION_REQUEST",
      entityId: id,
      newValues: { requestId: id },
    });
    return result;
  }

  @Permissions("verification.review")
  @Post("/requests/:id/reject")
  @ApiOperation({ summary: "Reject a verification request (reason required)" })
  async reject(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: RejectVerificationDto,
  ) {
    const result = await this.verificationService.adminReject(
      adminId,
      id,
      dto.reason,
    );
    await this.audit.record({
      adminId,
      action: "VERIFICATION_REJECTED",
      entityType: "VERIFICATION_REQUEST",
      entityId: id,
      newValues: { reason: dto.reason, requestId: id },
    });
    return result;
  }

  @Get("/providers/:providerId/history")
  @ApiOperation({ summary: "View a provider's full verification history" })
  async getProviderHistory(
    @Param("providerId", ParseUUIDPipe) providerId: string,
    @Query() query: VerificationQueryDto,
  ) {
    return this.verificationService.adminGetProviderHistory(providerId, query);
  }

  @Permissions("providers.ban")
  @Post("/providers/:providerId/ban")
  @ApiOperation({ summary: "Ban a provider" })
  async ban(
    @GetUser("sub") adminId: string,
    @Param("providerId", ParseUUIDPipe) providerId: string,
  ) {
    const result = await this.verificationService.adminBan(adminId, providerId);
    await this.audit.record({
      adminId,
      action: "PROVIDER_BANNED",
      entityType: "PROVIDER",
      entityId: providerId,
    });
    return result;
  }

  @Permissions("providers.ban")
  @Post("/providers/:providerId/unban")
  @ApiOperation({ summary: "Unban a provider (resets verification status)" })
  async unban(
    @GetUser("sub") adminId: string,
    @Param("providerId", ParseUUIDPipe) providerId: string,
  ) {
    const result = await this.verificationService.adminUnban(
      adminId,
      providerId,
    );
    await this.audit.record({
      adminId,
      action: "PROVIDER_UNBANNED",
      entityType: "PROVIDER",
      entityId: providerId,
    });
    return result;
  }
}
