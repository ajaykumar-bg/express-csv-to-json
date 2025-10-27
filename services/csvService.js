const csvToArray = require('csv-to-array');
const fs = require('fs');

class CSVService {
  /**
   * Convert CSV file to JSON array
   * @param {string} filePath - Path to the CSV file
   * @param {Function} callback - Callback function (err, data)
   */
  static convertToJSON(filePath, callback) {
    // Read the file and parse manually for better control
    fs.readFile(filePath, 'utf8', (readErr, data) => {
      // Clean up uploaded file regardless of success or failure
      fs.unlink(filePath, unlinkErr => {
        if (unlinkErr) {
          console.error('Error deleting uploaded file:', unlinkErr);
        }
      });

      if (readErr) {
        console.error('File read error:', readErr);
        return callback(readErr, null);
      }

      try {
        // Parse CSV data manually
        const lines = data.split('\n').filter(line => line.trim());
        if (lines.length === 0) {
          return callback(new Error('CSV file is empty'), null);
        }

        if (lines.length < 2) {
          return callback(
            new Error('CSV must have at least a header row and one data row'),
            null
          );
        }

        // Parse headers
        const headers = CSVService._parseCSVLine(lines[0].trim());
        if (headers.length === 0) {
          return callback(new Error('CSV headers are empty'), null);
        }

        // Parse data rows
        const jsonData = [];
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line) {
            const values = CSVService._parseCSVLine(line);

            // Ensure row has same number of columns as headers
            if (values.length !== headers.length) {
              return callback(
                new Error(
                  `Row ${i + 1} has ${values.length} columns, expected ${headers.length}`
                ),
                null
              );
            }

            // Create object from headers and values
            const rowObject = {};
            headers.forEach((header, index) => {
              rowObject[header] = values[index] || '';
            });
            jsonData.push(rowObject);
          }
        }

        callback(null, jsonData);
      } catch (parseError) {
        console.error('CSV parsing error:', parseError);
        callback(parseError, null);
      }
    });
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

  /**
   * Parse a CSV line handling quoted fields
   * @param {string} line - CSV line to parse
   * @returns {Array} - Array of field values
   * @private
   */
  static _parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // Field separator
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    // Add the last field
    result.push(current.trim());
    return result;
  }

  /**
   * Validate CSV file structure
   * @param {string} filePath - Path to the CSV file
   * @param {Function} callback - Callback function (err, isValid)
   */
  static validateCSV(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return callback(err, false);
      }

      const lines = data.split('\n').filter(line => line.trim());
      if (lines.length < 2) {
        return callback(
          new Error('CSV must have at least a header row and one data row'),
          false
        );
      }

      const headerCount = CSVService._parseCSVLine(lines[0]).length;

      // Check if all rows have the same number of columns
      for (let i = 1; i < Math.min(lines.length, 10); i++) {
        const rowCount = CSVService._parseCSVLine(lines[i]).length;
        if (rowCount !== headerCount) {
          return callback(
            new Error(
              `Row ${i + 1} has ${rowCount} columns, expected ${headerCount}`
            ),
            false
          );
        }
      }

      callback(null, true);
    });
  }
}

module.exports = CSVService;
