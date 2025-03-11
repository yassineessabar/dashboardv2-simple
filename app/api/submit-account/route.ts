import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Create a reusable transporter outside the handler function
// Using the WORKING password from email.ts
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sigmaticinvestments@gmail.com",
    pass: "hyzi jtkg btyg oldu", // Updated to working password
  },
  pool: true,
  maxConnections: 3,
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

// Maximum file size (3MB)
const MAX_FILE_SIZE = 3 * 1024 * 1024;

export async function POST(req: Request) {
  try {
    let data;
    let isFormData = false;
    
    // Check if the request is FormData or JSON
    const contentType = req.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      // Parse the FormData
      const formData = await req.formData();
      isFormData = true;
      
      // Convert FormData to a regular object
      data = {};
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }
    } else {
      // Parse JSON request
      data = await req.json();
    }
    
    // First, immediately return a success response to the client
    const responsePromise = NextResponse.json({ 
      message: "Form received. Processing in background." 
    }, { status: 200 });
    
    // Continue processing in the background with setTimeout
    // This strategy is working well in the registration route
    setTimeout(() => {
      processingInBackground(data, isFormData)
        .catch(err => console.error("Background processing error:", err));
    }, 100);
    
    // Return the success response immediately
    return responsePromise;
    
  } catch (error) {
    console.error("Error processing form:", error);
    return NextResponse.json({ 
      message: "Error processing form. Please try again." 
    }, { status: 500 });
  }
}

// Separate function to handle the processing in the background
async function processingInBackground(data, isFormData) {
  try {
    console.log("Starting background form processing");
    
    let fullName, email, phoneNumber, setupChoice, selectedRobot, 
        submissionId, submissionTime, verificationStatus, depositStatus;
    
    // Extract form fields based on request type
    if (isFormData) {
      // FormData format
      fullName = data.fullName;
      email = data.email;
      phoneNumber = data.phoneNumber || "Not provided";
      setupChoice = data.setupChoice;
      selectedRobot = data.selectedRobot;
      submissionId = data.submissionId || `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      submissionTime = data.submissionTime || new Date().toLocaleString('en-GB');
      verificationStatus = "Incomplete";
      depositStatus = "Not Verified";
    } else {
      // JSON format
      fullName = data.name;
      email = data.email;
      phoneNumber = data.phoneNumber || "Not provided";
      setupChoice = data.formData?.setupChoice;
      selectedRobot = data.formData?.selectedRobot;
      submissionId = data.submissionId || `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      submissionTime = data.submissionTime || new Date().toLocaleString('en-GB');
      verificationStatus = data.verificationStatus || "Incomplete";
      depositStatus = data.depositStatus || "Not Verified";
    }
    
    console.log(`Processing form for ${fullName} (${email})`);
    
    // Setup email options without attachments first
    const mailOptions = {
      from: '"Sigmatic Trading" <sigmaticinvestments@gmail.com>',
      to: "sigmaticinvestments@gmail.com",
      subject: "New Real Account Submission",
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
  <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Account Registration</h2>
  
  <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 4px;">
    <p style="margin: 5px 0;"><strong>Submission ID:</strong> ${submissionId}</p>
    <p style="margin: 5px 0;"><strong>Name:</strong> ${fullName}</p>
    <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
    <p style="margin: 5px 0;"><strong>Phone Number:</strong> ${phoneNumber}</p>
    <p style="margin: 5px 0;"><strong>Setup Choice:</strong> ${setupChoice}</p>
    <p style="margin: 5px 0;"><strong>Selected Robot:</strong> ${selectedRobot}</p>
    <p style="margin: 5px 0;"><strong>Verification Status:</strong> ${verificationStatus}</p>
    <p style="margin: 5px 0;"><strong>Deposit Status:</strong> ${depositStatus}</p>
    <p style="margin: 5px 0;"><strong>Submission Time:</strong> ${submissionTime}</p>
  </div>
  
  <p style="color: #666; font-size: 14px; margin-top: 30px;">This is an automated message. Please do not reply to this email.</p>
</div>
      `,
      attachments: []
    };
    
    // Process attachments if FormData
    if (isFormData) {
      // Try to process identity document
      try {
        const identityDocument = data.identityDocument;
        if (identityDocument && identityDocument.size < MAX_FILE_SIZE) {
          console.log(`Processing identity document: ${identityDocument.name}`);
          const buffer = Buffer.from(await identityDocument.arrayBuffer());
          mailOptions.attachments.push({
            filename: identityDocument.name || 'identity_document.pdf',
            content: buffer
          });
        }
      } catch (err) {
        console.error("Error with identity document:", err);
      }
      
      // Try to process proof of address
      try {
        const proofOfAddress = data.proofOfAddress;
        if (proofOfAddress && proofOfAddress.size < MAX_FILE_SIZE) {
          console.log(`Processing proof of address: ${proofOfAddress.name}`);
          const buffer = Buffer.from(await proofOfAddress.arrayBuffer());
          mailOptions.attachments.push({
            filename: proofOfAddress.name || 'proof_of_address.pdf',
            content: buffer
          });
        }
      } catch (err) {
        console.error("Error with proof of address:", err);
      }
    }
    
    console.log(`Sending email with ${mailOptions.attachments.length} attachments`);
    
    // Use async/await for email sending instead of promises
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Form submission email sent successfully:", info.messageId);
      
      // Send confirmation email to the user if we have their email
      if (email) {
        try {
          const userConfirmation = {
            from: '"Sigmatic Trading" <sigmaticinvestments@gmail.com>',
            to: email,
            subject: "Your Application Has Been Received",
            html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background-color: #7497bd; padding: 20px; text-align: center; color: white;">
    <h1 style="margin: 0;">Application Received</h1>
  </div>
  <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none;">
    <p>Hello ${fullName},</p>
    <p>Thank you for submitting your application with Sigmatic Trading.</p>
    <p>We have received your information and our team will review it shortly. Your submission ID is: <strong>${submissionId}</strong></p>
    <p>If we need any additional information, we will contact you at this email address.</p>
    <p>Best regards,<br/>The Sigmatic Trading Team</p>
  </div>
  <div style="text-align: center; padding: 10px; font-size: 12px; color: #666;">
    <p>This is an automated email, please do not reply.</p>
  </div>
</div>
            `
          };
          
          const userEmailInfo = await transporter.sendMail(userConfirmation);
          console.log("User confirmation email sent:", userEmailInfo.messageId);
        } catch (userEmailErr) {
          console.error("Failed to send user confirmation email:", userEmailErr);
        }
      }
    } catch (err) {
      console.error("Failed to send admin notification email:", err);
      
      if (err.code === 'EAUTH') {
        console.error("Authentication error - check your Gmail app password");
      }
    }
      
  } catch (error) {
    console.error("Background processing error:", error);
  }
}