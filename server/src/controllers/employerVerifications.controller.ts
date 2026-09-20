import { Response, NextFunction } from 'express';
import { query, queryOne } from '../config/db';
import { AuthenticatedRequest } from '../types';

export async function getConfirmations(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const rows = await query('SELECT * FROM employer_confirmations ORDER BY created_at DESC');
    res.json({ success: true, data: rows, meta: { count: rows.length } });
  } catch (err) { next(err); }
}

export async function confirmEmployer(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const updated = await queryOne(
      `UPDATE employer_confirmations
       SET digital_confirmation_status = 'Verified by HR', confirmed_by = $1, confirmed_at = NOW()
       WHERE id = $2 RETURNING *`,
      [req.user!.userId, req.params.id]
    );
    if (!updated) { res.status(404).json({ success: false, error: 'Record not found' }); return; }
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
}
