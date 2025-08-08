export default function LatestNews() {
  const news = [
    { title: 'Bitcoin ETF Sees Record $1.2B Inflows as Institutional Interest Surges', time: '2 hours ago', source: 'CoinDesk' },
    { title: 'Fed Officials Signal Potential Rate Cuts as Inflation Cools', time: '4 hours ago', source: 'Reuters' },
    { title: 'Ethereum Shanghai Upgrade Drives Layer-2 Token Rally', time: '6 hours ago', source: 'Bloomberg' },
    { title: 'Gold Reaches New Highs Amid Geopolitical Tensions', time: '8 hours ago', source: 'Financial Times' },
  ]

  return (
    <div className="bg-white/5 rounded-[20px] p-6 border border-white/10 backdrop-blur-[20px] transition-all duration-300 hover:border-[#00d4ff]/30 hover:-translate-y-1">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-lg font-semibold text-white">📰 Latest Market News</h2>
          <p className="text-[#a0aec0] text-sm mt-1">Breaking financial news</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {news.map((item, index) => (
          <div key={index} className="flex gap-4 py-4 border-b border-white/10 last:border-b-0">
            <div className="w-20 h-15 bg-gradient-to-r from-[#00d4ff] to-[#5a67d8] rounded-lg flex-shrink-0"></div>
            <div className="flex-1">
              <div className="text-white font-semibold text-sm mb-2 leading-tight">{item.title}</div>
              <div className="flex gap-4 text-[#a0aec0] text-xs">
                <span>{item.time}</span>
                <span>{item.source}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}