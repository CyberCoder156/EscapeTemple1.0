// ============================================================
// routes/levels.js: Individual Level Details, Questions & Objects
// ============================================================
const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const { 
  sampleSubjects,
  sampleLevels, 
  sampleObjects, 
  sampleQuestions, 
  sampleItems, 
  sampleRequirements,
  offlinePlayerInventory,
  offlineQuestionSessions,
  offlinePlayerAnswers,
  offlineEliminatedLevels
} = require('../sampleData');
const { validateLevel, validateAllLevels } = require('../validators/levelValidator');

// Validation Endpoint: Validate all playable levels
router.get('/validate-all', async (req, res) => {
  try {
    const results = await validateAllLevels();
    const allValid = results.every(r => r.valid);
    res.json({
      success: true,
      allValid,
      totalChecked: results.length,
      levels: results
    });
  } catch (err) {
    res.status(500).json({ error: 'Validation Error', message: err.message });
  }
});

// Validation Endpoint: Validate a single level
router.get('/:levelId/validate', async (req, res) => {
  const levelId = parseInt(req.params.levelId, 10);
  if (isNaN(levelId)) {
    return res.status(400).json({ error: 'Invalid ID', message: 'Level ID must be a number.' });
  }
  try {
    const validation = await validateLevel(levelId);
    res.json(validation);
  } catch (err) {
    res.status(500).json({ error: 'Validation Error', message: err.message });
  }
});

