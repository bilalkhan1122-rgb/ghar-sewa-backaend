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
exports.CustomerBookingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const booking_service_1 = require("./booking.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("../../../generated/prisma/client");
const direct_booking_dto_1 = require("./dtos/direct-booking.dto");
const booking_query_dto_1 = require("./dtos/booking-query.dto");
let CustomerBookingController = class CustomerBookingController {
    bookingService;
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async createDirectBooking(userId, dto) {
        return this.bookingService.createDirectBooking(userId, dto);
    }
    async listBookings(userId, query) {
        return this.bookingService.listCustomerBookings(userId, query);
    }
    async getActiveBookings(userId) {
        return this.bookingService.getCustomerActiveBookings(userId);
    }
    async getStats(userId) {
        return this.bookingService.getCustomerBookingStats(userId);
    }
    async getBookingById(userId, id) {
        return this.bookingService.getBookingById(userId, id);
    }
    async getJobTimeline(userId, jobId) {
        return this.bookingService.getJobTimeline(userId, jobId);
    }
    async confirmCompletion(userId, bookingId) {
        return this.bookingService.confirmCompletion(userId, bookingId);
    }
    async cancelBooking(userId, bookingId, reason) {
        return this.bookingService.cancelBooking(userId, bookingId, reason);
    }
};
exports.CustomerBookingController = CustomerBookingController;
__decorate([
    (0, common_1.Post)('/direct'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a direct booking (fixed price)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, direct_booking_dto_1.DirectBookingDto]),
    __metadata("design:returntype", Promise)
], CustomerBookingController.prototype, "createDirectBooking", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'View booking history with filters' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, booking_query_dto_1.BookingQueryDto]),
    __metadata("design:returntype", Promise)
], CustomerBookingController.prototype, "listBookings", null);
__decorate([
    (0, common_1.Get)('/active'),
    (0, swagger_1.ApiOperation)({ summary: 'View active bookings' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerBookingController.prototype, "getActiveBookings", null);
__decorate([
    (0, common_1.Get)('/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get booking statistics' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerBookingController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View a single booking by ID' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomerBookingController.prototype, "getBookingById", null);
__decorate([
    (0, common_1.Get)('/jobs/:jobId/timeline'),
    (0, swagger_1.ApiOperation)({ summary: 'View full job tracking timeline' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('jobId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomerBookingController.prototype, "getJobTimeline", null);
__decorate([
    (0, common_1.Post)('/:bookingId/confirm-completion'),
    (0, swagger_1.ApiOperation)({ summary: 'Confirm job completion' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('bookingId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomerBookingController.prototype, "confirmCompletion", null);
__decorate([
    (0, common_1.Post)('/:bookingId/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel booking (before work starts)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('bookingId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CustomerBookingController.prototype, "cancelBooking", null);
exports.CustomerBookingController = CustomerBookingController = __decorate([
    (0, swagger_1.ApiTags)('Booking (Customer)'),
    (0, common_1.Controller)('booking'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.CUSTOMER),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], CustomerBookingController);
//# sourceMappingURL=customer-booking.controller.js.map