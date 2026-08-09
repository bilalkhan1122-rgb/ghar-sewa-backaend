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
exports.ProviderReviewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reviews_service_1 = require("./reviews.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("../../../generated/prisma/client");
const create_review_dto_1 = require("./dtos/create-review.dto");
const update_review_dto_1 = require("./dtos/update-review.dto");
const review_query_dto_1 = require("./dtos/review-query.dto");
let ProviderReviewsController = class ProviderReviewsController {
    reviewsService;
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    async createReview(userId, dto) {
        return this.reviewsService.createReview(userId, dto);
    }
    async listWritten(userId, query) {
        return this.reviewsService.listWrittenReviews(userId, query);
    }
    async listReceived(userId, query) {
        return this.reviewsService.listReceivedReviews(userId, query);
    }
    async getSummary(userId) {
        return this.reviewsService.getRatingSummary(userId);
    }
    async updateReview(userId, id, dto) {
        return this.reviewsService.updateReview(userId, id, dto);
    }
    async deleteReview(userId, id) {
        return this.reviewsService.deleteReview(userId, id);
    }
};
exports.ProviderReviewsController = ProviderReviewsController;
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiOperation)({
        summary: 'Submit a review for a completed booking (customer review)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ProviderReviewsController.prototype, "createReview", null);
__decorate([
    (0, common_1.Get)('/written'),
    (0, swagger_1.ApiOperation)({ summary: 'View reviews you have written' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, review_query_dto_1.ReviewQueryDto]),
    __metadata("design:returntype", Promise)
], ProviderReviewsController.prototype, "listWritten", null);
__decorate([
    (0, common_1.Get)('/received'),
    (0, swagger_1.ApiOperation)({ summary: 'View reviews you have received' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, review_query_dto_1.ReviewQueryDto]),
    __metadata("design:returntype", Promise)
], ProviderReviewsController.prototype, "listReceived", null);
__decorate([
    (0, common_1.Get)('/summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get your rating summary' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderReviewsController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update your review (within edit window)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_review_dto_1.UpdateReviewDto]),
    __metadata("design:returntype", Promise)
], ProviderReviewsController.prototype, "updateReview", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete your review (soft delete, within edit window)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProviderReviewsController.prototype, "deleteReview", null);
exports.ProviderReviewsController = ProviderReviewsController = __decorate([
    (0, swagger_1.ApiTags)('Reviews (Provider)'),
    (0, common_1.Controller)('provider/reviews'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.PROVIDER),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ProviderReviewsController);
//# sourceMappingURL=provider-reviews.controller.js.map