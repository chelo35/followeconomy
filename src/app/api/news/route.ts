import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // In production, use real news APIs
    const mockNews = [
      {
        id: '1',
        title: 'Bitcoin Surges Past $43,000 as ETF Approval Speculation Intensifies',
        description: 'Bitcoin price rallies as market anticipates potential spot ETF approval from the SEC.',
        url: 'https://example.com/news/1',
        source: 'CoinDesk',
        publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        image: 'https://example.com/image1.jpg',
        sentiment: 'positive',
      },
      {
        id: '2',
        title: 'Federal Reserve Hints at Rate Cuts in 2024, Markets React Positively',
        description: 'Fed officials signal potential rate cuts next year as inflation shows signs of cooling.',
        url: 'https://example.com/news/2',
        source: 'Reuters',
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        image: 'https://example.com/image2.jpg',
        sentiment: 'positive',
      },
      {
        id: '3',
        title: 'Ethereum Layer 2 Solutions See Record Transaction Volume',
        description: 'Arbitrum and Optimism process record number of transactions as users seek lower fees.',
        url: 'https://example.com/news/3',
        source: 'The Block',
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        image: 'https://example.com/image3.jpg',
        sentiment: 'neutral',
      },
      {
        id: '4',
        title: 'Regulatory Concerns Rise as SEC Reviews Crypto Trading Platforms',
        description: 'SEC increases scrutiny on cryptocurrency exchanges amid compliance concerns.',
        url: 'https://example.com/news/4',
        source: 'Bloomberg',
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        image: 'https://example.com/image4.jpg',
        sentiment: 'negative',
      },
    ]
    
    return NextResponse.json(mockNews)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}