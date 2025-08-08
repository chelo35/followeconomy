export default function FeaturedCrypto() {
  const cryptoData = [
    { name: 'Bitcoin', symbol: 'BTC', price: '$43,256.78', change: '+2.45%', positive: true, icon: '₿', gradient: 'from-[#f7931a] to-[#ffb347]' },
    { name: 'Ethereum', symbol: 'ETH', price: '$2,734.12', change: '+1.87%', positive: true, icon: 'Ξ', gradient: 'from-[#627eea] to-[#8fa4f3]' },
    { name: 'Solana', symbol: 'SOL', price: '$98.45', change: '+5.23%', positive: true, icon: 'S', gradient: 'from-[#1e3a8a] to-[#3b82f6]' },
    { name: 'Cardano', symbol: 'ADA', price: '$0.524', change: '-0.45%', positive: false, icon: 'A', gradient: 'from-[#0052ff] to-[#0066ff]' },
  ]

  return (
    <div className="bg-white/5 rounded-[20px] p-6 border border-white/10 backdrop-blur-[20px] transition-all duration-300 hover:border-[#00d4ff]/30 hover:-translate-y-1">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-semibold text-white">🚀 Featured Cryptocurrencies</h2>
          <p className="text-[#a0aec0] text-sm mt-1">Top performing digital assets with AI-powered insights</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {cryptoData.map((crypto, index) => (
          <div key={index} className="flex items-center gap-4 p-4 bg-white/3 rounded-xl transition-all duration-300 hover:bg-[#00d4ff]/10">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${crypto.gradient} flex items-center justify-center font-bold text-white`}>
              {crypto.icon}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white">{crypto.name}</div>
              <div className="text-[#a0aec0] text-sm">{crypto.symbol}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-white">{crypto.price}</div>
              <div className={`text-sm font-semibold ${crypto.positive ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
                {crypto.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}