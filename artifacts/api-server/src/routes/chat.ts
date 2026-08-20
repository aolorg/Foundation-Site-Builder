import { Router, type IRouter } from "express";
import OpenAI from "openai";
import { SendChatBody } from "@workspace/api-zod";
import { pool } from "@workspace/db";
import { FOUNDATION_KNOWLEDGE } from "../lib/chat-knowledge";

// Replit AI Integrations proxy — its managed credentials mean no visitor or
// founder API key is needed in the application.
function getChatClient(): { client: OpenAI; model: string } | null {
  const proxyBase = process.env["AI_INTEGRATIONS_OPENAI_BASE_URL"];
  const proxyKey = process.env["AI_INTEGRATIONS_OPENAI_API_KEY"];
  if (!proxyBase || !proxyKey) return null;
  return {
    client: new OpenAI({ apiKey: proxyKey, baseURL: proxyBase }),
    model: "gpt-5.6-luna",
  };
}

const router: IRouter = Router();
const RATE_LIMIT_MAX = 20;
const MAX_RESPONSE_CHARACTERS = 1200;

async function isRateLimited(connectionAddress: string): Promise<boolean> {
  const result = await pool.query<{ request_count: number }>(
    `INSERT INTO ai_chat_rate_limits (client_key, window_started_at, request_count)
     VALUES ($1, NOW(), 1)
     ON CONFLICT (client_key) DO UPDATE
     SET window_started_at = CASE
           WHEN ai_chat_rate_limits.window_started_at <= NOW() - INTERVAL '1 minute' THEN NOW()
           ELSE ai_chat_rate_limits.window_started_at
         END,
         request_count = CASE
           WHEN ai_chat_rate_limits.window_started_at <= NOW() - INTERVAL '1 minute' THEN 1
           ELSE ai_chat_rate_limits.request_count + 1
         END
     RETURNING request_count`,
    [connectionAddress],
  );
  return (result.rows[0]?.request_count ?? RATE_LIMIT_MAX + 1) > RATE_LIMIT_MAX;
}

const SYSTEM_PROMPT = `You are the friendly virtual assistant for the Arena of Life Foundation website. Answer visitor questions warmly, concisely (2-4 short sentences or a short list), and ONLY using the foundation information below. Match the foundation's tone: strong, encouraging, respectful.

Rules:
- Only answer questions about the foundation, its mission, programs, events, donations, contact info, and getting involved.
- If you don't know the answer, or the question needs a human (specific event dates, grant applications, personal situations, media, partnerships), say so honestly and tell the visitor you can pass their message to the founder — then ask them to use the "Leave a message" option in this chat.
- Never invent details (dates, amounts, names) that are not in the information below.
- For unrelated topics, politely steer back to the foundation.

FOUNDATION INFORMATION:
${FOUNDATION_KNOWLEDGE}`;

router.post("/chat", async (req, res): Promise<void> => {
  const parsed = SendChatBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid chat request." });
    return;
  }

  // app.ts trusts precisely the one Replit proxy hop, so req.ip is the
  // platform-derived visitor address rather than a caller-supplied header.
  const clientAddress = req.ip ?? "unknown";
  try {
    if (await isRateLimited(clientAddress)) {
      res.status(429).json({ error: "Too many messages. Please wait a moment and try again." });
      return;
    }
  } catch (err) {
    req.log.error({ err }, "Unable to enforce chat rate limit");
    res.status(503).json({
      error: "The assistant is temporarily unavailable. Please use the contact form instead.",
    });
    return;
  }

  const ai = getChatClient();
  if (!ai) {
    req.log.error("AI integration not configured");
    res.status(503).json({
      error: "The assistant is temporarily unavailable. Please use the contact form instead.",
    });
    return;
  }

  // Clients may only provide their own questions; the system prompt and
  // assistant responses remain trusted server-side instructions.
  const history = parsed.data.messages.slice(-10).map((m) => ({
    role: "user" as const,
    content: m.content,
  }));

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  // Stop spending credits when a visitor closes the chat panel or navigates
  // away while a streamed answer is still being generated.
  const abortController = new AbortController();
  const cancelOnDisconnect = () => {
    if (!res.writableEnded) abortController.abort();
  };
  res.on("close", cancelOnDisconnect);

  try {
    const stream = await ai.client.chat.completions.create(
      {
        model: ai.model,
        max_completion_tokens: 8192,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
        stream: true,
      },
      { signal: abortController.signal },
    );

    let responseLength = 0;
    for await (const chunk of stream) {
      if (abortController.signal.aborted) break;
      const content = chunk.choices[0]?.delta?.content;
      if (!content) continue;
      const remaining = MAX_RESPONSE_CHARACTERS - responseLength;
      if (remaining <= 0) {
        abortController.abort();
        break;
      }
      const safeContent = content.slice(0, remaining);
      responseLength += safeContent.length;
      res.write(`data: ${JSON.stringify({ content: safeContent })}\n\n`);
      if (responseLength >= MAX_RESPONSE_CHARACTERS) abortController.abort();
    }
    if (!abortController.signal.aborted) {
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    }
  } catch (err) {
    if (!abortController.signal.aborted) {
      req.log.error({ err }, "Chat completion failed");
      res.write(
        `data: ${JSON.stringify({ error: "Sorry, something went wrong. Please try again or leave a message." })}\n\n`,
      );
    }
  } finally {
    res.off("close", cancelOnDisconnect);
    if (!res.writableEnded && !res.destroyed) res.end();
  }
});
export default router;
