import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

// Durable shared budget for public AI requests; the key comes from the direct
// peer address, never an untrusted forwarded header.
export const aiChatRateLimitsTable = pgTable("ai_chat_rate_limits", {
  clientKey: text("client_key").primaryKey(),
  windowStartedAt: timestamp("window_started_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  requestCount: integer("request_count").notNull().default(0),
});
