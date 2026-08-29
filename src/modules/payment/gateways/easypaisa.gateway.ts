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
 * Module 16 — Easypaisa Payment Gateway Integration.
 *
 * Sandbox-ready. When credentials are missing the service degrades to
 * sandbox stubs that log operations without hitting real APIs.
 *
 * Env vars: EASYPAISA_STORE_ID, EASYPAISA_HASH_KEY, EASYPAISA_RETURN_URL,
 *   EASYPAISA_BASE_URL, EASYPAISA_WEBHOOK_SECRET
 */
@Injectable()
export class EasypaisaGateway implements PaymentGateway {
  private readonly logger = new Logger(EasypaisaGateway.name);

  readonly gatewayType = PaymentGatewayType.EASYPAISA;
  readonly supportedMethods = [PaymentMethod.EASYPAISA];

  private readonly storeId: string;
  private readonly hashKey: string;
  private readonly returnUrl: string;
  private readonly baseUrl: string;
  private readonly webhookSecret: string;

  constructor(private readonly config: ConfigService) {
    this.storeId = this.config.get("EASYPAISA_STORE_ID", "");
    this.hashKey = this.config.get("EASYPAISA_HASH_KEY", "");
    this.returnUrl = this.config.get("EASYPAISA_RETURN_URL", "");
    this.baseUrl = this.config.get(
      "EASYPAISA_BASE_URL",
      "https://sandbox.easypaisa.com.pk",
    );
    this.webhookSecret = this.config.get("EASYPAISA_WEBHOOK_SECRET", "");
  }

  private get isConfigured(): boolean {
    return !!(this.storeId && this.hashKey && this.webhookSecret);
  }

  async createPayment(params: {
    amount: number;
    currency?: string;
    reference: string;
    metadata?: Record<string, unknown>;
    callbackUrl?: string;
  }): Promise<GatewayPaymentResult> {
    if (!this.isConfigured) {
      this.logger.warn(
        "Easypaisa gateway not configured — returning sandbox stub",
      );
      return this.sandboxCreatePayment(params);
    }

    const amountInPaisa = Math.round(params.amount * 100);
    const orderReference = params.reference;
    const expiryDate = this.generateExpiryDate();

    const hashString = `${this.storeId}&${orderReference}&${amountInPaisa}&${expiryDate}`;
    const signature = crypto
      .createHmac("sha256", this.hashKey)
      .update(hashString)
      .digest("hex");

    const payload = {
      storeId: this.storeId,
      orderRefNum: orderReference,
      transactionAmount: amountInPaisa,
      expiryDate,
      returnURL: params.callbackUrl || this.returnUrl,
      paymentModel: "Purchase",
      customerMSISDN: (params.metadata?.phone as string) || "",
      custName: (params.metadata?.name as string) || "",
      signature,
    };

    try {
      const response = await fetch(`${this.baseUrl}/easypaisa/app/main`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: Record<string, unknown> = await response.json();

      return {
        gatewayTransactionId:
          (data.transactionId as string) || params.reference,
        gatewayReference: orderReference,
        checkoutUrl: data.easypayUrl as string | undefined,
        clientPayload: data,
        message: (data.responseMessage as string) || "Payment initiated",
      };
    } catch (err) {
      this.logger.error(
        { err: err as Error, reference: params.reference },
        "Easypaisa createPayment failed",
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

    const hashString = `${this.storeId}&${params.gatewayTransactionId}`;
    const signature = crypto
      .createHmac("sha256", this.hashKey)
      .update(hashString)
      .digest("hex");

    try {
      const response = await fetch(
        `${this.baseUrl}/easypaisa/app/query-transaction`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            storeId: this.storeId,
            transactionId: params.gatewayTransactionId,
            signature,
          }),
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: Record<string, unknown> = await response.json();
      const responseCode = data.responseCode as string;
      const success = responseCode === "0000";

      return {
        success,
        gatewayTransactionId: params.gatewayTransactionId,
        amount: Number(data.transactionAmount ?? 0) / 100,
        currency: (data.transactionCurrency as string) || "PKR",
        status: success ? "VERIFIED" : "FAILED",
        rawResponse: data,
        failureReason: success
          ? undefined
          : (data.responseMessage as string) || "Verification failed",
      };
    } catch (err) {
      this.logger.error(
        {
          err: err as Error,
          gatewayTransactionId: params.gatewayTransactionId,
        },
        "Easypaisa verifyPayment failed",
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
      this.logger.warn("Easypaisa webhook: invalid body");
      return null;
    }

    const responseCode = body.responseCode as string;
    const receivedSignature = body.signature as string;
    const gatewayTransactionId = body.transactionId as string;
    const amount = Number(body.transactionAmount ?? 0) / 100;

    if (!gatewayTransactionId || !responseCode) {
      this.logger.warn("Easypaisa webhook: missing required fields");
      return null;
    }

    if (this.webhookSecret && receivedSignature) {
      const expectedSignature = this.generateWebhookSignature(body);
      if (receivedSignature !== expectedSignature) {
        this.logger.warn(
          { gatewayTransactionId },
          "Easypaisa webhook: signature mismatch",
        );
        return null;
      }
    }

    const statusMap: Record<string, GatewayWebhookPayload["status"]> = {
      "0000": "SUCCEEDED",
      SUCCEEDED: "SUCCEEDED",
      FAILED: "FAILED",
      CANCELLED: "CANCELLED",
    };

    return {
      gatewayTransactionId,
      gatewayReference: body.orderRefNum as string | undefined,
      amount,
      currency: (body.transactionCurrency as string) || "PKR",
      status: statusMap[responseCode] || "PENDING",
      failureReason:
        responseCode !== "0000" ? (body.responseMessage as string) : undefined,
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
      "[SANDBOX] Easypaisa payment created",
    );

    return Promise.resolve({
      gatewayTransactionId: `EP-SB-${Date.now()}-${params.reference}`,
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
      "[SANDBOX] Easypaisa payment verified",
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

  // ─── Helpers ────────────────────────────────────────────────────────

  private generateExpiryDate(): string {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toISOString();
  }

  private generateWebhookSignature(body: Record<string, unknown>): string {
    const salt = crypto.randomBytes(16).toString("hex");
    const hashString = `${salt}&${String(body.storeId)}&${String(body.transactionId)}&${String(body.transactionAmount)}&${String(body.responseCode)}`;
    const hash = crypto
      .createHmac("sha256", this.webhookSecret)
      .update(hashString)
      .digest("hex");
    return `${salt}${hash}`;
  }
}
