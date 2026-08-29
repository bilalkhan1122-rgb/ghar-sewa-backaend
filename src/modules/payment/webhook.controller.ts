import {
  Controller,
  Post,
  Param,
  Req,
  Logger,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { Request } from "express";
import { PaymentService } from "./payment.service";
import { PaymentGatewayType } from "generated/prisma/client";

/**
 * Module 16 — Payment Webhook Controller.
 *
 * Public endpoints (no auth) that receive gateway callbacks. Security comes
 * from the gateway's own signature validation inside each gateway's
 * parseWebhook method, not from JWT auth.
 *
 * The handler must return 200 quickly to avoid gateway retries, then
 * process the payment asynchronously.
 */
@ApiTags("Payments (Webhooks)")
@Controller("payments/webhook")
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(private readonly paymentService: PaymentService) {}

  @Post(":gateway")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Gateway webhook/callback endpoint" })
  async handleWebhook(@Param("gateway") gateway: string, @Req() req: Request) {
    const gatewayType = gateway.toUpperCase() as PaymentGatewayType;

    if (!Object.values(PaymentGatewayType).includes(gatewayType)) {
      this.logger.warn({ gateway }, "Unknown gateway in webhook");
      return { received: false, reason: "unknown_gateway" };
    }

    // Extract headers for signature validation
    const headers: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === "string") {
        headers[key.toLowerCase()] = value;
      }
    }

    try {
      const result = await this.paymentService.processWebhook(
        gatewayType,
        headers,
        req.body,
      );
      return { received: true, ...result };
    } catch (err) {
      const error = err as { message?: string; status?: number };
      this.logger.error(
        { err: error, gateway: gatewayType },
        "Webhook processing failed",
      );
      // Still return 200 to prevent gateway retries for our internal errors
      // Only return error for truly malformed requests
      if (error.status === 400) {
        return { received: false, reason: error.message };
      }
      return { received: true, reason: "internal_error" };
    }
  }
}
