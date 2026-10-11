// ============================================================
// routes/progress.js: Player Inventory, Progress & Level Escape
// ============================================================
const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const { 
  sampleLevels, 
  sampleQuestions,
  sampleRequirements,
  offlinePlayerProgress, 
  offlinePlayerInventory, 
  offlinePlayerAnswers,
  offlineQuestionSessions,
  offlineEliminatedLevels
} = require('../sampleData');

// 1. GET /api/players/:playerId/inventory
router.get('/:playerId/inventory', async (req, res) => {
  const playerId = String(req.params.playerId).trim();
  const levelId = req.query.levelId ? parseInt(req.query.levelId, 10) : null;

  try {
    let query = `
      SELECT i.id, i.name, i.item_type, i.description, i.image_path, 
             pi.level_id, pi.collected_at
      FROM player_inventory pi
      JOIN items i ON pi.item_id = i.id
      WHERE pi.player_id = ?`;
    const params = [playerId];

    if (levelId && !isNaN(levelId)) {
      query += ' AND pi.level_id = ?';
      params.push(levelId);
    }

    query += ' ORDER BY pi.collected_at ASC';

    const [items] = await pool.query(query, params);
    res.json(items);
  } catch (error) {
    console.warn('[DB Offline] Serving inventory from fallback dataset');
    res.setHeader('X-Data-Source', 'offline_fallback');
    const allInv = offlinePlayerInventory[playerId] || [];
    const inv = (levelId && !isNaN(levelId))
      ? allInv.filter(item => item.level_id === levelId)
      : allInv;
    res.json(inv);
  }
});

// 2. GET /api/players/:playerId/progress
router.get('/:playerId/progress', async (req, res) => {
  const playerId = String(req.params.playerId).trim();

  try {
    const [progress] = await pool.query(
      `SELECT pp.id, pp.player_id, pp.subject_id, s.name AS subject_name,
              pp.level_id, l.level_number, l.name AS level_name,
              pp.status, pp.score, pp.attempts, pp.started_at, pp.completed_at
       FROM player_progress pp
       JOIN levels l ON pp.level_id = l.id
       JOIN subjects s ON pp.subject_id = s.id
       WHERE pp.player_id = ?
       ORDER BY pp.subject_id ASC, l.level_number ASC`,
      [playerId]
    );

    res.json(progress);
  } catch (error) {
    console.warn('[DB Offline] Serving player progress from fallback dataset');
    res.setHeader('X-Data-Source', 'offline_fallback');
    const prog = offlinePlayerProgress[playerId] || [
      { player_id: playerId, subject_id: 1, level_id: 1, status: 'unlocked', score: 0, attempts: 1 }
    ];
    res.json(prog);
  }
});

// 3. POST /api/players/:playerId/levels/:levelId/start
router.post('/:playerId/levels/:levelId/start', async (req, res) => {
  const playerId = String(req.params.playerId).trim();
  const levelId = parseInt(req.params.levelId, 10);

  if (isNaN(levelId)) {
    return res.status(400).json({ error: 'Invalid ID', message: 'Level ID must be a number.' });
  }

  try {
    const [levelRows] = await pool.query(
      'SELECT id, subject_id, level_number, name FROM levels WHERE id = ?',
      [levelId]
    );

    if (levelRows.length === 0) {
      return res.status(404).json({ error: 'Not Found', message: 'Level does not exist.' });
    }

    const currentLevel = levelRows[0];

    if (currentLevel.level_number > 1) {
      const [prevLevelRows] = await pool.query(
        'SELECT id FROM levels WHERE subject_id = ? AND level_number = ?',
        [currentLevel.subject_id, currentLevel.level_number - 1]
      );

      if (prevLevelRows.length > 0) {
        const prevLevelId = prevLevelRows[0].id;
        const [prevProgress] = await pool.query(
          'SELECT status FROM player_progress WHERE player_id = ? AND level_id = ? AND status = "completed"',
          [playerId, prevLevelId]
        );

        if (prevProgress.length === 0) {
          return res.status(403).json({
            error: 'Level Locked',
            message: `Level ${currentLevel.level_number} is locked! You must complete Level ${currentLevel.level_number - 1} first.`
          });
        }
      }
    }

    await pool.query(
      `INSERT INTO player_progress (player_id, subject_id, level_id, status, attempts)
       VALUES (?, ?, ?, 'in_progress', 1)
       ON DUPLICATE KEY UPDATE 
         attempts = attempts + 1,
         status = IF(status = 'completed', 'completed', 'in_progress')`,
      [playerId, currentLevel.subject_id, currentLevel.id]
    );

    res.json({
      success: true,
      message: `You entered Level ${currentLevel.level_number}: ${currentLevel.name}. Explore the room!`,
      level: currentLevel
    });

  } catch (error) {
    console.warn('[DB Offline] Starting level using fallback logic');
    res.setHeader('X-Data-Source', 'offline_fallback');

    const currentLevel = sampleLevels.find(l => l.id === levelId);
    if (!currentLevel) return res.status(404).json({ error: 'Not Found', message: 'Level does not exist.' });

    if (!offlinePlayerProgress[playerId]) {
      offlinePlayerProgress[playerId] = [
        { player_id: playerId, subject_id: currentLevel.subject_id, level_id: currentLevel.id, status: 'unlocked', score: 0, attempts: 1 }
      ];
    }

    res.json({
      success: true,
      message: `You entered Level ${currentLevel.level_number}: ${currentLevel.name}. Explore the room!`,
      level: currentLevel
    });
  }
});

