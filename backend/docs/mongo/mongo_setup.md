# MongoDB Setup Guide

## Initial Setup

### 1. Stop MongoDB Service
```bash
brew services stop mongodb-community
```

### 2. Start MongoDB Without Authentication
```bash
mongod --dbpath /opt/homebrew/var/mongodb --noauth
```

### 3. Create Admin User
Open a new terminal window and connect:
```bash
mongosh
```

Switch to admin database and create the admin user:
```javascript
use admin

db.createUser({
  user: "adminUser",
  pwd: "newSecurePassword",  // Replace with a secure password
  roles: [ 
    { role: "userAdminAnyDatabase", db: "admin" }, 
    "readWriteAnyDatabase" 
  ]
})
```

## Configure Root Access

### 1. Create Root User
```javascript
use admin

db.createUser({
  user: "mongoAdmin",
  pwd: "Q03p945eIh65dVoB",
  roles: [ { role: "root", db: "admin" } ]
})
```

### 2. Connection Methods
You can connect using any of these methods:

```bash
# Method 1: Direct mongosh connection
mongosh -u mongoAdmin -p Q03p945eIh65dVoB --authenticationDatabase admin

# Method 2: Connection string URI
mongosh "mongodb://mongoAdmin:Q03p945eIh65dVoB@127.0.0.1:27017/admin?authSource=admin"
```

### 3. Environment Variable
For your application, you can use this connection string:
```bash
MONGODB_URI="mongodb://mongoAdmin:Q03p945eIh65dVoB@127.0.0.1:27017/admin?authSource=admin"
```

## Project-Specific Setup

### Create Project Database User
Replace `{project}` with your actual project name:
```javascript
use {project}_db

db.createUser({
  user: "{project}_user",
  pwd: "yourSecurePassword",  // Replace with a secure password
  roles: [
    { role: "readWrite", db: "{project}_db" }
  ]
})
```

https://claude.ai/chat/c85ae11f-20ca-4fd2-a231-5cb7385cb0c9