// ============================================================
// src/pages/GamePage.jsx: Main Escape Room Experience
// ============================================================
import React, { useState, useEffect } from 'react';
import GameRoom from '../components/GameRoom';
import Inventory from '../components/Inventory';
import QuestionPanel from '../components/QuestionPanel';
import {
  fetchLevelDetails,
  fetchLevelObjects,
  fetchLevelQuestions,
  fetchLevelRequirements,
  fetchPlayerInventory,
  interactWithObject,
  completeLevel,
  fetchQuestionSession,
  restartLevel
} from '../config/api';

function GamePage({ levelId, selectedSubject, onReturnToLevels, onAdvanceNextLevel }) {
  const [level, setLevel] = useState(null);
  const [objects, setObjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [escapeSuccess, setEscapeSuccess] = useState(null);
  const [escapeError, setEscapeError] = useState(null);

  // Gameplay State: Key discovery, Timer session, Door visibility, Elimination
  const [keyDiscovered, setKeyDiscovered] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [allQuestionsSolved, setAllQuestionsSolved] = useState(false);
  const [isDoorVisible, setIsDoorVisible] = useState(false);
  const [isEliminated, setIsEliminated] = useState(false);

  // 1. Load room data on level entry
  useEffect(() => {
    async function loadChamber() {
      try {
        setLoading(true);
        // Cleanly reset level-specific states for fresh chamber entry
        setKeyDiscovered(false);
        setIsDoorVisible(false);
        setIsEliminated(false);
        setAllQuestionsSolved(false);
        setSessionData(null);
        setInventory([]);

        const [levelData, objData, qData, reqData, invData, sessionRes] = await Promise.all([
          fetchLevelDetails(levelId),
          fetchLevelObjects(levelId),
          fetchLevelQuestions(levelId),
          fetchLevelRequirements(levelId).catch(() => []),
          fetchPlayerInventory('demo-player', levelId).catch(() => []),
          fetchQuestionSession(levelId, 'demo-player').catch(() => null)
        ]);

        setLevel(levelData);
        setObjects(objData);
        setQuestions(qData);
        setRequirements(reqData);
        setInventory(invData);

        if (sessionRes) {
          setSessionData(sessionRes);
          if (sessionRes.configurationError) {
            setKeyDiscovered(false);
            setIsDoorVisible(false);
            setAllQuestionsSolved(false);
            setIsEliminated(false);
          } else {
            const hasKey = sessionRes.keyDiscovered || (invData && invData.some(i => i.item_type === 'key' && (!i.level_id || i.level_id === levelId)));
            setKeyDiscovered(Boolean(hasKey));
            setIsEliminated(Boolean(sessionRes.isEliminated));
            setAllQuestionsSolved(Boolean(sessionRes.allQuestionsSolved));
            setIsDoorVisible(Boolean(sessionRes.isDoorVisible && sessionRes.allQuestionsSolved));
          }
        } else {
          const hasKey = invData && invData.some(i => i.item_type === 'key' && (!i.level_id || i.level_id === levelId));
          setKeyDiscovered(Boolean(hasKey));
          setIsDoorVisible(false);
          setIsEliminated(false);
          setAllQuestionsSolved(false);
        }
      } catch (err) {
        console.error('Error loading game chamber:', err);
      } finally {
        setLoading(false);
      }
    }
    loadChamber();
  }, [levelId]);

  // Display a temporary toast banner
  function showToast(msg, type = 'info') {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  }

  // Handle clicking an interactive room object
  async function handleObjectInteraction(obj) {
    // If clicking the exit door, check if door is visible first
    if (obj.object_type === 'door') {
      if (!isDoorVisible) {
        showToast('The exit door has not appeared yet. Solve all chamber riddles first!', 'warning');
        return;
      }
      handleAttemptEscape();
      return;
    }

    try {
      const response = await interactWithObject(levelId, obj.id, 'demo-player');

      if (response.success) {
        showToast(response.message, 'success');

        // If an item was discovered, update local inventory
        if (response.itemDiscovered) {
          setInventory((prev) => [...prev, response.itemDiscovered]);

          // If the item discovered is a key, trigger key discovery & start question timer session
          const isKey = response.itemDiscovered.item_type === 'key' || 
                        (response.itemDiscovered.name && response.itemDiscovered.name.toLowerCase().includes('key'));
          if (isKey) {
            setKeyDiscovered(true);
            showToast('🗝️ Chamber Key Discovered! The 25-Second Riddle Mechanism is activated!', 'success');
            // Fetch fresh session to initialize question timer on backend
            fetchQuestionSession(levelId, 'demo-player')
              .then((s) => {
                if (s) {
                  setSessionData(s);
                  setIsEliminated(Boolean(s.isEliminated));
                  setAllQuestionsSolved(Boolean(s.allQuestionsSolved));
                  setIsDoorVisible(Boolean(s.isDoorVisible || s.allQuestionsSolved));
                }
              })
              .catch(console.error);
          }
        }
      } else {
        // Locked object without required item
        showToast(response.message, 'warning');
      }
    } catch (err) {
      showToast('Interaction failed: Could not communicate with server.', 'error');
    }
  }

  // Handle chamber restart upon elimination
  async function handleRestartChamber() {
    try {
      setLoading(true);
      await restartLevel(levelId, 'demo-player');
      setIsEliminated(false);
      setAllQuestionsSolved(false);
      setIsDoorVisible(false);

      // Reload chamber state fresh
      const [levelData, objData, qData, reqData, invData, sessionRes] = await Promise.all([
        fetchLevelDetails(levelId),
        fetchLevelObjects(levelId),
        fetchLevelQuestions(levelId),
        fetchLevelRequirements(levelId).catch(() => []),
        fetchPlayerInventory('demo-player', levelId).catch(() => []),
        fetchQuestionSession(levelId, 'demo-player').catch(() => null)
      ]);

      setLevel(levelData);
      setObjects(objData);
      setQuestions(qData);
      setRequirements(reqData);
      setInventory(invData);

      const hasKey = sessionRes?.keyDiscovered || (invData && invData.some(i => i.item_type === 'key' && (!i.level_id || i.level_id === levelId)));
      setKeyDiscovered(Boolean(hasKey));
      setSessionData(sessionRes);
      showToast('Chamber restarted. Explore the room to discover the key and conquer the ciphers!', 'info');
    } catch (err) {
      showToast('Failed to restart chamber. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  }

  // Handle attempting to unlock the exit door
  async function handleAttemptEscape() {
    if (isEliminated) {
      showToast('You are eliminated from this chamber! Restart the chamber to try again.', 'error');
      return;
    }
    if (!isDoorVisible || !allQuestionsSolved) {
      setEscapeError({
        message: 'The exit gateway has not materialized. You must solve all chamber riddles first!',
        unmet: ['Solve all academic riddles']
      });
      return;
    }

    setEscapeError(null);
    try {
      const result = await completeLevel(levelId, 'demo-player');

      if (result.success && result.completed) {
        setEscapeSuccess(result);
      } else {
        setEscapeError({
          message: result.message || 'The exit door remains firmly sealed.',
          unmet: result.unmetRequirements || []
        });
      }
    } catch (err) {
      setEscapeError({
        message: 'Could not connect to the temple server to verify exit seals.',
        unmet: []
      });
    }
  }

  if (loading) {
    return (
      <div className="py-32 text-center space-y-4">
        <div className="inline-block w-12 h-12 border-4 border-temple-gold border-t-transparent rounded-full animate-spin" />
        <p className="font-temple text-amber-300 text-sm">
          Illuminating ancient sanctuary... Loading room artifacts...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Chamber Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-temple-stone/90 border border-stone-800 px-6 py-3 rounded-xl shadow-md">
        <div>
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
            {selectedSubject?.name || 'Academic'} • LEVEL {level?.level_number}
          </span>
          <h2 className="font-temple text-xl font-black text-temple-gold">
            {level?.name || 'The Forgotten Chamber'}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToLevels}
            className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs font-temple border border-stone-700 transition"
          >
            ← Exit To Level Grid
          </button>
        </div>
      </div>

      {/* Configuration Error Banner */}
      {sessionData?.configurationError && (
        <div className="p-4 rounded-xl bg-red-950/90 border border-red-500 text-red-200 text-xs font-medium shadow-torch flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-temple font-bold text-red-400">Chamber Seals Damaged (Configuration Error)</p>
              <p className="text-stone-300">{sessionData.configurationMessage || 'This chamber requires maintenance before the ancient riddles can be solved.'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          className={`p-3 rounded-xl text-xs border font-medium flex items-center justify-between shadow-torch transition ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
              : toastMessage.type === 'warning'
              ? 'bg-amber-950/90 border-amber-500 text-amber-200'
              : 'bg-red-950/90 border-red-500 text-red-200'
          }`}
        >
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="text-amber-400 text-xs ml-4">✕</button>
        </div>
      )}

      {/* Main Grid: Game Room Canvas + Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: 2D Illustrated Sanctuary Room */}
        <div className="lg:col-span-2 space-y-4">
          <GameRoom
            objects={objects}
            onInteract={handleObjectInteraction}
            isExitUnlocked={allQuestionsSolved}
            isDoorVisible={isDoorVisible}
          />

          {/* Chamber Clue / Task Checklist */}
          {requirements.length > 0 && (
            <div className="bg-temple-stone/95 border border-stone-800 p-4 rounded-xl text-xs space-y-2">
              <h4 className="font-temple font-bold text-amber-300">
                Chamber Escape Requirements:
              </h4>
              <ul className="space-y-1">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-amber-200/80">
                    <span>🗝️</span>
                    <span>{req.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Inventory & Question Panels */}
        <div className="space-y-6">
          <Inventory items={inventory} />
          
          <QuestionPanel
            questions={questions}
            keyDiscovered={keyDiscovered}
            levelId={levelId}
            playerId="demo-player"
            isEliminated={isEliminated}
            allQuestionsSolved={allQuestionsSolved}
            sessionData={sessionData}
            onAnswerSuccess={() => {
              showToast('Ancient Riddle Solved! Mechanism active.', 'success');
              fetchQuestionSession(levelId, 'demo-player')
                .then((s) => {
                  if (s) {
                    setSessionData(s);
                    if (s.allQuestionsSolved) {
                      setAllQuestionsSolved(true);
                      setIsDoorVisible(true);
                    }
                  }
                })
                .catch(console.error);
            }}
            onAllQuestionsSolved={() => {
              setAllQuestionsSolved(true);
              setIsDoorVisible(true);
              showToast('✨ All Chamber Riddles Solved! The Exit Gateway has appeared in the room!', 'success');
            }}
            onEliminated={() => {
              setIsEliminated(true);
              showToast('Time expired! You have been eliminated from this chamber.', 'error');
            }}
          />
        </div>

      </div>

      {/* Escape Blocked / Incomplete Modal */}
      {escapeError && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border-2 border-red-700 p-6 rounded-2xl max-w-md w-full space-y-4 text-center shadow-torch">
            <span className="text-4xl">🔒</span>
            <h3 className="font-temple text-xl font-bold text-red-200">
              The Exit Door Is Sealed!
            </h3>
            <p className="text-xs text-amber-200/80">
              {escapeError.message}
            </p>

            {escapeError.unmet.length > 0 && (
              <div className="bg-stone-950 p-3 rounded-lg text-left text-xs space-y-1 text-red-300">
                <p className="font-bold text-amber-300">Missing Requirements:</p>
                {escapeError.unmet.map((item, idx) => (
                  <p key={idx}>• {item}</p>
                ))}
              </div>
            )}

            <button
              onClick={() => setEscapeError(null)}
              className="w-full py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs font-temple font-bold border border-stone-600 transition"
            >
              Return To Room
            </button>
          </div>
        </div>
      )}

      {/* Chamber Elimination Modal */}
      {isEliminated && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-b from-stone-900 via-stone-950 to-red-950 border-4 border-red-600 p-8 rounded-2xl max-w-md w-full space-y-6 text-center shadow-torch-lg">
            <div className="text-5xl animate-pulse">💀</div>
            <div className="space-y-2">
              <h3 className="font-temple text-2xl font-black text-red-400 tracking-wider">
                CHAMBER ELIMINATION
              </h3>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                The ancient sands of time have run dry! All three 10-second extensions were exhausted, sealing the chamber forever.
              </p>
            </div>

            <div className="p-3 bg-red-950/80 border border-red-700/60 rounded-xl text-left text-xs space-y-1.5 text-red-200">
              <p className="font-bold text-amber-300">Temple Verdict:</p>
              <p>• The cipher locked permanently.</p>
              <p>• The exit gateway remains hidden.</p>
              <p>• You must restart this chamber to try again.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestartChamber}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-stone-950 font-temple font-black text-xs tracking-wider shadow-torch transition transform hover:scale-105"
              >
                🔄 Restart Chamber
              </button>
              <button
                onClick={onReturnToLevels}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs font-temple font-bold border border-stone-600 transition"
              >
                Return To Level Grid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Victory / Escape Success Modal */}
      {escapeSuccess && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-b from-stone-900 via-stone-900 to-amber-950 border-4 border-temple-goldBright p-8 rounded-2xl max-w-lg w-full text-center space-y-6 shadow-torch-lg">
            <div className="text-5xl animate-bounce">🏆</div>
            <div className="space-y-2">
              <h3 className="font-temple text-3xl font-black text-temple-goldBright">
                Chamber Escaped!
              </h3>
              <p className="text-sm text-amber-200">
                {escapeSuccess.message}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {escapeSuccess.nextLevel ? (
                <button
                  onClick={() => {
                    const nextId = escapeSuccess.nextLevel.id;
                    setEscapeSuccess(null);
                    onAdvanceNextLevel(nextId);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-stone-950 font-temple font-black text-sm tracking-wider shadow-torch transition transform hover:scale-105"
                >
                  Enter Chamber {escapeSuccess.nextLevel.level_number} →
                </button>
              ) : (
                <p className="text-xs text-amber-300 font-temple">
                  You have conquered all available tiers for this subject!
                </p>
              )}

              <button
                onClick={() => {
                  setEscapeSuccess(null);
                  onReturnToLevels();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs font-temple font-bold border border-stone-700 transition"
              >
                Return To Level Grid
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default GamePage;
