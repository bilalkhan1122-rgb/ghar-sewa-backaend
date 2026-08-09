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
exports.AdminWalletController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const wallet_service_1 = require("./wallet.service");
const topups_service_1 = require("./topups.service");
const withdrawals_service_1 = require("./withdrawals.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const client_1 = require("../../../generated/prisma/client");
const wallet_query_dto_1 = require("./dtos/wallet-query.dto");
const wallet_transaction_query_dto_1 = require("./dtos/wallet-transaction-query.dto");
const topup_query_dto_1 = require("./dtos/topup-query.dto");
const withdrawal_query_dto_1 = require("./dtos/withdrawal-query.dto");
const review_topup_dto_1 = require("./dtos/review-topup.dto");
const review_withdrawal_dto_1 = require("./dtos/review-withdrawal.dto");
const adjust_wallet_dto_1 = require("./dtos/adjust-wallet.dto");
const freeze_wallet_dto_1 = require("./dtos/freeze-wallet.dto");
let AdminWalletController = class AdminWalletController {
    walletService;
    topUpsService;
    withdrawalsService;
    constructor(walletService, topUpsService, withdrawalsService) {
        this.walletService = walletService;
        this.topUpsService = topUpsService;
        this.withdrawalsService = withdrawalsService;
    }
    async listWallets(query) {
        return this.walletService.adminListWallets(query);
    }
    async listTransactions(query) {
        return this.walletService.adminListTransactions(query);
    }
    async getWalletByUser(userId) {
        return this.walletService.adminGetWalletByUserId(userId);
    }
    async adjustWallet(adminId, userId, dto) {
        return this.walletService.adjustWallet(adminId, userId, dto);
    }
    async freezeWallet(adminId, userId, dto) {
        return this.walletService.freezeWallet(adminId, userId, dto.reason);
    }
    async unfreezeWallet(adminId, userId, dto) {
        return this.walletService.unfreezeWallet(adminId, userId, dto.reason);
    }
    async listTopUps(query) {
        return this.topUpsService.adminListTopUps(query);
    }
    async getTopUp(id) {
        return this.topUpsService.adminGetTopUp(id);
    }
    async approveTopUp(adminId, id, dto) {
        return this.topUpsService.adminApproveTopUp(adminId, id, dto.note);
    }
    async rejectTopUp(adminId, id, dto) {
        return this.topUpsService.adminRejectTopUp(adminId, id, dto.reason);
    }
    async listWithdrawals(query) {
        return this.withdrawalsService.adminListWithdrawals(query);
    }
    async getWithdrawal(id) {
        return this.withdrawalsService.adminGetWithdrawal(id);
    }
    async approveWithdrawal(adminId, id, dto) {
        return this.withdrawalsService.adminApproveWithdrawal(adminId, id, dto.note);
    }
    async markProcessing(adminId, id, dto) {
        return this.withdrawalsService.adminMarkProcessing(adminId, id, dto.note);
    }
    async completeWithdrawal(adminId, id, dto) {
        return this.withdrawalsService.adminCompleteWithdrawal(adminId, id, dto.note);
    }
    async rejectWithdrawal(adminId, id, dto) {
        return this.withdrawalsService.adminRejectWithdrawal(adminId, id, dto.reason);
    }
};
exports.AdminWalletController = AdminWalletController;
__decorate([
    (0, common_1.Get)('/wallets'),
    (0, swagger_1.ApiOperation)({ summary: 'View all wallets (filter by type/status)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wallet_query_dto_1.WalletQueryDto]),
    __metadata("design:returntype", Promise)
], AdminWalletController.prototype, "listWallets", null);
__decorate([
    (0, common_1.Get)('/transactions'),
    (0, swagger_1.ApiOperation)({
        summary: 'View all wallet activity / transactions (filterable)',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wallet_transaction_query_dto_1.WalletTransactionQueryDto]),
    __metadata("design:returntype", Promise)
], AdminWalletController.prototype, "listTransactions", null);
__decorate([
    (0, common_1.Get)('/users/:userId'),
    (0, swagger_1.ApiOperation)({ summary: "View a user's wallet" }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminWalletController.prototype, "getWalletByUser", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('wallet.adjust'),
    (0, common_1.Post)('/users/:userId/adjust'),
    (0, swagger_1.ApiOperation)({
        summary: 'Manually adjust a wallet balance (ADJUSTMENT ledger entry + audit)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, adjust_wallet_dto_1.AdjustWalletDto]),
    __metadata("design:returntype", Promise)
], AdminWalletController.prototype, "adjustWallet", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('wallet.freeze'),
    (0, common_1.Post)('/users/:userId/freeze'),
    (0, swagger_1.ApiOperation)({
        summary: 'Freeze a wallet (blocks all wallet operations)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, freeze_wallet_dto_1.FreezeWalletDto]),
    __metadata("design:returntype", Promise)
], AdminWalletController.prototype, "freezeWallet", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('wallet.freeze'),
    (0, common_1.Post)('/users/:userId/unfreeze'),
    (0, swagger_1.ApiOperation)({ summary: 'Unfreeze a wallet' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, freeze_wallet_dto_1.UnfreezeWalletDto]),
    __metadata("design:returntype", Promise)
], AdminWalletController.prototype, "unfreezeWallet", null);
__decorate([
    (0, common_1.Get)('/topups'),
    (0, swagger_1.ApiOperation)({ summary: 'View top-up requests (filter by status)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [topup_query_dto_1.TopUpQueryDto]),
    __metadata("design:returntype", Promise)
], AdminWalletController.prototype, "listTopUps", null);
__decorate([
    (0, common_1.Get)('/topups/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View a top-up request' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminWalletController.prototype, "getTopUp", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('wallet.topups'),
    (0, common_1.Post)('/topups/:id/approve'),
    (0, swagger_1.ApiOperation)({
        summary: 'Approve a top-up (credits the customer wallet atomically)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, review_topup_dto_1.ApproveTopUpDto]),
    __metadata("design:returntype", Promise)
], AdminWalletController.prototype, "approveTopUp", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('wallet.topups'),
    (0, common_1.Post)('/topups/:id/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject a top-up (mandatory reason)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, review_topup_dto_1.RejectTopUpDto]),
    __metadata("design:returntype", Promise)
], AdminWalletController.prototype, "rejectTopUp", null);
__decorate([
    (0, common_1.Get)('/withdrawals'),
    (0, swagger_1.ApiOperation)({ summary: 'View withdrawal requests (filter by status)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withdrawal_query_dto_1.WithdrawalQueryDto]),
    __metadata("design:returntype", Promise)
], AdminWalletController.prototype, "listWithdrawals", null);
__decorate([
    (0, common_1.Get)('/withdrawals/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View a withdrawal request' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminWalletController.prototype, "getWithdrawal", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('wallet.withdrawals'),
    (0, common_1.Post)('/withdrawals/:id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a withdrawal (funds stay held)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, review_withdrawal_dto_1.ReviewWithdrawalDto]),
    __metadata("design:returntype", Promise)
], AdminWalletController.prototype, "approveWithdrawal", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('wallet.withdrawals'),
    (0, common_1.Post)('/withdrawals/:id/process'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark a withdrawal as processing' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, review_withdrawal_dto_1.ReviewWithdrawalDto]),
    __metadata("design:returntype", Promise)
], AdminWalletController.prototype, "markProcessing", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('wallet.withdrawals'),
    (0, common_1.Post)('/withdrawals/:id/complete'),
    (0, swagger_1.ApiOperation)({
        summary: 'Mark a withdrawal completed (settles held balance)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, review_withdrawal_dto_1.ReviewWithdrawalDto]),
    __metadata("design:returntype", Promise)
], AdminWalletController.prototype, "completeWithdrawal", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('wallet.withdrawals'),
    (0, common_1.Post)('/withdrawals/:id/reject'),
    (0, swagger_1.ApiOperation)({
        summary: 'Reject a withdrawal (releases held funds back to available)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, review_withdrawal_dto_1.RejectWithdrawalDto]),
    __metadata("design:returntype", Promise)
], AdminWalletController.prototype, "rejectWithdrawal", null);
exports.AdminWalletController = AdminWalletController = __decorate([
    (0, swagger_1.ApiTags)('Wallet (Admin)'),
    (0, common_1.Controller)('admin/wallet'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [wallet_service_1.WalletService,
        topups_service_1.TopUpsService,
        withdrawals_service_1.WithdrawalsService])
], AdminWalletController);
//# sourceMappingURL=admin-wallet.controller.js.map