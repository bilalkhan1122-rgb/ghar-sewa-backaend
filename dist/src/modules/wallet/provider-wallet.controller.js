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
exports.ProviderWalletController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const wallet_service_1 = require("./wallet.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("../../../generated/prisma/client");
const wallet_transaction_query_dto_1 = require("./dtos/wallet-transaction-query.dto");
let ProviderWalletController = class ProviderWalletController {
    walletService;
    constructor(walletService) {
        this.walletService = walletService;
    }
    async getBalance(userId) {
        const wallet = await this.walletService.ensureWallet(userId);
        return {
            walletId: wallet.id,
            type: wallet.type,
            status: wallet.status,
            balance: wallet.balance,
            heldBalance: wallet.heldBalance,
        };
    }
    async getSummary(userId) {
        return this.walletService.getWalletSummary(userId);
    }
    async getEarnings(userId) {
        return this.walletService.getEarningsSummary(userId);
    }
    async listTransactions(userId, query) {
        return this.walletService.listTransactions(userId, query);
    }
    async getTransaction(userId, id) {
        return this.walletService.getTransaction(userId, id);
    }
};
exports.ProviderWalletController = ProviderWalletController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'View my wallet balance' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderWalletController.prototype, "getBalance", null);
__decorate([
    (0, common_1.Get)('/summary'),
    (0, swagger_1.ApiOperation)({ summary: 'View my wallet summary' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderWalletController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)('/earnings'),
    (0, swagger_1.ApiOperation)({
        summary: 'Earnings summary: available/held, lifetime & monthly earnings, commission paid, withdrawals',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderWalletController.prototype, "getEarnings", null);
__decorate([
    (0, common_1.Get)('/transactions'),
    (0, swagger_1.ApiOperation)({ summary: 'View my transaction history (filterable)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, wallet_transaction_query_dto_1.WalletTransactionQueryDto]),
    __metadata("design:returntype", Promise)
], ProviderWalletController.prototype, "listTransactions", null);
__decorate([
    (0, common_1.Get)('/transactions/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View a single transaction' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProviderWalletController.prototype, "getTransaction", null);
exports.ProviderWalletController = ProviderWalletController = __decorate([
    (0, swagger_1.ApiTags)('Wallet (Provider)'),
    (0, common_1.Controller)('provider/wallet'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.PROVIDER),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], ProviderWalletController);
//# sourceMappingURL=provider-wallet.controller.js.map