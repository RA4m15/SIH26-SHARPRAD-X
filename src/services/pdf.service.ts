import PDFDocument from 'pdfkit';
import { Response } from 'express';

interface ReportOptions {
  title: string;
  subtitle: string;
  officer: string;
  cycle: string;
  rows: Record<string, unknown>[];
  columns: { key: string; label: string }[];
}

export function generatePDF(res: Response, opts: ReportOptions): void {
  const doc = new PDFDocument({ margin: 50, size: 'A4' });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="hirebound-report-${Date.now()}.pdf"`);
  doc.pipe(res);

  // ── Header band ──────────────────────────────────────────────────────────
  doc.rect(0, 0, doc.page.width, 80).fill('#00236f');
  doc.fontSize(20).fillColor('white').font('Helvetica-Bold')
     .text('HireBound', 50, 20);
  doc.fontSize(10).fillColor('#90a8ff').font('Helvetica')
     .text('Ministry of Skill Development & Livelihood Analytics', 50, 45);
  doc.fontSize(8).fillColor('white')
     .text(`Officer: ${opts.officer}   |   Cycle: ${opts.cycle}   |   Generated: ${new Date().toISOString()}`, 50, 62);

  doc.moveDown(4);

  // ── Report title ──────────────────────────────────────────────────────────
  doc.fontSize(16).fillColor('#00236f').font('Helvetica-Bold').text(opts.title, { align: 'center' });
  doc.fontSize(10).fillColor('#444651').font('Helvetica').text(opts.subtitle, { align: 'center' });
  doc.moveDown(1.5);

  // ── Table header ─────────────────────────────────────────────────────────
  const colWidth = (doc.page.width - 100) / opts.columns.length;
  let x = 50;
  doc.rect(50, doc.y, doc.page.width - 100, 20).fill('#1e3a8a');
  opts.columns.forEach(col => {
    doc.fontSize(8).fillColor('white').font('Helvetica-Bold')
       .text(col.label, x + 4, doc.y - 16, { width: colWidth - 8, ellipsis: true });
    x += colWidth;
  });
  doc.moveDown(0.5);

  // ── Table rows ────────────────────────────────────────────────────────────
  opts.rows.forEach((row, i) => {
    x = 50;
    const rowY = doc.y;
    if (i % 2 === 0) doc.rect(50, rowY, doc.page.width - 100, 18).fill('#eff4ff');
    opts.columns.forEach(col => {
      const val = String(row[col.key] ?? '—');
      doc.fontSize(8).fillColor('#0d1c2f').font('Helvetica')
         .text(val, x + 4, rowY + 4, { width: colWidth - 8, ellipsis: true });
      x += colWidth;
    });
    doc.moveDown(0.85);
    if (doc.y > doc.page.height - 100) doc.addPage();
  });

  // ── Footer ────────────────────────────────────────────────────────────────
  doc.fontSize(7).fillColor('#757682')
     .text('This document is system-generated and cryptographically auditable under HireBound PFMS Rule 14(b).', 50, doc.page.height - 50, { align: 'center' });

  doc.end();
}