// 1. GET /api/levels/:levelId
router.get('/:levelId', async (req, res) => {
  const levelId = parseInt(req.params.levelId, 10);
  if (isNaN(levelId)) {
    return res.status(400).json({ error: 'Invalid ID', message: 'Level ID must be a number.' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT l.id, l.subject_id, s.name AS subject_name, l.level_number, 
              l.name, l.description, l.difficulty, l.room_background
       FROM levels l
       JOIN subjects s ON l.subject_id = s.id
       WHERE l.id = ?`,
      [levelId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Not Found', message: 'Level not found.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.warn('[DB Offline] Serving level details from fallback dataset');
    res.setHeader('X-Data-Source', 'offline_fallback');
    const found = sampleLevels.find(l => l.id === levelId);
    if (!found) return res.status(404).json({ error: 'Not Found', message: 'Level not found.' });
    const subject = sampleSubjects.find(s => s.id === found.subject_id);
    res.json({ ...found, subject_name: subject ? subject.name : 'Unknown' });
  }
});

// 2. GET /api/levels/:levelId/questions
// Returns questions for this level WITHOUT exposing correct_answer
router.get('/:levelId/questions', async (req, res) => {
  const levelId = parseInt(req.params.levelId, 10);
  if (isNaN(levelId)) {
    return res.status(400).json({ error: 'Invalid ID', message: 'Level ID must be a number.' });
  }

  try {
    const [questions] = await pool.query(
      `SELECT id, level_id, question_text, question_type, 
              option_a, option_b, option_c, option_d, hint, points
       FROM questions
       WHERE level_id = ?
       ORDER BY id ASC`,
      [levelId]
    );

    res.json(questions);
  } catch (error) {
    console.warn('[DB Offline] Serving questions from fallback dataset');
    res.setHeader('X-Data-Source', 'offline_fallback');
    const questions = sampleQuestions
      .filter(q => q.level_id === levelId)
      .map(({ correct_answer, ...safeQ }) => safeQ);
    res.json(questions);
  }
});

// 3. GET /api/levels/:levelId/objects
// Returns visible interactive room objects for the level
router.get('/:levelId/objects', async (req, res) => {
  const levelId = parseInt(req.params.levelId, 10);
  if (isNaN(levelId)) {
    return res.status(400).json({ error: 'Invalid ID', message: 'Level ID must be a number.' });
  }

  try {
    const [objects] = await pool.query(
      `SELECT ro.id, ro.level_id, ro.object_name, ro.object_type, 
              ro.position_x, ro.position_y, ro.image_path, ro.animation_type, 
              ro.description, ro.is_required, ro.required_item_id,
              req_item.name AS required_item_name
       FROM room_objects ro
       LEFT JOIN items req_item ON ro.required_item_id = req_item.id
       WHERE ro.level_id = ?
       ORDER BY ro.id ASC`,
      [levelId]
    );

    res.json(objects);
  } catch (error) {
    console.warn('[DB Offline] Serving room objects from fallback dataset');
    res.setHeader('X-Data-Source', 'offline_fallback');
    const objects = sampleObjects.filter(obj => obj.level_id === levelId);
    res.json(objects);
  }
});

// 4. POST /api/levels/:levelId/objects/:objectId/interact
// Validates an interaction with an object (checks required keys, awards hidden items)
router.post('/:levelId/objects/:objectId/interact', async (req, res) => {
  const levelId = parseInt(req.params.levelId, 10);
  const objectId = parseInt(req.params.objectId, 10);
  const playerId = (req.body && req.body.playerId) ? String(req.body.playerId).trim() : 'demo-player';

  if (isNaN(levelId) || isNaN(objectId)) {
    return res.status(400).json({ error: 'Invalid Request', message: 'Level ID and Object ID must be numbers.' });
  }

  try {
    const [objRows] = await pool.query(
      `SELECT ro.*, 
              req_item.name AS required_item_name,
              hid_item.name AS hidden_item_name,
              hid_item.item_type AS hidden_item_type,
              hid_item.description AS hidden_item_description,
              hid_item.image_path AS hidden_item_image
       FROM room_objects ro
       LEFT JOIN items req_item ON ro.required_item_id = req_item.id
       LEFT JOIN items hid_item ON ro.hidden_item_id = hid_item.id
       WHERE ro.id = ? AND ro.level_id = ?`,
      [objectId, levelId]
    );

    if (objRows.length === 0) {
      return res.status(404).json({ error: 'Not Found', message: 'This object does not exist in this temple room.' });
    }

    const roomObject = objRows[0];

    // Check required item
    if (roomObject.required_item_id) {
      const [invRows] = await pool.query(
        'SELECT id FROM player_inventory WHERE player_id = ? AND item_id = ? AND level_id = ?',
        [playerId, roomObject.required_item_id, levelId]
      );

      if (invRows.length === 0) {
        return res.status(403).json({
          success: false,
          unlocked: false,
          message: `The ${roomObject.object_name} is firmly locked! You need the ${roomObject.required_item_name || 'proper key'} to open it.`,
          requiredItem: roomObject.required_item_name
        });
      }
    }

    // Check hidden item
    let discoveredItem = null;
    let alreadyCollected = false;

    if (roomObject.hidden_item_id) {
      const [existingItem] = await pool.query(
        'SELECT id FROM player_inventory WHERE player_id = ? AND item_id = ? AND level_id = ?',
        [playerId, roomObject.hidden_item_id, levelId]
      );

      if (existingItem.length > 0) {
        alreadyCollected = true;
      } else {
        await pool.query(
          'INSERT INTO player_inventory (player_id, item_id, level_id) VALUES (?, ?, ?)',
          [playerId, roomObject.hidden_item_id, levelId]
        );

        discoveredItem = {
          id: roomObject.hidden_item_id,
          name: roomObject.hidden_item_name,
          type: roomObject.hidden_item_type,
          description: roomObject.hidden_item_description,
          image: roomObject.hidden_item_image
        };
      }
    }

    let message = `You examined the ${roomObject.object_name}.`;
    if (discoveredItem) message = `Success! You discovered: ${discoveredItem.name}! Added to your inventory.`;
    else if (alreadyCollected) message = `You already retrieved the hidden item from this ${roomObject.object_name}.`;
    else if (roomObject.required_item_id) message = `You unlocked the ${roomObject.object_name} using your ${roomObject.required_item_name}!`;

    res.json({
      success: true,
      objectId: roomObject.id,
      objectName: roomObject.object_name,
      animation: roomObject.animation_type,
      message,
      itemDiscovered: discoveredItem,
      alreadyCollected
    });

  } catch (error) {
    console.warn('[DB Offline] Handling object interaction via fallback logic');
    res.setHeader('X-Data-Source', 'offline_fallback');

    const roomObject = sampleObjects.find(o => o.id === objectId && o.level_id === levelId);
    if (!roomObject) return res.status(404).json({ error: 'Not Found', message: 'Object not found in this chamber.' });

    if (!offlinePlayerInventory[playerId]) offlinePlayerInventory[playerId] = [];
    const playerInv = offlinePlayerInventory[playerId];

    // Check required item
    if (roomObject.required_item_id) {
      const hasKey = playerInv.some(i => i.id === roomObject.required_item_id && i.level_id === levelId);
      if (!hasKey) {
        return res.status(403).json({
          success: false,
          unlocked: false,
          message: `The ${roomObject.object_name} is locked! You need the ${roomObject.required_item_name || 'proper key'} to open it.`,
          requiredItem: roomObject.required_item_name
        });
      }
    }

    let discoveredItem = null;
    let alreadyCollected = false;

    if (roomObject.hidden_item_id) {
      const alreadyHas = playerInv.some(i => i.id === roomObject.hidden_item_id && i.level_id === levelId);
      if (alreadyHas) {
        alreadyCollected = true;
      } else {
        const itemInfo = sampleItems.find(i => i.id === roomObject.hidden_item_id);
        if (itemInfo) {
          playerInv.push({ ...itemInfo, level_id: levelId });
          discoveredItem = itemInfo;
        }
      }
    }

    let message = `You examined the ${roomObject.object_name}.`;
    if (discoveredItem) message = `Success! You discovered: ${discoveredItem.name}! Added to your inventory.`;
    else if (alreadyCollected) message = `You already retrieved the hidden item from this ${roomObject.object_name}.`;
    else if (roomObject.required_item_id) message = `You unlocked the ${roomObject.object_name}!`;

    res.json({
      success: true,
      objectId: roomObject.id,
      objectName: roomObject.object_name,
      animation: roomObject.animation_type,
      message,
      itemDiscovered: discoveredItem,
      alreadyCollected
    });
  }
});

// 5. GET /api/levels/:levelId/requirements
router.get('/:levelId/requirements', async (req, res) => {
  const levelId = parseInt(req.params.levelId, 10);
  if (isNaN(levelId)) {
    return res.status(400).json({ error: 'Invalid ID', message: 'Level ID must be a number.' });
  }

  try {
    const [requirements] = await pool.query(
      `SELECT id, level_id, requirement_type, requirement_value, description 
       FROM level_requirements 
       WHERE level_id = ?`,
      [levelId]
    );

    res.json(requirements);
  } catch (error) {
    console.warn('[DB Offline] Serving level requirements from fallback dataset');
    res.setHeader('X-Data-Source', 'offline_fallback');
    const reqs = sampleRequirements.filter(r => r.level_id === levelId);
    res.json(reqs);
  }
});

// 6. GET /api/levels/:levelId/question-session
// Authoritative server state for question progression, timer, extensions, and door visibility
router.get('/:levelId/question-session', async (req, res) => {
  const levelId = parseInt(req.params.levelId, 10);
  const playerId = req.query.playerId ? String(req.query.playerId).trim() : 'demo-player';

  if (isNaN(levelId)) {
    return res.status(400).json({ error: 'Invalid ID', message: 'Level ID must be a number.' });
  }

  try {
    // 0. Verify level exists
    const [lvlRows] = await pool.query('SELECT id FROM levels WHERE id = ?', [levelId]);
    if (lvlRows.length === 0) {
      return res.status(404).json({ error: 'Not Found', message: 'Level not found.' });
    }

    // 1. Fetch all questions for this level first
    const [questions] = await pool.query(
      'SELECT id FROM questions WHERE level_id = ? ORDER BY id ASC',
      [levelId]
    );

    if (questions.length === 0) {
      return res.json({
        keyDiscovered: false,
        isEliminated: false,
        allQuestionsSolved: false,
        isDoorVisible: false,
        configurationError: true,
        message: 'Chamber Configuration Error: No academic ciphers are configured for this chamber.'
      });
    }

    // 2. Check if the level's required key has been collected in inventory FOR THIS LEVEL
    const [reqRows] = await pool.query(
      `SELECT requirement_value FROM level_requirements 
       WHERE level_id = ? AND requirement_type = 'item_collected'`,
      [levelId]
    );

    const requiredItemId = reqRows.length > 0 ? parseInt(reqRows[0].requirement_value, 10) : null;

    const [invRows] = await pool.query(
      `SELECT pi.id FROM player_inventory pi
       JOIN items i ON pi.item_id = i.id
       WHERE pi.player_id = ? AND pi.level_id = ?
         AND (pi.item_id = ? OR i.item_type = 'key')`,
      [playerId, levelId, requiredItemId || 0]
    );

    const keyDiscovered = invRows.length > 0;

    if (!keyDiscovered) {
      return res.json({
        keyDiscovered: false,
        isEliminated: false,
        allQuestionsSolved: false,
        isDoorVisible: false,
        message: 'Explore the room to discover the required key!'
      });
    }

    const [answerRows] = await pool.query(
      'SELECT question_id FROM player_answers WHERE player_id = ? AND is_correct = TRUE',
      [playerId]
    );
    const solvedSet = new Set(answerRows.map(a => a.question_id));

    // Find first unsolved question
    const unsolvedIndex = questions.findIndex(q => !solvedSet.has(q.id));

    if (questions.length === 0 || unsolvedIndex === -1) {
      // No questions or all questions solved!
      return res.json({
        keyDiscovered: true,
        isEliminated: false,
        allQuestionsSolved: true,
        isDoorVisible: true,
        totalQuestions: questions.length,
        solvedCount: questions.length,
        message: questions.length === 0
          ? 'No chamber ciphers in this chamber. The exit gateway is open!'
          : 'All chamber riddles solved! The exit door has appeared.'
      });
    }

    const currentQuestion = questions[unsolvedIndex];

    // Check or create session for currentQuestion
    const [sessionRows] = await pool.query(
      'SELECT * FROM player_question_sessions WHERE player_id = ? AND level_id = ? AND question_id = ?',
      [playerId, levelId, currentQuestion.id]
    );

    let session;
    if (sessionRows.length === 0) {
      const deadline = new Date(Date.now() + 25000);
      await pool.query(
        `INSERT INTO player_question_sessions (player_id, level_id, question_id, deadline, extensions_used)
         VALUES (?, ?, ?, ?, 0)`,
        [playerId, levelId, currentQuestion.id, deadline]
      );
      session = {
        deadline,
        extensions_used: 0,
        is_eliminated: false
      };
    } else {
      session = sessionRows[0];
    }

    const now = req.headers['x-test-now'] ? parseInt(req.headers['x-test-now'], 10) : Date.now();
    const deadlineMs = new Date(session.deadline).getTime();
    const remainingSeconds = Math.max(0, Math.floor((deadlineMs - now) / 1000));
    const extensionsLeft = Math.max(0, 3 - session.extensions_used);

    if (session.is_eliminated || (remainingSeconds <= 0 && session.extensions_used >= 3)) {
      if (!session.is_eliminated) {
        await pool.query(
          'UPDATE player_question_sessions SET is_eliminated = TRUE WHERE player_id = ? AND level_id = ? AND question_id = ?',
          [playerId, levelId, currentQuestion.id]
        );
      }
      return res.json({
        keyDiscovered: true,
        isEliminated: true,
        allQuestionsSolved: false,
        isDoorVisible: false,
        message: 'Time expired after all 3 extensions! Player has been eliminated.'
      });
    }

    res.json({
      keyDiscovered: true,
      isEliminated: false,
      allQuestionsSolved: false,
      isDoorVisible: false,
      currentQuestionId: currentQuestion.id,
      questionIndex: unsolvedIndex,
      totalQuestions: questions.length,
      remainingSeconds,
      extensionsUsed: session.extensions_used,
      extensionsLeft,
      deadline: session.deadline
    });

  } catch (error) {
    console.warn('[DB Offline] Calculating question session via fallback logic');
    res.setHeader('X-Data-Source', 'offline_fallback');

    // 0. Verify level exists
    const levelExists = sampleLevels.some(l => l.id === levelId);
    if (!levelExists) {
      return res.status(404).json({ error: 'Not Found', message: 'Level not found.' });
    }

    // 1. Questions configuration check
    const levelQuestions = sampleQuestions.filter(q => q.level_id === levelId);
    if (levelQuestions.length === 0) {
      return res.json({
        keyDiscovered: false,
        isEliminated: false,
        allQuestionsSolved: false,
        isDoorVisible: false,
        configurationError: true,
        message: 'Chamber Configuration Error: No academic ciphers are configured for this chamber.'
      });
    }

    // 2. Key discovery check for THIS level
    const playerInv = offlinePlayerInventory[playerId] || [];
    const keyReq = sampleRequirements.find(r => r.level_id === levelId && r.requirement_type === 'item_collected');
    const requiredItemId = keyReq ? parseInt(keyReq.requirement_value, 10) : null;
    const keyDiscovered = playerInv.some(i => 
      i.level_id === levelId && (i.id === requiredItemId || i.item_type === 'key')
    );

    if (!keyDiscovered) {
      return res.json({
        keyDiscovered: false,
        isEliminated: false,
        allQuestionsSolved: false,
        isDoorVisible: false,
        message: 'Explore the room to discover the required key!'
      });
    }

    // 2. Check elimination
    const elimKey = `${playerId}_${levelId}`;
    if (offlineEliminatedLevels[elimKey]) {
      return res.json({
        keyDiscovered: true,
        isEliminated: true,
        allQuestionsSolved: false,
        isDoorVisible: false,
        message: 'Player has been eliminated. Please restart this level.'
      });
    }

    // 3. Questions check
    const playerAns = offlinePlayerAnswers[playerId] || {};

    const unsolvedIndex = levelQuestions.findIndex(q => !playerAns[q.id]);

    if (levelQuestions.length === 0 || unsolvedIndex === -1) {
      return res.json({
        keyDiscovered: true,
        isEliminated: false,
        allQuestionsSolved: true,
        isDoorVisible: true,
        totalQuestions: levelQuestions.length,
        solvedCount: levelQuestions.length,
        message: levelQuestions.length === 0
          ? 'No chamber ciphers in this chamber. The exit gateway is open!'
          : 'All chamber riddles solved! The exit door has appeared.'
      });
    }

    const currentQuestion = levelQuestions[unsolvedIndex];
    const sessKey = `${playerId}_${levelId}_${currentQuestion.id}`;

    if (!offlineQuestionSessions[sessKey]) {
      offlineQuestionSessions[sessKey] = {
        deadline: new Date(Date.now() + 25000),
        extensions_used: 0,
        is_eliminated: false
      };
    }

    const session = offlineQuestionSessions[sessKey];
    const now = req.headers['x-test-now'] ? parseInt(req.headers['x-test-now'], 10) : Date.now();
    const deadlineMs = new Date(session.deadline).getTime();
    const remainingSeconds = Math.max(0, Math.floor((deadlineMs - now) / 1000));
    const extensionsLeft = Math.max(0, 3 - session.extensions_used);

    if (session.is_eliminated || (remainingSeconds <= 0 && session.extensions_used >= 3)) {
      session.is_eliminated = true;
      offlineEliminatedLevels[elimKey] = true;
      return res.json({
        keyDiscovered: true,
        isEliminated: true,
        allQuestionsSolved: false,
        isDoorVisible: false,
        message: 'Time expired after all 3 extensions! Player has been eliminated.'
      });
    }

    res.json({
      keyDiscovered: true,
      isEliminated: false,
      allQuestionsSolved: false,
      isDoorVisible: false,
      currentQuestionId: currentQuestion.id,
      questionIndex: unsolvedIndex,
      totalQuestions: levelQuestions.length,
      remainingSeconds,
      extensionsUsed: session.extensions_used,
      extensionsLeft,
      deadline: session.deadline
    });
  }
});

module.exports = router;
