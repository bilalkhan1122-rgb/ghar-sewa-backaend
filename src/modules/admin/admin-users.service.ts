import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { Logger } from "nestjs-pino";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminAuditService } from "src/common/services/admin-audit.service";
import { NotificationsService } from "../notifications/notifications.service";
import { FileUploadService } from "src/common/services/file-upload.service";
import { AdminUserQueryDto } from "./dtos/admin-user-query.dto";
import { AdminProviderQueryDto } from "./dtos/admin-provider-query.dto";
import { buildDateRange } from "./dtos/date-range.dto";
import {
  Prisma,
  User,
  UserRole,
  UserStatus,
  WalletTransactionType,
  NotificationType,
} from "generated/prisma/client";

/**
 * Module 17 — Admin User & Provider Management.
 *
 * Suspension, soft-delete, restore, listing, details and performance.
 * Every mutating action writes an immutable AdminAuditLog entry.
 */
/** Identity documents an admin may take down, keyed by their API name. */
const IDENTITY_DOCUMENT_FIELDS = {
  facePhoto: "facePhoto",
  cnicFront: "cnicFrontImage",
  cnicBack: "cnicBackImage",
} as const;

const IDENTITY_DOCUMENT_LABELS = {
  facePhoto: "face photo",
  cnicFront: "CNIC front image",
  cnicBack: "CNIC back image",
} as const;

export type IdentityDocument = keyof typeof IDENTITY_DOCUMENT_FIELDS;

/** The same keys as accepted path values, for ParseEnumPipe in the controller. */
export const IdentityDocumentParam = {
  facePhoto: "facePhoto",
  cnicFront: "cnicFront",
  cnicBack: "cnicBack",
} as const;

