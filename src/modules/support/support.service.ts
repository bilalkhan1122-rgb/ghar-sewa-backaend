import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FileUploadService } from "src/common/services/file-upload.service";
import { NotificationsService } from "../notifications/notifications.service";
import { CreateSupportReportDto } from "./dtos/create-support-report.dto";
import { SupportReportQueryDto } from "./dtos/support-report-query.dto";
import { UpdateSupportReportDto } from "./dtos/update-support-report.dto";
import { Logger } from "nestjs-pino";
import {
  NotificationType,
  Prisma,
  SupportReportStatus,
} from "generated/prisma/client";

/** Reporter-facing wording for each status the admin can set. */
const STATUS_MESSAGE: Record<SupportReportStatus, string> = {
  [SupportReportStatus.OPEN]: "Your report has been reopened.",
  [SupportReportStatus.IN_PROGRESS]: "Support is looking into your report.",
  [SupportReportStatus.RESOLVED]: "Your report has been resolved.",
  [SupportReportStatus.CLOSED]: "Your report has been closed.",
};

@Injectable()
export class SupportService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUpload: FileUploadService,
    private readonly notifications: NotificationsService,
    private readonly logger: Logger,
  ) {}

  private reportIncludes() {
    return {
      reporter: { select: { id: true, fullName: true, role: true } },
      aboutUser: { select: { id: true, fullName: true, role: true } },
    };
  }

  /**
   * Files a report. The screenshot is optional — most app bugs come with one,
   * most complaints about a person do not.
   */
  async create(
    userId: string,
    dto: CreateSupportReportDto,
    file?: Express.Multer.File,
  ) {
    const attachmentUrl = file
      ? await this.fileUpload.uploadEvidenceFile(file)
      : null;

    const report = await this.prisma.supportReport.create({
      data: {
        reporterId: userId,
        category: dto.category,
        subject: dto.subject,
        description: dto.description,
        aboutUserId: dto.aboutUserId ?? null,
        attachmentUrl,
      },
      include: this.reportIncludes(),
    });

    // Confirms receipt, so the report does not vanish into nothing from the
    // reporter's point of view. SYSTEM_ANNOUNCEMENT rather than a new
    // notification type: it maps to the SYSTEM category, which users cannot
    // switch off, and support replies must always arrive.
    void this.notifications.send({
      userId,
      type: NotificationType.SYSTEM_ANNOUNCEMENT,
      title: "Report received",
      message: `We have your report "${report.subject}". Support will follow up here.`,
      relatedEntityType: "SUPPORT_REPORT",
      relatedEntityId: report.id,
    });

    this.logger.log({
      message: "Support report filed",
      reportId: report.id,
      reporterId: userId,
      category: dto.category,
    });

    return report;
  }

  /** The caller's own reports, newest first. */
  async listMine(userId: string, query: SupportReportQueryDto) {
    const { page = 1, limit = 10, status, category } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.SupportReportWhereInput = {
      reporterId: userId,
      ...(status && { status }),
      ...(category && { category }),
    };

    const [data, total] = await Promise.all([
      this.prisma.supportReport.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: this.reportIncludes(),
      }),
      this.prisma.supportReport.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  async getMine(userId: string, reportId: string) {
    const report = await this.prisma.supportReport.findUnique({
      where: { id: reportId },
      include: this.reportIncludes(),
    });

    if (!report) {
      throw new NotFoundException("Report not found");
    }
    if (report.reporterId !== userId) {
      throw new ForbiddenException("You can only view your own reports");
    }

    return report;
  }

  // ─── Admin ───────────────────────────────────────────────────────────

  async adminList(query: SupportReportQueryDto) {
    const { page = 1, limit = 20, status, category } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.SupportReportWhereInput = {
      ...(status && { status }),
      ...(category && { category }),
    };

    const [data, total] = await Promise.all([
      this.prisma.supportReport.findMany({
        where,
        skip,
        take: limit,
        // Oldest open first: the queue is worked front to back.
        orderBy: [{ status: "asc" }, { createdAt: "asc" }],
        include: this.reportIncludes(),
      }),
      this.prisma.supportReport.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  async adminGet(reportId: string) {
    const report = await this.prisma.supportReport.findUnique({
      where: { id: reportId },
      include: this.reportIncludes(),
    });
    if (!report) {
      throw new NotFoundException("Report not found");
    }
    return report;
  }

  /** Moves a report along and tells the reporter it moved. */
  async adminUpdate(reportId: string, dto: UpdateSupportReportDto) {
    await this.adminGet(reportId);

    const resolved =
      dto.status === SupportReportStatus.RESOLVED ||
      dto.status === SupportReportStatus.CLOSED;

    const report = await this.prisma.supportReport.update({
      where: { id: reportId },
      data: {
        status: dto.status,
        ...(dto.adminNote !== undefined ? { adminNote: dto.adminNote } : {}),
        resolvedAt: resolved ? new Date() : null,
      },
      include: this.reportIncludes(),
    });

    void this.notifications.send({
      userId: report.reporterId,
      type: NotificationType.SYSTEM_ANNOUNCEMENT,
      title: "Report update",
      message: dto.adminNote?.trim() || STATUS_MESSAGE[dto.status],
      relatedEntityType: "SUPPORT_REPORT",
      relatedEntityId: report.id,
    });

    return report;
  }
}
