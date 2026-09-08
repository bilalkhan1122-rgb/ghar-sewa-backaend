import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RealtimeService } from "../realtime/realtime.service";
import { ProviderPresenceService } from "./provider-presence.service";
import {
  ProviderBusyOverride,
  UserRole,
  VerificationStatus,
} from "generated/prisma/client";

/**
 * Presence: what a provider reports about themselves (online switch, live
 * location, busy preference) and what customers are allowed to hear about it.
 * The security rule under test everywhere here is that customers can never
 * write any of it — every mutation takes the authenticated userId and every
 * realtime event carries only coarse coordinates.
 */
describe("ProviderPresenceService", () => {
  let service: ProviderPresenceService;

  const prisma = {
    providerProfile: {
      findUnique: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
    user: { findUnique: jest.fn() },
    booking: { count: jest.fn() },
  };
  const realtime = {
    publishProviderPresence: jest.fn().mockResolvedValue(true),
  };

  /** A profile row as publishCurrentPresence reads it. */
  const profile = (overrides: Record<string, unknown> = {}) => ({
    isOnline: true,
    lastOnlineAt: new Date(),
    latitude: 31.5204,
    longitude: 74.3587,
    locationUpdatedAt: new Date(),
    busyOverride: ProviderBusyOverride.AUTO,
    categories: [{ categoryId: "cat-plumber" }],
    ...overrides,
  });

  /** A user row as updateLocation's ownership gate reads it. */
  const providerUser = (overrides: Record<string, unknown> = {}) => ({
    id: "prov1",
    roles: [UserRole.PROVIDER],
    verificationStatus: VerificationStatus.APPROVED,
    cityId: "city-lahore",
    providerProfile: profile(),
    ...overrides,
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    prisma.booking.count.mockResolvedValue(0);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProviderPresenceService,
        { provide: PrismaService, useValue: prisma },
        { provide: RealtimeService, useValue: realtime },
      ],
    }).compile();

    service = module.get<ProviderPresenceService>(ProviderPresenceService);
  });

  // ─── Location ────────────────────────────────────────────────────────

  describe("updateLocation", () => {
    it("refuses a provider who is not online (stale apps cannot resurrect offline providers)", async () => {
      prisma.user.findUnique.mockResolvedValue(
        providerUser({
          providerProfile: profile({ isOnline: false }),
        }),
      );

      await expect(
        service.updateLocation("prov1", { latitude: 31.5, longitude: 74.3 }),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(prisma.providerProfile.update).not.toHaveBeenCalled();
      expect(realtime.publishProviderPresence).not.toHaveBeenCalled();
    });

    it("refuses accounts that are not providers", async () => {
      prisma.user.findUnique.mockResolvedValue({
        roles: [UserRole.CUSTOMER],
        verificationStatus: VerificationStatus.APPROVED,
        providerProfile: null,
      });

      await expect(
        service.updateLocation("c1", { latitude: 31.5, longitude: 74.3 }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it("persists the fix and stamps it as fresh", async () => {
      prisma.user.findUnique.mockResolvedValue(providerUser());
      prisma.providerProfile.update.mockResolvedValue({
        latitude: 31.5204,
        longitude: 74.3587,
        locationUpdatedAt: new Date(),
        lastOnlineAt: new Date(),
      });

      await service.updateLocation("prov1", {
        latitude: 31.5204,
        longitude: 74.3587,
      });

      const updateArgs = prisma.providerProfile.update.mock.calls[0][0];
      expect(updateArgs.where).toEqual({ userId: "prov1" });
      expect(updateArgs.data.latitude).toBe(31.5204);
      expect(updateArgs.data.longitude).toBe(74.3587);
      expect(updateArgs.data.locationUpdatedAt).toBeInstanceOf(Date);
      // A location report doubles as presence — otherwise a still-open app
      // would let an online provider silently go stale.
      expect(updateArgs.data.lastOnlineAt).toBeInstanceOf(Date);
    });

    it("publishes a coarse presence event after the write, never exact coordinates", async () => {
      // The ownership gate and the presence snapshot read the same row.
      prisma.user.findUnique.mockResolvedValue(providerUser());
      prisma.providerProfile.update.mockResolvedValue({
        latitude: 31.5204,
        longitude: 74.3587,
        locationUpdatedAt: new Date(),
        lastOnlineAt: new Date(),
      });

      await service.updateLocation("prov1", {
        latitude: 31.5204,
        longitude: 74.3587,
      });

      expect(realtime.publishProviderPresence).toHaveBeenCalledTimes(1);
      expect(realtime.publishProviderPresence).toHaveBeenCalledWith(
        "city-lahore",
        "prov1",
        expect.objectContaining({
          providerId: "prov1",
          isOnline: true,
          isBusy: false,
          categoryIds: ["cat-plumber"],
          // ~1 km grid cell, not the provider's exact position
          approximateLatitude: 31.52,
          approximateLongitude: 74.36,
        }),
      );
    });
  });

  // ─── Online switch ───────────────────────────────────────────────────

  describe("setOnlineStatus", () => {
    it("announces an offline switch so nearby screens drop the provider", async () => {
      prisma.providerProfile.findUnique.mockResolvedValue({ userId: "prov1" });
      prisma.providerProfile.update.mockResolvedValue({
        isOnline: false,
        lastOnlineAt: null,
      });
      prisma.user.findUnique.mockResolvedValue(
        providerUser({
          providerProfile: profile({ isOnline: false }),
        }),
      );

      await service.setOnlineStatus("prov1", false);

      expect(realtime.publishProviderPresence).toHaveBeenCalledTimes(1);
      expect(realtime.publishProviderPresence).toHaveBeenCalledWith(
        "city-lahore",
        "prov1",
        expect.objectContaining({
          isOnline: false,
          approximateLatitude: null,
          approximateLongitude: null,
        }),
      );
    });

    it("does not advertise an online switch until a location exists (nothing to place on the map)", async () => {
      prisma.providerProfile.findUnique.mockResolvedValue({ userId: "prov1" });
      prisma.providerProfile.update.mockResolvedValue({
        isOnline: true,
        lastOnlineAt: new Date(),
      });
      prisma.user.findUnique.mockResolvedValue(
        providerUser({
          providerProfile: profile({
            latitude: null,
            longitude: null,
            locationUpdatedAt: null,
          }),
        }),
      );

      await service.setOnlineStatus("prov1", true);

      expect(realtime.publishProviderPresence).not.toHaveBeenCalled();
    });

    it("publishes with the derived busy flag when coming online with a fresh location", async () => {
      prisma.providerProfile.findUnique.mockResolvedValue({ userId: "prov1" });
      prisma.providerProfile.update.mockResolvedValue({
        isOnline: true,
        lastOnlineAt: new Date(),
      });
      prisma.user.findUnique.mockResolvedValue(providerUser());
      prisma.booking.count.mockResolvedValue(1);

      await service.setOnlineStatus("prov1", true);

      expect(realtime.publishProviderPresence).toHaveBeenCalledTimes(1);
      expect(realtime.publishProviderPresence).toHaveBeenCalledWith(
        "city-lahore",
        "prov1",
        expect.objectContaining({ isOnline: true, isBusy: true }),
      );
    });
  });

  // ─── Heartbeat ───────────────────────────────────────────────────────

  describe("heartbeat", () => {
    it("refreshes only providers who already chose to be online", async () => {
      prisma.providerProfile.updateMany.mockResolvedValue({ count: 1 });

      const result = await service.heartbeat("prov1");

      expect(result).toEqual({ isOnline: true });
      expect(prisma.providerProfile.updateMany).toHaveBeenCalledWith({
        where: { userId: "prov1", isOnline: true },
        data: { lastOnlineAt: expect.any(Date) },
      });
    });

    it("cannot turn an offline provider on", async () => {
      prisma.providerProfile.updateMany.mockResolvedValue({ count: 0 });

      const result = await service.heartbeat("prov1");

      expect(result).toEqual({ isOnline: false });
    });
  });

  // ─── Busy override ───────────────────────────────────────────────────

  describe("setBusyOverride", () => {
    it("persists the override and republishes presence with forced busy", async () => {
      prisma.providerProfile.findUnique.mockResolvedValue({ userId: "prov1" });
      prisma.providerProfile.update.mockResolvedValue({
        busyOverride: ProviderBusyOverride.BUSY,
      });
      prisma.user.findUnique.mockResolvedValue(
        providerUser({
          providerProfile: profile({
            busyOverride: ProviderBusyOverride.BUSY,
          }),
        }),
      );

      await service.setBusyOverride("prov1", ProviderBusyOverride.BUSY);

      expect(prisma.providerProfile.update).toHaveBeenCalledWith({
        where: { userId: "prov1" },
        data: { busyOverride: ProviderBusyOverride.BUSY },
        select: { busyOverride: true },
      });
      expect(realtime.publishProviderPresence).toHaveBeenCalledWith(
        "city-lahore",
        "prov1",
        expect.objectContaining({ isBusy: true }),
      );
    });

    it("AVAILABLE override reports free even with an active booking", async () => {
      prisma.providerProfile.findUnique.mockResolvedValue({ userId: "prov1" });
      prisma.providerProfile.update.mockResolvedValue({
        busyOverride: ProviderBusyOverride.AVAILABLE,
      });
      prisma.user.findUnique.mockResolvedValue(
        providerUser({
          providerProfile: profile({
            busyOverride: ProviderBusyOverride.AVAILABLE,
          }),
        }),
      );
      prisma.booking.count.mockResolvedValue(1);

      await service.setBusyOverride("prov1", ProviderBusyOverride.AVAILABLE);

      expect(realtime.publishProviderPresence).toHaveBeenCalledWith(
        "city-lahore",
        "prov1",
        expect.objectContaining({ isBusy: false }),
      );
    });
  });

  // ─── Engagement-driven refresh ───────────────────────────────────────

  describe("refreshAndPublishPresence", () => {
    it("stays silent for a provider who is not visible on the map", async () => {
      prisma.user.findUnique.mockResolvedValue(
        providerUser({
          providerProfile: profile({ isOnline: false }),
        }),
      );

      const published = await service.refreshAndPublishPresence("prov1");

      expect(published).toBe(false);
      expect(realtime.publishProviderPresence).not.toHaveBeenCalled();
    });

    it("publishes current busy state when the provider is visible", async () => {
      prisma.user.findUnique.mockResolvedValue(providerUser());
      prisma.booking.count.mockResolvedValue(1);

      const published = await service.refreshAndPublishPresence("prov1");

      expect(published).toBe(true);
      expect(realtime.publishProviderPresence).toHaveBeenCalledWith(
        "city-lahore",
        "prov1",
        expect.objectContaining({ isBusy: true, isOnline: true }),
      );
    });
  });
});
