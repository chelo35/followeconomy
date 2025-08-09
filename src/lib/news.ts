export type NewsItem = {
  id: string; title: string; summary?: string; url: string; ts: number;
  source?: string; category?: 'crypto' | 'economy';
};
export type NewsResponse = { breaking: NewsItem | null; items: NewsItem[] };

export async function getNews(cat: 'all' | 'crypto' | 'economy' = 'all') {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/news?cat=${cat}`, {
    next: { tags: ['news'] }
  });
  if (!res.ok) throw new Error('Failed to load news');
  return (await res.json()) as NewsResponse;
}