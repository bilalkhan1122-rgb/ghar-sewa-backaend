import { BiddingService } from './bidding.service';
import { BidQueryDto } from './dtos/bid-query.dto';
export declare class CustomerBiddingController {
    private readonly biddingService;
    constructor(biddingService: BiddingService);
    getBidsForJob(userId: string, jobId: string, query: BidQueryDto): Promise<{
        data: ({
            provider: {
                id: string;
                fullName: string;
                phone: string;
                profilePhoto: string | null;
                city: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
                providerProfile: {
                    bio: string | null;
                    hourlyRate: import("@prisma/client/runtime/library").Decimal | null;
                    serviceRadius: number | null;
                    serviceLocation: string | null;
                    categories: ({
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
                    } & {
                        providerId: string;
                        categoryId: string;
                    })[];
                } | null;
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
    acceptBid(userId: string, bidId: string): Promise<{
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
    rejectBid(userId: string, bidId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").BidStatus;
        providerId: string;
        jobId: string;
        offeredPrice: import("@prisma/client/runtime/library").Decimal;
        message: string | null;
    }>;
    getSelectedProvider(userId: string, jobId: string): Promise<{
        provider: {
            id: string;
            fullName: string;
            phone: string;
            profilePhoto: string | null;
            city: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
            };
            providerProfile: {
                bio: string | null;
                hourlyRate: import("@prisma/client/runtime/library").Decimal | null;
                serviceRadius: number | null;
                serviceLocation: string | null;
            } | null;
        };
    } & {
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
    }>;
    cancelSelection(userId: string, jobId: string): Promise<{
        message: string;
    }>;
}
