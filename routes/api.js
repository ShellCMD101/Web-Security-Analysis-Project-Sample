const express = require('express');
const apiKeyAuth = require('../middleware/apiKeyAuth');

const router = express.Router();

// Protected API Route
router.get('/protected', apiKeyAuth, (req, res) => {
  res.status(200).json({
    message: 'Access granted to protected API'
  });
});

// Health Check Route
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'API Running Securely'
  });
});

module.exports = router;
