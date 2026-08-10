-- Counter-offers: the customer proposes a different price on a provider's bid.
-- One round — the provider accepts (booking at counter_price) or declines
-- (bid returns to PENDING so the original offer can still be accepted).
ALTER TYPE "bid_status" ADD VALUE IF NOT EXISTS 'COUNTERED';

ALTER TYPE "notification_type" ADD VALUE IF NOT EXISTS 'BID_COUNTERED';
ALTER TYPE "notification_type" ADD VALUE IF NOT EXISTS 'COUNTER_ACCEPTED';
ALTER TYPE "notification_type" ADD VALUE IF NOT EXISTS 'COUNTER_DECLINED';

ALTER TABLE "bids" ADD COLUMN IF NOT EXISTS "counterPrice" DECIMAL(10,2);
ALTER TABLE "bids" ADD COLUMN IF NOT EXISTS "counterMessage" VARCHAR(500);
ALTER TABLE "bids" ADD COLUMN IF NOT EXISTS "counteredAt" TIMESTAMP(3);
