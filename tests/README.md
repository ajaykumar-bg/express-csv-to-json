# Test Directory

This directory contains test files for the CSV to JSON converter application.

## Test Structure

```
tests/
├── unit/
│   ├── services/
│   │   └── csvService.test.js    # Unit tests for CSV service
│   ├── middleware/
│   │   └── errorHandler.test.js  # Unit tests for error handling
│   └── utils/
│       └── fileUtils.test.js     # Unit tests for file utilities
├── integration/
│   ├── routes/
│   │   ├── csvRoutes.test.js     # Integration tests for CSV routes
│   │   └── index.test.js         # Integration tests for main routes
│   └── app.test.js               # Full application integration tests
└── fixtures/
    ├── valid.csv                 # Test CSV files
    ├── invalid.csv
    └── large.csv
```

## Running Tests

To run tests (when implemented):

```bash
# Install test dependencies
npm install --save-dev jest supertest

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test csvService.test.js
```

## Test Categories

- **Unit Tests**: Test individual functions and classes in isolation
- **Integration Tests**: Test API endpoints and route handlers
- **Fixtures**: Sample files for testing various scenarios
