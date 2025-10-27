# Express CSV to JSON Converter

A modular Express.js API that converts CSV files to JSON format using file uploads.

## Features

- 📁 Web interface for file upload
- 🔄 Convert CSV to JSON with a single click
- 📥 Download converted JSON files
- 🚀 REST API endpoints for programmatic access
- ✅ File validation (CSV files only)
- 📊 File size limits (5MB max)
- 🎨 Clean, responsive web interface
- 🏗️ Modular architecture with separation of concerns

## Technologies Used

- **Express.js** - Web framework
- **Multer** - File upload handling
- **csv-to-array** - CSV parsing library

## Project Structure

```
express-csv-to-json/
├── config/
│   ├── app.js          # Application configuration
│   └── multer.js       # Multer configuration for file uploads
├── middleware/
│   └── errorHandler.js # Error handling middleware
├── routes/
│   ├── index.js        # Main routes (home, health)
│   └── csvRoutes.js    # CSV conversion routes
├── services/
│   └── csvService.js   # CSV processing business logic
├── views/
│   └── index.html      # Frontend HTML template
├── uploads/            # Temporary file upload directory
├── sample.csv          # Sample CSV file for testing
├── sample-products.csv # Another sample CSV file
├── index.js           # Main application entry point
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd express-csv-to-json
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

The application will be available at `http://localhost:5000`

## Usage

### Web Interface

1. Open your browser and navigate to `http://localhost:5000`
2. Click "Choose CSV File" and select your CSV file
3. Click "Convert to JSON"
4. View the converted JSON in the browser
5. Click "Download JSON" to save the file

### API Endpoints

#### POST `/convert`

Upload CSV file and get JSON response

**Request:**

- Method: POST
- Content-Type: multipart/form-data
- Body: Form data with `csvFile` field

**Response:**

```json
{
  "success": true,
  "message": "CSV successfully converted to JSON",
  "recordCount": 3,
  "data": [
    { "name": "John", "age": "30", "city": "New York" },
    { "name": "Jane", "age": "25", "city": "Los Angeles" }
  ]
}
```

#### POST `/api/convert`

Upload CSV file and download JSON file directly

**Request:**

- Method: POST
- Content-Type: multipart/form-data
- Body: Form data with `csvFile` field

**Response:**

- Direct file download with JSON content

#### GET `/health`

Health check endpoint

**Response:**

```json
{
  "status": "OK",
  "message": "CSV to JSON converter API is running",
  "timestamp": "2025-10-27T..."
}
```

## Example Usage with cURL

```bash
# Convert CSV and get JSON response
curl -X POST -F "csvFile=@sample.csv" http://localhost:5000/convert

# Download JSON file directly
curl -X POST -F "csvFile=@sample.csv" http://localhost:5000/api/convert -o output.json
```

## File Restrictions

- Only CSV files are accepted
- Maximum file size: 5MB
- Files are automatically deleted after processing

## Error Handling

The API handles various error scenarios:

- Invalid file types
- File size exceeded
- CSV parsing errors
- Server errors

## Sample CSV Format

```csv
name,age,city
John,30,New York
Jane,25,Los Angeles
Bob,35,Chicago
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
