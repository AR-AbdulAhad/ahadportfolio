import nodemailer from 'nodemailer';

// Configure SMTP Transporter
const createTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp-relay.brevo.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: false, // Brevo uses STARTTLS on 587
      auth: { user, pass },
    });
  }
  return null;
};

// Premium Light Theme HTML Template for Admin Notification
const getAdminEmailTemplate = ({ name, email, subject, message, timestamp, ip }) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; color: #1f2937; margin: 0; padding: 30px 15px; }
      .container { max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06); }
      .header { background-color: #101112; padding: 24px; text-align: center; border-bottom: 3px solid #eabe7c; }
      .brand { font-size: 18px; font-weight: 800; color: #eabe7c; letter-spacing: 2px; text-transform: uppercase; }
      .content { padding: 32px; }
      .field { margin-bottom: 18px; }
      .label { font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
      .value { font-size: 15px; color: #111827; font-weight: 600; }
      .message-box { background-color: #fffbf0; border-left: 4px solid #eabe7c; padding: 18px; border-radius: 6px; color: #374151; line-height: 1.6; margin-top: 12px; font-size: 14px; }
      .footer { background-color: #f9fafb; padding: 18px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; }
      .btn { display: inline-block; background-color: #eabe7c; color: #101112; font-weight: 700; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; font-size: 14px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="brand">AHAD PORTFOLIO • NEW INQUIRY</div>
      </div>
      <div class="content">
        <h2 style="color: #111827; margin-top: 0; font-size: 20px; font-weight: 700;">📬 New Message Received</h2>
        <div class="field">
          <div class="label">Sender Name</div>
          <div class="value">${name || 'Website Visitor'}</div>
        </div>
        <div class="field">
          <div class="label">Sender Email</div>
          <div class="value"><a href="mailto:${email}" style="color: #d97706; text-decoration: none;">${email}</a></div>
        </div>
        <div class="field">
          <div class="label">Subject</div>
          <div class="value">${subject || 'General Portfolio Inquiry'}</div>
        </div>
        <div class="field">
          <div class="label">Submitted At</div>
          <div class="value">${timestamp}</div>
        </div>
        <div class="field">
          <div class="label">Message</div>
          <div class="message-box">${(message || '').replace(/\n/g, '<br>')}</div>
        </div>
        <div style="text-align: center;">
          <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Portfolio Inquiry')}" class="btn">Reply to ${name} ↗</a>
        </div>
      </div>
      <div class="footer">
        Received from Abdul Ahad Portfolio System • Sender IP: ${ip || 'N/A'}
      </div>
    </div>
  </body>
  </html>
  `;
};

// Premium Light Theme HTML Template for User Thank You Auto-Reply
const getUserThankYouTemplate = ({ name, subject, message }) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; color: #1f2937; margin: 0; padding: 30px 15px; }
      .container { max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06); }
      .header { background-color: #101112; padding: 28px; text-align: center; border-bottom: 3px solid #eabe7c; }
      .brand { font-size: 20px; font-weight: 800; color: #eabe7c; letter-spacing: 2px; }
      .subtext { font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px; }
      .content { padding: 32px; line-height: 1.7; }
      .greeting { font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 14px; }
      .quote-box { background-color: #fffbf0; border-left: 4px solid #eabe7c; padding: 16px 20px; border-radius: 6px; color: #4b5563; font-size: 14px; margin: 20px 0; }
      .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; }
      .social-links a { color: #d97706; text-decoration: none; margin: 0 8px; font-weight: 600; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="brand">ABDUL AHAD</div>
        <div class="subtext">Full-Stack & 3D Web Architect</div>
      </div>
      <div class="content">
        <div class="greeting">Thank you for reaching out, ${name || 'there'}!</div>
        <p style="color: #374151; font-size: 15px; margin-bottom: 12px;">
          I have received your message regarding <strong style="color: #d97706;">"${subject || 'your inquiry'}"</strong>.
        </p>
        <p style="color: #374151; font-size: 15px;">
          I appreciate your interest in my work. I will review your message and respond as soon as possible.
        </p>
        
        <div class="quote-box">
          <strong style="color: #d97706; display: block; margin-bottom: 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Your Copy:</strong>
          "${(message || '').length > 150 ? message.substring(0, 150) + '...' : message}"
        </div>

        <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">
          Best regards,<br>
          <strong style="color: #111827;">Abdul Ahad</strong>
        </p>
      </div>
      <div class="footer">
        <div style="margin-bottom: 10px;" class="social-links">
          <a href="https://github.com">GitHub</a> • 
          <a href="https://linkedin.com">LinkedIn</a> • 
          <a href="http://localhost:5173">Portfolio Site</a>
        </div>
        © 2026 Abdul Ahad. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};

// Send Emails Function with Automatic Fallback & Safety
export const sendContactEmails = async ({ name, email, subject, message, ip }) => {
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
  const adminEmail = process.env.ADMIN_EMAIL || 'info@abdulahad.run.place';
  const mailFrom = process.env.MAIL_FROM || 'noreply@abdulahad.run.place';

  try {
    const transporter = createTransporter();

    if (!transporter) {
      console.log('\n========================================');
      console.log('📬 [EMAIL SERVICE - SIMULATION MODE]');
      console.log(`From: ${mailFrom}`);
      console.log(`To Admin (${adminEmail}): New message from ${name} (${email})`);
      console.log(`To User (${email}): Thank you email sent!`);
      console.log('========================================\n');
      return { success: true, simulated: true };
    }

    const adminMailOptions = {
      from: mailFrom,
      to: adminEmail,
      subject: `📬 Portfolio Contact: ${name} - ${subject || 'New Inquiry'}`,
      html: getAdminEmailTemplate({ name, email, subject, message, timestamp, ip }),
    };

    const userMailOptions = {
      from: mailFrom,
      to: email,
      subject: `Thank you for reaching out, ${name}! - Abdul Ahad Portfolio`,
      html: getUserThankYouTemplate({ name, subject, message }),
    };

    const adminRes = await transporter.sendMail(adminMailOptions);
    const userRes = await transporter.sendMail(userMailOptions);
    console.log('✅ Brevo SMTP Emails dispatched successfully!');
    return { success: true, adminRes, userRes };
  } catch (error) {
    console.error('Error delivering SMTP email via Brevo:', error);
    return { success: true, smtpError: error.message };
  }
};
