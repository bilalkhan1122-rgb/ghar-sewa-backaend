import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { AdminAuditService } from 'src/common/services/admin-audit.service';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { JobQueryDto } from './dtos/job-query.dto';
import { Logger } from 'nestjs-pino';
import { JobStatus, BookingStatus } from 'generated/prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
import { PenaltiesService } from '../penalties/penalties.service';
export declare class JobsService {
    private readonly prisma;
    private readonly fileUpload;
    private readonly logger;
    private readonly notifications;
    private readonly penalties;
    private readonly adminAudit;
    constructor(prisma: PrismaService, fileUpload: FileUploadService, logger: Logger, notifications: NotificationsService, penalties: PenaltiesService, adminAudit: AdminAuditService);
    private calculateExpiry;
    private buildWhereForCustomer;
    createJob(userId: string, dto: CreateJobDto): Promise<{
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
    }>;
    updateJob(userId: string, jobId: string, dto: UpdateJobDto): Promise<{
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
    }>;
    deleteJob(userId: string, jobId: string): Promise<{
        message: string;
    }>;
    cancelJob(userId: string, jobId: string): Promise<{
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
    }>;
    repostJob(userId: string, jobId: string): Promise<{
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
    }>;
    listMyJobs(userId: string, query: JobQueryDto): Promise<{
        data: ({
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
    getJobById(userId: string, jobId: string): Promise<{
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
            phone: string;
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
    }>;
    getJobForProvider(providerId: string, jobId: string): Promise<{
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
            phone: string;
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
    }>;
    getProviderJobFeed(providerId: string, query: JobQueryDto): Promise<{
        data: ({
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
    uploadJobImage(userId: string, jobId: string, file: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        imageUrl: string;
        jobId: string;
    }>;
    deleteJobImage(userId: string, jobId: string, imageId: string): Promise<{
        message: string;
    }>;
    listJobImages(jobId: string): Promise<{
        id: string;
        createdAt: Date;
        imageUrl: string;
        jobId: string;
    }[]>;
    private saveJobImage;
    adminListJobs(query: JobQueryDto): Promise<{
        data: ({
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
                phone: string;
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
    adminGetJobDetail(jobId: string): Promise<{
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
            phone: string;
            email: string;
        };
        images: {
            id: string;
            createdAt: Date;
            imageUrl: string;
            jobId: string;
        }[];
        bids: ({
            provider: {
                id: string;
                fullName: string;
                phone: string;
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
        bookings: ({
            customer: {
                id: string;
                fullName: string;
            };
            provider: {
                id: string;
                fullName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: BookingStatus;
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
        timeline: {
            id: string;
            createdAt: Date;
            description: string | null;
            jobId: string;
            event: string;
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
    }>;
    adminGetJobTimeline(jobId: string): Promise<{
        jobId: string;
        currentStatus: JobStatus;
        events: {
            event: string;
            description: string | null;
            timestamp: Date;
        }[];
    }>;
    adminCancelJob(adminId: string, jobId: string, reason: string): Promise<{
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
    }>;
    adminForceCloseJob(adminId: string, jobId: string, reason: string): Promise<{
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
    }>;
    expireOverdueJobs(): Promise<number>;
    private notifyMatchingProviders;
    getJobStats(): Promise<{
        total: number;
        pending: number;
        active: number;
        completed: number;
        cancelled: number;
        expired: number;
        disputed: number;
    }>;
}
