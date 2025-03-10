import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Create a reusable transporter outside the handler function
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "essabar.yassine@gmail.com",
    pass: "xjmw odfu tzms rtyy",
  },
  pool: true,
  maxConnections: 5
})

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
    // This prevents timeouts from the client perspective
    const responsePromise = NextResponse.json({ 
      message: "Form received. Processing in background." 
    }, { status: 200 });
    
    // Continue processing in the background
    processingInBackground(data, isFormData);
    
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
    
    // Setup email options without attachments first
    const mailOptions = {
      from: "essabar.yassine@gmail.com",
      to: "essabar.yassine@gmail.com",
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
    }
    
    // Try to process attachments with size limiting if FormData
    if (isFormData) {
      try {
        const identityDocument = data.identityDocument;
        if (identityDocument && identityDocument.size < MAX_FILE_SIZE) {
          const buffer = Buffer.from(await identityDocument.arrayBuffer())
          mailOptions.attachments.push({
            filename: identityDocument.name || 'identity_document.pdf',
            content: buffer,
            encoding: 'base64'
          })
        }
      } catch (err) {
        console.error("Error with identity document:", err)
        // Continue anyway
      }
      
      try {
        const proofOfAddress = data.proofOfAddress;
        if (proofOfAddress && proofOfAddress.size < MAX_FILE_SIZE) {
          const buffer = Buffer.from(await proofOfAddress.arrayBuffer())
          mailOptions.attachments.push({
            filename: proofOfAddress.name || 'proof_of_address.pdf',
            content: buffer,
            encoding: 'base64'
          })
        }
      } catch (err) {
        console.error("Error with proof of address:", err)
        // Continue anyway
      }
    }
    
    // Send the email, but don't wait for it
    transporter.sendMail(mailOptions)
      .then(info => {
        console.log("Email sent successfully:", info.messageId)
      })
      .catch(err => {
        console.error("Failed to send email:", err)
      });
      
  } catch (error) {
    console.error("Background processing error:", error)
  }
}