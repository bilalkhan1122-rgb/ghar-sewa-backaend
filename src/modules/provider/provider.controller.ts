import {
  Controller,
  Get,
  Post,
  Query,
  Patch,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { ApiTags, ApiConsumes, ApiBody, ApiOperation } from "@nestjs/swagger";
import { ProviderService } from "./provider.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Public } from "src/common/decorators/public.decorator";
import { CompleteProviderProfileDto } from "./dtos/complete-provider-profile.dto";
import { UpdateProviderProfileDto } from "./dtos/update-provider-profile.dto";
import { AvailabilityDto } from "./dtos/availability.dto";
import { PublicProvidersQueryDto } from "./dtos/public-providers-query.dto";

@ApiTags("Provider")
@Controller("provider")
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  // ─── Profile Completion ──────────────────────────────────────────────

  @Post("/profile/complete")
  async completeProfile(
    @GetUser("sub") userId: string,
    @Body() dto: CompleteProviderProfileDto,
  ) {
    return this.providerService.completeProfile(userId, dto);
  }

  // ─── Get Profile ─────────────────────────────────────────────────────

  @Get("/profile")
  async getProfile(@GetUser("sub") userId: string) {
    return this.providerService.getProviderProfile(userId);
  }

  // ─── Update Profile ──────────────────────────────────────────────────

  @Patch("/profile/availability")
  @ApiOperation({ summary: "Go online or offline" })
  async setAvailability(
    @GetUser("sub") userId: string,
    @Body() dto: AvailabilityDto,
  ) {
    return this.providerService.setOnlineStatus(userId, dto.isOnline);
  }

  @Post("/profile/heartbeat")
  @ApiOperation({ summary: "Keep an online provider's presence fresh" })
  async heartbeat(@GetUser("sub") userId: string) {
    return this.providerService.heartbeat(userId);
  }

  @Patch("/profile")
  async updateProfile(
    @GetUser("sub") userId: string,
    @Body() dto: UpdateProviderProfileDto,
  ) {
    return this.providerService.updateProviderProfile(userId, dto);
  }

  // ─── Completion Progress ─────────────────────────────────────────────

  @Get("/profile/completion")
  async getCompletionProgress(@GetUser("sub") userId: string) {
    return this.providerService.getCompletionProgress(userId);
  }

  // ─── File Uploads ────────────────────────────────────────────────────

  @Post("/upload/face-photo")
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  async uploadFacePhoto(
    @GetUser("sub") userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif)$/,
            fallbackToMimetype: true,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.providerService.uploadFacePhoto(userId, file);
  }

  @Post("/upload/cnic-front")
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  async uploadCnicFront(
    @GetUser("sub") userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif)$/,
            fallbackToMimetype: true,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.providerService.uploadCnicFront(userId, file);
  }

  @Post("/upload/cnic-back")
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  async uploadCnicBack(
    @GetUser("sub") userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif)$/,
            fallbackToMimetype: true,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.providerService.uploadCnicBack(userId, file);
  }

  // ─── Verification ────────────────────────────────────────────────────

  @Post("/profile/submit-verification")
  async submitForVerification(@GetUser("sub") userId: string) {
    return this.providerService.submitForVerification(userId);
  }

  // ─── Gallery Management ──────────────────────────────────────────────

  @Post("/gallery")
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  async addGalleryImage(
    @GetUser("sub") userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif)$/,
            fallbackToMimetype: true,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.providerService.addGalleryImage(userId, file);
  }

  @Delete("/gallery/:imageId")
  async removeGalleryImage(
    @GetUser("sub") userId: string,
    @Param("imageId") imageId: string,
  ) {
    return this.providerService.removeGalleryImage(userId, imageId);
  }

  @Get("/gallery")
  async listGalleryImages(@GetUser("sub") userId: string) {
    return this.providerService.listGalleryImages(userId);
  }

  // ─── Dashboard ───────────────────────────────────────────────────────

  @Get("/dashboard")
  async getDashboardSummary(@GetUser("sub") userId: string) {
    return this.providerService.getDashboardSummary(userId);
  }

  // ─── Upload Profile Photo ────────────────────────────────────────────

  @Post("/upload/profile-photo")
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  async uploadProfilePhoto(
    @GetUser("sub") userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif)$/,
            fallbackToMimetype: true,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.providerService.uploadProfilePhoto(userId, file);
  }
}

// ─── Public Provider Profile (separate controller because of @Public) ──

@ApiTags("Provider (Public)")
@Controller("public")
export class PublicProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Public()
  @Get("/providers")
  @ApiOperation({
    summary:
      "Browse bookable providers — filtered, searched and sorted server-side",
  })
  async listProviders(@Query() query: PublicProvidersQueryDto) {
    return this.providerService.listPublicProviders(query);
  }

  // Declared after /providers so the literal path is not captured as an :id.
  @Public()
  @Get("/provider/:id")
  async getPublicProfile(@Param("id") id: string) {
    return this.providerService.getPublicProfile(id);
  }
}
