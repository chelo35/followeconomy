// app router
import { NextRequest, NextResponse } from "next/server";

type NewsItem = {
  id: string;
  title: string;
  summary?: string;
  url?: string;
  source?: string;
  ts: number;        // epoch ms
};

// basit in-memory store (Vercel'de kalıcı değil; DB ekleriz)
let breaking: NewsItem | null = null;
let items: NewsItem[] = [];

export async function GET() {
  return NextResponse.json({ breaking, items });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const now = Date.now();
  const item: NewsItem = {
    id: body.id ?? crypto.randomUUID(),
    title: body.title ?? "Untitled",
    summary: body.summary ?? "",
    url: body.url ?? "",
    source: body.source ?? "FollowEconomy",
    ts: body.ts ?? now,
  };

  // kural: yeni gelen mavi alana, eski breaking yeşil kuyruğa iner
  if (breaking) items = [breaking, ...items];
  breaking = item;

  // hafif limit
  items = items.slice(0, 200);
  return NextResponse.json({ ok: true, breaking, items });
}