import FeaturedCrypto from './FeaturedCrypto'
import GlobalIndices from './GlobalIndices'
import AIInsights from './AIInsights'
import DashboardSidebar from './DashboardSidebar'
import TradingTools from './TradingTools'

export default function MainDashboard() {
  return (
    <div className="py-8">
      <div className="max-w-[1400px] mx-auto px-5">
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Main Content - 2 columns */}
          <div className="col-span-2 space-y-8">
            <FeaturedCrypto />
            <GlobalIndices />
            <AIInsights />
          </div>
          
          {/* Sidebar - 1 column */}
          <div className="col-span-1">
            <DashboardSidebar />
          </div>
        </div>
        
        {/* Trading Tools Section */}
        <TradingTools />
      </div>
    </div>
  )
}