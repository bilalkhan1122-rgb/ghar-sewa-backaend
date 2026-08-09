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
exports.PublicReviewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reviews_service_1 = require("./reviews.service");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const review_query_dto_1 = require("./dtos/review-query.dto");
let PublicReviewsController = class PublicReviewsController {
    reviewsService;
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    async getProviderReviews(providerId, query) {
        return this.reviewsService.getProviderPublicReviews(providerId, query);
    }
};
exports.PublicReviewsController = PublicReviewsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/providers/:providerId/reviews'),
    (0, swagger_1.ApiOperation)({
        summary: 'Public provider reviews: average rating, distribution, paginated list (approved only)',
    }),
    __param(0, (0, common_1.Param)('providerId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, review_query_dto_1.ReviewQueryDto]),
    __metadata("design:returntype", Promise)
], PublicReviewsController.prototype, "getProviderReviews", null);
exports.PublicReviewsController = PublicReviewsController = __decorate([
    (0, swagger_1.ApiTags)('Reviews (Public)'),
    (0, common_1.Controller)('public'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], PublicReviewsController);
//# sourceMappingURL=public-reviews.controller.js.map