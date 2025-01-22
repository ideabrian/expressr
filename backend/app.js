require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Apply basic middleware
app.use(cors()); // Simplified CORS config
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log('Incoming request:', {
    method: req.method,
    path: req.path,
    url: req.url,
    // headers: req.headers
  });
  next();
});

// Basic routes
app.get('/api/health', async (req, res) => {
  try {
    const dbHealthy = mongoose.connection.readyState === 1;
    const start = Date.now();
    await mongoose.connection.db.admin().ping();
    const dbLatency = Date.now() - start;

    res.json({
      healthy: true,
      status: 'healthy',
      services: {
        database: {
          healthy: dbHealthy,
          latency: dbLatency
        }
      },
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({ 
      healthy: false,
      status: 'error',
      error: error.message,
      timestamp: new Date()
    });
  }
});

app.get('/api', (req, res) => {
  res.json({ status: 'okey dokey' });
});

// Simple 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Connect to MongoDB and start server
if (require.main === module) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(process.env.PORT || 5015, () => {
        console.log(`Server running on port ${process.env.PORT || 5029}`);
      });
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    });
}

module.exports = app;



