require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const API_KEY = process.env.API_KEY;

console.log(`Running in ${NODE_ENV} mode`);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Environment Variables working!',
    environment: NODE_ENV,
    port: PORT
  });
});

app.get('/api/config', (req, res) => {
  res.json({
    nodeEnv: NODE_ENV,
    port: PORT,
    hasApiKey: !!API_KEY
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});