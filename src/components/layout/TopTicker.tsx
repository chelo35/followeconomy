'use client'
import { useState, useEffect } from 'react'

const marketStats = [
  { label: 'Cryptos', value: '2.8M+', color: '#a7a7cc' },
  { label: 'Exchanges', value: '600+', color: '#a7a7cc' },
  { label: 'Market Cap', value: '$1.68T', change: '+2.5%', positive: true },
  { label: '24h Vol', value: '$87.3B', change: '-5.2%', positive: false },
  { label: 'Dominance', value: 'BTC: 52.3% ETH: 17.1%', color: '#a7a7cc' },
  { label: 'Fear & Greed', value: '67/100 Greed', color: '#00d4aa' }
]

export default function TopTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % marketStats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#1a1728] border-b border-[#34314c] py-2 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between text-xs">
          {/* Left side - Animated stats */}
          <div className="flex items-center space-x-6 overflow-hidden">
            {marketStats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`flex items-center space-x-2 transition-all duration-500 ${
                  index === currentIndex ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
                }`}
              >
                <span className="text-[#a7a7cc] font-medium">{stat.label}:</span>
                <span 
                  className="font-semibold"
                  style={{ color: stat.color || '#ffffff' }}
                >
                  {stat.value}
                </span>
                {stat.change && (
                  <span 
                    className={`font-medium ${
                      stat.positive ? 'text-[#00d4aa]' : 'text-[#ea3943]'
                    }`}
                  >
                    {stat.change}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Right side - Trending */}
          <div className="flex items-center space-x-4 text-[#a7a7cc]">
            <span className="font-medium">Trending:</span>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-[#00d4aa] rounded-full animate-pulse"></span>
                <span className="text-white font-medium">SOL</span>
                <span className="text-[#00d4aa]">+8.4%</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-[#00d4aa] rounded-full animate-pulse"></span>
                <span className="text-white font-medium">AVAX</span>
                <span className="text-[#00d4aa]">+12.1%</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-[#ea3943] rounded-full animate-pulse"></span>
                <span className="text-white font-medium">ADA</span>
                <span className="text-[#ea3943]">-3.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}