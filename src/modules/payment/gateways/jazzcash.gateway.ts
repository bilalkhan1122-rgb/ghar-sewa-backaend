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
 * Module 16 — JazzCash Payment Gateway Integration.
 *
 * Sandbox-ready. When credentials are missing the service degrades to
 * sandbox stubs that log operations without hitting real APIs.
 *
 * Env vars: JAZZCASH_MERCHANT_ID, JAZZCASH_PASSWORD, JAZZCASH_RETURN_URL,
 *   JAZZCASH_INDUSTRY_TYPE_ID, JAZZCASH_BASE_URL, JAZZCASH_WEBHOOK_SECRET
 */
@Injectable()
export class JazzCashGateway implements PaymentGateway {
  private readonly logger = new Logger(JazzCashGateway.name);

  readonly gatewayType = PaymentGatewayType.JAZZCASH;
  readonly supportedMethods = [PaymentMethod.JAZZCASH];

  private readonly merchantId: string;
  private readonly password: string;
  private readonly returnUrl: string;
  private readonly industryTypeId: string;
  private readonly baseUrl: string;
  private readonly webhookSecret: string;

  constructor(private readonly config: ConfigService) {
    this.merchantId = this.config.get("JAZZCASH_MERCHANT_ID", "");
    this.password = this.config.get("JAZZCASH_PASSWORD", "");
    const appUrl = this.config.get<string>("APP_URL", "http://localhost:3000");
    this.returnUrl = this.config.get("JAZZCASH_RETURN_URL", `${appUrl}/api/v1/payments/webhook/jazzcash`);
    this.industryTypeId = this.config.get("JAZZCASH_INDUSTRY_TYPE_ID", "RPRO");
    this.baseUrl = this.config.get(
      "JAZZCASH_BASE_URL",
      "https://sandbox.jazzcash.com.pk",
    );
    this.webhookSecret = this.config.get("JAZZCASH_WEBHOOK_SECRET", "");
  }

