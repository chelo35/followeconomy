import BreakingNews from "./BreakingNews";
import NewsGrid from "./NewsGrid";

export default function NewsHub() {
  return (
    <section className="news-hub">
      <aside className="news-rail left" aria-hidden="true"></aside>
      <div className="news-center">
        <BreakingNews />
        <NewsGrid />
      </div>
      <aside className="news-rail right" aria-hidden="true"></aside>
    </section>
  );
}