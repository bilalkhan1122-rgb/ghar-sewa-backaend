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
exports.BiddingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bid_query_dto_1 = require("./dtos/bid-query.dto");
const nestjs_pino_1 = require("nestjs-pino");
const client_1 = require("../../../generated/prisma/client");
const notifications_service_1 = require("../notifications/notifications.service");
const penalties_service_1 = require("../penalties/penalties.service");
let BiddingService = class BiddingService {
    prisma;
    logger;
    notifications;
    penalties;
    constructor(prisma, logger, notifications, penalties) {
        this.prisma = prisma;
        this.logger = logger;
        this.notifications = notifications;
        this.penalties = penalties;
    }
    async getActiveBookingForJob(jobId) {
        return this.prisma.booking.findFirst({
            where: {
                jobId,
                status: { notIn: ['CANCELLED'] },
            },
        });
    }
    async submitBid(providerId, dto) {
        const provider = await this.prisma.user.findUnique({
            where: { id: providerId },
            include: {
                providerProfile: {
                    include: { categories: true },
                },
            },
        });
        if (!provider || provider.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.ForbiddenException('Only providers can submit bids');
        }
        if (provider.verificationStatus !== client_1.VerificationStatus.APPROVED) {
            throw new common_1.ForbiddenException('Your profile must be approved before you can bid on jobs');
        }
        if (provider.status !== client_1.UserStatus.ACTIVE) {
            throw new common_1.ForbiddenException('Your account is suspended or banned. You cannot submit bids.');
        }
        if (!provider.profileCompleted || !provider.isActive) {
            throw new common_1.ForbiddenException('Your profile must be complete and active to submit bids');
        }
        const job = await this.prisma.job.findUnique({
            where: { id: dto.jobId },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.customerId === providerId) {
            throw new common_1.BadRequestException('You cannot bid on your own job');
        }
        if (job.status !== client_1.JobStatus.PENDING) {
            throw new common_1.BadRequestException(`Cannot bid on a job that is ${job.status.toLowerCase()}`);
        }
        if (job.expiresAt <= new Date()) {
            throw new common_1.BadRequestException('This job has expired');
        }
        const activeBooking = await this.getActiveBookingForJob(dto.jobId);
        if (activeBooking) {
            throw new common_1.BadRequestException('This job already has a provider assigned');
        }
        const providerCategoryIds = provider.providerProfile?.categories.map((c) => c.categoryId) || [];
        if (!providerCategoryIds.includes(job.categoryId)) {
            throw new common_1.BadRequestException('This job is not in your service categories');
        }
        const existingBid = await this.prisma.bid.findFirst({
            where: {
                jobId: dto.jobId,
                providerId,
                status: { in: [client_1.BidStatus.PENDING] },
            },
        });
        if (existingBid) {
            throw new common_1.BadRequestException('You have already submitted a bid for this job');
        }
        const bid = await this.prisma.bid.create({
            data: {
                jobId: dto.jobId,
                providerId,
                offeredPrice: dto.offeredPrice,
                message: dto.message,
                status: client_1.BidStatus.PENDING,
            },
            include: {
                job: {
                    select: {
                        id: true,
                        title: true,
                        customerId: true,
                    },
                },
            },
        });
        await this.recordJobTimeline(dto.jobId, 'BID_RECEIVED', 'New bid received');
        this.logger.log({
            message: 'Bid submitted',
            bidId: bid.id,
            jobId: dto.jobId,
            providerId,
            amount: dto.offeredPrice,
        });
        void this.notifications.send({
            userId: bid.job.customerId,
            type: client_1.NotificationType.NEW_BID,
            title: 'New bid received 💼',
            message: `A provider submitted a bid of Rs. ${dto.offeredPrice} for "${bid.job.title}".`,
            relatedEntityType: 'JOB',
            relatedEntityId: dto.jobId,
        });
        return bid;
    }
    async acceptCustomerPrice(providerId, jobId) {
        const provider = await this.validateProviderForBidding(providerId);
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.customerId === providerId) {
            throw new common_1.BadRequestException('You cannot accept your own job');
        }
        if (job.status !== client_1.JobStatus.PENDING) {
            throw new common_1.BadRequestException(`Cannot accept a job that is ${job.status.toLowerCase()}`);
        }
        if (job.expiresAt <= new Date()) {
            throw new common_1.BadRequestException('This job has expired');
        }
        const activeBooking = await this.getActiveBookingForJob(jobId);
        if (activeBooking) {
            throw new common_1.BadRequestException('This job already has a provider assigned');
        }
        const providerCategoryIds = provider.providerProfile?.categories.map((c) => c.categoryId) || [];
        if (!providerCategoryIds.includes(job.categoryId)) {
            throw new common_1.BadRequestException('This job is not in your service categories');
        }
        const existingBid = await this.prisma.bid.findFirst({
            where: { jobId, providerId, status: client_1.BidStatus.PENDING },
        });
        if (existingBid) {
            throw new common_1.BadRequestException('You already have a pending bid. Update or withdraw it instead.');
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const bid = await tx.bid.create({
                data: {
                    jobId,
                    providerId,
                    offeredPrice: job.offeredPrice,
                    status: client_1.BidStatus.ACCEPTED,
                    message: 'Accepted the offered price',
                },
            });
            await tx.job.update({
                where: { id: jobId },
                data: { status: client_1.JobStatus.ACCEPTED },
            });
            await tx.bid.updateMany({
                where: {
                    jobId,
                    providerId: { not: providerId },
                    status: client_1.BidStatus.PENDING,
                },
                data: { status: client_1.BidStatus.REJECTED },
            });
            const booking = await tx.booking.create({
                data: {
                    jobId,
                    customerId: job.customerId,
                    providerId,
                    bookingType: 'BID',
                    totalAmount: job.offeredPrice,
                    status: 'ACCEPTED',
                    acceptedAt: new Date(),
                },
            });
            await tx.jobTimeline.create({
                data: {
                    jobId,
                    event: 'PROVIDER_ACCEPTED',
                    description: 'Provider accepted the job at offered price',
                },
            });
            return { bid, booking };
        });
        this.logger.log({
            message: 'Provider accepted customer price',
            jobId,
            providerId,
            amount: job.offeredPrice,
        });
        void this.notifications.send({
            userId: job.customerId,
            type: client_1.NotificationType.JOB_ACCEPTED,
            title: 'Job accepted! ✅',
            message: `A provider accepted your offered price for "${job.title}".`,
            relatedEntityType: 'JOB',
            relatedEntityId: job.id,
        });
        void this.notifications.send({
            userId: job.customerId,
            type: client_1.NotificationType.BOOKING_CONFIRMED,
            title: 'Provider assigned',
            message: `A provider accepted your offered price for "${job.title}".`,
            relatedEntityType: 'BOOKING',
            relatedEntityId: result.booking.id,
        });
        return result;
    }
    async updateBid(providerId, bidId, dto) {
        const bid = await this.prisma.bid.findUnique({
            where: { id: bidId },
            include: { job: true },
        });
        if (!bid) {
            throw new common_1.NotFoundException('Bid not found');
        }
        if (bid.providerId !== providerId) {
            throw new common_1.ForbiddenException('You can only update your own bids');
        }
        if (bid.status !== client_1.BidStatus.PENDING) {
            throw new common_1.BadRequestException(`Cannot update a bid that is ${bid.status.toLowerCase()}`);
        }
        if (bid.job.status !== client_1.JobStatus.PENDING) {
            throw new common_1.BadRequestException('Cannot update a bid on a job that is no longer pending');
        }
        if (bid.job.expiresAt <= new Date()) {
            throw new common_1.BadRequestException('This job has expired');
        }
        const updated = await this.prisma.bid.update({
            where: { id: bidId },
            data: {
                ...(dto.offeredPrice !== undefined && {
                    offeredPrice: dto.offeredPrice,
                }),
                ...(dto.message !== undefined && { message: dto.message }),
            },
        });
        return updated;
    }
    async withdrawBid(providerId, bidId) {
        const bid = await this.prisma.bid.findUnique({
            where: { id: bidId },
            include: { job: true },
        });
        if (!bid) {
            throw new common_1.NotFoundException('Bid not found');
        }
        if (bid.providerId !== providerId) {
            throw new common_1.ForbiddenException('You can only withdraw your own bids');
        }
        if (bid.status !== client_1.BidStatus.PENDING) {
            throw new common_1.BadRequestException(`Cannot withdraw a bid that is ${bid.status.toLowerCase()}`);
        }
        const updated = await this.prisma.bid.update({
            where: { id: bidId },
            data: { status: client_1.BidStatus.WITHDRAWN },
        });
        this.logger.log({
            message: 'Bid withdrawn',
            bidId,
            providerId,
            jobId: bid.jobId,
        });
        this.logger.log({
            message: 'Notification: Bid withdrawn',
            customerId: bid.job.customerId,
            jobId: bid.jobId,
        });
        return updated;
    }
    async listMyBids(providerId, query) {
        const { page = 1, limit = 10, status, jobId, sortBy = bid_query_dto_1.BidSortField.CREATED_AT, sortOrder = 'desc', } = query;
        const skip = (page - 1) * limit;
        const where = {
            providerId,
            ...(status && { status: status }),
            ...(jobId && { jobId }),
        };
        const orderByField = sortBy === bid_query_dto_1.BidSortField.OFFERED_PRICE ? 'offeredPrice' : 'createdAt';
        const [bids, total] = await Promise.all([
            this.prisma.bid.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [orderByField]: sortOrder },
                include: {
                    job: {
                        select: {
                            id: true,
                            title: true,
                            status: true,
                            offeredPrice: true,
                            category: true,
                            createdAt: true,
                        },
                    },
                },
            }),
            this.prisma.bid.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: bids,
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
    async getAvailableJobsWithBidStatus(providerId) {
        const provider = await this.validateProviderForBidding(providerId);
        const providerCategoryIds = provider.providerProfile?.categories.map((c) => c.categoryId) || [];
        const jobsWithActiveBooking = await this.prisma.booking.findMany({
            where: {
                job: {
                    status: client_1.JobStatus.PENDING,
                    categoryId: { in: providerCategoryIds },
                },
                status: { notIn: ['CANCELLED'] },
            },
            select: { jobId: true },
        });
        const excludedJobIds = jobsWithActiveBooking.map((b) => b.jobId);
        const jobs = await this.prisma.job.findMany({
            where: {
                status: client_1.JobStatus.PENDING,
                categoryId: { in: providerCategoryIds },
                expiresAt: { gt: new Date() },
                customerId: { not: providerId },
                id: { notIn: excludedJobIds },
            },
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
                bids: {
                    where: { providerId },
                    select: {
                        id: true,
                        status: true,
                        offeredPrice: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return jobs;
    }
    async getBidsForJob(customerId, jobId, query) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.customerId !== customerId) {
            throw new common_1.ForbiddenException('You can only view bids for your own jobs');
        }
        const { page = 1, limit = 10, status, sortBy = bid_query_dto_1.BidSortField.CREATED_AT, sortOrder = 'desc', } = query;
        const skip = (page - 1) * limit;
        const where = {
            jobId,
            ...(status && { status: status }),
        };
        const orderByField = sortBy === bid_query_dto_1.BidSortField.OFFERED_PRICE ? 'offeredPrice' : 'createdAt';
        const [bids, total] = await Promise.all([
            this.prisma.bid.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [orderByField]: sortOrder },
                include: {
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
                                    serviceRadius: true,
                                    categories: {
                                        include: { category: true },
                                    },
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.bid.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: bids,
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
    async acceptBid(customerId, bidId) {
        const bid = await this.prisma.bid.findUnique({
            where: { id: bidId },
            include: { job: true },
        });
        if (!bid) {
            throw new common_1.NotFoundException('Bid not found');
        }
        if (bid.job.customerId !== customerId) {
            throw new common_1.ForbiddenException('You can only accept bids for your own jobs');
        }
        if (bid.job.status !== client_1.JobStatus.PENDING) {
            throw new common_1.BadRequestException(`Cannot accept a bid for a job that is ${bid.job.status.toLowerCase()}`);
        }
        if (bid.job.expiresAt <= new Date()) {
            throw new common_1.BadRequestException('This job has expired');
        }
        if (bid.status !== client_1.BidStatus.PENDING) {
            throw new common_1.BadRequestException(`Cannot accept a bid that is ${bid.status.toLowerCase()}`);
        }
        const existingActiveBooking = await this.getActiveBookingForJob(bid.jobId);
        if (existingActiveBooking) {
            throw new common_1.BadRequestException('This job already has a provider assigned');
        }
        const rejectedProviders = await this.prisma.bid.findMany({
            where: {
                jobId: bid.jobId,
                id: { not: bidId },
                status: client_1.BidStatus.PENDING,
            },
            select: { providerId: true },
        });
        const result = await this.prisma.$transaction(async (tx) => {
            const acceptedBid = await tx.bid.update({
                where: { id: bidId },
                data: { status: client_1.BidStatus.ACCEPTED },
            });
            await tx.bid.updateMany({
                where: {
                    jobId: bid.jobId,
                    id: { not: bidId },
                    status: client_1.BidStatus.PENDING,
                },
                data: { status: client_1.BidStatus.REJECTED },
            });
            await tx.job.update({
                where: { id: bid.jobId },
                data: { status: client_1.JobStatus.ACCEPTED },
            });
            const booking = await tx.booking.create({
                data: {
                    jobId: bid.jobId,
                    customerId,
                    providerId: bid.providerId,
                    bookingType: 'BID',
                    totalAmount: bid.offeredPrice,
                    status: 'ACCEPTED',
                    acceptedAt: new Date(),
                },
            });
            await tx.jobTimeline.create({
                data: {
                    jobId: bid.jobId,
                    event: 'BID_ACCEPTED',
                    description: 'Customer accepted a bid',
                },
            });
            await tx.jobTimeline.create({
                data: {
                    jobId: bid.jobId,
                    event: 'PROVIDER_ASSIGNED',
                    description: 'Provider assigned to the job',
                },
            });
            return { bid: acceptedBid, booking };
        });
        this.logger.log({
            message: 'Bid accepted, booking created',
            bidId,
            jobId: bid.jobId,
            customerId,
            providerId: bid.providerId,
            amount: bid.offeredPrice,
        });
        void this.notifications.send({
            userId: bid.providerId,
            type: client_1.NotificationType.BID_ACCEPTED,
            title: 'Your bid was accepted! 🎉',
            message: `Your bid of Rs. ${Number(bid.offeredPrice)} for "${bid.job.title}" was accepted.`,
            relatedEntityType: 'JOB',
            relatedEntityId: bid.jobId,
        });
        void this.notifications.send({
            userId: customerId,
            type: client_1.NotificationType.JOB_ACCEPTED,
            title: 'Job accepted! ✅',
            message: `Your job "${bid.job.title}" has been accepted by a provider.`,
            relatedEntityType: 'JOB',
            relatedEntityId: bid.jobId,
        });
        void this.notifications.send({
            userId: customerId,
            type: client_1.NotificationType.BOOKING_CONFIRMED,
            title: 'Provider assigned',
            message: `A provider has been assigned to your job "${bid.job.title}".`,
            relatedEntityType: 'BOOKING',
            relatedEntityId: result.booking.id,
        });
        await this.notifications.sendToMany(rejectedProviders.map((p) => ({
            userId: p.providerId,
            type: client_1.NotificationType.BID_REJECTED,
            title: 'Bid not selected',
            message: `Your bid for "${bid.job.title}" was not selected this time.`,
            relatedEntityType: 'JOB',
            relatedEntityId: bid.jobId,
        })));
        return result;
    }
    async rejectBid(customerId, bidId) {
        const bid = await this.prisma.bid.findUnique({
            where: { id: bidId },
            include: { job: true },
        });
        if (!bid) {
            throw new common_1.NotFoundException('Bid not found');
        }
        if (bid.job.customerId !== customerId) {
            throw new common_1.ForbiddenException('You can only reject bids for your own jobs');
        }
        if (bid.status !== client_1.BidStatus.PENDING) {
            throw new common_1.BadRequestException(`Cannot reject a bid that is ${bid.status.toLowerCase()}`);
        }
        const updated = await this.prisma.bid.update({
            where: { id: bidId },
            data: { status: client_1.BidStatus.REJECTED },
        });
        await this.recordJobTimeline(bid.jobId, 'BID_REJECTED', 'Bid was rejected');
        this.logger.log({
            message: 'Bid rejected',
            bidId,
            jobId: bid.jobId,
        });
        void this.notifications.send({
            userId: bid.providerId,
            type: client_1.NotificationType.BID_REJECTED,
            title: 'Bid not selected',
            message: `Your bid for "${bid.job.title}" was not selected this time.`,
            relatedEntityType: 'JOB',
            relatedEntityId: bid.jobId,
        });
        return updated;
    }
    async cancelProviderSelection(customerId, jobId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.customerId !== customerId) {
            throw new common_1.ForbiddenException('You can only manage your own jobs');
        }
        if (job.status !== client_1.JobStatus.ACCEPTED) {
            throw new common_1.BadRequestException('Provider selection can only be cancelled before work starts');
        }
        const booking = await this.prisma.booking.findFirst({
            where: { jobId, status: 'ACCEPTED' },
        });
        if (!booking) {
            throw new common_1.BadRequestException('No provider is currently assigned');
        }
        const result = await this.prisma.$transaction(async (tx) => {
            await tx.job.update({
                where: { id: jobId },
                data: {
                    status: client_1.JobStatus.PENDING,
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                },
            });
            await tx.bid.updateMany({
                where: { jobId, status: client_1.BidStatus.REJECTED },
                data: { status: client_1.BidStatus.PENDING },
            });
            await tx.bid.updateMany({
                where: {
                    jobId,
                    providerId: booking.providerId,
                    status: client_1.BidStatus.ACCEPTED,
                },
                data: { status: client_1.BidStatus.PENDING },
            });
            await tx.booking.update({
                where: { id: booking.id },
                data: {
                    status: 'CANCELLED',
                    cancelledAt: new Date(),
                },
            });
            await tx.cancellationRecord.create({
                data: {
                    jobId,
                    bookingId: booking.id,
                    cancelledBy: 'CUSTOMER',
                    cancellationType: client_1.CancellationType.CUSTOMER,
                    reason: 'Customer cancelled provider selection before work started',
                },
            });
            await tx.jobTimeline.create({
                data: {
                    jobId,
                    event: 'SELECTION_CANCELLED',
                    description: 'Customer cancelled provider selection',
                },
            });
            return { message: 'Provider selection cancelled successfully' };
        });
        this.logger.log({
            message: 'Provider selection cancelled',
            jobId,
            customerId,
        });
        this.logger.log({
            message: 'Notification: Your selection has been cancelled',
            jobId,
        });
        return result;
    }
    async getSelectedProvider(customerId, jobId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.customerId !== customerId) {
            throw new common_1.ForbiddenException('You can only view your own jobs');
        }
        const booking = await this.prisma.booking.findFirst({
            where: { jobId, status: { notIn: ['CANCELLED'] } },
            include: {
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
                                serviceRadius: true,
                            },
                        },
                    },
                },
            },
        });
        if (!booking) {
            throw new common_1.NotFoundException('No provider is currently assigned');
        }
        return booking;
    }
    async validateProviderForBidding(providerId) {
        await this.penalties.assertProviderEligible(providerId);
        const provider = await this.prisma.user.findUnique({
            where: { id: providerId },
            include: {
                providerProfile: {
                    include: { categories: true },
                },
            },
        });
        if (!provider || provider.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        if (provider.verificationStatus !== client_1.VerificationStatus.APPROVED ||
            !provider.profileCompleted ||
            !provider.isActive) {
            throw new common_1.ForbiddenException('Your profile must be approved and complete to bid on jobs');
        }
        return provider;
    }
    async recordJobTimeline(jobId, event, description) {
        await this.prisma.jobTimeline.create({
            data: { jobId, event, description },
        });
    }
};
exports.BiddingService = BiddingService;
exports.BiddingService = BiddingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        nestjs_pino_1.Logger,
        notifications_service_1.NotificationsService,
        penalties_service_1.PenaltiesService])
], BiddingService);
//# sourceMappingURL=bidding.service.js.map