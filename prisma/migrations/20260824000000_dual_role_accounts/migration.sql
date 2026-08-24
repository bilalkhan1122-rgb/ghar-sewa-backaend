-- Dual-role accounts: one login, two profiles.
--
-- `role` keeps its meaning (the role the account was created as) so admin
-- screens and reporting are unaffected. `roles` is the new answer to "what may
-- this account do", and `activeRole` is the mode the app is currently in — the
-- only thing the Settings switch changes.
--
-- Additive throughout: existing rows are backfilled to exactly the single role
-- they already had, so behaviour is unchanged until someone adds a second one.

ALTER TABLE "users"
  ADD COLUMN "roles" "user_role"[] NOT NULL DEFAULT ARRAY[]::"user_role"[],
  ADD COLUMN "activeRole" "user_role" NOT NULL DEFAULT 'CUSTOMER';

UPDATE "users" SET "roles" = ARRAY["role"], "activeRole" = "role";

-- A wallet per role rather than per user, so provider earnings and customer
-- spending keep separate balances on the same account. Existing wallets are
-- already typed, so the composite key is satisfied by the rows as they stand.
DROP INDEX "wallets_userId_key";

CREATE UNIQUE INDEX "wallets_userId_type_key" ON "wallets"("userId", "type");
CREATE INDEX "wallets_userId_idx" ON "wallets"("userId");
