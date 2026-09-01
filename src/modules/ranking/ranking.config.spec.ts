import { ProviderRank } from "generated/prisma/client";
import {
  highestQualifyingRank,
  rankOrder,
  tierBenefits,
  RANK_TIERS,
} from "./ranking.config";

describe("Module 19 — ranking.config thresholds", () => {
  it("defines the correct tier requirements", () => {
    // Thresholds and order only. The tiers also carry display copy, which is
    // asserted separately — pinning the whole object here meant every wording
    // change failed a test named for the numbers.
    expect(
      RANK_TIERS.map(({ rank, minCompletedJobs, minAverageRating, label }) => ({
        rank,
        minCompletedJobs,
        minAverageRating,
        label,
      })),
    ).toEqual([
      {
        rank: ProviderRank.PLATINUM,
        minCompletedJobs: 600,
        minAverageRating: 4.8,
        label: "Platinum",
      },
      {
        rank: ProviderRank.GOLD,
        minCompletedJobs: 350,
        minAverageRating: 4.6,
        label: "Gold",
      },
      {
        rank: ProviderRank.SILVER,
        minCompletedJobs: 150,
        minAverageRating: 4.3,
        label: "Silver",
      },
      {
        rank: ProviderRank.BRONZE,
        minCompletedJobs: 50,
        minAverageRating: 4.0,
        label: "Bronze",
      },
    ]);
  });

  describe("tier benefits", () => {
    it("gives every tier at least one stated benefit", () => {
      for (const tier of RANK_TIERS) {
        expect(tier.benefits.length).toBeGreaterThan(0);
      }
    });

    it("returns a tier's own benefits", () => {
      expect(tierBenefits(ProviderRank.GOLD)).toEqual(
        RANK_TIERS.find((tier) => tier.rank === ProviderRank.GOLD)?.benefits,
      );
    });

    it("tells an unranked provider how to earn their first badge", () => {
      // NONE is not a tier, so it has no perks to list — it gets the route in.
      const benefits = tierBenefits(ProviderRank.NONE);
      expect(benefits.length).toBeGreaterThan(0);
      expect(benefits.join(" ")).toMatch(/50 jobs/);
    });

    it("claims no perk the platform does not actually deliver", () => {
      // Commission is a flat rate for everyone and browse order ignores rank,
      // so neither can be promised here. This guards the copy against drifting
      // back into the aspirational.
      const copy = RANK_TIERS.flatMap((tier) => tier.benefits)
        .concat(tierBenefits(ProviderRank.NONE))
        .join(" ")
        .toLowerCase();
      expect(copy).not.toMatch(/commission|priority|featured|early access/);
    });
  });

  it("ranks NONE below Bronze", () => {
    expect(highestQualifyingRank(0, 0)).toBe(ProviderRank.NONE);
    expect(highestQualifyingRank(49, 5.0)).toBe(ProviderRank.NONE);
    expect(highestQualifyingRank(10, 5.0)).toBe(ProviderRank.NONE);
  });

  describe("exact thresholds", () => {
    it("Bronze at exactly 50 jobs + 4.0 rating", () => {
      expect(highestQualifyingRank(50, 4.0)).toBe(ProviderRank.BRONZE);
    });
    it("Silver at exactly 150 jobs + 4.3 rating", () => {
      expect(highestQualifyingRank(150, 4.3)).toBe(ProviderRank.SILVER);
    });
    it("Gold at exactly 350 jobs + 4.6 rating", () => {
      expect(highestQualifyingRank(350, 4.6)).toBe(ProviderRank.GOLD);
    });
    it("Platinum at exactly 600 jobs + 4.8 rating", () => {
      expect(highestQualifyingRank(600, 4.8)).toBe(ProviderRank.PLATINUM);
    });
  });

  describe("just-below thresholds", () => {
    it("149 jobs + 4.3 rating → BRONZE (meets Bronze, one short of Silver)", () => {
      expect(highestQualifyingRank(149, 4.3)).toBe(ProviderRank.BRONZE);
    });
    it("349 jobs + 4.6 rating → SILVER (one job short of Gold)", () => {
      expect(highestQualifyingRank(349, 4.6)).toBe(ProviderRank.SILVER);
    });
    it("599 jobs + 4.8 rating → GOLD (one job short of Platinum)", () => {
      expect(highestQualifyingRank(599, 4.8)).toBe(ProviderRank.GOLD);
    });
    it("600 jobs + 4.79 rating → GOLD (rating just under Platinum)", () => {
      expect(highestQualifyingRank(600, 4.79)).toBe(ProviderRank.GOLD);
    });
    it("350 jobs + 4.59 rating → SILVER (rating just under Gold)", () => {
      expect(highestQualifyingRank(350, 4.59)).toBe(ProviderRank.SILVER);
    });
    it("150 jobs + 4.29 rating → BRONZE (rating just under Silver)", () => {
      expect(highestQualifyingRank(150, 4.29)).toBe(ProviderRank.BRONZE);
    });
    it("50 jobs + 3.99 rating → NONE (rating just under Bronze)", () => {
      expect(highestQualifyingRank(50, 3.99)).toBe(ProviderRank.NONE);
    });
  });

  describe("single condition met is not enough", () => {
    it("enough jobs but insufficient rating for the higher tier", () => {
      // 4.5 satisfies Silver (4.3) but not Gold (4.6) / Platinum (4.8)
      expect(highestQualifyingRank(600, 4.5)).toBe(ProviderRank.SILVER);
      expect(highestQualifyingRank(350, 4.5)).toBe(ProviderRank.SILVER);
      // 3.5 does not even satisfy Bronze (4.0)
      expect(highestQualifyingRank(150, 3.5)).toBe(ProviderRank.NONE);
      expect(highestQualifyingRank(50, 2.0)).toBe(ProviderRank.NONE);
    });
    it("sufficient rating but insufficient jobs for the higher tier", () => {
      expect(highestQualifyingRank(5, 4.9)).toBe(ProviderRank.NONE);
      expect(highestQualifyingRank(40, 4.9)).toBe(ProviderRank.NONE);
      // 149 jobs only satisfy Bronze
      expect(highestQualifyingRank(149, 4.9)).toBe(ProviderRank.BRONZE);
      // 349 jobs satisfy Silver, one short of Gold
      expect(highestQualifyingRank(349, 4.9)).toBe(ProviderRank.SILVER);
    });
  });

  it("rankOrder provides a strict numeric ordering", () => {
    expect(rankOrder(ProviderRank.NONE)).toBeLessThan(
      rankOrder(ProviderRank.BRONZE),
    );
    expect(rankOrder(ProviderRank.BRONZE)).toBeLessThan(
      rankOrder(ProviderRank.SILVER),
    );
    expect(rankOrder(ProviderRank.SILVER)).toBeLessThan(
      rankOrder(ProviderRank.GOLD),
    );
    expect(rankOrder(ProviderRank.GOLD)).toBeLessThan(
      rankOrder(ProviderRank.PLATINUM),
    );
  });
});
