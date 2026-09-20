import { Response, NextFunction } from 'express';
import { query, queryOne } from '../config/db';
import { AuthenticatedRequest } from '../types';

export async function getSurveys(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const rows = await query('SELECT * FROM micro_surveys ORDER BY timestamp DESC');
    res.json({ success: true, data: rows, meta: { count: rows.length } });
  } catch (err) { next(err); }
}

export async function resolveGrievance(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const updated = await queryOne(
      `UPDATE micro_surveys
       SET grievance_resolved = TRUE, resolved_by = $1
       WHERE id = $2 AND grievance_logged = TRUE RETURNING *`,
      [req.user!.userId, req.params.id]
    );
    if (!updated) { res.status(404).json({ success: false, error: 'Survey not found or no grievance logged' }); return; }
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
}
