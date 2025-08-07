'use client'

import { motion } from 'framer-motion'
import { Clock, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const mockNews = [
  {
    id: '1',
    title: 'Bitcoin Surges Past $43,000 as ETF Approval Speculation Intensifies',
    source: 'CoinDesk',
    publishedAt: new Date(Date.now() - 1000 * 60 * 30),
    sentiment: 'positive' as const,
    category: 'Bitcoin',
  },
  {
    id: '2',
    title: 'Federal Reserve Hints at Rate Cuts in 2024, Markets React Positively',
    source: 'Reuters',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    sentiment: 'positive' as const,
    category: 'Macro',
  },
  {
    id: '3',
    title: 'Ethereum Layer 2 Solutions See Record Transaction Volume',
    source: 'The Block',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    sentiment: 'neutral' as const,
    category: 'Ethereum',
  },
  {
    id: '4',
    title: 'Regulatory Concerns Rise as SEC Reviews Crypto Trading Platforms',
    source: 'Bloomberg',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    sentiment: 'negative' as const,
    category: 'Regulation',
  },
]

const sentimentColors = {
  positive: 'text-green-400',
  neutral: 'text-gray-400',
  negative: 'text-red-400',
}

const sentimentIcons = {
  positive: TrendingUp,
  neutral: Clock,
  negative: TrendingDown,
}

export function LatestNews() {
  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Latest News</h2>
        <a href="/news" className="text-primary hover:text-primary/80 transition-colors flex items-center space-x-1">
          <span className="text-sm">View All</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="space-y-4">
        {mockNews.map((item, index) => {
          const Icon = sentimentIcons[item.sentiment]
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-dark rounded-lg p-4 hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <div className="flex items-start space-x-3">
                <div className={sentimentColors[item.sentiment]}>
                  <Icon className="w-5 h-5 mt-0.5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-3 text-xs text-gray-400">
                    <span>{item.source}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(item.publishedAt, { addSuffix: true })}</span>
                    <span>•</span>
                    <span className="bg-white/10 px-2 py-0.5 rounded">{item.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}