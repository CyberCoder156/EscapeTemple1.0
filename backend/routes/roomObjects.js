// ============================================================
// routes/roomObjects.js: Room Objects Direct Access Endpoints
// ============================================================
const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// 1. GET /api/objects/:objectId
// Retrieves single room object info (excluding secret hidden items)
router.get('/:objectId', async (req, res) => {
  const objectId = parseInt(req.params.objectId, 10);
  if (isNaN(objectId)) {
    return res.status(400).json({ error: 'Invalid ID', message: 'Object ID must be a number.' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT ro.id, ro.level_id, ro.object_name, ro.object_type, 
              ro.position_x, ro.position_y, ro.image_path, ro.animation_type, 
              ro.description, ro.is_required, ro.required_item_id,
              req_item.name AS required_item_name
       FROM room_objects ro
       LEFT JOIN items req_item ON ro.required_item_id = req_item.id
       WHERE ro.id = ?`,
      [objectId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Not Found', message: 'Room object not found.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching room object:', error.message);
    res.status(500).json({ error: 'Database error', message: 'Could not retrieve object.' });
  }
});

module.exports = router;
