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
exports.CustomerBiddingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bidding_service_1 = require("./bidding.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("../../../generated/prisma/client");
const bid_query_dto_1 = require("./dtos/bid-query.dto");
let CustomerBiddingController = class CustomerBiddingController {
    biddingService;
    constructor(biddingService) {
        this.biddingService = biddingService;
    }
    async getBidsForJob(userId, jobId, query) {
        return this.biddingService.getBidsForJob(userId, jobId, query);
    }
    async acceptBid(userId, bidId) {
        return this.biddingService.acceptBid(userId, bidId);
    }
    async rejectBid(userId, bidId) {
        return this.biddingService.rejectBid(userId, bidId);
    }
    async getSelectedProvider(userId, jobId) {
        return this.biddingService.getSelectedProvider(userId, jobId);
    }
    async cancelSelection(userId, jobId) {
        return this.biddingService.cancelProviderSelection(userId, jobId);
    }
};
exports.CustomerBiddingController = CustomerBiddingController;
__decorate([
    (0, common_1.Get)('/jobs/:jobId/bids'),
    (0, swagger_1.ApiOperation)({ summary: 'View all bids for a job' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('jobId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, bid_query_dto_1.BidQueryDto]),
    __metadata("design:returntype", Promise)
], CustomerBiddingController.prototype, "getBidsForJob", null);
__decorate([
    (0, common_1.Post)('/bids/:bidId/accept'),
    (0, swagger_1.ApiOperation)({ summary: 'Accept a bid and assign provider' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('bidId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomerBiddingController.prototype, "acceptBid", null);
__decorate([
    (0, common_1.Post)('/bids/:bidId/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject a bid' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('bidId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomerBiddingController.prototype, "rejectBid", null);
__decorate([
    (0, common_1.Get)('/jobs/:jobId/provider'),
    (0, swagger_1.ApiOperation)({ summary: 'View selected provider for a job' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('jobId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomerBiddingController.prototype, "getSelectedProvider", null);
__decorate([
    (0, common_1.Post)('/jobs/:jobId/cancel-selection'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel provider selection before work starts' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('jobId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomerBiddingController.prototype, "cancelSelection", null);
exports.CustomerBiddingController = CustomerBiddingController = __decorate([
    (0, swagger_1.ApiTags)('Bidding (Customer)'),
    (0, common_1.Controller)('bidding'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.CUSTOMER),
    __metadata("design:paramtypes", [bidding_service_1.BiddingService])
], CustomerBiddingController);
//# sourceMappingURL=customer-bidding.controller.js.map