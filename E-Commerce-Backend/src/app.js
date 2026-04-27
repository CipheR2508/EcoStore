require('dotenv').config();
require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./config/swagger');
const { handleError, notFoundHandler } = require('./shared/middleware/errorHandler.middleware');
const { sendSuccess } = require('./shared/utils/apiResponse');

const app = express();

// ─── Security headers ──────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:']
    }
  },
  crossOriginEmbedderPolicy: false
}));

// ─── CORS ──────────────────────────────────────────────────
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV !== 'production') return callback(null, true);
    if (!origin || origin === 'null' || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count']
};
app.use(cors(corsOptions));

// ─── Rate limiters ─────────────────────────────────────────
const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: { status: 'error', message: 'Too many requests, please try again later', data: null },
  standardHeaders: true,
  legacyHeaders: false
});

const authLimiter = rateLimit({
  windowMs: process.env.NODE_ENV === 'production' ? 15 * 60 * 1000 : 1 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 5 : 1000,
  skipSuccessfulRequests: true,
  message: { status: 'error', message: 'Too many authentication attempts, please try again later', data: null },
  standardHeaders: true,
  legacyHeaders: false
});

const adminLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: { status: 'error', message: 'Too many admin requests, please try again later', data: null }
});

app.use(generalLimiter);

// ─── Request logging ───────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// ─── Body parsing ──────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── System routes ─────────────────────────────────────────
app.get('/api/v1/health', (req, res) => sendSuccess(res, {
  message: 'API is healthy',
  data: { timestamp: new Date().toISOString(), version: process.env.npm_package_version || '1.0.0' }
}));

app.get('/api/v1', (req, res) => sendSuccess(res, {
  message: 'E-Commerce API v1',
  data: { documentation: '/api/v1/docs', health: '/api/v1/health' }
}));

// ─── Swagger docs ──────────────────────────────────────────
app.get('/api/v1/docs.json', (req, res) => res.json(swaggerSpec));
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ─── Public/customer routes ────────────────────────────────
app.use('/api/v1/auth',        authLimiter, require('./modules/auth/auth.routes'));
app.use('/api/v1/categories',               require('./modules/categories/categories.routes'));
app.use('/api/v1/products',                 require('./modules/products/products.routes'));
app.use('/api/v1/addresses',                require('./modules/addresses/addresses.routes'));
app.use('/api/v1/cart',                     require('./modules/cart/cart.routes'));
app.use('/api/v1/orders',                   require('./modules/orders/orders.routes'));
app.use('/api/v1/payments',                 require('./modules/payments/payments.routes'));
app.use('/api/v1/invoices',                 require('./modules/invoices/invoices.routes'));
app.use('/api/v1/preferences',              require('./modules/users/preferences.routes'));
app.use('/api/v1/profile',                  require('./modules/users/profile.routes'));

// ─── Admin routes ──────────────────────────────────────────
app.use('/api/v1/admin', adminLimiter, require('./modules/admin/users/users.admin.routes'));
app.use('/api/v1/admin', adminLimiter, require('./modules/admin/products/products.admin.routes'));
app.use('/api/v1/admin', adminLimiter, require('./modules/admin/categories/categories.admin.routes'));
app.use('/api/v1/admin', adminLimiter, require('./modules/admin/inventory/inventory.admin.routes'));
app.use('/api/v1/admin', adminLimiter, require('./modules/admin/orders/orders.admin.routes'));
app.use('/api/v1/admin', adminLimiter, require('./modules/admin/payments/payments.admin.routes'));
app.use('/api/v1/admin', adminLimiter, require('./modules/admin/invoices/invoices.admin.routes'));

// ─── Error handling ────────────────────────────────────────
app.use(notFoundHandler);
app.use(handleError);

module.exports = app;
