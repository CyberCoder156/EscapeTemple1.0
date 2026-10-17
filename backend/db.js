// ============================================================
// db.js: MySQL Database Connection Pool
// ============================================================
// Why a Connection Pool?
// Instead of creating and destroying a new database connection
// for every user click, a pool maintains a collection of ready
// connections that can be reused instantly. This makes the game
// much faster and prevents database connection overload.

const mysql = require('mysql2/promise');
require('dotenv').config();

// Create the reusable connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'escapetemple',
  waitForConnections: true,
  connectionLimit: 10,       // Max 10 simultaneous connections
  queueLimit: 0              // Unlimited request queue
});

// Helper function to test if MySQL is reachable (used by /api/health)
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    connection.release(); // Return connection back to the pool
    return { connected: true };
  } catch (error) {
    return { connected: false, error: error.message || error.code || 'MySQL connection failed' };
  }
}

module.exports = {
  pool,
  testConnection
};
