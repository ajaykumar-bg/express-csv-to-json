# Architecture Documentation

## Overview

The Express CSV to JSON Converter has been refactored into a modular architecture following best practices for maintainability, testability, and scalability.

## Architecture Principles

1. **Separation of Concerns**: Each module has a single responsibility
2. **Dependency Injection**: Configuration and dependencies are injected
3. **Error Handling**: Centralized error handling middleware
4. **Modular Routing**: Routes are separated by functionality
5. **Service Layer**: Business logic is separated from route handlers

## Directory Structure

### `/config`

Contains application configuration files:

- `app.js`: Application-wide configuration constants
- `multer.js`: File upload configuration using Multer

### `/middleware`

Contains Express middleware functions:

- `errorHandler.js`: Centralized error handling and 404 responses

### `/routes`

Contains route definitions:

- `index.js`: Main application routes (home, health check)
- `csvRoutes.js`: CSV conversion specific routes

### `/services`

Contains business logic:

- `csvService.js`: CSV processing logic and file operations

### `/views`

Contains frontend templates:

- `index.html`: Main HTML interface with enhanced UX

### `/utils`

Contains utility functions:

- `fileUtils.js`: File handling utilities

### `/tests`

Contains test files and fixtures (structure defined)

## Data Flow

```
HTTP Request
    ↓
Express App (index.js)
    ↓
Route Handler (routes/)
    ↓
Service Layer (services/)
    ↓
External Libraries (csv-to-array, multer)
    ↓
HTTP Response
```

## Error Handling Flow

```
Error Occurs
    ↓
Service Layer catches error
    ↓
Error passed to route handler
    ↓
Route handler forwards to error middleware
    ↓
Centralized error handler processes
    ↓
Formatted error response sent
```

## Configuration Management

All configuration is centralized in `/config/app.js`:

- Port settings
- File size limits
- Upload directories
- Allowed file types

## Benefits of This Architecture

1. **Maintainability**: Code is organized and easy to find
2. **Testability**: Each module can be tested independently
3. **Scalability**: Easy to add new features without affecting existing code
4. **Reusability**: Services and utilities can be reused across routes
5. **Debugging**: Clear separation makes it easier to identify issues
6. **Team Development**: Multiple developers can work on different modules

## Adding New Features

To add new functionality:

1. **New Route**: Add to appropriate route file or create new route file
2. **New Business Logic**: Add to services directory
3. **New Configuration**: Add to config files
4. **New Utilities**: Add to utils directory
5. **New Middleware**: Add to middleware directory

## File Upload Process

```
1. Client uploads file → Multer middleware (config/multer.js)
2. File validation → Custom file filter
3. File storage → Temporary uploads directory
4. CSV processing → CSVService.convertToJSON()
5. File cleanup → Automatic deletion after processing
6. Response → JSON data or file download
```

## Error Types Handled

1. **Multer Errors**: File size, type validation
2. **CSV Parsing Errors**: Invalid CSV format
3. **File System Errors**: Read/write permissions
4. **Server Errors**: Unexpected application errors
5. **404 Errors**: Invalid endpoints
