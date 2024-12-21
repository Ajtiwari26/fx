import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavbarProps {
  onAuthClick: () => void;
  user: any;
}

export default function Navbar({ onAuthClick, user }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">FxCapitals</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/markets" className="text-gray-600 hover:text-blue-600">Markets</Link>
            {user && (
              <Link to="/portfolio" className="text-gray-600 hover:text-blue-600">Portfolio</Link>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  <User className="h-5 w-5 inline mr-2" />
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-gray-600 hover:text-red-600"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Get Started
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/markets"
              className="block px-3 py-2 text-gray-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Markets
            </Link>
            {user && (
              <Link
                to="/portfolio"
                className="block px-3 py-2 text-gray-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
            )}
            {user ? (
              <>
                <div className="px-3 py-2 text-gray-600">{user.email}</div>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onAuthClick();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left bg-blue-600 text-white px-3 py-2 rounded-lg"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
