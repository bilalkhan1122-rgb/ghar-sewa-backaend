import { Controller, Get, Param, Query, ParseUUIDPipe } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AdminAuditService } from "src/common/services/admin-audit.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "generated/prisma/client";
import { AdminAuditQueryDto } from "./dtos/admin-audit-query.dto";
import { Permissions } from "src/common/decorators/permissions.decorator";

@ApiTags("Admin Audit Logs")
@Controller("admin/audit-logs")
@Roles(UserRole.ADMIN)
@Permissions("admins.view")
export class AdminAuditController {
  constructor(private readonly auditService: AdminAuditService) {}

  @Get("/")
  @ApiOperation({
    summary: "List admin audit logs (immutable; filterable)",
  })
  async list(@Query() query: AdminAuditQueryDto) {
    return this.auditService.list(query);
  }

  @Get("/:id")
  @ApiOperation({ summary: "View a single audit log entry" })
  async getById(@Param("id", ParseUUIDPipe) id: string) {
    return this.auditService.getById(id);
  }
}
