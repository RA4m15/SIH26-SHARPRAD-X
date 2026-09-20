import { Response, NextFunction } from 'express';
import { query } from '../config/db';
import { AuthenticatedRequest } from '../types';
import { generatePDF } from '../services/pdf.service';
import { generateXLSX } from '../services/xlsx.service';

export async function exportPDF(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const trainees = await query('SELECT * FROM trainees LIMIT 500');
    generatePDF(res, {
      title: 'Gazetted Longitudinal Outcome Summary',
      subtitle: 'Statutory Outcome Intelligence Report — HireBound PFMS',
      officer: req.user!.email,
      cycle: 'Last 12 Months (FY24)',
      rows: trainees,
      columns: [
        { key: 'candidate_id', label: 'Candidate ID' },
        { key: 'name', label: 'Name' },
        { key: 'district', label: 'District' },
        { key: 'placement_status', label: 'Placement' },
        { key: 'monthly_wage', label: 'Wage (₹)' },
        { key: 'retention_milestone', label: 'Retention' },
      ],
    });
  } catch (err) { next(err); }
}

export async function exportXLSX(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const trainees = await query('SELECT * FROM trainees LIMIT 5000');
    await generateXLSX(res, {
      sheetName: 'Trainee Registry',
      filename: 'hirebound-trainees',
      columns: [
        { key: 'candidate_id', header: 'Candidate ID', width: 18 },
        { key: 'name', header: 'Name', width: 22 },
        { key: 'course_title', header: 'Course', width: 35 },
        { key: 'district', header: 'District', width: 20 },
        { key: 'gender', header: 'Gender', width: 10 },
        { key: 'category', header: 'Category', width: 12 },
        { key: 'placement_status', header: 'Placement', width: 18 },
        { key: 'employer_name', header: 'Employer', width: 25 },
        { key: 'monthly_wage', header: 'Monthly Wage', width: 15 },
        { key: 'epfo_uan', header: 'EPFO UAN', width: 18 },
        { key: 'retention_milestone', header: 'Retention', width: 12 },
        { key: 'pfms_credit_verified', header: 'PFMS Verified', width: 15 },
      ],
      rows: trainees,
    });
  } catch (err) { next(err); }
}

export async function exportCSV(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const invoices = await query('SELECT * FROM tranche_invoices ORDER BY submission_date DESC');
    const headers = ['invoice_number', 'batch_id', 'tranche_type', 'amount', 'submission_date', 'pfms_sanction_id', 'status'];
    const csv = [
      headers.join(','),
      ...invoices.map(row => headers.map(h => `"${String((row as Record<string, unknown>)[h] ?? '')}"`).join(',')),
    ].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="hirebound-pfms-${Date.now()}.csv"`);
    res.send(csv);
  } catch (err) { next(err); }
}
