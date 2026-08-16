import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import {
  CreateCompanyPaymentAccountDto,
  UpdateCompanyPaymentAccountDto,
} from "./dtos/company-payment-account.dto";

/**
 * The company's own receiving accounts, shown to customers on Add Money.
 *
 * Kept in the database and editable from the dashboard: these numbers change,
 * and a stale one sends real money to the wrong place.
 */
@Injectable()
export class PaymentAccountsService {
  constructor(private readonly prisma: PrismaService) {}

  /** What a customer sees — active accounts only, in display order. */
  listActive() {
    return this.prisma.companyPaymentAccount.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        method: true,
        accountName: true,
        accountNumber: true,
        bankName: true,
        instructions: true,
      },
    });
  }

  adminList() {
    return this.prisma.companyPaymentAccount.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    });
  }

  create(dto: CreateCompanyPaymentAccountDto) {
    return this.prisma.companyPaymentAccount.create({ data: dto });
  }

  async update(id: string, dto: UpdateCompanyPaymentAccountDto) {
    await this.getOrThrow(id);
    return this.prisma.companyPaymentAccount.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.getOrThrow(id);
    await this.prisma.companyPaymentAccount.delete({ where: { id } });
    return { message: "Payment account removed", id };
  }

  private async getOrThrow(id: string) {
    const account = await this.prisma.companyPaymentAccount.findUnique({
      where: { id },
    });
    if (!account) {
      throw new NotFoundException("Payment account not found");
    }
    return account;
  }
}
