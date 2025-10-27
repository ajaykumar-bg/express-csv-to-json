module.exports = {
  PORT: process.env.PORT || 5000,
  FILE_SIZE_LIMIT: 5 * 1024 * 1024, // 5MB
  UPLOAD_DIR: 'uploads/',
  ALLOWED_MIME_TYPES: ['text/csv'],
  ALLOWED_EXTENSIONS: ['.csv'],
};
