"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModule = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const customer_booking_controller_1 = require("./customer-booking.controller");
const provider_booking_controller_1 = require("./provider-booking.controller");
const admin_booking_controller_1 = require("./admin-booking.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const notifications_module_1 = require("../notifications/notifications.module");
const penalties_module_1 = require("../penalties/penalties.module");
const wallet_module_1 = require("../wallet/wallet.module");
let BookingModule = class BookingModule {
};
exports.BookingModule = BookingModule;
exports.BookingModule = BookingModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, notifications_module_1.NotificationsModule, penalties_module_1.PenaltiesModule, wallet_module_1.WalletModule],
        controllers: [
            customer_booking_controller_1.CustomerBookingController,
            provider_booking_controller_1.ProviderBookingController,
            admin_booking_controller_1.AdminBookingsController,
        ],
        providers: [booking_service_1.BookingService],
        exports: [booking_service_1.BookingService],
    })
], BookingModule);
//# sourceMappingURL=booking.module.js.map