import { Injectable } from "@nestjs/common";
import { Logger } from "nestjs-pino";
import { PrismaService } from "src/prisma/prisma.service";
import {
  BookingStatus,
  NotificationType,
  Prisma,
  ProviderRank,
  UserRole,
} from "generated/prisma/client";
import { NotificationsService } from "../notifications/notifications.service";
import { RealtimeService } from "../realtime/realtime.service";
import {
  highestQualifyingRank,
  rankOrder,
  tierBenefits,
  RANK_TIERS,
} from "./ranking.config";
import { hasRole } from "src/common/roles";

const RANK_LABELS: Record<ProviderRank, string> = {
  [ProviderRank.NONE]: "No rank",
  [ProviderRank.BRONZE]: "Bronze",
  [ProviderRank.SILVER]: "Silver",
  [ProviderRank.GOLD]: "Gold",
  [ProviderRank.PLATINUM]: "Platinum",
};

const RANK_EMOJI: Record<ProviderRank, string> = {
  [ProviderRank.NONE]: "—",
  [ProviderRank.BRONZE]: "🥉",
  [ProviderRank.SILVER]: "🥈",
  [ProviderRank.GOLD]: "🥇",
  [ProviderRank.PLATINUM]: "💎",
};

/**
 * Booking outcomes that count as settled, and so form the denominator of the
 * completion rate.
 *
 * Bookings still in flight (PENDING, ACCEPTED, IN_PROGRESS) are excluded
 * deliberately: a provider halfway through this week's work has not failed to
 * complete anything, and counting those against them would make the rate sag
 * every time they got busy.
 */
const SETTLED_BOOKING_STATUSES: BookingStatus[] = [
  BookingStatus.COMPLETED,
  BookingStatus.CANCELLED,
  BookingStatus.DISPUTED,
];

/**
 * The middle value of a sorted list, or null for an empty one.
 *
 * Median rather than mean: one booking accepted after a night's sleep would
 * drag an average into uselessness, and the figure is meant to describe the
 * typical wait a customer can expect.
 */
function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

/**
 * Module 19 — Provider Ranking.
 *
 * Reusable rank engine shared by automatic hooks (job completion, review
 * create/update/delete) and manual admin recalculation — there is exactly
 * one evaluation path. Idempotent: unchanged ranks only refresh the stored
 * snapshot, they never append history rows or send duplicate notifications.
 */
