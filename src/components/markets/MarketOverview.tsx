import React, { useEffect, useState } from 'react';
import { fetchGlobalMarkets, fetchCryptoData, type MarketData } from '../../services/marketApi';
import MarketTable from './MarketTable';

export default function MarketOverview() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [markets, btcData] = await Promise.all([
          fetchGlobalMarkets(),
          fetchCryptoData('BTC')
        ]);
        
        const allData = [...markets];
        if (btcData) allData.push(btcData);
        
        if (allData.length === 0) {
          setError('No market data available');
        } else {
          setMarketData(allData);
        }
      } catch (err) {
        setError('Failed to fetch market data');
        console.error('Error fetching market data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Market Overview</h2>
        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <MarketTable data={marketData} loading={loading} />
        )}
      </div>
    </div>
  );
}