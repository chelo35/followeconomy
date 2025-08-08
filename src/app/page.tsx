import Header from '@/components/layout/Header'
import HeroSection from '@/components/sections/HeroSection'
import CryptoMarketsTable from '@/components/sections/CryptoMarketsTable'
import Sidebar from '@/components/sections/Sidebar'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <main className="flex-1">
          <HeroSection />
          <CryptoMarketsTable />
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4">
              <p className="text-center text-gray-600">
                Complete Professional Platform Ready! 🚀💯
              </p>
            </div>
          </div>
        </main>
        <Sidebar />
      </div>
    </div>
  )
}