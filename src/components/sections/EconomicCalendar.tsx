export default function EconomicCalendar() {
  const events = [
    { time: '09:30', country: 'US', name: 'US CPI (Consumer Price Index)', impact: 'high' },
    { time: '14:00', country: 'DE', name: 'German GDP Growth Rate', impact: 'medium' },
    { time: '20:00', country: 'US', name: 'FOMC Meeting Minutes', impact: 'high' },
    { time: '22:30', country: 'JP', name: 'Japan Core CPI', impact: 'medium' },
  ]

  const getImpactColor = (impact: string) => {
    switch(impact) {
      case 'high': return 'bg-[#f87171]/20 text-[#f87171]'
      case 'medium': return 'bg-[#fbbf24]/20 text-[#fbbf24]'
      case 'low': return 'bg-[#4ade80]/20 text-[#4ade80]'
      default: return 'bg-[#4ade80]/20 text-[#4ade80]'
    }
  }

  return (
    <div className="bg-white/5 rounded-[20px] p-6 border border-white/10 backdrop-blur-[20px] transition-all duration-300 hover:border-[#00d4ff]/30 hover:-translate-y-1">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-lg font-semibold text-white">📅 Economic Calendar</h2>
          <p className="text-[#a0aec0] text-sm mt-1">Today's key events</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-center gap-4 py-4 border-b border-white/10 last:border-b-0">
            <div className="w-15 text-sm text-[#a0aec0]">{event.time}</div>
            <div className="w-6 h-4 bg-[#4ade80] rounded-sm"></div>
            <div className="flex-1">
              <div className="text-white font-medium text-sm">{event.name}</div>
              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-1 ${getImpactColor(event.impact)}`}>
                {event.impact.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}