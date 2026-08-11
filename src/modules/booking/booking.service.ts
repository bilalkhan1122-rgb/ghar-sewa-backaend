import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DirectBookingDto } from './dtos/direct-booking.dto';
import { BookingQueryDto, BookingSortField } from './dtos/booking-query.dto';
import { Logger } from 'nestjs-pino';
import {
  Prisma,
  JobStatus,
  BookingStatus,
  BookingType,
  BidStatus,
  UserRole,
  UserStatus,
  VerificationStatus,
  CancellationType,
  NotificationType,
} from 'generated/prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
import { PenaltiesService } from '../penalties/penalties.service';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly notifications: NotificationsService,
    private readonly penalties: PenaltiesService,
    private readonly wallet: WalletService,
  ) {}

  // ─── Direct Booking ──────────────────────────────────────────────────

  async createDirectBooking(customerId: string, dto: DirectBookingDto) {
    // Validate provider exists and is approved
    const provider = await this.prisma.user.findUnique({
      where: { id: dto.providerId },
      include: {
        providerProfile: {
          include: { categories: true },
        },
      },
    });

    if (
      !provider ||
      provider.role !== UserRole.PROVIDER ||
      provider.verificationStatus !== VerificationStatus.APPROVED ||
      provider.status !== UserStatus.ACTIVE ||
      !provider.profileCompleted ||
      !provider.isActive
    ) {
      throw new BadRequestException('Provider is not available');
    }

    // Validate provider has the selected category
    const providerCategoryIds =
      provider.providerProfile?.categories.map((c) => c.categoryId) || [];
    if (!providerCategoryIds.includes(dto.categoryId)) {
      throw new BadRequestException(
        'Provider does not offer the selected service category',
      );
    }

    // Validate category exists and is active
    const category = await this.prisma.serviceCategory.findUnique({
      where: { id: dto.categoryId },
    });
    if (!category || !category.isActive) {
      throw new BadRequestException('Invalid or inactive category');
    }

    // Create job, booking, and timeline in transaction
    const result = await this.prisma.$transaction(async (tx) => {
      // Create the job
      const job = await tx.job.create({
        data: {
          customerId,
          categoryId: dto.categoryId,
          title: dto.title,
          description: dto.description,
          address: dto.address,
          latitude: dto.latitude,
          longitude: dto.longitude,
          offeredPrice: dto.totalAmount,
          // Stays PENDING until the provider accepts the request.
          status: JobStatus.PENDING,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h expiry (kept for record)
        },
      });

      // Create the booking
      const booking = await tx.booking.create({
        data: {
          jobId: job.id,
          customerId,
          providerId: dto.providerId,
          bookingType: BookingType.DIRECT,
          totalAmount: dto.totalAmount,
          // The customer picked this provider; the provider has not agreed yet.
          // acceptedAt is deliberately left null until they do.
          status: BookingStatus.PENDING,
        },
      });

      // Record timeline
      await tx.jobTimeline.create({
        data: {
          jobId: job.id,
          event: 'JOB_CREATED',
          description: 'Job posted for direct booking',
        },
      });

      await tx.jobTimeline.create({
        data: {
          jobId: job.id,
          event: 'PROVIDER_REQUESTED',
          description: 'Customer requested this provider directly',
        },
      });

      return { job, booking };
    });

    this.logger.log({
      message: 'Direct booking created',
      jobId: result.job.id,
      bookingId: result.booking.id,
      customerId,
      providerId: dto.providerId,
      amount: dto.totalAmount,
    });

    // Only the provider is notified: nothing has been agreed yet, so telling
    // the customer their job was "accepted" would be untrue.
    void this.notifications.send({
      userId: dto.providerId,
      type: NotificationType.BOOKING_REQUESTED,
      title: 'New booking request 📅',
      message: `A customer requested you for "${dto.title}" (Rs. ${dto.totalAmount}). Accept or decline.`,
      relatedEntityType: 'BOOKING',
      relatedEntityId: result.booking.id,
    });

    return {
      job: result.job,
      booking: result.booking,
    };
  }

  // ─── Start Job (Provider) ──────────────────────────────────────────

  // ─── Provider: respond to a direct booking request ───────────────────

  /**
   * Accepts a direct booking. Until this happens the job is still PENDING and
   * nothing in the app claims the provider agreed.
   */
  async acceptBookingRequest(providerId: string, bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { job: true },
    });

    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.providerId !== providerId) {
      throw new ForbiddenException('You can only respond to your own booking requests');
    }
    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException(
        `This request is already ${booking.status.toLowerCase()}`,
      );
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.booking.update({
        where: { id: bookingId },
        data: { status: BookingStatus.ACCEPTED, acceptedAt: new Date() },
      });
      await tx.job.update({
        where: { id: booking.jobId },
        data: { status: JobStatus.ACCEPTED },
      });
      await tx.jobTimeline.create({
        data: {
          jobId: booking.jobId,
          event: 'PROVIDER_ASSIGNED',
          description: 'Provider accepted the booking request',
        },
      });
      return updated;
    });

    void this.notifications.send({
      userId: booking.customerId,
      type: NotificationType.BOOKING_CONFIRMED,
      title: 'Booking confirmed ✅',
      message: `Your provider accepted "${booking.job.title}".`,
      relatedEntityType: 'BOOKING',
      relatedEntityId: bookingId,
    });

    this.logger.log({
      message: 'Direct booking accepted',
      bookingId,
      jobId: booking.jobId,
      providerId,
    });

    return result;
  }

  /**
   * Declines a direct booking. The job returns to the open pool rather than
   * being cancelled, so the customer can pick someone else or take bids.
   */
  async declineBookingRequest(providerId: string, bookingId: string, reason?: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { job: true },
    });

    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.providerId !== providerId) {
      throw new ForbiddenException('You can only respond to your own booking requests');
    }
    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException(
        `This request is already ${booking.status.toLowerCase()}`,
      );
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.booking.update({
        where: { id: bookingId },
        data: { status: BookingStatus.CANCELLED, cancelledAt: new Date() },
      });
      await tx.job.update({
        where: { id: booking.jobId },
        data: { status: JobStatus.PENDING, expiresAt: this.calculateExpiry() },
      });
      await tx.jobTimeline.create({
        data: {
          jobId: booking.jobId,
          event: 'PROVIDER_DECLINED',
          description: reason
            ? `Provider declined the request: ${reason}`
            : 'Provider declined the request',
        },
      });
      return updated;
    });

    void this.notifications.send({
      userId: booking.customerId,
      type: NotificationType.JOB_CANCELLED,
      title: 'Provider declined',
      message: `Your request for "${booking.job.title}" was declined. The job is open for other providers.`,
      relatedEntityType: 'JOB',
      relatedEntityId: booking.jobId,
    });

    this.logger.log({
      message: 'Direct booking declined',
      bookingId,
      jobId: booking.jobId,
      providerId,
    });

    return result;
  }

  async startJob(providerId: string, bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { job: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.providerId !== providerId) {
      throw new ForbiddenException('You can only start your own assigned jobs');
    }

    if (booking.status !== BookingStatus.ACCEPTED) {
      throw new BadRequestException(
        `Cannot start a booking that is ${booking.status.toLowerCase()}`,
      );
    }

    if (booking.job.status !== JobStatus.ACCEPTED) {
      throw new BadRequestException(
        `Job status must be ACCEPTED to start. Current: ${booking.job.status}`,
      );
    }

    const result = await this.prisma.$transaction(async (tx) => {
      // Update booking
      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.IN_PROGRESS,
          startedAt: new Date(),
        },
      });

      // Update job
      await tx.job.update({
        where: { id: booking.jobId },
        data: { status: JobStatus.IN_PROGRESS },
      });

      // Record timeline
      await tx.jobTimeline.create({
        data: {
          jobId: booking.jobId,
          event: 'WORK_STARTED',
          description: 'Provider started work',
        },
      });

      return updatedBooking;
    });

    this.logger.log({
      message: 'Work started',
      bookingId,
      jobId: booking.jobId,
      providerId,
    });

    // Notify the customer that work has started
    void this.notifications.send({
      userId: booking.customerId,
      type: NotificationType.JOB_STARTED,
      title: 'Work has started 🛠️',
      message: 'The provider has started work on your job.',
      relatedEntityType: 'BOOKING',
      relatedEntityId: bookingId,
    });

    return result;
  }

  // ─── Mark Job Completed (Provider) ───────────────────────────────────

  async markJobCompleted(providerId: string, bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { job: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.providerId !== providerId) {
      throw new ForbiddenException(
        'You can only mark your own assigned jobs as completed',
      );
    }

    if (booking.status !== BookingStatus.IN_PROGRESS) {
      throw new BadRequestException(
        `Cannot complete a booking that is ${booking.status.toLowerCase()}`,
      );
    }

    if (booking.job.status !== JobStatus.IN_PROGRESS) {
      throw new BadRequestException(
        `Job must be IN_PROGRESS to complete. Current: ${booking.job.status}`,
      );
    }

    // Mark as completed (both booking and job)
    const result = await this.prisma.$transaction(async (tx) => {
      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.COMPLETED,
          completedAt: new Date(),
        },
      });

      await tx.job.update({
        where: { id: booking.jobId },
        data: { status: JobStatus.COMPLETED },
      });

      // Record timeline
      await tx.jobTimeline.create({
        data: {
          jobId: booking.jobId,
          event: 'WORK_COMPLETED',
          description: 'Provider marked work as completed',
        },
      });

      // Emit placeholder for wallet module (Module 14)
      this.logger.log({
        message: 'WALLET_EVENT: Payment pending',
        bookingId,
        jobId: booking.jobId,
        customerId: booking.customerId,
        providerId,
        amount: booking.totalAmount.toNumber(),
        eventType: 'PAYMENT_RELEASE',
      });

      return updatedBooking;
    });

    this.logger.log({
      message: 'Job completed',
      bookingId,
      jobId: booking.jobId,
      providerId,
    });

    // Notify the customer that the job is done and needs confirmation
    void this.notifications.send({
      userId: booking.customerId,
      type: NotificationType.JOB_COMPLETED,
      title: 'Job completed ✅',
      message: 'The provider marked your job as completed. Please confirm.',
      relatedEntityType: 'BOOKING',
      relatedEntityId: bookingId,
    });

    return result;
  }

  // ─── Customer Confirm Completion ─────────────────────────────────────

  async confirmCompletion(customerId: string, bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { job: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.customerId !== customerId) {
      throw new ForbiddenException(
        'You can only confirm completion for your own bookings',
      );
    }

    if (booking.job.status !== JobStatus.COMPLETED) {
      throw new BadRequestException(
        'Provider must mark the job as completed first',
      );
    }

    if (booking.status !== BookingStatus.COMPLETED) {
      throw new BadRequestException(
        `Booking is in ${booking.status.toLowerCase()} status`,
      );
    }

    // Process the job payment first (Module 14): debits the customer wallet,
    // credits the provider (net of commission) and records the platform
    // commission — all atomically. Duplicate payments are impossible. Only
    // once money has actually moved do we record the confirmation below —
    // otherwise a failure here (e.g. insufficient balance) would leave the
    // booking looking confirmed while no payment ever went through.
    await this.wallet.processJobPayment(bookingId);

    // Record confirmation timestamp (anchors the 48h dispute window)
    await this.prisma.booking.update({
      where: { id: bookingId },
      data: { confirmedAt: new Date() },
    });

    // Record timeline
    await this.recordJobTimeline(
      booking.jobId,
      'CUSTOMER_CONFIRMED',
      'Customer confirmed job completion',
    );

    this.logger.log({
      message: 'Customer confirmed completion',
      bookingId,
      jobId: booking.jobId,
      customerId,
    });

    // Notify the provider that completion was confirmed
    void this.notifications.send({
      userId: booking.providerId,
      type: NotificationType.COMPLETION_CONFIRMED,
      title: 'Completion confirmed 🙌',
      message:
        'The customer confirmed your completed job. Payment will be released.',
      relatedEntityType: 'BOOKING',
      relatedEntityId: bookingId,
    });

    return {
      message: 'Job completion confirmed successfully',
      bookingId,
      jobId: booking.jobId,
    };
  }

  // ─── Cancel Booking (Customer - before work starts) ──────────────────

  async cancelBooking(customerId: string, bookingId: string, reason?: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { job: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.customerId !== customerId) {
      throw new ForbiddenException('You can only cancel your own bookings');
    }

    if (booking.status !== BookingStatus.ACCEPTED) {
      throw new BadRequestException(
        'Bookings can only be cancelled before work starts',
      );
    }

    const result = await this.prisma.$transaction(async (tx) => {
      // Cancel booking
      const cancelledBooking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.CANCELLED,
          cancelledAt: new Date(),
        },
      });

      // Update job back to PENDING
      await tx.job.update({
        where: { id: booking.jobId },
        data: { status: JobStatus.PENDING, expiresAt: this.calculateExpiry() },
      });

      // Record cancellation (customer cancellations carry no automatic penalty)
      await tx.cancellationRecord.create({
        data: {
          jobId: booking.jobId,
          bookingId,
          cancelledBy: 'CUSTOMER',
          cancellationType: CancellationType.CUSTOMER,
          reason: reason || 'Cancelled by customer before work started',
        },
      });

      // Record timeline
      await tx.jobTimeline.create({
        data: {
          jobId: booking.jobId,
          event: 'BOOKING_CANCELLED',
          description: 'Booking cancelled by customer',
        },
      });

      return cancelledBooking;
    });

    this.logger.log({
      message: 'Booking cancelled',
      bookingId,
      jobId: booking.jobId,
      customerId,
      reason,
    });

    // Notify the provider
    void this.notifications.send({
      userId: booking.providerId,
      type: NotificationType.JOB_CANCELLED,
      title: 'Booking cancelled',
      message: 'The customer cancelled the booking before work started.',
      relatedEntityType: 'BOOKING',
      relatedEntityId: bookingId,
    });

    return result;
  }

  // ─── Cancel Booking (Provider - before work starts) ──────────────────

  async cancelBookingByProvider(
    providerId: string,
    bookingId: string,
    reason?: string,
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { job: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.providerId !== providerId) {
      throw new ForbiddenException(
        'You can only cancel your own assigned bookings',
      );
    }

    if (booking.status !== BookingStatus.ACCEPTED) {
      throw new BadRequestException(
        'Bookings can only be cancelled before work starts',
      );
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const cancelledBooking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.CANCELLED,
          cancelledAt: new Date(),
        },
      });

      await tx.job.update({
        where: { id: booking.jobId },
        data: { status: JobStatus.PENDING, expiresAt: this.calculateExpiry() },
      });

      // Restore all bids to PENDING (including the winning bid)
      await tx.bid.updateMany({
        where: { jobId: booking.jobId },
        data: { status: BidStatus.PENDING },
      });

      const cancellation = await tx.cancellationRecord.create({
        data: {
          jobId: booking.jobId,
          bookingId,
          cancelledBy: 'PROVIDER',
          cancellationType: CancellationType.PROVIDER,
          reason: reason || 'Cancelled by provider before work started',
        },
      });

      await tx.jobTimeline.create({
        data: {
          jobId: booking.jobId,
          event: 'BOOKING_CANCELLED',
          description: 'Booking cancelled by provider',
        },
      });

      return { cancelledBooking, cancellation };
    });

    this.logger.log({
      message: 'Booking cancelled by provider',
      bookingId,
      jobId: booking.jobId,
      providerId,
      reason,
    });

    // Notify the customer
    void this.notifications.send({
      userId: booking.customerId,
      type: NotificationType.JOB_CANCELLED,
      title: 'Booking cancelled',
      message: 'The provider cancelled the booking before work started.',
      relatedEntityType: 'BOOKING',
      relatedEntityId: bookingId,
    });

    // Run the automatic penalty engine (Module 13) — evaluates and applies
    // the appropriate warning / suspension / ban for this cancellation.
    await this.penalties.evaluateProviderCancellation(
      providerId,
      result.cancellation.id,
      reason || 'Cancelled by provider before work started',
    );

    return result.cancelledBooking;
  }

  // ─── Customer: View Active Bookings ──────────────────────────────────

  async listCustomerBookings(customerId: string, query: BookingQueryDto) {
    const {
      page = 1,
      limit = 10,
      status,
      categoryId,
      dateFrom,
      dateTo,
      sortBy = BookingSortField.CREATED_AT,
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.BookingWhereInput = {
      customerId,
      ...(status && { status: status as BookingStatus }),
      ...(dateFrom || dateTo
        ? {
            createdAt: {
              ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
              ...(dateTo ? { lte: new Date(dateTo + 'T23:59:59Z') } : {}),
            },
          }
        : {}),
      ...(categoryId ? { job: { categoryId } } : {}),
    };

    const orderByField =
      sortBy === BookingSortField.TOTAL_AMOUNT ? 'totalAmount' : 'createdAt';

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderByField]: sortOrder },
        include: {
          job: {
            include: {
              category: true,
              images: { take: 1 },
            },
          },
          provider: {
            select: {
              id: true,
              fullName: true,
              profilePhoto: true,
              phone: true,
              city: true,
              providerProfile: {
                select: {
                  bio: true,
                  serviceLocation: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.booking.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: bookings,
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

  // ─── Provider: View Assigned Bookings ────────────────────────────────

  async listProviderBookings(providerId: string, query: BookingQueryDto) {
    const {
      page = 1,
      limit = 10,
      status,
      categoryId,
      dateFrom,
      dateTo,
      sortBy = BookingSortField.CREATED_AT,
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.BookingWhereInput = {
      providerId,
      ...(status && { status: status as BookingStatus }),
      ...(dateFrom || dateTo
        ? {
            createdAt: {
              ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
              ...(dateTo ? { lte: new Date(dateTo + 'T23:59:59Z') } : {}),
            },
          }
        : {}),
      ...(categoryId ? { job: { categoryId } } : {}),
    };

    const orderByField =
      sortBy === BookingSortField.TOTAL_AMOUNT ? 'totalAmount' : 'createdAt';

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderByField]: sortOrder },
        include: {
          job: {
            include: {
              category: true,
              images: { take: 1 },
            },
          },
          customer: {
            select: {
              id: true,
              fullName: true,
              profilePhoto: true,
              phone: true,
              city: true,
              address: true,
            },
          },
        },
      }),
      this.prisma.booking.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: bookings,
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

  // ─── Get Single Booking ──────────────────────────────────────────────

  async getBookingById(userId: string, bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        job: {
          include: {
            category: true,
            images: true,
          },
        },
        customer: {
          select: {
            id: true,
            fullName: true,
            profilePhoto: true,
            phone: true,
            city: true,
          },
        },
        provider: {
          select: {
            id: true,
            fullName: true,
            profilePhoto: true,
            phone: true,
            city: true,
            providerProfile: {
              select: {
                bio: true,
                hourlyRate: true,
                serviceLocation: true,
              },
            },
          },
        },
        cancellationRecords: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Authorization: must be customer, assigned provider, or admin
    if (booking.customerId !== userId && booking.providerId !== userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });
      if (user?.role !== UserRole.ADMIN) {
        throw new ForbiddenException('Access denied');
      }
    }

    return booking;
  }

  // ─── Job Timeline Tracking ───────────────────────────────────────────

  async getJobTimeline(userId: string, jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      select: {
        id: true,
        customerId: true,
        status: true,
      },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    // Find the most recent non-cancelled booking to check provider access
    const activeBooking = await this.prisma.booking.findFirst({
      where: {
        jobId,
        status: { notIn: ['CANCELLED'] },
      },
      select: { providerId: true },
    });

    // Authorization
    const isCustomer = job.customerId === userId;
    const isProvider = activeBooking?.providerId === userId;

    if (!isCustomer && !isProvider) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });
      if (user?.role !== UserRole.ADMIN) {
        throw new ForbiddenException('Access denied');
      }
    }

    const timeline = await this.prisma.jobTimeline.findMany({
      where: { jobId },
      orderBy: { createdAt: 'asc' },
    });

    const booking = await this.prisma.booking.findFirst({
      where: { jobId },
    });

    return {
      jobId,
      currentStatus: job.status,
      bookingStatus: booking?.status || null,
      events: timeline.map((t) => ({
        event: t.event,
        description: t.description,
        timestamp: t.createdAt,
      })),
      summary: this.buildTimelineSummary(timeline, job.status, booking),
    };
  }

  // ─── Provider Active Work ────────────────────────────────────────────

  async getProviderActiveWork(providerId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: {
        providerId,
        status: { in: [BookingStatus.ACCEPTED, BookingStatus.IN_PROGRESS] },
      },
      include: {
        job: {
          include: {
            category: true,
            images: { take: 1 },
          },
        },
        customer: {
          select: {
            id: true,
            fullName: true,
            profilePhoto: true,
            phone: true,
            city: true,
            address: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return bookings;
  }

  // ─── Customer Active Bookings ────────────────────────────────────────

  async getCustomerActiveBookings(customerId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: {
        customerId,
        status: { in: [BookingStatus.ACCEPTED, BookingStatus.IN_PROGRESS] },
      },
      include: {
        job: {
          include: {
            category: true,
            images: { take: 1 },
          },
        },
        provider: {
          select: {
            id: true,
            fullName: true,
            profilePhoto: true,
            phone: true,
            city: true,
            providerProfile: {
              select: {
                bio: true,
                serviceLocation: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return bookings;
  }

  // ─── Booking Summary / Stats ─────────────────────────────────────────

  async getCustomerBookingStats(customerId: string) {
    const [total, accepted, inProgress, completed, cancelled, disputed] =
      await Promise.all([
        this.prisma.booking.count({ where: { customerId } }),
        this.prisma.booking.count({
          where: { customerId, status: BookingStatus.ACCEPTED },
        }),
        this.prisma.booking.count({
          where: { customerId, status: BookingStatus.IN_PROGRESS },
        }),
        this.prisma.booking.count({
          where: { customerId, status: BookingStatus.COMPLETED },
        }),
        this.prisma.booking.count({
          where: { customerId, status: BookingStatus.CANCELLED },
        }),
        this.prisma.booking.count({
          where: { customerId, status: BookingStatus.DISPUTED },
        }),
      ]);

    return {
      total,
      accepted: inProgress + accepted,
      inProgress,
      completed,
      cancelled,
      disputed,
    };
  }

  async getProviderBookingStats(providerId: string) {
    const [total, accepted, inProgress, completed, cancelled, disputed] =
      await Promise.all([
        this.prisma.booking.count({ where: { providerId } }),
        this.prisma.booking.count({
          where: { providerId, status: BookingStatus.ACCEPTED },
        }),
        this.prisma.booking.count({
          where: { providerId, status: BookingStatus.IN_PROGRESS },
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
      total,
      accepted: inProgress + accepted,
      inProgress,
      completed,
      cancelled,
      disputed,
    };
  }

  // ─── Admin: List All Bookings ────────────────────────────────────────

  async adminListBookings(query: BookingQueryDto) {
    const {
      page = 1,
      limit = 10,
      status,
      categoryId,
      dateFrom,
      dateTo,
      search,
      customerId,
      providerId,
      cityId,
      sortBy = BookingSortField.CREATED_AT,
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.BookingWhereInput = {
      ...(status && { status: status as BookingStatus }),
      ...(dateFrom || dateTo
        ? {
            createdAt: {
              ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
              ...(dateTo ? { lte: new Date(dateTo + 'T23:59:59Z') } : {}),
            },
          }
        : {}),
      ...(categoryId ? { job: { categoryId } } : {}),
      ...(search
        ? {
            OR: [
              { id: search },
              { job: { title: { contains: search, mode: 'insensitive' } } },
            ],
          }
        : {}),
      ...(customerId ? { customerId } : {}),
      ...(providerId ? { providerId } : {}),
      ...(cityId ? { customer: { cityId } } : {}),
    };

    const orderByField =
      sortBy === BookingSortField.TOTAL_AMOUNT ? 'totalAmount' : 'createdAt';

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderByField]: sortOrder },
        include: {
          job: { include: { category: true } },
          customer: { select: { id: true, fullName: true, phone: true } },
          provider: { select: { id: true, fullName: true, phone: true } },
        },
      }),
      this.prisma.booking.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: bookings,
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

  // ─── Admin: Booking detail ───────────────────────────────────────────

  async adminGetBooking(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        job: { include: { category: true, images: true } },
        customer: { include: { city: true } },
        provider: {
          include: {
            providerProfile: {
              include: { categories: { include: { category: true } } },
            },
          },
        },
        disputes: true,
        reviews: true,
        cancellationRecords: true,
        conversations: {
          include: { messages: { orderBy: { createdAt: 'asc' } } },
        },
      },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  // ─── Expired Job Cleanup ─────────────────────────────────────────────

  async expireOverdueJobs(): Promise<number> {
    // Find jobs that have no active (non-cancelled) booking
    const jobsWithActiveBooking = await this.prisma.booking.findMany({
      where: {
        status: { notIn: ['CANCELLED', 'COMPLETED', 'DISPUTED'] },
      },
      select: { jobId: true },
      distinct: ['jobId'],
    });

    const jobIdsWithActiveBooking = jobsWithActiveBooking.map((b) => b.jobId);

    const result = await this.prisma.job.updateMany({
      where: {
        status: JobStatus.PENDING,
        expiresAt: { lte: new Date() },
        id: { notIn: jobIdsWithActiveBooking },
      },
      data: { status: JobStatus.EXPIRED },
    });

    if (result.count > 0) {
      // Record timeline for expired jobs
      const expiredJobs = await this.prisma.job.findMany({
        where: {
          status: JobStatus.EXPIRED,
          timeline: { none: { event: 'JOB_EXPIRED' } },
        },
        select: { id: true },
      });

      for (const job of expiredJobs) {
        await this.recordJobTimeline(
          job.id,
          'JOB_EXPIRED',
          'Job expired due to no provider selection',
        );
      }

      // Expire all pending bids for these jobs
      for (const job of expiredJobs) {
        await this.prisma.bid.updateMany({
          where: {
            jobId: job.id,
            status: 'PENDING',
          },
          data: { status: 'EXPIRED' },
        });
      }

      this.logger.log({
        message: 'Expired overdue jobs',
        count: result.count,
      });
    }

    return result.count;
  }

  // ─── Helpers ─────────────────────────────────────────────────────────

  private calculateExpiry(): Date {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 24);
    return expiry;
  }

  private async recordJobTimeline(
    jobId: string,
    event: string,
    description: string,
  ) {
    await this.prisma.jobTimeline.create({
      data: { jobId, event, description },
    });
  }

  private buildTimelineSummary(
    timeline: { event: string; createdAt: Date }[],
    currentStatus: JobStatus,
    booking: { status: string } | null,
  ) {
    const events: Record<string, Date> = {};
    for (const entry of timeline) {
      if (!events[entry.event]) {
        events[entry.event] = entry.createdAt;
      }
    }

    return {
      jobCreated: events['JOB_CREATED'] || null,
      firstBid: events['BID_RECEIVED'] || null,
      bidAccepted: events['BID_ACCEPTED'] || null,
      providerAssigned:
        events['PROVIDER_ASSIGNED'] || events['PROVIDER_ACCEPTED'] || null,
      workStarted: events['WORK_STARTED'] || null,
      workCompleted: events['WORK_COMPLETED'] || null,
      customerConfirmed: events['CUSTOMER_CONFIRMED'] || null,
      cancelled: events['BOOKING_CANCELLED'] || null,
      expired: events['JOB_EXPIRED'] || null,
      currentJobStatus: currentStatus,
      currentBookingStatus: booking?.status || null,
    };
  }
}
