import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { sendMail, alertActionEmailHtml, exportReadyEmailHtml } from '../services/mailer.service';
import { z } from 'zod';

const emailSchema = z.object({
  to: z.string().email(),
  type: z.enum(['alert_action', 'export_ready', 'custom']),
  subject: z.string().optional(),
  alertTitle: z.string().optional(),
  actionLabel: z.string().optional(),
  scope: z.string().optional(),
  reportType: z.string().optional(),
  html: z.string().optional(),
});

export async function sendNotification(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = emailSchema.parse(req.body);
    const officerName = req.user!.email;
    let subject = body.subject || 'HireBound Notification';
    let html = '';

    if (body.type === 'alert_action') {
      subject = `[HireBound] Directive Executed: ${body.alertTitle || ''}`;
      html = alertActionEmailHtml({
        officerName,
        alertTitle: body.alertTitle || '',
        actionLabel: body.actionLabel || '',
        scope: body.scope || '',
      });
    } else if (body.type === 'export_ready') {
      subject = `[HireBound] Your ${body.reportType || 'Report'} is Ready`;
      html = exportReadyEmailHtml({ officerName, reportType: body.reportType || 'Report' });
    } else {
      html = body.html || '<p>No content</p>';
    }

    await sendMail({ to: body.to, subject, html });
    res.json({ success: true, data: { message: `Email sent to ${body.to}` } });
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ success: false, error: 'Validation failed', details: err.errors }); }
    else next(err);
  }
}
