'use client'
import { useState } from 'react'

export default function Header() {
  const [isPromoBannerOpen, setIsPromoBannerOpen] = useState(true)

  return (
    <>
      {/* Promotional Banner */}
      {isPromoBannerOpen && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-sm py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>📈</span>
              <span>Get real-time crypto insights with Follow Economy Pro | Limited Time: 50% OFF</span>
              <button className="bg-black text-white px-3 py-1 rounded text-xs ml-4 hover:bg-gray-800">
                CLAIM OFFER
              </button>
            </div>
            <button 
              onClick={() => setIsPromoBannerOpen(false)}
              className="text-black hover:text-gray-700 text-lg"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-900">Follow Economy</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Markets</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Cryptocurrency</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">News</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Analysis</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Tools</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Calendar</a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Sign In
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-medium transition-colors">
                Free Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}