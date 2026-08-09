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
exports.AdminBookingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const booking_service_1 = require("./booking.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("../../../generated/prisma/client");
const booking_query_dto_1 = require("./dtos/booking-query.dto");
let AdminBookingsController = class AdminBookingsController {
    bookingService;
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async list(query) {
        return this.bookingService.adminListBookings(query);
    }
    async getTimeline(adminId, jobId) {
        return this.bookingService.getJobTimeline(adminId, jobId);
    }
    async getDetail(id) {
        return this.bookingService.adminGetBooking(id);
    }
};
exports.AdminBookingsController = AdminBookingsController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({
        summary: 'List all bookings with search/filter/pagination',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_query_dto_1.BookingQueryDto]),
    __metadata("design:returntype", Promise)
], AdminBookingsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('/jobs/:jobId/timeline'),
    (0, swagger_1.ApiOperation)({ summary: 'View a booking/job tracking timeline' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('jobId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminBookingsController.prototype, "getTimeline", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View full booking details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminBookingsController.prototype, "getDetail", null);
exports.AdminBookingsController = AdminBookingsController = __decorate([
    (0, swagger_1.ApiTags)('Bookings (Admin)'),
    (0, common_1.Controller)('admin/bookings'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], AdminBookingsController);
//# sourceMappingURL=admin-booking.controller.js.map