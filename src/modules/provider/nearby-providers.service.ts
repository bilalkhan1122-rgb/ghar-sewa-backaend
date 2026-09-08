import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import {
  Prisma,
  UserRole,
  UserStatus,
  VerificationStatus,
} from "generated/prisma/client";
import { NearbyProvidersQueryDto } from "./dtos/nearby-providers-query.dto";
import {
  BUSY_BOOKING_STATUSES,
  coarseCoordinate,
  isProviderBusy,
  LOCATION_TTL_MS,
  NEARBY_CANDIDATE_LIMIT,
  NEARBY_DEFAULT_LIMIT,
  NEARBY_DEFAULT_RADIUS_KM,
  PRESENCE_TTL_MS,
} from "./provider-presence.config";

/**
 * Nearby Online Providers — the Uber-style "who is close and free" search.
 *
 * Distance is computed and filtered by Postgres (cube + earthdistance), never
 * in application memory: the radius query below asks the database for the
 * provider ids inside the circle, already sorted nearest-first. Everything
 * that decides whether a provider is *bookable* (verified, online, free, in
 * the right category) is applied afterwards as a plain Prisma filter so the
 * rules stay readable and unit-testable.
 *
 * What leaves this service is deliberately sparse: identity, rating, rank,
 * distance and an ~1 km grid cell — no exact coordinates, no contact details.
 */
@Injectable()
export class NearbyProvidersService {
  constructor(private readonly prisma: PrismaService) {}

  async findNearbyProviders(params: NearbyProvidersQueryDto) {
    const radiusKm = params.radiusKm ?? NEARBY_DEFAULT_RADIUS_KM;
    const limit = params.limit ?? NEARBY_DEFAULT_LIMIT;

    const candidates = await this.queryNearbyCandidates(
      params.latitude,
      params.longitude,
      radiusKm,
    );

    if (candidates.length === 0) {
      return { data: [], meta: { total: 0, radiusKm } };
    }

    const providerIds = candidates.map((c) => c.providerId);

    const presenceCutoff = new Date(Date.now() - PRESENCE_TTL_MS);
    const locationCutoff = new Date(Date.now() - LOCATION_TTL_MS);

    // Visibility rules, mirroring what booking requires of a provider: they
    // must be a real, verified, complete, online provider with a fresh
    // location — and (when asked) offering exactly the requested service.
    // Busy is left out of the database filter because of the AVAILABLE
    // override; it is resolved per provider below.
    const users = await this.prisma.user.findMany({
      where: {
        id: { in: providerIds },
        roles: { has: UserRole.PROVIDER },
        isActive: true,
        status: UserStatus.ACTIVE,
        verificationStatus: VerificationStatus.APPROVED,
        profileCompleted: true,
        providerProfile: {
          isOnline: true,
          lastOnlineAt: { gte: presenceCutoff },
          locationUpdatedAt: { gte: locationCutoff },
          latitude: { not: null },
          longitude: { not: null },
          ...(params.categoryId
            ? { categories: { some: { categoryId: params.categoryId } } }
            : {}),
        },
      },
      include: {
        ratingSummary: true,
        providerRanking: true,
        providerProfile: {
          include: {
            categories: {
              include: { category: { select: { id: true, name: true } } },
            },
          },
        },
      },
    });

    // One grouped count instead of a per-row query: how many engagements are
    // pinning each candidate to work right now.
    const engagementCounts = await this.prisma.booking.groupBy({
      by: ["providerId"],
      where: {
        providerId: { in: providerIds },
        status: { in: BUSY_BOOKING_STATUSES },
      },
      _count: { _all: true },
    });
    const engagementsByProvider = new Map(
      engagementCounts.map((row) => [row.providerId, row._count._all]),
    );

    const userById = new Map(users.map((u) => [u.id, u]));
    const distanceById = new Map(
      candidates.map((c) => [c.providerId, Number(c.distanceKm)]),
    );

    // Candidates arrive nearest-first from the database; walking that order
    // keeps the sort correct even though the Prisma fetch returned unordered.
    const data: NearbyProviderRow[] = [];
    for (const candidate of candidates) {
      const user = userById.get(candidate.providerId);
      if (!user) continue; // excluded by the visibility rules above

      const profile = user.providerProfile;
      const activeEngagements = engagementsByProvider.get(user.id) ?? 0;
      if (isProviderBusy(profile?.busyOverride, activeEngagements)) continue;

      data.push({
        providerId: user.id,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
        rating: Number(user.ratingSummary?.averageRating ?? 0),
        totalReviews: user.ratingSummary?.totalReviews ?? 0,
        rank: user.providerRanking?.currentRank ?? "NONE",
        distanceKm: roundToTwo(distanceById.get(user.id) ?? 0),
        approximateLocation:
          profile?.latitude != null && profile.longitude != null
            ? {
                latitude: coarseCoordinate(profile.latitude),
                longitude: coarseCoordinate(profile.longitude),
              }
            : null,
        isOnline: true,
        isBusy: false,
        availability: "available",
        categories: (profile?.categories ?? []).map((pc) => pc.category),
      });

      if (data.length >= limit) break;
    }

    return { data, meta: { total: data.length, radiusKm } };
  }

  /**
   * The geospatial part, done entirely by the database: providers whose
   * current fix falls inside the radius, nearest first. `latitude` /
   * `longitude` NULLs are naturally skipped by the GiST expression index.
   */
  private queryNearbyCandidates(
    latitude: number,
    longitude: number,
    radiusKm: number,
  ) {
    const radiusMeters = radiusKm * 1000;

    return this.prisma.$queryRaw<
      Array<{ providerId: string; distanceKm: number }>
    >(Prisma.sql`
      SELECT
        pp."userId" AS "providerId",
        (earth_distance(
          ll_to_earth(${latitude}, ${longitude}),
          ll_to_earth(pp."latitude", pp."longitude")
        ) / 1000.0) AS "distanceKm"
      FROM "provider_profiles" AS pp
      WHERE pp."latitude" IS NOT NULL
        AND pp."longitude" IS NOT NULL
        AND earth_box(ll_to_earth(${latitude}, ${longitude}), ${radiusMeters})
            @> ll_to_earth(pp."latitude", pp."longitude")
        AND earth_distance(
              ll_to_earth(${latitude}, ${longitude}),
              ll_to_earth(pp."latitude", pp."longitude")
            ) <= ${radiusMeters}
      ORDER BY "distanceKm" ASC
      LIMIT ${NEARBY_CANDIDATE_LIMIT}
    `);
  }
}

export interface NearbyProviderRow {
  providerId: string;
  fullName: string;
  profilePhoto: string | null;
  rating: number;
  totalReviews: number;
  rank: string;
  distanceKm: number;
  approximateLocation: { latitude: number; longitude: number } | null;
  isOnline: boolean;
  isBusy: boolean;
  availability: string;
  categories: { id: string; name: string }[];
}

function roundToTwo(value: number): number {
  return Number(value.toFixed(2));
}
