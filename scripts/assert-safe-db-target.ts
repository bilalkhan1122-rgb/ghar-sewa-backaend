/**
 * Refuses to let a destructive Prisma command point at a remote database.
 *
 *   npx ts-node scripts/assert-safe-db-target.ts DATABASE_URL SHADOW_DATABASE_URL
 *
 * Exists because of a real incident: on 2026-08-21 the production Neon URL was
 * passed as `--shadow-database-url`. Prisma drops and recreates the schema in a
 * shadow database before replaying migrations into it, so that single flag
 * destroyed every row in production — users, jobs, bookings, wallets, chat.
 * Neon's free tier keeps only 6 hours of history and the wipe was older than
 * that, so none of it came back.
 *
 * The trap is that the command reads as a harmless verification step. A rule in
 * a document would not have stopped it; a process that exits non-zero does.
 *
 * Local-only means localhost/127.0.0.1 over a non-TLS connection. Anything with
 * a remote host — neon.tech, amazonaws.com, supabase, or simply not localhost —
 * fails. Set ALLOW_REMOTE_DB=i-understand to override, which exists for the one
 * legitimate case (`prisma migrate deploy` against production) and is
 * deliberately awkward to type.
 */
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "0.0.0.0"]);

function hostOf(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function check(varName: string): void {
  const url = process.env[varName];
  if (!url) return;

  const host = hostOf(url);
  if (!host) {
    console.error(`\n✖ ${varName} is not a URL that can be parsed. Refusing to continue.\n`);
    process.exit(1);
  }

  if (LOCAL_HOSTS.has(host)) return;

  console.error(
    `\n✖ REFUSING TO RUN — ${varName} points at "${host}", which is not local.\n\n` +
      `  This command can drop and recreate the schema at that address.\n` +
      `  On 2026-08-21 exactly this wiped the production database; there was no\n` +
      `  usable backup.\n\n` +
      `  Run migrations against local Postgres first:\n` +
      `    npm run db:local:start\n` +
      `    npm run prisma:migrate:local\n\n` +
      `  If you genuinely mean to touch a remote database (a real deploy),\n` +
      `  set ALLOW_REMOTE_DB=i-understand and re-read what you are about to run.\n`,
  );
  process.exit(1);
}

if (process.env.ALLOW_REMOTE_DB === "i-understand") {
  console.warn("⚠ ALLOW_REMOTE_DB set — remote database operations permitted.");
} else {
  const names = process.argv.slice(2);
  (names.length > 0 ? names : ["DATABASE_URL", "SHADOW_DATABASE_URL"]).forEach(check);
}
