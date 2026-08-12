import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/roles.decorator";
import { Permissions } from "src/common/decorators/permissions.decorator";
import { UserRole } from "generated/prisma/client";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsExportService } from "./analytics-export.service";
import { AnalyticsQueryDto } from "./dtos/analytics-query.dto";

/**
 * Module 21 — Analytics. Admin-only: customers and providers receive a 403
 * from the global RolesGuard. `analytics.view` permission is declared for
 * future granular admins; an empty permissions array (SUPER_ADMIN) keeps
 * current admins unaffected.
 */
@ApiTags("Admin Analytics")
@Controller("admin/analytics")
@Roles(UserRole.ADMIN)
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly exportService: AnalyticsExportService,
  ) {}

  @Permissions("analytics.view")
  @Get("/overview")
  @ApiOperation({ summary: "High-level dashboard statistics" })
  overview(@Query() dto: AnalyticsQueryDto) {
    return this.analyticsService.getOverview(dto);
  }

  @Permissions("analytics.view")
  @Get("/jobs")
  @ApiOperation({ summary: "Job metrics incl. daily/weekly/monthly series" })
  jobs(@Query() dto: AnalyticsQueryDto) {
    return this.analyticsService.getJobsAnalytics(dto);
  }

  @Permissions("analytics.view")
  @Get("/revenue")
  @ApiOperation({ summary: "Financial metrics from wallet transactions" })
  revenue(@Query() dto: AnalyticsQueryDto) {
    return this.analyticsService.getRevenueAnalytics(dto);
  }

  @Permissions("analytics.view")
  @Get("/providers")
  @ApiOperation({ summary: "Provider metrics and top providers" })
  providers(@Query() dto: AnalyticsQueryDto) {
    return this.analyticsService.getProviderAnalytics(dto);
  }

  @Permissions("analytics.view")
  @Get("/customers")
  @ApiOperation({ summary: "Customer metrics" })
  customers(@Query() dto: AnalyticsQueryDto) {
    return this.analyticsService.getCustomerAnalytics(dto);
  }

  @Permissions("analytics.view")
  @Get("/categories")
  @ApiOperation({ summary: "Category metrics (paginated)" })
  categories(@Query() dto: AnalyticsQueryDto) {
    return this.analyticsService.getCategoryAnalytics(dto);
  }

  @Permissions("analytics.view")
  @Get("/disputes")
  @ApiOperation({ summary: "Dispute metrics" })
  disputes(@Query() dto: AnalyticsQueryDto) {
    return this.analyticsService.getDisputeAnalytics(dto);
  }

  @Permissions("analytics.view")
  @Get("/bookings")
  @ApiOperation({ summary: "Booking lifecycle metrics" })
  bookings(@Query() dto: AnalyticsQueryDto) {
    return this.analyticsService.getBookingAnalytics(dto);
  }

  @Permissions("analytics.view")
  @Get("/export/csv")
  @ApiOperation({
    summary:
      "Export analytics as CSV. Returns { filename, mimeType, content } inside the standard API envelope — the client downloads `content` as a file.",
  })
  async exportCsv(@Query() dto: AnalyticsQueryDto) {
    return this.exportService.exportCsv(dto);
  }

  @Permissions("analytics.view")
  @Get("/export/pdf")
  @ApiOperation({
    summary:
      "Export analytics as PDF — placeholder until a PDF library is installed",
  })
  exportPdf() {
    return this.exportService.exportPdf();
  }
}
