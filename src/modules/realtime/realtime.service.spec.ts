import { ServiceUnavailableException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Pusher from "pusher";
import { PUSHER_EVENTS, RealtimeService } from "./realtime.service";

jest.mock("pusher", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const MockPusher = Pusher as unknown as jest.Mock;

function configWith(values: Record<string, string | undefined>): ConfigService {
  return {
    get: jest.fn((key: string) => values[key]),
  } as unknown as ConfigService;
}

const FULL_CONFIG = {
  PUSHER_APP_ID: "2185637",
  PUSHER_KEY: "key",
  PUSHER_SECRET: "secret",
  PUSHER_CLUSTER: "ap2",
};

describe("RealtimeService (Pusher)", () => {
  let service: RealtimeService;
  let trigger: jest.Mock;
  let authorize: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    trigger = jest.fn().mockResolvedValue({});
    authorize = jest.fn().mockReturnValue({ auth: "signed-token" });
    MockPusher.mockReset();
    MockPusher.mockImplementation(() => ({
      trigger,
      authorizeChannel: authorize,
    }));
  });

  describe("configuration", () => {
    it("degrades to a stub when Pusher env vars are missing", () => {
      service = new RealtimeService(configWith({}));
      expect(service.isConfigured).toBe(false);
      expect(MockPusher).not.toHaveBeenCalled();
    });

    it("initializes Pusher when env vars are present", () => {
      service = new RealtimeService(configWith(FULL_CONFIG));
      expect(service.isConfigured).toBe(true);
      expect(MockPusher).toHaveBeenCalledWith(
        expect.objectContaining({
          appId: "2185637",
          cluster: "ap2",
        }),
      );
    });
  });

  describe("publish", () => {
    it("is a no-op stub when not configured (never throws)", async () => {
      service = new RealtimeService(configWith({}));
      await expect(
        service.publish("private-user-u1", "evt", { a: 1 }),
      ).resolves.toBe(false);
      expect(trigger).not.toHaveBeenCalled();
    });

    it("triggers the event on the channel when configured", async () => {
      service = new RealtimeService(configWith(FULL_CONFIG));
      const data = { jobId: "j1" };
      const ok = await service.publish("private-user-u1", "evt", data);

      expect(ok).toBe(true);
      expect(trigger).toHaveBeenCalledWith("private-user-u1", "evt", data);
    });

    it("logs and swallows Pusher failures without throwing", async () => {
      service = new RealtimeService(configWith(FULL_CONFIG));
      trigger.mockRejectedValue(new Error("network down"));

      await expect(service.publish("private-admin", "evt", {})).resolves.toBe(
        false,
      );
    });
  });

  describe("authorizeChannel", () => {
    it("returns the signed auth token for a private channel", () => {
      service = new RealtimeService(configWith(FULL_CONFIG));
      expect(service.authorizeChannel("123.456", "private-user-u1")).toEqual({
        auth: "signed-token",
      });
      expect(authorize).toHaveBeenCalledWith("123.456", "private-user-u1");
    });

    it("rejects authorization when Pusher is not configured", () => {
      service = new RealtimeService(configWith({}));
      expect(() =>
        service.authorizeChannel("123.456", "private-user-u1"),
      ).toThrow(ServiceUnavailableException);
    });
  });

  describe("convenience publishes", () => {
    it("publishRankUpdated targets the provider channel with rank payload", async () => {
      service = new RealtimeService(configWith(FULL_CONFIG));
      await service.publishRankUpdated("p1", {
        providerId: "p1",
        previousRank: "BRONZE",
        newRank: "SILVER",
        timestamp: new Date("2026-08-12T00:00:00Z"),
      });

      expect(trigger).toHaveBeenCalledWith(
        "private-provider-p1",
        PUSHER_EVENTS.PROVIDER_RANK_UPDATED,
        expect.objectContaining({
          providerId: "p1",
          previousRank: "BRONZE",
          newRank: "SILVER",
        }),
      );
    });

    it("publishUrgentJobAccepted targets customer and provider channels", async () => {
      service = new RealtimeService(configWith(FULL_CONFIG));
      await service.publishUrgentJobAccepted("c1", "p1", {
        jobId: "j1",
        bookingId: "b1",
        title: "Burst pipe",
        isUrgent: true,
        acceptedAt: new Date(),
      });

      expect(trigger).toHaveBeenNthCalledWith(
        1,
        "private-user-c1",
        PUSHER_EVENTS.JOB_URGENT_ACCEPTED,
        expect.objectContaining({ jobId: "j1" }),
      );
      expect(trigger).toHaveBeenNthCalledWith(
        2,
        "private-provider-p1",
        PUSHER_EVENTS.JOB_URGENT_ACCEPTED,
        expect.objectContaining({ jobId: "j1" }),
      );
    });

    it("publishAnalyticsUpdated targets the admin channel only", async () => {
      service = new RealtimeService(configWith(FULL_CONFIG));
      await service.publishAnalyticsUpdated("job_completion_confirmed");

      expect(trigger).toHaveBeenCalledWith(
        "private-admin",
        PUSHER_EVENTS.ANALYTICS_UPDATED,
        expect.objectContaining({ reason: "job_completion_confirmed" }),
      );
    });
  });
});
