'use client'

import { useState, useEffect } from 'react'
import { Clock, ExternalLink, TrendingUp } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface NewsItem {
  id: string
  title: string
  excerpt: string
  image: string
  source: string
  publishedAt: Date
  url: string
  isBreaking?: boolean
}

const featuredNews: NewsItem[] = [
  {
    id: '1',
    title: 'Bitcoin ETF Approval Speculation Drives BTC Above $43,000',
    excerpt: 'Market analysts suggest that growing speculation around potential Bitcoin ETF approval from the SEC is fueling the recent price surge, with institutional interest reaching new highs.',
    image: 'https://via.placeholder.com/400x250/1e40af/ffffff?text=Bitcoin+ETF',
    source: 'CoinDesk',
    publishedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    url: '#',
    isBreaking: true,
  },
  {
    id: '2',
    title: 'Ethereum Layer 2 Solutions See Record Activity',
    excerpt: 'Arbitrum and Optimism process record number of transactions as users seek lower fees.',
    image: 'https://via.placeholder.com/200x120/3b82f6/ffffff?text=Ethereum+L2',
    source: 'Cointelegraph',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    url: '#',
  },
  {
    id: '3',
    title: 'DeFi TVL Reaches $67B as Yield Farming Revival Begins',
    excerpt: 'Total value locked in DeFi protocols surges amid renewed interest in yield farming.',
    image: 'https://via.placeholder.com/200x120/16a34a/ffffff?text=DeFi+TVL',
    source: 'The Block',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    url: '#',
  },
  {
    id: '4',
    title: 'Regulatory Clarity Boosts Institutional Crypto Adoption',
    excerpt: 'New regulatory framework provides clarity for institutional investors.',
    image: 'https://via.placeholder.com/200x120/dc2626/ffffff?text=Regulation',
    source: 'Bitcoin.com',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    url: '#',
  },
  {
    id: '5',
    title: 'Solana Network Upgrades Boost Performance and Reliability',
    excerpt: 'Latest network improvements reduce transaction failures and improve throughput.',
    image: 'https://via.placeholder.com/200x120/8b5cf6/ffffff?text=Solana',
    source: 'CoinDesk',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    url: '#',
  },
]

export function FeaturedNews() {
  const [heroNews] = useState(featuredNews[0])
  const [sideNews] = useState(featuredNews.slice(1, 5))

  return (
    <div className="card-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="widget-title">Featured Crypto News</h2>
        <div className="flex items-center space-x-2">
          <div className="live-indicator pl-3">
            <span className="text-xs font-medium text-green-600">LIVE</span>
          </div>
          <a href="/news" className="text-sm professional-blue hover:underline">View All</a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hero News Card */}
        <div className="lg:col-span-2">
          <div className="news-hero h-64 p-6 flex flex-col justify-end cursor-pointer hover:transform hover:scale-[1.02] transition-all duration-300">
            <div className="news-hero-content">
              {heroNews.isBreaking && (
                <div className="inline-flex items-center space-x-1 bg-red-500 text-white text-xs px-2 py-1 rounded-md mb-3">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-medium">BREAKING</span>
                </div>
              )}
              <h3 className="text-xl font-bold mb-3 line-clamp-3">{heroNews.title}</h3>
              <p className="text-gray-200 text-sm mb-4 line-clamp-2">{heroNews.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">{heroNews.source}</span>
                  <div className="flex items-center space-x-1 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{formatDistanceToNow(heroNews.publishedAt, { addSuffix: true })}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Side News Grid */}
        <div className="space-y-4">
          {sideNews.map((news) => (
            <div key={news.id} className="card-border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex space-x-3">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                    {news.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className="font-medium">{news.source}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(news.publishedAt, { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Breaking News Ticker */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-red-600 uppercase">Breaking</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="ticker-scroll">
              <span className="text-sm text-gray-700">
                SEC Chairman hints at clearer crypto regulations • Bitcoin mining difficulty reaches new ATH • 
                Major crypto exchange announces new institutional services • DeFi protocol suffers $10M exploit
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}