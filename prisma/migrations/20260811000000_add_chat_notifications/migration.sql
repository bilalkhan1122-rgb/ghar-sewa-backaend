-- Chat messages now raise notifications like every other event.
-- The chatEnabled preference already existed but no category mapped to it.
ALTER TYPE "notification_category" ADD VALUE IF NOT EXISTS 'CHAT';
ALTER TYPE "notification_type" ADD VALUE IF NOT EXISTS 'NEW_MESSAGE';
