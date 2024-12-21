import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const markets = [
  { name: 'S&P 500', price: '4,185.25', change: '+1.25%', trending: 'up' },
  { name: 'NASDAQ', price: '12,658.75', change: '+0.85%', trending: 'up' },
  { name: 'Bitcoin', price: '43,256.80', change: '-2.15%', trending: 'down' },
  { name: 'EUR/USD', price: '1.0865', change: '+0.32%', trending: 'up' }
];

export default function MarketOverview() {
  return (
    <div className="py-16 bg-gray-50" id="markets">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Market Overview</h2>
        
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {markets.map((market, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">{market.name}</h3>
                {market.trending === 'up' ? (
                  <TrendingUp className="h-5 w-5 text-green-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                )}
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">{market.price}</p>
              <p className={`mt-1 ${
                market.trending === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {market.change}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}