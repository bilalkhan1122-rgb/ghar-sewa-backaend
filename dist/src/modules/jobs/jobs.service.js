"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const file_upload_service_1 = require("../../common/services/file-upload.service");
const admin_audit_service_1 = require("../../common/services/admin-audit.service");
const job_query_dto_1 = require("./dtos/job-query.dto");
const nestjs_pino_1 = require("nestjs-pino");
const client_1 = require("../../../generated/prisma/client");
const notifications_service_1 = require("../notifications/notifications.service");
const penalties_service_1 = require("../penalties/penalties.service");
const JOB_EXPIRY_HOURS = 24;
const MAX_JOB_IMAGES = 5;
let JobsService = class JobsService {
    prisma;
    fileUpload;
    logger;
    notifications;
    penalties;
    adminAudit;
    constructor(prisma, fileUpload, logger, notifications, penalties, adminAudit) {
        this.prisma = prisma;
        this.fileUpload = fileUpload;
        this.logger = logger;
        this.notifications = notifications;
        this.penalties = penalties;
        this.adminAudit = adminAudit;
    }
    calculateExpiry() {
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + JOB_EXPIRY_HOURS);
        return expiry;
    }
    buildWhereForCustomer(userId, query) {
        const where = {
            customerId: userId,
        };
        if (query.status) {
            where.status = query.status;
        }
        if (query.categoryId) {
            where.categoryId = query.categoryId;
        }
        if (query.minPrice !== undefined || query.maxPrice !== undefined) {
            where.offeredPrice = {};
            if (query.minPrice !== undefined) {
                where.offeredPrice.gte = query.minPrice;
            }
            if (query.maxPrice !== undefined) {
                where.offeredPrice.lte = query.maxPrice;
            }
        }
        return where;
    }
    async createJob(userId, dto) {
        const category = await this.prisma.serviceCategory.findUnique({
            where: { id: dto.categoryId },
        });
        if (!category || !category.isActive) {
            throw new common_1.BadRequestException('Invalid or inactive category');
        }
        const job = await this.prisma.job.create({
            data: {
                customerId: userId,
                categoryId: dto.categoryId,
                title: dto.title,
                description: dto.description,
                address: dto.address,
                latitude: dto.latitude,
                longitude: dto.longitude,
                offeredPrice: dto.offeredPrice,
                status: client_1.JobStatus.PENDING,
                expiresAt: this.calculateExpiry(),
                preferredSchedule: dto.preferredSchedule
                    ? new Date(dto.preferredSchedule)
                    : null,
                additionalNotes: dto.additionalNotes,
            },
            include: {
                category: true,
                images: true,
            },
        });
        this.logger.log({
            message: 'Job created',
            jobId: job.id,
            customerId: userId,
            categoryId: dto.categoryId,
        });
        this.notifyMatchingProviders(job).catch((err) => {
            const error = err;
            this.logger.error({ err: error, jobId: job.id }, 'Failed to notify providers');
        });
        return job;
    }
    async updateJob(userId, jobId, dto) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.customerId !== userId) {
            throw new common_1.ForbiddenException('You can only update your own jobs');
        }
        if (job.status !== client_1.JobStatus.PENDING) {
            throw new common_1.BadRequestException('Jobs can only be edited while in PENDING status');
        }
        const expiresAt = this.calculateExpiry();
        if (dto.categoryId) {
            const category = await this.prisma.serviceCategory.findUnique({
                where: { id: dto.categoryId },
            });
            if (!category || !category.isActive) {
                throw new common_1.BadRequestException('Invalid or inactive category');
            }
        }
        const updated = await this.prisma.job.update({
            where: { id: jobId },
            data: {
                ...(dto.categoryId !== undefined && { categoryId: dto.categoryId }),
                ...(dto.title !== undefined && { title: dto.title }),
                ...(dto.description !== undefined && { description: dto.description }),
                ...(dto.address !== undefined && { address: dto.address }),
                ...(dto.latitude !== undefined && { latitude: dto.latitude }),
                ...(dto.longitude !== undefined && { longitude: dto.longitude }),
                ...(dto.offeredPrice !== undefined && {
                    offeredPrice: dto.offeredPrice,
                }),
                ...(dto.preferredSchedule !== undefined && {
                    preferredSchedule: new Date(dto.preferredSchedule),
                }),
                ...(dto.additionalNotes !== undefined && {
                    additionalNotes: dto.additionalNotes,
                }),
                expiresAt,
            },
            include: {
                category: true,
                images: true,
            },
        });
        return updated;
    }
    async deleteJob(userId, jobId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
            include: { images: true },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.customerId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own jobs');
        }
        if (job.status !== client_1.JobStatus.PENDING) {
            throw new common_1.BadRequestException('Jobs can only be deleted while in PENDING status');
        }
        for (const image of job.images) {
            await this.fileUpload.deleteFile(image.imageUrl).catch(() => { });
        }
        await this.prisma.job.delete({
            where: { id: jobId },
        });
        this.logger.log({
            message: 'Job deleted',
            jobId,
            customerId: userId,
        });
        return { message: 'Job deleted successfully' };
    }
    async cancelJob(userId, jobId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.customerId !== userId) {
            throw new common_1.ForbiddenException('You can only cancel your own jobs');
        }
        if (job.status !== client_1.JobStatus.PENDING) {
            throw new common_1.BadRequestException('Only pending jobs can be cancelled');
        }
        const updated = await this.prisma.job.update({
            where: { id: jobId },
            data: { status: client_1.JobStatus.CANCELLED },
            include: { category: true, images: true },
        });
        void this.notifications.send({
            userId,
            type: client_1.NotificationType.JOB_CANCELLED,
            title: 'Job cancelled',
            message: `Your job "${job.title}" has been cancelled.`,
            relatedEntityType: 'JOB',
            relatedEntityId: jobId,
        });
        return updated;
    }
    async repostJob(userId, jobId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.customerId !== userId) {
            throw new common_1.ForbiddenException('You can only repost your own jobs');
        }
        if (job.status !== client_1.JobStatus.EXPIRED) {
            throw new common_1.BadRequestException('Only expired jobs can be reposted');
        }
        const updated = await this.prisma.job.update({
            where: { id: jobId },
            data: {
                status: client_1.JobStatus.PENDING,
                expiresAt: this.calculateExpiry(),
            },
            include: { category: true, images: true },
        });
        this.logger.log({
            message: 'Job reposted',
            jobId,
            customerId: userId,
        });
        return updated;
    }
    async listMyJobs(userId, query) {
        const { page = 1, limit = 10, sortBy = job_query_dto_1.JobSortField.CREATED_AT, sortOrder = 'desc', } = query;
        const skip = (page - 1) * limit;
        const where = this.buildWhereForCustomer(userId, query);
        const orderByField = sortBy === job_query_dto_1.JobSortField.OFFERED_PRICE ? 'offeredPrice' : 'createdAt';
        const [jobs, total] = await Promise.all([
            this.prisma.job.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [orderByField]: sortOrder },
                include: {
                    category: true,
                    images: true,
                },
            }),
            this.prisma.job.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: jobs,
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNext: page < totalPages,
                hasPrevious: page > 1,
            },
        };
    }
    async getJobById(userId, jobId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
            include: {
                category: true,
                images: true,
                customer: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePhoto: true,
                        phone: true,
                        city: true,
                    },
                },
            },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });
        if (job.customerId !== userId && user?.role !== client_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('You do not have access to this job');
        }
        return job;
    }
    async getJobForProvider(providerId, jobId) {
        await this.penalties.assertProviderEligible(providerId);
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
            include: {
                category: true,
                images: true,
                customer: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePhoto: true,
                        phone: true,
                        city: true,
                    },
                },
            },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        const provider = await this.prisma.user.findUnique({
            where: { id: providerId },
            include: {
                providerProfile: {
                    include: { categories: true },
                },
            },
        });
        if (!provider ||
            provider.role !== client_1.UserRole.PROVIDER ||
            provider.verificationStatus !== client_1.VerificationStatus.APPROVED ||
            !provider.profileCompleted ||
            !provider.isActive) {
            throw new common_1.ForbiddenException('Access denied: provider is not fully approved');
        }
        const providerCategoryIds = provider.providerProfile?.categories.map((c) => c.categoryId) || [];
        if (!providerCategoryIds.includes(job.categoryId)) {
            throw new common_1.ForbiddenException('This job is not in your service categories');
        }
        if (job.status !== client_1.JobStatus.PENDING) {
            throw new common_1.NotFoundException('Job is no longer available');
        }
        if (job.expiresAt <= new Date()) {
            throw new common_1.NotFoundException('Job has expired');
        }
        return job;
    }
    async getProviderJobFeed(providerId, query) {
        await this.penalties.assertProviderEligible(providerId);
        const { page = 1, limit = 10, categoryId, minPrice, maxPrice, sortBy = job_query_dto_1.JobSortField.CREATED_AT, sortOrder = 'desc', } = query;
        const provider = await this.prisma.user.findUnique({
            where: { id: providerId },
            include: {
                providerProfile: {
                    include: {
                        categories: true,
                    },
                },
            },
        });
        if (!provider || provider.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        if (provider.verificationStatus !== client_1.VerificationStatus.APPROVED ||
            !provider.profileCompleted ||
            !provider.isActive) {
            throw new common_1.ForbiddenException('Your profile must be approved and complete to view available jobs');
        }
        const providerCategoryIds = provider.providerProfile?.categories.map((c) => c.categoryId) || [];
        if (providerCategoryIds.length === 0) {
            return {
                data: [],
                meta: {
                    total: 0,
                    page,
                    limit,
                    totalPages: 0,
                    hasNext: false,
                    hasPrevious: false,
                },
            };
        }
        const skip = (page - 1) * limit;
        const where = {
            status: client_1.JobStatus.PENDING,
            categoryId: {
                in: categoryId ? [categoryId] : providerCategoryIds,
            },
            expiresAt: { gt: new Date() },
            ...(minPrice !== undefined && {
                offeredPrice: { gte: minPrice },
            }),
            ...(maxPrice !== undefined && {
                offeredPrice: { lte: maxPrice },
            }),
            ...(categoryId && {
                categoryId,
            }),
        };
        const orderByField = sortBy === job_query_dto_1.JobSortField.OFFERED_PRICE ? 'offeredPrice' : 'createdAt';
        const [jobs, total] = await Promise.all([
            this.prisma.job.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [orderByField]: sortOrder },
                include: {
                    category: true,
                    images: true,
                    customer: {
                        select: {
                            id: true,
                            fullName: true,
                            profilePhoto: true,
                            city: true,
                        },
                    },
                },
            }),
            this.prisma.job.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: jobs,
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNext: page < totalPages,
                hasPrevious: page > 1,
            },
        };
    }
    async uploadJobImage(userId, jobId, file) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
            include: { images: true },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.customerId !== userId) {
            throw new common_1.ForbiddenException('You can only add images to your own jobs');
        }
        if (job.status !== client_1.JobStatus.PENDING) {
            throw new common_1.BadRequestException('Images can only be added to pending jobs');
        }
        if (job.images.length >= MAX_JOB_IMAGES) {
            throw new common_1.BadRequestException(`Maximum ${MAX_JOB_IMAGES} images allowed per job`);
        }
        this.fileUpload.validateFile(file);
        const imageUrl = await this.saveJobImage(file);
        const image = await this.prisma.jobImage.create({
            data: {
                jobId,
                imageUrl,
            },
        });
        return image;
    }
    async deleteJobImage(userId, jobId, imageId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.customerId !== userId) {
            throw new common_1.ForbiddenException('You can only delete images from your own jobs');
        }
        const image = await this.prisma.jobImage.findUnique({
            where: { id: imageId },
        });
        if (!image || image.jobId !== jobId) {
            throw new common_1.NotFoundException('Image not found');
        }
        await this.fileUpload.deleteFile(image.imageUrl).catch(() => { });
        await this.prisma.jobImage.delete({
            where: { id: imageId },
        });
        return { message: 'Image deleted successfully' };
    }
    async listJobImages(jobId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        return this.prisma.jobImage.findMany({
            where: { jobId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async saveJobImage(file) {
        return this.fileUpload.uploadGalleryImage(file);
    }
    async adminListJobs(query) {
        const { page = 1, limit = 10, status, categoryId, minPrice, maxPrice, search, customerId, providerId, cityId, dateFrom, dateTo, sortBy = job_query_dto_1.JobSortField.CREATED_AT, sortOrder = 'desc', } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (status)
            where.status = status;
        if (categoryId)
            where.categoryId = categoryId;
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.offeredPrice = {};
            if (minPrice !== undefined)
                where.offeredPrice.gte = minPrice;
            if (maxPrice !== undefined)
                where.offeredPrice.lte = maxPrice;
        }
        if (customerId)
            where.customerId = customerId;
        if (providerId)
            where.bookings = { some: { providerId } };
        if (cityId)
            where.customer = { cityId };
        if (dateFrom || dateTo) {
            where.createdAt = {
                ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
                ...(dateTo
                    ? { lte: new Date(new Date(dateTo).setHours(23, 59, 59, 999)) }
                    : {}),
            };
        }
        const orderByField = sortBy === job_query_dto_1.JobSortField.OFFERED_PRICE ? 'offeredPrice' : 'createdAt';
        const [jobs, total] = await Promise.all([
            this.prisma.job.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [orderByField]: sortOrder },
                include: {
                    category: true,
                    images: true,
                    customer: {
                        select: {
                            id: true,
                            fullName: true,
                            phone: true,
                        },
                    },
                },
            }),
            this.prisma.job.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: jobs,
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNext: page < totalPages,
                hasPrevious: page > 1,
            },
        };
    }
    async adminGetJobDetail(jobId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
            include: {
                category: true,
                images: true,
                customer: {
                    select: { id: true, fullName: true, phone: true, email: true },
                },
                bids: {
                    include: {
                        provider: {
                            select: { id: true, fullName: true, phone: true },
                        },
                    },
                },
                bookings: {
                    include: {
                        provider: { select: { id: true, fullName: true } },
                        customer: { select: { id: true, fullName: true } },
                    },
                },
                timeline: { orderBy: { createdAt: 'asc' } },
            },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        return job;
    }
    async adminGetJobTimeline(jobId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
            select: { id: true, status: true },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        const timeline = await this.prisma.jobTimeline.findMany({
            where: { jobId },
            orderBy: { createdAt: 'asc' },
        });
        return {
            jobId,
            currentStatus: job.status,
            events: timeline.map((t) => ({
                event: t.event,
                description: t.description,
                timestamp: t.createdAt,
            })),
        };
    }
    async adminCancelJob(adminId, jobId, reason) {
        const job = await this.prisma.job.findUnique({ where: { id: jobId } });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.status !== client_1.JobStatus.PENDING) {
            throw new common_1.BadRequestException('Only pending jobs can be cancelled');
        }
        const updated = await this.prisma.$transaction(async (tx) => {
            const updatedJob = await tx.job.update({
                where: { id: jobId },
                data: { status: client_1.JobStatus.CANCELLED },
            });
            await tx.cancellationRecord.create({
                data: {
                    jobId,
                    cancelledBy: adminId,
                    cancellationType: client_1.CancellationType.SYSTEM,
                    reason,
                },
            });
            await tx.jobTimeline.create({
                data: {
                    jobId,
                    event: 'JOB_CANCELLED_BY_ADMIN',
                    description: reason,
                },
            });
            return updatedJob;
        });
        void this.notifications.send({
            userId: job.customerId,
            type: client_1.NotificationType.JOB_CANCELLED,
            title: 'Job cancelled by admin',
            message: `Your job "${job.title}" was cancelled. Reason: ${reason}`,
            relatedEntityType: 'JOB',
            relatedEntityId: jobId,
        });
        await this.adminAudit.record({
            adminId,
            action: 'JOB_CANCELLED',
            entityType: 'JOB',
            entityId: jobId,
            newValues: { reason },
        });
        this.logger.log({
            message: 'Job cancelled by admin',
            adminId,
            jobId,
            reason,
        });
        return updated;
    }
    async adminForceCloseJob(adminId, jobId, reason) {
        const job = await this.prisma.job.findUnique({ where: { id: jobId } });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.status === client_1.JobStatus.CANCELLED ||
            job.status === client_1.JobStatus.COMPLETED ||
            job.status === client_1.JobStatus.EXPIRED) {
            throw new common_1.BadRequestException(`Job is already ${job.status.toLowerCase()} and cannot be force-closed`);
        }
        const updated = await this.prisma.$transaction(async (tx) => {
            const updatedJob = await tx.job.update({
                where: { id: jobId },
                data: { status: client_1.JobStatus.CANCELLED },
            });
            await tx.cancellationRecord.create({
                data: {
                    jobId,
                    cancelledBy: adminId,
                    cancellationType: client_1.CancellationType.SYSTEM,
                    reason,
                },
            });
            await tx.jobTimeline.create({
                data: {
                    jobId,
                    event: 'JOB_FORCE_CLOSED',
                    description: reason,
                },
            });
            await tx.booking.updateMany({
                where: {
                    jobId,
                    status: { in: [client_1.BookingStatus.ACCEPTED, client_1.BookingStatus.IN_PROGRESS] },
                },
                data: { status: client_1.BookingStatus.CANCELLED, cancelledAt: new Date() },
            });
            return updatedJob;
        });
        void this.notifications.send({
            userId: job.customerId,
            type: client_1.NotificationType.JOB_CANCELLED,
            title: 'Job force-closed by admin',
            message: `Your job "${job.title}" was closed by the platform. Reason: ${reason}`,
            relatedEntityType: 'JOB',
            relatedEntityId: jobId,
        });
        await this.adminAudit.record({
            adminId,
            action: 'JOB_FORCE_CLOSED',
            entityType: 'JOB',
            entityId: jobId,
            newValues: { reason },
        });
        this.logger.log({
            message: 'Job force-closed by admin',
            adminId,
            jobId,
            reason,
        });
        return updated;
    }
    async expireOverdueJobs() {
        const result = await this.prisma.job.updateMany({
            where: {
                status: client_1.JobStatus.PENDING,
                expiresAt: { lte: new Date() },
            },
            data: { status: client_1.JobStatus.EXPIRED },
        });
        if (result.count > 0) {
            const expiredJobs = await this.prisma.job.findMany({
                where: {
                    status: client_1.JobStatus.EXPIRED,
                    expiresAt: { lte: new Date() },
                },
                select: { id: true, title: true, customerId: true },
            });
            await this.notifications.sendToMany(expiredJobs.map((j) => ({
                userId: j.customerId,
                type: client_1.NotificationType.JOB_EXPIRED,
                title: 'Job expired',
                message: `Your job "${j.title}" expired without a provider. You can repost it.`,
                relatedEntityType: 'JOB',
                relatedEntityId: j.id,
            })));
            this.logger.log({
                message: 'Expired overdue jobs',
                count: result.count,
            });
        }
        return result.count;
    }
    async notifyMatchingProviders(job) {
        const matchingProviders = await this.prisma.providerServiceCategory.findMany({
            where: {
                categoryId: job.categoryId,
                provider: {
                    user: {
                        role: client_1.UserRole.PROVIDER,
                        isActive: true,
                        status: client_1.UserStatus.ACTIVE,
                        verificationStatus: client_1.VerificationStatus.APPROVED,
                        profileCompleted: true,
                    },
                },
            },
            include: {
                provider: {
                    select: { userId: true },
                },
            },
        });
        await this.notifications.sendToMany(matchingProviders.map((match) => ({
            userId: match.provider.userId,
            type: client_1.NotificationType.NEW_JOB,
            title: 'New job in your area! 🔨',
            message: `"${job.title}" — a new job matching your services is available.`,
            relatedEntityType: 'JOB',
            relatedEntityId: job.id,
        })));
        this.logger.log({
            message: `Notified ${matchingProviders.length} providers about new job`,
            jobId: job.id,
            categoryId: job.categoryId,
        });
    }
    async getJobStats() {
        const [total, pending, active, completed, cancelled, expired, disputed] = await Promise.all([
            this.prisma.job.count(),
            this.prisma.job.count({ where: { status: client_1.JobStatus.PENDING } }),
            this.prisma.job.count({ where: { status: client_1.JobStatus.ACCEPTED } }),
            this.prisma.job.count({ where: { status: client_1.JobStatus.COMPLETED } }),
            this.prisma.job.count({ where: { status: client_1.JobStatus.CANCELLED } }),
            this.prisma.job.count({ where: { status: client_1.JobStatus.EXPIRED } }),
            this.prisma.job.count({ where: { status: client_1.JobStatus.DISPUTED } }),
        ]);
        return {
            total,
            pending,
            active,
            completed,
            cancelled,
            expired,
            disputed,
        };
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        file_upload_service_1.FileUploadService,
        nestjs_pino_1.Logger,
        notifications_service_1.NotificationsService,
        penalties_service_1.PenaltiesService,
        admin_audit_service_1.AdminAuditService])
], JobsService);
//# sourceMappingURL=jobs.service.js.map