// 4. POST /api/players/:playerId/levels/:levelId/complete
router.post('/:playerId/levels/:levelId/complete', async (req, res) => {
  const playerId = String(req.params.playerId).trim();
  const levelId = parseInt(req.params.levelId, 10);

  if (isNaN(levelId)) {
    return res.status(400).json({ error: 'Invalid ID', message: 'Level ID must be a number.' });
  }

  try {
    const [levelRows] = await pool.query(
      'SELECT id, subject_id, level_number, name FROM levels WHERE id = ?',
      [levelId]
    );

    if (levelRows.length === 0) {
      return res.status(404).json({ error: 'Not Found', message: 'Level does not exist.' });
    }

    const currentLevel = levelRows[0];

    // Check if player is eliminated in this chamber
    const [elimRows] = await pool.query(
      'SELECT id FROM player_question_sessions WHERE player_id = ? AND level_id = ? AND is_eliminated = TRUE',
      [playerId, levelId]
    );
    if (elimRows.length > 0) {
      return res.status(403).json({
        success: false,
        completed: false,
        message: 'You have been eliminated from this chamber! Restart the chamber to attempt escape.'
      });
    }

    const [requirements] = await pool.query(
      'SELECT id, requirement_type, requirement_value, description FROM level_requirements WHERE level_id = ?',
      [levelId]
    );

    const unmetRequirements = [];

    for (const req of requirements) {
      if (req.requirement_type === 'item_collected') {
        const [inv] = await pool.query(
          'SELECT id FROM player_inventory WHERE player_id = ? AND item_id = ? AND level_id = ?',
          [playerId, parseInt(req.requirement_value, 10), levelId]
        );
        if (inv.length === 0) {
          unmetRequirements.push(req.description || `Missing required item (ID ${req.requirement_value})`);
        }
      } else if (req.requirement_type === 'question_answered') {
        const [ans] = await pool.query(
          'SELECT id FROM player_answers WHERE player_id = ? AND question_id = ? AND is_correct = TRUE',
          [playerId, parseInt(req.requirement_value, 10)]
        );
        if (ans.length === 0) {
          unmetRequirements.push(req.description || `Required question (ID ${req.requirement_value}) has not been solved`);
        }
      }
    }

    if (unmetRequirements.length > 0) {
      return res.status(403).json({
        success: false,
        completed: false,
        message: 'The temple exit remains sealed! You have not completed all requirements for this chamber.',
        unmetRequirements
      });
    }

    await pool.query(
      `INSERT INTO player_progress (player_id, subject_id, level_id, status, score, completed_at)
       VALUES (?, ?, ?, 'completed', 100, CURRENT_TIMESTAMP)
       ON DUPLICATE KEY UPDATE 
         status = 'completed',
         score = score + 50,
         completed_at = CURRENT_TIMESTAMP`,
      [playerId, currentLevel.subject_id, currentLevel.id]
    );

    const [nextLevelRows] = await pool.query(
      'SELECT id, subject_id, level_number, name FROM levels WHERE subject_id = ? AND level_number = ?',
      [currentLevel.subject_id, currentLevel.level_number + 1]
    );

    let nextLevel = null;
    if (nextLevelRows.length > 0) {
      nextLevel = nextLevelRows[0];
      await pool.query(
        `INSERT INTO player_progress (player_id, subject_id, level_id, status)
         VALUES (?, ?, ?, 'unlocked')
         ON DUPLICATE KEY UPDATE status = IF(status = 'completed', 'completed', 'unlocked')`,
        [playerId, currentLevel.subject_id, nextLevel.id]
      );
    }

    res.json({
      success: true,
      completed: true,
      message: `Congratulations! You unlocked the exit door and escaped Level ${currentLevel.level_number}: ${currentLevel.name}!`,
      escapedLevel: currentLevel,
      nextLevel
    });

  } catch (error) {
    console.warn('[DB Offline] Validating level completion via fallback logic');
    res.setHeader('X-Data-Source', 'offline_fallback');

    const currentLevel = sampleLevels.find(l => l.id === levelId);
    if (!currentLevel) return res.status(404).json({ error: 'Not Found', message: 'Level does not exist.' });

    // Check if player is eliminated in fallback mode
    if (offlineEliminatedLevels[`${playerId}_${levelId}`]) {
      return res.status(403).json({
        success: false,
        completed: false,
        message: 'You have been eliminated from this chamber! Restart the chamber to attempt escape.'
      });
    }

    const reqs = sampleRequirements.filter(r => r.level_id === levelId);
    const unmetRequirements = [];
    const playerInv = offlinePlayerInventory[playerId] || [];
    const playerAns = offlinePlayerAnswers[playerId] || {};

    for (const req of reqs) {
      if (req.requirement_type === 'item_collected') {
        const hasItem = playerInv.some(i => i.id === parseInt(req.requirement_value, 10) && i.level_id === levelId);
        if (!hasItem) unmetRequirements.push(req.description || `Missing required item (ID ${req.requirement_value})`);
      } else if (req.requirement_type === 'question_answered') {
        const hasAnswered = !!playerAns[parseInt(req.requirement_value, 10)];
        if (!hasAnswered) unmetRequirements.push(req.description || `Required question (ID ${req.requirement_value}) has not been solved`);
      }
    }

    if (unmetRequirements.length > 0) {
      return res.status(403).json({
        success: false,
        completed: false,
        message: 'The temple exit remains sealed! You have not completed all requirements for this chamber.',
        unmetRequirements
      });
    }

    // Mark completed in offline store
    if (!offlinePlayerProgress[playerId]) offlinePlayerProgress[playerId] = [];
    const existing = offlinePlayerProgress[playerId].find(p => p.level_id === levelId);
    if (existing) {
      existing.status = 'completed';
    } else {
      offlinePlayerProgress[playerId].push({
        player_id: playerId,
        subject_id: currentLevel.subject_id,
        level_id: currentLevel.id,
        status: 'completed',
        score: 100
      });
    }

    // Find and unlock next level
    const nextLevel = sampleLevels.find(l => l.subject_id === currentLevel.subject_id && l.level_number === currentLevel.level_number + 1);
    if (nextLevel) {
      const nextProg = offlinePlayerProgress[playerId].find(p => p.level_id === nextLevel.id);
      if (!nextProg) {
        offlinePlayerProgress[playerId].push({
          player_id: playerId,
          subject_id: currentLevel.subject_id,
          level_id: nextLevel.id,
          status: 'unlocked',
          score: 0
        });
      }
    }

    res.json({
      success: true,
      completed: true,
      message: `Congratulations! You unlocked the exit door and escaped Level ${currentLevel.level_number}: ${currentLevel.name}!`,
      escapedLevel: currentLevel,
      nextLevel
    });
  }
});

