const multer = require('multer');
const fs = require('fs');
const path = require('path');
const config = require('./app');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = config.UPLOAD_DIR;
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Keep original filename with timestamp to avoid conflicts
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// File filter to accept only CSV files
const fileFilter = (req, file, cb) => {
  const isValidMimeType = config.ALLOWED_MIME_TYPES.includes(file.mimetype);
  const isValidExtension = config.ALLOWED_EXTENSIONS.includes(
    path.extname(file.originalname).toLowerCase()
  );

  if (isValidMimeType || isValidExtension) {
    cb(null, true);
  } else {
    cb(new Error('Only CSV files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: config.FILE_SIZE_LIMIT,
  },
});

module.exports = upload;
