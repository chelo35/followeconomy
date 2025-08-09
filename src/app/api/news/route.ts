// app/api/news/route.ts
import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';
import { createHash, randomUUID } from 'crypto';

const SECRET = process.env.NEWS_SECRET!;

function canon(u: string) {
  try {
    const url = new URL(u);
    url.hash = '';
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','ref'].forEach(p => url.searchParams.delete(p));
    return url.toString().toLowerCase();
  } catch { return u.trim().toLowerCase(); }
}

function hashContent(title: string, summary: string) {
  return createHash('sha256').update(`${title}|${summary}`,'utf8').digest('hex').slice(0,32);
}

function inferCategory(url: string, source?: string) {
  const host = (() => { try { return new URL(url).hostname; } catch { return ''; } })() || (source||'');
  if (/(coindesk|cointelegraph|decrypt|coinmarketcap|coincodex|cryptonews)/i.test(host)) return 'crypto';
  return 'economy';
}

export async function POST(req: NextRequest) {
  // 1) güvenlik
  if (req.headers.get('x-secret') !== SECRET) {
    return NextResponse.json({ ok:false, error:'unauthorized' }, { status: 401 });
  }

  // 2) payload
  const body = await req.json();
  const title   = (body.title ?? '').toString().trim();
  const summary = (body.summary ?? '').toString().trim();
  const rawUrl  = (body.url ?? '').toString().trim();
  const ts      = Number(body.ts ?? Date.now());
  const source  = (body.source ?? '').toString().trim();
  const category = (body.category ?? inferCategory(rawUrl, source)) as 'crypto'|'economy';

  if (!title || !rawUrl) {
    return NextResponse.json({ ok:false, error:'missing fields' }, { status: 400 });
  }

  const url = canon(rawUrl);
  const contentHash = hashContent(title, summary);

  // 3) URL -> ID index ve mevcut kayıt
  const urlKey = `news:url:${url}`;
  const urlIdx = await kv.hgetall<{ id?: string, hash?: string }>(urlKey);

  // 3.a hiç yoksa → yeni kayıt
  if (!urlIdx?.id) {
    const id = randomUUID();
    const doc = {
      id, title, summary, url, ts,
      source: source || (new URL(url).hostname),
      category, createdAt: Date.now(), updatedAt: Date.now()
    };

    // doc yaz
    await kv.hset(`news:${id}`, doc);
    // url index yaz
    await kv.hset(urlKey, { id, hash: contentHash });

    // listelere tekil bas (önce varsa sil, sonra lpush)
    await kv.lrem(`news:list:${category}`, 0, id);
    await kv.lpush(`news:list:${category}`, id);
    await kv.ltrim(`news:list:${category}`, 0, 199); // son 200

    await kv.lrem(`news:list:all`, 0, id);
    await kv.lpush(`news:list:all`, id);
    await kv.ltrim(`news:list:all`, 0, 199);

    return NextResponse.json({ ok:true, id, created:true });
  }

  // 3.b URL varsa → hash aynıysa at (tam dupe)
  if (urlIdx.hash === contentHash) {
    return NextResponse.json({ ok:false, duplicate:true, id: urlIdx.id });
  }

  // 3.c URL varsa, hash değişmiş → güncelle
  const id = urlIdx.id!;
  const existing = await kv.hgetall<any>(`news:${id}`);

  const updated = {
    ...existing,
    title, summary,
    ts, // istersen ts'i eski bırakabilirsin
    updatedAt: Date.now(),
    category: category || existing?.category || inferCategory(url, source),
  };

  await kv.hset(`news:${id}`, updated);
  await kv.hset(urlKey, { id, hash: contentHash });

  // listelerde en üste al (tekrar eklenmesin diye önce temizle)
  await kv.lrem(`news:list:${updated.category}`, 0, id);
  await kv.lpush(`news:list:${updated.category}`, id);
  await kv.ltrim(`news:list:${updated.category}`, 0, 199);

  await kv.lrem(`news:list:all`, 0, id);
  await kv.lpush(`news:list:all`, id);
  await kv.ltrim(`news:list:all`, 0, 199);

  return NextResponse.json({ ok:true, id, updated:true });
}

// app/api/news/route.ts (aynı dosyada GET)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get('cat') || 'all';
  const key = `news:list:${cat}`;
  const ids = await kv.lrange<string>(key, 0, 49); // ilk 50

  const items = await Promise.all(ids.map(id => kv.hgetall<any>(`news:${id}`)));

  // breaking: en üstteki
  const breaking = items[0] ?? null;

  return NextResponse.json({
    breaking,
    items, // veya items.slice(1) + ayrı recent vs.
  });
}