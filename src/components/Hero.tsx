import React from 'react';
import { ArrowRight, BarChart2 } from 'lucide-react';

export default function Hero() {
  return (
    <div className="pt-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Smart Trading, <br />
              Smarter Investments
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Access global markets, trade with confidence, and grow your portfolio with our advanced trading platform.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Start Trading <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                View Markets
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-100/50 rounded-3xl transform rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000"
              alt="Trading Dashboard"
              className="relative rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}