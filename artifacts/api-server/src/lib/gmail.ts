import { google } from "googleapis";

interface ConnectionSettings {
  settings?: {
    access_token?: string;
    expires_at?: string;
    oauth?: { credentials?: { access_token?: string; expires_at?: string } };
  };
}

let connectionSettings: ConnectionSettings | undefined;

async function getAccessToken(): Promise<string> {
  const existing =
    connectionSettings?.settings?.access_token ??
    connectionSettings?.settings?.oauth?.credentials?.access_token;
  const expiresAt =
    connectionSettings?.settings?.expires_at ??
    connectionSettings?.settings?.oauth?.credentials?.expires_at;

  if (existing && expiresAt && new Date(expiresAt).getTime() > Date.now()) {
    return existing;
  }

  const hostname = process.env["REPLIT_CONNECTORS_HOSTNAME"];
  const xReplitToken = process.env["REPL_IDENTITY"]
    ? "repl " + process.env["REPL_IDENTITY"]
    : process.env["WEB_REPL_RENEWAL"]
      ? "depl " + process.env["WEB_REPL_RENEWAL"]
      : null;

  if (!hostname || !xReplitToken) {
    throw new Error("Replit connector environment not available");
  }

  const response = await fetch(
    `https://${hostname}/api/v2/connection?include_secrets=true&connector_names=google-mail`,
    {
      headers: {
        Accept: "application/json",
        X_REPLIT_TOKEN: xReplitToken,
      },
    },
  );

  const data = (await response.json()) as { items?: ConnectionSettings[] };
  connectionSettings = data.items?.[0];

  const accessToken =
    connectionSettings?.settings?.access_token ??
    connectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!accessToken) {
    throw new Error("Gmail is not connected");
  }

  return accessToken;
}

export async function getUncachableGmailClient() {
  const accessToken = await getAccessToken();
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  return google.gmail({ version: "v1", auth: oauth2Client });
}

function sanitizeHeaderValue(value: string): string {
  // Strip CR/LF and other control characters to prevent header injection
  // (an attacker could otherwise smuggle Bcc/Cc or extra body via \r\n).
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\r\n\u0000-\u001F\u007F]+/g, " ").trim();
}

function encodeHeader(value: string): string {
  const safe = sanitizeHeaderValue(value);
  // RFC 2047 encode non-ASCII header values so names/subjects render correctly.
  if (/^[\x20-\x7E]*$/.test(safe)) return safe;
  return `=?UTF-8?B?${Buffer.from(safe, "utf-8").toString("base64")}?=`;
}

function buildRawMessage(opts: {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
}): string {
  const lines = [
    `To: ${sanitizeHeaderValue(opts.to)}`,
    `From: ${encodeHeader(opts.from)}`,
    ...(opts.replyTo ? [`Reply-To: ${sanitizeHeaderValue(opts.replyTo)}`] : []),
    `Subject: ${encodeHeader(opts.subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    opts.text,
  ];
  return Buffer.from(lines.join("\r\n"), "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export interface ContactNotification {
  name: string;
  email: string;
  phone?: string | null;
  inquiryType: string;
  message: string;
}

export async function sendContactNotification(
  data: ContactNotification,
): Promise<void> {
  const gmail = await getUncachableGmailClient();

  const profile = await gmail.users.getProfile({ userId: "me" });
  const account = profile.data.emailAddress;
  if (!account) {
    throw new Error("Could not resolve connected Gmail address");
  }

  const text = [
    "New message from the Arena of Life Foundation website.",
    "",
    `Name:         ${data.name}`,
    `Email:        ${data.email}`,
    `Phone:        ${data.phone?.trim() ? data.phone : "—"}`,
    `Inquiry type: ${data.inquiryType}`,
    "",
    "Message:",
    data.message,
    "",
    "—",
    "Reply directly to this email to respond to the sender.",
  ].join("\n");

  const raw = buildRawMessage({
    to: account,
    from: `Arena of Life Website <${account}>`,
    replyTo: data.email,
    subject: `Website inquiry: ${data.inquiryType} — ${data.name}`,
    text,
  });

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw },
  });
}
