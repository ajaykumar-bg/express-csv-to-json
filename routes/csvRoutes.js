const express = require('express');
const upload = require('../config/multer');
const CSVService = require('../services/csvService');

const router = express.Router();

/**
 * POST /convert
 * Upload CSV file and get JSON response
 */
router.post('/convert', upload.single('csvFile'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No CSV file uploaded' });
    }

    const filePath = req.file.path;

    // Convert CSV to JSON using the service
    CSVService.convertToJSON(filePath, (err, data) => {
      if (err) {
        return res
          .status(400)
          .json({ error: 'Failed to parse CSV file: ' + err.message });
      }

      // Return the JSON data
      res.json({
        success: true,
        message: 'CSV successfully converted to JSON',
        recordCount: data.length,
        data: data,
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

/**
 * POST /api/convert
 * Upload CSV file and download JSON file directly
 */
router.post('/api/convert', upload.single('csvFile'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No CSV file uploaded' });
    }

    const filePath = req.file.path;

    // Convert CSV to JSON using the service
    CSVService.convertToJSON(filePath, (err, data) => {
      if (err) {
        return res
          .status(400)
          .json({ error: 'Failed to parse CSV file: ' + err.message });
      }

      // Set headers for file download
      res.setHeader('Content-Type', 'application/json');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${req.file.originalname.replace(
          '.csv',
          '.json'
        )}"`
      );

      // Send JSON data as downloadable file
      res.send(JSON.stringify(data, null, 2));
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

module.exports = router;
