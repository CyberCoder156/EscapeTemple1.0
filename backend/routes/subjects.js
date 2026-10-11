// ============================================================
// routes/subjects.js: Academic Subjects & Level Hierarchy
// ============================================================
const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const { sampleSubjects, sampleLevels } = require('../sampleData');

// 1. GET /api/subjects
// Returns all subjects available in the temple
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, description, created_at FROM subjects ORDER BY id ASC'
    );
    res.json(rows);
  } catch (error) {
    console.warn('[DB Offline] Serving subjects from fallback dataset');
    res.setHeader('X-Data-Source', 'offline_fallback');
    res.json(sampleSubjects);
  }
});

// 2. GET /api/subjects/:subjectId
// Returns details for a single subject by ID
router.get('/:subjectId', async (req, res) => {
  const subjectId = parseInt(req.params.subjectId, 10);
  if (isNaN(subjectId)) {
    return res.status(400).json({ error: 'Invalid ID', message: 'Subject ID must be a number.' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, name, description, created_at FROM subjects WHERE id = ?',
      [subjectId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Not Found', message: 'Subject not found.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.warn('[DB Offline] Serving single subject from fallback dataset');
    res.setHeader('X-Data-Source', 'offline_fallback');
    const found = sampleSubjects.find(s => s.id === subjectId);
    if (!found) return res.status(404).json({ error: 'Not Found', message: 'Subject not found.' });
    res.json(found);
  }
});

// 3. GET /api/subjects/:subjectId/levels
// Returns all levels belonging to a specific subject, ordered by level_number
router.get('/:subjectId/levels', async (req, res) => {
  const subjectId = parseInt(req.params.subjectId, 10);
  if (isNaN(subjectId)) {
    return res.status(400).json({ error: 'Invalid ID', message: 'Subject ID must be a number.' });
  }

  try {
    const [subjectRows] = await pool.query('SELECT id, name FROM subjects WHERE id = ?', [subjectId]);
    if (subjectRows.length === 0) {
      return res.status(404).json({ error: 'Not Found', message: 'Subject not found.' });
    }

    const [levels] = await pool.query(
      `SELECT id, subject_id, level_number, name, description, difficulty, room_background 
       FROM levels 
       WHERE subject_id = ? 
       ORDER BY level_number ASC`,
      [subjectId]
    );

    res.json(levels);
  } catch (error) {
    console.warn('[DB Offline] Serving levels from fallback dataset');
    res.setHeader('X-Data-Source', 'offline_fallback');
    const filtered = sampleLevels.filter(l => l.subject_id === subjectId);
    res.json(filtered);
  }
});

// 4. GET /api/subjects/:subjectId/levels/:levelNumber
router.get('/:subjectId/levels/:levelNumber', async (req, res) => {
  const subjectId = parseInt(req.params.subjectId, 10);
  const levelNumber = parseInt(req.params.levelNumber, 10);

  if (isNaN(subjectId) || isNaN(levelNumber)) {
    return res.status(400).json({ error: 'Invalid Parameters', message: 'Subject ID and Level Number must be numbers.' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT id, subject_id, level_number, name, description, difficulty, room_background 
       FROM levels 
       WHERE subject_id = ? AND level_number = ?`,
      [subjectId, levelNumber]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Not Found', message: `Level ${levelNumber} not found for this subject.` });
    }

    res.json(rows[0]);
  } catch (error) {
    console.warn('[DB Offline] Serving specific level from fallback dataset');
    res.setHeader('X-Data-Source', 'offline_fallback');
    const found = sampleLevels.find(l => l.subject_id === subjectId && l.level_number === levelNumber);
    if (!found) return res.status(404).json({ error: 'Not Found', message: `Level ${levelNumber} not found.` });
    res.json(found);
  }
});

module.exports = router;
