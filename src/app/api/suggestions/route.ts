import type { NextRequest } from "next/server";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/\r/g, "").trim().slice(0, max) : "";

const oneLine = (value: string) => value.replace(/\s+/g, " ");

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clean(body.website, 200)) {
    return Response.json({ ok: true });
  }

  const message = clean(body.message, 2000);
  const name = oneLine(clean(body.name, 80));
  const email = oneLine(clean(body.email, 120));
  const about = oneLine(clean(body.about, 100)) || "General";

  if (message.length < 5) {
    return Response.json(
      { error: "Please write a little more (at least 5 characters)." },
      { status: 400 }
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "That email address looks invalid." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "Too many suggestions in a short time. Please try again later." },
      { status: 429 }
    );
  }

  const text = [
    `About: ${about}`,
    `From: ${name || "Anonymous"}${email ? ` <${email}>` : ""}`,
    "",
    message,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SUGGESTION_TO_EMAIL;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[suggestion - email not configured]\n" + text);
      return Response.json({ ok: true });
    }
    console.error("Suggestions: RESEND_API_KEY / SUGGESTION_TO_EMAIL not set");
    return Response.json(
      { error: "Suggestions are temporarily unavailable." },
      { status: 503 }
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio Suggestions <onboarding@resend.dev>",
      to: [to],
      subject: `Portfolio suggestion — ${about}`,
      text,
      ...(email ? { reply_to: email } : {}),
    }),
  });

  if (!res.ok) {
    console.error("Suggestions: Resend error", res.status, await res.text());
    return Response.json(
      { error: "Couldn't send your suggestion. Please try again." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
