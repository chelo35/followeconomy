import { CryptoTicker } from '@/components/dashboard/CryptoTicker'
import { MarketOverview } from '@/components/dashboard/MarketOverview'
import { FearGreedIndex } from '@/components/dashboard/FearGreedIndex'
import { TrendingCoins } from '@/components/dashboard/TrendingCoins'
import { MarketIndices } from '@/components/dashboard/MarketIndices'
import { QuickTools } from '@/components/dashboard/QuickTools'
import { LatestNews } from '@/components/dashboard/LatestNews'
import { EconomicEvents } from '@/components/dashboard/EconomicEvents'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <CryptoTicker />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gradient mb-4">
            Financial Intelligence Platform
          </h1>
          <p className="text-xl text-gray-400">
            Real-time market data, advanced tools, and AI-powered insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <MarketOverview />
          </div>
          <div>
            <FearGreedIndex />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TrendingCoins />
          <MarketIndices />
        </div>

        <div className="mb-8">
          <QuickTools />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LatestNews />
          <EconomicEvents />
        </div>
      </div>
    </div>
  )
}