'use client'
import { useState } from 'react'

export default function Sidebar() {
  const [fearGreedIndex] = useState(67)

  return (
    <aside className="w-80 bg-[#2d2a46] border-l border-[#34314c] h-screen overflow-y-auto p-4 space-y-6">
      
      {/* Fear & Greed Index */}
      <div className="bg-[#1e1932] rounded-lg border border-[#34314c] p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          🎯 Fear & Greed Index
        </h3>
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#34314c" strokeWidth="8"/>
              <circle
                cx="60" cy="60" r="54" fill="none" stroke="#00d4aa" strokeWidth="8"
                strokeDasharray={`${fearGreedIndex * 3.39} 339`} strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00d4aa]">{fearGreedIndex}</div>
                <div className="text-sm font-medium text-[#00d4aa]">Greed</div>
              </div>
            </div>
          </div>
          <p className="text-sm text-[#a7a7cc]">Market sentiment analysis</p>
        </div>
      </div>

      {/* Market Overview */}
      <div className="bg-[#1e1932] rounded-lg border border-[#34314c] p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          📊 Market Overview <span className="ml-2 text-sm font-normal text-[#00d4aa]">LIVE</span>
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[#a7a7cc]">Total Market Cap</span>
            <div className="text-right">
              <div className="text-white font-medium">$1.68T</div>
              <div className="text-[#00d4aa] text-xs">+2.5%</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#a7a7cc]">24h Volume</span>
            <div className="text-right">
              <div className="text-white font-medium">$87.3B</div>
              <div className="text-[#ea3943] text-xs">-5.2%</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#a7a7cc]">BTC Dominance</span>
            <div className="text-right">
              <div className="text-white font-medium">52.3%</div>
              <div className="text-[#00d4aa] text-xs">+0.8%</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#a7a7cc]">ETH Dominance</span>
            <div className="text-right">
              <div className="text-white font-medium">17.1%</div>
              <div className="text-[#ea3943] text-xs">-0.3%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending */}
      <div className="bg-[#1e1932] rounded-lg border border-[#34314c] p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          🔥 Trending
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full mr-2 flex items-center justify-center text-white text-xs font-bold">S</div>
              <span className="text-white font-medium">Solana</span>
            </div>
            <div className="text-right">
              <div className="text-white">$98.66</div>
              <div className="text-[#00d4aa] text-xs">+5.68%</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mr-2 flex items-center justify-center text-white text-xs font-bold">A</div>
              <span className="text-white font-medium">Avalanche</span>
            </div>
            <div className="text-right">
              <div className="text-white">$36.60</div>
              <div className="text-[#00d4aa] text-xs">+12.1%</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mr-2 flex items-center justify-center text-white text-xs font-bold">L</div>
              <span className="text-white font-medium">Chainlink</span>
            </div>
            <div className="text-right">
              <div className="text-white">$14.32</div>
              <div className="text-[#00d4aa] text-xs">+8.94%</div>
            </div>
          </div>
        </div>
      </div>

    </aside>
  )
}