// ============================================================
// src/components/QuestionPanel.jsx: Ancient Scroll Riddle Panel
// Features: 25s countdown timer, exactly three +10s extensions,
// server validation, elimination on timeout, and door reveal.
// ============================================================
import React, { useState, useEffect, useRef } from 'react';
import { submitQuestionAnswer, extendQuestionTimer } from '../config/api';

function QuestionPanel({
  questions = [],
  keyDiscovered = false,
  levelId = 1,
  playerId = 'demo-player',
  isEliminated = false,
  allQuestionsSolved = false,
  sessionData = null,
  onAnswerSuccess,
  onAllQuestionsSolved,
  onEliminated
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [textAnswer, setTextAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [extending, setExtending] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Timer & Extension state
  const [timeLeft, setTimeLeft] = useState(25);
  const [extensionsUsed, setExtensionsUsed] = useState(0);
  const timerRef = useRef(null);

  // Sync initial question index & server timing if restoring an existing attempt
  useEffect(() => {
    if (sessionData && sessionData.keyDiscovered) {
      if (sessionData.questionIndex !== undefined) {
        setCurrentIdx(sessionData.questionIndex);
      }
      if (sessionData.remainingSeconds !== undefined) {
        setTimeLeft(sessionData.remainingSeconds);
      }
      if (sessionData.extensionsUsed !== undefined) {
        setExtensionsUsed(sessionData.extensionsUsed);
      }
    }
  }, [sessionData]);

  const question = questions[currentIdx];
  const extensionsLeft = Math.max(0, 3 - extensionsUsed);

  // 1. Timer Countdown Effect
  // Runs ONLY after key is discovered, when not eliminated, and questions remain
  useEffect(() => {
    if (!keyDiscovered || isEliminated || allQuestionsSolved || !question) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Timer reached 0!
          // If no extensions remain (all 3 used), trigger elimination immediately
          if (extensionsUsed >= 3) {
            clearInterval(timerRef.current);
            if (onEliminated) onEliminated();
            return 0;
          }
          // If extensions remain, clamp to 0 and await player's extension click
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [keyDiscovered, isEliminated, allQuestionsSolved, question, extensionsUsed]);

  // Handle +10s Time Extension (Max 3 per question)
  async function handleRequestExtension() {
    if (extensionsUsed >= 3 || extending || isEliminated) return;

    try {
      setExtending(true);
      const res = await extendQuestionTimer(question.id, levelId, playerId);

      if (res.success) {
        setExtensionsUsed(res.extensionsUsed);
        // Add +10 seconds to the current countdown
        setTimeLeft(res.remainingSeconds);
        setFeedback({ correct: true, message: res.message });
      } else {
        setFeedback({ correct: false, message: res.message || 'Cannot extend time.' });
      }
    } catch (err) {
      setFeedback({ correct: false, message: 'Could not connect to server to extend time.' });
    } finally {
      setExtending(false);
    }
  }

  // Handle Answer Submission
  async function handleSubmit(e) {
    if (e) e.preventDefault();
    if (isEliminated) return;

    if (timeLeft <= 0) {
      setFeedback({
        correct: false,
        message: extensionsLeft > 0
          ? 'Time is up! Use an extension (+10s) before submitting.'
          : 'Time has expired! All extensions were used.'
      });
      return;
    }

    const answerToSubmit = question.question_type === 'multiple_choice' ? selectedOption : textAnswer;

    if (!answerToSubmit || String(answerToSubmit).trim() === '') {
      setFeedback({ correct: false, message: 'Please select or enter an answer before submitting.' });
      return;
    }

    try {
      setSubmitting(true);
      setFeedback(null);

      // Validate answer on backend
      const result = await submitQuestionAnswer(question.id, answerToSubmit, playerId, levelId);
      setFeedback(result);

      if (result.eliminated) {
        if (onEliminated) onEliminated();
        return;
      }

      if (result.correct) {
        if (onAnswerSuccess) onAnswerSuccess(question.id);

        if (result.allQuestionsSolved) {
          // All questions finished! Stop countdown and notify parent to reveal door
          if (timerRef.current) clearInterval(timerRef.current);
          if (onAllQuestionsSolved) onAllQuestionsSolved();
        } else {
          // Move to next question with a FRESH 25s timer and 3 FRESH extensions!
          if (currentIdx + 1 < questions.length) {
            setCurrentIdx((c) => c + 1);
            setTimeLeft(25);
            setExtensionsUsed(0);
            setSelectedOption('');
            setTextAnswer('');
            setShowHint(false);
          }
        }
      }
    } catch (err) {
      setFeedback({
        correct: false,
        message: 'Could not connect to the temple server to verify answer.'
      });
    } finally {
      setSubmitting(false);
    }
  }

  // 1. STATE: All questions already solved
  if (allQuestionsSolved) {
    return (
      <div className="bg-stone-900/95 border-2 border-emerald-500/60 p-6 rounded-xl shadow-torch space-y-4 text-center">
        <div className="text-4xl animate-bounce">✨</div>
        <h3 className="font-temple text-lg font-bold text-emerald-300">
          All Chamber Riddles Solved!
        </h3>
        <p className="text-xs text-amber-200/80 leading-relaxed">
          The ancient stone mechanisms rumble. The massive exit gateway has materialized in the chamber!
        </p>
        <div className="p-3 bg-emerald-950/60 border border-emerald-600/40 rounded-lg text-xs font-mono text-emerald-200">
          🚪 Exit Door is now visible in the room. Click it to escape!
        </div>
      </div>
    );
  }

  // 2. STATE: Key NOT yet discovered
  if (!keyDiscovered) {
    return (
      <div className="bg-stone-900/95 border-2 border-amber-800/60 p-6 rounded-xl shadow-torch space-y-4 text-center">
        <div className="text-4xl">🗝️</div>
        <h3 className="font-temple text-base font-bold text-amber-300">
          Chamber Cipher Locked
        </h3>
        <p className="text-xs text-amber-200/70 leading-relaxed">
          The riddle scrolls remain sealed beneath ancient temple wards. Explore the chamber and discover the hidden key to activate the question mechanism!
        </p>
        <div className="p-3 bg-stone-950/80 border border-stone-800 rounded-lg text-[11px] font-mono text-amber-400">
          ⏳ 25-Second Riddle Countdown begins upon key discovery.
        </div>
      </div>
    );
  }

  // 3. STATE: Configuration Error or No questions in level
  if (sessionData?.configurationError || !question || questions.length === 0) {
    return (
      <div className="bg-red-950/80 border-2 border-red-700/80 p-6 rounded-xl text-center space-y-3 shadow-torch">
        <span className="text-3xl">⚠️</span>
        <h3 className="font-temple text-base font-bold text-red-300">
          Chamber Cipher Configuration Error
        </h3>
        <p className="text-xs text-amber-200/80 leading-relaxed">
          {sessionData?.message || 'No academic ciphers are configured for this chamber. The exit door remains firmly sealed.'}
        </p>
      </div>
    );
  }

  // 4. ACTIVE QUESTION-SOLVING PHASE
  return (
    <div className="bg-stone-900/95 border-2 border-amber-600/40 p-5 rounded-xl shadow-torch space-y-4 text-left">
      
      {/* Header & Riddle Indicator */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">📜</span>
          <h3 className="font-temple text-sm font-bold text-temple-gold">
            Chamber Riddle {currentIdx + 1} of {questions.length}
          </h3>
        </div>
        <span className="text-[10px] font-mono text-amber-400 bg-temple-wood/90 px-2 py-0.5 rounded border border-amber-700/50">
          +{question.points || 10} Points
        </span>
      </div>

      {/* 25-SECOND COUNTDOWN TIMER & EXTENSIONS BAR */}
      <div className="bg-stone-950/90 border border-stone-800 p-3 rounded-lg flex flex-wrap items-center justify-between gap-3">
        {/* Countdown Display */}
        <div className="flex items-center gap-2.5">
          <span className="text-xl">⏳</span>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span
                className={`font-mono text-xl font-black ${
                  timeLeft > 10
                    ? 'text-emerald-400'
                    : timeLeft > 4
                    ? 'text-amber-400 animate-pulse'
                    : 'text-red-500 animate-bounce'
                }`}
              >
                {timeLeft}s
              </span>
              <span className="text-[10px] text-amber-300/60 uppercase font-mono tracking-wider">
                Remaining
              </span>
            </div>
            {/* Visual Progress Bar */}
            <div className="w-28 sm:w-36 h-1.5 bg-stone-800 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full transition-all duration-1000 ${
                  timeLeft > 10 ? 'bg-emerald-500' : timeLeft > 4 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(100, (timeLeft / 25) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Extension Button (Exactly 3 per question, +10s each) */}
        <div>
          <button
            type="button"
            onClick={handleRequestExtension}
            disabled={extensionsLeft === 0 || extending || isEliminated}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition flex items-center gap-1.5 ${
              extensionsLeft > 0
                ? 'bg-amber-950/80 hover:bg-amber-900 border-amber-600/70 text-amber-200 hover:scale-105 active:scale-95'
                : 'bg-stone-900 border-stone-800 text-stone-600 cursor-not-allowed'
            }`}
          >
            <span>⚡</span>
            <span>+10s Extension ({extensionsLeft} left)</span>
          </button>
        </div>
      </div>

      {/* Question Text */}
      <div className="bg-stone-950/80 border border-stone-800 p-4 rounded-lg">
        <p className="font-sans text-sm text-amber-100 leading-relaxed">
          {question.question_text}
        </p>
      </div>

      {/* Multiple Choice Options */}
      {question.question_type === 'multiple_choice' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {['option_a', 'option_b', 'option_c', 'option_d'].map((key) => {
            const val = question[key];
            if (!val) return null;
            const isSelected = selectedOption === val;

            return (
              <button
                key={key}
                type="button"
                disabled={isEliminated}
                onClick={() => setSelectedOption(val)}
                className={`p-3 rounded-lg text-left text-xs transition border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amber-600/40 border-temple-goldBright text-amber-100 font-bold shadow-sm'
                    : 'bg-stone-800/80 hover:bg-stone-700/80 border-stone-700 text-amber-200/80'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-stone-900 border border-amber-500/40 text-[10px] flex items-center justify-center font-bold">
                  {key.replace('option_', '').toUpperCase()}
                </span>
                <span>{val}</span>
              </button>
            );
          })}
        </div>
      ) : (
        /* Text-based Answer Input */
        <div className="space-y-1">
          <input
            type="text"
            disabled={isEliminated}
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full px-4 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-amber-100 text-xs focus:border-temple-gold focus:outline-none"
          />
        </div>
      )}

      {/* Buttons: Submit & Hint */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={handleSubmit}
          disabled={submitting || isEliminated}
          className="flex-1 py-2.5 rounded-lg bg-temple-gold hover:bg-temple-goldBright text-stone-950 font-temple font-bold text-xs tracking-wider transition shadow-sm disabled:opacity-50"
        >
          {submitting ? 'Verifying Cipher...' : 'Submit Answer'}
        </button>

        {question.hint && (
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 border border-amber-600/30 text-amber-300 text-xs font-temple transition flex items-center gap-1"
          >
            <span>💡</span>
            <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
          </button>
        )}
      </div>

      {/* Hint Panel */}
      {showHint && question.hint && (
        <div className="bg-amber-950/40 border border-amber-700/50 p-3 rounded-lg text-xs text-amber-200/90 italic flex items-start gap-2">
          <span>🕯️</span>
          <div>
            <strong className="not-italic text-amber-400 font-temple">Ancient Clue: </strong>
            {question.hint}
          </div>
        </div>
      )}

      {/* Live Server Feedback Alert */}
      {feedback && (
        <div
          className={`p-3 rounded-lg text-xs border flex items-center gap-2 ${
            feedback.correct
              ? 'bg-emerald-950/80 border-emerald-600 text-emerald-200'
              : 'bg-red-950/80 border-red-700 text-red-200'
          }`}
        >
          <span>{feedback.correct ? '✨' : '❌'}</span>
          <span>{feedback.message}</span>
        </div>
      )}

    </div>
  );
}

export default QuestionPanel;
