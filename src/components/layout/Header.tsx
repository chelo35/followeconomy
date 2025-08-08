export default function Header() {
  return (
    <header className="bg-[#1a1728] border-b border-[#34314c]">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">Follow Economy</h1>

        {/* Navigation */}
        <nav className="flex items-center space-x-8">
          <a href="#" className="text-[#a7a7cc] hover:text-white transition-colors font-medium">Cryptocurrencies</a>
          <a href="#" className="text-[#a7a7cc] hover:text-white transition-colors font-medium">DexScan</a>
          <a href="#" className="text-[#a7a7cc] hover:text-white transition-colors font-medium">Exchanges</a>
          <a href="#" className="text-[#a7a7cc] hover:text-white transition-colors font-medium">Community</a>
          <a href="#" className="text-[#a7a7cc] hover:text-white transition-colors font-medium">Products</a>
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button className="text-[#a7a7cc] hover:text-white transition-colors flex items-center">
            📊 Portfolio
          </button>
          <button className="text-[#a7a7cc] hover:text-white transition-colors flex items-center">
            ⭐ Watchlist
          </button>
          <div className="bg-[#2d2a46] rounded-lg px-3 py-2 border border-[#34314c]">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent text-white placeholder-[#a7a7cc] outline-none w-48"
            />
          </div>
          <button className="bg-[#3861fb] hover:bg-[#4c6dfc] text-white px-4 py-2 rounded font-medium transition-colors">
            Log In
          </button>
        </div>
      </div>
    </header>
  )
}