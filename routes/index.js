const express = require('express');
const path = require('path');

const router = express.Router();

/**
 * GET /
 * Serve the main HTML page
 */
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

/**
 * GET /health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'CSV to JSON converter API is running',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
