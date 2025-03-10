// /app/api/submit-form/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, formData, subject } = await request.json();

    // Generate unique identifiers for this submission
    const timestamp = new Date().toISOString();
    const uniqueId = Date.now() + '-' + Math.random().toString(36).substring(2, 10);

    console.log(`Processing form submission with ID: ${uniqueId}`);
    
    // Create transporter for each request - do not reuse
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Use specific host instead of service
      port: 465,
      secure: true, // use SSL
      auth: {
        user: "essabar.yassine@gmail.com",
        pass: "xjmw odfu tzms rtyy",
      },
      tls: {
        rejectUnauthorized: false // Avoid certificate issues
      }
    });

    // Create a formatted HTML for the admin notification email
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #7497bd; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">New Form Submission - ID: ${uniqueId}</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none;">
          <p>Hello Admin,</p>
          <p>A new form has been submitted on the Sigmatic Trading platform.</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <p><strong>Submission ID:</strong> ${uniqueId}</p>
            <p><strong>Name:</strong> ${name || 'Not provided'}</p>
            <p><strong>Setup Choice:</strong> ${formData.setupChoice}</p>
            <p><strong>Selected Robot:</strong> ${formData.selectedRobot}</p>
            <p><strong>Verification Status:</strong> ${formData.verificationComplete ? 'Complete' : 'Incomplete'}</p>
            <p><strong>Deposit Status:</strong> ${formData.depositVerified ? 'Verified' : 'Not Verified'}</p>
            <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <h3 style="margin-top: 20px;">Complete Form Data:</h3>
          <pre style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; white-space: pre-wrap; font-size: 12px;">
${JSON.stringify(formData, null, 2)}
          </pre>
          
          <p>You may want to review this submission and take any necessary actions.</p>
          <p>Best regards,<br/>Sigmatic Trading System</p>
        </div>
      </div>
    `;

    // Create a completely unique subject line for each submission
    const uniqueSubject = `New FORM Registration - ${uniqueId}`;

    console.log(`Attempting to send email to essabar.yassine@gmail.com with subject "${uniqueSubject}"`);

    // Send email
    const mailOptions = {
      from: {
        name: 'Sigmatic Trading',
        address: 'essabar.yassine@gmail.com'
      },
      to: 'essabar.yassine@gmail.com', // Always send to this address
      subject: uniqueSubject,
      html: adminHtml,
      headers: {
        'X-Entity-Ref-ID': uniqueId,
        'Message-ID': `<${uniqueId}@sigmatic-trading.com>`,
        'X-Priority': '1'
      }
    };

    // Send the email and wait for the result
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`Email sent successfully! Message ID: ${info.messageId}`);
    
    // Close the transporter connection
    await transporter.close();

    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      emailId: info.messageId,
      submissionId: uniqueId
    });
  } catch (error) {
    // Detailed error logging
    console.error('Failed to send email:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error submitting form',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}