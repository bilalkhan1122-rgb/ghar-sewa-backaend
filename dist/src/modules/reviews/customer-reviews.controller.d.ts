import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { ReviewQueryDto } from './dtos/review-query.dto';
export declare class CustomerReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
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
        status: import("generated/prisma/client").ReviewStatus;
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
    listWritten(userId: string, query: ReviewQueryDto): Promise<{
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
    listReceived(userId: string, query: ReviewQueryDto): Promise<{
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
    getSummary(userId: string): Promise<{
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
    updateReview(userId: string, id: string, dto: UpdateReviewDto): Promise<{
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
        status: import("generated/prisma/client").ReviewStatus;
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
    deleteReview(userId: string, id: string): Promise<{
        message: string;
    }>;
}
