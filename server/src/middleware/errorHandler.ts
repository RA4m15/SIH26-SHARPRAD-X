import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error('[Error]', err.message, env.isDev ? err.stack : '');
  res.status(500).json({
    success: false,
    error: env.isDev ? err.message : 'Internal server error',
    ...(env.isDev && { stack: err.stack }),
  });
}

export function notFound(_req: Request, res: Response): void {
  res.status(404).json({ success: false, error: 'Route not found' });
}
