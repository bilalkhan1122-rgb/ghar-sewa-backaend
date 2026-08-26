import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PrismaService } from "src/prisma/prisma.service";
import { DirectBookingDto } from "./dtos/direct-booking.dto";
import { SubcategoriesService } from "../categories/subcategories.service";
import { CounterBookingDto } from "./dtos/counter-booking.dto";
import { BookingQueryDto, BookingSortField } from "./dtos/booking-query.dto";
import { Logger } from "nestjs-pino";
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
} from "generated/prisma/client";
import { NotificationsService } from "../notifications/notifications.service";
import { PenaltiesService } from "../penalties/penalties.service";
import { WalletService } from "../wallet/wallet.service";
import { RankingService } from "../ranking/ranking.service";
import { RealtimeService } from "../realtime/realtime.service";
import { hasRole } from "src/common/roles";

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly notifications: NotificationsService,
    private readonly penalties: PenaltiesService,
    private readonly wallet: WalletService,
    private readonly ranking: RankingService,
    private readonly realtime: RealtimeService,
    private readonly subcategories: SubcategoriesService,
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
      !hasRole(provider, UserRole.PROVIDER) ||
      provider.verificationStatus !== VerificationStatus.APPROVED ||
      provider.status !== UserStatus.ACTIVE ||
      !provider.profileCompleted ||
      !provider.isActive
    ) {
      throw new BadRequestException("Provider is not available");
    }

    // Validate provider has the selected category
    const providerCategoryIds =
      provider.providerProfile?.categories.map((c) => c.categoryId) || [];
    if (!providerCategoryIds.includes(dto.categoryId)) {
      throw new BadRequestException(
        "Provider does not offer the selected service category",
      );
    }

    // Validate category exists and is active
    const category = await this.prisma.serviceCategory.findUnique({
      where: { id: dto.categoryId },
    });
    if (!category || !category.isActive) {
      throw new BadRequestException("Invalid or inactive category");
    }

    // Same rule `POST /jobs` applies: a sub-type from another category would
    // otherwise file the work under a pairing that does not exist.
    if (dto.subcategoryId) {
      await this.subcategories.assertBelongsToCategory(
        dto.categoryId,
        dto.subcategoryId,
      );
    }

    // Same rule as a posted job — a direct booking the wallet cannot cover
    // strands the provider at payment time.
    await this.wallet.assertCanStartJob(customerId, dto.totalAmount);

    // Create job, booking, and timeline in transaction
    const result = await this.prisma.$transaction(async (tx) => {
      // Create the job
      const job = await tx.job.create({
        data: {
          customerId,
          categoryId: dto.categoryId,
          subcategoryId: dto.subcategoryId ?? null,
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
        // The response is typed as a full job by the app, which read `category`
        // off it and got undefined. Embedding both here also means the caller
        // sees the sub-type it just sent echoed back.
        include: { category: true, subcategory: true },
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
          event: "JOB_CREATED",
          description: "Job posted for direct booking",
        },
      });

      await tx.jobTimeline.create({
        data: {
          jobId: job.id,
          event: "PROVIDER_REQUESTED",
          description: "Customer requested this provider directly",
        },
      });

      return { job, booking };
    });

    this.logger.log({
      message: "Direct booking created",
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
      title: "New booking request 📅",
      message: `A customer requested you for "${dto.title}" (Rs. ${dto.totalAmount}). Accept or decline.`,
      relatedEntityType: "BOOKING",
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

    if (!booking) throw new NotFoundException("Booking not found");
    if (booking.providerId !== providerId) {
      throw new ForbiddenException(
        "You can only respond to your own booking requests",
      );
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
          event: "PROVIDER_ASSIGNED",
          description: "Provider accepted the booking request",
        },
      });
      return updated;
    });

    // Module 20 realtime: urgent jobs broadcast acceptance to customer + the
    // assigned provider (after the transaction commits).
    if (booking.job.isUrgent) {
      void this.realtime.publishUrgentJobAccepted(
        booking.customerId,
        providerId,
        {
          jobId: booking.jobId,
          bookingId,
          title: booking.job.title,
          isUrgent: true,
          acceptedAt: new Date(),
        },
      );
    }

    void this.notifications.send({
      userId: booking.customerId,
      type: NotificationType.BOOKING_CONFIRMED,
      title: "Booking confirmed ✅",
      message: `Your provider accepted "${booking.job.title}".`,
      relatedEntityType: "BOOKING",
      relatedEntityId: bookingId,
    });

    this.logger.log({
      message: "Direct booking accepted",
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
  // ─── Direct-booking price negotiation ────────────────────────────────

  /**
   * Provider proposes a different price for a direct booking.
   *
   * Reuses the Bid table rather than adding a parallel concept: a counter is
   * recorded as the provider's bid on the booking's job, so the price history
   * of a job lives in one place whether it came from the open feed or a direct
   * booking.
   *
   * The booking deliberately stays PENDING. That keeps the job out of the open
   * feed (see the booking filter in the provider feed query) so nobody else can
   * take a job that is mid-negotiation, and it leaves the provider free to
   * accept the original price if the customer says no.
   *
   * One round only, matching the bid counter-offer flow: a second counter while
   * one is outstanding is refused rather than silently replacing it.
   */
  async counterBookingRequest(
    providerId: string,
    bookingId: string,
    dto: CounterBookingDto,
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { job: true },
    });

    if (!booking) throw new NotFoundException("Booking not found");
    if (booking.providerId !== providerId) {
      throw new ForbiddenException(
        "You can only respond to your own booking requests",
      );
    }
    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException(
        `This request is already ${booking.status.toLowerCase()}`,
      );
    }

    const outstanding = await this.prisma.bid.findFirst({
      where: {
        jobId: booking.jobId,
        providerId,
        status: BidStatus.PENDING,
      },
    });
    if (outstanding) {
      throw new BadRequestException(
        "You already have a counter-offer waiting on this booking",
      );
    }

    const bid = await this.prisma.bid.create({
      data: {
        jobId: booking.jobId,
        providerId,
        offeredPrice: dto.offeredPrice,
        message: dto.message,
        status: BidStatus.PENDING,
      },
    });

    void this.notifications.send({
      userId: booking.customerId,
      type: NotificationType.BID_COUNTERED,
      title: "Provider proposed a different price",
      message: `Your booking for "${booking.job.title}" was countered at Rs ${dto.offeredPrice}. Accept it or keep your original offer.`,
      relatedEntityType: "BOOKING",
      relatedEntityId: bookingId,
    });

    this.logger.log({
      message: "Provider countered a direct booking",
      bookingId,
      providerId,
      offeredPrice: dto.offeredPrice,
    });

    return bid;
  }

  /**
   * Customer accepts the provider's counter-offer: the booking is confirmed at
   * the new price.
   *
   * Mirrors acceptBookingRequest — same statuses, same timeline event — with
   * the agreed amount replaced, so a booking confirmed through a negotiation is
   * indistinguishable downstream from one accepted outright.
   */
  async acceptBookingCounter(customerId: string, bookingId: string) {
    const { booking, bid } = await this.getPendingCounter(
      customerId,
      bookingId,
    );

    // The new price still has to be covered, exactly as at booking time.
    await this.wallet.assertCanStartJob(customerId, bid.offeredPrice);

    const result = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.ACCEPTED,
          acceptedAt: new Date(),
          totalAmount: bid.offeredPrice,
        },
      });
      await tx.job.update({
        where: { id: booking.jobId },
        data: { status: JobStatus.ACCEPTED, offeredPrice: bid.offeredPrice },
      });
      await tx.bid.update({
        where: { id: bid.id },
        data: { status: BidStatus.ACCEPTED },
      });
      await tx.jobTimeline.create({
        data: {
          jobId: booking.jobId,
          event: "PROVIDER_ASSIGNED",
          description: "Customer accepted the provider's counter-offer",
        },
      });
      return updated;
    });

    void this.notifications.send({
      userId: booking.providerId,
      type: NotificationType.BID_ACCEPTED,
      title: "Counter-offer accepted 🎉",
      message: `Your price for "${booking.job.title}" was accepted. The job is yours.`,
      relatedEntityType: "BOOKING",
      relatedEntityId: bookingId,
    });

    return result;
  }

  /**
   * Customer turns the counter down. The booking stays PENDING at its original
   * price, so the provider can still accept it or decline outright — declining
   * a price is not the same as declining the job.
   */
  async declineBookingCounter(customerId: string, bookingId: string) {
    const { booking, bid } = await this.getPendingCounter(
      customerId,
      bookingId,
    );

    await this.prisma.bid.update({
      where: { id: bid.id },
      data: { status: BidStatus.REJECTED },
    });

    void this.notifications.send({
      userId: booking.providerId,
      type: NotificationType.BID_REJECTED,
      title: "Counter-offer declined",
      message: `The customer kept their original price for "${booking.job.title}". You can still accept or decline the booking.`,
      relatedEntityType: "BOOKING",
      relatedEntityId: bookingId,
    });

    return { message: "Counter-offer declined", bookingId };
  }

  /** Shared lookup + ownership/state checks for both counter responses. */
  private async getPendingCounter(customerId: string, bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { job: true },
    });

    if (!booking) throw new NotFoundException("Booking not found");
    if (booking.customerId !== customerId) {
      throw new ForbiddenException("You can only respond to your own bookings");
    }
    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException(
        `This request is already ${booking.status.toLowerCase()}`,
      );
    }

    const bid = await this.prisma.bid.findFirst({
      where: {
        jobId: booking.jobId,
        providerId: booking.providerId,
        status: BidStatus.PENDING,
      },
      orderBy: { createdAt: "desc" },
    });
    if (!bid) {
      throw new BadRequestException(
        "There is no counter-offer waiting on this booking",
      );
    }

    return { booking, bid };
  }

  async declineBookingRequest(
    providerId: string,
    bookingId: string,
    reason?: string,
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { job: true },
    });

    if (!booking) throw new NotFoundException("Booking not found");
    if (booking.providerId !== providerId) {
      throw new ForbiddenException(
        "You can only respond to your own booking requests",
      );
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
          event: "PROVIDER_DECLINED",
          description: reason
            ? `Provider declined the request: ${reason}`
            : "Provider declined the request",
        },
      });
      return updated;
    });

    void this.notifications.send({
      userId: booking.customerId,
      type: NotificationType.JOB_CANCELLED,
      title: "Provider declined",
      message: `Your request for "${booking.job.title}" was declined. The job is open for other providers.`,
      relatedEntityType: "JOB",
      relatedEntityId: booking.jobId,
    });

    this.logger.log({
      message: "Direct booking declined",
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
      throw new NotFoundException("Booking not found");
    }

    if (booking.providerId !== providerId) {
      throw new ForbiddenException("You can only start your own assigned jobs");
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
          event: "WORK_STARTED",
          description: "Provider started work",
        },
      });

      return updatedBooking;
    });

    this.logger.log({
      message: "Work started",
      bookingId,
      jobId: booking.jobId,
      providerId,
    });

    // Notify the customer that work has started
    void this.notifications.send({
      userId: booking.customerId,
      type: NotificationType.JOB_STARTED,
      title: "Work has started 🛠️",
      message: "The provider has started work on your job.",
      relatedEntityType: "BOOKING",
      relatedEntityId: bookingId,
    });

    return result;
  }

  // ─── Mark Job Completed (Provider) ───────────────────────────────────

  /**
   * Provider records their confirmation that work is completed.
   *
   * This does NOT trigger payment — it only records the provider's side of
   * the dual-confirmation gate.  Payment fires automatically once the
   * customer also confirms (or vice-versa, if the customer confirmed first).
   *
   * Idempotent: calling this twice for the same booking returns the same
   * result without side-effects.
   */
  async markJobCompleted(providerId: string, bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { job: true },
    });

    if (!booking) {
      throw new NotFoundException("Booking not found");
    }

    if (booking.providerId !== providerId) {
      throw new ForbiddenException(
        "You can only mark your own assigned jobs as completed",
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

    // ── Idempotent: already confirmed → return current state ────────────
    if (booking.providerConfirmedCompletion) {
      const bothConfirmed =
        booking.providerConfirmedCompletion &&
        booking.customerConfirmedCompletion;
      return {
        message: bothConfirmed
          ? "Both parties have already confirmed. Payment is being processed."
          : "Provider confirmation already recorded. Waiting for customer confirmation.",
        bookingId,
        jobId: booking.job.id,
        providerConfirmed: true,
        customerConfirmed: booking.customerConfirmedCompletion,
        paymentStatus: booking.paymentStatus,
      };
    }

    // Record provider confirmation
    const now = new Date();
    await this.prisma.$transaction(async (tx) => {
      await tx.booking.update({
        where: { id: bookingId },
        data: {
          providerConfirmedCompletion: true,
          providerConfirmedAt: now,
        },
      });

      await tx.jobTimeline.create({
        data: {
          jobId: booking.jobId,
          event: "PROVIDER_CONFIRMED_COMPLETION",
          description: "Provider confirmed work completion",
        },
      });
    });

    this.logger.log({
      message: "Provider confirmed completion",
      bookingId,
      jobId: booking.job.id,
      providerId,
    });

    // Notify the customer
    void this.notifications.send({
      userId: booking.customerId,
      type: NotificationType.COMPLETION_CONFIRMED,
      title: "Provider confirmed completion ✅",
      message:
        "The provider confirmed the job is done. Please confirm to release payment.",
      relatedEntityType: "BOOKING",
      relatedEntityId: bookingId,
    });

    // ── If customer already confirmed, attempt payment now ──────────────
    if (booking.customerConfirmedCompletion) {
      return this.attemptDualConfirmPayment(booking);
    }

    return {
      message:
        "Work completion confirmed by provider. Waiting for customer confirmation.",
      bookingId,
      jobId: booking.job.id,
      providerConfirmed: true,
      customerConfirmed: false,
      paymentStatus: booking.paymentStatus,
    };
  }

  // ─── Customer Confirm Completion ─────────────────────────────────────

  /**
   * Customer records their confirmation that work is completed.
   *
   * If the provider has also confirmed, the wallet payment is triggered
   * immediately.  Idempotent: calling this twice returns the same result.
   */
  async confirmCompletion(customerId: string, bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { job: true },
    });

    if (!booking) {
      throw new NotFoundException("Booking not found");
    }

    if (booking.customerId !== customerId) {
      throw new ForbiddenException(
        "You can only confirm completion for your own bookings",
      );
    }

    if (booking.status !== BookingStatus.IN_PROGRESS) {
      throw new BadRequestException(
        `Booking must be IN_PROGRESS to confirm completion. Current: ${booking.status.toLowerCase()}`,
      );
    }

    if (booking.job.status !== JobStatus.IN_PROGRESS) {
      throw new BadRequestException(
        `Job must be IN_PROGRESS to confirm completion. Current: ${booking.job.status}`,
      );
    }

    // ── Idempotent: already confirmed → return current state ────────────
    if (booking.customerConfirmedCompletion) {
      const bothConfirmed =
        booking.providerConfirmedCompletion &&
        booking.customerConfirmedCompletion;
      return {
        message: bothConfirmed
          ? "Both parties have already confirmed. Payment is being processed."
          : "Customer confirmation already recorded. Waiting for provider confirmation.",
        bookingId,
        jobId: booking.job.id,
        providerConfirmed: booking.providerConfirmedCompletion,
        customerConfirmed: true,
        paymentStatus: booking.paymentStatus,
      };
    }

    // Record customer confirmation
    const now = new Date();
    await this.prisma.$transaction(async (tx) => {
      await tx.booking.update({
        where: { id: bookingId },
        data: {
          customerConfirmedCompletion: true,
          customerConfirmedAt: now,
        },
      });

      await tx.jobTimeline.create({
        data: {
          jobId: booking.jobId,
          event: "CUSTOMER_CONFIRMED_COMPLETION",
          description: "Customer confirmed work completion",
        },
      });
    });

    this.logger.log({
      message: "Customer confirmed completion",
      bookingId,
      jobId: booking.job.id,
      customerId,
    });

    // Notify the provider
    void this.notifications.send({
      userId: booking.providerId,
      type: NotificationType.COMPLETION_CONFIRMED,
      title: "Customer confirmed completion ✅",
      message:
        "The customer confirmed the job is done. Payment will be released shortly.",
      relatedEntityType: "BOOKING",
      relatedEntityId: bookingId,
    });

    // ── If provider already confirmed, attempt payment now ──────────────
    if (booking.providerConfirmedCompletion) {
      return this.attemptDualConfirmPayment(booking);
    }

    return {
      message:
        "Work completion confirmed by customer. Waiting for provider confirmation.",
      bookingId,
      jobId: booking.job.id,
      providerConfirmed: false,
      customerConfirmed: true,
      paymentStatus: booking.paymentStatus,
    };
  }

  // ─── Dual-confirm payment trigger ──────────────────────────────────

  /**
   * Shared helper invoked when the second party confirms and both sides
   * are now recorded.  Delegates to the wallet service which handles
   * sufficient / insufficient balance atomically.
   */
  private async attemptDualConfirmPayment(booking: {
    id: string;
    jobId: string;
    customerId: string;
    providerId: string;
    totalAmount: import("generated/prisma/client").Prisma.Decimal;
    paymentStatus: string;
  }) {
    const result = await this.wallet.processJobPayment(booking.id);

    if (result.success) {
      // Record the canonical confirmation timestamp (dispute window anchor)
      // The transaction in processJobPayment already sets completedAt, but
      // we also want confirmedAt for the 48-hour dispute window.

      // Module 21 realtime: nudge admin dashboards
      void this.realtime.publishAnalyticsUpdated("job_completion_confirmed");

      // Module 19: rank evaluation (fire-and-forget)
      void this.ranking
        .evaluateProviderRank(booking.providerId, "Job completion confirmed")
        .catch((err) => {
          const error = err as { message?: string };
          this.logger.error(
            { err: error, providerId: booking.providerId },
            "Rank evaluation failed after job completion",
          );
        });

      this.logger.log({
        message: "Dual-confirm payment completed",
        bookingId: booking.id,
        jobId: booking.jobId,
      });

      return {
        message:
          "Work completion confirmed by both parties. Payment completed successfully.",
        bookingId: booking.id,
        jobId: booking.jobId,
        paymentStatus: "COMPLETED",
        gross: result.gross,
        commission: result.commission,
        net: result.net,
      };
    }

    // Insufficient funds — payment is PAYMENT_PENDING
    return {
      message:
        "Work completion confirmed by both parties. Additional wallet funds are required before payment can be completed.",
      bookingId: booking.id,
      jobId: booking.jobId,
      paymentStatus: result.paymentStatus,
      required: result.gross,
      available: result.available,
      additionalRequired: result.additionalRequired,
    };
  }

  // ─── Cancel Booking (Customer - before work starts) ──────────────────

  async cancelBooking(customerId: string, bookingId: string, reason?: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { job: true },
    });

    if (!booking) {
      throw new NotFoundException("Booking not found");
    }

    if (booking.customerId !== customerId) {
      throw new ForbiddenException("You can only cancel your own bookings");
    }

    if (booking.status !== BookingStatus.ACCEPTED) {
      throw new BadRequestException(
        "Bookings can only be cancelled before work starts",
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
          cancelledBy: "CUSTOMER",
          cancellationType: CancellationType.CUSTOMER,
          reason: reason || "Cancelled by customer before work started",
        },
      });

      // Record timeline
      await tx.jobTimeline.create({
        data: {
          jobId: booking.jobId,
          event: "BOOKING_CANCELLED",
          description: "Booking cancelled by customer",
        },
      });

      return cancelledBooking;
    });

    this.logger.log({
      message: "Booking cancelled",
      bookingId,
      jobId: booking.jobId,
      customerId,
      reason,
    });

    // Notify the provider
    void this.notifications.send({
      userId: booking.providerId,
      type: NotificationType.JOB_CANCELLED,
      title: "Booking cancelled",
      message: "The customer cancelled the booking before work started.",
      relatedEntityType: "BOOKING",
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
      throw new NotFoundException("Booking not found");
    }

    if (booking.providerId !== providerId) {
      throw new ForbiddenException(
        "You can only cancel your own assigned bookings",
      );
    }

    if (booking.status !== BookingStatus.ACCEPTED) {
      throw new BadRequestException(
        "Bookings can only be cancelled before work starts",
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
          cancelledBy: "PROVIDER",
          cancellationType: CancellationType.PROVIDER,
          reason: reason || "Cancelled by provider before work started",
        },
      });

      await tx.jobTimeline.create({
        data: {
          jobId: booking.jobId,
          event: "BOOKING_CANCELLED",
          description: "Booking cancelled by provider",
        },
      });

      return { cancelledBooking, cancellation };
    });

    this.logger.log({
      message: "Booking cancelled by provider",
      bookingId,
      jobId: booking.jobId,
      providerId,
      reason,
    });

    // Notify the customer
    void this.notifications.send({
      userId: booking.customerId,
      type: NotificationType.JOB_CANCELLED,
      title: "Booking cancelled",
      message: "The provider cancelled the booking before work started.",
      relatedEntityType: "BOOKING",
      relatedEntityId: bookingId,
    });

    // Run the automatic penalty engine (Module 13) — evaluates and applies
    // the appropriate warning / suspension / ban for this cancellation.
    await this.penalties.evaluateProviderCancellation(
      providerId,
      result.cancellation.id,
      reason || "Cancelled by provider before work started",
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
      sortOrder = "desc",
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.BookingWhereInput = {
      customerId,
      ...(status && { status: status as BookingStatus }),
      ...(dateFrom || dateTo
        ? {
            createdAt: {
              ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
              ...(dateTo ? { lte: new Date(dateTo + "T23:59:59Z") } : {}),
            },
          }
        : {}),
      ...(categoryId ? { job: { categoryId } } : {}),
    };

    const orderByField =
      sortBy === BookingSortField.TOTAL_AMOUNT ? "totalAmount" : "createdAt";

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
              subcategory: true,
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
      sortOrder = "desc",
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.BookingWhereInput = {
      providerId,
      ...(status && { status: status as BookingStatus }),
      ...(dateFrom || dateTo
        ? {
            createdAt: {
              ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
              ...(dateTo ? { lte: new Date(dateTo + "T23:59:59Z") } : {}),
            },
          }
        : {}),
      ...(categoryId ? { job: { categoryId } } : {}),
    };

    const orderByField =
      sortBy === BookingSortField.TOTAL_AMOUNT ? "totalAmount" : "createdAt";

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
              subcategory: true,
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
            subcategory: true,
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
      throw new NotFoundException("Booking not found");
    }

    // Authorization: must be customer, assigned provider, or admin
    if (booking.customerId !== userId && booking.providerId !== userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });
      if (user?.role !== UserRole.ADMIN) {
        throw new ForbiddenException("Access denied");
      }
    }

    return booking;
  }

  /**
   * The caller's live booking for a job, or null.
   *
   * Notifications about bids and jobs carry a *job* id, while both apps key
   * their job screens by *booking* id — so tapping "your offer was accepted"
   * used to dump the provider on the feed, which no longer lists the job they
   * just won ("No jobs available in your categories right now"). This is the
   * lookup that turns one id into the other.
   *
   * Returns null rather than 404 when there is simply no booking yet: an open
   * job with no accepted bid is a perfectly ordinary answer.
   */
  async findBookingForJob(userId: string, jobId: string) {
    const booking = await this.prisma.booking.findFirst({
      where: {
        jobId,
        OR: [{ customerId: userId }, { providerId: userId }],
      },
      // Newest first, and never resurrect a cancelled booking over a live one.
      orderBy: [
        { cancelledAt: { sort: "asc", nulls: "first" } },
        { createdAt: "desc" },
      ],
      select: { id: true },
    });

    if (!booking) return { bookingId: null };

    return { bookingId: booking.id };
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
      throw new NotFoundException("Job not found");
    }

    // Find the most recent non-cancelled booking to check provider access
    const activeBooking = await this.prisma.booking.findFirst({
      where: {
        jobId,
        status: { notIn: ["CANCELLED"] },
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
        throw new ForbiddenException("Access denied");
      }
    }

    const timeline = await this.prisma.jobTimeline.findMany({
      where: { jobId },
      orderBy: { createdAt: "asc" },
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
        // PENDING included so an unanswered direct booking request surfaces on
        // the provider's dashboard rather than sitting unseen in their list.
        status: {
          in: [
            BookingStatus.PENDING,
            BookingStatus.ACCEPTED,
            BookingStatus.IN_PROGRESS,
          ],
        },
      },
      include: {
        job: {
          include: {
            category: true,
            subcategory: true,
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
      orderBy: { createdAt: "desc" },
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
            subcategory: true,
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
      orderBy: { createdAt: "desc" },
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
      sortOrder = "desc",
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.BookingWhereInput = {
      ...(status && { status: status as BookingStatus }),
      ...(dateFrom || dateTo
        ? {
            createdAt: {
              ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
              ...(dateTo ? { lte: new Date(dateTo + "T23:59:59Z") } : {}),
            },
          }
        : {}),
      ...(categoryId ? { job: { categoryId } } : {}),
      ...(search
        ? {
            OR: [
              { id: search },
              { job: { title: { contains: search, mode: "insensitive" } } },
            ],
          }
        : {}),
      ...(customerId ? { customerId } : {}),
      ...(providerId ? { providerId } : {}),
      ...(cityId ? { customer: { cityId } } : {}),
    };

    const orderByField =
      sortBy === BookingSortField.TOTAL_AMOUNT ? "totalAmount" : "createdAt";

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderByField]: sortOrder },
        include: {
          job: { include: { category: true, subcategory: true } },
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
        job: { include: { category: true, subcategory: true, images: true } },
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
          include: { messages: { orderBy: { createdAt: "asc" } } },
        },
      },
    });
    if (!booking) {
      throw new NotFoundException("Booking not found");
    }
    return booking;
  }

  // ─── Expired Job Cleanup ─────────────────────────────────────────────

  /**
   * Module 20: jobs (urgent or normal) must expire on their own — this runs
   * every 15 minutes so a 6-hour urgent job never lingers in feeds. Uses the
   * existing expiresAt-driven mechanism; the admin endpoint can still trigger
   * it manually.
   */
  @Cron("*/15 * * * *")
  async expireOverdueJobs(): Promise<number> {
    // Find jobs that have no active (non-cancelled) booking
    const jobsWithActiveBooking = await this.prisma.booking.findMany({
      where: {
        status: { notIn: ["CANCELLED", "COMPLETED", "DISPUTED"] },
      },
      select: { jobId: true },
      distinct: ["jobId"],
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
          timeline: { none: { event: "JOB_EXPIRED" } },
        },
        select: { id: true, title: true, customerId: true, isUrgent: true },
      });

      for (const job of expiredJobs) {
        await this.recordJobTimeline(
          job.id,
          "JOB_EXPIRED",
          "Job expired due to no provider selection",
        );

        // Module 20 realtime: urgent jobs get a dedicated expired event on
        // the owner's private channel (after the status change commits).
        if (job.isUrgent) {
          void this.realtime.publishUrgentJobExpired(job.customerId, {
            jobId: job.id,
            title: job.title,
            isUrgent: true,
            expiredAt: new Date(),
          });
        }
      }

      // Expire all pending bids for these jobs
      for (const job of expiredJobs) {
        await this.prisma.bid.updateMany({
          where: {
            jobId: job.id,
            status: "PENDING",
          },
          data: { status: "EXPIRED" },
        });
      }

      this.logger.log({
        message: "Expired overdue jobs",
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
      jobCreated: events["JOB_CREATED"] || null,
      firstBid: events["BID_RECEIVED"] || null,
      bidAccepted: events["BID_ACCEPTED"] || null,
      providerAssigned:
        events["PROVIDER_ASSIGNED"] || events["PROVIDER_ACCEPTED"] || null,
      workStarted: events["WORK_STARTED"] || null,
      workCompleted: events["WORK_COMPLETED"] || null,
      // The event confirmCompletion actually writes. The old
      // "CUSTOMER_CONFIRMED" key never matched anything, so this was always null.
      customerConfirmed: events["CUSTOMER_CONFIRMED_COMPLETION"] || null,
      cancelled: events["BOOKING_CANCELLED"] || null,
      expired: events["JOB_EXPIRED"] || null,
      currentJobStatus: currentStatus,
      currentBookingStatus: booking?.status || null,
    };
  }
}
