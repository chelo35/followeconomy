export default function TopTicker() {
  return (
    <div className="bg-[#1a1728] text-[#a7a7cc] text-sm py-2 px-6 border-b border-[#34314c]">
      <div className="flex items-center space-x-6">
        <span>Cryptos: <span className="text-white">19.13M</span></span>
        <span>Exchanges: <span className="text-white">839</span></span>
        <span>Market Cap: <span className="text-white">$1.68T</span> <span className="text-[#00d4aa]">+2.5%</span></span>
        <span>24h Vol: <span className="text-white">$87.3B</span> <span className="text-[#ea3943]">-5.2%</span></span>
        <span>Dominance: BTC: <span className="text-white">52.3%</span> ETH: <span className="text-white">17.1%</span></span>
        <span>🎯 Fear & Greed: <span className="text-white">67</span>/<span className="text-[#00d4aa]">100 Greed</span></span>
      </div>
    </div>
  )
}