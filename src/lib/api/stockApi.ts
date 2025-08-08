interface StockPrice {
  symbol: string
  price: number
  change: number
  changePercent: number
}

export class StockAPI {
  private apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY
  private baseUrl = 'https://www.alphavantage.co/query'
  
  async getStockPrice(symbol: string): Promise<StockPrice> {
    const response = await fetch(
      `${this.baseUrl}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.apiKey}`
    )
    
    const data = await response.json()
    const quote = data['Global Quote']
    
    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', ''))
    }
  }
  
  async getTopStocks() {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA']
    const promises = symbols.map(symbol => this.getStockPrice(symbol))
    return Promise.all(promises)
  }
}

export const stockApi = new StockAPI()