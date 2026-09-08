import { ForbiddenException, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { RolesGuard } from "./roles.guard";
import { ProviderController } from "src/modules/provider/provider.controller";
import { NearbyProvidersController } from "src/modules/provider/nearby-providers.controller";
import { UserRole } from "generated/prisma/client";

/**
 * Rule: customers can browse nearby providers, but only providers may write
 * location / availability. These tests pin that down at the guard layer —
 * the decorators on the real controllers are checked directly, and the guard
 * itself is exercised with real metadata.
 */
describe("RolesGuard — provider presence routes", () => {
  const reflector = new Reflector();
  const guard = new RolesGuard(reflector);

  function context(user: unknown, handler: () => void) {
    return {
      getHandler: () => handler,
      getClass: () => handler,
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
    } as unknown as Parameters<RolesGuard["canActivate"]>[0];
  }

  function providerOnlyHandler() {
    /* metadata attached below */
  }

  beforeAll(() => {
    Reflect.defineMetadata(ROLES_KEY, [UserRole.PROVIDER], providerOnlyHandler);
  });

  it("rejects a customer who tries a provider-only presence route", () => {
    expect(() =>
      guard.canActivate(
        context(
          { role: UserRole.CUSTOMER, roles: [UserRole.CUSTOMER] },
          providerOnlyHandler,
        ),
      ),
    ).toThrow(ForbiddenException);
  });

  it("admits a provider to the same route", () => {
    expect(
      guard.canActivate(
        context(
          { role: UserRole.PROVIDER, roles: [UserRole.PROVIDER] },
          providerOnlyHandler,
        ),
      ),
    ).toBe(true);
  });

  it("requires authentication before any role check", () => {
    expect(() => guard.canActivate(context(null, providerOnlyHandler))).toThrow(
      UnauthorizedException,
    );
  });

  /** Nest stores method-level metadata on the handler function itself. */
  function handlerMetadata(methodName: keyof ProviderController): unknown {
    const prototype = ProviderController.prototype as unknown as Record<
      string,
      (...args: unknown[]) => unknown
    >;
    return Reflect.getMetadata(ROLES_KEY, prototype[methodName as string]);
  }

  it("declares the real provider presence endpoints provider-only", () => {
    // Location, busy override, online switch and heartbeat are all writes to
    // the provider's own presence. A customer token must never reach them.
    expect(handlerMetadata("updateLocation")).toEqual([UserRole.PROVIDER]);
    expect(handlerMetadata("setBusy")).toEqual([UserRole.PROVIDER]);
    expect(handlerMetadata("setAvailability")).toEqual([UserRole.PROVIDER]);
    expect(handlerMetadata("heartbeat")).toEqual([UserRole.PROVIDER]);
  });

  it("declares the nearby search route customer-only", () => {
    expect(Reflect.getMetadata(ROLES_KEY, NearbyProvidersController)).toEqual([
      UserRole.CUSTOMER,
    ]);
  });
});
