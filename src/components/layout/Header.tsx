'use client'
import { useState } from 'react'

export default function Header() {
  return (
    <header className="bg-[#1a1728] border-b border-[#34314c] sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">Follow Economy</h1>
          </div>

          {/* Main Navigation - CoinMarketCap Style */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-[#a7a7cc] hover:text-white font-medium transition-colors text-sm">
              Cryptocurrencies
            </a>
            <a href="#" className="text-[#a7a7cc] hover:text-white font-medium transition-colors text-sm">
              DexScan
            </a>
            <a href="#" className="text-[#a7a7cc] hover:text-white font-medium transition-colors text-sm">
              Exchanges
            </a>
            <a href="#" className="text-[#a7a7cc] hover:text-white font-medium transition-colors text-sm">
              Community
            </a>
            <a href="#" className="text-[#a7a7cc] hover:text-white font-medium transition-colors text-sm">
              Products
            </a>
          </nav>

          {/* Right Side - CoinMarketCap Style */}
          <div className="flex items-center space-x-4">
            {/* Portfolio */}
            <button className="text-[#a7a7cc] hover:text-white font-medium transition-colors text-sm hidden md:block">
              Portfolio
            </button>
            
            {/* Watchlist */}
            <button className="text-[#a7a7cc] hover:text-white font-medium transition-colors text-sm hidden md:block">
              Watchlist
            </button>

            {/* Search */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-[#a7a7cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-64 pl-10 pr-3 py-2 border border-[#34314c] rounded-lg bg-[#2d2a46] text-white placeholder-[#a7a7cc] focus:outline-none focus:border-[#3861fb] focus:ring-1 focus:ring-[#3861fb] text-sm"
                placeholder="Search cryptocurrencies"
              />
            </div>

            {/* Log In Button */}
            <button className="bg-[#3861fb] hover:bg-[#4a73fc] text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:transform hover:-translate-y-0.5 text-sm">
              Log In
            </button>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-[#a7a7cc] hover:text-white">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}