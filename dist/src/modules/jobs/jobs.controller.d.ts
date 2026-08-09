import { JobsService } from './jobs.service';
import { ActionReasonDto } from 'src/common/dtos/action-reason.dto';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { JobQueryDto } from './dtos/job-query.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
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
    getJobById(userId: string, id: string): Promise<{
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
    }>;
    updateJob(userId: string, id: string, dto: UpdateJobDto): Promise<{
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
    }>;
    deleteJob(userId: string, id: string): Promise<{
        message: string;
    }>;
    cancelJob(userId: string, id: string): Promise<{
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
    }>;
    repostJob(userId: string, id: string): Promise<{
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
    }>;
    uploadJobImage(userId: string, id: string, file: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        imageUrl: string;
        jobId: string;
    }>;
    listJobImages(id: string): Promise<{
        id: string;
        createdAt: Date;
        imageUrl: string;
        jobId: string;
    }[]>;
    deleteJobImage(userId: string, jobId: string, imageId: string): Promise<{
        message: string;
    }>;
}
export declare class ProviderJobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    getJobFeed(userId: string, query: JobQueryDto): Promise<{
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
    getJobById(userId: string, id: string): Promise<{
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
    }>;
}
export declare class AdminJobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    listAllJobs(query: JobQueryDto): Promise<{
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
    getJobStats(): Promise<{
        total: number;
        pending: number;
        active: number;
        completed: number;
        cancelled: number;
        expired: number;
        disputed: number;
    }>;
    getJobDetail(id: string): Promise<{
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
    }>;
    getJobTimeline(id: string): Promise<{
        jobId: string;
        currentStatus: import("generated/prisma/client").JobStatus;
        events: {
            event: string;
            description: string | null;
            timestamp: Date;
        }[];
    }>;
    cancelJob(adminId: string, id: string, dto: ActionReasonDto): Promise<{
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
    }>;
    forceCloseJob(adminId: string, id: string, dto: ActionReasonDto): Promise<{
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
    }>;
    expireOverdueJobs(): Promise<{
        message: string;
    }>;
}
