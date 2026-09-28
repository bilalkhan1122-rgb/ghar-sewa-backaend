import { BiddingService } from "./bidding.service";

/**
 * A customer weighing a counter-offer needs to know how far the provider is —
 * but a provider's exact position is only ever shared with the provider, so the
 * service turns it into a distance and drops the coordinates.
 */
describe("BiddingService — getBidsForJob distance", () => {
  const prisma = {
    job: { findUnique: jest.fn() },
    bid: { findMany: jest.fn(), count: jest.fn() },
  };
  const service = new BiddingService(
    prisma as never,
    {} as never,
    {} as never,
    {} as never,
    {} as never,
    {} as never,
  );

  const bid = (latitude: number | null, longitude: number | null) => ({
    id: "b1",
    provider: {
      id: "p1",
      providerProfile: { bio: null, latitude, longitude },
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    prisma.job.findUnique.mockResolvedValue({
      customerId: "c1",
      latitude: 31.5204,
      longitude: 74.3587,
    });
    prisma.bid.count.mockResolvedValue(1);
  });

  it("returns the distance from provider to job and never their coordinates", async () => {
    // ~0.11° of latitude is a little over 12 km.
    prisma.bid.findMany.mockResolvedValue([bid(31.4204, 74.3587)]);

    const { data } = await service.getBidsForJob("c1", "j1", {} as never);

    expect(data[0].distanceKm).toBeCloseTo(11.1, 0);
    expect(data[0].provider.providerProfile).toEqual({ bio: null });
  });

  it("gives no distance for a provider who has never shared a location", async () => {
    prisma.bid.findMany.mockResolvedValue([bid(null, null)]);

    const { data } = await service.getBidsForJob("c1", "j1", {} as never);

    expect(data[0].distanceKm).toBeNull();
  });
});
