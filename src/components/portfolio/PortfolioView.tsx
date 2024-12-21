import React from 'react';
import { usePortfolio } from '../../hooks/usePortfolio';
import PortfolioAnalytics from './PortfolioAnalytics';

export default function PortfolioView({ userId }: { userId: string }) {
  const { portfolio, loading } = usePortfolio(userId);

  if (loading) {
    return <div className="p-4">Loading portfolio...</div>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Portfolio</h2>
      
      {portfolio.length === 0 ? (
        <p>No assets in your portfolio yet.</p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((asset) => (
              <div key={asset.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-lg">{asset.asset_name}</h3>
                <div className="mt-2 space-y-1">
                  <p>Quantity: {asset.quantity}</p>
                  <p>Purchase Price: ${asset.purchase_price}</p>
                  <p>Total Value: ${(asset.quantity * asset.purchase_price).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <PortfolioAnalytics userId={userId} />
        </>
      )}
    </div>
  );
}