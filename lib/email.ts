import nodemailer from 'nodemailer';

// Create email transporter with your specific Gmail configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "essabar.yassine@gmail.com",
    pass: "xjmw odfu tzms rtyy",
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html: string;
}

/**
 * Sends an email using the configured email service
 */
export async function sendEmail({ to, subject, text, html }: SendEmailOptions): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: '"Sigmatic Trading" <essabar.yassine@gmail.com>',
      to,
      subject,
      text: text || '',
      html,
    });

    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

/**
 * Sends a password reset email with the provided reset link
 */
export async function sendPasswordResetEmail(email: string, resetLink: string): Promise<boolean> {
  const subject = 'Reset Your Password - Sigmatic Trading';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #7497bd; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0;">Reset Your Password</h1>
      </div>
      <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none;">
        <p>Hello,</p>
        <p>We received a request to reset your password for your Sigmatic Trading account. If you didn't make this request, you can safely ignore this email.</p>
        <p>To reset your password, please click the link below:</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${resetLink}" style="background-color: #7497bd; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
        </div>
        <p>Or copy and paste this URL into your browser:</p>
        <p style="word-break: break-all; background-color: #f5f5f5; padding: 10px; border-radius: 4px;">${resetLink}</p>
        <p>This link will expire in 1 hour for security reasons.</p>
        <p>If you have any questions, please contact our support team.</p>
        <p>Best regards,<br/>The Sigmatic Trading Team</p>
      </div>
      <div style="text-align: center; padding: 10px; font-size: 12px; color: #666;">
        <p>This is an automated email, please do not reply.</p>
      </div>
    </div>
  `;

  return sendEmail({ to: email, subject, html });
}