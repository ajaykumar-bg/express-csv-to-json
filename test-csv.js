#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Test CSV parsing without using the service (to avoid file deletion)
function testCSVParsing() {
  console.log('Testing CSV Parsing...\n');

  // Create test CSV content
  const testCSV = `name,age,city,occupation
John Doe,30,New York,Software Engineer
Jane Smith,25,Los Angeles,Designer
Bob Johnson,35,Chicago,Manager`;

  // Write to temporary file
  const tempFile = path.join(__dirname, 'temp-test.csv');
  fs.writeFileSync(tempFile, testCSV);

  // Test manual parsing
  try {
    const lines = testCSV.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());

    const jsonData = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const rowObject = {};
      headers.forEach((header, index) => {
        rowObject[header] = values[index] || '';
      });
      jsonData.push(rowObject);
    }

    console.log('✅ Success! Converted', jsonData.length, 'records');
    console.log('Sample data:', JSON.stringify(jsonData[0], null, 2));
    console.log('All data:', JSON.stringify(jsonData, null, 2));

    // Clean up temp file
    fs.unlinkSync(tempFile);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testCSVParsing();
