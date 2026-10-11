// ============================================================
// src/components/Navbar.jsx: Ancient Temple Header & Navigation
// ============================================================
import React, { useState, useEffect } from 'react';
import { checkBackendHealth } from '../config/api';

function Navbar({ currentPage, onNavigate, selectedSubject }) {
  const [backendOnline, setBackendOnline] = useState(false);
  const [checking, setChecking] = useState(true);

  // Check backend server status on mount
  useEffect(() => {
    async function verifyServer() {
      const health = await checkBackendHealth();
      setBackendOnline(health.status === 'online');
      setChecking(false);
    }
    verifyServer();
  }, []);

  return (
    <nav className="bg-temple-stone border-b-2 border-temple-gold/40 px-6 py-4 sticky top-0 z-50 shadow-torch">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Temple Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-temple-wood border border-temple-gold flex items-center justify-center shadow-gold-glow">
            <span className="text-xl">🏛️</span>
          </div>
          <div>
            <h1 className="font-temple text-2xl font-black text-temple-gold tracking-widest group-hover:text-temple-goldBright transition">
              EscapeTemple
            </h1>
            <p className="text-[10px] text-amber-300/70 uppercase tracking-widest -mt-1 font-sans">
              Ancient Wisdom Escape Room
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2 sm:gap-4 font-temple text-sm">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded transition ${
              currentPage === 'home'
                ? 'bg-temple-gold text-temple-dark font-bold'
                : 'text-amber-200/80 hover:text-temple-gold hover:bg-stone-800'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onNavigate('subjects')}
            className={`px-3 py-1.5 rounded transition ${
              currentPage === 'subjects'
                ? 'bg-temple-gold text-temple-dark font-bold'
                : 'text-amber-200/80 hover:text-temple-gold hover:bg-stone-800'
            }`}
          >
            Subjects
          </button>

          {selectedSubject && (
            <button
              onClick={() => onNavigate('levels')}
              className={`px-3 py-1.5 rounded transition ${
                currentPage === 'levels'
                  ? 'bg-temple-gold text-temple-dark font-bold'
                  : 'text-amber-200/80 hover:text-temple-gold hover:bg-stone-800'
              }`}
            >
              Levels
            </button>
          )}

          {currentPage === 'game' && (
            <span className="px-3 py-1.5 rounded bg-amber-900/60 text-amber-300 border border-amber-600/50 font-bold">
              Chamber
            </span>
          )}
        </div>

        {/* Backend & Player Status Badges */}
        <div className="flex items-center gap-3 text-xs">
          {/* Server Connection Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-900 border border-stone-700">
            <span 
              className={`w-2 h-2 rounded-full ${
                backendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'
              }`} 
            />
            <span className="text-amber-200/80 font-mono">
              {checking ? 'Connecting...' : backendOnline ? 'API Connected' : 'API Offline'}
            </span>
          </div>

          {/* Player Badge */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded bg-temple-wood/80 border border-amber-600/40 text-amber-200">
            <span>👤</span>
            <span className="font-mono">demo-player</span>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
