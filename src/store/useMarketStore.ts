import { create } from 'zustand'
import { CryptoCurrency, MarketIndex, EconomicEvent, NewsItem, Commodity } from '@/types'

interface MarketStore {
  cryptos: CryptoCurrency[]
  indices: MarketIndex[]
  events: EconomicEvent[]
  news: NewsItem[]
  commodities: Commodity[]
  fearGreedIndex: number
  isLoading: boolean
  error: string | null
  
  setCryptos: (cryptos: CryptoCurrency[]) => void
  setIndices: (indices: MarketIndex[]) => void
  setEvents: (events: EconomicEvent[]) => void
  setNews: (news: NewsItem[]) => void
  setCommodities: (commodities: Commodity[]) => void
  setFearGreedIndex: (index: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useMarketStore = create<MarketStore>((set) => ({
  cryptos: [],
  indices: [],
  events: [],
  news: [],
  commodities: [],
  fearGreedIndex: 50,
  isLoading: false,
  error: null,
  
  setCryptos: (cryptos) => set({ cryptos }),
  setIndices: (indices) => set({ indices }),
  setEvents: (events) => set({ events }),
  setNews: (news) => set({ news }),
  setCommodities: (commodities) => set({ commodities }),
  setFearGreedIndex: (index) => set({ fearGreedIndex: index }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}))