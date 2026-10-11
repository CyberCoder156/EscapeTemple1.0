// ============================================================
// src/pages/LevelSelection.jsx: Ancient Stone Wall Level Grid
// ============================================================
import React, { useState, useEffect } from 'react';
import { fetchSubjectLevels, fetchPlayerProgress, startLevel } from '../config/api';

function LevelSelection({ selectedSubject, onSelectLevel, onBack }) {
  const [levels, setLevels] = useState([]);
  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch levels for the subject and player progress
  useEffect(() => {
    async function loadLevelsAndProgress() {
      if (!selectedSubject) return;

      try {
        setLoading(true);
        setError('');

        // Fetch levels and progress in parallel
        const [levelsData, progData] = await Promise.all([
          fetchSubjectLevels(selectedSubject.id),
          fetchPlayerProgress('demo-player').catch(() => [])
        ]);

        setLevels(levelsData);
        setProgressList(progData);
      } catch (err) {
        console.error('Failed to load levels:', err);
        setError('Failed to retrieve level chambers from the database.');
      } finally {
        setLoading(false);
      }
    }

    loadLevelsAndProgress();
  }, [selectedSubject]);

  // Helper function to determine level status for this player
  function getLevelStatus(level) {
    // Check if recorded in player progress
    const record = progressList.find(p => p.level_id === level.id);
    if (record && record.status === 'completed') return 'completed';
    if (record && (record.status === 'unlocked' || record.status === 'in_progress')) return 'unlocked';

    // Level 1 of any subject is unlocked by default
    if (level.level_number === 1) return 'unlocked';

    // If previous level was completed, this one is unlocked
    const prevLevel = levels.find(l => l.level_number === level.level_number - 1);
    if (prevLevel) {
      const prevRecord = progressList.find(p => p.level_id === prevLevel.id);
      if (prevRecord && prevRecord.status === 'completed') return 'unlocked';
    }

    return 'locked';
  }

  // Handle clicking a level
  async function handleLevelClick(level, status) {
    if (status === 'locked') {
      alert(`Chamber ${level.level_number} is locked! Complete Chamber ${level.level_number - 1} first.`);
      return;
    }

    // Call startLevel API to record progress start
    try {
      await startLevel(level.id, 'demo-player');
    } catch (e) {
      console.warn('Could not record level start on server:', e);
    }

    onSelectLevel(level);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="inline-block px-3 py-1 rounded bg-amber-900/40 border border-amber-600/40 text-amber-300 text-xs font-mono mb-2">
            PAGE 3: STONE WALL CHAMBERS
          </div>
          <h2 className="font-temple text-3xl sm:text-4xl font-black text-temple-gold">
            {selectedSubject?.name} Chambers
          </h2>
          <p className="text-amber-200/70 text-xs">
            Ascend through the ancient temple tiers. Complete each room to unlock the next.
          </p>
        </div>

        <button
          onClick={onBack}
          className="px-4 py-2 rounded bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs font-temple border border-stone-700 transition"
        >
          ← Change Subject
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20 space-y-4">
          <div className="inline-block w-12 h-12 border-4 border-temple-gold border-t-transparent rounded-full animate-spin" />
          <p className="font-temple text-amber-300 text-sm">
            Opening stone wall archives...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-950/60 border-2 border-red-700/60 p-6 rounded-xl text-center max-w-md mx-auto space-y-2">
          <span className="text-2xl">⚠️</span>
          <p className="text-xs text-red-200">{error}</p>
        </div>
      )}

      {/* Levels Grid (Supports 100 levels via database map) */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level) => {
            const status = getLevelStatus(level);
            const isUnlocked = status === 'unlocked' || status === 'completed';

            return (
              <div
                key={level.id}
                onClick={() => handleLevelClick(level, status)}
                className={`p-6 rounded-xl border-2 transition transform relative flex flex-col justify-between ${
                  status === 'completed'
                    ? 'bg-stone-900/90 border-amber-500/80 hover:border-amber-400 hover:scale-[1.02] cursor-pointer shadow-gold-glow'
                    : status === 'unlocked'
                    ? 'bg-temple-stone/95 border-emerald-600/80 hover:border-emerald-400 hover:scale-[1.02] cursor-pointer shadow-torch'
                    : 'bg-stone-950/80 border-stone-800/80 opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-amber-400 font-bold">
                    LEVEL {level.level_number}
                  </span>
                  
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      status === 'completed'
                        ? 'bg-amber-500 text-stone-950'
                        : status === 'unlocked'
                        ? 'bg-emerald-600 text-white animate-pulse'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {status === 'completed' && '✓ Completed'}
                    {status === 'unlocked' && '🔓 Unlocked'}
                    {status === 'locked' && '🔒 Locked'}
                  </span>
                </div>

                {/* Level Title & Description */}
                <div className="space-y-2">
                  <h3 className="font-temple text-lg font-bold text-amber-100">
                    {level.name}
                  </h3>
                  <p className="text-xs text-amber-200/70 line-clamp-2">
                    {level.description}
                  </p>
                </div>

                {/* Difficulty & Action */}
                <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-amber-400/60 font-mono">
                    Difficulty: {level.difficulty}
                  </span>
                  <span className={`font-bold font-temple ${isUnlocked ? 'text-temple-gold underline' : 'text-stone-500'}`}>
                    {isUnlocked ? 'Enter Room →' : 'Locked'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default LevelSelection;
