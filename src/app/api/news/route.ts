import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';
import { createHash, randomUUID } from 'crypto';
import { revalidateTag } from 'next/cache';

const SECRET = process.env.NEWS_SECRET!;

function canon(u: string) {
  try {
    const url = new URL(u);
    url.hash = '';
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','ref']
      .forEach(p => url.searchParams.delete(p));
    return url.toString().toLowerCase();
  } catch { return u.trim().toLowerCase(); }
}
function hashContent(title: string, summary: string) {
  return createHash('sha256').update(`${title}|${summary}`,'utf8').digest('hex').slice(0,32);
}
function inferCategory(url: string, source?: string) {
  const host = (() => { try { return new URL(url).hostname; } catch { return ''; } })() || (source||'');
  return /(coindesk|cointelegraph|decrypt|coinmarketcap|coincodex|cryptonews)/i.test(host) ? 'crypto' : 'economy';
}

export async function POST(req: NextRequest) {
  if (req.headers.get('x-secret') !== SECRET) {
    return NextResponse.json({ ok:false, error:'unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const title   = String(body.title ?? '').trim();
  const summary = String(body.summary ?? '').trim();
  const rawUrl  = String(body.url ?? '').trim();
  const ts      = Number(body.ts ?? Date.now());
  const source  = String(body.source ?? '').trim();
  const category = String(body.category ?? inferCategory(rawUrl, source)) as 'crypto'|'economy';
  if (!title || !rawUrl) return NextResponse.json({ ok:false, error:'missing' }, { status: 400 });

  const url = canon(rawUrl);
  const contentHash = hashContent(title, summary);

  // URL index
  const urlKey = `news:url:${url}`;
  const urlIdx = await kv.hgetall<{ id?: string, hash?: string }>(urlKey);

  // yeni kayıt
  if (!urlIdx?.id) {
    const id = randomUUID();
    const doc = { id, title, summary, url, ts, source: source || (new URL(url).hostname), category,
                  createdAt: Date.now(), updatedAt: Date.now() };

    await kv.hset(`news:${id}`, doc);
    await kv.hset(urlKey, { id, hash: contentHash });

    // listelerde en başa al
    for (const key of [`news:list:${category}`, 'news:list:all']) {
      await kv.lrem(key, 0, id);
      await kv.lpush(key, id);
      await kv.ltrim(key, 0, 199);
    }
    revalidateTag('news');
    return NextResponse.json({ ok:true, id, created:true });
  }

  // var: hash aynı → dupe
  if (urlIdx.hash === contentHash) {
    return NextResponse.json({ ok:true, duplicate:true, id: urlIdx.id });
  }

  // var: içerik değişmiş → güncelle
  const id = urlIdx.id!;
  const existing = await kv.hgetall<any>(`news:${id}`);
  const updated = { ...existing, title, summary, ts, updatedAt: Date.now(), category: category || existing?.category };
  await kv.hset(`news:${id}`, updated);
  await kv.hset(urlKey, { id, hash: contentHash });

  for (const key of [`news:list:${updated.category}`, 'news:list:all']) {
    await kv.lrem(key, 0, id);
    await kv.lpush(key, id);
    await kv.ltrim(key, 0, 199);
  }
  revalidateTag('news');
  return NextResponse.json({ ok:true, id, updated:true });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cat = (searchParams.get('cat') || 'all').toLowerCase();
  const key = cat === 'crypto' || cat === 'economy' ? `news:list:${cat}` : 'news:list:all';

  const ids = await kv.lrange<string>(key, 0, 49);
  if (!ids.length) return NextResponse.json({ breaking: null, items: [] });

  const uniqIds = Array.from(new Set(ids)); // güvenlik: listede yineleme olmasın
  const items = await Promise.all(uniqIds.map(id => kv.hgetall<any>(`news:${id}`)));
  const breaking = items[0] ?? null;
  const rest = items.slice(1);

  return NextResponse.json({ breaking, items: rest }, { headers: { 'cache-control': 'no-store' } });
}