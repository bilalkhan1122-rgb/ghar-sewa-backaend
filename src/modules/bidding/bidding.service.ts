import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBidDto } from './dtos/create-bid.dto';
import { UpdateBidDto } from './dtos/update-bid.dto';
import { CounterBidDto } from './dtos/counter-bid.dto';
import { BidQueryDto, BidSortField } from './dtos/bid-query.dto';
import { Logger } from 'nestjs-pino';
import {
  Prisma,
  JobStatus,
  BidStatus,
  UserRole,
  UserStatus,
  VerificationStatus,
  CancellationType,
  NotificationType,
  type Bid,
  type Job,
} from 'generated/prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
import { PenaltiesService } from '../penalties/penalties.service';

@Injectable()
export class BiddingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly notifications: NotificationsService,
    private readonly penalties: PenaltiesService,
  ) {}

  // ─── Helper: get active booking for job ──────────────────────────────

  private async getActiveBookingForJob(jobId: string) {
    return this.prisma.booking.findFirst({
      where: {
        jobId,
        status: { notIn: ['CANCELLED'] },
      },
    });
  }

  // ─── Provider: Submit Bid ────────────────────────────────────────────

  async submitBid(providerId: string, dto: CreateBidDto) {
    // Validate provider is approved and profile is complete
    const provider = await this.prisma.user.findUnique({
      where: { id: providerId },
      include: {
        providerProfile: {
          include: { categories: true },
        },
      },
    });

    if (!provider || provider.role !== UserRole.PROVIDER) {
      throw new ForbiddenException('Only providers can submit bids');
    }

    if (provider.verificationStatus !== VerificationStatus.APPROVED) {
      throw new ForbiddenException(
        'Your profile must be approved before you can bid on jobs',
      );
    }

    if (provider.status !== UserStatus.ACTIVE) {
      throw new ForbiddenException(
        'Your account is suspended or banned. You cannot submit bids.',
      );
    }

    if (!provider.profileCompleted || !provider.isActive) {
      throw new ForbiddenException(
        'Your profile must be complete and active to submit bids',
      );
    }

    // Validate job exists and is available
    const job = await this.prisma.job.findUnique({
      where: { id: dto.jobId },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    // Provider cannot bid on own jobs
    if (job.customerId === providerId) {
      throw new BadRequestException('You cannot bid on your own job');
    }

    // Job must be PENDING
    if (job.status !== JobStatus.PENDING) {
      throw new BadRequestException(
        `Cannot bid on a job that is ${job.status.toLowerCase()}`,
      );
    }

    // Job must not be expired
    if (job.expiresAt <= new Date()) {
      throw new BadRequestException('This job has expired');
    }

    // Job must not already have an active booking
    const activeBooking = await this.getActiveBookingForJob(dto.jobId);
    if (activeBooking) {
      throw new BadRequestException('This job already has a provider assigned');
    }

    // Verify provider belongs to the job's category
    const providerCategoryIds =
      provider.providerProfile?.categories.map((c) => c.categoryId) || [];

    if (!providerCategoryIds.includes(job.categoryId)) {
      throw new BadRequestException(
        'This job is not in your service categories',
      );
    }

    // Provider cannot bid twice on the same job
    const existingBid = await this.prisma.bid.findFirst({
      where: {
        jobId: dto.jobId,
        providerId,
        status: { in: [BidStatus.PENDING] },
      },
    });

    if (existingBid) {
      throw new BadRequestException(
        'You have already submitted a bid for this job',
      );
    }

    // Create the bid
    const bid = await this.prisma.bid.create({
      data: {
        jobId: dto.jobId,
        providerId,
        offeredPrice: dto.offeredPrice,
        message: dto.message,
        status: BidStatus.PENDING,
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            customerId: true,
          },
        },
      },
    });

    // Record timeline event
    await this.recordJobTimeline(dto.jobId, 'BID_RECEIVED', 'New bid received');

    this.logger.log({
      message: 'Bid submitted',
      bidId: bid.id,
      jobId: dto.jobId,
      providerId,
      amount: dto.offeredPrice,
    });

    // Notify customer of the new bid
    void this.notifications.send({
      userId: bid.job.customerId,
      type: NotificationType.NEW_BID,
      title: 'New bid received 💼',
      message: `A provider submitted a bid of Rs. ${dto.offeredPrice} for "${bid.job.title}".`,
      relatedEntityType: 'JOB',
      relatedEntityId: dto.jobId,
    });

    return bid;
  }

  // ─── Provider: Accept Customer's Offered Price ───────────────────────

  async acceptCustomerPrice(providerId: string, jobId: string) {
    const provider = await this.validateProviderForBidding(providerId);

    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.customerId === providerId) {
      throw new BadRequestException('You cannot accept your own job');
    }

    if (job.status !== JobStatus.PENDING) {
      throw new BadRequestException(
        `Cannot accept a job that is ${job.status.toLowerCase()}`,
      );
    }

    if (job.expiresAt <= new Date()) {
      throw new BadRequestException('This job has expired');
    }

    // Check job doesn't have active booking
    const activeBooking = await this.getActiveBookingForJob(jobId);
    if (activeBooking) {
      throw new BadRequestException('This job already has a provider assigned');
    }

    // Verify provider belongs to job's category
    const providerCategoryIds =
      provider.providerProfile?.categories.map((c) => c.categoryId) || [];
    if (!providerCategoryIds.includes(job.categoryId)) {
      throw new BadRequestException(
        'This job is not in your service categories',
      );
    }

    // Check no existing pending bid
    const existingBid = await this.prisma.bid.findFirst({
      where: { jobId, providerId, status: BidStatus.PENDING },
    });

    if (existingBid) {
      throw new BadRequestException(
        'You already have a pending bid. Update or withdraw it instead.',
      );
    }

    // Create bid and auto-accept in transaction
    const result = await this.prisma.$transaction(async (tx) => {
      const bid = await tx.bid.create({
        data: {
          jobId,
          providerId,
          offeredPrice: job.offeredPrice,
          status: BidStatus.ACCEPTED,
          message: 'Accepted the offered price',
        },
      });

      await tx.job.update({
        where: { id: jobId },
        data: { status: JobStatus.ACCEPTED },
      });

      await tx.bid.updateMany({
        where: {
          jobId,
          providerId: { not: providerId },
          status: BidStatus.PENDING,
        },
        data: { status: BidStatus.REJECTED },
      });

      const booking = await tx.booking.create({
        data: {
          jobId,
          customerId: job.customerId,
          providerId,
          bookingType: 'BID' as const,
          totalAmount: job.offeredPrice,
          status: 'ACCEPTED' as const,
          acceptedAt: new Date(),
        },
      });

      await tx.jobTimeline.create({
        data: {
          jobId,
          event: 'PROVIDER_ACCEPTED',
          description: 'Provider accepted the job at offered price',
        },
      });

      return { bid, booking };
    });

    this.logger.log({
      message: 'Provider accepted customer price',
      jobId,
      providerId,
      amount: job.offeredPrice,
    });

    // Notify the customer that a provider accepted their price
    void this.notifications.send({
      userId: job.customerId,
      type: NotificationType.JOB_ACCEPTED,
      title: 'Job accepted! ✅',
      message: `A provider accepted your offered price for "${job.title}".`,
      relatedEntityType: 'JOB',
      relatedEntityId: job.id,
    });
    void this.notifications.send({
      userId: job.customerId,
      type: NotificationType.BOOKING_CONFIRMED,
      title: 'Provider assigned',
      message: `A provider accepted your offered price for "${job.title}".`,
      relatedEntityType: 'BOOKING',
      relatedEntityId: result.booking.id,
    });

    return result;
  }

  // ─── Provider: Update Own Bid ────────────────────────────────────────

  async updateBid(providerId: string, bidId: string, dto: UpdateBidDto) {
    const bid = await this.prisma.bid.findUnique({
      where: { id: bidId },
      include: { job: true },
    });

    if (!bid) {
      throw new NotFoundException('Bid not found');
    }

    if (bid.providerId !== providerId) {
      throw new ForbiddenException('You can only update your own bids');
    }

    if (bid.status !== BidStatus.PENDING) {
      throw new BadRequestException(
        `Cannot update a bid that is ${bid.status.toLowerCase()}`,
      );
    }

    if (bid.job.status !== JobStatus.PENDING) {
      throw new BadRequestException(
        'Cannot update a bid on a job that is no longer pending',
      );
    }

    if (bid.job.expiresAt <= new Date()) {
      throw new BadRequestException('This job has expired');
    }

    const updated = await this.prisma.bid.update({
      where: { id: bidId },
      data: {
        ...(dto.offeredPrice !== undefined && {
          offeredPrice: dto.offeredPrice,
        }),
        ...(dto.message !== undefined && { message: dto.message }),
      },
    });

    return updated;
  }

  // ─── Provider: Withdraw Bid ──────────────────────────────────────────

  async withdrawBid(providerId: string, bidId: string) {
    const bid = await this.prisma.bid.findUnique({
      where: { id: bidId },
      include: { job: true },
    });

    if (!bid) {
      throw new NotFoundException('Bid not found');
    }

    if (bid.providerId !== providerId) {
      throw new ForbiddenException('You can only withdraw your own bids');
    }

    if (bid.status !== BidStatus.PENDING) {
      throw new BadRequestException(
        `Cannot withdraw a bid that is ${bid.status.toLowerCase()}`,
      );
    }

    const updated = await this.prisma.bid.update({
      where: { id: bidId },
      data: { status: BidStatus.WITHDRAWN },
    });

    this.logger.log({
      message: 'Bid withdrawn',
      bidId,
      providerId,
      jobId: bid.jobId,
    });

    // Notify customer (placeholder)
    this.logger.log({
      message: 'Notification: Bid withdrawn',
      customerId: bid.job.customerId,
      jobId: bid.jobId,
    });

    return updated;
  }

  // ─── Provider: View Submitted Bids ───────────────────────────────────

  async listMyBids(providerId: string, query: BidQueryDto) {
    const {
      page = 1,
      limit = 10,
      status,
      jobId,
      sortBy = BidSortField.CREATED_AT,
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.BidWhereInput = {
      providerId,
      ...(status && { status: status as BidStatus }),
      ...(jobId && { jobId }),
    };

    const orderByField =
      sortBy === BidSortField.OFFERED_PRICE ? 'offeredPrice' : 'createdAt';

    const [bids, total] = await Promise.all([
      this.prisma.bid.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderByField]: sortOrder },
        include: {
          job: {
            select: {
              id: true,
              title: true,
              status: true,
              offeredPrice: true,
              category: true,
              createdAt: true,
            },
          },
        },
      }),
      this.prisma.bid.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: bids,
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

  // ─── Provider: View Available Jobs (with bid status) ─────────────────

  async getAvailableJobsWithBidStatus(providerId: string) {
    const provider = await this.validateProviderForBidding(providerId);

    const providerCategoryIds =
      provider.providerProfile?.categories.map((c) => c.categoryId) || [];

    // Get all pending jobs in provider's categories
    // Exclude jobs that already have an active (non-cancelled) booking
    const jobsWithActiveBooking = await this.prisma.booking.findMany({
      where: {
        job: {
          status: JobStatus.PENDING,
          categoryId: { in: providerCategoryIds },
        },
        status: { notIn: ['CANCELLED'] },
      },
      select: { jobId: true },
    });

    const excludedJobIds = jobsWithActiveBooking.map((b) => b.jobId);

    const jobs = await this.prisma.job.findMany({
      where: {
        status: JobStatus.PENDING,
        categoryId: { in: providerCategoryIds },
        expiresAt: { gt: new Date() },
        customerId: { not: providerId },
        id: { notIn: excludedJobIds },
      },
      include: {
        category: true,
        images: true,
        customer: {
          select: {
            id: true,
            fullName: true,
            profilePhoto: true,
            city: true,
          },
        },
        bids: {
          where: { providerId },
          select: {
            id: true,
            status: true,
            offeredPrice: true,
            // Without these the feed knows a bid was COUNTERED but not for how
            // much, so the provider is asked to accept an amount it cannot show.
            counterPrice: true,
            counterMessage: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return jobs;
  }

  // ─── Customer: View All Bids for a Job ───────────────────────────────

  async getBidsForJob(customerId: string, jobId: string, query: BidQueryDto) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.customerId !== customerId) {
      throw new ForbiddenException('You can only view bids for your own jobs');
    }

    const {
      page = 1,
      limit = 10,
      status,
      sortBy = BidSortField.CREATED_AT,
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.BidWhereInput = {
      jobId,
      ...(status && { status: status as BidStatus }),
    };

    const orderByField =
      sortBy === BidSortField.OFFERED_PRICE ? 'offeredPrice' : 'createdAt';

    const [bids, total] = await Promise.all([
      this.prisma.bid.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderByField]: sortOrder },
        include: {
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
                  serviceRadius: true,
                  categories: {
                    include: { category: true },
                  },
                },
              },
            },
          },
        },
      }),
      this.prisma.bid.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: bids,
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

  // ─── Customer: Accept a Bid (Select Provider) ────────────────────────

  async acceptBid(customerId: string, bidId: string) {
    const bid = await this.prisma.bid.findUnique({
      where: { id: bidId },
      include: { job: true },
    });

    if (!bid) {
      throw new NotFoundException('Bid not found');
    }

    if (bid.job.customerId !== customerId) {
      throw new ForbiddenException(
        'You can only accept bids for your own jobs',
      );
    }

    if (bid.job.status !== JobStatus.PENDING) {
      throw new BadRequestException(
        `Cannot accept a bid for a job that is ${bid.job.status.toLowerCase()}`,
      );
    }

    if (bid.job.expiresAt <= new Date()) {
      throw new BadRequestException('This job has expired');
    }

    if (bid.status !== BidStatus.PENDING) {
      throw new BadRequestException(
        `Cannot accept a bid that is ${bid.status.toLowerCase()}`,
      );
    }

    return this.assignProviderFromBid(customerId, bid, bid.offeredPrice);
  }

  /**
   * Assigns a provider to a job: rejects the other bids, creates the booking and
   * sends everyone their notifications.
   *
   * Shared by accepting a bid outright and by a provider accepting the
   * customer's counter-offer, which differ only in the agreed `amount`. Keeping
   * one implementation means the two paths cannot drift apart.
   */
  private async assignProviderFromBid(
    customerId: string,
    bid: Bid & { job: Job },
    amount: Prisma.Decimal | number,
  ) {
    // Check if job already has an active (non-cancelled) booking
    const existingActiveBooking = await this.getActiveBookingForJob(bid.jobId);
    if (existingActiveBooking) {
      throw new BadRequestException('This job already has a provider assigned');
    }

    // Fetch rejected providers for notification (outside the transaction)
    const rejectedProviders = await this.prisma.bid.findMany({
      where: {
        jobId: bid.jobId,
        id: { not: bid.id },
        status: BidStatus.PENDING,
      },
      select: { providerId: true },
    });

    // Accept bid and create booking in transaction
    const result = await this.prisma.$transaction(async (tx) => {
      const acceptedBid = await tx.bid.update({
        where: { id: bid.id },
        data: { status: BidStatus.ACCEPTED },
      });

      // Reject all other pending bids
      await tx.bid.updateMany({
        where: {
          jobId: bid.jobId,
          id: { not: bid.id },
          status: BidStatus.PENDING,
        },
        data: { status: BidStatus.REJECTED },
      });

      await tx.job.update({
        where: { id: bid.jobId },
        data: { status: JobStatus.ACCEPTED },
      });

      const booking = await tx.booking.create({
        data: {
          jobId: bid.jobId,
          customerId,
          providerId: bid.providerId,
          bookingType: 'BID' as const,
          totalAmount: amount,
          status: 'ACCEPTED' as const,
          acceptedAt: new Date(),
        },
      });

      await tx.jobTimeline.create({
        data: {
          jobId: bid.jobId,
          event: 'BID_ACCEPTED',
          description: 'Customer accepted a bid',
        },
      });

      await tx.jobTimeline.create({
        data: {
          jobId: bid.jobId,
          event: 'PROVIDER_ASSIGNED',
          description: 'Provider assigned to the job',
        },
      });

      return { bid: acceptedBid, booking };
    });

    this.logger.log({
      message: 'Bid accepted, booking created',
      bidId: bid.id,
      jobId: bid.jobId,
      customerId,
      providerId: bid.providerId,
      amount,
    });

    // Notify the winning provider
    void this.notifications.send({
      userId: bid.providerId,
      type: NotificationType.BID_ACCEPTED,
      title: 'Your bid was accepted! 🎉',
      message: `Your bid of Rs. ${Number(amount)} for "${bid.job.title}" was accepted.`,
      relatedEntityType: 'JOB',
      relatedEntityId: bid.jobId,
    });

    // Notify the customer that their job was accepted
    void this.notifications.send({
      userId: customerId,
      type: NotificationType.JOB_ACCEPTED,
      title: 'Job accepted! ✅',
      message: `Your job "${bid.job.title}" has been accepted by a provider.`,
      relatedEntityType: 'JOB',
      relatedEntityId: bid.jobId,
    });
    void this.notifications.send({
      userId: customerId,
      type: NotificationType.BOOKING_CONFIRMED,
      title: 'Provider assigned',
      message: `A provider has been assigned to your job "${bid.job.title}".`,
      relatedEntityType: 'BOOKING',
      relatedEntityId: result.booking.id,
    });

    // Notify providers whose bids were rejected
    await this.notifications.sendToMany(
      rejectedProviders.map((p) => ({
        userId: p.providerId,
        type: NotificationType.BID_REJECTED,
        title: 'Bid not selected',
        message: `Your bid for "${bid.job.title}" was not selected this time.`,
        relatedEntityType: 'JOB',
        relatedEntityId: bid.jobId,
      })),
    );

    return result;
  }

  // ─── Counter-offers ──────────────────────────────────────────────────

  /**
   * Customer proposes a different price on a provider's bid.
   *
   * Deliberately one round: the provider either accepts or declines, and
   * declining restores the bid to PENDING so the original price is still on the
   * table. There is no counter-back, which keeps the state machine small and
   * avoids an open-ended haggle.
   */
  async counterBid(customerId: string, bidId: string, dto: CounterBidDto) {
    const bid = await this.prisma.bid.findUnique({
      where: { id: bidId },
      include: { job: true },
    });

    if (!bid) throw new NotFoundException('Bid not found');
    if (bid.job.customerId !== customerId) {
      throw new ForbiddenException('You can only counter bids on your own jobs');
    }
    if (bid.job.status !== JobStatus.PENDING) {
      throw new BadRequestException(
        `Cannot counter a bid for a job that is ${bid.job.status.toLowerCase()}`,
      );
    }
    if (bid.job.expiresAt <= new Date()) {
      throw new BadRequestException('This job has expired');
    }
    if (bid.status !== BidStatus.PENDING) {
      throw new BadRequestException(
        `Cannot counter a bid that is ${bid.status.toLowerCase()}`,
      );
    }

    const updated = await this.prisma.bid.update({
      where: { id: bidId },
      data: {
        status: BidStatus.COUNTERED,
        counterPrice: dto.counterPrice,
        counterMessage: dto.message,
        counteredAt: new Date(),
      },
    });

    await this.prisma.jobTimeline.create({
      data: {
        jobId: bid.jobId,
        event: 'BID_COUNTERED',
        description: `Customer countered at Rs. ${dto.counterPrice}`,
      },
    });

    void this.notifications.send({
      userId: bid.providerId,
      type: NotificationType.BID_COUNTERED,
      title: 'Counter-offer received',
      message: `The customer offered Rs. ${dto.counterPrice} for "${bid.job.title}" (you bid Rs. ${Number(bid.offeredPrice)}).`,
      relatedEntityType: 'JOB',
      relatedEntityId: bid.jobId,
    });

    this.logger.log({
      message: 'Bid countered',
      bidId,
      jobId: bid.jobId,
      customerId,
      counterPrice: dto.counterPrice,
    });

    return updated;
  }

  /** Provider accepts the counter — the booking is created at the countered price. */
  async acceptCounter(providerId: string, bidId: string) {
    const bid = await this.prisma.bid.findUnique({
      where: { id: bidId },
      include: { job: true },
    });

    if (!bid) throw new NotFoundException('Bid not found');
    if (bid.providerId !== providerId) {
      throw new ForbiddenException('You can only respond to your own bids');
    }
    if (bid.status !== BidStatus.COUNTERED || bid.counterPrice === null) {
      throw new BadRequestException('This bid has no counter-offer to accept');
    }
    if (bid.job.status !== JobStatus.PENDING) {
      throw new BadRequestException(
        `This job is ${bid.job.status.toLowerCase()}`,
      );
    }
    if (bid.job.expiresAt <= new Date()) {
      throw new BadRequestException('This job has expired');
    }

    const result = await this.assignProviderFromBid(
      bid.job.customerId,
      bid,
      bid.counterPrice,
    );

    void this.notifications.send({
      userId: bid.job.customerId,
      type: NotificationType.COUNTER_ACCEPTED,
      title: 'Counter-offer accepted 🎉',
      message: `The provider accepted Rs. ${Number(bid.counterPrice)} for "${bid.job.title}".`,
      relatedEntityType: 'JOB',
      relatedEntityId: bid.jobId,
    });

    return result;
  }

  /** Provider declines — the bid returns to PENDING at its original price. */
  async declineCounter(providerId: string, bidId: string) {
    const bid = await this.prisma.bid.findUnique({
      where: { id: bidId },
      include: { job: true },
    });

    if (!bid) throw new NotFoundException('Bid not found');
    if (bid.providerId !== providerId) {
      throw new ForbiddenException('You can only respond to your own bids');
    }
    if (bid.status !== BidStatus.COUNTERED) {
      throw new BadRequestException('This bid has no counter-offer to decline');
    }

    const declinedPrice = bid.counterPrice;

    const updated = await this.prisma.bid.update({
      where: { id: bidId },
      data: {
        status: BidStatus.PENDING,
        counterPrice: null,
        counterMessage: null,
        counteredAt: null,
      },
    });

    void this.notifications.send({
      userId: bid.job.customerId,
      type: NotificationType.COUNTER_DECLINED,
      title: 'Counter-offer declined',
      message: `The provider declined Rs. ${Number(declinedPrice)} for "${bid.job.title}". Their original bid of Rs. ${Number(bid.offeredPrice)} still stands.`,
      relatedEntityType: 'JOB',
      relatedEntityId: bid.jobId,
    });

    this.logger.log({
      message: 'Counter-offer declined',
      bidId,
      jobId: bid.jobId,
      providerId,
    });

    return updated;
  }

  // ─── Customer: Reject a Bid ──────────────────────────────────────────

  async rejectBid(customerId: string, bidId: string) {
    const bid = await this.prisma.bid.findUnique({
      where: { id: bidId },
      include: { job: true },
    });

    if (!bid) {
      throw new NotFoundException('Bid not found');
    }

    if (bid.job.customerId !== customerId) {
      throw new ForbiddenException(
        'You can only reject bids for your own jobs',
      );
    }

    if (bid.status !== BidStatus.PENDING) {
      throw new BadRequestException(
        `Cannot reject a bid that is ${bid.status.toLowerCase()}`,
      );
    }

    const updated = await this.prisma.bid.update({
      where: { id: bidId },
      data: { status: BidStatus.REJECTED },
    });

    await this.recordJobTimeline(bid.jobId, 'BID_REJECTED', 'Bid was rejected');

    this.logger.log({
      message: 'Bid rejected',
      bidId,
      jobId: bid.jobId,
    });

    // Notify the provider whose bid was rejected
    void this.notifications.send({
      userId: bid.providerId,
      type: NotificationType.BID_REJECTED,
      title: 'Bid not selected',
      message: `Your bid for "${bid.job.title}" was not selected this time.`,
      relatedEntityType: 'JOB',
      relatedEntityId: bid.jobId,
    });

    return updated;
  }

  // ─── Customer: Cancel Provider Selection ─────────────────────────────

  async cancelProviderSelection(customerId: string, jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.customerId !== customerId) {
      throw new ForbiddenException('You can only manage your own jobs');
    }

    if (job.status !== JobStatus.ACCEPTED) {
      throw new BadRequestException(
        'Provider selection can only be cancelled before work starts',
      );
    }

    // Find the active booking for this job
    const booking = await this.prisma.booking.findFirst({
      where: { jobId, status: 'ACCEPTED' },
    });

    if (!booking) {
      throw new BadRequestException('No provider is currently assigned');
    }

    const result = await this.prisma.$transaction(async (tx) => {
      // Update job back to PENDING
      await tx.job.update({
        where: { id: jobId },
        data: {
          status: JobStatus.PENDING,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      // Restore all bids to PENDING
      await tx.bid.updateMany({
        where: { jobId, status: BidStatus.REJECTED },
        data: { status: BidStatus.PENDING },
      });

      // Mark the winning bid as PENDING too
      await tx.bid.updateMany({
        where: {
          jobId,
          providerId: booking.providerId,
          status: BidStatus.ACCEPTED,
        },
        data: { status: BidStatus.PENDING },
      });

      // Cancel the booking
      await tx.booking.update({
        where: { id: booking.id },
        data: {
          status: 'CANCELLED' as const,
          cancelledAt: new Date(),
        },
      });

      // Record cancellation
      await tx.cancellationRecord.create({
        data: {
          jobId,
          bookingId: booking.id,
          cancelledBy: 'CUSTOMER',
          cancellationType: CancellationType.CUSTOMER,
          reason: 'Customer cancelled provider selection before work started',
        },
      });

      // Record timeline
      await tx.jobTimeline.create({
        data: {
          jobId,
          event: 'SELECTION_CANCELLED',
          description: 'Customer cancelled provider selection',
        },
      });

      return { message: 'Provider selection cancelled successfully' };
    });

    this.logger.log({
      message: 'Provider selection cancelled',
      jobId,
      customerId,
    });

    // Notify provider (placeholder)
    this.logger.log({
      message: 'Notification: Your selection has been cancelled',
      jobId,
    });

    return result;
  }

  // ─── Customer: View Selected Provider ────────────────────────────────

  async getSelectedProvider(customerId: string, jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.customerId !== customerId) {
      throw new ForbiddenException('You can only view your own jobs');
    }

    const booking = await this.prisma.booking.findFirst({
      where: { jobId, status: { notIn: ['CANCELLED'] } },
      include: {
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
                serviceRadius: true,
              },
            },
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('No provider is currently assigned');
    }

    return booking;
  }

  // ─── Helpers ─────────────────────────────────────────────────────────

  private async validateProviderForBidding(providerId: string) {
    // Blocks suspended / banned providers and lazily expires finished suspensions
    await this.penalties.assertProviderEligible(providerId);

    const provider = await this.prisma.user.findUnique({
      where: { id: providerId },
      include: {
        providerProfile: {
          include: { categories: true },
        },
      },
    });

    if (!provider || provider.role !== UserRole.PROVIDER) {
      throw new NotFoundException('Provider not found');
    }

    if (
      provider.verificationStatus !== VerificationStatus.APPROVED ||
      !provider.profileCompleted ||
      !provider.isActive
    ) {
      throw new ForbiddenException(
        'Your profile must be approved and complete to bid on jobs',
      );
    }

    return provider;
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
}
