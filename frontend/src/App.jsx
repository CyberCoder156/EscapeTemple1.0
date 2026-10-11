// ============================================================
// src/App.jsx: Root Application Component & Navigation Hub
// ============================================================
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SubjectSelection from './pages/SubjectSelection';
import LevelSelection from './pages/LevelSelection';
import GamePage from './pages/GamePage';

function App() {
  // Navigation state: 'home' | 'subjects' | 'levels' | 'game'
  const [currentPage, setCurrentPage] = useState('home');
  
  // Game session state
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentLevelId, setCurrentLevelId] = useState(null);

  // Navigate between views
  function handleNavigate(page) {
    // If navigating to levels without choosing a subject, redirect to subjects
    if (page === 'levels' && !selectedSubject) {
      setCurrentPage('subjects');
      return;
    }
    setCurrentPage(page);
  }

  return (
    <div className="min-h-screen bg-temple-dark text-amber-100 flex flex-col font-sans selection:bg-amber-600 selection:text-white">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        selectedSubject={selectedSubject}
      />

      {/* 2. Main Page Router Switch */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <Home
            onBegin={() => setCurrentPage('subjects')}
          />
        )}

        {currentPage === 'subjects' && (
          <SubjectSelection
            selectedSubject={selectedSubject}
            onSelectSubject={(subject) => setSelectedSubject(subject)}
            onProceed={() => setCurrentPage('levels')}
          />
        )}

        {currentPage === 'levels' && (
          <LevelSelection
            selectedSubject={selectedSubject}
            onSelectLevel={(level) => {
              setCurrentLevelId(level.id);
              setCurrentPage('game');
            }}
            onBack={() => setCurrentPage('subjects')}
          />
        )}

        {currentPage === 'game' && currentLevelId && (
          <GamePage
            levelId={currentLevelId}
            selectedSubject={selectedSubject}
            onReturnToLevels={() => setCurrentPage('levels')}
            onAdvanceNextLevel={(nextLevelId) => {
              setCurrentLevelId(nextLevelId);
            }}
          />
        )}
      </main>

      {/* 3. Global Footer */}
      <Footer />

    </div>
  );
}

export default App;
