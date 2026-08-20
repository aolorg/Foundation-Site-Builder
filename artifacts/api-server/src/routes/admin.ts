import {
  Router,
  type IRouter,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { timingSafeEqual } from "node:crypto";
import { desc } from "drizzle-orm";
import { db, contactSubmissionsTable } from "@workspace/db";
import {
  AdminLoginBody,
  AdminLoginResponse,
  AdminLogoutResponse,
  AdminSessionResponse,
  ListContactSubmissionsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const COOKIE_NAME = "admin_session";
const SESSION_VALUE = "ok";
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

// Brute-force protection: cap failed login attempts per IP per window.
const LOGIN_WINDOW_MS = 15 * 60_000;
const LOGIN_MAX_ATTEMPTS = 10;
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of loginAttempts) {
    if (now > entry.resetAt) loginAttempts.delete(ip);
  }
}, LOGIN_WINDOW_MS).unref();

function loginBlocked(ip: string): boolean {
  const entry = loginAttempts.get(ip);
  return !!entry && Date.now() <= entry.resetAt && entry.count >= LOGIN_MAX_ATTEMPTS;
}

function recordFailedLogin(ip: string): void {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
  } else {
    entry.count += 1;
  }
}

function isAuthed(req: Request): boolean {
  return req.signedCookies?.[COOKIE_NAME] === SESSION_VALUE;
}

function constantTimeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf-8");
  const bb = Buffer.from(b, "utf-8");
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!isAuthed(req)) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  next();
}

router.post("/admin/login", (req, res): void => {
  const ip = req.ip ?? "unknown";
  if (loginBlocked(ip)) {
    req.log.warn({ ip }, "Admin login blocked (too many attempts)");
    res
      .status(429)
      .json({ error: "Too many attempts. Please wait a few minutes and try again." });
    return;
  }

  const parsed = AdminLoginBody.safeParse(req.body);
  const expected = process.env["ADMIN_PASSWORD"];

  if (!expected) {
    req.log.error("ADMIN_PASSWORD is not configured");
    res.status(401).json({ error: "Admin login is not set up yet." });
    return;
  }

  if (!parsed.success || !constantTimeEqual(parsed.data.password, expected)) {
    recordFailedLogin(ip);
    req.log.warn({ ip }, "Failed admin login attempt");
    res.status(401).json({ error: "Incorrect password." });
    return;
  }

  loginAttempts.delete(ip);
  res.cookie(COOKIE_NAME, SESSION_VALUE, {
    signed: true,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env["NODE_ENV"] === "production",
    maxAge: SESSION_MAX_AGE_MS,
    path: "/",
  });
  res.json(AdminLoginResponse.parse({ authenticated: true }));
});

router.post("/admin/logout", (_req, res): void => {
  res.clearCookie(COOKIE_NAME, { path: "/" });
  res.json(AdminLogoutResponse.parse({ authenticated: false }));
});

router.get("/admin/session", (req, res): void => {
  res.json(AdminSessionResponse.parse({ authenticated: isAuthed(req) }));
});

router.get(
  "/admin/submissions",
  requireAdmin,
  async (_req, res): Promise<void> => {
    const rows = await db
      .select()
      .from(contactSubmissionsTable)
      .orderBy(desc(contactSubmissionsTable.createdAt));
    res.json(ListContactSubmissionsResponse.parse(rows));
  },
);

export default router;
