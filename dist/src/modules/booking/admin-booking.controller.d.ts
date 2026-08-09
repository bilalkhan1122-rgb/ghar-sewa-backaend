import { BookingService } from './booking.service';
import { UserRole } from 'generated/prisma/client';
import { BookingQueryDto } from './dtos/booking-query.dto';
export declare class AdminBookingsController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    list(query: BookingQueryDto): Promise<{
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
            };
            provider: {
                id: string;
                fullName: string;
                phone: string;
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
    getTimeline(adminId: string, jobId: string): Promise<{
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
    getDetail(id: string): Promise<{
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
            city: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string;
            passwordHash: string;
            role: UserRole;
            cityId: string;
            address: string | null;
            status: import("generated/prisma/client").UserStatus;
            profileCompleted: boolean;
            verificationStatus: import("generated/prisma/client").VerificationStatus;
            refreshToken: string | null;
            isActive: boolean;
            profilePhoto: string | null;
            walletBalance: import("@prisma/client/runtime/library").Decimal;
            totalSpent: import("@prisma/client/runtime/library").Decimal;
            totalTopups: import("@prisma/client/runtime/library").Decimal;
            deletedAt: Date | null;
        };
        provider: {
            providerProfile: ({
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
            } & {
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                bio: string | null;
                hourlyRate: import("@prisma/client/runtime/library").Decimal | null;
                serviceRadius: number | null;
                serviceLocation: string | null;
                facePhoto: string | null;
                cnicNumber: string | null;
                cnicFrontImage: string | null;
                cnicBackImage: string | null;
            }) | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string;
            passwordHash: string;
            role: UserRole;
            cityId: string;
            address: string | null;
            status: import("generated/prisma/client").UserStatus;
            profileCompleted: boolean;
            verificationStatus: import("generated/prisma/client").VerificationStatus;
            refreshToken: string | null;
            isActive: boolean;
            profilePhoto: string | null;
            walletBalance: import("@prisma/client/runtime/library").Decimal;
            totalSpent: import("@prisma/client/runtime/library").Decimal;
            totalTopups: import("@prisma/client/runtime/library").Decimal;
            deletedAt: Date | null;
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
        reviews: {
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
        }[];
        conversations: ({
            messages: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                latitude: number | null;
                longitude: number | null;
                type: import("generated/prisma/client").MessageType;
                conversationId: string;
                senderId: string;
                content: string | null;
                attachmentUrl: string | null;
                deliveredAt: Date | null;
                readAt: Date | null;
                editedAt: Date | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            providerId: string;
            jobId: string;
            customerId: string;
            bookingId: string | null;
            lastMessage: string | null;
            lastMessageAt: Date | null;
            lastActivity: Date;
            customerDeletedAt: Date | null;
            providerDeletedAt: Date | null;
        })[];
        disputes: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("generated/prisma/client").DisputeStatus;
            description: string | null;
            jobId: string;
            bookingId: string;
            reason: string;
            raisedById: string;
            opponentId: string;
            resolution: import("generated/prisma/client").DisputeResolution | null;
            refundAmount: import("@prisma/client/runtime/library").Decimal | null;
            evidenceCount: number;
            resolvedAt: Date | null;
            resolvedBy: string | null;
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
}
