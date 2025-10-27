const csvToArray = require('csv-to-array');
const fs = require('fs');

class CSVService {
  /**
   * Convert CSV file to JSON array
   * @param {string} filePath - Path to the CSV file
   * @param {Function} callback - Callback function (err, data)
   */
  static convertToJSON(filePath, callback) {
    csvToArray(
      {
        file: filePath,
        encoding: 'utf8',
      },
      (err, array) => {
        // Clean up uploaded file
        fs.unlink(filePath, unlinkErr => {
          if (unlinkErr) {
            console.error('Error deleting uploaded file:', unlinkErr);
          }
        });

        if (err) {
          console.error('CSV parsing error:', err);
          return callback(err, null);
        }

        callback(null, array);
      }
    );
  }

  /**
   * Validate if file exists
   * @param {string} filePath - Path to the file
   * @returns {boolean} - True if file exists
   */
  static fileExists(filePath) {
    return fs.existsSync(filePath);
  }

  /**
   * Delete file
   * @param {string} filePath - Path to the file
   * @param {Function} callback - Callback function
   */
  static deleteFile(filePath, callback) {
    fs.unlink(filePath, callback);
  }
}

module.exports = CSVService;
