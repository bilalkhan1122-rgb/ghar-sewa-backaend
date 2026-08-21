# Ghar Sewa backend — working notes

NestJS + Prisma + Postgres (Neon), deployed to Vercel as a single serverless function.
Read [README.md](./README.md) for architecture before making changes.

---

# ⛔ DATABASE SAFETY — READ BEFORE ANY DATABASE COMMAND

**On 2026-08-21 the production database was destroyed by a single command.** Every user,
job, booking, wallet balance, chat message and review was lost. Neon's free tier keeps only
6 hours of history and the wipe was older than that, so nothing was recoverable.

The command was:

```bash
prisma migrate diff --from-migrations prisma/migrations \
  --to-schema-datamodel prisma/schema.prisma \
  --shadow-database-url "$DATABASE_URL"     # ← production
```

It was run to *verify a migration file was correct*. It reads as a safety check. It is not:
**Prisma drops and recreates the schema in the shadow database** before replaying migrations
into it. Pointing that at production deletes production.

## The rules

1. **Never pass a production URL to `--shadow-database-url`.** A shadow database is
   destroyed by design. It must be local, or a throwaway Neon branch — never anything from
   `.env` or `.env.migrate`.

2. **`.env.migrate` and `.env` contain production credentials only.** There is no local URL
   in them. Any command wanting a scratch database is one flag away from live data. Assume
   every URL in those files is production unless you have just read it and confirmed
   otherwise.

3. **Run migrations against local Postgres first.** Never author or test a migration against
   a remote database:

   ```bash
   npm run db:local:start          # starts postgres@16, creates the two local databases
   set -a && . ./.env.local.db && set +a
   npm run prisma:migrate:local    # guarded — refuses a non-local target
   ```

4. **To check a migration matches the schema, use the read-only form.** This only inspects
   and is safe against any database:

   ```bash
   prisma migrate diff --from-url "$DATABASE_URL" \
     --to-schema-datamodel prisma/schema.prisma --script
   # or: npm run prisma:verify
   ```

5. **The only command that may touch production is `prisma migrate deploy`**, and it is
   additive. Everything else — `migrate dev`, `migrate reset`, `db push`, any `--shadow-*`
   flag — is destructive and must never see a remote URL.

6. **Before running anything destructive, print the target and read it.**
   `node -e 'console.log(new URL(process.env.DATABASE_URL).hostname)'`
   If it is not `localhost`, stop.

7. **`npm run db:guard` is wired into the destructive scripts** and exits non-zero on a
   remote host. If you find yourself setting `ALLOW_REMOTE_DB=i-understand` to get past it,
   that is the moment to stop and ask a human, not to proceed.

## Backups

Neon free tier = **6 hours** of history. That is not a backup; it is a brief grace period.
Anything that matters needs a real dump before it is touched:

```bash
pg_dump "$DATABASE_URL" -Fc -f backup-$(date +%Y%m%d-%H%M).dump
```

Take one before every production migration, without exception.

---

## Deploys

Vercel deploys from `main`. **Migrations do NOT run automatically** — `postinstall` is
`prisma generate` (client only) and `build` is `nest build`. Nothing runs `migrate deploy`.

Order is always **migrate first, then deploy**. Deploying code that expects columns which do
not exist fails closed on the job-creation path, not just on the new feature.

Production has no `_prisma_migrations` table, so `migrate deploy` returns `P3005` until the
database is baselined with `prisma migrate resolve --applied <name>` for each historical
migration. Do that deliberately, with a dump taken first.

## Scheduled work

`@nestjs/schedule` `@Cron` decorators **do not run on Vercel** — a serverless function only
exists while serving a request. Two such jobs exist (booking cleanup, penalties) and are
almost certainly dead in production. Real scheduled work goes in `vercel.json` `crons`
calling a `@Public` endpoint guarded by `CRON_SECRET`.

## Background work

A promise left running after the response is killed. `void somePromise()` after the reply
silently does nothing on Vercel — `await` anything that must complete.

## Before finishing any change

```bash
npx tsc --noEmit -p tsconfig.json && npx eslint src && npx jest
```

All three must be clean. For anything touching routes, boot the real Vercel entrypoint and
probe it — a route registered in `dist` is not the same as a route Vercel will serve. Note
that `create-app.ts` sets a global prefix of `api/v1`, which controller paths do not show.
