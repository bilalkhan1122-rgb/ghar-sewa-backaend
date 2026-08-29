import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CustomerPaymentController } from "./customer-payment.controller";
import { AdminPaymentController } from "./admin-payment.controller";
import { WebhookController } from "./webhook.controller";
import { PaymentGatewayRegistry } from "./gateways/payment-gateway.registry";
import { JazzCashGateway } from "./gateways/jazzcash.gateway";
import { EasypaisaGateway } from "./gateways/easypaisa.gateway";
import { CardGateway } from "./gateways/card.gateway";
import { PrismaModule } from "src/prisma/prisma.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { RealtimeModule } from "../realtime/realtime.module";
import { WalletModule } from "../wallet/wallet.module";

/**
 * Module 16 — Payment Gateway Integration.
 *
 * Provides a clean payment gateway abstraction with implementations for
 * JazzCash, Easypaisa, and Card/Bank transfers. The Wallet remains the
 * source of truth for user balances.
 *
 * Routes:
 *   POST   /api/v1/payments              — Create payment (customer)
 *   GET    /api/v1/payments              — List payments (customer)
 *   GET    /api/v1/payments/:id          — Get payment (customer)
 *   POST   /api/v1/payments/:id/verify   — Verify payment (customer)
 *   POST   /api/v1/payments/webhook/:gw  — Gateway webhook (public)
 *   GET    /api/v1/admin/payments        — List all (admin)
 *   GET    /api/v1/admin/payments/failed  — List failed (admin)
 *   GET    /api/v1/admin/payments/:id    — Get payment (admin)
 *   POST   /api/v1/admin/payments/:id/retry — Retry payment (admin)
 */
@Module({
  imports: [PrismaModule, NotificationsModule, RealtimeModule, WalletModule],
  controllers: [
    CustomerPaymentController,
    AdminPaymentController,
    WebhookController,
  ],
  providers: [
    PaymentService,
    PaymentGatewayRegistry,
    JazzCashGateway,
    EasypaisaGateway,
    CardGateway,
  ],
  exports: [PaymentService],
})
export class PaymentModule {
  constructor(
    private readonly registry: PaymentGatewayRegistry,
    private readonly jazzcash: JazzCashGateway,
    private readonly easypaisa: EasypaisaGateway,
    private readonly card: CardGateway,
  ) {
    // Register all gateways in the registry
    this.registry.register(this.jazzcash);
    this.registry.register(this.easypaisa);
    this.registry.register(this.card);
  }
}