// 5. POST /api/players/:playerId/levels/:levelId/restart
// Resets the active attempt for a level (clears timers, extensions, elimination, and level answers)
router.post('/:playerId/levels/:levelId/restart', async (req, res) => {
  const playerId = String(req.params.playerId).trim();
  const levelId = parseInt(req.params.levelId, 10);

  if (isNaN(levelId)) {
    return res.status(400).json({ error: 'Invalid ID', message: 'Level ID must be a number.' });
  }

  try {
    // Delete question sessions for this level
    await pool.query(
      'DELETE FROM player_question_sessions WHERE player_id = ? AND level_id = ?',
      [playerId, levelId]
    );

    // Delete answers for this level so the player must solve them again
    const [qRows] = await pool.query('SELECT id FROM questions WHERE level_id = ?', [levelId]);
    for (const q of qRows) {
      await pool.query(
        'DELETE FROM player_answers WHERE player_id = ? AND question_id = ?',
        [playerId, q.id]
      );
    }

    // Delete items collected in this level so the key can be found again
    await pool.query(
      'DELETE FROM player_inventory WHERE player_id = ? AND level_id = ?',
      [playerId, levelId]
    );

    res.json({
      success: true,
      message: 'Chamber restarted! Search for the key and solve the riddles.'
    });

  } catch (error) {
    console.warn('[DB Offline] Restarting level via fallback logic');
    res.setHeader('X-Data-Source', 'offline_fallback');

    const elimKey = `${playerId}_${levelId}`;
    offlineEliminatedLevels[elimKey] = false;

    // Clear question sessions for this level
    const levelQuestions = sampleQuestions.filter(q => q.level_id === levelId);
    for (const q of levelQuestions) {
      delete offlineQuestionSessions[`${playerId}_${levelId}_${q.id}`];
      if (offlinePlayerAnswers[playerId]) {
        delete offlinePlayerAnswers[playerId][q.id];
      }
    }

    // Clear items collected in this level
    if (offlinePlayerInventory[playerId]) {
      offlinePlayerInventory[playerId] = offlinePlayerInventory[playerId].filter(i => i.level_id !== levelId);
    }

    res.json({
      success: true,
      message: 'Chamber restarted! Search for the key and solve the riddles.'
    });
  }
});

module.exports = router;

