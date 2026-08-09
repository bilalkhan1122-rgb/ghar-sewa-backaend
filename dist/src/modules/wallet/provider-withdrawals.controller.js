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
exports.ProviderWithdrawalsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const withdrawals_service_1 = require("./withdrawals.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("../../../generated/prisma/client");
const create_withdrawal_dto_1 = require("./dtos/create-withdrawal.dto");
const withdrawal_query_dto_1 = require("./dtos/withdrawal-query.dto");
let ProviderWithdrawalsController = class ProviderWithdrawalsController {
    withdrawalsService;
    constructor(withdrawalsService) {
        this.withdrawalsService = withdrawalsService;
    }
    async submit(userId, dto) {
        return this.withdrawalsService.submitWithdrawal(userId, dto);
    }
    async list(userId, query) {
        return this.withdrawalsService.listMyWithdrawals(userId, query);
    }
    async get(userId, id) {
        return this.withdrawalsService.getMyWithdrawal(userId, id);
    }
    async cancel(userId, id) {
        return this.withdrawalsService.cancelWithdrawal(userId, id);
    }
};
exports.ProviderWithdrawalsController = ProviderWithdrawalsController;
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiOperation)({
        summary: 'Submit a withdrawal request (amount moves to held balance immediately)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_withdrawal_dto_1.CreateWithdrawalDto]),
    __metadata("design:returntype", Promise)
], ProviderWithdrawalsController.prototype, "submit", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'View my withdrawal history' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, withdrawal_query_dto_1.WithdrawalQueryDto]),
    __metadata("design:returntype", Promise)
], ProviderWithdrawalsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View a withdrawal request' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProviderWithdrawalsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('/:id/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a pending withdrawal (funds released)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProviderWithdrawalsController.prototype, "cancel", null);
exports.ProviderWithdrawalsController = ProviderWithdrawalsController = __decorate([
    (0, swagger_1.ApiTags)('Withdrawals (Provider)'),
    (0, common_1.Controller)('provider/withdrawals'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.PROVIDER),
    __metadata("design:paramtypes", [withdrawals_service_1.WithdrawalsService])
], ProviderWithdrawalsController);
//# sourceMappingURL=provider-withdrawals.controller.js.map