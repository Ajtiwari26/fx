import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarketOverview from './components/markets/MarketOverview';
import AuthModal from './components/auth/AuthModal';
import PortfolioView from './components/portfolio/PortfolioView';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const [showAuth, setShowAuth] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar onAuthClick={() => setShowAuth(true)} user={user} />
        
        <div className="pt-16">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <MarketOverview />
              </>
            } />
            
            <Route path="/markets" element={<MarketOverview />} />
            
            <Route 
              path="/portfolio" 
              element={
                user ? (
                  <PortfolioView userId={user.id} />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
          </Routes>
        </div>

        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    </Router>
  );
}