import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseUUIDPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from "@nestjs/swagger";
import { PenaltiesService } from "./penalties.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "generated/prisma/client";
import { CreateAppealDto } from "./dtos/create-appeal.dto";
import { PenaltyQueryDto, AppealQueryDto } from "./dtos/penalty-query.dto";

@ApiTags("Penalties (Provider)")
@Controller("provider")
@Roles(UserRole.PROVIDER)
export class ProviderPenaltiesController {
  constructor(private readonly penaltiesService: PenaltiesService) {}

  @Get("/penalties")
  @ApiOperation({
    summary: "View my penalty history (warnings, suspensions, bans)",
  })
  async listPenalties(
    @GetUser("sub") userId: string,
    @Query() query: PenaltyQueryDto,
  ) {
    return this.penaltiesService.listProviderPenalties(userId, query);
  }

  @Get("/penalties/active")
  @ApiOperation({ summary: "View my active penalties" })
  async getActivePenalties(@GetUser("sub") userId: string) {
    return this.penaltiesService.getActivePenalties(userId);
  }

  @Get("/cancellations")
  @ApiOperation({ summary: "View my previous cancellations" })
  async listCancellations(
    @GetUser("sub") userId: string,
    @Query() query: PenaltyQueryDto,
  ) {
    return this.penaltiesService.listProviderCancellations(userId, query);
  }

  @Post("/penalties/appeals")
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        penaltyId: { type: "string", format: "uuid" },
        explanation: { type: "string" },
        file: { type: "string", format: "binary" },
      },
    },
  })
  @ApiOperation({
    summary: "Submit an appeal against a penalty (optional file)",
  })
  async createAppeal(
    @GetUser("sub") userId: string,
    @Body() dto: CreateAppealDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif|mp4|webm|mov|pdf)$/,
            fallbackToMimetype: true,
          }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.penaltiesService.createAppeal(userId, dto, file);
  }

  @Get("/penalties/appeals")
  @ApiOperation({ summary: "View my appeals" })
  async listAppeals(
    @GetUser("sub") userId: string,
    @Query() query: AppealQueryDto,
  ) {
    return this.penaltiesService.listMyAppeals(userId, query);
  }

  @Get("/penalties/appeals/:id")
  @ApiOperation({ summary: "View a single appeal of mine" })
  async getAppeal(
    @GetUser("sub") userId: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.penaltiesService.getMyAppeal(userId, id);
  }
}
