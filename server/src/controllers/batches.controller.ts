import { Response, NextFunction } from 'express';
import { query, queryOne } from '../config/db';
import { AuthenticatedRequest } from '../types';

export async function getBatches(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;
    const sector = req.query.sector as string | undefined;

    const where = sector ? 'WHERE sector = $3' : '';
    const params: unknown[] = sector ? [limit, offset, sector] : [limit, offset];

    const rows = await query(
      `SELECT * FROM batches ${where} ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      params
    );
    const [{ count }] = await query<{ count: string }>(
      `SELECT COUNT(*) FROM batches ${where}`,
      sector ? [sector] : []
    );

    res.json({ success: true, data: rows, meta: { page, limit, total: parseInt(count) } });
  } catch (err) {
    next(err);
  }
}

export async function getBatch(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const row = await queryOne('SELECT * FROM batches WHERE id = $1 OR batch_id = $1', [req.params.id]);
    if (!row) { res.status(404).json({ success: false, error: 'Batch not found' }); return; }
    res.json({ success: true, data: row });
  } catch (err) { next(err); }
}

export async function signForm12C(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const updated = await queryOne(
      'UPDATE batches SET form12c_signed = TRUE, updated_at = NOW() WHERE id = $1 OR batch_id = $1 RETURNING *',
      [req.params.id]
    );
    if (!updated) { res.status(404).json({ success: false, error: 'Batch not found' }); return; }
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
}

export async function verifyDBT(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const updated = await queryOne(
      'UPDATE batches SET dbt_bonus_verified = TRUE, updated_at = NOW() WHERE id = $1 OR batch_id = $1 RETURNING *',
      [req.params.id]
    );
    if (!updated) { res.status(404).json({ success: false, error: 'Batch not found' }); return; }
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
}
