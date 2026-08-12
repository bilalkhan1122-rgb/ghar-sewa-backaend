import { Test, TestingModule } from "@nestjs/testing";
import { ForbiddenException } from "@nestjs/common";
import { RealtimeAuthController } from "./realtime-auth.controller";
import { RealtimeService } from "./realtime.service";
import { isChannelAllowedForUser } from "./realtime-channels";

describe("isChannelAllowedForUser (Pusher channel security)", () => {
  it("allows a user on their own private-user channel", () => {
    expect(
      isChannelAllowedForUser(
        { sub: "u1", role: "CUSTOMER" },
        "private-user-u1",
      ),
    ).toBe(true);
  });

  it("rejects a user from another user's private channel", () => {
    expect(
      isChannelAllowedForUser(
        { sub: "u1", role: "CUSTOMER" },
        "private-user-u2",
      ),
    ).toBe(false);
  });

  it("allows a provider on their own private-provider channel", () => {
    expect(
      isChannelAllowedForUser(
        { sub: "p1", role: "PROVIDER" },
        "private-provider-p1",
      ),
    ).toBe(true);
  });

  it("rejects a provider from another provider's channel", () => {
    expect(
      isChannelAllowedForUser(
        { sub: "p1", role: "PROVIDER" },
        "private-provider-p2",
      ),
    ).toBe(false);
  });

  it("allows only ADMIN on the admin channel", () => {
    expect(
      isChannelAllowedForUser({ sub: "a1", role: "ADMIN" }, "private-admin"),
    ).toBe(true);
    expect(
      isChannelAllowedForUser({ sub: "c1", role: "CUSTOMER" }, "private-admin"),
    ).toBe(false);
    expect(
      isChannelAllowedForUser({ sub: "p1", role: "PROVIDER" }, "private-admin"),
    ).toBe(false);
  });

  it("rejects unknown or malformed channel names", () => {
    expect(
      isChannelAllowedForUser({ sub: "u1", role: "CUSTOMER" }, "public-jobs"),
    ).toBe(false);
    expect(isChannelAllowedForUser({ sub: "u1", role: "CUSTOMER" }, "")).toBe(
      false,
    );
    expect(
      isChannelAllowedForUser(
        { sub: "u1", role: "CUSTOMER" },
        "private-user-u1-extra",
      ),
    ).toBe(false);
  });
});

describe("RealtimeAuthController", () => {
  let controller: RealtimeAuthController;
  const realtime = {
    authorizeChannel: jest.fn().mockReturnValue({ auth: "signed" }),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealtimeAuthController],
      providers: [{ provide: RealtimeService, useValue: realtime }],
    }).compile();
    controller = module.get<RealtimeAuthController>(RealtimeAuthController);
  });

  it("signs a subscription to the caller's own channel", () => {
    const result = controller.authorize(
      { sub: "u1", role: "CUSTOMER" },
      { socket_id: "123.456", channel_name: "private-user-u1" },
    );
    expect(result).toEqual({ auth: "signed" });
    expect(realtime.authorizeChannel).toHaveBeenCalledWith(
      "123.456",
      "private-user-u1",
    );
  });

  it("forbids subscribing to another user's channel", () => {
    expect(() =>
      controller.authorize(
        { sub: "u1", role: "CUSTOMER" },
        { socket_id: "123.456", channel_name: "private-user-u2" },
      ),
    ).toThrow(ForbiddenException);
    expect(realtime.authorizeChannel).not.toHaveBeenCalled();
  });

  it("forbids customers/providers from the admin channel", () => {
    expect(() =>
      controller.authorize(
        { sub: "c1", role: "CUSTOMER" },
        { socket_id: "123.456", channel_name: "private-admin" },
      ),
    ).toThrow(ForbiddenException);
  });

  it("allows an admin on the admin channel", () => {
    const result = controller.authorize(
      { sub: "a1", role: "ADMIN" },
      { socket_id: "123.456", channel_name: "private-admin" },
    );
    expect(result).toEqual({ auth: "signed" });
  });

  it("forbids unauthenticated-style channels (no auth token issued)", () => {
    expect(() =>
      controller.authorize(
        { sub: "u1", role: "CUSTOMER" },
        { socket_id: "123.456", channel_name: "private-provider-p9" },
      ),
    ).toThrow(ForbiddenException);
  });
});
