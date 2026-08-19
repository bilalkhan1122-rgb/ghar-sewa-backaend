/**
 * Creates the missing zeroed rating summaries for existing providers.
 *
 *   npx ts-node scripts/backfill-rating-summaries.ts
 *
 * Rating summaries used to be created lazily, by the first review a provider
 * received. Providers who had never been reviewed therefore had no row at all,
 * and "Top rated" orders on it — the LEFT JOIN produced NULL, and Postgres
 * sorts NULLs first on DESC, so unrated providers filled page one ahead of the
 * best-rated ones.
 *
 * `completeProfile` now creates the row up front, so this is only needed once,
 * for providers who signed up before that change. It is safe to re-run: rows
 * that already exist are left exactly as they are.
 *
 * Point DATABASE_URL at the right database before running, e.g.
 *   set -a && . ./.env.migrate && set +a && npx ts-node scripts/backfill-rating-summaries.ts
 */
import { PrismaClient, UserRole } from "../generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  const providers = await prisma.user.findMany({
    where: { role: UserRole.PROVIDER, ratingSummary: { is: null } },
    select: { id: true, fullName: true },
  });

  if (providers.length === 0) {
    console.log("Every provider already has a rating summary. Nothing to do.");
    return;
  }

  const { count } = await prisma.ratingSummary.createMany({
    data: providers.map((provider) => ({ userId: provider.id })),
    skipDuplicates: true,
  });

  console.log(`Created ${count} rating summar${count === 1 ? "y" : "ies"}:`);
  for (const provider of providers) {
    console.log(`  ${provider.fullName} (${provider.id})`);
  }
}

main()
  .catch((error) => {
    console.error(
      `\n${error instanceof Error ? error.message : String(error)}`,
    );
    process.exitCode = 1;
  })
  .finally(() => void prisma.$disconnect());
