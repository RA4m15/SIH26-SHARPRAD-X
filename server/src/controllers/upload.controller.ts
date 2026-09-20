import { Response, NextFunction } from 'express';
import { query } from '../config/db';
import { AuthenticatedRequest } from '../types';
import { v4 as uuidv4 } from 'uuid';

export async function uploadEvidence(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.file) { res.status(400).json({ success: false, error: 'No file provided' }); return; }
    const { entityType, entityId } = req.body;
    const rows = await query(
      `INSERT INTO uploaded_files (filename, original_name, mime_type, size_bytes, entity_type, entity_id, uploaded_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [req.file.filename, req.file.originalname, req.file.mimetype, req.file.size, entityType || 'evidence', entityId || null, req.user!.userId]
    );
    res.status(201).json({ success: true, data: rows[0] });
  } catch (err) { next(err); }
}

export async function uploadOfferLetter(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.file) { res.status(400).json({ success: false, error: 'No file provided' }); return; }
    const { candidateId } = req.body;
    const rows = await query(
      `INSERT INTO uploaded_files (filename, original_name, mime_type, size_bytes, entity_type, entity_id, uploaded_by)
       VALUES ($1, $2, $3, $4, 'offer_letter', $5, $6) RETURNING *`,
      [req.file.filename, req.file.originalname, req.file.mimetype, req.file.size, candidateId || null, req.user!.userId]
    );
    // Mark offer letter uploaded on employer confirmation
    if (candidateId) {
      await query(
        'UPDATE employer_confirmations SET offer_letter_uploaded = TRUE WHERE candidate_id = $1',
        [candidateId]
      );
    }
    res.status(201).json({ success: true, data: rows[0] });
  } catch (err) { next(err); }
}
