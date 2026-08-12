import { ProviderRank } from "generated/prisma/client";

/**
 * Module 19 — Provider Ranking tiers.
 *
 * Central, single source of truth for rank thresholds. Sorted from highest
 * to lowest so the evaluation loop returns the best qualifying tier.
 *
 * A provider qualifies for a tier only when BOTH requirements are met:
 *  - at least `minCompletedJobs` completed (customer-confirmed) bookings, and
 *  - an average rating of at least `minAverageRating`.
 */
export interface RankTier {
  rank: ProviderRank;
  minCompletedJobs: number;
  minAverageRating: number;
  label: string;
}

export const RANK_TIERS: RankTier[] = [
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
];

/** Numeric ordering used to decide upgrade vs downgrade. */
export const RANK_ORDER: Record<ProviderRank, number> = {
  [ProviderRank.NONE]: 0,
  [ProviderRank.BRONZE]: 1,
  [ProviderRank.SILVER]: 2,
  [ProviderRank.GOLD]: 3,
  [ProviderRank.PLATINUM]: 4,
};

export function rankOrder(rank: ProviderRank): number {
  return RANK_ORDER[rank];
}

/**
 * Determine the highest tier a provider qualifies for given their completed
 * job count and average rating. Returns NONE when neither/both thresholds
 * are not met — a rank is never awarded on a single condition alone.
 */
export function highestQualifyingRank(
  completedJobs: number,
  averageRating: number,
): ProviderRank {
  for (const tier of RANK_TIERS) {
    if (
      completedJobs >= tier.minCompletedJobs &&
      averageRating >= tier.minAverageRating
    ) {
      return tier.rank;
    }
  }
  return ProviderRank.NONE;
}
