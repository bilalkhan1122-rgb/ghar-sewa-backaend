import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { WalletService } from "./wallet.service";
import { TopUpsService } from "./topups.service";
import { WithdrawalsService } from "./withdrawals.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { Permissions } from "src/common/decorators/permissions.decorator";
import { UserRole } from "generated/prisma/client";
import { WalletQueryDto } from "./dtos/wallet-query.dto";
import { WalletTransactionQueryDto } from "./dtos/wallet-transaction-query.dto";
import { TopUpQueryDto } from "./dtos/topup-query.dto";
import { WithdrawalQueryDto } from "./dtos/withdrawal-query.dto";
import { ApproveTopUpDto, RejectTopUpDto } from "./dtos/review-topup.dto";
import {
  ReviewWithdrawalDto,
  RejectWithdrawalDto,
} from "./dtos/review-withdrawal.dto";
import { AdjustWalletDto } from "./dtos/adjust-wallet.dto";
import { FreezeWalletDto, UnfreezeWalletDto } from "./dtos/freeze-wallet.dto";

@ApiTags("Wallet (Admin)")
@Controller("admin/wallet")
@Roles(UserRole.ADMIN)
@Permissions("wallet.view")
export class AdminWalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly topUpsService: TopUpsService,
    private readonly withdrawalsService: WithdrawalsService,
  ) {}

  // ─── Wallets & transactions ──────────────────────────────────────────

  @Get("/wallets")
  @ApiOperation({ summary: "View all wallets (filter by type/status)" })
  async listWallets(@Query() query: WalletQueryDto) {
    return this.walletService.adminListWallets(query);
  }

  @Get("/transactions")
  @ApiOperation({
    summary: "View all wallet activity / transactions (filterable)",
  })
  async listTransactions(@Query() query: WalletTransactionQueryDto) {
    return this.walletService.adminListTransactions(query);
  }

  @Get("/users/:userId")
  @ApiOperation({ summary: "View a user's wallet" })
  async getWalletByUser(@Param("userId", ParseUUIDPipe) userId: string) {
    return this.walletService.adminGetWalletByUserId(userId);
  }

  @Permissions("wallet.adjust")
  @Post("/users/:userId/adjust")
  @ApiOperation({
    summary:
      "Manually adjust a wallet balance (ADJUSTMENT ledger entry + audit)",
  })
  async adjustWallet(
    @GetUser("sub") adminId: string,
    @Param("userId", ParseUUIDPipe) userId: string,
    @Body() dto: AdjustWalletDto,
  ) {
    return this.walletService.adjustWallet(adminId, userId, dto);
  }

  @Permissions("wallet.freeze")
  @Post("/users/:userId/freeze")
  @ApiOperation({
    summary: "Freeze a wallet (blocks all wallet operations)",
  })
  async freezeWallet(
    @GetUser("sub") adminId: string,
    @Param("userId", ParseUUIDPipe) userId: string,
    @Body() dto: FreezeWalletDto,
  ) {
    return this.walletService.freezeWallet(adminId, userId, dto.reason);
  }

  @Permissions("wallet.freeze")
  @Post("/users/:userId/unfreeze")
  @ApiOperation({ summary: "Unfreeze a wallet" })
  async unfreezeWallet(
    @GetUser("sub") adminId: string,
    @Param("userId", ParseUUIDPipe) userId: string,
    @Body() dto: UnfreezeWalletDto,
  ) {
    return this.walletService.unfreezeWallet(adminId, userId, dto.reason);
  }

  // ─── Top-up management ───────────────────────────────────────────────

  @Get("/topups")
  @ApiOperation({ summary: "View top-up requests (filter by status)" })
  async listTopUps(@Query() query: TopUpQueryDto) {
    return this.topUpsService.adminListTopUps(query);
  }

  @Get("/topups/:id")
  @ApiOperation({ summary: "View a top-up request" })
  async getTopUp(@Param("id", ParseUUIDPipe) id: string) {
    return this.topUpsService.adminGetTopUp(id);
  }

  @Permissions("wallet.topups")
  @Post("/topups/:id/approve")
  @ApiOperation({
    summary: "Approve a top-up (credits the customer wallet atomically)",
  })
  async approveTopUp(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: ApproveTopUpDto,
  ) {
    return this.topUpsService.adminApproveTopUp(adminId, id, dto.note);
  }

  @Permissions("wallet.topups")
  @Post("/topups/:id/reject")
  @ApiOperation({ summary: "Reject a top-up (mandatory reason)" })
  async rejectTopUp(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: RejectTopUpDto,
  ) {
    return this.topUpsService.adminRejectTopUp(adminId, id, dto.reason);
  }

  // ─── Withdrawal management ───────────────────────────────────────────

  @Get("/withdrawals")
  @ApiOperation({ summary: "View withdrawal requests (filter by status)" })
  async listWithdrawals(@Query() query: WithdrawalQueryDto) {
    return this.withdrawalsService.adminListWithdrawals(query);
  }

  @Get("/withdrawals/:id")
  @ApiOperation({ summary: "View a withdrawal request" })
  async getWithdrawal(@Param("id", ParseUUIDPipe) id: string) {
    return this.withdrawalsService.adminGetWithdrawal(id);
  }

  @Permissions("wallet.withdrawals")
  @Post("/withdrawals/:id/approve")
  @ApiOperation({ summary: "Approve a withdrawal (funds stay held)" })
  async approveWithdrawal(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: ReviewWithdrawalDto,
  ) {
    return this.withdrawalsService.adminApproveWithdrawal(
      adminId,
      id,
      dto.note,
    );
  }

  @Permissions("wallet.withdrawals")
  @Post("/withdrawals/:id/process")
  @ApiOperation({ summary: "Mark a withdrawal as processing" })
  async markProcessing(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: ReviewWithdrawalDto,
  ) {
    return this.withdrawalsService.adminMarkProcessing(adminId, id, dto.note);
  }

  @Permissions("wallet.withdrawals")
  @Post("/withdrawals/:id/complete")
  @ApiOperation({
    summary: "Mark a withdrawal completed (settles held balance)",
  })
  async completeWithdrawal(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: ReviewWithdrawalDto,
  ) {
    return this.withdrawalsService.adminCompleteWithdrawal(
      adminId,
      id,
      dto.note,
    );
  }

  @Permissions("wallet.withdrawals")
  @Post("/withdrawals/:id/reject")
  @ApiOperation({
    summary: "Reject a withdrawal (releases held funds back to available)",
  })
  async rejectWithdrawal(
    @GetUser("sub") adminId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: RejectWithdrawalDto,
  ) {
    return this.withdrawalsService.adminRejectWithdrawal(
      adminId,
      id,
      dto.reason,
    );
  }
}
