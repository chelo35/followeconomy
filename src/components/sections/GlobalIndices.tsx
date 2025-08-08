export default function GlobalIndices() {
  const indicesData = [
    { name: 'S&P 500', value: '4,967.23', change: '-0.23%', positive: false },
    { name: 'NASDAQ', value: '15,674.29', change: '+0.67%', positive: true },
    { name: 'DOW JONES', value: '37,863.80', change: '+0.12%', positive: true },
    { name: 'FTSE 100', value: '7,598.32', change: '+0.45%', positive: true },
    { name: 'DAX', value: '16,794.41', change: '-0.18%', positive: false },
    { name: 'NIKKEI 225', value: '36,354.98', change: '+0.89%', positive: true },
  ]

  return (
    <div className="bg-white/5 rounded-[20px] p-6 border border-white/10 backdrop-blur-[20px] transition-all duration-300 hover:border-[#00d4ff]/30 hover:-translate-y-1">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-semibold text-white">🌍 Global Market Indices</h2>
          <p className="text-[#a0aec0] text-sm mt-1">Major stock market indices worldwide</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {indicesData.map((index, i) => (
          <div key={i} className="text-center p-4 bg-white/3 rounded-lg transition-all duration-300 hover:bg-white/5">
            <div className="text-sm text-[#a0aec0] mb-2">{index.name}</div>
            <div className="text-lg font-semibold text-white mb-1">{index.value}</div>
            <div className={`text-sm font-semibold ${index.positive ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
              {index.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}