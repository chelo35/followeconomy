export default function AIInsights() {
  const aiInsights = [
    {
      title: 'Market Sentiment Analysis',
      insight: 'Current market sentiment shows strong bullish momentum with 73% positive indicators across major cryptocurrencies.',
      confidence: 87,
      type: 'sentiment',
      icon: '🧠'
    },
    {
      title: 'Technical Pattern Recognition',
      insight: 'Bitcoin is forming a potential ascending triangle pattern, suggesting a breakout above $45,000 resistance.',
      confidence: 92,
      type: 'technical',
      icon: '📈'
    },
    {
      title: 'Volatility Prediction',
      insight: 'Expected volatility decrease in the next 24-48 hours based on on-chain metrics and market depth analysis.',
      confidence: 78,
      type: 'volatility',
      icon: '⚡'
    },
  ]

  return (
    <div className="bg-white/5 rounded-[20px] p-6 border border-white/10 backdrop-blur-[20px] transition-all duration-300 hover:border-[#00d4ff]/30 hover:-translate-y-1">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-semibold text-white">🤖 AI Market Insights</h2>
          <p className="text-[#a0aec0] text-sm mt-1">Machine learning powered market analysis</p>
        </div>
        <div className="px-3 py-1 bg-[#00d4ff]/20 text-[#00d4ff] text-xs rounded-full font-semibold">
          LIVE
        </div>
      </div>
      
      <div className="space-y-4">
        {aiInsights.map((insight, index) => (
          <div key={index} className="p-4 bg-white/3 rounded-xl transition-all duration-300 hover:bg-[#00d4ff]/5">
            <div className="flex items-start gap-3">
              <div className="text-2xl">{insight.icon}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white text-sm">{insight.title}</h3>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-[#a0aec0]">Confidence:</div>
                    <div className="text-xs font-semibold text-[#00d4ff]">{insight.confidence}%</div>
                  </div>
                </div>
                <p className="text-[#a0aec0] text-sm leading-relaxed">{insight.insight}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-[#00d4ff] to-[#5a67d8] h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${insight.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10 text-center">
        <p className="text-[#a0aec0] text-xs">
          Powered by advanced ML algorithms • Updated every 15 minutes
        </p>
      </div>
    </div>
  )
}