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
  /**
   * What holding this tier actually gets the provider, shown on their rank
   * screen.
   *
   * ⚠️ These are the only perks the platform genuinely delivers today. Rank is
   * returned on every provider card, so the badge is real; commission is a flat
   * rate for everyone (`COMMISSION_RATE`, 7.5%) and browse order does not
   * consider rank, so neither a discount nor priority placement can be claimed
   * here yet. If the business adds a real perk — tiered commission, featured
   * placement, priority support — implement it first, then say so here.
   */
  benefits: string[];
}

export const RANK_TIERS: RankTier[] = [
  {
    rank: ProviderRank.PLATINUM,
    minCompletedJobs: 600,
    minAverageRating: 4.8,
    label: "Platinum",
    benefits: [
      "Platinum badge on your profile and in search results",
      "600+ completed jobs at 4.8★ — the highest tier on the platform",
      "Customers can see you are among the most experienced providers here",
    ],
  },
  {
    rank: ProviderRank.GOLD,
    minCompletedJobs: 350,
    minAverageRating: 4.6,
    label: "Gold",
    benefits: [
      "Gold badge on your profile and in search results",
      "350+ completed jobs at 4.6★ shown to every customer",
      "One tier from Platinum, the highest on the platform",
    ],
  },
  {
    rank: ProviderRank.SILVER,
    minCompletedJobs: 150,
    minAverageRating: 4.3,
    label: "Silver",
    benefits: [
      "Silver badge on your profile and in search results",
      "150+ completed jobs at 4.3★ shown to every customer",
    ],
  },
  {
    rank: ProviderRank.BRONZE,
    minCompletedJobs: 50,
    minAverageRating: 4.0,
    label: "Bronze",
    benefits: [
      "Bronze badge on your profile and in search results",
      "50+ completed jobs at 4.0★ shown to every customer",
    ],
  },
];

/**
 * What an unranked provider is working towards. Not a tier, so it carries the
 * route in rather than a list of perks.
 */
const UNRANKED_BENEFITS = [
  "Complete 50 jobs at 4.0★ to earn your first badge",
  "Ranked providers show their tier on every search result",
];

/** The perks for a tier, or the route in for a provider who has none yet. */
export function tierBenefits(rank: ProviderRank): string[] {
  return (
    RANK_TIERS.find((tier) => tier.rank === rank)?.benefits ?? UNRANKED_BENEFITS
  );
}

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
