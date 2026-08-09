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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderBookingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const booking_service_1 = require("./booking.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("../../../generated/prisma/client");
const booking_query_dto_1 = require("./dtos/booking-query.dto");
let ProviderBookingController = class ProviderBookingController {
    bookingService;
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async listBookings(userId, query) {
        return this.bookingService.listProviderBookings(userId, query);
    }
    async getActiveWork(userId) {
        return this.bookingService.getProviderActiveWork(userId);
    }
    async getStats(userId) {
        return this.bookingService.getProviderBookingStats(userId);
    }
    async getBookingById(userId, id) {
        return this.bookingService.getBookingById(userId, id);
    }
    async getJobTimeline(userId, jobId) {
        return this.bookingService.getJobTimeline(userId, jobId);
    }
    async startJob(userId, bookingId) {
        return this.bookingService.startJob(userId, bookingId);
    }
    async markCompleted(userId, bookingId) {
        return this.bookingService.markJobCompleted(userId, bookingId);
    }
    async cancelBooking(userId, bookingId, reason) {
        return this.bookingService.cancelBookingByProvider(userId, bookingId, reason);
    }
};
exports.ProviderBookingController = ProviderBookingController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'View booking history with filters' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, booking_query_dto_1.BookingQueryDto]),
    __metadata("design:returntype", Promise)
], ProviderBookingController.prototype, "listBookings", null);
__decorate([
    (0, common_1.Get)('/active'),
    (0, swagger_1.ApiOperation)({ summary: 'View active work (accepted + in-progress)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderBookingController.prototype, "getActiveWork", null);
__decorate([
    (0, common_1.Get)('/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get provider booking statistics' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderBookingController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View a single booking by ID' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProviderBookingController.prototype, "getBookingById", null);
__decorate([
    (0, common_1.Get)('/jobs/:jobId/timeline'),
    (0, swagger_1.ApiOperation)({ summary: 'View full job tracking timeline' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('jobId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProviderBookingController.prototype, "getJobTimeline", null);
__decorate([
    (0, common_1.Post)('/:bookingId/start'),
    (0, swagger_1.ApiOperation)({ summary: 'Start work on a job' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('bookingId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProviderBookingController.prototype, "startJob", null);
__decorate([
    (0, common_1.Post)('/:bookingId/complete'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark job as completed' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('bookingId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProviderBookingController.prototype, "markCompleted", null);
__decorate([
    (0, common_1.Post)('/:bookingId/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel booking before work starts' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('bookingId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ProviderBookingController.prototype, "cancelBooking", null);
exports.ProviderBookingController = ProviderBookingController = __decorate([
    (0, swagger_1.ApiTags)('Booking (Provider)'),
    (0, common_1.Controller)('provider/booking'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.PROVIDER),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], ProviderBookingController);
//# sourceMappingURL=provider-booking.controller.js.map