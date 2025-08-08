import { ProfessionalTicker } from '@/components/dashboard/ProfessionalTicker'
import { FeaturedNews } from '@/components/dashboard/FeaturedNews'
import { LiveMarkets } from '@/components/dashboard/LiveMarkets'
import { OnChainData } from '@/components/dashboard/OnChainData'
import { BinanceData } from '@/components/dashboard/BinanceData'
import { MarketOverviewSidebar } from '@/components/dashboard/MarketOverviewSidebar'
import { FearGreedWidget } from '@/components/dashboard/FearGreedWidget'
import { OnChainMetrics } from '@/components/dashboard/OnChainMetrics'
import { TradingToolsWidget } from '@/components/dashboard/TradingToolsWidget'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Crypto Ticker */}
      <ProfessionalTicker />
      
      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Content (70%) */}
          <div className="flex-1 lg:w-3/5 space-y-6">
            {/* Featured Crypto News Section */}
            <FeaturedNews />
            
            {/* Live Crypto Markets */}
            <LiveMarkets />
            
            {/* OnChain Data Section */}
            <OnChainData />
            
            {/* Binance Data Integration */}
            <BinanceData />
          </div>

          {/* Right Sidebar (30%) */}
          <div className="lg:w-2/5 space-y-6">
            {/* Fear & Greed Index */}
            <FearGreedWidget />
            
            {/* Market Overview Widgets */}
            <MarketOverviewSidebar />
            
            {/* OnChain Metrics */}
            <OnChainMetrics />
            
            {/* Trading Tools Widgets */}
            <TradingToolsWidget />
          </div>
        </div>
      </div>
    </div>
  )
}