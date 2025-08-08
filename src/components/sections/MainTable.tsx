'use client'

const cryptoData = [
  { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: 43622.97, change1h: 0.12, change24h: 2.40, change7d: 5.80, volume: 28500000000, marketCap: 845000000000, supply: 19500000, icon: '₿' },
  { rank: 2, name: 'Ethereum', symbol: 'ETH', price: 2260.03, change1h: -0.05, change24h: -1.06, change7d: 3.20, volume: 15300000000, marketCap: 275000000000, supply: 120200000, icon: 'Ξ' },
  { rank: 3, name: 'BNB', symbol: 'BNB', price: 315.43, change1h: 0.15, change24h: 0.70, change7d: -2.10, volume: 1200000000, marketCap: 47000000000, supply: 149100000, icon: 'B' },
  { rank: 4, name: 'Solana', symbol: 'SOL', price: 98.66, change1h: 1.23, change24h: 5.68, change7d: 12.30, volume: 2800000000, marketCap: 41200000000, supply: 417600000, icon: 'S' },
  { rank: 5, name: 'XRP', symbol: 'XRP', price: 0.62, change1h: -0.12, change24h: -2.05, change7d: 1.80, volume: 1800000000, marketCap: 33500000000, supply: 53900000000, icon: 'X' },
  { rank: 6, name: 'Cardano', symbol: 'ADA', price: 0.52, change1h: 0.45, change24h: 3.26, change7d: 8.90, volume: 1200000000, marketCap: 18200000000, supply: 35000000000, icon: 'A' },
]

export default function MainTable() {
  const formatPrice = (price: number) => {
    if (price < 1) return `${price.toFixed(4)}`
    if (price < 100) return `${price.toFixed(2)}`
    return `${price.toLocaleString()}`
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000000000) return `${(volume / 1000000000).toFixed(1)}B`
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`
    return `${volume.toLocaleString()}`
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000000) return `${(marketCap / 1000000000).toFixed(0)}B`
    if (marketCap >= 1000000) return `${(marketCap / 1000000).toFixed(0)}M`
    return `${marketCap.toLocaleString()}`
  }

  const formatSupply = (supply: number) => {
    if (supply >= 1000000000) return `${(supply / 1000000000).toFixed(1)}B`
    if (supply >= 1000000) return `${(supply / 1000000).toFixed(1)}M`
    return `${supply.toLocaleString()}`
  }

  return (
    <div className="bg-[#2d2a46] rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="bg-[#1e1932] px-6 py-4 border-b border-[#34314c]">
        <h2 className="text-xl font-bold text-white">Today's Cryptocurrency Prices by Market Cap</h2>
        <p className="text-[#a7a7cc] text-sm mt-1">
          The global crypto market cap is $1.68T, a <span className="text-[#00d4aa]">2.5%</span> increase over the last day.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#1e1932] border-b border-[#34314c]">
            <tr>
              <th className="text-left py-3 px-6 text-[#a7a7cc] font-medium text-sm">#</th>
              <th className="text-left py-3 px-6 text-[#a7a7cc] font-medium text-sm">Name</th>
              <th className="text-right py-3 px-6 text-[#a7a7cc] font-medium text-sm">Price</th>
              <th className="text-right py-3 px-6 text-[#a7a7cc] font-medium text-sm">1h %</th>
              <th className="text-right py-3 px-6 text-[#a7a7cc] font-medium text-sm">24h %</th>
              <th className="text-right py-3 px-6 text-[#a7a7cc] font-medium text-sm">7d %</th>
              <th className="text-right py-3 px-6 text-[#a7a7cc] font-medium text-sm">Market Cap</th>
              <th className="text-right py-3 px-6 text-[#a7a7cc] font-medium text-sm">Volume(24h)</th>
              <th className="text-right py-3 px-6 text-[#a7a7cc] font-medium text-sm">Circulating Supply</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto) => (
              <tr key={crypto.symbol} className="border-b border-[#34314c] hover:bg-[#1e1932] transition-colors">
                <td className="py-4 px-6 text-[#a7a7cc]">{crypto.rank}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                      {crypto.icon}
                    </div>
                    <div>
                      <div className="text-white font-medium">{crypto.name}</div>
                      <div className="text-[#a7a7cc] text-sm">{crypto.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-right text-white font-medium">{formatPrice(crypto.price)}</td>
                <td className="py-4 px-6 text-right">
                  <span className={`${crypto.change1h >= 0 ? 'text-[#00d4aa]' : 'text-[#ea3943]'}`}>
                    {crypto.change1h >= 0 ? '+' : ''}{crypto.change1h.toFixed(2)}%
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <span className={`${crypto.change24h >= 0 ? 'text-[#00d4aa]' : 'text-[#ea3943]'}`}>
                    {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <span className={`${crypto.change7d >= 0 ? 'text-[#00d4aa]' : 'text-[#ea3943]'}`}>
                    {crypto.change7d >= 0 ? '+' : ''}{crypto.change7d.toFixed(2)}%
                  </span>
                </td>
                <td className="py-4 px-6 text-right text-white">{formatMarketCap(crypto.marketCap)}</td>
                <td className="py-4 px-6 text-right text-white">{formatVolume(crypto.volume)}</td>
                <td className="py-4 px-6 text-right text-[#a7a7cc]">{formatSupply(crypto.supply)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}