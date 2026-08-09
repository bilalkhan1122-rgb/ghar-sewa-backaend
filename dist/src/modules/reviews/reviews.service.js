"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = exports.LOW_RATING_THRESHOLD = exports.REVIEW_EDIT_WINDOW_HOURS = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const review_query_dto_1 = require("./dtos/review-query.dto");
const nestjs_pino_1 = require("nestjs-pino");
const client_1 = require("../../../generated/prisma/client");
const notifications_service_1 = require("../notifications/notifications.service");
exports.REVIEW_EDIT_WINDOW_HOURS = 24;
exports.LOW_RATING_THRESHOLD = 3.0;
let ReviewsService = class ReviewsService {
    prisma;
    logger;
    notifications;
    constructor(prisma, logger, notifications) {
        this.prisma = prisma;
        this.logger = logger;
        this.notifications = notifications;
    }
    async createReview(userId, dto) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: dto.bookingId },
            include: { job: { include: { timeline: true } } },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.customerId !== userId && booking.providerId !== userId) {
            throw new common_1.ForbiddenException('You can only review bookings you were part of');
        }
        const confirmedByCustomer = booking.job.timeline.some((t) => t.event === 'CUSTOMER_CONFIRMED');
        if (booking.status !== client_1.BookingStatus.COMPLETED) {
            throw new common_1.BadRequestException('Reviews are only allowed after a booking has been completed');
        }
        if (!confirmedByCustomer) {
            throw new common_1.BadRequestException('Booking must be confirmed by the customer before it can be reviewed');
        }
        const reviewerId = userId;
        const revieweeId = userId === booking.customerId ? booking.providerId : booking.customerId;
        const existing = await this.prisma.review.findUnique({
            where: {
                bookingId_reviewerId: {
                    bookingId: booking.id,
                    reviewerId: userId,
                },
            },
        });
        if (existing && !existing.deletedAt) {
            throw new common_1.BadRequestException('You have already reviewed this booking');
        }
        if (existing && existing.deletedAt) {
            throw new common_1.BadRequestException('You have already reviewed this booking. Reviews remain linked to a booking permanently.');
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
                status: client_1.ReviewStatus.APPROVED,
            },
            include: {
                reviewer: { select: { id: true, fullName: true, profilePhoto: true } },
                reviewee: { select: { id: true, fullName: true, profilePhoto: true } },
            },
        });
        await this.recomputeRatingSummary(revieweeId);
        void this.notifications.send({
            userId: revieweeId,
            type: client_1.NotificationType.REVIEW_RECEIVED,
            title: 'You received a new review ⭐',
            message: `Someone rated you ${dto.rating}/5 on a recent booking.`,
            relatedEntityType: 'REVIEW',
            relatedEntityId: review.id,
        });
        this.logger.log({
            message: 'Review submitted',
            reviewId: review.id,
            bookingId: booking.id,
            reviewerId,
            revieweeId,
            rating: dto.rating,
        });
        return review;
    }
    async updateReview(userId, reviewId, dto) {
        const review = await this.getOwnReview(userId, reviewId);
        const editDeadline = new Date(review.createdAt.getTime() + exports.REVIEW_EDIT_WINDOW_HOURS * 60 * 60 * 1000);
        if (new Date() > editDeadline) {
            throw new common_1.ForbiddenException(`Reviews can only be edited within ${exports.REVIEW_EDIT_WINDOW_HOURS} hours of submission`);
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
        await this.recomputeRatingSummary(review.revieweeId);
        this.logger.log({
            message: 'Review updated',
            reviewId,
            reviewerId: userId,
        });
        return updated;
    }
    async deleteReview(userId, reviewId) {
        const review = await this.getOwnReview(userId, reviewId);
        const editDeadline = new Date(review.createdAt.getTime() + exports.REVIEW_EDIT_WINDOW_HOURS * 60 * 60 * 1000);
        if (new Date() > editDeadline) {
            throw new common_1.ForbiddenException(`Reviews can only be deleted within ${exports.REVIEW_EDIT_WINDOW_HOURS} hours of submission`);
        }
        await this.prisma.review.update({
            where: { id: reviewId },
            data: { deletedAt: new Date() },
        });
        await this.recomputeRatingSummary(review.revieweeId);
        this.logger.log({
            message: 'Review deleted (soft)',
            reviewId,
            reviewerId: userId,
        });
        return { message: 'Review deleted successfully' };
    }
    async listWrittenReviews(userId, query) {
        const { page = 1, limit = 10, rating, sortBy, sortOrder = 'desc' } = query;
        const skip = (page - 1) * limit;
        const where = {
            reviewerId: userId,
            deletedAt: null,
            ...(rating ? { rating } : {}),
        };
        const [data, total] = await Promise.all([
            this.prisma.review.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy || review_query_dto_1.ReviewSortField.CREATED_AT]: sortOrder },
                include: this.publicIncludes(),
            }),
            this.prisma.review.count({ where }),
        ]);
        return this.paginate(data, total, page, limit);
    }
    async listReceivedReviews(userId, query) {
        const { page = 1, limit = 10, rating, sortBy, sortOrder = 'desc' } = query;
        const skip = (page - 1) * limit;
        const where = {
            revieweeId: userId,
            deletedAt: null,
            ...(rating ? { rating } : {}),
        };
        const [data, total] = await Promise.all([
            this.prisma.review.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy || review_query_dto_1.ReviewSortField.CREATED_AT]: sortOrder },
                include: this.publicIncludes(),
            }),
            this.prisma.review.count({ where }),
        ]);
        return this.paginate(data, total, page, limit);
    }
    async getProviderPublicReviews(providerId, query) {
        const provider = await this.prisma.user.findUnique({
            where: { id: providerId },
            select: {
                id: true,
                role: true,
                isActive: true,
                verificationStatus: true,
            },
        });
        if (!provider ||
            provider.role !== client_1.UserRole.PROVIDER ||
            !provider.isActive ||
            provider.verificationStatus !== client_1.VerificationStatus.APPROVED) {
            throw new common_1.NotFoundException('Provider not found');
        }
        const { page = 1, limit = 10, rating, sortBy, sortOrder = 'desc' } = query;
        const skip = (page - 1) * limit;
        const where = {
            revieweeId: providerId,
            status: client_1.ReviewStatus.APPROVED,
            deletedAt: null,
            ...(rating ? { rating } : {}),
        };
        const [data, total, summary] = await Promise.all([
            this.prisma.review.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy || review_query_dto_1.ReviewSortField.CREATED_AT]: sortOrder },
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
    async getRatingSummary(userId) {
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
    async getOwnReview(userId, reviewId) {
        const review = await this.prisma.review.findUnique({
            where: { id: reviewId },
        });
        if (!review || review.deletedAt) {
            throw new common_1.NotFoundException('Review not found');
        }
        if (review.reviewerId !== userId) {
            throw new common_1.ForbiddenException('You can only manage your own reviews');
        }
        return review;
    }
    async recomputeRatingSummary(userId) {
        const reviews = await this.prisma.review.findMany({
            where: {
                revieweeId: userId,
                status: client_1.ReviewStatus.APPROVED,
                deletedAt: null,
            },
            select: { rating: true },
        });
        const total = reviews.length;
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        const average = total > 0 ? sum / total : 0;
        const countFor = (stars) => reviews.filter((r) => r.rating === stars).length;
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
        await this.monitorLowRating(userId, average);
    }
    async monitorLowRating(userId, averageRating) {
        if (averageRating >= exports.LOW_RATING_THRESHOLD)
            return;
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER)
            return;
        const openFlag = await this.prisma.ratingFlag.findFirst({
            where: { providerId: userId, status: client_1.RatingFlagStatus.OPEN },
        });
        if (openFlag)
            return;
        const flag = await this.prisma.ratingFlag.create({
            data: {
                providerId: userId,
                reason: `Average rating fell below ${exports.LOW_RATING_THRESHOLD.toFixed(1)} (current: ${averageRating.toFixed(2)})`,
                averageRating,
                status: client_1.RatingFlagStatus.OPEN,
            },
        });
        this.logger.log({
            message: 'LOW_RATING: Provider flagged for admin review',
            providerId: userId,
            averageRating,
            flagId: flag.id,
        });
    }
    publicIncludes() {
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
    paginate(data, total, page, limit) {
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
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        nestjs_pino_1.Logger,
        notifications_service_1.NotificationsService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map