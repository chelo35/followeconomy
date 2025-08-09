import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

type News = {
  id: string
  title: string
  summary?: string
  url?: string
  ts: number
  tags?: string[]
  source?: string
}

const KEY_BREAKING = 'news:breaking'
const KEY_RECENT = 'news:recent'

export async function GET() {
  const [breaking, recent] = await Promise.all([
    kv.get<News>(KEY_BREAKING),
    kv.lrange<News>(KEY_RECENT, 0, 99),
  ])
  return NextResponse.json(
    { breaking: breaking ?? null, recent: recent ?? [], items: recent ?? [] },
    { headers: { 'cache-control': 'no-cache, no-store' } }
  )
}

export async function POST(req: Request) {
  const secret = process.env.NEWS_SECRET
  const header = req.headers.get('x-secret')
  if (!secret || header !== secret) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const news: News = {
    id: crypto.randomUUID(),
    title: body?.title ?? body?.headline ?? '',
    summary: body?.summary,
    url: body?.url,
    ts: typeof body?.ts === 'number' ? body.ts : Date.now(),
    tags: Array.isArray(body?.tags) ? body.tags : [],
    source: 'FollowEconomy',
  }

  const prev = await kv.get<News>(KEY_BREAKING)
  if (prev) {
    await kv.lpush(KEY_RECENT, prev)
    await kv.ltrim(KEY_RECENT, 0, 99)
  }
  await kv.set(KEY_BREAKING, news)

  return NextResponse.json({ ok: true, id: news.id })
}