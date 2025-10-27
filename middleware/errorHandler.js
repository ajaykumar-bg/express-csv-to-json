const multer = require('multer');

/**
 * Error handling middleware
 * @param {Error} error - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (error, req, res, _next) => {
  // Handle Multer errors
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res
        .status(400)
        .json({ error: 'File too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ error: `Upload error: ${error.message}` });
  }

  // Handle custom file validation errors
  if (error.message === 'Only CSV files are allowed!') {
    return res
      .status(400)
      .json({ error: 'Invalid file type. Only CSV files are allowed.' });
  }

  // Handle general errors
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
};

/**
 * 404 handler middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
