"use client";
import { useEffect, useState } from "react";
import { fetchNews, NewsItem } from "@/lib/newsClient";

export default function NewsGrid() {
  const [list, setList] = useState<NewsItem[]>([]);

  async function pull() {
    const d = await fetchNews();
    setList(d.items ?? []);
  }

  useEffect(() => {
    pull();
    const t = setInterval(pull, 20_000);
    return () => clearInterval(t);
  }, []);

  if (!list.length) {
    return <div className="grid-cards empty">No recent news yet</div>;
  }

  return (
    <div className="grid-cards">
      {list.slice(0, 5).map(n => (
        <article key={n.id} className="card latest">
          <div className="headline" title={n.title}>{n.title}</div>
          {n.summary && <div className="snippet">{n.summary}</div>}
          <div className="meta">
            <span>{n.source ?? "FE"}</span>
            <span>•</span>
            <span>{new Date(n.ts).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</span>
          </div>
        </article>
      ))}
    </div>
  );
}