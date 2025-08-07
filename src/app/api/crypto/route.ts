import { NextResponse } from 'next/server'

const COINGECKO_API = 'https://api.coingecko.com/api/v3'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ids = searchParams.get('ids') || 'bitcoin,ethereum,solana,cardano,polygon,chainlink'
  
  try {
    // In production, use real API
    // const response = await fetch(
    //   `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h`
    // )
    // const data = await response.json()
    
    // Mock data for development
    const mockData = [
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        current_price: 43250.00,
        price_change_percentage_24h: 2.35,
        market_cap: 845000000000,
        total_volume: 28500000000,
        circulating_supply: 19500000,
        max_supply: 21000000,
        ath: 69000,
        atl: 67.81,
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      },
      {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        current_price: 2285.50,
        price_change_percentage_24h: -1.20,
        market_cap: 275000000000,
        total_volume: 15300000000,
        circulating_supply: 120200000,
        max_supply: null,
        ath: 4878.26,
        atl: 0.432979,
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      },
      {
        id: 'solana',
        symbol: 'sol',
        name: 'Solana',
        current_price: 98.75,
        price_change_percentage_24h: 5.45,
        market_cap: 41200000000,
        total_volume: 2800000000,
        circulating_supply: 417000000,
        max_supply: null,
        ath: 260.06,
        atl: 0.500801,
        image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
      },
    ]
    
    return NextResponse.json(mockData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch crypto data' },
      { status: 500 }
    )
  }
}