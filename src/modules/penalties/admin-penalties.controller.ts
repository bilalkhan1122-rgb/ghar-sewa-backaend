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
import { PenaltiesService } from "./penalties.service";
import { AdminAuditService } from "src/common/services/admin-audit.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { Permissions } from "src/common/decorators/permissions.decorator";
import { UserRole } from "generated/prisma/client";
import { PenaltyQueryDto, AppealQueryDto } from "./dtos/penalty-query.dto";
import { ApproveAppealDto, RejectAppealDto } from "./dtos/review-appeal.dto";
import { GetUser } from "src/common/decorators/get-user.decorator";

@ApiTags("Penalties (Admin)")
@Controller("admin")
@Roles(UserRole.ADMIN)
export class AdminPenaltiesController {
  constructor(
    private readonly penaltiesService: PenaltiesService,
    private readonly audit: AdminAuditService,
  ) {}

  @Get("/penalties")
  @ApiOperation({ summary: "View all penalty records" })
  async listAllPenalties(@Query() query: PenaltyQueryDto) {
    return this.penaltiesService.adminListAllPenalties(query);
  }

  @Get("/penalties/providers/:providerId")
  @ApiOperation({ summary: "View all penalty records for a provider" })
  async getProviderPenalties(
    @Param("providerId", ParseUUIDPipe) providerId: string,
    @Query() query: PenaltyQueryDto,
  ) {
    return this.penaltiesService.adminGetProviderPenalties(providerId, query);
  }

  @Get("/appeals")
  @ApiOperation({ summary: "View all appeals (filter by status)" })
  async listAppeals(@Query() query: AppealQueryDto) {
    return this.penaltiesService.adminListAppeals(query);
  }

  @Get("/appeals/:id")
  @ApiOperation({ summary: "View a single appeal" })
  async getAppeal(@Param("id", ParseUUIDPipe) id: string) {
    return this.penaltiesService.adminGetAppeal(id);
  }

  @Permissions("penalties.review")
  @Post("/appeals/:id/approve")
  @ApiOperation({ summary: "Approve an appeal (lifts suspension/ban)" })
  async approveAppeal(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: ApproveAppealDto,
  ) {
    const result = await this.penaltiesService.adminApproveAppeal(
      adminId,
      id,
      dto.note,
    );
    await this.audit.record({
      adminId,
      action: "APPEAL_APPROVED",
      entityType: "APPEAL",
      entityId: id,
      newValues: { note: dto.note ?? null },
    });
    return result;
  }

  @Permissions("penalties.review")
  @Post("/appeals/:id/reject")
  @ApiOperation({ summary: "Reject an appeal (note required)" })
  async rejectAppeal(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: RejectAppealDto,
  ) {
    const result = await this.penaltiesService.adminRejectAppeal(
      adminId,
      id,
      dto.note,
    );
    await this.audit.record({
      adminId,
      action: "APPEAL_REJECTED",
      entityType: "APPEAL",
      entityId: id,
      newValues: { note: dto.note },
    });
    return result;
  }
}
