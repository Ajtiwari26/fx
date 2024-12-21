import React, { useEffect, useState } from 'react';
import InvestmentChart from '../analytics/InvestmentChart';
import { usePortfolio } from '../../hooks/usePortfolio';

interface AnalyticsData {
  crypto: { date: string; value: number }[];
  forex: { date: string; value: number }[];
}

export default function PortfolioAnalytics({ userId }: { userId: string }) {
  const { portfolio } = usePortfolio(userId);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    crypto: [],
    forex: []
  });

  useEffect(() => {
    // Generate sample data for demonstration
    const generateMonthlyData = (startValue: number, volatility: number) => {
      const months = 12;
      const data = [];
      let currentValue = startValue;

      for (let i = 0; i < months; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() - (months - i - 1));
        
        currentValue *= (1 + (Math.random() * 2 - 1) * volatility);
        
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          value: parseFloat(currentValue.toFixed(2))
        });
      }

      return data;
    };

    setAnalyticsData({
      crypto: generateMonthlyData(10000, 0.15), // Higher volatility for crypto
      forex: generateMonthlyData(15000, 0.05)   // Lower volatility for forex
    });
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      <InvestmentChart
        data={analyticsData.crypto}
        title="Cryptocurrency Performance"
      />
      <InvestmentChart
        data={analyticsData.forex}
        title="Forex Performance"
      />
    </div>
  );
}