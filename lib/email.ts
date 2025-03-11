import nodemailer from 'nodemailer';

// Create a SHARED email transporter to be used across the application
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sigmaticinvestments@gmail.com",
    pass: "hyzi jtkg btyg oldu",
  },
  pool: true,  // Enable connection pooling
  maxConnections: 3,  // Limit concurrent connections
  debug: true,
  logger: true
});

// Verify the connection configuration when the app starts
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP connection verification failed:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
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
    console.log(`Sending email to ${to} with subject: ${subject}`);
    
    const info = await transporter.sendMail({
      from: '"Sigmatic Trading" <sigmaticinvestments@gmail.com>',
      to,
      subject,
      text: text || '',
      html,
    });

    console.log('Email sent successfully: %s', info.messageId);
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
 * Sequential sending to ensure reliability
 */
export async function sendWelcomeEmail(userData: { name: string, email: string }): Promise<boolean> {
  console.log(`Starting welcome email process for user: ${userData.email}`);
  
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

  // Sequential sending for reliability
  const userEmailSent = await sendEmail({ to: userData.email, subject: userSubject, html: userHtml });
  console.log(`User welcome email result: ${userEmailSent ? 'Success' : 'Failed'}`);

  // Only send admin email if user email was successful
  if (!userEmailSent) {
    console.log(`Skipping admin notification because user email failed.`);
    return false;
  }

  // Second, send a notification email to the admin
  const adminSubject = 'New user - Sigmatic Trading';
  
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

  const adminEmailSent = await sendEmail({ to: "sigmaticinvestments@gmail.com", subject: adminSubject, html: adminHtml });
  console.log(`Admin notification email result: ${adminEmailSent ? 'Success' : 'Failed'}`);
  
  // Return overall result
  return userEmailSent && adminEmailSent;
}

/**
 * Sends a form submission notification email to admin
 */
export async function sendFormSubmissionEmail(formData: any): Promise<boolean> {
  const subject = 'New Form Submission - Sigmatic Trading';
  
  // Extract relevant fields
  const { 
    fullName, name, email, phoneNumber, setupChoice, selectedRobot,
    submissionId, submissionTime, verificationStatus, depositStatus
  } = formData;

  // Use appropriate fields based on what's available
  const displayName = fullName || name || 'Not provided';
  const userEmail = email || 'Not provided';
  const phone = phoneNumber || 'Not provided';
  const setup = setupChoice || formData.formData?.setupChoice || 'Not provided';
  const robot = selectedRobot || formData.formData?.selectedRobot || 'Not provided';
  const id = submissionId || `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  const time = submissionTime || new Date().toLocaleString('en-GB');
  const verification = verificationStatus || formData.verificationStatus || 'Incomplete';
  const deposit = depositStatus || formData.depositStatus || 'Not Verified';
  
  const html = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
  <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Account Registration</h2>
  
  <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 4px;">
    <p style="margin: 5px 0;"><strong>Submission ID:</strong> ${id}</p>
    <p style="margin: 5px 0;"><strong>Name:</strong> ${displayName}</p>
    <p style="margin: 5px 0;"><strong>Email:</strong> ${userEmail}</p>
    <p style="margin: 5px 0;"><strong>Phone Number:</strong> ${phone}</p>
    <p style="margin: 5px 0;"><strong>Setup Choice:</strong> ${setup}</p>
    <p style="margin: 5px 0;"><strong>Selected Robot:</strong> ${robot}</p>
    <p style="margin: 5px 0;"><strong>Verification Status:</strong> ${verification}</p>
    <p style="margin: 5px 0;"><strong>Deposit Status:</strong> ${deposit}</p>
    <p style="margin: 5px 0;"><strong>Submission Time:</strong> ${time}</p>
  </div>
  
  <p style="color: #666; font-size: 14px; margin-top: 30px;">This is an automated message. Please do not reply to this email.</p>
</div>
  `;

  return sendEmail({ to: "sigmaticinvestments@gmail.com", subject, html });
}

/**
 * Sends a confirmation email to a user who submitted a form
 */
export async function sendFormConfirmationEmail(formData: any): Promise<boolean> {
  const name = formData.fullName || formData.name || 'User';
  const email = formData.email;
  
  // If no email is provided, we can't send a confirmation
  if (!email) {
    console.log('No email provided for confirmation email');
    return false;
  }

  const submissionId = formData.submissionId || 
    `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  
  const subject = 'Your Application Has Been Received - Sigmatic Trading';
  
  const html = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background-color: #7497bd; padding: 20px; text-align: center; color: white;">
    <h1 style="margin: 0;">Application Received</h1>
  </div>
  <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none;">
    <p>Hello ${name},</p>
    <p>Thank you for submitting your application with Sigmatic Trading.</p>
    <p>We have received your information and our team will review it shortly. Your submission ID is: <strong>${submissionId}</strong></p>
    <p>If we need any additional information, we will contact you at this email address.</p>
    <p>Best regards,<br/>The Sigmatic Trading Team</p>
  </div>
  <div style="text-align: center; padding: 10px; font-size: 12px; color: #666;">
    <p>This is an automated email, please do not reply.</p>
  </div>
</div>
  `;

  return sendEmail({ to: email, subject, html });
}