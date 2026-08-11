-- One conversation per customer/provider pair, instead of one per job.
-- Chatting with the same person about a second job used to open a fresh empty
-- thread and lose the history, which is not how people expect messaging to work.

-- The surviving thread for each pair is the earliest one, so history reads in order.
CREATE TEMP TABLE conversation_keep AS
SELECT DISTINCT ON ("customerId", "providerId") id, "customerId", "providerId"
FROM conversations
ORDER BY "customerId", "providerId", "createdAt" ASC;

-- Move every message onto the surviving thread before anything is deleted.
UPDATE messages m
SET "conversationId" = k.id
FROM conversations c
JOIN conversation_keep k
  ON k."customerId" = c."customerId" AND k."providerId" = c."providerId"
WHERE m."conversationId" = c.id AND c.id <> k.id;

DELETE FROM conversations c
USING conversation_keep k
WHERE k."customerId" = c."customerId"
  AND k."providerId" = c."providerId"
  AND c.id <> k.id;

-- Refresh the list preview on merged threads, which may now end on a message
-- that came from one of the absorbed conversations.
UPDATE conversations c
SET "lastMessage" = latest.content,
    "lastMessageAt" = latest."createdAt",
    "lastActivity" = latest."createdAt"
FROM (
  SELECT DISTINCT ON ("conversationId") "conversationId", content, "createdAt"
  FROM messages
  ORDER BY "conversationId", "createdAt" DESC
) latest
WHERE latest."conversationId" = c.id;

DROP INDEX IF EXISTS "conversations_jobId_customerId_providerId_key";
CREATE UNIQUE INDEX "conversations_customerId_providerId_key"
  ON conversations ("customerId", "providerId");
