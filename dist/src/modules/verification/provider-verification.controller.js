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
exports.ProviderVerificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const verification_service_1 = require("./verification.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("../../../generated/prisma/client");
const verification_query_dto_1 = require("./dtos/verification-query.dto");
let ProviderVerificationController = class ProviderVerificationController {
    verificationService;
    constructor(verificationService) {
        this.verificationService = verificationService;
    }
    async submit(userId) {
        return this.verificationService.submit(userId);
    }
    async getStatus(userId) {
        return this.verificationService.getStatus(userId);
    }
    async getHistory(userId, query) {
        return this.verificationService.getHistory(userId, query);
    }
};
exports.ProviderVerificationController = ProviderVerificationController;
__decorate([
    (0, common_1.Post)('/submit'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit (or resubmit) my profile for verification' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderVerificationController.prototype, "submit", null);
__decorate([
    (0, common_1.Get)('/status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get my current verification status and latest request',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderVerificationController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Get)('/history'),
    (0, swagger_1.ApiOperation)({ summary: 'View my verification history (paginated)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, verification_query_dto_1.VerificationQueryDto]),
    __metadata("design:returntype", Promise)
], ProviderVerificationController.prototype, "getHistory", null);
exports.ProviderVerificationController = ProviderVerificationController = __decorate([
    (0, swagger_1.ApiTags)('Verification (Provider)'),
    (0, common_1.Controller)('verification'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.PROVIDER),
    __metadata("design:paramtypes", [verification_service_1.VerificationService])
], ProviderVerificationController);
//# sourceMappingURL=provider-verification.controller.js.map