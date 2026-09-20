import { Response, NextFunction } from 'express';
import { query, queryOne } from '../config/db';
import { AuthenticatedRequest } from '../types';
import { z } from 'zod';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const invoiceSchema = z.object({
  batchId: z.string(),
  trancheType: z.string(),
  amount: z.number().positive(),
  submissionDate: z.string(),
  pfmsSanctionId: z.string(),
});

export async function getInvoices(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const rows = await query('SELECT * FROM tranche_invoices ORDER BY submission_date DESC');
    res.json({ success: true, data: rows, meta: { count: rows.length } });
  } catch (err) { next(err); }
}

export async function createInvoice(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = invoiceSchema.parse(req.body);
    const invoiceNumber = `INV-${new Date().getFullYear()}-T${Date.now()}`;
    const auditHash = crypto.createHash('sha256').update(invoiceNumber + body.amount).digest('hex').slice(0, 16);
    const row = await queryOne(
      `INSERT INTO tranche_invoices (invoice_number, batch_id, tranche_type, amount, submission_date, pfms_sanction_id, status, audit_hash)
       VALUES ($1, $2, $3, $4, $5, $6, 'Under Nodal Scrutiny', $7) RETURNING *`,
      [invoiceNumber, body.batchId, body.trancheType, body.amount, body.submissionDate, body.pfmsSanctionId, auditHash]
    );
    res.status(201).json({ success: true, data: row });
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ success: false, error: 'Validation failed', details: err.errors }); }
    else next(err);
  }
}

export async function claimInvoice(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const updated = await queryOne(
      `UPDATE tranche_invoices SET status = 'Pending Form 12-C e-Sign' WHERE id = $1 RETURNING *`,
      [req.params.id]
    );
    if (!updated) { res.status(404).json({ success: false, error: 'Invoice not found' }); return; }
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
}
