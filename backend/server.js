const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const wishRoutes = require('./routes/wishRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow frontend requests
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    message: '🐘 Ganesh Blessings Backend Service Running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api', wishRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🙏 Ganesh Blessings Backend API Server`);
  console.log(`🚀 Running at: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
