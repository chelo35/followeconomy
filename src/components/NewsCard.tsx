type Props = { item: { title: string; summary?: string; url: string; source?: string } };
export default function NewsCard({ item }: Props){
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
      <div className="rounded-xl border border-black/10 p-4 hover:bg-black/5 transition cursor-pointer">
        <h3 className="font-semibold mb-1">{item.title}</h3>
        {item.summary && <p className="text-sm opacity-80 line-clamp-3">{item.summary}</p>}
        {item.source && <span className="text-xs opacity-60 mt-2 inline-block">{item.source}</span>}
      </div>
    </a>
  );
}