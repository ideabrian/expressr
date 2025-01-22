#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up expressr...${NC}"

# Create main directories
directories=(
    "config"
    "routes"
    "models"
    "services"
    "middleware"
    "utils"
    "uploads"
    "logs"
    "tests/unit"
    "tests/integration"
    "tests/fixtures"
)

for dir in "${directories[@]}"; do
    mkdir -p "$dir"
    touch "$dir/.gitkeep"
    echo -e "${GREEN}Created $dir${NC}"
done

# Create base files
echo -e "${BLUE}Creating base files...${NC}"

# Create .env.example
cat > .env.example << EOL
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/expressr

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_FILE_PATH=logs/app.log
EOL

# Create .gitignore
cat > .gitignore << EOL
# Dependencies
node_modules/
package-lock.json

# Environment
.env
.env.local

# Logs
logs/*
!logs/.gitkeep
*.log
npm-debug.log*

# Runtime data
pids/
*.pid
*.seed

# Testing
coverage/

# IDEs
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Uploads
uploads/*
!uploads/.gitkeep

# Build
dist/
build/

# Temp
tmp/
temp/
EOL

# Create initial package.json if it doesn't exist
if [ ! -f package.json ]; then
    echo -e "${BLUE}Initializing package.json...${NC}"
    npm init -y
    
    # Update package.json with expressr details
    npm pkg set name="expressr"
    npm pkg set description="A minimalist Express.js backend foundation"
    npm pkg set scripts.start="node app.js"
    npm pkg set scripts.dev="nodemon app.js"
    npm pkg set scripts.test="jest"
    npm pkg set type="module"
fi

# Create base app.js
cat > app.js << EOL
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(\`expressr running on port \${PORT}\`);
});
EOL

echo -e "${GREEN}expressr setup complete!${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo "1. Run 'npm install'"
echo "2. Copy .env.example to .env and configure your environment variables"
echo "3. Start building!"