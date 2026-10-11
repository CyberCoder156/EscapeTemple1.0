// ============================================================
// server.js: Main Express Server Entry Point
// ============================================================
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./db');

// Import route modules
const subjectsRouter = require('./routes/subjects');
const levelsRouter = require('./routes/levels');
const questionsRouter = require('./routes/questions');
const roomObjectsRouter = require('./routes/roomObjects');
const progressRouter = require('./routes/progress');

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

// 1. CORS Configuration: Allows our React frontend on port 3000 to talk to port 5000
app.use(cors({
  origin: FRONTEND_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// 2. Parse incoming JSON payloads in request bodies
app.use(express.json());

// 3. HEALTH CHECK ENDPOINT
// Checks if Express is online and verifies MySQL database reachability
app.get('/api/health', async (req, res) => {
  const dbStatus = await testConnection();
  
  res.json({
    status: 'online',
    message: 'EscapeTemple Backend API is running successfully',
    timestamp: new Date().toISOString(),
    database: {
      connected: dbStatus.connected,
      message: dbStatus.connected ? 'MySQL pool is ready' : 'Database connection unavailable'
    }
  });
});

// 4. Mount API Route Handlers
app.use('/api/subjects', subjectsRouter);
app.use('/api/levels', levelsRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/objects', roomObjectsRouter);
app.use('/api/players', progressRouter);

// 5. 404 Handler for undefined API routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint Not Found',
    path: req.originalUrl,
    message: 'The requested API route does not exist.'
  });
});

// 6. Global Safe Error Handler
// Catches unexpected runtime errors and sends a safe JSON message without exposing credentials
app.use((err, req, res, next) => {
  console.error('Server Internal Error:', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred on the temple server.'
  });
});

// Start listening for HTTP requests
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🏛️  EscapeTemple Backend running on port ${PORT}`);
  console.log(`🌐  Accepting requests from: ${FRONTEND_ORIGIN}`);
  console.log(`📡  Health check: http://localhost:${PORT}/api/health`);
  console.log(`=========================================`);
});
