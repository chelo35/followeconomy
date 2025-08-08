"use client";
import { useEffect, useState } from "react";
import { fetchNews, NewsItem } from "@/lib/newsClient";

export default function BreakingNews() {
  const [item, setItem] = useState<NewsItem | null>(null);

  async function pull() {
    const d = await fetchNews();
    setItem(d.breaking ?? null);
  }

  useEffect(() => {
    pull();
    const t = setInterval(pull, 15_000);
    return () => clearInterval(t);
  }, []);

  if (!item) {
    return (
      <div className="card breaking empty">
        <div className="muted">No breaking news yet</div>
      </div>
    );
  }

  const date = new Date(item.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="card breaking">
      <div className="badge">Breaking</div>
      <div className="title">{item.title}</div>
      {item.summary && <div className="summary">{item.summary}</div>}
      <div className="meta">
        <span>{item.source ?? "FollowEconomy"}</span>
        <span>•</span>
        <span>{date}</span>
        {item.url && <a href={item.url} target="_blank" className="link">Read</a>}
      </div>
    </div>
  );
}