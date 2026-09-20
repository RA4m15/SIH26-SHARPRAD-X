import { Response, NextFunction } from 'express';
import { query, queryOne } from '../config/db';
import { AuthenticatedRequest } from '../types';
import { z } from 'zod';

export async function getInspections(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const rows = await query('SELECT * FROM center_inspections ORDER BY inspection_date DESC');
    res.json({ success: true, data: rows, meta: { count: rows.length } });
  } catch (err) { next(err); }
}

export async function submitCAP(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { capResponse } = z.object({ capResponse: z.string().min(20) }).parse(req.body);
    const updated = await queryOne(
      `UPDATE center_inspections
       SET cap_response = $1, cap_submitted_at = NOW()
       WHERE id = $2 RETURNING *`,
      [capResponse, req.params.id]
    );
    if (!updated) { res.status(404).json({ success: false, error: 'Inspection not found' }); return; }
    res.json({ success: true, data: updated });
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ success: false, error: 'Validation failed', details: err.errors }); }
    else next(err);
  }
}
