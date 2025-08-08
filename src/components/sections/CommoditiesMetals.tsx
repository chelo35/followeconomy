export default function CommoditiesMetals() {
  const commodities = [
    { name: 'Gold', value: '$2,034.50', change: '+0.45%', positive: true },
    { name: 'Silver', value: '$24.67', change: '+0.89%', positive: true },
    { name: 'Crude Oil', value: '$76.45', change: '+1.23%', positive: true },
    { name: 'Natural Gas', value: '$2.89', change: '-2.15%', positive: false },
  ]

  return (
    <div className="bg-white/5 rounded-[20px] p-6 border border-white/10 backdrop-blur-[20px] transition-all duration-300 hover:border-[#00d4ff]/30 hover:-translate-y-1">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-lg font-semibold text-white">🥇 Commodities & Metals</h2>
          <p className="text-[#a0aec0] text-sm mt-1">Precious metals and energy</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {commodities.map((commodity, index) => (
          <div key={index} className="text-center p-4 bg-white/3 rounded-lg transition-all duration-300 hover:bg-white/5">
            <div className="text-sm text-[#a0aec0] mb-2">{commodity.name}</div>
            <div className="text-lg font-semibold text-white mb-1">{commodity.value}</div>
            <div className={`text-sm font-semibold ${commodity.positive ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
              {commodity.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}