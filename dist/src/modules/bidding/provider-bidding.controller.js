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
exports.ProviderBiddingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bidding_service_1 = require("./bidding.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("../../../generated/prisma/client");
const create_bid_dto_1 = require("./dtos/create-bid.dto");
const update_bid_dto_1 = require("./dtos/update-bid.dto");
const bid_query_dto_1 = require("./dtos/bid-query.dto");
let ProviderBiddingController = class ProviderBiddingController {
    biddingService;
    constructor(biddingService) {
        this.biddingService = biddingService;
    }
    async submitBid(userId, dto) {
        return this.biddingService.submitBid(userId, dto);
    }
    async acceptPrice(userId, jobId) {
        return this.biddingService.acceptCustomerPrice(userId, jobId);
    }
    async updateBid(userId, bidId, dto) {
        return this.biddingService.updateBid(userId, bidId, dto);
    }
    async withdrawBid(userId, bidId) {
        return this.biddingService.withdrawBid(userId, bidId);
    }
    async listMyBids(userId, query) {
        return this.biddingService.listMyBids(userId, query);
    }
    async getAvailableJobs(userId) {
        return this.biddingService.getAvailableJobsWithBidStatus(userId);
    }
};
exports.ProviderBiddingController = ProviderBiddingController;
__decorate([
    (0, common_1.Post)('/bids'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a bid on a job' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_bid_dto_1.CreateBidDto]),
    __metadata("design:returntype", Promise)
], ProviderBiddingController.prototype, "submitBid", null);
__decorate([
    (0, common_1.Post)('/jobs/:jobId/accept-price'),
    (0, swagger_1.ApiOperation)({ summary: 'Accept customer offered price (instant booking)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('jobId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProviderBiddingController.prototype, "acceptPrice", null);
__decorate([
    (0, common_1.Patch)('/bids/:bidId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update own bid (while pending)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('bidId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_bid_dto_1.UpdateBidDto]),
    __metadata("design:returntype", Promise)
], ProviderBiddingController.prototype, "updateBid", null);
__decorate([
    (0, common_1.Post)('/bids/:bidId/withdraw'),
    (0, swagger_1.ApiOperation)({ summary: 'Withdraw own bid' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('bidId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProviderBiddingController.prototype, "withdrawBid", null);
__decorate([
    (0, common_1.Get)('/bids'),
    (0, swagger_1.ApiOperation)({ summary: 'View submitted bids' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, bid_query_dto_1.BidQueryDto]),
    __metadata("design:returntype", Promise)
], ProviderBiddingController.prototype, "listMyBids", null);
__decorate([
    (0, common_1.Get)('/available-jobs'),
    (0, swagger_1.ApiOperation)({ summary: 'View available jobs with bid status' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderBiddingController.prototype, "getAvailableJobs", null);
exports.ProviderBiddingController = ProviderBiddingController = __decorate([
    (0, swagger_1.ApiTags)('Bidding (Provider)'),
    (0, common_1.Controller)('provider/bidding'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.PROVIDER),
    __metadata("design:paramtypes", [bidding_service_1.BiddingService])
], ProviderBiddingController);
//# sourceMappingURL=provider-bidding.controller.js.map