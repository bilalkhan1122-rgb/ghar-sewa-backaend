import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PaymentGatewayType, PaymentMethod } from "generated/prisma/client";
import {
  PaymentGateway,
  GatewayPaymentResult,
  GatewayVerificationResult,
  GatewayWebhookPayload,
} from "./payment-gateway.interface";
import * as crypto from "crypto";

/**
 * Module 16 — Card / Bank Transfer Payment Gateway Integration.
 *
 * Handles credit/debit card payments and bank transfers. In production,
 * integrate with a card processor (e.g., Stripe, Paystack, or a local
 * PK gateway like HBL/Fayda). The abstraction keeps the core app decoupled.
 *
 * Env vars: CARD_GATEWAY_MERCHANT_ID, CARD_GATEWAY_SECRET_KEY,
 *   CARD_GATEWAY_RETURN_URL, CARD_GATEWAY_BASE_URL, CARD_GATEWAY_WEBHOOK_SECRET
 */
@Injectable()
export class CardGateway implements PaymentGateway {
  private readonly logger = new Logger(CardGateway.name);

  readonly gatewayType = PaymentGatewayType.CARD;
  readonly supportedMethods = [PaymentMethod.CARD, PaymentMethod.BANK_TRANSFER];

  private readonly merchantId: string;
  private readonly secretKey: string;
  private readonly returnUrl: string;
  private readonly baseUrl: string;
  private readonly webhookSecret: string;

  constructor(private readonly config: ConfigService) {
    this.merchantId = this.config.get("CARD_GATEWAY_MERCHANT_ID", "");
    this.secretKey = this.config.get("CARD_GATEWAY_SECRET_KEY", "");
    this.returnUrl = this.config.get("CARD_GATEWAY_RETURN_URL", "");
    this.baseUrl = this.config.get(
      "CARD_GATEWAY_BASE_URL",
      "https://sandbox.cardgateway.example.com",
    );
    this.webhookSecret = this.config.get("CARD_GATEWAY_WEBHOOK_SECRET", "");
  }

  private get isConfigured(): boolean {
    return !!(this.merchantId && this.secretKey && this.webhookSecret);
  }

  async createPayment(params: {
    amount: number;
    currency?: string;
    reference: string;
    metadata?: Record<string, unknown>;
    callbackUrl?: string;
  }): Promise<GatewayPaymentResult> {
    if (!this.isConfigured) {
      this.logger.warn("Card gateway not configured — returning sandbox stub");
      return this.sandboxCreatePayment(params);
    }

    const amountInPaisa = Math.round(params.amount * 100);

    const payload = {
      merchantId: this.merchantId,
      amount: amountInPaisa,
      currency: params.currency || "PKR",
      reference: params.reference,
      returnUrl: params.callbackUrl || this.returnUrl,
      description:
        (params.metadata?.description as string) ||
        `Payment ${params.reference}`,
      customerName: (params.metadata?.name as string) || "",
      customerEmail: (params.metadata?.email as string) || "",
      customerPhone: (params.metadata?.phone as string) || "",
    };

    const signature = this.generateSignature(payload);

    try {
      const response = await fetch(`${this.baseUrl}/api/v1/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.secretKey}`,
          "X-Signature": signature,
        },
        body: JSON.stringify({ ...payload, signature }),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: Record<string, unknown> = await response.json();

      return {
        gatewayTransactionId:
          (data.transactionId as string) || params.reference,
        gatewayReference: params.reference,
        checkoutUrl: data.checkoutUrl as string | undefined,
        clientPayload: {
          clientSecret: data.clientSecret,
          publishableKey: data.publishableKey,
        },
        message: (data.message as string) || "Payment initiated",
      };
    } catch (err) {
      this.logger.error(
        { err: err as Error, reference: params.reference },
        "Card createPayment failed",
      );
      throw err;
    }
  }

  async verifyPayment(params: {
    gatewayTransactionId: string;
    reference?: string;
  }): Promise<GatewayVerificationResult> {
    if (!this.isConfigured) {
      return this.sandboxVerifyPayment(params);
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/api/v1/payments/${params.gatewayTransactionId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
          },
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: Record<string, unknown> = await response.json();
      const status = data.status as string;
      const success = status === "succeeded" || status === "captured";

      return {
        success,
        gatewayTransactionId: params.gatewayTransactionId,
        amount: Number(data.amount ?? 0) / 100,
        currency: (data.currency as string) || "PKR",
        status: success ? "VERIFIED" : "FAILED",
        rawResponse: data,
        failureReason: success
          ? undefined
          : (data.failureReason as string) || "Verification failed",
      };
    } catch (err) {
      this.logger.error(
        {
          err: err as Error,
          gatewayTransactionId: params.gatewayTransactionId,
        },
        "Card verifyPayment failed",
      );
      return {
        success: false,
        gatewayTransactionId: params.gatewayTransactionId,
        amount: 0,
        currency: "PKR",
        status: "ERROR",
        failureReason: "Gateway verification request failed",
      };
    }
  }

