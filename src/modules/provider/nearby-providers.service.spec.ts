import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "src/prisma/prisma.service";
import { NearbyProvidersService } from "./nearby-providers.service";
import {
  ProviderBusyOverride,
  UserRole,
  UserStatus,
  VerificationStatus,
} from "generated/prisma/client";

/**
 * Nearby Online Providers — what must be true for a provider to appear.
 *
 * Distance is the database's job (earthdistance), so the radius boundary and
 * the nearest-first order are tested through the mocked $queryRaw results.
 * Every *eligibility* rule lives in application code and is asserted on the
 * Prisma where-clause the service builds, in the same style as the provider
 * browse tests.
 */
describe("NearbyProvidersService", () => {
  let service: NearbyProvidersService;

  const prisma = {
    $queryRaw: jest.fn(),
    user: { findMany: jest.fn() },
    booking: { groupBy: jest.fn() },
  };

  /** A candidate row exactly as the radius query would return it. */
  const candidate = (providerId: string, distanceKm: number) => ({
    providerId,
    distanceKm,
  });

  /** A user row in the shape the display fetch includes. */
  const userRow = (overrides: Record<string, unknown> = {}) => ({
    id: "p1",
    fullName: "Ali Plumber",
    profilePhoto: "https://cdn/ali.jpg",
    ratingSummary: { averageRating: 4.5, totalReviews: 12 },
    providerRanking: { currentRank: "SILVER" },
    providerProfile: {
      latitude: 31.52041,
      longitude: 74.35871,
      busyOverride: ProviderBusyOverride.AUTO,
      categories: [{ category: { id: "cat-plumber", name: "Plumber" } }],
    },
    ...overrides,
  });

  const dto = (overrides: Record<string, unknown> = {}) => ({
    latitude: 31.5,
    longitude: 74.3,
    ...overrides,
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    prisma.booking.groupBy.mockResolvedValue([]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NearbyProvidersService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<NearbyProvidersService>(NearbyProvidersService);
  });

  describe("eligibility — the provider must be present, verified and free", () => {
    it("builds a where-clause that admits only verified, complete, active, online providers", async () => {
      prisma.$queryRaw.mockResolvedValue([candidate("p1", 1.2)]);
      prisma.user.findMany.mockResolvedValue([userRow()]);

      await service.findNearbyProviders(dto());

      const { where } = prisma.user.findMany.mock.calls[0][0];
      expect(where.roles).toEqual({ has: UserRole.PROVIDER });
      expect(where.isActive).toBe(true);
      expect(where.status).toBe(UserStatus.ACTIVE);
      expect(where.verificationStatus).toBe(VerificationStatus.APPROVED);
      expect(where.profileCompleted).toBe(true);
      // Unverified / suspended / banned providers never even reach the DB call.
      expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
    });

    it("never asks the database about offline or stale providers", async () => {
      prisma.$queryRaw.mockResolvedValue([candidate("p1", 1.2)]);
      prisma.user.findMany.mockResolvedValue([]);

      await service.findNearbyProviders(dto());

      const { where } = prisma.user.findMany.mock.calls[0][0];
      const profileFilter = where.providerProfile;

      // The manual switch must be on…
      expect(profileFilter.isOnline).toBe(true);
      // …the heartbeat must be fresh…
      expect(profileFilter.lastOnlineAt).toMatchObject({
        gte: expect.any(Date),
      });
      // …and so must the location fix (stale location = no longer near you).
      expect(profileFilter.locationUpdatedAt).toMatchObject({
        gte: expect.any(Date),
      });
      expect(profileFilter.latitude).toEqual({ not: null });
      expect(profileFilter.longitude).toEqual({ not: null });
    });

    it("rejects busy providers when their override is AUTO and they have an active booking", async () => {
      prisma.$queryRaw.mockResolvedValue([
        candidate("p1", 1.1),
        candidate("p2", 2.2),
      ]);
      prisma.user.findMany.mockResolvedValue([
        userRow(),
        userRow({ id: "p2" }),
      ]);
      prisma.booking.groupBy.mockResolvedValue([
        { providerId: "p2", _count: { _all: 1 } },
      ]);

      const result = await service.findNearbyProviders(dto());

      expect(result.data.map((r) => r.providerId)).toEqual(["p1"]);
    });

    it("honours the manual busy override: BUSY hides, AVAILABLE shows despite a booking", async () => {
      prisma.$queryRaw.mockResolvedValue([
        candidate("p1", 1.1),
        candidate("p2", 1.2),
      ]);
      prisma.user.findMany.mockResolvedValue([
        userRow({
          providerProfile: {
            ...userRow().providerProfile,
            busyOverride: ProviderBusyOverride.BUSY,
          },
        }),
        userRow({
          id: "p2",
          providerProfile: {
            ...userRow().providerProfile,
            busyOverride: ProviderBusyOverride.AVAILABLE,
          },
        }),
      ]);
      // p2 has an active booking but overrode to AVAILABLE.
      prisma.booking.groupBy.mockResolvedValue([
        { providerId: "p2", _count: { _all: 1 } },
      ]);

      const result = await service.findNearbyProviders(dto());

      expect(result.data.map((r) => r.providerId)).toEqual(["p2"]);
    });

    it("only matches providers offering the requested service category", async () => {
      prisma.$queryRaw.mockResolvedValue([candidate("p1", 1.2)]);
      prisma.user.findMany.mockResolvedValue([userRow()]);

      await service.findNearbyProviders(dto({ categoryId: "cat-plumber" }));

      const { where } = prisma.user.findMany.mock.calls[0][0];
      expect(where.providerProfile.categories).toEqual({
        some: { categoryId: "cat-plumber" },
      });
    });
  });

  describe("geometry — radius and ordering are decided by the database", () => {
    it("returns every candidate the radius query found, nearest first", async () => {
      // What the database returns: nearest-first already (it did the sort).
      prisma.$queryRaw.mockResolvedValue([
        candidate("p1", 0.8),
        candidate("p2", 2.3),
        candidate("p3", 4.1),
      ]);
      // The display fetch returns in a different order — the distance order
      // from the database must win.
      prisma.user.findMany.mockResolvedValue([
        userRow({ id: "p3" }),
        userRow({ id: "p1" }),
        userRow({ id: "p2" }),
      ]);

      const result = await service.findNearbyProviders(dto());

      expect(result.data.map((r) => r.providerId)).toEqual(["p1", "p2", "p3"]);
      expect(result.data.map((r) => r.distanceKm)).toEqual([0.8, 2.3, 4.1]);
    });

    it("never returns a provider outside the radius — only queried ids can come back", async () => {
      // The DB is asked about exactly the ids inside the circle.
      prisma.$queryRaw.mockResolvedValue([candidate("p1", 1.2)]);
      prisma.user.findMany.mockResolvedValue([userRow()]);

      const result = await service.findNearbyProviders(dto());

      expect(prisma.user.findMany.mock.calls[0][0].where.id).toEqual({
        in: ["p1"],
      });
      expect(result.data.map((r) => r.providerId)).toEqual(["p1"]);
    });

    it("caps the response at the requested limit, keeping the nearest", async () => {
      prisma.$queryRaw.mockResolvedValue([
        candidate("p1", 0.5),
        candidate("p2", 1.5),
        candidate("p3", 2.5),
      ]);
      prisma.user.findMany.mockResolvedValue([
        userRow({ id: "p1" }),
        userRow({ id: "p2" }),
        userRow({ id: "p3" }),
      ]);

      const result = await service.findNearbyProviders(dto({ limit: 2 }));

      expect(result.data.map((r) => r.providerId)).toEqual(["p1", "p2"]);
    });

    it("returns an empty list when nothing is in range", async () => {
      prisma.$queryRaw.mockResolvedValue([]);

      const result = await service.findNearbyProviders(dto());

      expect(result).toEqual({ data: [], meta: { total: 0, radiusKm: 5 } });
      expect(prisma.user.findMany).not.toHaveBeenCalled();
    });
  });

  describe("response payload — identity without private data", () => {
    it("exposes id, name, photo, rating, rank, distance and a coarse location only", async () => {
      prisma.$queryRaw.mockResolvedValue([candidate("p1", 1.23456)]);
      prisma.user.findMany.mockResolvedValue([
        userRow({
          profilePhoto: "photo.jpg",
          providerRanking: { currentRank: "GOLD" },
        }),
      ]);

      const [row] = (await service.findNearbyProviders(dto())).data;

      expect(row).toEqual({
        providerId: "p1",
        fullName: "Ali Plumber",
        profilePhoto: "photo.jpg",
        rating: 4.5,
        totalReviews: 12,
        rank: "GOLD",
        distanceKm: 1.23,
        // Rounded to a ~1 km grid cell — never the exact fix.
        approximateLocation: { latitude: 31.52, longitude: 74.36 },
        isOnline: true,
        isBusy: false,
        availability: "available",
        categories: [{ id: "cat-plumber", name: "Plumber" }],
      });
    });
  });
});