  private get isConfigured(): boolean {
    return !!(this.merchantId && this.password && this.webhookSecret);
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
        "JazzCash gateway not configured — returning sandbox stub",
      );
      return this.sandboxCreatePayment(params);
    }

    const timestamp = this.generateTimestamp();
    const expiryDate = this.generateExpiryDate();
    const amountInPaisa = Math.round(params.amount * 100);

    const signature = this.generateCreateSignature({
      amount: amountInPaisa.toString(),
      datetime: timestamp,
      expiryDate,
      merchantId: this.merchantId,
      msisdn: (params.metadata?.phone as string) || "",
      orderRefNumber: params.reference,
      returnUrl: params.callbackUrl || this.returnUrl,
    });

    const payload = {
      pp_MerchantID: this.merchantId,
      pp_Password: this.password,
      pp_ReturnURL: params.callbackUrl || this.returnUrl,
      pp_Amount: amountInPaisa.toString(),
      pp_TxnCurrency: params.currency || "PKR",
      pp_TxnDateTime: timestamp,
      pp_TxnExpiryDateTime: expiryDate,
      pp_TxnReferenceNo: params.reference,
      pp_IndustryTypeID: this.industryTypeId,
      pp_MobileNumber: (params.metadata?.phone as string) || "",
      pp_CNIC: (params.metadata?.cnic as string) || "",
      pp_SecureHash: signature,
    };

    try {
      const response = await fetch(
        `${this.baseUrl}/ApplicationAPI/WebApplicationService.svc/JazzCashCustomerResources/WidgetLoad`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: Record<string, unknown> = await response.json();

      return {
        gatewayTransactionId: (data.pp_TxnID as string) || params.reference,
        gatewayReference: params.reference,
        checkoutUrl: data.redirectUrl as string | undefined,
        clientPayload: data,
        message: (data.pp_ResponseMessage as string) || "Payment initiated",
      };
    } catch (err) {
      this.logger.error(
        { err: err as Error, reference: params.reference },
        "JazzCash createPayment failed",
      );
      throw err;
    }
  }

  async verifyPayment(params: {
    gatewayTransactionId: string;
    reference?: string;
    expectedAmount?: number;
  }): Promise<GatewayVerificationResult> {
    if (!this.isConfigured) {
      return this.sandboxVerifyPayment(params);
    }

    const timestamp = this.generateTimestamp();
    const signature = this.generateVerifySignature({
      gatewayTransactionId: params.gatewayTransactionId,
      merchantId: this.merchantId,
      timestamp,
    });

    try {
      const response = await fetch(
        `${this.baseUrl}/ApplicationAPI/WebApplicationService.svc/JazzCashCustomerResources/GetTransactionStatus`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pp_MerchantID: this.merchantId,
            pp_Password: this.password,
            pp_TxnID: params.gatewayTransactionId,
            pp_TxnDateTime: timestamp,
            pp_SecureHash: signature,
          }),
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: Record<string, unknown> = await response.json();
      const responseCode = data.pp_ResponseCode as string;
      const success = responseCode === "000";

      return {
        success,
        gatewayTransactionId: params.gatewayTransactionId,
        amount: Number(data.pp_Amount ?? 0) / 100,
        currency: (data.pp_TxnCurrency as string) || "PKR",
        status: success ? "VERIFIED" : "FAILED",
        rawResponse: data,
        failureReason: success
          ? undefined
          : (data.pp_ResponseMessage as string) || "Verification failed",
      };
    } catch (err) {
      this.logger.error(
        {
          err: err as Error,
          gatewayTransactionId: params.gatewayTransactionId,
        },
        "JazzCash verifyPayment failed",
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
      this.logger.warn("JazzCash webhook: invalid body");
      return null;
    }

    const responseCode = body.pp_ResponseCode as string;
    const receivedHash = body.pp_SecureHash as string;
    const gatewayTransactionId = body.pp_TxnID as string;
    const amount = Number(body.pp_Amount ?? 0) / 100;

    if (!gatewayTransactionId || !responseCode) {
      this.logger.warn("JazzCash webhook: missing required fields");
      return null;
    }

    if (this.webhookSecret && receivedHash) {
      const expectedHash = this.generateWebhookSignature(body);
      if (receivedHash !== expectedHash) {
        this.logger.warn(
          { gatewayTransactionId },
          "JazzCash webhook: signature mismatch",
        );
        return null;
      }
    }

    const statusMap: Record<string, GatewayWebhookPayload["status"]> = {
      "000": "SUCCEEDED",
      SUCCEEDED: "SUCCEEDED",
      FAILED: "FAILED",
      CANCELLED: "CANCELLED",
      "001": "FAILED",
      "002": "FAILED",
    };

    return {
      gatewayTransactionId,
      gatewayReference: body.pp_TxnRefNo as string | undefined,
      amount,
      currency: (body.pp_TxnCurrency as string) || "PKR",
      status: statusMap[responseCode] || "PENDING",
      failureReason:
        responseCode !== "000"
          ? (body.pp_ResponseMessage as string)
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
      "[SANDBOX] JazzCash payment created",
    );

    return Promise.resolve({
      gatewayTransactionId: `JC-SB-${Date.now()}-${params.reference}`,
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

  /**
   * Reports the payment as paid in full.
   *
   * The amount is echoed back from what the caller says the payment is worth.
   * This used to answer 0, which the service compares against the recorded
   * amount before it credits anything — so every sandbox payment verified
   * "successfully" and then silently credited nothing, leaving a PROCESSING
   * row and a wallet that never moved.
   */
  private sandboxVerifyPayment(params: {
    gatewayTransactionId: string;
    reference?: string;
    expectedAmount?: number;
  }): Promise<GatewayVerificationResult> {
    this.logger.log(
      {
        gatewayTransactionId: params.gatewayTransactionId,
        amount: params.expectedAmount ?? 0,
      },
      "[SANDBOX] JazzCash payment verified",
    );

    return Promise.resolve({
      success: true,
      gatewayTransactionId: params.gatewayTransactionId,
      amount: params.expectedAmount ?? 0,
      currency: "PKR",
      status: "SANDBOX_VERIFIED",
      rawResponse: { sandbox: true },
    });
  }

  // ─── Signature helpers ───────────────────────────────────────────────

  private generateTimestamp(): string {
    const now = new Date();
    return (
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0")
    );
  }

  private generateExpiryDate(): string {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return (
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0")
    );
  }

  private generateCreateSignature(params: {
    amount: string;
    datetime: string;
    expiryDate: string;
    merchantId: string;
    msisdn: string;
    orderRefNumber: string;
    returnUrl: string;
  }): string {
    const salt = this.generateSalt();
    const hashString = `${salt}&${params.merchantId}&${params.amount}&${params.datetime}&${params.expiryDate}&${params.orderRefNumber}&${params.msisdn}&${params.returnUrl}&${this.industryTypeId}`;
    const hash = crypto
      .createHmac("sha256", this.password)
      .update(hashString)
      .digest("hex");
    return `${salt}${hash}`;
  }

  private generateVerifySignature(params: {
    gatewayTransactionId: string;
    merchantId: string;
    timestamp: string;
  }): string {
    const salt = this.generateSalt();
    const hashString = `${salt}&${params.merchantId}&${params.gatewayTransactionId}&${params.timestamp}`;
    const hash = crypto
      .createHmac("sha256", this.password)
      .update(hashString)
      .digest("hex");
    return `${salt}${hash}`;
  }

  private generateWebhookSignature(body: Record<string, unknown>): string {
    const salt = this.generateSalt();
    const hashString = `${salt}&${String(body.pp_MerchantID)}&${String(body.pp_TxnID)}&${String(body.pp_Amount)}&${String(body.pp_TxnCurrency)}&${String(body.pp_TxnDateTime)}`;
    const hash = crypto
      .createHmac("sha256", this.webhookSecret)
      .update(hashString)
      .digest("hex");
    return `${salt}${hash}`;
  }

  private generateSalt(): string {
    return crypto.randomBytes(16).toString("hex");
  }
}
