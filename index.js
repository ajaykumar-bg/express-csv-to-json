const express = require('express');
const config = require('./config/app');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Import routes
const indexRoutes = require('./routes/index');
const csvRoutes = require('./routes/csvRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/', indexRoutes);
app.use('/', csvRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);
app.use(notFoundHandler);

// Start server
app.listen(config.PORT, () => {
  console.log(
    `🚀 CSV to JSON Converter API is running on http://localhost:${config.PORT}`
  );
  console.log(`📁 Upload your CSV files at: http://localhost:${config.PORT}`);
  console.log(`🔗 API endpoint: http://localhost:${config.PORT}/api/convert`);
});

module.exports = app;
