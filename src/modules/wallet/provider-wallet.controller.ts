import { Controller, Get, Param, Query, ParseUUIDPipe } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { WalletService } from "./wallet.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "generated/prisma/client";
import { WalletTransactionQueryDto } from "./dtos/wallet-transaction-query.dto";

@ApiTags("Wallet (Provider)")
@Controller("provider/wallet")
@Roles(UserRole.PROVIDER)
export class ProviderWalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get("/")
  @ApiOperation({ summary: "View my wallet balance" })
  async getBalance(@GetUser("sub") userId: string) {
    const wallet = await this.walletService.ensureWallet(userId);
    return {
      walletId: wallet.id,
      type: wallet.type,
      status: wallet.status,
      balance: wallet.balance,
      heldBalance: wallet.heldBalance,
    };
  }

  @Get("/summary")
  @ApiOperation({ summary: "View my wallet summary" })
  async getSummary(@GetUser("sub") userId: string) {
    return this.walletService.getWalletSummary(userId);
  }

  @Get("/earnings")
  @ApiOperation({
    summary:
      "Earnings summary: available/held, lifetime & monthly earnings, commission paid, withdrawals",
  })
  async getEarnings(@GetUser("sub") userId: string) {
    return this.walletService.getEarningsSummary(userId);
  }

  @Get("/transactions")
  @ApiOperation({ summary: "View my transaction history (filterable)" })
  async listTransactions(
    @GetUser("sub") userId: string,
    @Query() query: WalletTransactionQueryDto,
  ) {
    return this.walletService.listTransactions(userId, query);
  }

  @Get("/transactions/:id")
  @ApiOperation({ summary: "View a single transaction" })
  async getTransaction(
    @GetUser("sub") userId: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.walletService.getTransaction(userId, id);
  }
}
