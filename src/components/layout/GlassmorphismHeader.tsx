export default function GlassmorphismHeader() {
  return (
    <header className="bg-[#0a0a0f]/95 backdrop-blur-[20px] border-b border-white/8 sticky top-0 z-50 transition-all duration-300">
      {/* Header Top */}
      <div className="bg-[#00d4ff]/10 py-2 px-6 text-sm">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse"></div>
              <span>Markets Open</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🕐 New York: 09:30 EST</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🌍 London: 14:30 GMT</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🌏 Tokyo: 23:30 JST</span>
            </div>
          </div>
          <div>
            <span>📈 Fear & Greed Index: 67 (Greed)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-[1400px] mx-auto px-5 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-[#00d4ff] to-[#5a67d8] rounded-lg flex items-center justify-center text-xl font-bold">
              ₿
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#5a67d8] bg-clip-text text-transparent">
              CryptoMarkets Pro
            </div>
          </div>

          {/* Navigation Menu */}
          <ul className="flex gap-8 list-none">
            <li>
              <a href="#home" className="text-white font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]">
                Home
              </a>
            </li>
            <li>
              <a href="#crypto" className="text-white font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]">
                Cryptocurrencies
              </a>
            </li>
            <li>
              <a href="#markets" className="text-white font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]">
                Markets
              </a>
            </li>
            <li>
              <a href="#news" className="text-white font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]">
                News
              </a>
            </li>
            <li>
              <a href="#calendar" className="text-white font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]">
                Economic Calendar
              </a>
            </li>
            <li>
              <a href="#tools" className="text-white font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]">
                Tools
              </a>
            </li>
            <li>
              <a href="#ai" className="text-white font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]">
                AI Insights
              </a>
            </li>
            <li>
              <a href="#analysis" className="text-white font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]">
                Analysis
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}