@Injectable()
export class RankingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    private readonly realtime: RealtimeService,
    private readonly logger: Logger,
  ) {}

  // ─── Evaluation ──────────────────────────────────────────────────────

  /**
   * Recalculate a provider's rank from their current completed-job count and
   * average rating, persist the snapshot, record any change and notify.
   * Non-provider IDs are ignored (safe to call from any event hook).
   */
  async evaluateProviderRank(providerId: string, reason?: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: providerId },
      select: { role: true, roles: true },
    });
    if (!user || !hasRole(user, UserRole.PROVIDER)) return null;

    const [completedJobs, ratingSummary] = await Promise.all([
      this.prisma.booking.count({
        where: {
          providerId,
          status: BookingStatus.COMPLETED,
          // Only customer-confirmed completions count toward a rank — a
          // provider-marked completion that was never confirmed is not a
          // finished job.
          confirmedAt: { not: null },
        },
      }),
      this.prisma.ratingSummary.findUnique({
        where: { userId: providerId },
      }),
    ]);

    const averageRating = ratingSummary?.averageRating.toNumber() ?? 0;
    const newRank = highestQualifyingRank(completedJobs, averageRating);
    const now = new Date();

    const existing = await this.prisma.providerRanking.findUnique({
      where: { providerId },
    });

    // No rank change → refresh the snapshot only. This keeps repeated
    // evaluations (and unrelated events) from spamming history.
    if (existing && existing.currentRank === newRank) {
      return this.prisma.providerRanking.update({
        where: { providerId },
        data: {
          completedJobs,
          averageRating,
          lastEvaluatedAt: now,
        },
      });
    }

    const isUpgrade =
      !existing || rankOrder(newRank) > rankOrder(existing.currentRank);
    const fromRank = existing?.currentRank ?? ProviderRank.NONE;

    const ranking = await this.prisma.providerRanking.upsert({
      where: { providerId },
      create: {
        providerId,
        currentRank: newRank,
        completedJobs,
        averageRating,
        rankAchievedAt: newRank === ProviderRank.NONE ? null : now,
        lastEvaluatedAt: now,
      },
      update: {
        currentRank: newRank,
        completedJobs,
        averageRating,
        rankAchievedAt: newRank === ProviderRank.NONE ? null : now,
        lastEvaluatedAt: now,
      },
    });

    // Immutable audit trail of the change. The 60s window dedupes the rare
    // case where two event hooks (e.g. review update + job completion) fire
    // concurrently and both saw the old rank — only one history row and one
    // notification result.
    const duplicateChange = await this.prisma.providerRankHistory.findFirst({
      where: {
        providerId,
        fromRank,
        toRank: newRank,
        changedAt: { gte: new Date(Date.now() - 60_000) },
      },
    });

    if (!duplicateChange) {
      await this.prisma.providerRankHistory.create({
        data: {
          providerId,
          fromRank,
          toRank: newRank,
          completedJobs,
          averageRating,
          reason:
            reason ??
            (isUpgrade
              ? "Provider now meets a higher rank's criteria"
              : "Provider no longer meets their rank's criteria"),
        },
      });

      // Realtime: provider.rank.updated on the provider's private channel.
      // Published AFTER the history row is committed — never before.
      // RealtimeService.publish never rejects; failures are logged + swallowed.
      void this.realtime.publishRankUpdated(providerId, {
        providerId,
        previousRank: fromRank,
        newRank,
        timestamp: now,
      });

      // Notify the provider
      void this.notifications.send({
        userId: providerId,
        type: isUpgrade
          ? NotificationType.RANK_UPGRADED
          : NotificationType.RANK_DOWNGRADED,
        title: isUpgrade
          ? `Rank upgraded: ${RANK_LABELS[newRank]} ${RANK_EMOJI[newRank]}`
          : `Rank updated: ${RANK_LABELS[newRank]}`,
        message:
          newRank === ProviderRank.NONE
            ? `Your provider rank was removed — your completed jobs / average rating no longer meet the ${RANK_LABELS[fromRank]} criteria. Keep delivering great work to earn it back!`
            : isUpgrade
              ? `Congratulations! You reached ${RANK_LABELS[newRank]} rank ${RANK_EMOJI[newRank]} (${completedJobs} completed jobs, ${averageRating.toFixed(2)}★ average).`
              : `Your rank changed from ${RANK_LABELS[fromRank]} to ${RANK_LABELS[newRank]}. It is based on completed jobs (${completedJobs}) and average rating (${averageRating.toFixed(2)}★).`,
        relatedEntityType: "PROVIDER",
        relatedEntityId: providerId,
      });
    }

    this.logger.log({
      message: "Provider rank changed",
      providerId,
      fromRank,
      toRank: newRank,
      completedJobs,
      averageRating,
      isUpgrade,
    });

    return ranking;
  }

  /**
   * Recalculate every provider (admin "recalculate all"). Uses the exact
   * same evaluation path as the automatic hooks.
   */
  async evaluateAllProviders(): Promise<{ evaluated: number }> {
    const providers = await this.prisma.user.findMany({
      where: { roles: { has: UserRole.PROVIDER } },
      select: { id: true },
    });

    let evaluated = 0;
    for (const provider of providers) {
      try {
        await this.evaluateProviderRank(
          provider.id,
          "Bulk admin recalculation",
        );
        evaluated++;
      } catch (err) {
        const error = err as { message?: string };
        this.logger.error(
          { err: error, providerId: provider.id },
          "Rank recalculation failed for provider",
        );
      }
    }

    this.logger.log({
      message: "Bulk rank recalculation finished",
      evaluated,
      total: providers.length,
    }); // Admin dashboard refresh (ranks feed analytics.providers)
    void this.realtime.publishAnalyticsUpdated("ranks_recalculated");

    return { evaluated };
  }

  // ─── Reads (provider) ────────────────────────────────────────────────

  async getMyRank(providerId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: providerId },
      select: { role: true, roles: true },
    });
    if (!user || !hasRole(user, UserRole.PROVIDER)) {
      return null;
    }

    const [ranking, performance] = await Promise.all([
      this.prisma.providerRanking.findUnique({ where: { providerId } }),
      this.getPerformance(providerId),
    ]);

    if (!ranking) {
      return {
        providerId,
        rank: ProviderRank.NONE,
        rankLabel: RANK_LABELS[ProviderRank.NONE],
        completedJobs: 0,
        averageRating: 0,
        rankAchievedAt: null,
        lastEvaluatedAt: null,
        ...performance,
        benefits: tierBenefits(ProviderRank.NONE),
      };
    }

    return {
      providerId,
      rank: ranking.currentRank,
      rankLabel: RANK_LABELS[ranking.currentRank],
      completedJobs: ranking.completedJobs,
      averageRating: ranking.averageRating,
      rankAchievedAt: ranking.rankAchievedAt,
      lastEvaluatedAt: ranking.lastEvaluatedAt,
      ...performance,
      benefits: tierBenefits(ranking.currentRank),
    };
  }

  /**
   * The two figures the rank screen shows beside the tier: how reliably this
   * provider finishes what they take on, and how quickly they answer.
   *
   * Both are derived from the bookings themselves rather than stored on
   * `ProviderRanking`. They are read on one screen by one provider at a time,
   * so a live count costs nothing worth denormalising for — and a stored copy
   * would need invalidating on every booking transition.
   */
  private async getPerformance(providerId: string) {
    const [settled, completed, accepted] = await Promise.all([
      this.prisma.booking.count({
        where: { providerId, status: { in: SETTLED_BOOKING_STATUSES } },
      }),
      this.prisma.booking.count({
        where: { providerId, status: BookingStatus.COMPLETED },
      }),
      // Only the most recent hundred: a provider's current responsiveness is
      // the useful figure, and their first month two years ago is not part of
      // it.
      this.prisma.booking.findMany({
        where: { providerId, acceptedAt: { not: null } },
        select: { createdAt: true, acceptedAt: true },
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
    ]);

    const responseMinutes = median(
      accepted
        .map((booking) =>
          Math.round(
            (booking.acceptedAt!.getTime() - booking.createdAt.getTime()) /
              60_000,
          ),
        )
        // A clock skew between rows can produce a negative gap; it describes
        // nothing real and would pull the median below zero.
        .filter((minutes) => minutes >= 0),
    );

    return {
      /**
       * Percentage of settled bookings that were completed, or null for a
       * provider who has not settled one yet — "0%" would read as a record of
       * failure rather than an absence of history.
       */
      completionRate:
        settled === 0 ? null : Math.round((completed / settled) * 100),
      /** Median minutes from booking to acceptance, or null if never measured. */
      responseTimeMinutes: responseMinutes,
    };
  }

  async getMyRankHistory(providerId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.providerRankHistory.findMany({
        where: { providerId },
        skip,
        take: limit,
        orderBy: { changedAt: "desc" },
      }),
      this.prisma.providerRankHistory.count({ where: { providerId } }),
    ]);

    const totalPages = Math.ceil(total / limit);
    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  // ─── Reads (admin) ───────────────────────────────────────────────────

  async listRankings(query: {
    page?: number;
    limit?: number;
    rank?: ProviderRank;
    search?: string;
  }) {
    const { page = 1, limit = 10, rank, search } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ProviderRankingWhereInput = {
      ...(rank && { currentRank: rank }),
      ...(search && {
        provider: {
          OR: [
            { fullName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        },
      }),
    };

    const [data, total] = await Promise.all([
      this.prisma.providerRanking.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ currentRank: "desc" }, { completedJobs: "desc" }],
        include: {
          provider: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
              profilePhoto: true,
              verificationStatus: true,
            },
          },
        },
      }),
      this.prisma.providerRanking.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);
    return {
      data: data.map((r) => ({
        ...r,
        rankLabel: RANK_LABELS[r.currentRank],
        provider: r.provider,
      })),
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  async getRankStats() {
    const groups = await this.prisma.providerRanking.groupBy({
      by: ["currentRank"],
      _count: { _all: true },
    });
    const totalProviders = await this.prisma.user.count({
      where: { roles: { has: UserRole.PROVIDER } },
    });

    const byRank: Record<string, number> = {};
    for (const tier of RANK_TIERS) {
      byRank[tier.rank] = 0;
    }
    byRank[ProviderRank.NONE] = 0;
    for (const g of groups) {
      byRank[g.currentRank] = g._count?._all ?? 0;
    }

    const rankedProviders = Object.entries(byRank)
      .filter(([rank]) => rank !== ProviderRank.NONE)
      .reduce((sum, [, count]) => sum + count, 0);

    return {
      totalProviders,
      rankedProviders,
      unrankedProviders: totalProviders - rankedProviders,
      byRank,
      thresholds: RANK_TIERS,
    };
  }
}
