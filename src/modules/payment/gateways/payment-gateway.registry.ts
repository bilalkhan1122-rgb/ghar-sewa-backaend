import { Injectable } from "@nestjs/common";
import { PaymentGatewayType } from "generated/prisma/client";
import { PaymentGateway } from "./payment-gateway.interface";

/**
 * Module 16 — Payment Gateway Registry.
 *
 * Resolves the right gateway implementation for a given PaymentGatewayType.
 * All gateways are injected via the module's providers and registered here.
 */
@Injectable()
export class PaymentGatewayRegistry {
  private readonly gateways = new Map<PaymentGatewayType, PaymentGateway>();

  register(gateway: PaymentGateway): void {
    this.gateways.set(gateway.gatewayType, gateway);
  }

  get(type: PaymentGatewayType): PaymentGateway {
    const gateway = this.gateways.get(type);
    if (!gateway) {
      throw new Error(`Payment gateway not registered: ${type}`);
    }
    return gateway;
  }

  getSupportedTypes(): PaymentGatewayType[] {
    return Array.from(this.gateways.keys());
  }

  isRegistered(type: PaymentGatewayType): boolean {
    return this.gateways.has(type);
  }
}
