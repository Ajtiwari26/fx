import React from 'react';
import { LineChart, Shield, Globe, Zap } from 'lucide-react';

const features = [
  {
    icon: <LineChart className="h-6 w-6 text-blue-600" />,
    title: 'Advanced Trading Tools',
    description: 'Access real-time charts, technical indicators, and advanced order types.'
  },
  {
    icon: <Shield className="h-6 w-6 text-blue-600" />,
    title: 'Secure Platform',
    description: 'Your investments are protected with bank-grade security and encryption.'
  },
  {
    icon: <Globe className="h-6 w-6 text-blue-600" />,
    title: 'Global Markets',
    description: 'Trade stocks, cryptocurrencies, forex, and commodities worldwide.'
  },
  {
    icon: <Zap className="h-6 w-6 text-blue-600" />,
    title: 'Instant Execution',
    description: 'Lightning-fast trade execution with no delays or slippage.'
  }
];

export default function Features() {
  return (
    <div className="py-20 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose TradePro</h2>
          <p className="mt-4 text-xl text-gray-600">
            Experience the advantage of professional-grade trading tools
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}