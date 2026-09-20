import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { testConnection } from './config/db';
import { verifyMailer } from './config/mailer';
import apiRouter from './routes';
import { errorHandler, notFound } from './middleware/errorHandler';

const app = express();

// ── Security headers ──────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ──────────────────────────────────────────────────────────────────
app.use(cors({
  origin: (origin, cb) => {
    if (
      !origin || 
      env.NODE_ENV === 'development' ||
      env.CORS_ORIGINS.includes(origin) ||
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      origin.includes('vercel.app') ||
      /^http:\/\/(192\.168\.|172\.|10\.)/.test(origin)
    ) {
      cb(null, true);
    } else {
      cb(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Rate limiting ─────────────────────────────────────────────────────────
app.use('/api/auth', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { success: false, error: 'Too many auth attempts. Try again in 15 minutes.' },
}));
app.use('/api', rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 300,
  message: { success: false, error: 'Rate limit exceeded.' },
}));

// ── Body parsing ──────────────────────────────────────────────────────────
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Health check ──────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'HireBound API Server',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    env: env.NODE_ENV,
  });
});

// ── API routes ────────────────────────────────────────────────────────────
app.use('/api', apiRouter);

// ── 404 & error handlers ─────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Startup ───────────────────────────────────────────────────────────────
async function start(): Promise<void> {
  await testConnection();
  await verifyMailer();
  app.listen(env.PORT, () => {
    console.log(`\n🚀 HireBound API Server running at http://localhost:${env.PORT}`);
    console.log(`   Environment : ${env.NODE_ENV}`);
    console.log(`   Health check: http://localhost:${env.PORT}/health`);
    console.log(`   CORS origins: ${env.CORS_ORIGINS.join(', ')}\n`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
