import { PaymentGatewayType, PaymentMethod } from "generated/prisma/client";

/**
 * Module 16 — Payment Gateway Abstraction.
 *
 * Each gateway (JazzCash, Easypaisa, Card) implements this interface so the
 * application is never tightly coupled to one provider. The payment service
 * orchestrates the flow; individual gateways handle API specifics.
 */

/** Data returned when a payment is initiated with a gateway. */
export interface GatewayPaymentResult {
  /** Gateway's own transaction / reference ID. */
  gatewayTransactionId: string;
  /** A reference the gateway uses to track this payment. */
  gatewayReference?: string;
  /** URL the customer should be redirected to for checkout (if applicable). */
  checkoutUrl?: string;
  /** Opaque payload the frontend needs to hand the SDK / redirect. */
  clientPayload?: Record<string, unknown>;
  /** Human-readable status from the gateway. */
  message?: string;
}

/** Data returned when a gateway transaction is verified server-side. */
export interface GatewayVerificationResult {
  /** Whether the payment succeeded at the gateway. */
  success: boolean;
  /** Gateway's transaction ID (confirmed). */
  gatewayTransactionId: string;
  /** Amount the gateway reports was paid. */
  amount: number;
  /** Currency the gateway reports. */
  currency: string;
  /** Human-readable status from the gateway. */
  status: string;
  /** Raw gateway response for audit / debugging. */
  rawResponse?: Record<string, unknown>;
  /** Failure reason when success=false. */
  failureReason?: string;
}

/** Standardised webhook payload after parsing the gateway's raw callback. */
export interface GatewayWebhookPayload {
  /** The gateway transaction ID. */
  gatewayTransactionId: string;
  /** A reference the gateway uses to track this payment. */
  gatewayReference?: string;
  /** Amount paid / attempted. */
  amount: number;
  /** Currency. */
  currency: string;
  /** Parsed status — normalised to one of: SUCCEEDED, FAILED, CANCELLED, PENDING. */
  status: "SUCCEEDED" | "FAILED" | "CANCELLED" | "PENDING";
  /** Failure reason when status is FAILED or CANCELLED. */
  failureReason?: string;
  /** Raw webhook body for audit. */
  rawBody: Record<string, unknown>;
}

/**
 * Every payment gateway must implement this interface.
 *
 * The service never calls gateway methods directly — it goes through the
 * PaymentGatewayRegistry, which resolves the right gateway for a given
 * PaymentGatewayType.
 */
export interface PaymentGateway {
  /** Which gateway this is. */
  readonly gatewayType: PaymentGatewayType;

  /** Which customer-facing payment method(s) this gateway serves. */
  readonly supportedMethods: PaymentMethod[];

  /**
   * Initiate a payment with the gateway.
   *
   * @param params.amount      - Amount in the smallest unit (PKR whole units).
   * @param params.currency    - ISO 4217 currency code (default PKR).
   * @param params.reference   - Our internal idempotency / payment ID.
   * @param params.metadata    - Arbitrary metadata (booking ID, user ID, etc.).
   * @param params.callbackUrl - Webhook URL the gateway should call.
   */
  createPayment(params: {
    amount: number;
    currency?: string;
    reference: string;
    metadata?: Record<string, unknown>;
    callbackUrl?: string;
  }): Promise<GatewayPaymentResult>;

  /**
   * Verify a payment transaction server-side.
   *
   * Called both from the webhook handler (as a belt-and-suspenders check)
   * and from a manual status-check endpoint.
   *
   * `expectedAmount` is what our own record says the payment is worth. A real
   * gateway MUST ignore it and report the amount it actually took — the
   * caller compares the two, and trusting our own figure here would defeat
   * that check. It exists for the sandbox stubs, which have no gateway to ask
   * and would otherwise report 0 and fail the comparison every time.
   */
  verifyPayment(params: {
    gatewayTransactionId: string;
    reference?: string;
    expectedAmount?: number;
  }): Promise<GatewayVerificationResult>;

  /**
   * Parse and validate a raw webhook / callback body.
   *
   * The gateway is responsible for:
   * - Signature validation (where the gateway supports it).
   * - Amount / currency validation.
   * - Normalising the status to the common enum.
   *
   * Returns null when the webhook is invalid and should be rejected.
   */
  parseWebhook(params: {
    headers: Record<string, string>;
    body: unknown;
  }): GatewayWebhookPayload | null;
}
