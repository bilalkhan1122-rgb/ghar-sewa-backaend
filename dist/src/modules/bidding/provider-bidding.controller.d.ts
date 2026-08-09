import { BiddingService } from './bidding.service';
import { CreateBidDto } from './dtos/create-bid.dto';
import { UpdateBidDto } from './dtos/update-bid.dto';
import { BidQueryDto } from './dtos/bid-query.dto';
export declare class ProviderBiddingController {
    private readonly biddingService;
    constructor(biddingService: BiddingService);
    submitBid(userId: string, dto: CreateBidDto): Promise<{
        job: {
            id: string;
            customerId: string;
            title: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").BidStatus;
        providerId: string;
        jobId: string;
        offeredPrice: import("@prisma/client/runtime/library").Decimal;
        message: string | null;
    }>;
    acceptPrice(userId: string, jobId: string): Promise<{
        bid: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("generated/prisma/client").BidStatus;
            providerId: string;
            jobId: string;
            offeredPrice: import("@prisma/client/runtime/library").Decimal;
            message: string | null;
        };
        booking: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("generated/prisma/client").BookingStatus;
            providerId: string;
            jobId: string;
            customerId: string;
            bookingType: import("generated/prisma/client").BookingType;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            acceptedAt: Date | null;
            startedAt: Date | null;
            completedAt: Date | null;
            confirmedAt: Date | null;
            cancelledAt: Date | null;
        };
    }>;
    updateBid(userId: string, bidId: string, dto: UpdateBidDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").BidStatus;
        providerId: string;
        jobId: string;
        offeredPrice: import("@prisma/client/runtime/library").Decimal;
        message: string | null;
    }>;
    withdrawBid(userId: string, bidId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").BidStatus;
        providerId: string;
        jobId: string;
        offeredPrice: import("@prisma/client/runtime/library").Decimal;
        message: string | null;
    }>;
    listMyBids(userId: string, query: BidQueryDto): Promise<{
        data: ({
            job: {
                id: string;
                createdAt: Date;
                status: import("generated/prisma/client").JobStatus;
                title: string;
                offeredPrice: import("@prisma/client/runtime/library").Decimal;
                category: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    isActive: boolean;
                    slug: string;
                    description: string | null;
                    icon: string | null;
                    displayOrder: number;
                };
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("generated/prisma/client").BidStatus;
            providerId: string;
            jobId: string;
            offeredPrice: import("@prisma/client/runtime/library").Decimal;
            message: string | null;
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
    getAvailableJobs(userId: string): Promise<({
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            slug: string;
            description: string | null;
            icon: string | null;
            displayOrder: number;
        };
        customer: {
            id: string;
            fullName: string;
            profilePhoto: string | null;
            city: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
            };
        };
        images: {
            id: string;
            createdAt: Date;
            imageUrl: string;
            jobId: string;
        }[];
        bids: {
            id: string;
            status: import("generated/prisma/client").BidStatus;
            offeredPrice: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        status: import("generated/prisma/client").JobStatus;
        expiresAt: Date;
        description: string;
        categoryId: string;
        customerId: string;
        title: string;
        latitude: number;
        longitude: number;
        offeredPrice: import("@prisma/client/runtime/library").Decimal;
        preferredSchedule: Date | null;
        additionalNotes: string | null;
    })[]>;
}
