import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ChallengeDay from './pages/ChallengeDay';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Route resolver helper
  const renderView = () => {
    if (currentPath === '/') {
      return <LandingPage navigate={navigate} />;
    }
    if (currentPath === '/dashboard') {
      return <Dashboard navigate={navigate} />;
    }
    
    // Match /day/:id
    const dayMatch = currentPath.match(/^\/day\/(\d+)$/);
    if (dayMatch) {
      const dayId = parseInt(dayMatch[1], 10);
      return <ChallengeDay dayId={dayId} navigate={navigate} />;
    }

    // Default fallback to Landing
    return <LandingPage navigate={navigate} />;
  };

  return (
    <div className="app-container">
      {/* Background Starscape Overlay */}
      <div className="cosmic-stars"></div>
      
      {/* Active Screen View */}
      {renderView()}

      {/* Reusable Bottom Navigation (Always Visible for testing routes) */}
      <nav className="bottom-nav">
        <button 
          onClick={() => navigate('/')} 
          className={`bottom-nav-item ${currentPath === '/' ? 'active' : ''}`}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Landing</span>
        </button>

        <button 
          onClick={() => navigate('/dashboard')} 
          className={`bottom-nav-item ${currentPath === '/dashboard' ? 'active' : ''}`}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Dashboard</span>
        </button>

        <button 
          onClick={() => navigate('/day/12')} 
          className={`bottom-nav-item ${currentPath.startsWith('/day/') ? 'active' : ''}`}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Day 12</span>
        </button>
      </nav>
    </div>
  );
}
