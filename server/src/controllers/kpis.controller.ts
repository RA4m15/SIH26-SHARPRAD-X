import { Response, NextFunction } from 'express';
import { query, queryOne } from '../config/db';
import { AuthenticatedRequest } from '../types';

export async function getKPIs(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const segment = (req.query.segment as string) || 'All';
    const cycle = (req.query.cycle as string) || 'Last 12 Months (FY24)';

    const rows = await query(
      `SELECT * FROM kpi_metrics
       WHERE segment = $1 AND reporting_cycle = $2
       ORDER BY sort_order ASC`,
      [segment, cycle]
    );

    res.json({ success: true, data: rows, meta: { segment, cycle, count: rows.length } });
  } catch (err) {
    next(err);
  }
}

export async function getAlerts(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const resolved = req.query.resolved === 'true';
    const rows = await query(
      'SELECT * FROM alerts WHERE resolved = $1 ORDER BY created_at DESC',
      [resolved]
    );
    res.json({ success: true, data: rows, meta: { count: rows.length } });
  } catch (err) {
    next(err);
  }
}

export async function resolveAlert(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const updated = await queryOne(
      `UPDATE alerts
       SET resolved = TRUE, resolved_by = $1, resolved_at = NOW()
       WHERE id = $2 AND resolved = FALSE
       RETURNING *`,
      [req.user!.userId, id]
    );
    if (!updated) {
      res.status(404).json({ success: false, error: 'Alert not found or already resolved' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}
