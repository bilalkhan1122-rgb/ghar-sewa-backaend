import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FileUploadService } from "src/common/services/file-upload.service";
import { CompleteProviderProfileDto } from "./dtos/complete-provider-profile.dto";
import { UpdateProviderProfileDto } from "./dtos/update-provider-profile.dto";
import {
  Prisma,
  ProviderRank,
  UserRole,
  UserStatus,
  VerificationStatus,
  BookingStatus,
} from "generated/prisma/client";
import { VerificationService } from "../verification/verification.service";

@Injectable()
export class ProviderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUpload: FileUploadService,
    private readonly verification: VerificationService,
  ) {}

  private checkNotBanned(user: {
    verificationStatus: VerificationStatus;
  }): void {
    if (user.verificationStatus === VerificationStatus.BANNED) {
      throw new ForbiddenException(
        "Your account has been banned. You cannot access provider functionality.",
      );
    }
  }

  // ─── Profile Completion ───────────────────────────────────────────────

  async completeProfile(userId: string, dto: CompleteProviderProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }

    this.checkNotBanned(user);

    // Check for duplicate CNIC
    const existingCnic = await this.prisma.providerProfile.findUnique({
      where: { cnicNumber: dto.cnicNumber },
    });
    if (existingCnic && existingCnic.userId !== userId) {
      throw new ConflictException("CNIC number already in use");
    }

    // Check if provider already has a profile
    const existingProfile = await this.prisma.providerProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      // If CNIC changed and user was APPROVED, reset to PENDING and record
      // the change in the verification history (Module 11).
      if (
        existingProfile.cnicNumber !== dto.cnicNumber &&
        user.verificationStatus === VerificationStatus.APPROVED
      ) {
        await this.verification.onSensitiveInfoChanged(userId);
      }

      // Update existing profile
      await this.prisma.providerProfile.update({
        where: { userId },
        data: {
          bio: dto.bio,
          hourlyRate: dto.hourlyRate,
          serviceLocation: dto.serviceLocation,
          serviceRadius: dto.serviceRadius,
          cnicNumber: dto.cnicNumber,
        },
      });

      // Update categories
      await this.prisma.providerServiceCategory.deleteMany({
        where: { providerId: userId },
      });
      if (dto.categoryIds.length > 0) {
        await this.prisma.providerServiceCategory.createMany({
          data: dto.categoryIds.map((catId) => ({
            providerId: userId,
            categoryId: catId,
          })),
        });
      }

      // Recalculate completion
      await this.updateCompletionAndVerification(userId);

      return this.getProviderProfile(userId);
    }

    // Create new profile
    await this.prisma.providerProfile.create({
      data: {
        userId,
        bio: dto.bio,
        hourlyRate: dto.hourlyRate,
        serviceLocation: dto.serviceLocation,
        serviceRadius: dto.serviceRadius,
        cnicNumber: dto.cnicNumber,
      },
    });

    // Create category relations
    if (dto.categoryIds.length > 0) {
      await this.prisma.providerServiceCategory.createMany({
        data: dto.categoryIds.map((catId) => ({
          providerId: userId,
          categoryId: catId,
        })),
      });
    }

    // Recalculate completion
    await this.updateCompletionAndVerification(userId);

    return this.getProviderProfile(userId);
  }

  // ─── Get Provider Profile ────────────────────────────────────────────

  async getProviderProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        providerProfile: {
          include: {
            categories: {
              include: {
                category: true,
              },
            },
            galleryImages: true,
          },
        },
        city: true,
        providerRanking: true,
      },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }

    this.checkNotBanned(user);

    const profile = user.providerProfile;
    const completion = this.calculateCompletion(profile);

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      profilePhoto: user.profilePhoto,
      city: user.city,
      address: user.address,
      verificationStatus: user.verificationStatus,
      profileCompleted: user.profileCompleted,
      createdAt: user.createdAt,
      // Module 19: provider rank (snapshot values, never internal history)
      rank: user.providerRanking?.currentRank ?? ProviderRank.NONE,
      rankAchievedAt: user.providerRanking?.rankAchievedAt ?? null,
      rankCompletedJobs: user.providerRanking?.completedJobs ?? 0,
      rankAverageRating: user.providerRanking?.averageRating ?? 0,
      // Provider-specific fields
      profile: profile
        ? {
            bio: profile.bio,
            hourlyRate: profile.hourlyRate,
            serviceLocation: profile.serviceLocation,
            serviceRadius: profile.serviceRadius,
            facePhoto: profile.facePhoto,
            cnicNumber: profile.cnicNumber,
            cnicFrontImage: profile.cnicFrontImage,
            cnicBackImage: profile.cnicBackImage,
            categories: profile.categories.map((pc) => pc.category),
            galleryImages: profile.galleryImages,
            completionPercentage: completion.percentage,
            completedFields: completion.completedFields,
            missingFields: completion.missingFields,
          }
        : null,
    };
  }

  // ─── Update Provider Profile ─────────────────────────────────────────

  async updateProviderProfile(userId: string, dto: UpdateProviderProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { providerProfile: true },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }

    this.checkNotBanned(user);

    if (!user.providerProfile) {
      throw new BadRequestException(
        "Complete your profile first using the profile completion endpoint",
      );
    }

    const updateData: Record<string, unknown> = {};
    if (dto.bio !== undefined) updateData.bio = dto.bio;
    if (dto.hourlyRate !== undefined) updateData.hourlyRate = dto.hourlyRate;
    if (dto.serviceLocation !== undefined)
      updateData.serviceLocation = dto.serviceLocation;
    if (dto.serviceRadius !== undefined)
      updateData.serviceRadius = dto.serviceRadius;

    if (Object.keys(updateData).length > 0) {
      await this.prisma.providerProfile.update({
        where: { userId },
        data: updateData,
      });
    }

    // Update categories if provided
    if (dto.categoryIds && dto.categoryIds.length > 0) {
      await this.prisma.providerServiceCategory.deleteMany({
        where: { providerId: userId },
      });
      await this.prisma.providerServiceCategory.createMany({
        data: dto.categoryIds.map((catId) => ({
          providerId: userId,
          categoryId: catId,
        })),
      });
    }

    // Recalculate completion & verification status
    await this.updateCompletionAndVerification(userId);

    return this.getProviderProfile(userId);
  }

  // ─── Profile Completion Progress ─────────────────────────────────────

  async getCompletionProgress(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { providerProfile: true },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }

    this.checkNotBanned(user);

    const profile = user.providerProfile;
    const completion = this.calculateCompletion(profile);

    return {
      completionPercentage: completion.percentage,
      completedFields: completion.completedFields,
      missingFields: completion.missingFields,
      verificationStatus: user.verificationStatus,
    };
  }

  // ─── Upload Face Photo ───────────────────────────────────────────────

  async uploadFacePhoto(userId: string, file: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { providerProfile: true },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }

    this.checkNotBanned(user);

    let providerProfile = user.providerProfile;
    if (!providerProfile) {
      providerProfile = await this.prisma.providerProfile.create({
        data: { userId },
      });
    }

    const oldPhoto = providerProfile.facePhoto;
    const fileUrl = await this.fileUpload.replaceFile(oldPhoto, file, "faces");

    await this.prisma.providerProfile.update({
      where: { userId },
      data: { facePhoto: fileUrl },
    });

    // If previously APPROVED and sensitive data changed, set back to PENDING
    // and record the change in the verification history (Module 11).
    if (user.verificationStatus === VerificationStatus.APPROVED) {
      await this.verification.onSensitiveInfoChanged(userId);
    }

    await this.updateCompletionAndVerification(userId);

    return { facePhoto: fileUrl };
  }

  // ─── Upload CNIC Images ──────────────────────────────────────────────

  async uploadCnicFront(userId: string, file: Express.Multer.File) {
    return this.uploadCnicImage(userId, file, "cnicFrontImage");
  }

  async uploadCnicBack(userId: string, file: Express.Multer.File) {
    return this.uploadCnicImage(userId, file, "cnicBackImage");
  }

  private async uploadCnicImage(
    userId: string,
    file: Express.Multer.File,
    field: "cnicFrontImage" | "cnicBackImage",
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { providerProfile: true },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }

    this.checkNotBanned(user);

    let providerProfile = user.providerProfile;
    if (!providerProfile) {
      providerProfile = await this.prisma.providerProfile.create({
        data: { userId },
      });
    }

    const oldImage = providerProfile[field];
    const fileUrl = await this.fileUpload.replaceFile(oldImage, file, "cnic");

    await this.prisma.providerProfile.update({
      where: { userId },
      data: { [field]: fileUrl },
    });

    // If previously APPROVED and sensitive data changed, set back to PENDING
    // and record the change in the verification history (Module 11).
    if (user.verificationStatus === VerificationStatus.APPROVED) {
      await this.verification.onSensitiveInfoChanged(userId);
    }

    await this.updateCompletionAndVerification(userId);

    return { [field]: fileUrl };
  }

  // ─── Submit for Verification ─────────────────────────────────────────

  // Delegates to the Verification module (Module 11), which validates
  // profile completion, enforces the duplicate-pending rule, creates the
  // VerificationRequest record and preserves verification history.
  async submitForVerification(userId: string) {
    return this.verification.submit(userId);
  }

  // ─── Gallery Management ──────────────────────────────────────────────

  async addGalleryImage(userId: string, file: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { providerProfile: true },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }

    this.checkNotBanned(user);

    let providerProfile = user.providerProfile;
    if (!providerProfile) {
      providerProfile = await this.prisma.providerProfile.create({
        data: { userId },
      });
    }

    // Check max images (10)
    const imageCount = await this.prisma.galleryImage.count({
      where: { providerId: userId },
    });
    const maxImages = 10;
    if (imageCount >= maxImages) {
      throw new BadRequestException(
        `Maximum ${maxImages} gallery images allowed`,
      );
    }

    const imageUrl = await this.fileUpload.uploadGalleryImage(file);

    const image = await this.prisma.galleryImage.create({
      data: {
        providerId: userId,
        imageUrl,
      },
    });

    return image;
  }

  async removeGalleryImage(userId: string, imageId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }

    this.checkNotBanned(user);

    const image = await this.prisma.galleryImage.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      throw new NotFoundException("Gallery image not found");
    }

    if (image.providerId !== userId) {
      throw new ForbiddenException(
        "You can only remove your own gallery images",
      );
    }

    // Delete the file
    await this.fileUpload.deleteFile(image.imageUrl);

    // Delete the record
    await this.prisma.galleryImage.delete({
      where: { id: imageId },
    });

    return { message: "Gallery image removed successfully" };
  }

  async listGalleryImages(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }

    this.checkNotBanned(user);

    return this.prisma.galleryImage.findMany({
      where: { providerId: userId },
      orderBy: { createdAt: "desc" },
    });
  }

  // ─── Public Provider Profile ─────────────────────────────────────────

  // ─── Public: browse all providers ────────────────────────────────────

  /**
   * Every bookable provider, optionally narrowed by service or search term.
   *
   * The visibility rules match the per-category listing and what booking
   * requires, so a provider shown here can always actually be booked.
   */
  async listPublicProviders(params: {
    page?: number;
    limit?: number;
    categoryId?: string;
    search?: string;
    sortBy?: 'rating' | 'name' | 'price';
  }) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const skip = (page - 1) * limit;
    const search = params.search?.trim();

    const where: Prisma.UserWhereInput = {
      role: UserRole.PROVIDER,
      isActive: true,
      status: UserStatus.ACTIVE,
      verificationStatus: VerificationStatus.APPROVED,
      profileCompleted: true,
      ...(params.categoryId && {
        providerProfile: {
          categories: { some: { categoryId: params.categoryId } },
        },
      }),
      ...(search && {
        OR: [
          { fullName: { contains: search, mode: 'insensitive' as const } },
          {
            providerProfile: {
              serviceLocation: { contains: search, mode: 'insensitive' as const },
            },
          },
        ],
      }),
    };

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        include: {
          city: true,
          ratingSummary: true,
          providerProfile: { include: { categories: true } },
        },
        orderBy:
          params.sortBy === 'name'
            ? { fullName: 'asc' }
            : params.sortBy === 'price'
              ? { providerProfile: { hourlyRate: 'asc' } }
              : { ratingSummary: { averageRating: 'desc' } },
      }),
      this.prisma.user.count({ where }),
    ]);

    const rows = users.map((u) => ({
      id: u.id,
      fullName: u.fullName,
      profilePhoto: u.profilePhoto,
      bio: u.providerProfile?.bio ?? null,
      hourlyRate: u.providerProfile?.hourlyRate ?? null,
      serviceLocation: u.providerProfile?.serviceLocation ?? null,
      serviceRadius: u.providerProfile?.serviceRadius ?? null,
      city: u.city,
      rating: u.ratingSummary?.averageRating ?? 0,
      totalReviews: u.ratingSummary?.totalReviews ?? 0,
    }));

    // Postgres sorts NULLs first on DESC, so providers with no ratings yet came
    // back above the highest-rated ones under "Top rated". Prisma cannot express
    // nulls-last through a relation, so the page is reordered here.
    const data =
      params.sortBy === 'name' || params.sortBy === 'price'
        ? rows
        : [...rows].sort((a, b) => Number(b.rating) - Number(a.rating));

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

  async getPublicProfile(providerId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: providerId },
      include: {
        providerProfile: {
          include: {
            categories: {
              include: {
                category: true,
              },
            },
            galleryImages: true,
          },
        },
        city: true,
        ratingSummary: true,
        providerRanking: true,
      },
    });

    if (
      !user ||
      user.role !== UserRole.PROVIDER ||
      user.status !== UserStatus.ACTIVE ||
      user.verificationStatus !== VerificationStatus.APPROVED ||
      !user.isActive
    ) {
      throw new NotFoundException("Provider not found");
    }

    const profile = user.providerProfile;
    if (!profile) {
      throw new NotFoundException("Provider profile not found");
    }

    // Get completed jobs count and average rating
    const bookingStats = await this.getProviderBookingStats(providerId);

    return {
      id: user.id,
      fullName: user.fullName,
      profilePhoto: user.profilePhoto,
      bio: profile.bio,
      hourlyRate: profile.hourlyRate,
      serviceLocation: profile.serviceLocation,
      serviceRadius: profile.serviceRadius,
      categories: profile.categories.map((pc) => pc.category),
      galleryImages: profile.galleryImages,
      city: user.city,
      verificationStatus: user.verificationStatus,
      // Stats
      rating: user.ratingSummary?.averageRating ?? 0,
      totalReviews: user.ratingSummary?.totalReviews ?? 0,
      ratingDistribution: {
        fiveStar: user.ratingSummary?.fiveStarCount ?? 0,
        fourStar: user.ratingSummary?.fourStarCount ?? 0,
        threeStar: user.ratingSummary?.threeStarCount ?? 0,
        twoStar: user.ratingSummary?.twoStarCount ?? 0,
        oneStar: user.ratingSummary?.oneStarCount ?? 0,
      },
      totalCompletedJobs: bookingStats.completedJobs,
      // Module 19: rank badge shown to customers browsing providers
      rank: user.providerRanking?.currentRank ?? ProviderRank.NONE,
    };
  }

  // ─── Provider Dashboard Summary ──────────────────────────────────────

  async getDashboardSummary(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        providerProfile: {
          include: {
            categories: {
              include: { category: true },
            },
          },
        },
        ratingSummary: true,
        providerRanking: true,
        wallet: {
          select: {
            balance: true,
            heldBalance: true,
            lifetimeCredits: true,
          },
        },
      },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }

    this.checkNotBanned(user);

    const profile = user.providerProfile;
    const completion = profile
      ? this.calculateCompletion(profile)
      : {
          percentage: 0,
          completedFields: [],
          missingFields: this.getAllRequiredFields(),
        };

    const bookingStats = await this.getProviderBookingStats(userId);

    return {
      profileCompletion: completion.percentage,
      verificationStatus: user.verificationStatus,
      totalJobs: bookingStats.totalJobs,
      activeJobs: bookingStats.activeJobs,
      completedJobs: bookingStats.completedJobs,
      rating: user.ratingSummary?.averageRating ?? 0,
      totalReviews: user.ratingSummary?.totalReviews ?? 0,
      ratingDistribution: {
        fiveStar: user.ratingSummary?.fiveStarCount ?? 0,
        fourStar: user.ratingSummary?.fourStarCount ?? 0,
        threeStar: user.ratingSummary?.threeStarCount ?? 0,
        twoStar: user.ratingSummary?.twoStarCount ?? 0,
        oneStar: user.ratingSummary?.oneStarCount ?? 0,
      },
      walletBalance: user.wallet?.balance ?? user.walletBalance,
      heldBalance: user.wallet?.heldBalance ?? new Prisma.Decimal(0),
      totalEarnings: user.wallet?.lifetimeCredits ?? user.totalSpent,
      categories: profile?.categories.map((pc) => pc.category) || [],
      // Module 19: provider rank
      rank: user.providerRanking?.currentRank ?? ProviderRank.NONE,
    };
  }

  // ─── Upload Profile Photo ────────────────────────────────────────────

  async uploadProfilePhoto(userId: string, file: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }

    this.checkNotBanned(user);

    const fileUrl = await this.fileUpload.replaceFile(
      user.profilePhoto,
      file,
      "profiles",
    );

    await this.prisma.user.update({
      where: { id: userId },
      data: { profilePhoto: fileUrl },
    });

    return { profilePhoto: fileUrl };
  }

  // ─── Private Helpers ─────────────────────────────────────────────────

  private calculateCompletion(
    profile: {
      facePhoto: string | null;
      cnicNumber: string | null;
      cnicFrontImage: string | null;
      cnicBackImage: string | null;
      bio: string | null;
      hourlyRate: unknown;
      serviceLocation: string | null;
      categories?: { categoryId: string }[];
    } | null,
  ) {
    const fields: { name: string; completed: boolean }[] = [
      { name: "facePhoto", completed: !!profile?.facePhoto },
      { name: "cnicNumber", completed: !!profile?.cnicNumber },
      { name: "cnicFrontImage", completed: !!profile?.cnicFrontImage },
      { name: "cnicBackImage", completed: !!profile?.cnicBackImage },
      { name: "bio", completed: !!profile?.bio },
      { name: "hourlyRate", completed: profile?.hourlyRate != null },
      { name: "serviceLocation", completed: !!profile?.serviceLocation },
      { name: "categories", completed: (profile?.categories?.length ?? 0) > 0 },
    ];

    const completedFields = fields
      .filter((f) => f.completed)
      .map((f) => f.name);
    const missingFields = fields.filter((f) => !f.completed).map((f) => f.name);

    const completedCount = completedFields.length;
    const totalFields = fields.length;
    const percentage = Math.round((completedCount / totalFields) * 100);

    return {
      percentage,
      completedFields,
      missingFields,
    };
  }

  private getAllRequiredFields(): string[] {
    return [
      "facePhoto",
      "cnicNumber",
      "cnicFrontImage",
      "cnicBackImage",
      "bio",
      "hourlyRate",
      "serviceLocation",
      "categories",
    ];
  }

  private async updateCompletionAndVerification(userId: string) {
    const profile = await this.prisma.providerProfile.findUnique({
      where: { userId },
      include: {
        categories: true,
      },
    });

    if (!profile) return;

    const completion = this.calculateCompletion(profile);
    const isComplete = completion.percentage >= 100;

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        profileCompleted: isComplete,
      },
    });

    // If missing critical fields, set to INCOMPLETE
    if (!isComplete) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (
        user &&
        user.verificationStatus !== VerificationStatus.REJECTED &&
        user.verificationStatus !== VerificationStatus.BANNED
      ) {
        if (!profile.cnicNumber || !profile.facePhoto) {
          await this.prisma.user.update({
            where: { id: userId },
            data: { verificationStatus: VerificationStatus.INCOMPLETE },
          });
        }
      }
    }
  }

  private async getProviderBookingStats(providerId: string) {
    const [totalJobs, activeJobs, completedJobs, cancelledJobs, disputedJobs] =
      await Promise.all([
        this.prisma.booking.count({
          where: { providerId },
        }),
        // Everything still on the provider's plate, not just work already
        // started: a pending request and an accepted-but-not-started job both
        // need their attention, and counting only IN_PROGRESS showed
        // "0 active" while a request was sitting unanswered.
        this.prisma.booking.count({
          where: {
            providerId,
            status: {
              in: [
                BookingStatus.PENDING,
                BookingStatus.ACCEPTED,
                BookingStatus.IN_PROGRESS,
              ],
            },
          },
        }),
        this.prisma.booking.count({
          where: { providerId, status: BookingStatus.COMPLETED },
        }),
        this.prisma.booking.count({
          where: { providerId, status: BookingStatus.CANCELLED },
        }),
        this.prisma.booking.count({
          where: { providerId, status: BookingStatus.DISPUTED },
        }),
      ]);

    return {
      totalJobs,
      activeJobs,
      completedJobs,
      cancelledJobs,
      disputedJobs,
    };
  }
}
