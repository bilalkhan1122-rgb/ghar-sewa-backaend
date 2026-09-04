import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseUUIDPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from "@nestjs/swagger";
import { WalletService } from "./wallet.service";
import { TopUpsService } from "./topups.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole, WalletType } from "generated/prisma/client";
import { CreateTopUpDto } from "./dtos/create-topup.dto";
import { TopUpQueryDto } from "./dtos/topup-query.dto";
import { WalletTransactionQueryDto } from "./dtos/wallet-transaction-query.dto";
import { SettleDuesDto } from "./dtos/settle-dues.dto";
import { PaymentAccountsService } from "./payment-accounts.service";
import { SettingsService } from "../settings/settings.service";

@ApiTags("Wallet (Customer)")
@Controller("wallet")
@Roles(UserRole.CUSTOMER)
export class CustomerWalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly topUpsService: TopUpsService,
    private readonly paymentAccounts: PaymentAccountsService,
    private readonly settings: SettingsService,
  ) {}

  @Get("/payment-accounts")
  @ApiOperation({
    summary: "Where to transfer money before submitting a top-up request",
  })
  async paymentAccountsList() {
    return this.paymentAccounts.listActive();
  }

  @Get("/")
  @ApiOperation({ summary: "View my wallet balance" })
  async getBalance(@GetUser("sub") userId: string) {
    const wallet = await this.walletService.ensureWallet(
      userId,
      WalletType.CUSTOMER,
    );
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
    return this.walletService.getWalletSummary(userId, WalletType.CUSTOMER);
  }

  @Get("/dues")
  @ApiOperation({
    summary: "Payment mode and anything I still owe for completed jobs",
  })
  async getDues(@GetUser("sub") userId: string) {
    const [paymentMode, dues] = await Promise.all([
      this.settings.getPaymentMode(),
      this.walletService.outstandingDues(userId),
    ]);

    return {
      paymentMode,
      total: dues.total,
      count: dues.count,
      bookings: dues.bookings,
    };
  }

  @Post("/dues/settle")
  @ApiOperation({
    summary: "Pay an outstanding job from the balance I already have",
  })
  async settleDues(@GetUser("sub") userId: string, @Body() dto: SettleDuesDto) {
    return this.walletService.settleDues(userId, dto.bookingId);
  }

  @Get("/transactions")
  @ApiOperation({
    summary: "View my transaction history (filter by type/status/date)",
  })
  async listTransactions(
    @GetUser("sub") userId: string,
    @Query() query: WalletTransactionQueryDto,
  ) {
    return this.walletService.listTransactions(
      userId,
      WalletType.CUSTOMER,
      query,
    );
  }

  @Get("/transactions/:id")
  @ApiOperation({ summary: "View a single transaction" })
  async getTransaction(
    @GetUser("sub") userId: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.walletService.getTransaction(userId, WalletType.CUSTOMER, id);
  }

  @Post("/topups")
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        amount: { type: "number" },
        paymentMethod: {
          type: "string",
          enum: ["JAZZCASH", "EASYPAISA", "BANK_TRANSFER", "CASH", "OTHER"],
        },
        transactionReference: { type: "string" },
        notes: { type: "string" },
        file: { type: "string", format: "binary" },
      },
    },
  })
  @ApiOperation({
    summary: "Submit a manual top-up request (balance changes on approval)",
  })
  async submitTopUp(
    @GetUser("sub") userId: string,
    @Body() dto: CreateTopUpDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif|pdf)$/,
            fallbackToMimetype: true,
          }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.topUpsService.submitTopUp(userId, dto, file);
  }

  @Get("/topups")
  @ApiOperation({ summary: "View my top-up request history" })
  async listTopUps(
    @GetUser("sub") userId: string,
    @Query() query: TopUpQueryDto,
  ) {
    return this.topUpsService.listMyTopUps(userId, query);
  }

  @Get("/topups/:id")
  @ApiOperation({ summary: "View a top-up request" })
  async getTopUp(
    @GetUser("sub") userId: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.topUpsService.getMyTopUp(userId, id);
  }
}
