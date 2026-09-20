import ExcelJS from 'exceljs';
import { Response } from 'express';

interface XlsxOptions {
  sheetName: string;
  filename: string;
  columns: { key: string; header: string; width?: number }[];
  rows: Record<string, unknown>[];
}

export async function generateXLSX(res: Response, opts: XlsxOptions): Promise<void> {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'HireBound Platform';
  wb.created = new Date();

  const ws = wb.addWorksheet(opts.sheetName);

  // Header row styling
  ws.columns = opts.columns.map(c => ({ key: c.key, header: c.header, width: c.width || 20 }));
  const headerRow = ws.getRow(1);
  headerRow.eachCell(cell => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF00236F' } };
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10 };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = { bottom: { style: 'thin', color: { argb: 'FF90A8FF' } } };
  });
  headerRow.height = 24;

  // Data rows
  opts.rows.forEach((row, i) => {
    const dataRow = ws.addRow(opts.columns.map(c => row[c.key] ?? ''));
    if (i % 2 === 0) {
      dataRow.eachCell(cell => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF4FF' } };
      });
    }
    dataRow.eachCell(cell => {
      cell.font = { size: 9 };
      cell.alignment = { vertical: 'middle' };
    });
  });

  // Auto-filter
  ws.autoFilter = { from: 'A1', to: `${String.fromCharCode(64 + opts.columns.length)}1` };

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="${opts.filename}-${Date.now()}.xlsx"`);
  await wb.xlsx.write(res);
  res.end();
}
