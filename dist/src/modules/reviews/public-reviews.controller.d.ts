import { ReviewsService } from './reviews.service';
import { ReviewQueryDto } from './dtos/review-query.dto';
export declare class PublicReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    getProviderReviews(providerId: string, query: ReviewQueryDto): Promise<{
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
            status: import("../../../generated/prisma/enums").ReviewStatus;
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
}
