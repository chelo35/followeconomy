"use client";
import { useEffect, useState } from "react";
import { fetchNews, NewsItem } from "@/lib/newsClient";

export default function NewsPage() {
  const [breaking, setBreaking] = useState<NewsItem|null>(null);
  const [items, setItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetchNews().then(d => { setBreaking(d.breaking); setItems(d.items); });
  }, []);

  return (
    <main className="container container--fluid news-archive">
      <h1>News</h1>
      {breaking && (
        <>
          <h2>Breaking</h2>
          <div className="card breaking">
            <div className="title">{breaking.title}</div>
            {breaking.summary && <div className="summary">{breaking.summary}</div>}
          </div>
        </>
      )}
      <h2>All recent</h2>
      <div className="list">
        {items.map(n => (
          <a key={n.id} className="row" href={n.url || "#"} target={n.url ? "_blank" : "_self"}>
            <div className="t">{n.title}</div>
            <div className="m">
              <span>{n.source ?? "FE"}</span>
              <span>•</span>
              <span>{new Date(n.ts).toLocaleString()}</span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}