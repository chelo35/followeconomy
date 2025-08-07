export interface CryptoCurrency {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  circulating_supply: number
  max_supply: number | null
  ath: number
  atl: number
  image: string
  sparkline_in_7d?: {
    price: number[]
  }
}

export interface MarketIndex {
  symbol: string
  name: string
  value: number
  change: number
  changePercent: number
  lastUpdate: string
}

export interface EconomicEvent {
  id: string
  date: string
  time: string
  country: string
  currency: string
  event: string
  actual: string | null
  forecast: string | null
  previous: string | null
  impact: 'low' | 'medium' | 'high'
}

export interface NewsItem {
  id: string
  title: string
  description: string
  url: string
  source: string
  publishedAt: string
  image?: string
  sentiment?: 'positive' | 'negative' | 'neutral'
}

export interface Commodity {
  name: string
  symbol: string
  price: number
  change: number
  changePercent: number
  unit: string
}

export interface MarketSentiment {
  fearGreedIndex: number
  sentiment: 'extreme fear' | 'fear' | 'neutral' | 'greed' | 'extreme greed'
  lastUpdate: string
}

export interface TradingTool {
  id: string
  name: string
  description: string
  icon: string
  category: 'calculator' | 'analyzer' | 'tracker'
}