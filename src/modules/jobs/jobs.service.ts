import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FileUploadService } from "src/common/services/file-upload.service";
import { AdminAuditService } from "src/common/services/admin-audit.service";
import { CreateJobDto } from "./dtos/create-job.dto";
import { UpdateJobDto } from "./dtos/update-job.dto";
import { JobQueryDto, JobSortField } from "./dtos/job-query.dto";
import { Logger } from "nestjs-pino";
import {
  Prisma,
  JobStatus,
  BookingStatus,
  UserRole,
  UserStatus,
  VerificationStatus,
  NotificationType,
  CancellationType,
} from "generated/prisma/client";
import { NotificationsService } from "../notifications/notifications.service";
import { PenaltiesService } from "../penalties/penalties.service";
import { RealtimeService } from "../realtime/realtime.service";
import { WalletService } from "../wallet/wallet.service";
import { hasRole } from "src/common/roles";

// Module 20: urgent jobs expire in 6 hours, normal jobs in 24. The expiry
// is always computed server-side — the client can never submit one.
const JOB_EXPIRY_HOURS = 24;
const URGENT_JOB_EXPIRY_HOURS = 6;
const MAX_JOB_IMAGES = 5;

@Injectable()
export class JobsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUpload: FileUploadService,
    private readonly logger: Logger,
    private readonly notifications: NotificationsService,
    private readonly penalties: PenaltiesService,
    private readonly adminAudit: AdminAuditService,
    private readonly realtime: RealtimeService,
    private readonly wallet: WalletService,
  ) {}

  // ─── Helpers ─────────────────────────────────────────────────────────

  private calculateExpiry(isUrgent = false): Date {
    const hours = isUrgent ? URGENT_JOB_EXPIRY_HOURS : JOB_EXPIRY_HOURS;
    return new Date(Date.now() + hours * 60 * 60 * 1000);
  }

  private buildWhereForCustomer(
    userId: string,
    query: JobQueryDto,
  ): Prisma.JobWhereInput {
    const where: Prisma.JobWhereInput = {
      customerId: userId,
    };

    if (query.status) {
      where.status = query.status as JobStatus;
    }
    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }
    if (query.isUrgent !== undefined) {
      where.isUrgent = query.isUrgent;
    }
    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      where.offeredPrice = {};
      if (query.minPrice !== undefined) {
        where.offeredPrice.gte = query.minPrice;
      }
      if (query.maxPrice !== undefined) {
        where.offeredPrice.lte = query.maxPrice;
      }
    }

    return where;
  }

  /**
   * Checks a sub-type is real, active, and actually belongs to the category
   * the job is being filed under.
   *
   * The parent check is the important one: a sub-type id from a *different*
   * category passes a bare existence check and would quietly file the job as,
   * say, "AC Repair / Solar panel cleaning" — matching providers on one thing
   * and telling them another.
   */
  private async assertSubcategoryBelongsToCategory(
    categoryId: string,
    subcategoryId: string,
  ): Promise<void> {
    const subcategory = await this.prisma.serviceSubcategory.findUnique({
      where: { id: subcategoryId },
    });

    if (!subcategory || !subcategory.isActive) {
      throw new BadRequestException("Invalid or inactive subcategory");
    }

    if (subcategory.categoryId !== categoryId) {
      throw new BadRequestException(
        "The subcategory does not belong to the selected category",
      );
    }
  }

  // ─── Customer: Create Job ────────────────────────────────────────────

  async createJob(userId: string, dto: CreateJobDto) {
    // Validate category exists and is active
    const category = await this.prisma.serviceCategory.findUnique({
      where: { id: dto.categoryId },
    });
    if (!category || !category.isActive) {
      throw new BadRequestException("Invalid or inactive category");
    }

    if (dto.subcategoryId) {
      await this.assertSubcategoryBelongsToCategory(
        dto.categoryId,
        dto.subcategoryId,
      );
    }

    // The client-side check is a courtesy; this is the rule. What it enforces
    // depends on the admin's payment mode — a funded wallet under PREPAID, or
    // simply no unpaid bills under POSTPAID.
    await this.wallet.assertCanStartJob(userId, dto.offeredPrice);

    const job = await this.prisma.job.create({
      data: {
        customerId: userId,
        categoryId: dto.categoryId,
        subcategoryId: dto.subcategoryId ?? null,
        title: dto.title,
        description: dto.description,
        address: dto.address,
        latitude: dto.latitude,
        longitude: dto.longitude,
        offeredPrice: dto.offeredPrice,
        status: JobStatus.PENDING,
        // Module 20: urgent jobs get a 6h window instead of 24h — the expiry
        // timestamp is derived from the flag, never taken from the client.
        isUrgent: dto.isUrgent ?? false,
        expiresAt: this.calculateExpiry(dto.isUrgent),
        preferredSchedule: dto.preferredSchedule
          ? new Date(dto.preferredSchedule)
          : null,
        additionalNotes: dto.additionalNotes,
      },
      include: {
        category: true,
        subcategory: true,
        images: true,
      },
    });

    this.logger.log({
      message: "Job created",
      jobId: job.id,
      customerId: userId,
      categoryId: dto.categoryId,
    });

    // Notify matching providers (fire-and-forget)
    this.notifyMatchingProviders(job).catch((err) => {
      const error = err as { message?: string };
      this.logger.error(
        { err: error, jobId: job.id },
        "Failed to notify providers",
      );
    });

    return job;
  }

  // ─── Customer: Update Job ────────────────────────────────────────────

  async updateJob(userId: string, jobId: string, dto: UpdateJobDto) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new NotFoundException("Job not found");
    }

    if (job.customerId !== userId) {
      throw new ForbiddenException("You can only update your own jobs");
    }

    if (job.status !== JobStatus.PENDING) {
      throw new BadRequestException(
        "Jobs can only be edited while in PENDING status",
      );
    }

    // Module 20: urgency is fixed at creation (not updatable), so the fresh
    // expiry window always matches the job's original urgency. The client can
    // never extend a job's lifecycle by toggling urgency.
    const expiresAt = this.calculateExpiry(job.isUrgent);

    // Validate category if changing
    if (dto.categoryId) {
      const category = await this.prisma.serviceCategory.findUnique({
        where: { id: dto.categoryId },
      });
      if (!category || !category.isActive) {
        throw new BadRequestException("Invalid or inactive category");
      }
    }

    // A sub-type belongs to exactly one category, so it is validated against
    // wherever the job is *ending up*, not where it started.
    const effectiveCategoryId = dto.categoryId ?? job.categoryId;
    if (dto.subcategoryId) {
      await this.assertSubcategoryBelongsToCategory(
        effectiveCategoryId,
        dto.subcategoryId,
      );
    }

    // Moving a job to another category strands whatever sub-type it had, so
    // clear it rather than leave the job pointing at a sub-type of a category
    // it is no longer in. An explicit value above takes precedence.
    const movedCategories =
      dto.categoryId !== undefined && dto.categoryId !== job.categoryId;
    const subcategoryId =
      dto.subcategoryId !== undefined
        ? dto.subcategoryId
        : movedCategories
          ? null
          : undefined;

    const updated = await this.prisma.job.update({
      where: { id: jobId },
      data: {
        ...(dto.categoryId !== undefined && { categoryId: dto.categoryId }),
        ...(subcategoryId !== undefined && { subcategoryId }),
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.address !== undefined && { address: dto.address }),
        ...(dto.latitude !== undefined && { latitude: dto.latitude }),
        ...(dto.longitude !== undefined && { longitude: dto.longitude }),
        ...(dto.offeredPrice !== undefined && {
          offeredPrice: dto.offeredPrice,
        }),
        ...(dto.preferredSchedule !== undefined && {
          preferredSchedule: new Date(dto.preferredSchedule),
        }),
        ...(dto.additionalNotes !== undefined && {
          additionalNotes: dto.additionalNotes,
        }),
        expiresAt,
      },
      include: {
        category: true,
        subcategory: true,
        images: true,
      },
    });

    return updated;
  }

  // ─── Customer: Delete Job ────────────────────────────────────────────

  async deleteJob(userId: string, jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: { images: true },
    });

    if (!job) {
      throw new NotFoundException("Job not found");
    }

    if (job.customerId !== userId) {
      throw new ForbiddenException("You can only delete your own jobs");
    }

    if (job.status !== JobStatus.PENDING) {
      throw new BadRequestException(
        "Jobs can only be deleted while in PENDING status",
      );
    }

    // Delete associated images from disk
    for (const image of job.images) {
      await this.fileUpload.deleteFile(image.imageUrl).catch(() => {});
    }

    await this.prisma.job.delete({
      where: { id: jobId },
    });

    this.logger.log({
      message: "Job deleted",
      jobId,
      customerId: userId,
    });

    return { message: "Job deleted successfully" };
  }

  // ─── Customer: Cancel Job ────────────────────────────────────────────

  async cancelJob(userId: string, jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new NotFoundException("Job not found");
    }

    if (job.customerId !== userId) {
      throw new ForbiddenException("You can only cancel your own jobs");
    }

    if (job.status !== JobStatus.PENDING) {
      throw new BadRequestException("Only pending jobs can be cancelled");
    }

    const updated = await this.prisma.job.update({
      where: { id: jobId },
      data: { status: JobStatus.CANCELLED },
      include: { category: true, subcategory: true, images: true },
    });

    // Notify the customer that their job was cancelled
    void this.notifications.send({
      userId,
      type: NotificationType.JOB_CANCELLED,
      title: "Job cancelled",
      message: `Your job "${job.title}" has been cancelled.`,
      relatedEntityType: "JOB",
      relatedEntityId: jobId,
    });

    return updated;
  }

  // ─── Customer: Repost Expired Job ────────────────────────────────────

  async repostJob(userId: string, jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new NotFoundException("Job not found");
    }

    if (job.customerId !== userId) {
      throw new ForbiddenException("You can only repost your own jobs");
    }

    if (job.status !== JobStatus.EXPIRED) {
      throw new BadRequestException("Only expired jobs can be reposted");
    }

    const updated = await this.prisma.job.update({
      where: { id: jobId },
      data: {
        status: JobStatus.PENDING,
        // An urgent job stays urgent when reposted (same 6h window).
        expiresAt: this.calculateExpiry(job.isUrgent),
      },
      include: { category: true, subcategory: true, images: true },
    });

    this.logger.log({
      message: "Job reposted",
      jobId,
      customerId: userId,
    });

    return updated;
  }

  // ─── Customer: View Own Jobs ─────────────────────────────────────────

  async listMyJobs(userId: string, query: JobQueryDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = JobSortField.CREATED_AT,
      sortOrder = "desc",
    } = query;

    const skip = (page - 1) * limit;
    const where = this.buildWhereForCustomer(userId, query);

    const orderByField =
      sortBy === JobSortField.OFFERED_PRICE ? "offeredPrice" : "createdAt";

    const [jobs, total] = await Promise.all([
      this.prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderByField]: sortOrder },
        include: {
          category: true,
          subcategory: true,
          images: true,
          // The customer's list has to tell "the provider is still working on
          // it" apart from "the provider says it is done and it is waiting on
          // you" — the second is the only state where the customer has an
          // action to take, and money moves when they take it.
          //
          // The confirmation flags are the only fields that distinguish them.
          // A provider marking the work complete leaves `status` at
          // IN_PROGRESS and both `completedAt` and `confirmedAt` null, so a
          // list selecting only those three cannot see the difference at all.
          bookings: {
            where: { status: { not: BookingStatus.CANCELLED } },
            select: {
              id: true,
              status: true,
              completedAt: true,
              confirmedAt: true,
              providerConfirmedCompletion: true,
              customerConfirmedCompletion: true,
            },
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      }),
      this.prisma.job.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: jobs,
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

  // ─── Customer: View Single Job ───────────────────────────────────────

  async getJobById(userId: string, jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: {
        category: true,
        subcategory: true,
        images: true,
        customer: {
          select: {
            id: true,
            fullName: true,
            profilePhoto: true,
            phone: true,
            city: true,
          },
        },
      },
    });

    if (!job) {
      throw new NotFoundException("Job not found");
    }

    // Authorization: only customer (owner), or admin
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (job.customerId !== userId && user?.role !== UserRole.ADMIN) {
      throw new ForbiddenException("You do not have access to this job");
    }

    return job;
  }

  // ─── Provider: View Single Job ───────────────────────────────────────

  async getJobForProvider(providerId: string, jobId: string) {
    // Blocks suspended / banned providers (lazily expires finished suspensions)
    await this.penalties.assertProviderEligible(providerId);

    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: {
        category: true,
        subcategory: true,
        images: true,
        customer: {
          select: {
            id: true,
            fullName: true,
            profilePhoto: true,
            phone: true,
            city: true,
          },
        },
      },
    });

    if (!job) {
      throw new NotFoundException("Job not found");
    }

    // Verify provider is approved and profile is complete
    const provider = await this.prisma.user.findUnique({
      where: { id: providerId },
      include: {
        providerProfile: {
          include: { categories: true },
        },
      },
    });

    if (
      !provider ||
      !hasRole(provider, UserRole.PROVIDER) ||
      provider.verificationStatus !== VerificationStatus.APPROVED ||
      !provider.profileCompleted ||
      !provider.isActive
    ) {
      throw new ForbiddenException(
        "Access denied: provider is not fully approved",
      );
    }

    // Verify provider belongs to the job's category
    const providerCategoryIds =
      provider.providerProfile?.categories.map((c) => c.categoryId) || [];

    if (!providerCategoryIds.includes(job.categoryId)) {
      throw new ForbiddenException(
        "This job is not in your service categories",
      );
    }

    // Only show jobs that are pending and not expired
    if (job.status !== JobStatus.PENDING) {
      throw new NotFoundException("Job is no longer available");
    }

    if (job.expiresAt <= new Date()) {
      throw new NotFoundException("Job has expired");
    }

    return job;
  }

  // ─── Provider: View Matching Jobs ────────────────────────────────────

  async getProviderJobFeed(providerId: string, query: JobQueryDto) {
    // Blocks suspended / banned providers (lazily expires finished suspensions)
    await this.penalties.assertProviderEligible(providerId);

    const {
      page = 1,
      limit = 10,
      categoryId,
      minPrice,
      maxPrice,
      sortBy = JobSortField.CREATED_AT,
      sortOrder = "desc",
    } = query;

    // Validate provider is approved
    const provider = await this.prisma.user.findUnique({
      where: { id: providerId },
      include: {
        providerProfile: {
          include: {
            categories: true,
          },
        },
      },
    });

    if (!provider || !hasRole(provider, UserRole.PROVIDER)) {
      throw new NotFoundException("Provider not found");
    }

    if (
      provider.verificationStatus !== VerificationStatus.APPROVED ||
      !provider.profileCompleted ||
      !provider.isActive
    ) {
      throw new ForbiddenException(
        "Your profile must be approved and complete to view available jobs",
      );
    }

    // Get provider's category IDs
    const providerCategoryIds =
      provider.providerProfile?.categories.map((c) => c.categoryId) || [];

    if (providerCategoryIds.length === 0) {
      return {
        data: [],
        meta: {
          total: 0,
          page,
          limit,
          totalPages: 0,
          hasNext: false,
          hasPrevious: false,
        },
      };
    }

    const skip = (page - 1) * limit;

    const where: Prisma.JobWhereInput = {
      status: JobStatus.PENDING,
      categoryId: {
        in: categoryId ? [categoryId] : providerCategoryIds,
      },
      expiresAt: { gt: new Date() },
      // A direct booking creates its job as PENDING too, so without this the
      // job the customer offered to one specific provider also sat in every
      // other matching provider's open feed — where any of them could accept
      // or counter-offer a job that was already spoken for.
      //
      // CANCELLED and DISPUTED are absent on purpose: a declined direct
      // booking is cancelled, and the job should then return to the feed,
      // which is exactly what the provider's decline screen promises.
      bookings: {
        none: {
          status: {
            in: [
              BookingStatus.PENDING,
              BookingStatus.ACCEPTED,
              BookingStatus.IN_PROGRESS,
              BookingStatus.COMPLETED,
            ],
          },
        },
      },
      ...(minPrice !== undefined && {
        offeredPrice: { gte: minPrice },
      }),
      ...(maxPrice !== undefined && {
        offeredPrice: { lte: maxPrice },
      }),
      // If specific category requested, verify it's in provider's categories
      ...(categoryId && {
        categoryId,
      }),
    };

    const orderByField =
      sortBy === JobSortField.OFFERED_PRICE ? "offeredPrice" : "createdAt";

    // Module 20: urgent pending jobs always float to the top of the provider
    // feed, then newest (or price-sorted) within each group.
    const orderBy: Prisma.JobOrderByWithRelationInput[] = [
      { isUrgent: "desc" },
      { [orderByField]: sortOrder },
    ];

    const [jobs, total] = await Promise.all([
      this.prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          category: true,
          subcategory: true,
          images: true,
          customer: {
            select: {
              id: true,
              fullName: true,
              profilePhoto: true,
              city: true,
            },
          },
        },
      }),
      this.prisma.job.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: jobs,
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

  // ─── Image Management ────────────────────────────────────────────────

  async uploadJobImage(
    userId: string,
    jobId: string,
    file: Express.Multer.File,
  ) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: { images: true },
    });

    if (!job) {
      throw new NotFoundException("Job not found");
    }

    if (job.customerId !== userId) {
      throw new ForbiddenException("You can only add images to your own jobs");
    }

    if (job.status !== JobStatus.PENDING) {
      throw new BadRequestException("Images can only be added to pending jobs");
    }

    if (job.images.length >= MAX_JOB_IMAGES) {
      throw new BadRequestException(
        `Maximum ${MAX_JOB_IMAGES} images allowed per job`,
      );
    }

    // Validate file
    this.fileUpload.validateFile(file);

    // Ensure jobs subdirectory exists
    const imageUrl = await this.saveJobImage(file);

    const image = await this.prisma.jobImage.create({
      data: {
        jobId,
        imageUrl,
      },
    });

    return image;
  }

  async deleteJobImage(userId: string, jobId: string, imageId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new NotFoundException("Job not found");
    }

    if (job.customerId !== userId) {
      throw new ForbiddenException(
        "You can only delete images from your own jobs",
      );
    }

    const image = await this.prisma.jobImage.findUnique({
      where: { id: imageId },
    });

    if (!image || image.jobId !== jobId) {
      throw new NotFoundException("Image not found");
    }

    await this.fileUpload.deleteFile(image.imageUrl).catch(() => {});
    await this.prisma.jobImage.delete({
      where: { id: imageId },
    });

    return { message: "Image deleted successfully" };
  }

  async listJobImages(jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new NotFoundException("Job not found");
    }

    return this.prisma.jobImage.findMany({
      where: { jobId },
      orderBy: { createdAt: "desc" },
    });
  }

  private async saveJobImage(file: Express.Multer.File): Promise<string> {
    // Use gallery upload, which handles validation and saves to uploads/gallery/
    return this.fileUpload.uploadGalleryImage(file);
  }

  // ─── Admin: View All Jobs ────────────────────────────────────────────

  async adminListJobs(query: JobQueryDto) {
    const {
      page = 1,
      limit = 10,
      status,
      categoryId,
      subcategoryId,
      minPrice,
      maxPrice,
      search,
      customerId,
      providerId,
      cityId,
      dateFrom,
      dateTo,
      sortBy = JobSortField.CREATED_AT,
      sortOrder = "desc",
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.JobWhereInput = {};
    if (status) where.status = status as JobStatus;
    if (categoryId) where.categoryId = categoryId;
    if (subcategoryId) where.subcategoryId = subcategoryId;
    if (query.isUrgent !== undefined) where.isUrgent = query.isUrgent;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.offeredPrice = {};
      if (minPrice !== undefined) where.offeredPrice.gte = minPrice;
      if (maxPrice !== undefined) where.offeredPrice.lte = maxPrice;
    }
    if (customerId) where.customerId = customerId;
    if (providerId) where.bookings = { some: { providerId } };
    if (cityId) where.customer = { cityId };
    if (dateFrom || dateTo) {
      where.createdAt = {
        ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
        ...(dateTo
          ? { lte: new Date(new Date(dateTo).setHours(23, 59, 59, 999)) }
          : {}),
      };
    }

    const orderByField =
      sortBy === JobSortField.OFFERED_PRICE ? "offeredPrice" : "createdAt";

    const [jobs, total] = await Promise.all([
      this.prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderByField]: sortOrder },
        include: {
          category: true,
          subcategory: true,
          images: true,
          customer: {
            select: {
              id: true,
              fullName: true,
              phone: true,
            },
          },
        },
      }),
      this.prisma.job.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: jobs,
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

  // ─── Admin: Job detail, timeline, cancel & force-close ──────────────

  async adminGetJobDetail(jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: {
        category: true,
        subcategory: true,
        images: true,
        customer: {
          select: { id: true, fullName: true, phone: true, email: true },
        },
        bids: {
          include: {
            provider: {
              select: { id: true, fullName: true, phone: true },
            },
          },
        },
        bookings: {
          include: {
            provider: { select: { id: true, fullName: true } },
            customer: { select: { id: true, fullName: true } },
          },
        },
        timeline: { orderBy: { createdAt: "asc" } },
      },
    });
    if (!job) {
      throw new NotFoundException("Job not found");
    }
    return job;
  }

  async adminGetJobTimeline(jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      select: { id: true, status: true },
    });
    if (!job) {
      throw new NotFoundException("Job not found");
    }
    const timeline = await this.prisma.jobTimeline.findMany({
      where: { jobId },
      orderBy: { createdAt: "asc" },
    });
    return {
      jobId,
      currentStatus: job.status,
      events: timeline.map((t) => ({
        event: t.event,
        description: t.description,
        timestamp: t.createdAt,
      })),
    };
  }

  /** Admin cancels a pending job (records a SYSTEM cancellation). */
  async adminCancelJob(adminId: string, jobId: string, reason: string) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      throw new NotFoundException("Job not found");
    }
    if (job.status !== JobStatus.PENDING) {
      throw new BadRequestException("Only pending jobs can be cancelled");
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      const updatedJob = await tx.job.update({
        where: { id: jobId },
        data: { status: JobStatus.CANCELLED },
      });
      await tx.cancellationRecord.create({
        data: {
          jobId,
          cancelledBy: adminId,
          cancellationType: CancellationType.SYSTEM,
          reason,
        },
      });
      await tx.jobTimeline.create({
        data: {
          jobId,
          event: "JOB_CANCELLED_BY_ADMIN",
          description: reason,
        },
      });
      return updatedJob;
    });

    void this.notifications.send({
      userId: job.customerId,
      type: NotificationType.JOB_CANCELLED,
      title: "Job cancelled by admin",
      message: `Your job "${job.title}" was cancelled. Reason: ${reason}`,
      relatedEntityType: "JOB",
      relatedEntityId: jobId,
    });
    await this.adminAudit.record({
      adminId,
      action: "JOB_CANCELLED",
      entityType: "JOB",
      entityId: jobId,
      newValues: { reason },
    });
    this.logger.log({
      message: "Job cancelled by admin",
      adminId,
      jobId,
      reason,
    });

    return updated;
  }

  /**
   * Force close a job in any non-terminal state. Cancels the job and any
   * active bookings, records a SYSTEM cancellation and timeline entry.
   */
  async adminForceCloseJob(adminId: string, jobId: string, reason: string) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      throw new NotFoundException("Job not found");
    }
    if (
      job.status === JobStatus.CANCELLED ||
      job.status === JobStatus.COMPLETED ||
      job.status === JobStatus.EXPIRED
    ) {
      throw new BadRequestException(
        `Job is already ${job.status.toLowerCase()} and cannot be force-closed`,
      );
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      const updatedJob = await tx.job.update({
        where: { id: jobId },
        data: { status: JobStatus.CANCELLED },
      });
      await tx.cancellationRecord.create({
        data: {
          jobId,
          cancelledBy: adminId,
          cancellationType: CancellationType.SYSTEM,
          reason,
        },
      });
      await tx.jobTimeline.create({
        data: {
          jobId,
          event: "JOB_FORCE_CLOSED",
          description: reason,
        },
      });
      await tx.booking.updateMany({
        where: {
          jobId,
          status: { in: [BookingStatus.ACCEPTED, BookingStatus.IN_PROGRESS] },
        },
        data: { status: BookingStatus.CANCELLED, cancelledAt: new Date() },
      });
      return updatedJob;
    });

    void this.notifications.send({
      userId: job.customerId,
      type: NotificationType.JOB_CANCELLED,
      title: "Job force-closed by admin",
      message: `Your job "${job.title}" was closed by the platform. Reason: ${reason}`,
      relatedEntityType: "JOB",
      relatedEntityId: jobId,
    });
    await this.adminAudit.record({
      adminId,
      action: "JOB_FORCE_CLOSED",
      entityType: "JOB",
      entityId: jobId,
      newValues: { reason },
    });
    this.logger.log({
      message: "Job force-closed by admin",
      adminId,
      jobId,
      reason,
    });

    return updated;
  }

  // ─── Expiry Job Cleanup ──────────────────────────────────────────────

  async expireOverdueJobs(): Promise<number> {
    const result = await this.prisma.job.updateMany({
      where: {
        status: JobStatus.PENDING,
        expiresAt: { lte: new Date() },
      },
      data: { status: JobStatus.EXPIRED },
    });

    if (result.count > 0) {
      // Fetch the expired jobs to notify their customers
      const expiredJobs = await this.prisma.job.findMany({
        where: {
          status: JobStatus.EXPIRED,
          expiresAt: { lte: new Date() },
        },
        select: { id: true, title: true, customerId: true, isUrgent: true },
      });

      await this.notifications.sendToMany(
        expiredJobs.map((j) => ({
          userId: j.customerId,
          type: NotificationType.JOB_EXPIRED,
          title: "Job expired",
          message: `Your job "${j.title}" expired without a provider. You can repost it.`,
          relatedEntityType: "JOB",
          relatedEntityId: j.id,
        })),
      );

      // Module 20 realtime: let the customer know their urgent job is gone
      // from the provider feeds (published after the status change commits).
      await Promise.all(
        expiredJobs
          .filter((j) => j.isUrgent)
          .map((j) =>
            this.realtime.publishUrgentJobExpired(j.customerId, {
              jobId: j.id,
              title: j.title,
              isUrgent: true,
              expiredAt: new Date(),
            }),
          ),
      );

      this.logger.log({
        message: "Expired overdue jobs",
        count: result.count,
      });
    }

    return result.count;
  }

  // ─── Notify Matching Providers ───────────────────────────────────────

  private async notifyMatchingProviders(job: {
    id: string;
    categoryId: string;
    title: string;
    offeredPrice: Prisma.Decimal;
    isUrgent: boolean;
    expiresAt: Date;
  }) {
    // Find all approved providers in this category
    const matchingProviders =
      await this.prisma.providerServiceCategory.findMany({
        where: {
          categoryId: job.categoryId,
          provider: {
            user: {
              roles: { has: UserRole.PROVIDER },
              isActive: true,
              status: UserStatus.ACTIVE,
              verificationStatus: VerificationStatus.APPROVED,
              profileCompleted: true,
            },
          },
        },
        include: {
          provider: {
            select: { userId: true },
          },
        },
      });

    // Notify all matching providers about the new job. Module 20: urgent
    // jobs use a dedicated notification type so clients can surface them
    // with high priority.
    await this.notifications.sendToMany(
      matchingProviders.map((match) => ({
        userId: match.provider.userId,
        type: job.isUrgent
          ? NotificationType.URGENT_JOB_POSTED
          : NotificationType.NEW_JOB,
        title: job.isUrgent
          ? "🚨 URGENT job in your area!"
          : "New job in your area! 🔨",
        message: job.isUrgent
          ? `URGENT: "${job.title}" — acts fast, it expires in 6 hours.`
          : `"${job.title}" — a new job matching your services is available.`,
        relatedEntityType: "JOB",
        relatedEntityId: job.id,
      })),
    );

    // Module 20 realtime: urgent jobs are pushed to each matching provider's
    // private channel (only eligible providers ever receive the event).
    // Published AFTER the notification rows exist — never before.
    // RealtimeService.publish never rejects; failures are logged + swallowed.
    if (job.isUrgent) {
      await Promise.all(
        matchingProviders.map((match) =>
          this.realtime.publishUrgentJobCreated(match.provider.userId, {
            jobId: job.id,
            title: job.title,
            categoryId: job.categoryId,
            offeredPrice: job.offeredPrice.toNumber(),
            isUrgent: true,
            expiresAt: job.expiresAt,
          }),
        ),
      );
    }

    this.logger.log({
      message: `Notified ${matchingProviders.length} providers about new job`,
      jobId: job.id,
      categoryId: job.categoryId,
      isUrgent: job.isUrgent,
    });
  }

  // ─── Job Statistics ──────────────────────────────────────────────────

  async getJobStats() {
    const [total, pending, active, completed, cancelled, expired, disputed] =
      await Promise.all([
        this.prisma.job.count(),
        this.prisma.job.count({ where: { status: JobStatus.PENDING } }),
        this.prisma.job.count({ where: { status: JobStatus.ACCEPTED } }),
        this.prisma.job.count({ where: { status: JobStatus.COMPLETED } }),
        this.prisma.job.count({ where: { status: JobStatus.CANCELLED } }),
        this.prisma.job.count({ where: { status: JobStatus.EXPIRED } }),
        this.prisma.job.count({ where: { status: JobStatus.DISPUTED } }),
      ]);

    return {
      total,
      pending,
      active,
      completed,
      cancelled,
      expired,
      disputed,
    };
  }
}
