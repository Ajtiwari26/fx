import { z } from 'zod';

const ALPHA_VANTAGE_API_KEY = 'demo';

const GlobalQuoteSchema = z.object({
  'Global Quote': z.object({
    '01. symbol': z.string(),
    '05. price': z.string(),
    '09. change': z.string(),
    '10. change percent': z.string().transform(s => s.replace('%', ''))
  })
});

const CryptoExchangeSchema = z.object({
  'Realtime Currency Exchange Rate': z.object({
    '1. From_Currency Code': z.string(),
    '5. Exchange Rate': z.string(),
    '6. Last Refreshed': z.string()
  })
});

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdated?: string;
}

export async function fetchGlobalMarkets(): Promise<MarketData[]> {
  try {
    const symbols = ['SPY', 'QQQ', 'DIA']; // S&P 500, NASDAQ, Dow Jones
    const promises = symbols.map(async (symbol) => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const rawData = await response.json();
      const parsed = GlobalQuoteSchema.safeParse(rawData);
      
      if (!parsed.success) {
        console.warn(`Failed to parse data for ${symbol}:`, parsed.error);
        return null;
      }
      
      const quote = parsed.data['Global Quote'];
      return {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'])
      };
    });

    const results = await Promise.all(promises);
    return results.filter((result): result is MarketData => result !== null);
  } catch (error) {
    console.error('Error fetching market data:', error);
    return [];
  }
}

export async function fetchCryptoData(symbol: string = 'BTC'): Promise<MarketData | null> {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol}&to_currency=USD&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const rawData = await response.json();
    const parsed = CryptoExchangeSchema.safeParse(rawData);
    
    if (!parsed.success) {
      console.warn('Failed to parse crypto data:', parsed.error);
      return null;
    }
    
    const rate = parsed.data['Realtime Currency Exchange Rate'];
    return {
      symbol: rate['1. From_Currency Code'],
      price: parseFloat(rate['5. Exchange Rate']),
      change: 0,
      changePercent: 0,
      lastUpdated: rate['6. Last Refreshed']
    };
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return null;
  }
}