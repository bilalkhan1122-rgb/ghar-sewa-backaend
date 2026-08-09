import { BookingService } from './booking.service';
import { BookingQueryDto } from './dtos/booking-query.dto';
export declare class ProviderBookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    listBookings(userId: string, query: BookingQueryDto): Promise<{
        data: ({
            job: {
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
                images: {
                    id: string;
                    createdAt: Date;
                    imageUrl: string;
                    jobId: string;
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
            };
            customer: {
                id: string;
                fullName: string;
                phone: string;
                address: string | null;
                profilePhoto: string | null;
                city: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
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
    getActiveWork(userId: string): Promise<({
        job: {
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
            images: {
                id: string;
                createdAt: Date;
                imageUrl: string;
                jobId: string;
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
        };
        customer: {
            id: string;
            fullName: string;
            phone: string;
            address: string | null;
            profilePhoto: string | null;
            city: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
            };
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
    })[]>;
    getStats(userId: string): Promise<{
        total: number;
        accepted: number;
        inProgress: number;
        completed: number;
        cancelled: number;
        disputed: number;
    }>;
    getBookingById(userId: string, id: string): Promise<{
        job: {
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
            images: {
                id: string;
                createdAt: Date;
                imageUrl: string;
                jobId: string;
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
        };
        customer: {
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
        };
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
                serviceLocation: string | null;
            } | null;
        };
        cancellationRecords: {
            id: string;
            createdAt: Date;
            jobId: string | null;
            bookingId: string | null;
            cancelledBy: string;
            cancellationType: import("generated/prisma/client").CancellationType;
            penaltyApplied: boolean;
            penaltyId: string | null;
            reason: string | null;
        }[];
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
    getJobTimeline(userId: string, jobId: string): Promise<{
        jobId: string;
        currentStatus: import("generated/prisma/client").JobStatus;
        bookingStatus: import("generated/prisma/client").BookingStatus | null;
        events: {
            event: string;
            description: string | null;
            timestamp: Date;
        }[];
        summary: {
            jobCreated: Date;
            firstBid: Date;
            bidAccepted: Date;
            providerAssigned: Date;
            workStarted: Date;
            workCompleted: Date;
            customerConfirmed: Date;
            cancelled: Date;
            expired: Date;
            currentJobStatus: import("generated/prisma/client").JobStatus;
            currentBookingStatus: string | null;
        };
    }>;
    startJob(userId: string, bookingId: string): Promise<{
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
    markCompleted(userId: string, bookingId: string): Promise<{
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
    cancelBooking(userId: string, bookingId: string, reason?: string): Promise<{
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
}
