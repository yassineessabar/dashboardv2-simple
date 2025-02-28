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
    // Parse the FormData using the built-in Request.formData() method
    const formData = await req.formData()
    
    // First, immediately return a success response to the client
    // This prevents timeouts from the client perspective
    const responsePromise = NextResponse.json({ 
      message: "Form received. Processing in background." 
    }, { status: 200 });
    
    // Continue processing in the background
    processingInBackground(formData);
    
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
async function processingInBackground(formData) {
  try {
    // Extract the form fields
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const setupChoice = formData.get('setupChoice') as string
    const selectedRobot = formData.get('selectedRobot') as string
    const minimumDepositAcknowledged = formData.get('minimumDepositAcknowledged') as string
    const consentGiven = formData.get('consentGiven') as string
    
    // Setup email options without attachments first
    const mailOptions = {
      from: "essabar.yassine@gmail.com",
      to: "essabar.yassine@gmail.com",
      subject: "New Real Account Submission",
      text: `
New account submission:

Full Name: ${fullName}
Email: ${email}
Setup Choice: ${setupChoice}
Selected Robot: ${selectedRobot}
Minimum Deposit Acknowledged: ${minimumDepositAcknowledged === "true" ? "Yes" : "No"}
Consent Given: ${consentGiven === "true" ? "Yes" : "No"}
      `,
      attachments: []
    }
    
    // Try to process attachments with size limiting
    try {
      const identityDocument = formData.get('identityDocument') as File | null
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
      const proofOfAddress = formData.get('proofOfAddress') as File | null
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
    
    // Send the email, but don't wait for it
    transporter.sendMail(mailOptions)
      .then(info => {
        console.log("Email sent successfully:", info.messageId)
      })
      .catch(err => {
        console.error("Failed to send email:", err)
        
        // Alternative: Store failed emails for retry
        // storeFailedEmail(mailOptions);
      });
      
  } catch (error) {
    console.error("Background processing error:", error)
  }
}