  parseWebhook(params: {
    headers: Record<string, string>;
    body: unknown;
  }): GatewayWebhookPayload | null {
    const body = params.body as Record<string, unknown>;

    if (!body || typeof body !== "object") {
      this.logger.warn("Card webhook: invalid body");
      return null;
    }

    const gatewayTransactionId = body.transactionId as string;
    const status = body.status as string;
    const amount = Number(body.amount ?? 0) / 100;
    const receivedSignature =
      params.headers["x-signature"] || (body.signature as string);

    if (!gatewayTransactionId || !status) {
      this.logger.warn("Card webhook: missing required fields");
      return null;
    }

    if (this.webhookSecret && receivedSignature) {
      const expectedSignature = this.generateWebhookSignature(body);
      if (receivedSignature !== expectedSignature) {
        this.logger.warn(
          { gatewayTransactionId },
          "Card webhook: signature mismatch",
        );
        return null;
      }
    }

    const statusMap: Record<string, GatewayWebhookPayload["status"]> = {
      succeeded: "SUCCEEDED",
      captured: "SUCCEEDED",
      SUCCEEDED: "SUCCEEDED",
      FAILED: "FAILED",
      failed: "FAILED",
      cancelled: "CANCELLED",
      CANCELLED: "CANCELLED",
      expired: "CANCELLED",
    };

    return {
      gatewayTransactionId,
      gatewayReference: body.reference as string | undefined,
      amount,
      currency: (body.currency as string) || "PKR",
      status: statusMap[status] || "PENDING",
      failureReason:
        status !== "succeeded" && status !== "captured"
          ? (body.failureReason as string) || (body.message as string)
          : undefined,
      rawBody: body,
    };
  }

  // ─── Sandbox stubs ──────────────────────────────────────────────────

  private sandboxCreatePayment(params: {
    amount: number;
    currency?: string;
    reference: string;
    metadata?: Record<string, unknown>;
    callbackUrl?: string;
  }): Promise<GatewayPaymentResult> {
    this.logger.log(
      { reference: params.reference, amount: params.amount },
      "[SANDBOX] Card payment created",
    );

    return Promise.resolve({
      gatewayTransactionId: `CG-SB-${Date.now()}-${params.reference}`,
      gatewayReference: params.reference,
      checkoutUrl: `${this.baseUrl}/sandbox/checkout?ref=${params.reference}`,
      clientPayload: {
        sandbox: true,
        reference: params.reference,
        amount: params.amount,
      },
      message:
        "[Sandbox] Payment initiated — approve via webhook to simulate success",
    });
  }

  private sandboxVerifyPayment(params: {
    gatewayTransactionId: string;
    reference?: string;
  }): Promise<GatewayVerificationResult> {
    this.logger.log(
      { gatewayTransactionId: params.gatewayTransactionId },
      "[SANDBOX] Card payment verified",
    );

    return Promise.resolve({
      success: true,
      gatewayTransactionId: params.gatewayTransactionId,
      amount: 0,
      currency: "PKR",
      status: "SANDBOX_VERIFIED",
      rawResponse: { sandbox: true },
    });
  }

  // ─── Signature helpers ───────────────────────────────────────────────

  private generateSignature(payload: Record<string, unknown>): string {
    const sortedKeys = Object.keys(payload).sort();
    const signString = sortedKeys
      .map((k) => `${k}=${String(payload[k])}`)
      .join("&");
    return crypto
      .createHmac("sha256", this.secretKey)
      .update(signString)
      .digest("hex");
  }

  private generateWebhookSignature(body: Record<string, unknown>): string {
    const salt = crypto.randomBytes(16).toString("hex");
    const signString = `${salt}&${String(body.transactionId)}&${String(body.amount)}&${String(body.status)}`;
    const hash = crypto
      .createHmac("sha256", this.webhookSecret)
      .update(signString)
      .digest("hex");
    return `${salt}${hash}`;
  }
}
