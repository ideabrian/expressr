# expressr

A minimalist Express.js backend foundation.

## Project Structure

```
.
└── backend
    ├── app.js
    ├── config
    ├── logs
    ├── middleware
    ├── models
    ├── routes
    ├── services
    ├── tests
    ├── uploads
    └── utils
```

## Setup Steps

### 1. MongoDB Setup
```bash
# Access mongo shell
# Create new database
# Create user with proper permissions
# Get connection string
```

### 2. Environment Configuration
```bash
# Copy example env
cp .env.example .env

# Configure environment variables
- Add MongoDB credentials
- Set proper NODE_ENV
- Configure other services
```

### 3. Model Development
```javascript
// Create test models with:
- Basic schema
- Validation rules
- Timestamps
- Proper indexing
```

### 4. Testing
```javascript
// Test coverage should include:
- Database connection
- CRUD operations
- Validation logic
- Error handling
```

## Getting Started

1. Run the setup script:
```bash
chmod +x setup.sh
./setup.sh
```

2. Install dependencies:
```bash
npm install
```

3. Follow setup steps above

4. Start development server:
```bash
npm run dev
```

## Development

(TODO: Add development guidelines)

## Testing

(TODO: Add testing instructions)

## License

MIT