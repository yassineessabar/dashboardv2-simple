import { NextResponse } from "next/server"
import { transporter, sendFormSubmissionEmail, sendFormConfirmationEmail } from "@/lib/email"

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
    
    // Generate submissionId if not present
    if (!data.submissionId) {
      data.submissionId = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    }
    
    // Set submission time if not present
    if (!data.submissionTime) {
      data.submissionTime = new Date().toLocaleString('en-GB');
    }
    
    // Process attachments if FormData
    const attachments = [];
    
    if (isFormData) {
      // Try to process identity document
      try {
        const identityDocument = data.identityDocument;
        if (identityDocument && identityDocument.size < MAX_FILE_SIZE) {
          console.log(`Processing identity document: ${identityDocument.name}`);
          const buffer = Buffer.from(await identityDocument.arrayBuffer());
          attachments.push({
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
          attachments.push({
            filename: proofOfAddress.name || 'proof_of_address.pdf',
            content: buffer
          });
        }
      } catch (err) {
        console.error("Error with proof of address:", err);
      }
    }
    
    console.log(`Processing form with ${attachments.length} attachments`);
    
    // Send admin notification email with the shared email transporter
    try {
      // First send an email to admin
      const adminEmailResult = await sendFormSubmissionEmail(data);
      console.log(`Admin notification email result: ${adminEmailResult ? 'Success' : 'Failed'}`);
      
      // If there are attachments, send them in a separate email
      if (attachments.length > 0) {
        const name = data.fullName || data.name || 'Unknown User';
        const attachmentInfo = await transporter.sendMail({
          from: '"Sigmatic Trading" <sigmaticinvestments@gmail.com>',
          to: "sigmaticinvestments@gmail.com",
          subject: `Documentation for ${name} (ID: ${data.submissionId})`,
          html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2>User Documentation Attached</h2>
  <p>Please find attached documents for:</p>
  <ul>
    <li><strong>Name:</strong> ${name}</li>
    <li><strong>Submission ID:</strong> ${data.submissionId}</li>
    <li><strong>Email:</strong> ${data.email || 'Not provided'}</li>
  </ul>
  <p>The following documents are attached:</p>
  <ul>
    ${attachments.map(att => `<li>${att.filename}</li>`).join('')}
  </ul>
</div>
          `,
          attachments: attachments
        });
        console.log(`Documentation email sent successfully: ${attachmentInfo.messageId}`);
      }
      
      // Now send confirmation to user if we have their email
      if (data.email) {
        const userEmailResult = await sendFormConfirmationEmail(data);
        console.log(`User confirmation email result: ${userEmailResult ? 'Success' : 'Failed'}`);
      }
      
    } catch (err) {
      console.error("Error sending emails:", err);
    }
      
  } catch (error) {
    console.error("Background processing error:", error);
  }
}