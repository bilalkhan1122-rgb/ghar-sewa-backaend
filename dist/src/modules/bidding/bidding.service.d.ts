import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBidDto } from './dtos/create-bid.dto';
import { UpdateBidDto } from './dtos/update-bid.dto';
import { BidQueryDto } from './dtos/bid-query.dto';
import { Logger } from 'nestjs-pino';
import { JobStatus, BidStatus } from 'generated/prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
import { PenaltiesService } from '../penalties/penalties.service';
export declare class BiddingService {
    private readonly prisma;
    private readonly logger;
    private readonly notifications;
    private readonly penalties;
    constructor(prisma: PrismaService, logger: Logger, notifications: NotificationsService, penalties: PenaltiesService);
    private getActiveBookingForJob;
    submitBid(providerId: string, dto: CreateBidDto): Promise<{
        job: {
            id: string;
            customerId: string;
            title: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: BidStatus;
        providerId: string;
        jobId: string;
        offeredPrice: import("@prisma/client/runtime/library").Decimal;
        message: string | null;
    }>;
    acceptCustomerPrice(providerId: string, jobId: string): Promise<{
        bid: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: BidStatus;
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
    updateBid(providerId: string, bidId: string, dto: UpdateBidDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: BidStatus;
        providerId: string;
        jobId: string;
        offeredPrice: import("@prisma/client/runtime/library").Decimal;
        message: string | null;
    }>;
    withdrawBid(providerId: string, bidId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: BidStatus;
        providerId: string;
        jobId: string;
        offeredPrice: import("@prisma/client/runtime/library").Decimal;
        message: string | null;
    }>;
    listMyBids(providerId: string, query: BidQueryDto): Promise<{
        data: ({
            job: {
                id: string;
                createdAt: Date;
                status: JobStatus;
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
            status: BidStatus;
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
    getAvailableJobsWithBidStatus(providerId: string): Promise<({
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
            status: BidStatus;
            offeredPrice: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        status: JobStatus;
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
    getBidsForJob(customerId: string, jobId: string, query: BidQueryDto): Promise<{
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
            status: BidStatus;
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
    acceptBid(customerId: string, bidId: string): Promise<{
        bid: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: BidStatus;
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
    rejectBid(customerId: string, bidId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: BidStatus;
        providerId: string;
        jobId: string;
        offeredPrice: import("@prisma/client/runtime/library").Decimal;
        message: string | null;
    }>;
    cancelProviderSelection(customerId: string, jobId: string): Promise<{
        message: string;
    }>;
    getSelectedProvider(customerId: string, jobId: string): Promise<{
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
    private validateProviderForBidding;
    private recordJobTimeline;
}
