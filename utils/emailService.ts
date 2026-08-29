import nodemailer from 'nodemailer';
import { logger } from './logger';

export interface SendLeadEmailParams {
  leadId: string;
  name: string;
  phone: string;
  email?: string;
  project?: string;
  visitDate?: string;
  visitTime?: string;
  pickupNeeded?: boolean;
  message?: string;
  source?: string;
}

const TARGET_EMAIL = 'propsmartrealty@gmail.com';

/**
 * Sends a stylized HTML email alert to propsmartrealty@gmail.com using Nodemailer & Gmail App Password.
 * Uses STARTTLS on port 587 — most reliable method for Vercel serverless environments.
 */
export async function sendLeadEmailNotification(params: SendLeadEmailParams): Promise<boolean> {
  const gmailUser = process.env.GMAIL_USER || TARGET_EMAIL;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  // Log lead details internally regardless of email delivery status
  logger.log(`[Email Service] Processing Lead ${params.leadId}`, params);

  if (!gmailPass) {
    logger.log(
      `[Email Service Warning] GMAIL_APP_PASSWORD is not set in environment variables. Lead ${params.leadId} logged successfully. ` +
      `Add GMAIL_USER and GMAIL_APP_PASSWORD to your .env.local (local) or Vercel environment variables (production).`
    );
    return false;
  }

  try {
    // Use STARTTLS port 587 — more reliable on serverless/Vercel than SSL port 465
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: gmailUser,
        pass: gmailPass, // 16-character Gmail App Password (not Gmail account password)
      },
      tls: {
        rejectUnauthorized: true,
      },
      connectionTimeout: 10000, // 10 second timeout for serverless
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    const nowIST = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Lead Notification — SKYi Developers</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #070b1f; color: #ffffff; margin: 0; padding: 20px; }
          .card { max-width: 600px; margin: 0 auto; background: #0d1233; border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #ff6b35 0%, #ab47bc 100%); padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; color: #ffffff; font-weight: 800; letter-spacing: 1px; }
          .header p { margin: 6px 0 0 0; font-size: 13px; color: rgba(255,255,255,0.9); }
          .body { padding: 28px; }
          .badge { display: inline-block; background: rgba(255,215,0,0.15); border: 1px solid #ffd700; color: #ffd700; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 16px; }
          .field-group { margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px; }
          .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #4fc3f7; margin-bottom: 4px; font-weight: 700; }
          .field-value { font-size: 16px; color: #ffffff; font-weight: 600; }
          .field-value-highlight { font-size: 18px; color: #ff6b35; font-weight: 800; }
          .cta { background: linear-gradient(135deg, #ff6b35, #d97706); color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 800; font-size: 15px; display: inline-block; margin-top: 8px; }
          .footer { background: #070b1f; padding: 18px 28px; text-align: center; font-size: 12px; color: #9aa5c4; border-top: 1px solid rgba(255,255,255,0.08); }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>🔥 NEW ENQUIRY LEAD RECEIVED</h1>
            <p>SKYi Developers — Official Project Enquiry Engine</p>
          </div>
          <div class="body">
            <span class="badge">Reference ID: ${params.leadId}</span>

            <div class="field-group">
              <div class="field-label">Customer Name</div>
              <div class="field-value">${params.name}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Mobile Phone Number</div>
              <div class="field-value-highlight">
                <a href="tel:+91${params.phone}" style="color: #ff6b35; text-decoration: none;">+91 ${params.phone}</a>
              </div>
              <a href="https://wa.me/91${params.phone}?text=Hi%20${encodeURIComponent(params.name)}%2C%20I%20am%20calling%20regarding%20your%20SKYi%20property%20enquiry." class="cta" style="font-size: 13px; padding: 8px 18px; margin-top: 6px;">
                💬 Open WhatsApp Chat
              </a>
            </div>

            ${params.email ? `
            <div class="field-group">
              <div class="field-label">Email Address</div>
              <div class="field-value"><a href="mailto:${params.email}" style="color: #ffffff;">${params.email}</a></div>
            </div>` : ''}

            <div class="field-group">
              <div class="field-label">Interested Project / Plot Location</div>
              <div class="field-value" style="color: #ffd700;">${params.project || 'General Inquiry / NA Bungalow Plots'}</div>
            </div>

            ${params.visitDate ? `
            <div class="field-group">
              <div class="field-label">Requested Site Visit Schedule</div>
              <div class="field-value">${params.visitDate} at ${params.visitTime || '10:00 AM'} ${params.pickupNeeded ? ' — Cab Pickup Needed ✅' : ''}</div>
            </div>` : ''}

            ${params.message ? `
            <div class="field-group">
              <div class="field-label">Customer Requirements / Note</div>
              <div class="field-value" style="font-weight: 400; line-height: 1.5; color: #cbd5e1;">${params.message}</div>
            </div>` : ''}

            <div class="field-group" style="border-bottom: none;">
              <div class="field-label">Traffic Source / Channel</div>
              <div class="field-value" style="font-size: 13px; color: #9aa5c4;">${params.source || 'Direct Website Visit'}</div>
            </div>
          </div>
          <div class="footer">
            Sent automatically to <strong>propsmartrealty@gmail.com</strong> via SKYi Lead Engine<br>
            Time: ${nowIST} IST
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"SKYi Lead Engine 🏠" <${gmailUser}>`,
      to: TARGET_EMAIL,
      subject: `🚨 NEW LEAD [${params.name}] — ${params.project || 'SKYi NA Plots Pune'} (+91 ${params.phone})`,
      html: htmlContent,
      replyTo: params.email || undefined,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.log(`[Email Service Success] Lead Email Sent to ${TARGET_EMAIL}`, info.messageId);
    return true;
  } catch (error) {
    logger.error(`[Email Service Error] Failed to send email for lead ${params.leadId}`, error);
    return false;
  }
}
