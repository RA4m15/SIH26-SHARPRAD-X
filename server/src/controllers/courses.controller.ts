import { Response, NextFunction } from 'express';
import { query, queryOne } from '../config/db';
import { AuthenticatedRequest } from '../types';

export async function getCourses(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const rows = await query('SELECT * FROM courses ORDER BY placed_rate DESC');
    res.json({ success: true, data: rows, meta: { count: rows.length } });
  } catch (err) { next(err); }
}

export async function getCourse(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const row = await queryOne('SELECT * FROM courses WHERE id = $1 OR qp_code = $1', [req.params.id]);
    if (!row) { res.status(404).json({ success: false, error: 'Course not found' }); return; }
    res.json({ success: true, data: row });
  } catch (err) { next(err); }
}
