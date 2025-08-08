export default function HeroSection() {
  return (
    <section className="bg-[#1e1932] py-8">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Today's Cryptocurrency Prices */}
          <div className="cmc-card p-6 cmc-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="cmc-heading text-lg">Today's Cryptocurrency Prices by Market Cap</h3>
              <span className="text-[#00d4aa] text-sm font-medium">Live</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="cmc-text-secondary text-sm">Global Market Cap</span>
                <div className="text-right">
                  <span className="text-white font-semibold">$1.68T</span>
                  <span className="text-[#00d4aa] text-sm ml-2">+2.5%</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="cmc-text-secondary text-sm">24h Trading Volume</span>
                <div className="text-right">
                  <span className="text-white font-semibold">$87.3B</span>
                  <span className="text-[#ea3943] text-sm ml-2">-5.2%</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="cmc-text-secondary text-sm">Total Cryptocurrencies</span>
                <span className="text-white font-semibold">2,847</span>
              </div>
            </div>
          </div>

          {/* Market Indices */}
          <div className="cmc-card p-6 cmc-fade-in">
            <h3 className="cmc-heading text-lg mb-4">Market Indices</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center text-xs font-bold">₿</div>
                  <span className="text-white text-sm">Bitcoin</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold text-sm">$43,622.97</div>
                  <div className="text-[#00d4aa] text-xs">+2.40%</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold">Ξ</div>
                  <span className="text-white text-sm">Ethereum</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold text-sm">$2,260.03</div>
                  <div className="text-[#ea3943] text-xs">-1.06%</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold">B</div>
                  <span className="text-white text-sm">BNB</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold text-sm">$315.43</div>
                  <div className="text-[#00d4aa] text-xs">+0.70%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trending */}
          <div className="cmc-card p-6 cmc-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="cmc-heading text-lg">🔥 Trending</h3>
              <span className="text-[#a7a7cc] text-xs">24h</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">1</span>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-xs font-bold">S</div>
                  <span className="text-white text-sm">Solana</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold text-sm">$98.66</div>
                  <div className="text-[#00d4aa] text-xs">+5.68%</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">2</span>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-400 to-pink-500 flex items-center justify-center text-xs font-bold">Δ</div>
                  <span className="text-white text-sm">Avalanche</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold text-sm">$36.60</div>
                  <div className="text-[#ea3943] text-xs">-2.05%</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">3</span>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center text-xs font-bold">L</div>
                  <span className="text-white text-sm">Chainlink</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold text-sm">$14.32</div>
                  <div className="text-[#00d4aa] text-xs">+8.94%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent News - CoinMarketCap Style */}
        <div className="cmc-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="cmc-heading text-xl">Latest Crypto News</h2>
            <button className="text-[#3861fb] text-sm font-medium hover:text-white transition-colors">
              View all news →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="cmc-card p-4">
              <div className="w-full h-32 bg-gradient-to-r from-[#3861fb] to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-xs">Featured Story</span>
              </div>
              <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                Bitcoin ETF Approval Speculation Drives BTC Above $45,000
              </h3>
              <p className="cmc-text-secondary text-xs mb-3 line-clamp-3">
                Market analysts suggest growing speculation around potential Bitcoin ETF approval from the SEC is fueling the recent price surge.
              </p>
              <div className="text-[#a7a7cc] text-xs">CoinDesk • 30 minutes ago</div>
            </div>

            <div className="cmc-card p-4">
              <div className="w-full h-32 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-xs">DeFi Update</span>
              </div>
              <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                DeFi TVL Reaches $67B as Yield Farming Revival Begins
              </h3>
              <p className="cmc-text-secondary text-xs mb-3 line-clamp-3">
                Total value locked in DeFi protocols surges as new farming opportunities emerge across multiple chains.
              </p>
              <div className="text-[#a7a7cc] text-xs">The Block • 2 hours ago</div>
            </div>

            <div className="cmc-card p-4">
              <div className="w-full h-32 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-xs">Regulation</span>
              </div>
              <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                Regulatory Clarity Boosts Institutional Crypto Adoption
              </h3>
              <p className="cmc-text-secondary text-xs mb-3 line-clamp-3">
                New regulatory framework provides clearer guidelines for institutional investors entering the crypto space.
              </p>
              <div className="text-[#a7a7cc] text-xs">Cointelegraph • 4 hours ago</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}