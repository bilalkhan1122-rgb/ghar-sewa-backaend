"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiddingModule = void 0;
const common_1 = require("@nestjs/common");
const bidding_service_1 = require("./bidding.service");
const customer_bidding_controller_1 = require("./customer-bidding.controller");
const provider_bidding_controller_1 = require("./provider-bidding.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const notifications_module_1 = require("../notifications/notifications.module");
const penalties_module_1 = require("../penalties/penalties.module");
let BiddingModule = class BiddingModule {
};
exports.BiddingModule = BiddingModule;
exports.BiddingModule = BiddingModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, notifications_module_1.NotificationsModule, penalties_module_1.PenaltiesModule],
        controllers: [customer_bidding_controller_1.CustomerBiddingController, provider_bidding_controller_1.ProviderBiddingController],
        providers: [bidding_service_1.BiddingService],
        exports: [bidding_service_1.BiddingService],
    })
], BiddingModule);
//# sourceMappingURL=bidding.module.js.map