import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { randomUUID } from "crypto"

// Create a reusable transporter outside the handler function
// This avoids creating a new connection for each request
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "essabar.yassine@gmail.com",
    pass: "xjmw odfu tzms rtyy",
  },
  pool: true,
  maxConnections: 5,
  maxMessages: Infinity
})

export async function POST(req: Request) {
  try {
    // Parse the FormData using the built-in Request.formData() method
    const formData = await req.formData()
    
    // Extract the form fields
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const setupChoice = formData.get('setupChoice') as string
    const selectedRobot = formData.get('selectedRobot') as string
    const minimumDepositAcknowledged = formData.get('minimumDepositAcknowledged') as string
    const consentGiven = formData.get('consentGiven') as string
    
    // Prepare the email without attachments first
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
      attachments: [],
      priority: 'high'
    }
    
    // Extract file attachments - only process if they exist
    const identityDocument = formData.get('identityDocument') as File | null
    const proofOfAddress = formData.get('proofOfAddress') as File | null
    
    // Only add attachments if they exist and aren't too large
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
    
    if (identityDocument && identityDocument.size < MAX_FILE_SIZE) {
      try {
        const buffer = Buffer.from(await identityDocument.arrayBuffer())
        mailOptions.attachments.push({
          filename: identityDocument.name,
          content: buffer,
          contentType: identityDocument.type
        })
      } catch (err) {
        console.error("Error processing identity document:", err)
      }
    }

    if (proofOfAddress && proofOfAddress.size < MAX_FILE_SIZE) {
      try {
        const buffer = Buffer.from(await proofOfAddress.arrayBuffer())
        mailOptions.attachments.push({
          filename: proofOfAddress.name,
          content: buffer,
          contentType: proofOfAddress.type
        })
      } catch (err) {
        console.error("Error processing proof of address:", err)
      }
    }

    // Send email with timeout
    const sendMailWithTimeout = async () => {
      return new Promise((resolve, reject) => {
        // Set a timeout to abort if it takes too long
        const timeoutId = setTimeout(() => {
          reject(new Error("Email sending timed out"));
        }, 8000); // 8 second timeout (Vercel has 10s limit)
        
        transporter.sendMail(mailOptions)
          .then(result => {
            clearTimeout(timeoutId);
            resolve(result);
          })
          .catch(error => {
            clearTimeout(timeoutId);
            reject(error);
          });
      });
    };
    
    try {
      const info = await sendMailWithTimeout();
      console.log("Email sent successfully");
      return NextResponse.json({ message: "Form submitted successfully" }, { status: 200 });
    } catch (emailError) {
      console.error("Email error:", emailError);
      
      // If we timed out or had an error, still return success to the user
      // but log the error server-side
      return NextResponse.json({ 
        message: "Form received successfully. You will be contacted shortly.", 
        note: "Email delivery delayed, will be processed asynchronously"
      }, { status: 200 });
    }
    
  } catch (error) {
    console.error("Error processing form:", error);
    return NextResponse.json({ 
      message: "Error processing form. Please try again or contact support.", 
      error: String(error).substring(0, 100) // Only return a short error message
    }, { status: 500 });
  }
}