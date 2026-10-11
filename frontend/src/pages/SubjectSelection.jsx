// ============================================================
// src/pages/SubjectSelection.jsx: Academic Subject Selection
// ============================================================
import React, { useState, useEffect } from 'react';
import { fetchSubjects } from '../config/api';

const SUBJECT_ICONS = {
  1: '📐', // Mathematics
  2: '💻', // Computer Science
  3: '⚡', // Physics
  4: '🧪', // Chemistry
  5: '🌍', // General Knowledge
};

function SubjectSelection({ selectedSubject, onSelectSubject, onProceed }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch subjects from Express backend on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchSubjects();
        setSubjects(data);
      } catch (err) {
        console.error('Failed to load subjects:', err);
        setError('Could not connect to the temple server. Please verify the backend is running.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-block px-3 py-1 rounded bg-amber-900/40 border border-amber-600/40 text-amber-300 text-xs font-mono">
          PAGE 2: ACADEMIC DISCIPLINES
        </div>
        <h2 className="font-temple text-3xl sm:text-5xl font-black text-temple-gold tracking-wider">
          Choose Your Field Of Wisdom
        </h2>
        <p className="text-amber-200/70 text-sm max-w-lg mx-auto">
          Every chamber will test your knowledge in this subject. Select your discipline to unlock the temple gates.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20 space-y-4">
          <div className="inline-block w-12 h-12 border-4 border-temple-gold border-t-transparent rounded-full animate-spin" />
          <p className="font-temple text-amber-300 text-sm">
            Consulting the ancient scrolls... Loading subjects from database...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-950/60 border-2 border-red-700/60 p-6 rounded-xl text-center max-w-md mx-auto space-y-3">
          <span className="text-3xl">⚠️</span>
          <h3 className="font-temple text-red-200 font-bold">Temple Archive Offline</h3>
          <p className="text-xs text-red-300/80">{error}</p>
        </div>
      )}

      {/* Subject Cards Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((sub) => {
            const isSelected = selectedSubject && selectedSubject.id === sub.id;
            const icon = SUBJECT_ICONS[sub.id] || '📜';

            return (
              <div
                key={sub.id}
                onClick={() => onSelectSubject(sub)}
                className={`p-6 rounded-xl cursor-pointer transition transform border-2 text-left relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-stone-900 to-amber-950/60 border-temple-goldBright shadow-gold-glow scale-[1.02]'
                    : 'bg-temple-stone/90 border-stone-800 hover:border-amber-600/60 hover:-translate-y-1'
                }`}
              >
                {/* Active Indicator Pin */}
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-temple-gold text-stone-950 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    Selected
                  </div>
                )}

                <div>
                  <div className="text-4xl mb-4">{icon}</div>
                  <h3 className="font-temple text-xl font-bold text-amber-100 mb-2">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-amber-200/70 leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-amber-400/80 font-mono">
                  <span>Subject #{sub.id}</span>
                  <span className="font-bold underline">
                    {isSelected ? '✓ Chosen' : 'Click to choose'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Action Bar */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onProceed}
          disabled={!selectedSubject}
          className={`px-8 py-3.5 rounded-lg font-temple font-black text-sm tracking-widest uppercase transition transform ${
            selectedSubject
              ? 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-stone-950 shadow-torch hover:scale-105 active:scale-95'
              : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
          }`}
        >
          {selectedSubject 
            ? `Enter ${selectedSubject.name} Chambers →` 
            : 'Select A Subject To Proceed'}
        </button>
      </div>

    </div>
  );
}

export default SubjectSelection;
