interface CryptoPrice {
  symbol: string
  name: string
  price: number
  change24h: number
  volume: number
  marketCap: number
  image: string
}

export class CryptoAPI {
  private baseUrl = 'https://api.coingecko.com/api/v3'
  
  async getTopCryptos(limit = 50): Promise<CryptoPrice[]> {
    const response = await fetch(
      `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto data')
    }
    
    const data = await response.json()
    
    return data.map((coin: any) => ({
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h,
      volume: coin.total_volume,
      marketCap: coin.market_cap,
      image: coin.image
    }))
  }
  
  async getCryptoDetails(coinId: string) {
    const response = await fetch(`${this.baseUrl}/coins/${coinId}`)
    return response.json()
  }
  
  async getGlobalMarketData() {
    const response = await fetch(`${this.baseUrl}/global`)
    return response.json()
  }
}

export const cryptoApi = new CryptoAPI()