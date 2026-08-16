import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from "@nestjs/swagger";
import { SupportService } from "./support.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { Permissions } from "src/common/decorators/permissions.decorator";
import { UserRole } from "generated/prisma/client";
import { CreateSupportReportDto } from "./dtos/create-support-report.dto";
import { SupportReportQueryDto } from "./dtos/support-report-query.dto";
import { UpdateSupportReportDto } from "./dtos/update-support-report.dto";

/**
 * Reporting for both customers and providers — the Report screen in the app.
 *
 * Not role-scoped: a provider reporting a customer and a customer reporting a
 * provider are the same operation, and either may report a bug.
 */
@ApiTags("Support")
@Controller("support/reports")
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post("/")
  @ApiOperation({ summary: "File a report (problem, complaint or app bug)" })
  async create(
    @GetUser("sub") userId: string,
    @Body() dto: CreateSupportReportDto,
  ) {
    return this.supportService.create(userId, dto);
  }

  @Post("/with-attachment")
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" },
        category: { type: "string" },
        subject: { type: "string" },
        description: { type: "string" },
        aboutUserId: { type: "string" },
      },
    },
  })
  @ApiOperation({ summary: "File a report with a screenshot (max 10MB)" })
  async createWithAttachment(
    @GetUser("sub") userId: string,
    @Body() dto: CreateSupportReportDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif|pdf)$/,
            fallbackToMimetype: true,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.supportService.create(userId, dto, file);
  }

  @Get("/")
  @ApiOperation({ summary: "List my reports" })
  async listMine(
    @GetUser("sub") userId: string,
    @Query() query: SupportReportQueryDto,
  ) {
    return this.supportService.listMine(userId, query);
  }

  @Get("/:id")
  @ApiOperation({ summary: "View one of my reports" })
  async getMine(
    @GetUser("sub") userId: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.supportService.getMine(userId, id);
  }
}

/**
 * Admin queue. Filed under the disputes permissions rather than a new key:
 * support reports are complaint handling, the same people work them, and adding
 * action keys to the `reports` module would have read as a downgrade for every
 * admin already granted it.
 */
@ApiTags("Support (Admin)")
@Controller("admin/support/reports")
@Roles(UserRole.ADMIN)
@Permissions("disputes.view")
export class AdminSupportController {
  constructor(private readonly supportService: SupportService) {}

  @Get("/")
  @ApiOperation({ summary: "List reports, open ones first" })
  async list(@Query() query: SupportReportQueryDto) {
    return this.supportService.adminList(query);
  }

  @Get("/:id")
  @ApiOperation({ summary: "View a report" })
  async get(@Param("id", ParseUUIDPipe) id: string) {
    return this.supportService.adminGet(id);
  }

  @Patch("/:id")
  @Permissions("disputes.manage")
  @ApiOperation({ summary: "Update status and reply to the reporter" })
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateSupportReportDto,
  ) {
    return this.supportService.adminUpdate(id, dto);
  }
}
