require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const winston = require('winston');

const connectDB = require('./config/db');
const apiKeyAuth = require('./middleware/apiKeyAuth');

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/security.log' })
  ]
});

app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  })
);

app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  })
);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Too many requests'
  }
});

app.use(globalLimiter);

app.use(
  mongoSanitize({
    replaceWith: '_'
  })
);

const csrfProtection = csrf({
  cookie: true
});

app.use(csrfProtection);

app.get('/', (req, res) => {
  res.send('Cybersecurity Internship Project Running');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/api/protected', apiKeyAuth, (req, res) => {
  res.json({
    message: 'Protected API Access Granted'
  });
});

app.use('/users', require('./routes/users'));
app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info('Application started');
  console.log(`Server running on port ${PORT}`);
});
