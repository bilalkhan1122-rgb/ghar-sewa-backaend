import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import { PaymentGatewayType, PaymentMethod } from "generated/prisma/client";
import { CardGateway } from "./card.gateway";
import { EasypaisaGateway } from "./easypaisa.gateway";
import { JazzCashGateway } from "./jazzcash.gateway";
import { PaymentGateway } from "./payment-gateway.interface";

/**
 * The sandbox behaviour every gateway falls back to when its credentials are
 * missing — which is how the app runs until real merchant accounts exist.
 *
 * Worth its own file because the sandbox path is not a stub nobody sees: it is
 * the entire payment experience in test mode, and a bug in it looks exactly
 * like a bug in the real thing.
 */

/** A config with nothing set, so every gateway reports itself unconfigured. */
function unconfigured(): ConfigService {
  return {
    get: <T>(_key: string, defaultValue?: T) => defaultValue,
  } as unknown as ConfigService;
}

describe("payment gateways in sandbox mode", () => {
  const cases: {
    name: string;
    build: () => PaymentGateway;
    type: PaymentGatewayType;
    method: PaymentMethod;
  }[] = [
    {
      name: "Card",
      build: () => new CardGateway(unconfigured()),
      type: PaymentGatewayType.CARD,
      method: PaymentMethod.OTHER,
    },
    {
      name: "Easypaisa",
      build: () => new EasypaisaGateway(unconfigured()),
      type: PaymentGatewayType.EASYPAISA,
      method: PaymentMethod.EASYPAISA,
    },
    {
      name: "JazzCash",
      build: () => new JazzCashGateway(unconfigured()),
      type: PaymentGatewayType.JAZZCASH,
      method: PaymentMethod.JAZZCASH,
    },
  ];

  beforeEach(() => {
    // Each gateway logs a warning on the unconfigured path; that is the point
    // of it, not a test failure.
    jest.spyOn(Logger.prototype, "warn").mockImplementation(() => undefined);
    jest.spyOn(Logger.prototype, "log").mockImplementation(() => undefined);
  });

  afterEach(() => jest.restoreAllMocks());

  describe.each(cases)("$name", ({ build, type, method }) => {
    it("identifies itself and the method it serves", () => {
      const gateway = build();
      expect(gateway.gatewayType).toBe(type);
      if (method !== PaymentMethod.OTHER) {
        expect(gateway.supportedMethods).toContain(method);
      }
    });

    it("creates a payment without calling out to anything", async () => {
      const result = await build().createPayment({
        amount: 5000,
        reference: "payment-123",
        callbackUrl: "https://example.test/webhook",
      });

      expect(result.gatewayTransactionId).toBeTruthy();
      expect(result.clientPayload).toMatchObject({ sandbox: true });
    });

    /**
     * The regression this file exists for. `verifyPayment` used to answer
     * `amount: 0`, and the service credits a wallet only when the verified
     * amount matches the recorded one — so a sandbox payment verified
     * "successfully", credited nothing, and left the customer staring at an
     * unchanged balance with no error anywhere.
     */
    it("verifies for the amount the payment is actually worth", async () => {
      const result = await build().verifyPayment({
        gatewayTransactionId: "SB-123",
        reference: "payment-123",
        expectedAmount: 5000,
      });

      expect(result.success).toBe(true);
      expect(result.amount).toBe(5000);
      expect(result.currency).toBe("PKR");
    });

    it("reports zero when no amount is supplied, rather than inventing one", async () => {
      const result = await build().verifyPayment({
        gatewayTransactionId: "SB-123",
      });

      expect(result.amount).toBe(0);
    });
  });
});
