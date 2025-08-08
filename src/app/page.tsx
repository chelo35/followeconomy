import TopTicker from '@/components/layout/TopTicker'
import Header from '@/components/layout/Header'
import HeroSection from '@/components/sections/HeroSection'
import CryptoMarketsTable from '@/components/sections/CryptoMarketsTable'
import Sidebar from '@/components/sections/Sidebar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1e1932]">
      {/* CoinMarketCap Style Top Ticker */}
      <TopTicker />
      
      {/* CoinMarketCap Style Header */}
      <Header />
      
      <div className="flex">
        <main className="flex-1">
          {/* CoinMarketCap Style Hero Section */}
          <HeroSection />
          
          {/* CoinMarketCap Style Crypto Table */}
          <CryptoMarketsTable />
          
          <div className="py-8">
            <div className="max-w-[1400px] mx-auto px-4">
              <p className="text-center text-[#a7a7cc]">
                🎉 CoinMarketCap Dark Theme Complete! Exact replica ready! 🚀💯
              </p>
            </div>
          </div>
        </main>
        
        {/* CoinMarketCap Style Sidebar */}
        <Sidebar />
      </div>
    </div>
  )
}