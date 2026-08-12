import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReviewDto } from "./dtos/create-review.dto";
import { UpdateReviewDto } from "./dtos/update-review.dto";
import { ReviewQueryDto, ReviewSortField } from "./dtos/review-query.dto";
import { Logger } from "nestjs-pino";
import {
  Prisma,
  ReviewStatus,
  BookingStatus,
  RatingFlagStatus,
  UserRole,
  VerificationStatus,
  NotificationType,
} from "generated/prisma/client";
import { NotificationsService } from "../notifications/notifications.service";
import { RankingService } from "../ranking/ranking.service";
import { RealtimeService } from "../realtime/realtime.service";

/**
 * Configurable edit window (hours). Users may only update/delete
 * their own review within this window after creation.
 */
export const REVIEW_EDIT_WINDOW_HOURS = 24;

/**
 * If a provider's average rating falls below this threshold they are
 * automatically flagged for future admin review.
 */
export const LOW_RATING_THRESHOLD = 3.0;

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly notifications: NotificationsService,
    private readonly ranking: RankingService,
    private readonly realtime: RealtimeService,
  ) {}

  // ─── Submit Review ───────────────────────────────────────────────────

  async createReview(userId: string, dto: CreateReviewDto) {
    // Booking must exist
    const booking = await this.prisma.booking.findUnique({
      where: { id: dto.bookingId },
      include: { job: { include: { timeline: true } } },
    });

    if (!booking) {
      throw new NotFoundException("Booking not found");
    }

    // Reviewer must be part of the booking (customer or assigned provider)
    if (booking.customerId !== userId && booking.providerId !== userId) {
      throw new ForbiddenException(
        "You can only review bookings you were part of",
      );
    }

    // Booking must be completed and confirmed by the customer
    const confirmedByCustomer = booking.job.timeline.some(
      (t) => t.event === "CUSTOMER_CONFIRMED",
    );

    if (booking.status !== BookingStatus.COMPLETED) {
      throw new BadRequestException(
        "Reviews are only allowed after a booking has been completed",
      );
    }

    if (!confirmedByCustomer) {
      throw new BadRequestException(
        "Booking must be confirmed by the customer before it can be reviewed",
      );
    }

    // Determine reviewer / reviewee — self-review is prohibited
    const reviewerId = userId;
    const revieweeId =
      userId === booking.customerId ? booking.providerId : booking.customerId;

    // One review per party per booking
    const existing = await this.prisma.review.findUnique({
      where: {
        bookingId_reviewerId: {
          bookingId: booking.id,
          reviewerId: userId,
        },
      },
    });

    if (existing && !existing.deletedAt) {
      throw new BadRequestException("You have already reviewed this booking");
    }

    if (existing && existing.deletedAt) {
      throw new BadRequestException(
        "You have already reviewed this booking. Reviews remain linked to a booking permanently.",
      );
    }

    const review = await this.prisma.review.create({
      data: {
        bookingId: booking.id,
        jobId: booking.jobId,
        customerId: booking.customerId,
        providerId: booking.providerId,
        reviewerId,
        revieweeId,
        rating: dto.rating,
        reviewText: dto.reviewText,
        status: ReviewStatus.APPROVED,
      },
      include: {
        reviewer: { select: { id: true, fullName: true, profilePhoto: true } },
        reviewee: { select: { id: true, fullName: true, profilePhoto: true } },
      },
    });

    // Maintain rating statistics for the reviewee
    await this.recomputeRatingSummary(revieweeId);

    // Notify the reviewee of their new review
    void this.notifications.send({
      userId: revieweeId,
      type: NotificationType.REVIEW_RECEIVED,
      title: "You received a new review ⭐",
      message: `Someone rated you ${dto.rating}/5 on a recent booking.`,
      relatedEntityType: "REVIEW",
      relatedEntityId: review.id,
    });

    this.logger.log({
      message: "Review submitted",
      reviewId: review.id,
      bookingId: booking.id,
      reviewerId,
      revieweeId,
      rating: dto.rating,
    });

    return review;
  }

  // ─── Update Own Review ───────────────────────────────────────────────

  async updateReview(userId: string, reviewId: string, dto: UpdateReviewDto) {
    const review = await this.getOwnReview(userId, reviewId);

    // Configurable edit window
    const editDeadline = new Date(
      review.createdAt.getTime() + REVIEW_EDIT_WINDOW_HOURS * 60 * 60 * 1000,
    );
    if (new Date() > editDeadline) {
      throw new ForbiddenException(
        `Reviews can only be edited within ${REVIEW_EDIT_WINDOW_HOURS} hours of submission`,
      );
    }

    const updated = await this.prisma.review.update({
      where: { id: reviewId },
      data: {
        ...(dto.rating !== undefined && { rating: dto.rating }),
        ...(dto.reviewText !== undefined && { reviewText: dto.reviewText }),
      },
      include: {
        reviewer: { select: { id: true, fullName: true, profilePhoto: true } },
        reviewee: { select: { id: true, fullName: true, profilePhoto: true } },
      },
    });

    // Rating may have changed — refresh statistics
    await this.recomputeRatingSummary(review.revieweeId);

    this.logger.log({
      message: "Review updated",
      reviewId,
      reviewerId: userId,
    });

    return updated;
  }

  // ─── Delete Own Review (soft delete) ─────────────────────────────────

  async deleteReview(userId: string, reviewId: string) {
    const review = await this.getOwnReview(userId, reviewId);

    // Configurable edit window
    const editDeadline = new Date(
      review.createdAt.getTime() + REVIEW_EDIT_WINDOW_HOURS * 60 * 60 * 1000,
    );
    if (new Date() > editDeadline) {
      throw new ForbiddenException(
        `Reviews can only be deleted within ${REVIEW_EDIT_WINDOW_HOURS} hours of submission`,
      );
    }

    await this.prisma.review.update({
      where: { id: reviewId },
      data: { deletedAt: new Date() },
    });

    // Review removed from stats
    await this.recomputeRatingSummary(review.revieweeId);

    this.logger.log({
      message: "Review deleted (soft)",
      reviewId,
      reviewerId: userId,
    });

    return { message: "Review deleted successfully" };
  }

  // ─── View Written Reviews ────────────────────────────────────────────

  async listWrittenReviews(userId: string, query: ReviewQueryDto) {
    const { page = 1, limit = 10, rating, sortBy, sortOrder = "desc" } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ReviewWhereInput = {
      reviewerId: userId,
      deletedAt: null,
      ...(rating ? { rating } : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.review.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy || ReviewSortField.CREATED_AT]: sortOrder },
        include: this.publicIncludes(),
      }),
      this.prisma.review.count({ where }),
    ]);

    return this.paginate(data, total, page, limit);
  }

  // ─── View Received Reviews ───────────────────────────────────────────

  async listReceivedReviews(userId: string, query: ReviewQueryDto) {
    const { page = 1, limit = 10, rating, sortBy, sortOrder = "desc" } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ReviewWhereInput = {
      revieweeId: userId,
      deletedAt: null,
      ...(rating ? { rating } : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.review.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy || ReviewSortField.CREATED_AT]: sortOrder },
        include: this.publicIncludes(),
      }),
      this.prisma.review.count({ where }),
    ]);

    return this.paginate(data, total, page, limit);
  }

  // ─── Public Provider Reviews ─────────────────────────────────────────

  async getProviderPublicReviews(providerId: string, query: ReviewQueryDto) {
    // Provider must exist, be approved and active
    const provider = await this.prisma.user.findUnique({
      where: { id: providerId },
      select: {
        id: true,
        role: true,
        isActive: true,
        verificationStatus: true,
      },
    });

    if (
      !provider ||
      provider.role !== UserRole.PROVIDER ||
      !provider.isActive ||
      provider.verificationStatus !== VerificationStatus.APPROVED
    ) {
      throw new NotFoundException("Provider not found");
    }

    const { page = 1, limit = 10, rating, sortBy, sortOrder = "desc" } = query;
    const skip = (page - 1) * limit;

    // Only approved, non-deleted reviews are publicly visible
    const where: Prisma.ReviewWhereInput = {
      revieweeId: providerId,
      status: ReviewStatus.APPROVED,
      deletedAt: null,
      ...(rating ? { rating } : {}),
    };

    const [data, total, summary] = await Promise.all([
      this.prisma.review.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy || ReviewSortField.CREATED_AT]: sortOrder },
        include: this.publicIncludes(),
      }),
      this.prisma.review.count({ where }),
      this.prisma.ratingSummary.findUnique({
        where: { userId: providerId },
      }),
    ]);

    return {
      averageRating: summary?.averageRating ?? 0,
      totalReviews: summary?.totalReviews ?? 0,
      distribution: {
        fiveStar: summary?.fiveStarCount ?? 0,
        fourStar: summary?.fourStarCount ?? 0,
        threeStar: summary?.threeStarCount ?? 0,
        twoStar: summary?.twoStarCount ?? 0,
        oneStar: summary?.oneStarCount ?? 0,
      },
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrevious: page > 1,
      },
    };
  }

  // ─── Rating Summary for a User ───────────────────────────────────────

  async getRatingSummary(userId: string) {
    const summary = await this.prisma.ratingSummary.findUnique({
      where: { userId },
    });

    if (!summary) {
      return {
        userId,
        averageRating: 0,
        totalReviews: 0,
        distribution: {
          fiveStar: 0,
          fourStar: 0,
          threeStar: 0,
          twoStar: 0,
          oneStar: 0,
        },
      };
    }

    return {
      userId,
      averageRating: summary.averageRating,
      totalReviews: summary.totalReviews,
      distribution: {
        fiveStar: summary.fiveStarCount,
        fourStar: summary.fourStarCount,
        threeStar: summary.threeStarCount,
        twoStar: summary.twoStarCount,
        oneStar: summary.oneStarCount,
      },
    };
  }

  // ─── Helpers ─────────────────────────────────────────────────────────

  private async getOwnReview(userId: string, reviewId: string) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review || review.deletedAt) {
      throw new NotFoundException("Review not found");
    }

    if (review.reviewerId !== userId) {
      throw new ForbiddenException("You can only manage your own reviews");
    }

    return review;
  }

  /**
   * Recompute the RatingSummary row for a user from their live reviews
   * (approved + non-deleted only). Creates the row if missing.
   * Also runs low-rating monitoring for providers.
   */
  private async recomputeRatingSummary(userId: string) {
    const reviews = await this.prisma.review.findMany({
      where: {
        revieweeId: userId,
        status: ReviewStatus.APPROVED,
        deletedAt: null,
      },
      select: { rating: true },
    });

    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = total > 0 ? sum / total : 0;
    const countFor = (stars: number) =>
      reviews.filter((r) => r.rating === stars).length;

    const fiveStar = countFor(5);
    const fourStar = countFor(4);
    const threeStar = countFor(3);
    const twoStar = countFor(2);
    const oneStar = countFor(1);

    await this.prisma.ratingSummary.upsert({
      where: { userId },
      create: {
        userId,
        averageRating: average,
        totalReviews: total,
        fiveStarCount: fiveStar,
        fourStarCount: fourStar,
        threeStarCount: threeStar,
        twoStarCount: twoStar,
        oneStarCount: oneStar,
      },
      update: {
        averageRating: average,
        totalReviews: total,
        fiveStarCount: fiveStar,
        fourStarCount: fourStar,
        threeStarCount: threeStar,
        twoStarCount: twoStar,
        oneStarCount: oneStar,
      },
    });

    // Low rating monitoring — only applies to providers
    await this.monitorLowRating(userId, average);

    // Module 19: a rating change (create/update/delete) can move the
    // provider's rank (fire-and-forget).
    void this.ranking
      .evaluateProviderRank(userId, "Review activity changed rating")
      .catch((err) => {
        const error = err as { message?: string };
        this.logger.error(
          { err: error, providerId: userId },
          "Rank evaluation failed after review change",
        );
      }); // Module 21 realtime: review changes move provider ratings/rankings —
    // nudge admin dashboards (after the summary row is committed).
    void this.realtime.publishAnalyticsUpdated("review_changed");
  }

  /**
   * If a provider's average rating falls below the threshold, create an
   * OPEN flag for future admin review (one open flag per provider).
   */
  private async monitorLowRating(userId: string, averageRating: number) {
    if (averageRating >= LOW_RATING_THRESHOLD) return;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== UserRole.PROVIDER) return;

    const openFlag = await this.prisma.ratingFlag.findFirst({
      where: { providerId: userId, status: RatingFlagStatus.OPEN },
    });

    if (openFlag) return;

    const flag = await this.prisma.ratingFlag.create({
      data: {
        providerId: userId,
        reason: `Average rating fell below ${LOW_RATING_THRESHOLD.toFixed(1)} (current: ${averageRating.toFixed(2)})`,
        averageRating,
        status: RatingFlagStatus.OPEN,
      },
    });

    this.logger.log({
      message: "LOW_RATING: Provider flagged for admin review",
      providerId: userId,
      averageRating,
      flagId: flag.id,
    });
  }

  private publicIncludes() {
    return {
      reviewer: {
        select: { id: true, fullName: true, profilePhoto: true },
      },
      booking: {
        select: {
          id: true,
          totalAmount: true,
          completedAt: true,
        },
      },
      job: {
        select: {
          id: true,
          title: true,
          category: { select: { id: true, name: true, icon: true } },
        },
      },
    };
  }

  private paginate(
    data: unknown[],
    total: number,
    page: number,
    limit: number,
  ) {
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
}
