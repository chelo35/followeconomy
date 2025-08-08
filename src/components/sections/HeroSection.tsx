export default function HeroSection() {
  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Featured News Article */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Article */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-64 rounded-lg flex items-center justify-center text-white">
                <div className="text-center p-8">
                  <h1 className="text-3xl font-bold mb-4">
                    Bitcoin ETF Approval Speculation Drives BTC Above $45,000
                  </h1>
                  <p className="text-lg opacity-90">
                    Market analysts suggest that growing speculation around potential Bitcoin ETF approval from the SEC is fueling the recent price surge, with institutional interest reaching new highs.
                  </p>
                  <div className="mt-4 text-sm opacity-75">
                    CoinDesk • 30 minutes ago
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Smaller News Cards */}
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                Ethereum Layer 2 Solutions See Record Activity
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Transaction volume on Ethereum Layer 2 networks reaches all-time high...
              </p>
              <div className="text-xs text-gray-500">Cointelegraph • 2 hours ago</div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                DeFi TVL Reaches $67B as Yield Farming Revival Begins
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Total value locked in DeFi protocols surges as new farming opportunities emerge...
              </p>
              <div className="text-xs text-gray-500">The Block • 4 hours ago</div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                Regulatory Clarity Boosts Institutional Crypto Adoption
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                New regulatory framework provides clearer guidelines for institutional investors...
              </p>
              <div className="text-xs text-gray-500">Bitcoin.com • 6 hours ago</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}