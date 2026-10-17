// ============================================================
// routes/questions.js: Academic Questions & Server-side Validation
// ============================================================
const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const { 
  sampleQuestions, 
  offlinePlayerAnswers, 
  offlinePlayerInventory, 
  offlineQuestionSessions,
  offlineEliminatedLevels
} = require('../sampleData');

// 1. GET /api/questions/:questionId
router.get('/:questionId', async (req, res) => {
  const questionId = parseInt(req.params.questionId, 10);
  if (isNaN(questionId)) {
    return res.status(400).json({ error: 'Invalid ID', message: 'Question ID must be a number.' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT id, level_id, question_text, question_type, 
              option_a, option_b, option_c, option_d, hint, points
       FROM questions
       WHERE id = ?`,
      [questionId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Not Found', message: 'Question not found.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.warn('[DB Offline] Serving single question from fallback dataset');
    res.setHeader('X-Data-Source', 'offline_fallback');
    const q = sampleQuestions.find(item => item.id === questionId);
    if (!q) return res.status(404).json({ error: 'Not Found', message: 'Question not found.' });
    const { correct_answer, ...safeQ } = q;
    res.json(safeQ);
  }
});

// 2. POST /api/questions/:questionId/extend
// Extends question remaining time by exactly +10 seconds (Max 3 extensions per question)
router.post('/:questionId/extend', async (req, res) => {
  const questionId = parseInt(req.params.questionId, 10);
  const { playerId = 'demo-player', levelId = 1 } = req.body || {};

  if (isNaN(questionId)) {
    return res.status(400).json({ error: 'Invalid ID', message: 'Question ID must be a number.' });
  }

  try {
    // 0. Verify question exists
    const [qRows] = await pool.query('SELECT id, level_id FROM questions WHERE id = ?', [questionId]);
    if (qRows.length === 0) {
      return res.status(404).json({ error: 'Not Found', message: 'Question not found.' });
    }

    const [rows] = await pool.query(
      'SELECT * FROM player_question_sessions WHERE player_id = ? AND question_id = ?',
      [String(playerId).trim(), questionId]
    );

    let session;
    if (rows.length === 0) {
      const qLevelId = qRows[0].level_id;
      const [invRows] = await pool.query(
        `SELECT pi.id FROM player_inventory pi
         JOIN items i ON pi.item_id = i.id
         WHERE pi.player_id = ? AND pi.level_id = ? AND i.item_type = 'key'`,
        [String(playerId).trim(), qLevelId]
      );
      if (invRows.length === 0) {
        return res.status(400).json({ error: 'No Session', message: 'Question session has not started yet.' });
      }
      const deadline = new Date(Date.now() + 25000);
      await pool.query(
        `INSERT INTO player_question_sessions (player_id, level_id, question_id, deadline, extensions_used)
         VALUES (?, ?, ?, ?, 0)`,
        [String(playerId).trim(), qLevelId, questionId, deadline]
      );
      session = {
        deadline,
        extensions_used: 0,
        is_eliminated: false
      };
    } else {
      session = rows[0];
    }

    if (session.is_eliminated) {
      return res.status(403).json({ error: 'Eliminated', message: 'Player has been eliminated from this chamber.' });
    }

    if (session.extensions_used >= 3) {
      return res.status(400).json({
        error: 'Limit Reached',
        message: 'Maximum 3 extensions already used for this question.'
      });
    }

    // Add +10 seconds to the remaining time or from now if already past
    const now = Date.now();
    const currentDeadlineMs = new Date(session.deadline).getTime();
    let newDeadlineMs;
    if (currentDeadlineMs > now) {
      newDeadlineMs = currentDeadlineMs + 10000;
    } else {
      newDeadlineMs = now + 10000;
    }

    const newDeadline = new Date(newDeadlineMs);
    const newExtensionsUsed = session.extensions_used + 1;

    await pool.query(
      `UPDATE player_question_sessions 
       SET deadline = ?, extensions_used = ?
       WHERE player_id = ? AND question_id = ?`,
      [newDeadline, newExtensionsUsed, String(playerId).trim(), questionId]
    );

    const remainingSeconds = Math.max(0, Math.floor((newDeadlineMs - now) / 1000));
    const extensionsLeft = Math.max(0, 3 - newExtensionsUsed);

    res.json({
      success: true,
      message: `Time extended by +10 seconds! (${extensionsLeft} extensions remaining)`,
      extensionsUsed: newExtensionsUsed,
      extensionsLeft,
      remainingSeconds,
      deadline: newDeadline
    });

  } catch (error) {
    console.warn('[DB Offline] Handling extension via fallback logic');
    res.setHeader('X-Data-Source', 'offline_fallback');

    const targetQ = sampleQuestions.find(q => q.id === questionId);
    if (!targetQ) {
      return res.status(404).json({ error: 'Not Found', message: 'Question not found.' });
    }

    const qLevelId = targetQ.level_id;
    const sessKey = `${playerId}_${qLevelId}_${questionId}`;
    let session = offlineQuestionSessions[sessKey];

    if (!session) {
      const playerInv = offlinePlayerInventory[playerId] || [];
      const hasKey = playerInv.some(i => i.level_id === qLevelId && i.item_type === 'key');
      if (!hasKey) {
        return res.status(400).json({ error: 'No Session', message: 'Question session has not started yet.' });
      }
      session = {
        deadline: new Date(Date.now() + 25000),
        extensions_used: 0,
        is_eliminated: false
      };
      offlineQuestionSessions[sessKey] = session;
    }

    if (session.is_eliminated) {
      return res.status(403).json({ error: 'Eliminated', message: 'Player has been eliminated from this chamber.' });
    }

    if (session.extensions_used >= 3) {
      return res.status(400).json({
        error: 'Limit Reached',
        message: 'Maximum 3 extensions already used for this question.'
      });
    }

    const now = Date.now();
    const currentDeadlineMs = new Date(session.deadline).getTime();
    let newDeadlineMs;
    if (currentDeadlineMs > now) {
      newDeadlineMs = currentDeadlineMs + 10000;
    } else {
      newDeadlineMs = now + 10000;
    }

    session.deadline = new Date(newDeadlineMs);
    session.extensions_used += 1;

    const remainingSeconds = Math.max(0, Math.floor((newDeadlineMs - now) / 1000));
    const extensionsLeft = Math.max(0, 3 - session.extensions_used);

    res.json({
      success: true,
      message: `Time extended by +10 seconds! (${extensionsLeft} extensions remaining)`,
      extensionsUsed: session.extensions_used,
      extensionsLeft,
      remainingSeconds,
      deadline: session.deadline
    });
  }
});

// 3. POST /api/questions/:questionId/answer
// Validates answer, enforces deadlines, prevents late submissions, and manages progression
router.post('/:questionId/answer', async (req, res) => {
  const questionId = parseInt(req.params.questionId, 10);
  const { answer, selectedOption, playerId = 'demo-player', levelId } = req.body || {};
  const submittedAnswer = (answer !== undefined && answer !== null) ? answer : selectedOption;

  if (isNaN(questionId)) {
    return res.status(400).json({ error: 'Invalid ID', message: 'Question ID must be a number.' });
  }

  if (submittedAnswer === undefined || submittedAnswer === null || String(submittedAnswer).trim() === '') {
    return res.status(400).json({ error: 'Missing Answer', message: 'Please provide an answer.' });
  }

  try {
    // 0. Verify question exists
    const [rows] = await pool.query(
      'SELECT id, level_id, correct_answer, option_a, option_b, option_c, option_d, points, explanation FROM questions WHERE id = ?',
      [questionId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Not Found', message: 'Question not found.' });
    }

    const question = rows[0];
    const qLevelId = question.level_id;

    // 1. Verify key discovery for this specific chamber
    const [invRows] = await pool.query(
      `SELECT pi.id FROM player_inventory pi
       JOIN items i ON pi.item_id = i.id
       WHERE pi.player_id = ? AND pi.level_id = ? AND i.item_type = 'key'`,
      [String(playerId).trim(), qLevelId]
    );
    if (invRows.length === 0) {
      return res.status(403).json({
        error: 'Key Required',
        message: 'You must discover this chamber\'s key before solving questions!'
      });
    }

    // 2. Fetch session and verify deadline
    const [sessRows] = await pool.query(
      'SELECT * FROM player_question_sessions WHERE player_id = ? AND question_id = ?',
      [String(playerId).trim(), questionId]
    );

    if (sessRows.length > 0) {
      const session = sessRows[0];
      if (session.is_eliminated) {
        return res.status(403).json({
          error: 'Eliminated',
          message: 'Player has been eliminated from this chamber.'
        });
      }

      const now = req.headers['x-test-now'] ? parseInt(req.headers['x-test-now'], 10) : Date.now();
      const deadlineMs = new Date(session.deadline).getTime();

      if (now > deadlineMs) {
        if (session.extensions_used >= 3) {
          await pool.query(
            'UPDATE player_question_sessions SET is_eliminated = TRUE WHERE player_id = ? AND question_id = ?',
            [String(playerId).trim(), questionId]
          );
          return res.status(403).json({
            correct: false,
            eliminated: true,
            message: 'Time expired! All 3 extensions were used. You have been eliminated from this chamber.'
          });
        } else {
          return res.status(400).json({
            correct: false,
            message: 'Time has expired! Use an extension (+10s) before submitting your answer.'
          });
        }
      }
    }

    // 3. Compare answers
    const cleanSubmitted = String(submittedAnswer).trim().toLowerCase();
    const cleanStored = String(question.correct_answer).trim().toLowerCase();
    let isCorrect = (cleanSubmitted === cleanStored);

    if (!isCorrect && ['a', 'b', 'c', 'd'].includes(cleanSubmitted)) {
      const optVal = question[`option_${cleanSubmitted}`];
      if (optVal && String(optVal).trim().toLowerCase() === cleanStored) {
        isCorrect = true;
      }
    }
    if (!isCorrect && ['a', 'b', 'c', 'd'].includes(cleanStored)) {
      const optVal = question[`option_${cleanStored}`];
      if (optVal && String(optVal).trim().toLowerCase() === cleanSubmitted) {
        isCorrect = true;
      }
    }

    if (!isCorrect) {
      return res.json({
        correct: false,
        isCorrect: false,
        message: 'That answer is incorrect. Examine the chamber clues and try again.'
      });
    }

    // Record correct answer
    await pool.query(
      `INSERT INTO player_answers (player_id, level_id, question_id, is_correct, submitted_answer)
       VALUES (?, ?, ?, TRUE, ?)
       ON DUPLICATE KEY UPDATE 
         is_correct = TRUE, 
         submitted_answer = VALUES(submitted_answer),
         answered_at = CURRENT_TIMESTAMP`,
      [String(playerId).trim(), qLevelId, questionId, String(submittedAnswer).trim()]
    );

    // Mark current session completed
    await pool.query(
      'UPDATE player_question_sessions SET is_completed = TRUE WHERE player_id = ? AND question_id = ?',
      [String(playerId).trim(), questionId]
    );

    // Check if more questions exist for this level
    const [allLevelQuestions] = await pool.query(
      'SELECT id FROM questions WHERE level_id = ? ORDER BY id ASC',
      [qLevelId]
    );
    const [allCorrectAnswers] = await pool.query(
      'SELECT question_id FROM player_answers WHERE player_id = ? AND level_id = ? AND is_correct = TRUE',
      [String(playerId).trim(), qLevelId]
    );

    const solvedSet = new Set(allCorrectAnswers.map(a => a.question_id));
    const nextQuestion = allLevelQuestions.find(q => !solvedSet.has(q.id));

    if (nextQuestion) {
      // Start fresh 25s session for next question
      const nextDeadline = new Date(Date.now() + 25000);
      await pool.query(
        `INSERT INTO player_question_sessions (player_id, level_id, question_id, deadline, extensions_used)
         VALUES (?, ?, ?, ?, 0)
         ON DUPLICATE KEY UPDATE deadline = VALUES(deadline), extensions_used = 0, is_eliminated = FALSE`,
        [String(playerId).trim(), qLevelId, nextQuestion.id, nextDeadline]
      );

      return res.json({
        correct: true,
        isCorrect: true,
        points: question.points,
        message: 'Correct! The chamber mechanism activates. Prepare for the next cipher!',
        explanation: question.explanation || 'Great job!',
        allQuestionsSolved: false,
        isDoorVisible: false,
        nextQuestionId: nextQuestion.id
      });
    } else {
      // All questions solved!
      return res.json({
        correct: true,
        isCorrect: true,
        points: question.points,
        message: 'Correct! All chamber ciphers solved. The massive stone exit door has appeared!',
        explanation: question.explanation || 'Masterful solving!',
        allQuestionsSolved: true,
        isDoorVisible: true
      });
    }

  } catch (error) {
    console.warn('[DB Offline] Checking answer using fallback logic');
    res.setHeader('X-Data-Source', 'offline_fallback');

    // 0. Verify question exists first
    const question = sampleQuestions.find(q => q.id === questionId);
    if (!question) {
      return res.status(404).json({ error: 'Not Found', message: 'Question not found.' });
    }
    const qLevelId = question.level_id;

    // 1. Key discovery check for THIS specific level
    const playerInv = offlinePlayerInventory[playerId] || [];
    const hasKey = playerInv.some(i => i.level_id === qLevelId && i.item_type === 'key');
    if (!hasKey) {
      return res.status(403).json({
        error: 'Key Required',
        message: 'You must discover this chamber\'s key before solving questions!'
      });
    }

    const sessKey = `${playerId}_${qLevelId}_${questionId}`;
    const session = offlineQuestionSessions[sessKey];

    if (session) {
      if (session.is_eliminated) {
        return res.status(403).json({ error: 'Eliminated', message: 'Player has been eliminated from this chamber.' });
      }

      const now = req.headers['x-test-now'] ? parseInt(req.headers['x-test-now'], 10) : Date.now();
      const deadlineMs = new Date(session.deadline).getTime();
      if (now > deadlineMs) {
        if (session.extensions_used >= 3) {
          session.is_eliminated = true;
          offlineEliminatedLevels[`${playerId}_${qLevelId}`] = true;
          return res.status(403).json({
            correct: false,
            isCorrect: false,
            eliminated: true,
            message: 'Time expired! All 3 extensions were used. You have been eliminated from this chamber.'
          });
        } else {
          return res.status(400).json({
            correct: false,
            isCorrect: false,
            message: 'Time has expired! Use an extension (+10s) before submitting your answer.'
          });
        }
      }
    }

    const cleanSubmitted = String(submittedAnswer).trim().toLowerCase();
    const cleanStored = String(question.correct_answer).trim().toLowerCase();
    let isCorrect = (cleanSubmitted === cleanStored);

    if (!isCorrect && ['a', 'b', 'c', 'd'].includes(cleanSubmitted)) {
      const optVal = question[`option_${cleanSubmitted}`];
      if (optVal && String(optVal).trim().toLowerCase() === cleanStored) {
        isCorrect = true;
      }
    }
    if (!isCorrect && ['a', 'b', 'c', 'd'].includes(cleanStored)) {
      const optVal = question[`option_${cleanStored}`];
      if (optVal && String(optVal).trim().toLowerCase() === cleanSubmitted) {
        isCorrect = true;
      }
    }

    if (!isCorrect) {
      return res.json({
        correct: false,
        isCorrect: false,
        message: 'That answer is incorrect. Examine the chamber clues and try again.'
      });
    }

    // Record correct
    if (!offlinePlayerAnswers[playerId]) offlinePlayerAnswers[playerId] = {};
    offlinePlayerAnswers[playerId][questionId] = true;

    if (session) session.is_completed = true;

    // Check next question
    const levelQuestions = sampleQuestions.filter(q => q.level_id === qLevelId);
    const nextQuestion = levelQuestions.find(q => !offlinePlayerAnswers[playerId][q.id]);

    if (nextQuestion) {
      const nextSessKey = `${playerId}_${qLevelId}_${nextQuestion.id}`;
      offlineQuestionSessions[nextSessKey] = {
        deadline: new Date(Date.now() + 25000),
        extensions_used: 0,
        is_eliminated: false
      };

      return res.json({
        correct: true,
        isCorrect: true,
        points: question.points || 10,
        message: 'Correct! The chamber mechanism activates. Prepare for the next cipher!',
        explanation: question.explanation || 'Great job!',
        allQuestionsSolved: false,
        isDoorVisible: false,
        nextQuestionId: nextQuestion.id
      });
    } else {
      return res.json({
        correct: true,
        isCorrect: true,
        points: question.points || 10,
        message: 'Correct! All chamber ciphers solved. The massive stone exit door has appeared!',
        explanation: question.explanation || 'Masterful solving!',
        allQuestionsSolved: true,
        isDoorVisible: true
      });
    }
  }
});

module.exports = router;
