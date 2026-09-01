import { Test, TestingModule } from "@nestjs/testing";
import { Logger } from "nestjs-pino";
import { PrismaService } from "src/prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { RealtimeService } from "../realtime/realtime.service";
import { RankingService } from "./ranking.service";
import { NotificationType, ProviderRank } from "generated/prisma/client";

const rating = (value: number) => ({
  averageRating: { toNumber: () => value },
});

describe("RankingService (Module 19)", () => {
  let service: RankingService;

  const prisma = {
    user: { findUnique: jest.fn(), findMany: jest.fn() },
    booking: { count: jest.fn(), findMany: jest.fn() },
    ratingSummary: { findUnique: jest.fn() },
    providerRanking: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
      update: jest.fn(),
    },
    providerRankHistory: { findFirst: jest.fn(), create: jest.fn() },
  };
  const notifications = { send: jest.fn(), sendToMany: jest.fn() };
  const realtime = {
    publishRankUpdated: jest.fn().mockResolvedValue(true),
    publishAnalyticsUpdated: jest.fn().mockResolvedValue(true),
  };
  const logger = { log: jest.fn(), error: jest.fn(), warn: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingService,
        { provide: PrismaService, useValue: prisma },
        { provide: NotificationsService, useValue: notifications },
        { provide: RealtimeService, useValue: realtime },
        { provide: Logger, useValue: logger },
      ],
    }).compile();
    service = module.get<RankingService>(RankingService);
  });

  /** Standard happy-path stubs; override per-test as needed. */
  function stubEvaluation(opts: {
    completedJobs: number;
    averageRating: number;
    existing?: { currentRank: ProviderRank } | null;
    duplicate?: boolean;
  }) {
    prisma.user.findUnique.mockResolvedValue({
      role: "PROVIDER",
      roles: ["PROVIDER"],
    });
    prisma.booking.count.mockResolvedValue(opts.completedJobs);
    prisma.ratingSummary.findUnique.mockResolvedValue(
      rating(opts.averageRating),
    );
    prisma.providerRanking.findUnique.mockResolvedValue(
      opts.existing === undefined ? null : opts.existing,
    );
    prisma.providerRankHistory.findFirst.mockResolvedValue(
      opts.duplicate ? { id: "dup" } : null,
    );
    prisma.providerRankHistory.create.mockResolvedValue({ id: "h1" });
    prisma.providerRanking.upsert.mockResolvedValue({
      providerId: "p1",
      currentRank: ProviderRank.NONE,
      completedJobs: opts.completedJobs,
      averageRating: opts.averageRating,
    });
    prisma.providerRanking.update.mockResolvedValue({
      providerId: "p1",
      currentRank: opts.existing?.currentRank ?? ProviderRank.NONE,
    });
  }

  describe("evaluateProviderRank — eligibility", () => {
    it("ignores non-provider users entirely", async () => {
      prisma.user.findUnique.mockResolvedValue({
        role: "CUSTOMER",
        roles: ["CUSTOMER"],
      });
      const result = await service.evaluateProviderRank("u1");
      expect(result).toBeNull();
      expect(prisma.booking.count).not.toHaveBeenCalled();
    });

    it("returns null for a missing user", async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      const result = await service.evaluateProviderRank("u1");
      expect(result).toBeNull();
    });
  });

  describe("evaluateProviderRank — threshold behavior", () => {
    it("awards Bronze at exactly 50 jobs + 4.0 rating", async () => {
      stubEvaluation({ completedJobs: 50, averageRating: 4.0 });
      await service.evaluateProviderRank("p1");

      expect(prisma.providerRanking.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { providerId: "p1" },
          create: expect.objectContaining({ currentRank: ProviderRank.BRONZE }),
        }),
      );
      expect(prisma.providerRankHistory.create).toHaveBeenCalledTimes(1);
    });

    it("keeps NONE for enough jobs but insufficient rating", async () => {
      stubEvaluation({ completedJobs: 600, averageRating: 3.9 });
      await service.evaluateProviderRank("p1");

      expect(prisma.providerRanking.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          create: expect.objectContaining({ currentRank: ProviderRank.NONE }),
        }),
      );
    });

    it("keeps NONE for sufficient rating but insufficient jobs", async () => {
      stubEvaluation({ completedJobs: 10, averageRating: 4.9 });
      await service.evaluateProviderRank("p1");

      expect(prisma.providerRanking.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          create: expect.objectContaining({ currentRank: ProviderRank.NONE }),
        }),
      );
    });

    it("awards the highest qualifying tier (600 jobs + 4.9 → Platinum)", async () => {
      stubEvaluation({ completedJobs: 600, averageRating: 4.9 });
      await service.evaluateProviderRank("p1");

      expect(prisma.providerRanking.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          create: expect.objectContaining({
            currentRank: ProviderRank.PLATINUM,
          }),
        }),
      );
    });

    it("caps at the tier both conditions satisfy (600 jobs + 4.7 → Gold)", async () => {
      stubEvaluation({ completedJobs: 600, averageRating: 4.7 });
      await service.evaluateProviderRank("p1");

      expect(prisma.providerRanking.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          create: expect.objectContaining({ currentRank: ProviderRank.GOLD }),
        }),
      );
    });
  });

  describe("evaluateProviderRank — rank changes", () => {
    it("upgrades Bronze → Silver after job completion", async () => {
      stubEvaluation({
        completedJobs: 150,
        averageRating: 4.3,
        existing: { currentRank: ProviderRank.BRONZE },
      });
      await service.evaluateProviderRank("p1", "Job completion confirmed");

      expect(notifications.send).toHaveBeenCalledWith(
        expect.objectContaining({ type: NotificationType.RANK_UPGRADED }),
      );
      expect(realtime.publishRankUpdated).toHaveBeenCalledWith("p1", {
        providerId: "p1",
        previousRank: ProviderRank.BRONZE,
        newRank: ProviderRank.SILVER,
        timestamp: expect.any(Date),
      });
    });

    it("downgrades Gold → Silver when the rating falls below Gold", async () => {
      stubEvaluation({
        completedJobs: 350,
        averageRating: 4.5,
        existing: { currentRank: ProviderRank.GOLD },
      });
      await service.evaluateProviderRank("p1");

      expect(notifications.send).toHaveBeenCalledWith(
        expect.objectContaining({ type: NotificationType.RANK_DOWNGRADED }),
      );
      expect(realtime.publishRankUpdated).toHaveBeenCalledWith("p1", {
        providerId: "p1",
        previousRank: ProviderRank.GOLD,
        newRank: ProviderRank.SILVER,
        timestamp: expect.any(Date),
      });
    });

    it("drops to NONE when criteria are no longer met", async () => {
      stubEvaluation({
        completedJobs: 20,
        averageRating: 3.0,
        existing: { currentRank: ProviderRank.BRONZE },
      });
      await service.evaluateProviderRank("p1");

      expect(notifications.send).toHaveBeenCalledWith(
        expect.objectContaining({ type: NotificationType.RANK_DOWNGRADED }),
      );
      expect(realtime.publishRankUpdated).toHaveBeenCalledWith(
        "p1",
        expect.objectContaining({
          previousRank: ProviderRank.BRONZE,
          newRank: ProviderRank.NONE,
        }),
      );
    });
  });

  describe("evaluateProviderRank — idempotency", () => {
    it("does not re-record history or re-notify when the rank is unchanged", async () => {
      stubEvaluation({
        completedJobs: 150,
        averageRating: 4.3,
        existing: { currentRank: ProviderRank.SILVER },
      });
      await service.evaluateProviderRank("p1");
      await service.evaluateProviderRank("p1");

      expect(prisma.providerRanking.update).toHaveBeenCalled();
      expect(prisma.providerRankHistory.create).not.toHaveBeenCalled();
      expect(notifications.send).not.toHaveBeenCalled();
      expect(realtime.publishRankUpdated).not.toHaveBeenCalled();
    });

    it("suppresses duplicate changes within the dedupe window", async () => {
      stubEvaluation({
        completedJobs: 150,
        averageRating: 4.3,
        existing: { currentRank: ProviderRank.BRONZE },
        duplicate: true,
      });
      await service.evaluateProviderRank("p1");

      expect(prisma.providerRankHistory.create).not.toHaveBeenCalled();
      expect(notifications.send).not.toHaveBeenCalled();
      expect(realtime.publishRankUpdated).not.toHaveBeenCalled();
    });
  });

  describe("getMyRank", () => {
    /** A provider with no bookings at all — nothing to compute a rate from. */
    function noBookings() {
      prisma.user.findUnique.mockResolvedValue({
        role: "PROVIDER",
        roles: ["PROVIDER"],
      });
      prisma.booking.count.mockResolvedValue(0);
      prisma.booking.findMany.mockResolvedValue([]);
    }

    it("returns a NONE snapshot when no ranking row exists", async () => {
      noBookings();
      prisma.providerRanking.findUnique.mockResolvedValue(null);

      const result = await service.getMyRank("p1");
      expect(result).toMatchObject({
        providerId: "p1",
        rank: ProviderRank.NONE,
        rankLabel: "No rank",
        completedJobs: 0,
        averageRating: 0,
        rankAchievedAt: null,
        lastEvaluatedAt: null,
        // Null, not zero: a provider with no settled bookings has not failed
        // to complete anything, and "0%" would read as a record of failure.
        completionRate: null,
        responseTimeMinutes: null,
      });
      expect(result!.benefits.length).toBeGreaterThan(0);
    });

    it("returns null for non-providers", async () => {
      prisma.user.findUnique.mockResolvedValue({
        role: "CUSTOMER",
        roles: ["CUSTOMER"],
      });
      expect(await service.getMyRank("c1")).toBeNull();
    });

    it("reports completion rate over settled bookings only", async () => {
      prisma.user.findUnique.mockResolvedValue({
        role: "PROVIDER",
        roles: ["PROVIDER"],
      });
      prisma.providerRanking.findUnique.mockResolvedValue(null);
      prisma.booking.findMany.mockResolvedValue([]);
      // 8 completed out of 10 settled. Bookings still in flight are excluded
      // by the query itself, so a busy week cannot dent the figure.
      prisma.booking.count.mockResolvedValueOnce(10).mockResolvedValueOnce(8);

      const result = await service.getMyRank("p1");
      expect(result!.completionRate).toBe(80);
    });

    it("takes the median acceptance gap, so one slow booking cannot skew it", async () => {
      prisma.user.findUnique.mockResolvedValue({
        role: "PROVIDER",
        roles: ["PROVIDER"],
      });
      prisma.providerRanking.findUnique.mockResolvedValue(null);
      prisma.booking.count.mockResolvedValue(0);

      const created = new Date("2026-09-01T10:00:00Z");
      const at = (minutes: number) => ({
        createdAt: created,
        acceptedAt: new Date(created.getTime() + minutes * 60_000),
      });
      // 5, 10 and 600 minutes — the mean would be over three hours, which
      // describes none of them.
      prisma.booking.findMany.mockResolvedValue([at(5), at(10), at(600)]);

      const result = await service.getMyRank("p1");
      expect(result!.responseTimeMinutes).toBe(10);
    });
  });

  describe("evaluateAllProviders", () => {
    it("evaluates every provider and nudges admin analytics", async () => {
      prisma.user.findMany.mockResolvedValue([{ id: "p1" }, { id: "p2" }]);
      stubEvaluation({ completedJobs: 60, averageRating: 4.1 });

      const result = await service.evaluateAllProviders();
      expect(result).toEqual({ evaluated: 2 });
      expect(realtime.publishAnalyticsUpdated).toHaveBeenCalledWith(
        "ranks_recalculated",
      );
    });

    it("keeps going when a single provider evaluation fails", async () => {
      prisma.user.findMany.mockResolvedValue([{ id: "p1" }, { id: "p2" }]);
      stubEvaluation({ completedJobs: 60, averageRating: 4.1 });
      prisma.booking.count.mockRejectedValueOnce(new Error("db down"));

      const result = await service.evaluateAllProviders();
      expect(result).toEqual({ evaluated: 1 });
      expect(logger.error).toHaveBeenCalled();
    });
  });
});
