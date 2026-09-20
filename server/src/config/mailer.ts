import nodemailer from 'nodemailer';
import { env } from './env';

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE,
  auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
});

export async function verifyMailer(): Promise<void> {
  if (!env.SMTP_USER) {
    console.warn('[Mailer] No SMTP credentials configured — email sending disabled');
    return;
  }
  try {
    await transporter.verify();
    console.log('[Mailer] SMTP connection verified');
  } catch (err) {
    console.warn('[Mailer] SMTP verification failed (email may not send):', (err as Error).message);
  }
}
