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
exports.CustomerWalletController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
const wallet_service_1 = require("./wallet.service");
const topups_service_1 = require("./topups.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("../../../generated/prisma/client");
const create_topup_dto_1 = require("./dtos/create-topup.dto");
const topup_query_dto_1 = require("./dtos/topup-query.dto");
const wallet_transaction_query_dto_1 = require("./dtos/wallet-transaction-query.dto");
let CustomerWalletController = class CustomerWalletController {
    walletService;
    topUpsService;
    constructor(walletService, topUpsService) {
        this.walletService = walletService;
        this.topUpsService = topUpsService;
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
    async listTransactions(userId, query) {
        return this.walletService.listTransactions(userId, query);
    }
    async getTransaction(userId, id) {
        return this.walletService.getTransaction(userId, id);
    }
    async submitTopUp(userId, dto, file) {
        return this.topUpsService.submitTopUp(userId, dto, file);
    }
    async listTopUps(userId, query) {
        return this.topUpsService.listMyTopUps(userId, query);
    }
    async getTopUp(userId, id) {
        return this.topUpsService.getMyTopUp(userId, id);
    }
};
exports.CustomerWalletController = CustomerWalletController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'View my wallet balance' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerWalletController.prototype, "getBalance", null);
__decorate([
    (0, common_1.Get)('/summary'),
    (0, swagger_1.ApiOperation)({ summary: 'View my wallet summary' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerWalletController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)('/transactions'),
    (0, swagger_1.ApiOperation)({
        summary: 'View my transaction history (filter by type/status/date)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, wallet_transaction_query_dto_1.WalletTransactionQueryDto]),
    __metadata("design:returntype", Promise)
], CustomerWalletController.prototype, "listTransactions", null);
__decorate([
    (0, common_1.Get)('/transactions/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View a single transaction' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomerWalletController.prototype, "getTransaction", null);
__decorate([
    (0, common_1.Post)('/topups'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                amount: { type: 'number' },
                paymentMethod: {
                    type: 'string',
                    enum: ['JAZZCASH', 'EASYPAISA', 'BANK_TRANSFER', 'CASH', 'OTHER'],
                },
                transactionReference: { type: 'string' },
                notes: { type: 'string' },
                file: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Submit a manual top-up request (balance changes on approval)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
            new common_1.FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp|gif|pdf)$/,
            }),
        ],
        fileIsRequired: false,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_topup_dto_1.CreateTopUpDto, Object]),
    __metadata("design:returntype", Promise)
], CustomerWalletController.prototype, "submitTopUp", null);
__decorate([
    (0, common_1.Get)('/topups'),
    (0, swagger_1.ApiOperation)({ summary: 'View my top-up request history' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, topup_query_dto_1.TopUpQueryDto]),
    __metadata("design:returntype", Promise)
], CustomerWalletController.prototype, "listTopUps", null);
__decorate([
    (0, common_1.Get)('/topups/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View a top-up request' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomerWalletController.prototype, "getTopUp", null);
exports.CustomerWalletController = CustomerWalletController = __decorate([
    (0, swagger_1.ApiTags)('Wallet (Customer)'),
    (0, common_1.Controller)('wallet'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.CUSTOMER),
    __metadata("design:paramtypes", [wallet_service_1.WalletService,
        topups_service_1.TopUpsService])
], CustomerWalletController);
//# sourceMappingURL=customer-wallet.controller.js.map