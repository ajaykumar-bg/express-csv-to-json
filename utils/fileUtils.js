/**
 * Utility functions for the CSV to JSON converter
 */

/**
 * Format file size in human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Validate file extension
 * @param {string} filename - Name of the file
 * @param {Array} allowedExtensions - Array of allowed extensions
 * @returns {boolean} - True if valid extension
 */
function isValidFileExtension(filename, allowedExtensions) {
  const ext = filename.toLowerCase().split('.').pop();
  return allowedExtensions.includes(`.${ext}`);
}

/**
 * Generate unique filename with timestamp
 * @param {string} originalName - Original filename
 * @returns {string} - Unique filename
 */
function generateUniqueFileName(originalName) {
  const timestamp = Date.now();
  const random = Math.round(Math.random() * 1e9);
  const ext = originalName.split('.').pop();
  const name = originalName.split('.').slice(0, -1).join('.');

  return `${name}-${timestamp}-${random}.${ext}`;
}

/**
 * Sanitize filename for download
 * @param {string} filename - Original filename
 * @returns {string} - Sanitized filename
 */
function sanitizeFilename(filename) {
  return filename.replace(/[^a-z0-9.-]/gi, '_').toLowerCase();
}

module.exports = {
  formatFileSize,
  isValidFileExtension,
  generateUniqueFileName,
  sanitizeFilename,
};
