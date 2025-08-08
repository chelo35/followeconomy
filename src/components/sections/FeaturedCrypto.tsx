"use client"

import { useEffect, useState } from 'react'
import { cryptoApi } from '@/lib/api/cryptoApi'
import { useRealTimeData } from '@/lib/hooks/useRealTimeData'

interface CryptoData {
  name: string
  symbol: string
  price: number
  change24h: number
  image: string
  gradient: string
}

export default function FeaturedCrypto() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  
  // Real-time WebSocket data
  const { data: realTimeData, isConnected } = useRealTimeData(['BTC', 'ETH', 'SOL', 'ADA'])
  
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const data = await cryptoApi.getTopCryptos(4)
        const cryptoWithGradients = data.map(crypto => ({
          ...crypto,
          gradient: getGradientForSymbol(crypto.symbol)
        }))
        setCryptos(cryptoWithGradients)
      } catch (error) {
        console.error('Failed to fetch crypto data:', error)
        // Fallback to static data
        setCryptos([
          { name: 'Bitcoin', symbol: 'BTC', price: 43256.78, change24h: 2.45, image: '', gradient: 'from-[#f7931a] to-[#ffb347]' },
          { name: 'Ethereum', symbol: 'ETH', price: 2734.12, change24h: 1.87, image: '', gradient: 'from-[#627eea] to-[#8fa4f3]' },
          { name: 'Solana', symbol: 'SOL', price: 98.45, change24h: 5.23, image: '', gradient: 'from-[#1e3a8a] to-[#3b82f6]' },
          { name: 'Cardano', symbol: 'ADA', price: 0.524, change24h: -0.45, image: '', gradient: 'from-[#0052ff] to-[#0066ff]' },
        ])
      } finally {
        setLoading(false)
      }
    }
    
    fetchCryptos()
    
    // Update every 30 seconds
    const interval = setInterval(fetchCryptos, 30000)
    return () => clearInterval(interval)
  }, [])
  
  const getGradientForSymbol = (symbol: string) => {
    const gradients: Record<string, string> = {
      'BTC': 'from-[#f7931a] to-[#ffb347]',
      'ETH': 'from-[#627eea] to-[#8fa4f3]',
      'SOL': 'from-[#1e3a8a] to-[#3b82f6]',
      'ADA': 'from-[#0052ff] to-[#0066ff]',
    }
    return gradients[symbol] || 'from-[#00d4ff] to-[#5a67d8]'
  }
  
  const getIconForSymbol = (symbol: string) => {
    const icons: Record<string, string> = {
      'BTC': '₿',
      'ETH': 'Ξ',
      'SOL': 'S',
      'ADA': 'A',
    }
    return icons[symbol] || symbol.charAt(0)
  }
  
  if (loading) {
    return (
      <div className="bg-white/5 rounded-[20px] p-6 border border-white/10 backdrop-blur-[20px]">
        <div className="animate-pulse">
          <div className="h-6 bg-white/10 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-20 bg-white/10 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white/5 rounded-[20px] p-6 border border-white/10 backdrop-blur-[20px] transition-all duration-300 hover:border-[#00d4ff]/30 hover:-translate-y-1">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-semibold text-white">🚀 Featured Cryptocurrencies</h2>
          <p className="text-[#a0aec0] text-sm mt-1">
            Live market data {isConnected && <span className="text-green-400">● Connected</span>}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {cryptos.map((crypto, index) => {
          // Use real-time data if available, otherwise use API data
          const realTimePrice = realTimeData[crypto.symbol + 'USDT']?.price
          const currentPrice = realTimePrice || crypto.price
          
          return (
            <div key={index} className="flex items-center gap-4 p-4 bg-white/3 rounded-xl transition-all duration-300 hover:bg-[#00d4ff]/10">
              {crypto.image ? (
                <img 
                  src={crypto.image} 
                  alt={crypto.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${crypto.gradient} flex items-center justify-center font-bold text-white`}>
                  {getIconForSymbol(crypto.symbol)}
                </div>
              )}
              <div className="flex-1">
                <div className="font-semibold text-white">{crypto.name}</div>
                <div className="text-[#a0aec0] text-sm">{crypto.symbol}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-white">
                  ${typeof currentPrice === 'number' ? currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 }) : currentPrice}
                </div>
                <div className={`text-sm font-semibold ${crypto.change24h >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
                  {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}