import { CryptoTicker } from '@/components/dashboard/CryptoTicker'
import { MarketOverview } from '@/components/dashboard/MarketOverview'
import { FearGreedIndex } from '@/components/dashboard/FearGreedIndex'
import { TrendingCoins } from '@/components/dashboard/TrendingCoins'
import { MarketIndices } from '@/components/dashboard/MarketIndices'
import { QuickTools } from '@/components/dashboard/QuickTools'
import { LatestNews } from '@/components/dashboard/LatestNews'
import { EconomicEvents } from '@/components/dashboard/EconomicEvents'
import { HeroSection } from '@/components/dashboard/HeroSection'

export default function HomePage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Crypto Ticker */}
      <CryptoTicker />
      
      {/* Hero Section */}
      <HeroSection />
      
      <div className="container mx-auto px-6 py-12 space-y-12">
        {/* Market Overview Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <MarketOverview />
          </div>
          <div>
            <FearGreedIndex />
          </div>
        </div>

        {/* Trending & Indices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TrendingCoins />
          <MarketIndices />
        </div>

        {/* Trading Tools */}
        <QuickTools />

        {/* News & Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LatestNews />
          <EconomicEvents />
        </div>
      </div>
    </div>
  )
}