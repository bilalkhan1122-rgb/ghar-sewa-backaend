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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const booking_query_dto_1 = require("./dtos/booking-query.dto");
const nestjs_pino_1 = require("nestjs-pino");
const client_1 = require("../../../generated/prisma/client");
const notifications_service_1 = require("../notifications/notifications.service");
const penalties_service_1 = require("../penalties/penalties.service");
const wallet_service_1 = require("../wallet/wallet.service");
let BookingService = class BookingService {
    prisma;
    logger;
    notifications;
    penalties;
    wallet;
    constructor(prisma, logger, notifications, penalties, wallet) {
        this.prisma = prisma;
        this.logger = logger;
        this.notifications = notifications;
        this.penalties = penalties;
        this.wallet = wallet;
    }
    async createDirectBooking(customerId, dto) {
        const provider = await this.prisma.user.findUnique({
            where: { id: dto.providerId },
            include: {
                providerProfile: {
                    include: { categories: true },
                },
            },
        });
        if (!provider ||
            provider.role !== client_1.UserRole.PROVIDER ||
            provider.verificationStatus !== client_1.VerificationStatus.APPROVED ||
            provider.status !== client_1.UserStatus.ACTIVE ||
            !provider.profileCompleted ||
            !provider.isActive) {
            throw new common_1.BadRequestException('Provider is not available');
        }
        const providerCategoryIds = provider.providerProfile?.categories.map((c) => c.categoryId) || [];
        if (!providerCategoryIds.includes(dto.categoryId)) {
            throw new common_1.BadRequestException('Provider does not offer the selected service category');
        }
        const category = await this.prisma.serviceCategory.findUnique({
            where: { id: dto.categoryId },
        });
        if (!category || !category.isActive) {
            throw new common_1.BadRequestException('Invalid or inactive category');
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const job = await tx.job.create({
                data: {
                    customerId,
                    categoryId: dto.categoryId,
                    title: dto.title,
                    description: dto.description,
                    address: dto.address,
                    latitude: dto.latitude,
                    longitude: dto.longitude,
                    offeredPrice: dto.totalAmount,
                    status: client_1.JobStatus.ACCEPTED,
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                },
            });
            const booking = await tx.booking.create({
                data: {
                    jobId: job.id,
                    customerId,
                    providerId: dto.providerId,
                    bookingType: client_1.BookingType.DIRECT,
                    totalAmount: dto.totalAmount,
                    status: client_1.BookingStatus.ACCEPTED,
                    acceptedAt: new Date(),
                },
            });
            await tx.jobTimeline.create({
                data: {
                    jobId: job.id,
                    event: 'JOB_CREATED',
                    description: 'Job posted for direct booking',
                },
            });
            await tx.jobTimeline.create({
                data: {
                    jobId: job.id,
                    event: 'PROVIDER_ASSIGNED',
                    description: 'Provider directly assigned',
                },
            });
            return { job, booking };
        });
        this.logger.log({
            message: 'Direct booking created',
            jobId: result.job.id,
            bookingId: result.booking.id,
            customerId,
            providerId: dto.providerId,
            amount: dto.totalAmount,
        });
        void this.notifications.send({
            userId: customerId,
            type: client_1.NotificationType.JOB_ACCEPTED,
            title: 'Job accepted! ✅',
            message: `Your job "${dto.title}" has been accepted by a provider.`,
            relatedEntityType: 'JOB',
            relatedEntityId: result.job.id,
        });
        void this.notifications.send({
            userId: dto.providerId,
            type: client_1.NotificationType.BOOKING_CONFIRMED,
            title: 'New direct booking 📅',
            message: `You have been booked for "${dto.title}" (Rs. ${dto.totalAmount}).`,
            relatedEntityType: 'BOOKING',
            relatedEntityId: result.booking.id,
        });
        return {
            job: result.job,
            booking: result.booking,
        };
    }
    async startJob(providerId, bookingId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: { job: true },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.providerId !== providerId) {
            throw new common_1.ForbiddenException('You can only start your own assigned jobs');
        }
        if (booking.status !== client_1.BookingStatus.ACCEPTED) {
            throw new common_1.BadRequestException(`Cannot start a booking that is ${booking.status.toLowerCase()}`);
        }
        if (booking.job.status !== client_1.JobStatus.ACCEPTED) {
            throw new common_1.BadRequestException(`Job status must be ACCEPTED to start. Current: ${booking.job.status}`);
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const updatedBooking = await tx.booking.update({
                where: { id: bookingId },
                data: {
                    status: client_1.BookingStatus.IN_PROGRESS,
                    startedAt: new Date(),
                },
            });
            await tx.job.update({
                where: { id: booking.jobId },
                data: { status: client_1.JobStatus.IN_PROGRESS },
            });
            await tx.jobTimeline.create({
                data: {
                    jobId: booking.jobId,
                    event: 'WORK_STARTED',
                    description: 'Provider started work',
                },
            });
            return updatedBooking;
        });
        this.logger.log({
            message: 'Work started',
            bookingId,
            jobId: booking.jobId,
            providerId,
        });
        void this.notifications.send({
            userId: booking.customerId,
            type: client_1.NotificationType.JOB_STARTED,
            title: 'Work has started 🛠️',
            message: 'The provider has started work on your job.',
            relatedEntityType: 'BOOKING',
            relatedEntityId: bookingId,
        });
        return result;
    }
    async markJobCompleted(providerId, bookingId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: { job: true },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.providerId !== providerId) {
            throw new common_1.ForbiddenException('You can only mark your own assigned jobs as completed');
        }
        if (booking.status !== client_1.BookingStatus.IN_PROGRESS) {
            throw new common_1.BadRequestException(`Cannot complete a booking that is ${booking.status.toLowerCase()}`);
        }
        if (booking.job.status !== client_1.JobStatus.IN_PROGRESS) {
            throw new common_1.BadRequestException(`Job must be IN_PROGRESS to complete. Current: ${booking.job.status}`);
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const updatedBooking = await tx.booking.update({
                where: { id: bookingId },
                data: {
                    status: client_1.BookingStatus.COMPLETED,
                    completedAt: new Date(),
                },
            });
            await tx.job.update({
                where: { id: booking.jobId },
                data: { status: client_1.JobStatus.COMPLETED },
            });
            await tx.jobTimeline.create({
                data: {
                    jobId: booking.jobId,
                    event: 'WORK_COMPLETED',
                    description: 'Provider marked work as completed',
                },
            });
            this.logger.log({
                message: 'WALLET_EVENT: Payment pending',
                bookingId,
                jobId: booking.jobId,
                customerId: booking.customerId,
                providerId,
                amount: booking.totalAmount.toNumber(),
                eventType: 'PAYMENT_RELEASE',
            });
            return updatedBooking;
        });
        this.logger.log({
            message: 'Job completed',
            bookingId,
            jobId: booking.jobId,
            providerId,
        });
        void this.notifications.send({
            userId: booking.customerId,
            type: client_1.NotificationType.JOB_COMPLETED,
            title: 'Job completed ✅',
            message: 'The provider marked your job as completed. Please confirm.',
            relatedEntityType: 'BOOKING',
            relatedEntityId: bookingId,
        });
        return result;
    }
    async confirmCompletion(customerId, bookingId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: { job: true },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.customerId !== customerId) {
            throw new common_1.ForbiddenException('You can only confirm completion for your own bookings');
        }
        if (booking.job.status !== client_1.JobStatus.COMPLETED) {
            throw new common_1.BadRequestException('Provider must mark the job as completed first');
        }
        if (booking.status !== client_1.BookingStatus.COMPLETED) {
            throw new common_1.BadRequestException(`Booking is in ${booking.status.toLowerCase()} status`);
        }
        await this.prisma.booking.update({
            where: { id: bookingId },
            data: { confirmedAt: new Date() },
        });
        await this.recordJobTimeline(booking.jobId, 'CUSTOMER_CONFIRMED', 'Customer confirmed job completion');
        this.logger.log({
            message: 'Customer confirmed completion',
            bookingId,
            jobId: booking.jobId,
            customerId,
        });
        await this.wallet.processJobPayment(bookingId);
        void this.notifications.send({
            userId: booking.providerId,
            type: client_1.NotificationType.COMPLETION_CONFIRMED,
            title: 'Completion confirmed 🙌',
            message: 'The customer confirmed your completed job. Payment will be released.',
            relatedEntityType: 'BOOKING',
            relatedEntityId: bookingId,
        });
        return {
            message: 'Job completion confirmed successfully',
            bookingId,
            jobId: booking.jobId,
        };
    }
    async cancelBooking(customerId, bookingId, reason) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: { job: true },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.customerId !== customerId) {
            throw new common_1.ForbiddenException('You can only cancel your own bookings');
        }
        if (booking.status !== client_1.BookingStatus.ACCEPTED) {
            throw new common_1.BadRequestException('Bookings can only be cancelled before work starts');
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const cancelledBooking = await tx.booking.update({
                where: { id: bookingId },
                data: {
                    status: client_1.BookingStatus.CANCELLED,
                    cancelledAt: new Date(),
                },
            });
            await tx.job.update({
                where: { id: booking.jobId },
                data: { status: client_1.JobStatus.PENDING, expiresAt: this.calculateExpiry() },
            });
            await tx.cancellationRecord.create({
                data: {
                    jobId: booking.jobId,
                    bookingId,
                    cancelledBy: 'CUSTOMER',
                    cancellationType: client_1.CancellationType.CUSTOMER,
                    reason: reason || 'Cancelled by customer before work started',
                },
            });
            await tx.jobTimeline.create({
                data: {
                    jobId: booking.jobId,
                    event: 'BOOKING_CANCELLED',
                    description: 'Booking cancelled by customer',
                },
            });
            return cancelledBooking;
        });
        this.logger.log({
            message: 'Booking cancelled',
            bookingId,
            jobId: booking.jobId,
            customerId,
            reason,
        });
        void this.notifications.send({
            userId: booking.providerId,
            type: client_1.NotificationType.JOB_CANCELLED,
            title: 'Booking cancelled',
            message: 'The customer cancelled the booking before work started.',
            relatedEntityType: 'BOOKING',
            relatedEntityId: bookingId,
        });
        return result;
    }
    async cancelBookingByProvider(providerId, bookingId, reason) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: { job: true },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.providerId !== providerId) {
            throw new common_1.ForbiddenException('You can only cancel your own assigned bookings');
        }
        if (booking.status !== client_1.BookingStatus.ACCEPTED) {
            throw new common_1.BadRequestException('Bookings can only be cancelled before work starts');
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const cancelledBooking = await tx.booking.update({
                where: { id: bookingId },
                data: {
                    status: client_1.BookingStatus.CANCELLED,
                    cancelledAt: new Date(),
                },
            });
            await tx.job.update({
                where: { id: booking.jobId },
                data: { status: client_1.JobStatus.PENDING, expiresAt: this.calculateExpiry() },
            });
            await tx.bid.updateMany({
                where: { jobId: booking.jobId },
                data: { status: client_1.BidStatus.PENDING },
            });
            const cancellation = await tx.cancellationRecord.create({
                data: {
                    jobId: booking.jobId,
                    bookingId,
                    cancelledBy: 'PROVIDER',
                    cancellationType: client_1.CancellationType.PROVIDER,
                    reason: reason || 'Cancelled by provider before work started',
                },
            });
            await tx.jobTimeline.create({
                data: {
                    jobId: booking.jobId,
                    event: 'BOOKING_CANCELLED',
                    description: 'Booking cancelled by provider',
                },
            });
            return { cancelledBooking, cancellation };
        });
        this.logger.log({
            message: 'Booking cancelled by provider',
            bookingId,
            jobId: booking.jobId,
            providerId,
            reason,
        });
        void this.notifications.send({
            userId: booking.customerId,
            type: client_1.NotificationType.JOB_CANCELLED,
            title: 'Booking cancelled',
            message: 'The provider cancelled the booking before work started.',
            relatedEntityType: 'BOOKING',
            relatedEntityId: bookingId,
        });
        await this.penalties.evaluateProviderCancellation(providerId, result.cancellation.id, reason || 'Cancelled by provider before work started');
        return result.cancelledBooking;
    }
    async listCustomerBookings(customerId, query) {
        const { page = 1, limit = 10, status, categoryId, dateFrom, dateTo, sortBy = booking_query_dto_1.BookingSortField.CREATED_AT, sortOrder = 'desc', } = query;
        const skip = (page - 1) * limit;
        const where = {
            customerId,
            ...(status && { status: status }),
            ...(dateFrom || dateTo
                ? {
                    createdAt: {
                        ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
                        ...(dateTo ? { lte: new Date(dateTo + 'T23:59:59Z') } : {}),
                    },
                }
                : {}),
            ...(categoryId ? { job: { categoryId } } : {}),
        };
        const orderByField = sortBy === booking_query_dto_1.BookingSortField.TOTAL_AMOUNT ? 'totalAmount' : 'createdAt';
        const [bookings, total] = await Promise.all([
            this.prisma.booking.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [orderByField]: sortOrder },
                include: {
                    job: {
                        include: {
                            category: true,
                            images: { take: 1 },
                        },
                    },
                    provider: {
                        select: {
                            id: true,
                            fullName: true,
                            profilePhoto: true,
                            phone: true,
                            city: true,
                            providerProfile: {
                                select: {
                                    bio: true,
                                    serviceLocation: true,
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.booking.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: bookings,
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
    async listProviderBookings(providerId, query) {
        const { page = 1, limit = 10, status, categoryId, dateFrom, dateTo, sortBy = booking_query_dto_1.BookingSortField.CREATED_AT, sortOrder = 'desc', } = query;
        const skip = (page - 1) * limit;
        const where = {
            providerId,
            ...(status && { status: status }),
            ...(dateFrom || dateTo
                ? {
                    createdAt: {
                        ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
                        ...(dateTo ? { lte: new Date(dateTo + 'T23:59:59Z') } : {}),
                    },
                }
                : {}),
            ...(categoryId ? { job: { categoryId } } : {}),
        };
        const orderByField = sortBy === booking_query_dto_1.BookingSortField.TOTAL_AMOUNT ? 'totalAmount' : 'createdAt';
        const [bookings, total] = await Promise.all([
            this.prisma.booking.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [orderByField]: sortOrder },
                include: {
                    job: {
                        include: {
                            category: true,
                            images: { take: 1 },
                        },
                    },
                    customer: {
                        select: {
                            id: true,
                            fullName: true,
                            profilePhoto: true,
                            phone: true,
                            city: true,
                            address: true,
                        },
                    },
                },
            }),
            this.prisma.booking.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: bookings,
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
    async getBookingById(userId, bookingId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                job: {
                    include: {
                        category: true,
                        images: true,
                    },
                },
                customer: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePhoto: true,
                        phone: true,
                        city: true,
                    },
                },
                provider: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePhoto: true,
                        phone: true,
                        city: true,
                        providerProfile: {
                            select: {
                                bio: true,
                                hourlyRate: true,
                                serviceLocation: true,
                            },
                        },
                    },
                },
                cancellationRecords: true,
            },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.customerId !== userId && booking.providerId !== userId) {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                select: { role: true },
            });
            if (user?.role !== client_1.UserRole.ADMIN) {
                throw new common_1.ForbiddenException('Access denied');
            }
        }
        return booking;
    }
    async getJobTimeline(userId, jobId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
            select: {
                id: true,
                customerId: true,
                status: true,
            },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        const activeBooking = await this.prisma.booking.findFirst({
            where: {
                jobId,
                status: { notIn: ['CANCELLED'] },
            },
            select: { providerId: true },
        });
        const isCustomer = job.customerId === userId;
        const isProvider = activeBooking?.providerId === userId;
        if (!isCustomer && !isProvider) {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                select: { role: true },
            });
            if (user?.role !== client_1.UserRole.ADMIN) {
                throw new common_1.ForbiddenException('Access denied');
            }
        }
        const timeline = await this.prisma.jobTimeline.findMany({
            where: { jobId },
            orderBy: { createdAt: 'asc' },
        });
        const booking = await this.prisma.booking.findFirst({
            where: { jobId },
        });
        return {
            jobId,
            currentStatus: job.status,
            bookingStatus: booking?.status || null,
            events: timeline.map((t) => ({
                event: t.event,
                description: t.description,
                timestamp: t.createdAt,
            })),
            summary: this.buildTimelineSummary(timeline, job.status, booking),
        };
    }
    async getProviderActiveWork(providerId) {
        const bookings = await this.prisma.booking.findMany({
            where: {
                providerId,
                status: { in: [client_1.BookingStatus.ACCEPTED, client_1.BookingStatus.IN_PROGRESS] },
            },
            include: {
                job: {
                    include: {
                        category: true,
                        images: { take: 1 },
                    },
                },
                customer: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePhoto: true,
                        phone: true,
                        city: true,
                        address: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return bookings;
    }
    async getCustomerActiveBookings(customerId) {
        const bookings = await this.prisma.booking.findMany({
            where: {
                customerId,
                status: { in: [client_1.BookingStatus.ACCEPTED, client_1.BookingStatus.IN_PROGRESS] },
            },
            include: {
                job: {
                    include: {
                        category: true,
                        images: { take: 1 },
                    },
                },
                provider: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePhoto: true,
                        phone: true,
                        city: true,
                        providerProfile: {
                            select: {
                                bio: true,
                                serviceLocation: true,
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return bookings;
    }
    async getCustomerBookingStats(customerId) {
        const [total, accepted, inProgress, completed, cancelled, disputed] = await Promise.all([
            this.prisma.booking.count({ where: { customerId } }),
            this.prisma.booking.count({
                where: { customerId, status: client_1.BookingStatus.ACCEPTED },
            }),
            this.prisma.booking.count({
                where: { customerId, status: client_1.BookingStatus.IN_PROGRESS },
            }),
            this.prisma.booking.count({
                where: { customerId, status: client_1.BookingStatus.COMPLETED },
            }),
            this.prisma.booking.count({
                where: { customerId, status: client_1.BookingStatus.CANCELLED },
            }),
            this.prisma.booking.count({
                where: { customerId, status: client_1.BookingStatus.DISPUTED },
            }),
        ]);
        return {
            total,
            accepted: inProgress + accepted,
            inProgress,
            completed,
            cancelled,
            disputed,
        };
    }
    async getProviderBookingStats(providerId) {
        const [total, accepted, inProgress, completed, cancelled, disputed] = await Promise.all([
            this.prisma.booking.count({ where: { providerId } }),
            this.prisma.booking.count({
                where: { providerId, status: client_1.BookingStatus.ACCEPTED },
            }),
            this.prisma.booking.count({
                where: { providerId, status: client_1.BookingStatus.IN_PROGRESS },
            }),
            this.prisma.booking.count({
                where: { providerId, status: client_1.BookingStatus.COMPLETED },
            }),
            this.prisma.booking.count({
                where: { providerId, status: client_1.BookingStatus.CANCELLED },
            }),
            this.prisma.booking.count({
                where: { providerId, status: client_1.BookingStatus.DISPUTED },
            }),
        ]);
        return {
            total,
            accepted: inProgress + accepted,
            inProgress,
            completed,
            cancelled,
            disputed,
        };
    }
    async adminListBookings(query) {
        const { page = 1, limit = 10, status, categoryId, dateFrom, dateTo, search, customerId, providerId, cityId, sortBy = booking_query_dto_1.BookingSortField.CREATED_AT, sortOrder = 'desc', } = query;
        const skip = (page - 1) * limit;
        const where = {
            ...(status && { status: status }),
            ...(dateFrom || dateTo
                ? {
                    createdAt: {
                        ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
                        ...(dateTo ? { lte: new Date(dateTo + 'T23:59:59Z') } : {}),
                    },
                }
                : {}),
            ...(categoryId ? { job: { categoryId } } : {}),
            ...(search
                ? {
                    OR: [
                        { id: search },
                        { job: { title: { contains: search, mode: 'insensitive' } } },
                    ],
                }
                : {}),
            ...(customerId ? { customerId } : {}),
            ...(providerId ? { providerId } : {}),
            ...(cityId ? { customer: { cityId } } : {}),
        };
        const orderByField = sortBy === booking_query_dto_1.BookingSortField.TOTAL_AMOUNT ? 'totalAmount' : 'createdAt';
        const [bookings, total] = await Promise.all([
            this.prisma.booking.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [orderByField]: sortOrder },
                include: {
                    job: { include: { category: true } },
                    customer: { select: { id: true, fullName: true, phone: true } },
                    provider: { select: { id: true, fullName: true, phone: true } },
                },
            }),
            this.prisma.booking.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: bookings,
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
    async adminGetBooking(bookingId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                job: { include: { category: true, images: true } },
                customer: { include: { city: true } },
                provider: {
                    include: {
                        providerProfile: {
                            include: { categories: { include: { category: true } } },
                        },
                    },
                },
                disputes: true,
                reviews: true,
                cancellationRecords: true,
                conversations: {
                    include: { messages: { orderBy: { createdAt: 'asc' } } },
                },
            },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        return booking;
    }
    async expireOverdueJobs() {
        const jobsWithActiveBooking = await this.prisma.booking.findMany({
            where: {
                status: { notIn: ['CANCELLED', 'COMPLETED', 'DISPUTED'] },
            },
            select: { jobId: true },
            distinct: ['jobId'],
        });
        const jobIdsWithActiveBooking = jobsWithActiveBooking.map((b) => b.jobId);
        const result = await this.prisma.job.updateMany({
            where: {
                status: client_1.JobStatus.PENDING,
                expiresAt: { lte: new Date() },
                id: { notIn: jobIdsWithActiveBooking },
            },
            data: { status: client_1.JobStatus.EXPIRED },
        });
        if (result.count > 0) {
            const expiredJobs = await this.prisma.job.findMany({
                where: {
                    status: client_1.JobStatus.EXPIRED,
                    timeline: { none: { event: 'JOB_EXPIRED' } },
                },
                select: { id: true },
            });
            for (const job of expiredJobs) {
                await this.recordJobTimeline(job.id, 'JOB_EXPIRED', 'Job expired due to no provider selection');
            }
            for (const job of expiredJobs) {
                await this.prisma.bid.updateMany({
                    where: {
                        jobId: job.id,
                        status: 'PENDING',
                    },
                    data: { status: 'EXPIRED' },
                });
            }
            this.logger.log({
                message: 'Expired overdue jobs',
                count: result.count,
            });
        }
        return result.count;
    }
    calculateExpiry() {
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + 24);
        return expiry;
    }
    async recordJobTimeline(jobId, event, description) {
        await this.prisma.jobTimeline.create({
            data: { jobId, event, description },
        });
    }
    buildTimelineSummary(timeline, currentStatus, booking) {
        const events = {};
        for (const entry of timeline) {
            if (!events[entry.event]) {
                events[entry.event] = entry.createdAt;
            }
        }
        return {
            jobCreated: events['JOB_CREATED'] || null,
            firstBid: events['BID_RECEIVED'] || null,
            bidAccepted: events['BID_ACCEPTED'] || null,
            providerAssigned: events['PROVIDER_ASSIGNED'] || events['PROVIDER_ACCEPTED'] || null,
            workStarted: events['WORK_STARTED'] || null,
            workCompleted: events['WORK_COMPLETED'] || null,
            customerConfirmed: events['CUSTOMER_CONFIRMED'] || null,
            cancelled: events['BOOKING_CANCELLED'] || null,
            expired: events['JOB_EXPIRED'] || null,
            currentJobStatus: currentStatus,
            currentBookingStatus: booking?.status || null,
        };
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        nestjs_pino_1.Logger,
        notifications_service_1.NotificationsService,
        penalties_service_1.PenaltiesService,
        wallet_service_1.WalletService])
], BookingService);
//# sourceMappingURL=booking.service.js.map