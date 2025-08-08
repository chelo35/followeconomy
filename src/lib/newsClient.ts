export type NewsItem = {
  id: string; title: string; summary?: string; url?: string; source?: string; ts: number;
};

export async function fetchNews(): Promise<{breaking: NewsItem|null; items: NewsItem[]}> {
  const r = await fetch("/api/news", { cache: "no-store" });
  return r.json();
}

export async function pushNews(partial: Partial<NewsItem>) {
  await fetch("/api/news", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(partial),
  });
}