"use client"

export default function AnimatedTicker() {
  const tickerData = [
    { symbol: 'BTC/USD', price: '$43,256.78', change: '+2.45%', positive: true },
    { symbol: 'ETH/USD', price: '$2,734.12', change: '+1.87%', positive: true },
    { symbol: 'S&P 500', price: '4,967.23', change: '-0.23%', positive: false },
    { symbol: 'NASDAQ', price: '15,674.29', change: '+0.67%', positive: true },
    { symbol: 'GOLD', price: '$2,034.50', change: '+0.45%', positive: true },
    { symbol: 'EUR/USD', price: '1.0876', change: '-0.12%', positive: false },
    { symbol: 'CRUDE OIL', price: '$76.45', change: '+1.23%', positive: true },
    { symbol: 'SILVER', price: '$24.67', change: '+0.89%', positive: true },
  ]

  return (
    <div className="bg-black/30 py-4 overflow-hidden border-b border-white/10">
      <div className="flex animate-scroll gap-12">
        {[...tickerData, ...tickerData].map((item, index) => (
          <div key={index} className="flex items-center gap-3 whitespace-nowrap px-4 py-2 bg-white/5 rounded-lg backdrop-blur-xl">
            <span className="font-bold text-[#00d4ff]">{item.symbol}</span>
            <span className="text-white">{item.price}</span>
            <span className={`font-semibold px-2 py-1 rounded text-sm ${
              item.positive 
                ? 'text-[#4ade80] bg-[#4ade80]/20' 
                : 'text-[#f87171] bg-[#f87171]/20'
            }`}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}