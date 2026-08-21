import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PaymentMode } from "generated/prisma/client";

/** The single row's id. There is only ever one. */
const SINGLETON_ID = "singleton";

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Reads the settings row, creating it with defaults the first time.
   *
   * Not cached: this is a single-row lookup by primary key, and a stale cache
   * here would keep charging customers under a mode the admin has already
   * turned off. On serverless each warm lambda would cache separately anyway,
   * so the mode would change for some requests and not others.
   */
  async get() {
    return this.prisma.platformSetting.upsert({
      where: { id: SINGLETON_ID },
      create: { id: SINGLETON_ID },
      update: {},
    });
  }

  async getPaymentMode(): Promise<PaymentMode> {
    const settings = await this.get();
    return settings.paymentMode;
  }

  async setPaymentMode(paymentMode: PaymentMode, updatedById?: string) {
    const updated = await this.prisma.platformSetting.upsert({
      where: { id: SINGLETON_ID },
      create: { id: SINGLETON_ID, paymentMode, updatedById },
      update: { paymentMode, updatedById },
    });

    this.logger.log({
      message: "Payment mode changed",
      paymentMode,
      updatedById,
    });

    return updated;
  }
}
