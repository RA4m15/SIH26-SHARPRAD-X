import { Response, NextFunction } from 'express';
import { query, queryOne } from '../config/db';
import { AuthenticatedRequest } from '../types';

export async function getTrainees(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;
    const conditions: string[] = [];
    const params: unknown[] = [limit, offset];
    let i = 3;
    if (req.query.district) { conditions.push(`district = $${i++}`); params.push(req.query.district); }
    if (req.query.gender) { conditions.push(`gender = $${i++}`); params.push(req.query.gender); }
    if (req.query.placement_status) { conditions.push(`placement_status = $${i++}`); params.push(req.query.placement_status); }
    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
    const rows = await query(`SELECT * FROM trainees ${where} ORDER BY created_at DESC LIMIT $1 OFFSET $2`, params);
    const [{ count }] = await query<{ count: string }>(`SELECT COUNT(*) FROM trainees ${where}`, params.slice(2));
    res.json({ success: true, data: rows, meta: { page, limit, total: parseInt(count) } });
  } catch (err) { next(err); }
}

export async function getTrainee(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const row = await queryOne('SELECT * FROM trainees WHERE id = $1 OR candidate_id = $1', [req.params.id]);
    if (!row) { res.status(404).json({ success: false, error: 'Trainee not found' }); return; }
    res.json({ success: true, data: row });
  } catch (err) { next(err); }
}
