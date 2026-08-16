import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PaymentAccountsService } from "./payment-accounts.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { Permissions } from "src/common/decorators/permissions.decorator";
import { UserRole } from "generated/prisma/client";
import {
  CreateCompanyPaymentAccountDto,
  UpdateCompanyPaymentAccountDto,
} from "./dtos/company-payment-account.dto";

/** Manages the accounts customers are told to transfer to. */
@ApiTags("Wallet (Admin) — payment accounts")
@Controller("admin/wallet/payment-accounts")
@Roles(UserRole.ADMIN)
@Permissions("wallet.view")
export class AdminPaymentAccountsController {
  constructor(private readonly paymentAccounts: PaymentAccountsService) {}

  @Get("/")
  @ApiOperation({ summary: "List every account, active or not" })
  async list() {
    return this.paymentAccounts.adminList();
  }

  @Post("/")
  @Permissions("wallet.topups")
  @ApiOperation({ summary: "Add an account customers can transfer to" })
  async create(@Body() dto: CreateCompanyPaymentAccountDto) {
    return this.paymentAccounts.create(dto);
  }

  @Patch("/:id")
  @Permissions("wallet.topups")
  @ApiOperation({ summary: "Edit an account" })
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateCompanyPaymentAccountDto,
  ) {
    return this.paymentAccounts.update(id, dto);
  }

  @Delete("/:id")
  @Permissions("wallet.topups")
  @ApiOperation({ summary: "Remove an account" })
  async remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.paymentAccounts.remove(id);
  }
}