@Injectable()
export class AdminUsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AdminAuditService,
    private readonly notifications: NotificationsService,
    private readonly fileUpload: FileUploadService,
    private readonly logger: Logger,
  ) {}

  // ─── User Management ─────────────────────────────────────────────────

  async listUsers(query: AdminUserQueryDto) {
    const {
      page = 1,
      limit = 10,
      search,
      role,
      status,
      verificationStatus,
      deleted,
      dateFrom,
      dateTo,
    } = query;
    const skip = (page - 1) * limit;
    const deletedOnly = deleted === "true";

    const where: Prisma.UserWhereInput = {
      ...(role && { role }),
      ...(status && { status }),
      ...(verificationStatus && { verificationStatus }),
      ...(deletedOnly ? { deletedAt: { not: null } } : { deletedAt: null }),
      ...(dateFrom || dateTo
        ? { createdAt: buildDateRange(dateFrom, dateTo) }
        : {}),
      ...(search
        ? {
            OR: [
              { fullName: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
              { phone: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          city: { select: { id: true, name: true } },
          wallet: {
            select: {
              id: true,
              balance: true,
              heldBalance: true,
              status: true,
            },
          },
          ratingSummary: {
            select: { averageRating: true, totalReviews: true },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);
    return {
      data: data.map((u) => this.sanitize(u)),
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

  async getUserDetail(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        city: true,
        wallet: true,
        providerProfile: {
          include: {
            categories: { include: { category: true } },
            galleryImages: true,
          },
        },
        ratingSummary: true,
      },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const [jobCount, bookingCount, disputeCount, penaltyCount, reviewCount] =
      await Promise.all([
        this.prisma.job.count({ where: { customerId: userId } }),
        this.prisma.booking.count({
          where: { OR: [{ customerId: userId }, { providerId: userId }] },
        }),
        this.prisma.dispute.count({
          where: { OR: [{ raisedById: userId }, { opponentId: userId }] },
        }),
        this.prisma.providerPenalty.count({ where: { providerId: userId } }),
        this.prisma.review.count({ where: { revieweeId: userId } }),
      ]);

    return {
      ...this.sanitize(user),
      stats: {
        jobsPosted: jobCount,
        bookings: bookingCount,
        disputes: disputeCount,
        penalties: penaltyCount,
        reviewsReceived: reviewCount,
      },
    };
  }

  async suspendUser(adminId: string, userId: string, reason: string) {
    const user = await this.getUserOrThrow(userId);
    if (user.role === UserRole.ADMIN) {
      throw new BadRequestException("Admins cannot be suspended");
    }
    if (user.status === UserStatus.SUSPENDED) {
      throw new BadRequestException("User is already suspended");
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { status: UserStatus.SUSPENDED },
    });

    await this.prisma.refreshToken.deleteMany({ where: { userId } });
    await this.audit.record({
      adminId,
      action: "USER_SUSPENDED",
      entityType: "USER",
      entityId: userId,
      previousValues: { status: user.status },
      newValues: { status: UserStatus.SUSPENDED, reason },
    });
    void this.notifications.send({
      userId,
      type: NotificationType.SYSTEM_ANNOUNCEMENT,
      title: "Account suspended ⚠️",
      message: `Your account has been suspended. Reason: ${reason}`,
      relatedEntityType: "USER",
      relatedEntityId: userId,
      force: true,
    });
    this.logger.log({
      message: "User suspended by admin",
      adminId,
      userId,
      reason,
    });

    return { message: "User suspended", user: this.sanitize(updated) };
  }

  async unsuspendUser(adminId: string, userId: string) {
    const user = await this.getUserOrThrow(userId);
    if (user.status !== UserStatus.SUSPENDED) {
      throw new BadRequestException("User is not suspended");
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { status: UserStatus.ACTIVE },
    });

    await this.audit.record({
      adminId,
      action: "USER_UNSUSPENDED",
      entityType: "USER",
      entityId: userId,
      previousValues: { status: user.status },
      newValues: { status: UserStatus.ACTIVE },
    });
    void this.notifications.send({
      userId,
      type: NotificationType.SYSTEM_ANNOUNCEMENT,
      title: "Account reactivated ✅",
      message: "Your account has been reactivated.",
      relatedEntityType: "USER",
      relatedEntityId: userId,
      force: true,
    });

    return { message: "User unsuspended", user: this.sanitize(updated) };
  }

  async softDeleteUser(adminId: string, userId: string, reason: string) {
    const user = await this.getUserOrThrow(userId);
    if (user.role === UserRole.ADMIN) {
      throw new BadRequestException("Admins cannot be deleted");
    }
    if (!user.isActive) {
      throw new BadRequestException("User is already deleted");
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { isActive: false, deletedAt: new Date() },
    });
    await this.prisma.refreshToken.deleteMany({ where: { userId } });

    await this.audit.record({
      adminId,
      action: "USER_DELETED",
      entityType: "USER",
      entityId: userId,
      previousValues: { isActive: true, deletedAt: null },
      newValues: { isActive: false, deletedAt: updated.deletedAt, reason },
    });

    return { message: "User soft-deleted", user: this.sanitize(updated) };
  }

  async restoreUser(adminId: string, userId: string) {
    const user = await this.getUserOrThrow(userId);
    if (user.isActive) {
      throw new BadRequestException("User is not deleted");
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { isActive: true, deletedAt: null },
    });

    await this.audit.record({
      adminId,
      action: "USER_RESTORED",
      entityType: "USER",
      entityId: userId,
      previousValues: { isActive: false },
      newValues: { isActive: true, deletedAt: null },
    });

    return { message: "User restored", user: this.sanitize(updated) };
  }

  // ─── Profile Media Moderation ────────────────────────────────────────

  /**
   * Takes down a user's profile photo.
   *
   * The stored file is removed as well as the column, so a photo pulled for
   * being abusive does not stay fetchable at its blob URL by anyone who noted
   * it down. That makes this irreversible — the audit entry keeps the old path
   * for the record, but the bytes are gone.
   */
  async removeProfilePhoto(adminId: string, userId: string, reason: string) {
    const user = await this.getUserOrThrow(userId);
    if (!user.profilePhoto) {
      throw new BadRequestException("This user has no profile photo");
    }

    const previousPhoto = user.profilePhoto;
    // Column first: if the blob delete fails, a cleared column with an orphaned
    // file is recoverable, while a deleted file still referenced by the column
    // shows every viewer a broken image.
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { profilePhoto: null },
    });
    await this.fileUpload.deleteFile(previousPhoto);

    await this.audit.record({
      adminId,
      action: "USER_PROFILE_PHOTO_REMOVED",
      entityType: "USER",
      entityId: userId,
      previousValues: { profilePhoto: previousPhoto },
      newValues: { profilePhoto: null, reason },
    });
    void this.notifications.send({
      userId,
      type: NotificationType.SYSTEM_ANNOUNCEMENT,
      title: "Profile photo removed",
      message: `An administrator removed your profile photo. Reason: ${reason}`,
      relatedEntityType: "USER",
      relatedEntityId: userId,
      force: true,
    });
    this.logger.log({
      message: "Profile photo removed by admin",
      adminId,
      userId,
      reason,
    });

    return { message: "Profile photo removed", user: this.sanitize(updated) };
  }

  /**
   * Takes down one image from a provider's work gallery. Same irreversibility
   * as removeProfilePhoto.
   */
  async removeGalleryImage(
    adminId: string,
    userId: string,
    imageId: string,
    reason: string,
  ) {
    await this.getUserOrThrow(userId);

    const image = await this.prisma.galleryImage.findUnique({
      where: { id: imageId },
    });
    // Checked against the user in the path rather than trusting the image id
    // alone, so a mistyped id cannot delete some other provider's image.
    if (!image || image.providerId !== userId) {
      throw new NotFoundException("Gallery image not found for this user");
    }

    await this.prisma.galleryImage.delete({ where: { id: imageId } });
    await this.fileUpload.deleteFile(image.imageUrl);

    await this.audit.record({
      adminId,
      action: "USER_GALLERY_IMAGE_REMOVED",
      entityType: "USER",
      entityId: userId,
      previousValues: { imageId, imageUrl: image.imageUrl },
      newValues: { reason },
    });
    void this.notifications.send({
      userId,
      type: NotificationType.SYSTEM_ANNOUNCEMENT,
      title: "Gallery image removed",
      message: `An administrator removed one of your gallery images. Reason: ${reason}`,
      relatedEntityType: "USER",
      relatedEntityId: userId,
      force: true,
    });
    this.logger.log({
      message: "Gallery image removed by admin",
      adminId,
      userId,
      imageId,
      reason,
    });

    return { message: "Gallery image removed", imageId };
  }

  /**
   * Takes down one identity document (face photo or a CNIC side).
   *
   * Unlike the profile photo, each of these URLs is stored twice: once on the
   * ProviderProfile and again on every VerificationRequest that copied it at
   * submission time. Clearing only one side would leave the file still
   * reachable through the other, so every reference is cleared and each
   * distinct URL is deleted exactly once.
   *
   * The requests themselves are kept — status, reviewer and timestamps remain
   * auditable; only the image is purged. Verification status is deliberately
   * left alone: use Ban provider if the account should also lose access.
   */
  async removeIdentityDocument(
    adminId: string,
    userId: string,
    document: IdentityDocument,
    reason: string,
  ) {
    await this.getUserOrThrow(userId);

    const field = IDENTITY_DOCUMENT_FIELDS[document];
    const profile = await this.prisma.providerProfile.findUnique({
      where: { userId },
      select: { facePhoto: true, cnicFrontImage: true, cnicBackImage: true },
    });
    if (!profile) {
      throw new NotFoundException("Provider profile not found");
    }

    const requests = await this.prisma.verificationRequest.findMany({
      where: { providerId: userId, NOT: { [field]: null } },
      select: { id: true, [field]: true },
    });

    // A Set because the profile and every request normally hold the same URL —
    // deleting it once is enough, and a second delete would only log a miss.
    const urls = new Set<string>();
    if (profile[field]) urls.add(profile[field]);
    for (const request of requests) {
      const url = (request as Record<string, unknown>)[field];
      if (typeof url === "string" && url) urls.add(url);
    }

    if (urls.size === 0) {
      throw new BadRequestException(
        `This user has no ${IDENTITY_DOCUMENT_LABELS[document]} on file`,
      );
    }

    await this.prisma.providerProfile.update({
      where: { userId },
      data: { [field]: null },
    });
    if (requests.length > 0) {
      await this.prisma.verificationRequest.updateMany({
        where: { id: { in: requests.map((r) => r.id) } },
        data: { [field]: null },
      });
    }
    for (const url of urls) {
      await this.fileUpload.deleteFile(url);
    }

    await this.audit.record({
      adminId,
      action: "USER_IDENTITY_DOCUMENT_REMOVED",
      entityType: "USER",
      entityId: userId,
      previousValues: {
        document: field,
        urls: [...urls],
        verificationRequestIds: requests.map((r) => r.id),
      },
      newValues: { [field]: null, reason },
    });
    void this.notifications.send({
      userId,
      type: NotificationType.SYSTEM_ANNOUNCEMENT,
      title: "Identity document removed",
      message: `An administrator removed your ${IDENTITY_DOCUMENT_LABELS[document]}. Reason: ${reason}`,
      relatedEntityType: "USER",
      relatedEntityId: userId,
      force: true,
    });
    this.logger.log({
      message: "Identity document removed by admin",
      adminId,
      userId,
      document: field,
      filesDeleted: urls.size,
      reason,
    });

    return {
      message: `${IDENTITY_DOCUMENT_LABELS[document]} removed`,
      document,
      filesDeleted: urls.size,
    };
  }

  // ─── Provider Management ─────────────────────────────────────────────

  async listProviders(query: AdminProviderQueryDto) {
    const { page = 1, limit = 10, search, status, verificationStatus } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      role: UserRole.PROVIDER,
      deletedAt: null,
      ...(status && { status }),
      ...(verificationStatus && { verificationStatus }),
      ...(search
        ? {
            OR: [
              { fullName: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
              { phone: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          providerProfile: { select: { hourlyRate: true, cnicNumber: true } },
          wallet: {
            select: { balance: true, heldBalance: true, status: true },
          },
          ratingSummary: {
            select: { averageRating: true, totalReviews: true },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);
    return {
      data: data.map((u) => this.sanitize(u)),
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

  async getProviderDetail(providerId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: providerId },
      include: {
        providerProfile: {
          include: {
            categories: { include: { category: true } },
            galleryImages: true,
          },
        },
        wallet: true,
        ratingSummary: true,
        verificationRequests: { orderBy: { submittedAt: "desc" } },
      },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }

    const [completedJobs, activeBookings, cancellationCount, penaltyCount] =
      await Promise.all([
        this.prisma.booking.count({
          where: { providerId, status: "COMPLETED" },
        }),
        this.prisma.booking.count({
          where: { providerId, status: { in: ["ACCEPTED", "IN_PROGRESS"] } },
        }),
        this.prisma.cancellationRecord.count({
          where: { booking: { providerId } },
        }),
        this.prisma.providerPenalty.count({ where: { providerId } }),
      ]);

    return {
      ...this.sanitize(user),
      stats: { completedJobs, activeBookings, cancellationCount, penaltyCount },
    };
  }

  async getProviderDocuments(providerId: string) {
    const profile = await this.prisma.providerProfile.findUnique({
      where: { userId: providerId },
    });
    if (!profile) {
      throw new NotFoundException("Provider profile not found");
    }
    const requests = await this.prisma.verificationRequest.findMany({
      where: { providerId },
      orderBy: { submittedAt: "desc" },
      select: {
        id: true,
        status: true,
        facePhoto: true,
        cnicFrontImage: true,
        cnicBackImage: true,
        submittedAt: true,
        reviewedAt: true,
        reviewedBy: true,
        rejectionReason: true,
      },
    });

    return {
      providerId,
      profile: {
        facePhoto: profile.facePhoto,
        cnicFrontImage: profile.cnicFrontImage,
        cnicBackImage: profile.cnicBackImage,
      },
      verificationHistory: requests,
    };
  }

  async getProviderPerformance(providerId: string) {
    const provider = await this.prisma.user.findUnique({
      where: { id: providerId },
      include: { wallet: true, ratingSummary: true },
    });
    if (!provider || provider.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }

    const [completedJobs, activeBookings, cancellations, penalties, earnings] =
      await Promise.all([
        this.prisma.booking.count({
          where: { providerId, status: "COMPLETED" },
        }),
        this.prisma.booking.count({
          where: { providerId, status: { in: ["ACCEPTED", "IN_PROGRESS"] } },
        }),
        this.prisma.cancellationRecord.count({
          where: { booking: { providerId } },
        }),
        this.prisma.providerPenalty.findMany({
          where: { providerId },
          orderBy: { createdAt: "desc" },
          take: 10,
        }),
        this.prisma.walletTransaction.aggregate({
          where: {
            walletId: provider.wallet?.id ?? "__none__",
            type: WalletTransactionType.PROVIDER_EARNING,
          },
          _sum: { amount: true },
        }),
      ]);

    return {
      providerId,
      fullName: provider.fullName,
      rating: provider.ratingSummary?.averageRating ?? new Prisma.Decimal(0),
      totalReviews: provider.ratingSummary?.totalReviews ?? 0,
      jobsCompleted: completedJobs,
      activeBookings,
      walletBalance: provider.wallet?.balance ?? new Prisma.Decimal(0),
      heldBalance: provider.wallet?.heldBalance ?? new Prisma.Decimal(0),
      lifetimeEarnings: earnings._sum.amount ?? new Prisma.Decimal(0),
      cancellationCount: cancellations,
      penalties,
    };
  }

  async suspendProvider(adminId: string, providerId: string, reason: string) {
    const provider = await this.prisma.user.findUnique({
      where: { id: providerId },
    });
    if (!provider || provider.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }
    if (provider.status === UserStatus.SUSPENDED) {
      throw new BadRequestException("Provider is already suspended");
    }

    const updated = await this.prisma.user.update({
      where: { id: providerId },
      data: { status: UserStatus.SUSPENDED },
    });
    await this.prisma.refreshToken.deleteMany({
      where: { userId: providerId },
    });

    await this.audit.record({
      adminId,
      action: "PROVIDER_SUSPENDED",
      entityType: "PROVIDER",
      entityId: providerId,
      previousValues: { status: provider.status },
      newValues: { status: UserStatus.SUSPENDED, reason },
    });
    void this.notifications.send({
      userId: providerId,
      type: NotificationType.SYSTEM_ANNOUNCEMENT,
      title: "Account suspended ⚠️",
      message: `Your provider account has been suspended. Reason: ${reason}`,
      relatedEntityType: "PROVIDER",
      relatedEntityId: providerId,
      force: true,
    });

    return { message: "Provider suspended", provider: this.sanitize(updated) };
  }

  async unsuspendProvider(adminId: string, providerId: string) {
    const provider = await this.prisma.user.findUnique({
      where: { id: providerId },
    });
    if (!provider || provider.role !== UserRole.PROVIDER) {
      throw new NotFoundException("Provider not found");
    }
    if (provider.status !== UserStatus.SUSPENDED) {
      throw new BadRequestException("Provider is not suspended");
    }

    const updated = await this.prisma.user.update({
      where: { id: providerId },
      data: { status: UserStatus.ACTIVE },
    });

    await this.audit.record({
      adminId,
      action: "PROVIDER_UNSUSPENDED",
      entityType: "PROVIDER",
      entityId: providerId,
      previousValues: { status: provider.status },
      newValues: { status: UserStatus.ACTIVE },
    });
    void this.notifications.send({
      userId: providerId,
      type: NotificationType.SYSTEM_ANNOUNCEMENT,
      title: "Account reactivated ✅",
      message: "Your provider account has been reactivated.",
      relatedEntityType: "PROVIDER",
      relatedEntityId: providerId,
      force: true,
    });

    return {
      message: "Provider unsuspended",
      provider: this.sanitize(updated),
    };
  }

  // ─── Utils ───────────────────────────────────────────────────────────

  private async getUserOrThrow(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  private sanitize(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, refreshToken, ...safe } = user as User & {
      refreshToken?: string | null;
    };
    return safe;
  }
}
