import { transporter } from '../config/mailer';
import { env } from '../config/env';

interface MailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail(opts: MailOptions): Promise<void> {
  if (!env.SMTP_USER) {
    console.warn('[Mailer] Skipping email — no SMTP configured. To:', opts.to, '|', opts.subject);
    return;
  }
  await transporter.sendMail({ from: env.EMAIL_FROM, ...opts });
}

export function alertActionEmailHtml(params: {
  officerName: string;
  alertTitle: string;
  actionLabel: string;
  scope: string;
}): string {
  return `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#f8f9ff;border-radius:8px;overflow:hidden;border:1px solid #dde9ff">
      <div style="background:#00236f;padding:24px 32px">
        <h1 style="color:white;font-size:18px;margin:0">HireBound Platform</h1>
        <p style="color:#90a8ff;font-size:12px;margin:4px 0 0">Ministry of Skill Development &amp; Livelihood Analytics</p>
      </div>
      <div style="padding:32px">
        <h2 style="color:#00236f;font-size:16px">Directive Executed</h2>
        <p style="color:#444651;font-size:14px">Officer <strong>${params.officerName}</strong> has executed the following directive:</p>
        <div style="background:#eff4ff;border-left:4px solid #0051d5;padding:12px 16px;border-radius:4px;margin:16px 0">
          <div style="font-weight:700;color:#00236f">${params.alertTitle}</div>
          <div style="color:#444651;font-size:12px;margin-top:4px">Scope: ${params.scope}</div>
          <div style="color:#0051d5;font-size:13px;font-weight:600;margin-top:8px">Action: ${params.actionLabel}</div>
        </div>
        <p style="color:#757682;font-size:11px">This action has been cryptographically logged in the HireBound Audit Ledger.</p>
      </div>
    </div>`;
}

export function exportReadyEmailHtml(params: { officerName: string; reportType: string }): string {
  return `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#00236f;padding:24px 32px">
        <h1 style="color:white;font-size:18px;margin:0">HireBound — Export Ready</h1>
      </div>
      <div style="padding:32px">
        <p>Dear <strong>${params.officerName}</strong>,</p>
        <p>Your <strong>${params.reportType}</strong> export has been generated and is ready for download.</p>
        <p style="color:#757682;font-size:11px">Generated at ${new Date().toISOString()} IST</p>
      </div>
    </div>`;
}
