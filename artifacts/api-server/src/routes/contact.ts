import { Router, type IRouter } from "express";
import { db, contactSubmissionsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";
import { sendContactNotification } from "../lib/gmail";

const router: IRouter = Router();

// Lightweight in-memory rate limiter to curb spam/abuse of this public,
// unauthenticated, mail-sending endpoint. Allows a small burst per IP per window.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// Periodically clear expired entries so the map doesn't grow unbounded.
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of hits) {
    if (now > entry.resetAt) hits.delete(ip);
  }
}, RATE_LIMIT_WINDOW_MS).unref();

router.post("/contact", async (req, res): Promise<void> => {
  const ip = req.ip ?? "unknown";
  if (isRateLimited(ip)) {
    req.log.warn({ ip }, "Contact submission rate limited");
    res
      .status(429)
      .json({ error: "Too many messages sent. Please try again in a minute." });
    return;
  }

  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid contact submission");
    res.status(400).json({ error: "Please fill in all required fields correctly." });
    return;
  }

  const { name, email, phone, inquiryType, message } = parsed.data;

  await db.insert(contactSubmissionsTable).values({
    name,
    email,
    phone: phone ?? null,
    inquiryType,
    message,
  });

  try {
    await sendContactNotification({ name, email, phone, inquiryType, message });
  } catch (err) {
    // The submission is already saved to the database, so we don't fail the
    // request if the email notification can't be sent (e.g. Gmail not yet
    // connected). Log it so it can be followed up.
    req.log.error({ err }, "Failed to send contact email notification");
  }

  res.status(201).json({ success: true });
});

export default router;
