import NewsCard from '@/components/NewsCard'
import { getNews } from '@/lib/news'

export default async function NewsPage(){
  const [all, crypto, economy] = await Promise.all([
    getNews('all'), getNews('crypto'), getNews('economy')
  ])

  return (
    <main className="container container--fluid space-y-8 p-6">
      <h1 className="text-2xl font-bold">News</h1>

      <section>
        <h2 className="text-xl font-semibold mb-3">Crypto</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {crypto.items.map(n => <NewsCard key={n.id} item={n} />)}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Economy</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {economy.items.map(n => <NewsCard key={n.id} item={n} />)}
        </div>
      </section>
    </main>
  )
}