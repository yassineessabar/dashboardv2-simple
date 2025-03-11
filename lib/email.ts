import nodemailer from 'nodemailer';

// Create email transporter with your Gmail configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sigmaticinvestments@gmail.com",
    pass: "nfwq rkkr udzl bdia",
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
      from: '"Sigmatic Trading" <sigmaticinvestments@gmail.com>',
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

/**
 * Sends a welcome email to new users and a notification to the admin
 */
export async function sendWelcomeEmail(userData: { name: string, email: string }): Promise<boolean> {
  // First, send welcome email to the new user
  const userSubject = 'Welcome to Sigmatic Trading!';
  
  const userHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #7497bd; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0;">Welcome to Sigmatic Trading</h1>
      </div>
      <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none;">
        <p>Hello ${userData.name},</p>
        <p>Thank you for signing up with Sigmatic Trading! We're excited to have you on board.</p>
        <p>Your account has been successfully created and you can now log in to access our trading platform and features.</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="https://app.sigmatic-trading.com/get-started" style="background-color: #7497bd; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Go to Dashboard</a>
        </div>
        <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
        <p>Best regards,<br/>The Sigmatic Trading Team</p>
      </div>
      <div style="text-align: center; padding: 10px; font-size: 12px; color: #666;">
        <p>This is an automated email, please do not reply.</p>
      </div>
    </div>
  `;

  // Second, send a notification email to the admin
  const adminSubject = 'New Form Registration - Sigmatic Trading';
  
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #7497bd; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0;">New User Registration</h1>
      </div>
      <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none;">
        <p>Hello Admin,</p>
        <p>A new user has registered on the Sigmatic Trading platform.</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin: 20px 0;">
          <p><strong>Name:</strong> ${userData.name}</p>
          <p><strong>Email:</strong> ${userData.email}</p>
          <p><strong>Registration Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <p>You may want to review this new account and take any necessary actions.</p>
        <p>Best regards,<br/>Sigmatic Trading System</p>
      </div>
    </div>
  `;

  // Send both emails
  const userEmailSent = await sendEmail({ to: userData.email, subject: userSubject, html: userHtml });
  const adminEmailSent = await sendEmail({ to: "sigmaticinvestments@gmail.com", subject: adminSubject, html: adminHtml });
  
  // Return true if both emails were sent successfully
  return userEmailSent && adminEmailSent;
}