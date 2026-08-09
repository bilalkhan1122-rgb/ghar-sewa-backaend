import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { ReviewQueryDto } from './dtos/review-query.dto';
import { Logger } from 'nestjs-pino';
import { ReviewStatus } from 'generated/prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
export declare const REVIEW_EDIT_WINDOW_HOURS = 24;
export declare const LOW_RATING_THRESHOLD = 3;
export declare class ReviewsService {
    private readonly prisma;
    private readonly logger;
    private readonly notifications;
    constructor(prisma: PrismaService, logger: Logger, notifications: NotificationsService);
    createReview(userId: string, dto: CreateReviewDto): Promise<{
        reviewer: {
            id: string;
            fullName: string;
            profilePhoto: string | null;
        };
        reviewee: {
            id: string;
            fullName: string;
            profilePhoto: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: ReviewStatus;
        deletedAt: Date | null;
        providerId: string;
        jobId: string;
        customerId: string;
        bookingId: string;
        reviewerId: string;
        revieweeId: string;
        rating: number;
        reviewText: string | null;
    }>;
    updateReview(userId: string, reviewId: string, dto: UpdateReviewDto): Promise<{
        reviewer: {
            id: string;
            fullName: string;
            profilePhoto: string | null;
        };
        reviewee: {
            id: string;
            fullName: string;
            profilePhoto: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: ReviewStatus;
        deletedAt: Date | null;
        providerId: string;
        jobId: string;
        customerId: string;
        bookingId: string;
        reviewerId: string;
        revieweeId: string;
        rating: number;
        reviewText: string | null;
    }>;
    deleteReview(userId: string, reviewId: string): Promise<{
        message: string;
    }>;
    listWrittenReviews(userId: string, query: ReviewQueryDto): Promise<{
        data: unknown[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    }>;
    listReceivedReviews(userId: string, query: ReviewQueryDto): Promise<{
        data: unknown[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    }>;
    getProviderPublicReviews(providerId: string, query: ReviewQueryDto): Promise<{
        averageRating: number | import("@prisma/client/runtime/library").Decimal;
        totalReviews: number;
        distribution: {
            fiveStar: number;
            fourStar: number;
            threeStar: number;
            twoStar: number;
            oneStar: number;
        };
        data: ({
            booking: {
                id: string;
                totalAmount: import("@prisma/client/runtime/library").Decimal;
                completedAt: Date | null;
            };
            job: {
                id: string;
                title: string;
                category: {
                    id: string;
                    name: string;
                    icon: string | null;
                };
            };
            reviewer: {
                id: string;
                fullName: string;
                profilePhoto: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: ReviewStatus;
            deletedAt: Date | null;
            providerId: string;
            jobId: string;
            customerId: string;
            bookingId: string;
            reviewerId: string;
            revieweeId: string;
            rating: number;
            reviewText: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    }>;
    getRatingSummary(userId: string): Promise<{
        userId: string;
        averageRating: number;
        totalReviews: number;
        distribution: {
            fiveStar: number;
            fourStar: number;
            threeStar: number;
            twoStar: number;
            oneStar: number;
        };
    } | {
        userId: string;
        averageRating: import("@prisma/client/runtime/library").Decimal;
        totalReviews: number;
        distribution: {
            fiveStar: number;
            fourStar: number;
            threeStar: number;
            twoStar: number;
            oneStar: number;
        };
    }>;
    private getOwnReview;
    private recomputeRatingSummary;
    private monitorLowRating;
    private publicIncludes;
    private paginate;
}
