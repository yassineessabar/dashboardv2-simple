import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
// Remove unused imports that are causing issues in Vercel
// import os from "os"
// import path from "path"
// import { writeFile } from "fs/promises"
import { randomUUID } from "crypto"

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
    
    // Extract file attachments
    const identityDocument = formData.get('identityDocument') as File | null
    const proofOfAddress = formData.get('proofOfAddress') as File | null
    
    // Set up email transporter - create once and reuse
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "essabar.yassine@gmail.com",
        pass: "xjmw odfu tzms rtyy",
      },
      // Add connection pool for faster processing
      pool: true,
      maxConnections: 5
    })

    // Prepare attachments - process files in parallel
    const attachments = []
    const fileProcessingPromises = []

    // Skip file system writes and use memory buffers directly for faster processing
    if (identityDocument) {
      fileProcessingPromises.push(
        (async () => {
          try {
            const buffer = Buffer.from(await identityDocument.arrayBuffer())
            attachments.push({
              filename: identityDocument.name,
              content: buffer,
              contentType: identityDocument.type // Add content type for better MIME handling
            })
          } catch (err) {
            console.error("Error processing identity document:", err)
          }
        })()
      )
    }

    if (proofOfAddress) {
      fileProcessingPromises.push(
        (async () => {
          try {
            const buffer = Buffer.from(await proofOfAddress.arrayBuffer())
            attachments.push({
              filename: proofOfAddress.name,
              content: buffer,
              contentType: proofOfAddress.type // Add content type for better MIME handling
            })
          } catch (err) {
            console.error("Error processing proof of address:", err)
          }
        })()
      )
    }
    
    // Wait for all file processing to complete in parallel
    await Promise.all(fileProcessingPromises)

    // Prepare email content
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
      attachments: attachments,
      // Prioritize delivery speed
      priority: 'high'
    }

    // IMPORTANT CHANGE: Wait for the email to be sent before responding
    // This is critical for Vercel serverless functions
    try {
      const info = await transporter.sendMail(mailOptions)
      console.log("Email sent successfully:", info.messageId)
      return NextResponse.json({ 
        message: "Email sent successfully", 
        messageId: info.messageId 
      }, { status: 200 })
    } catch (emailError) {
      console.error("Error sending email:", emailError)
      return NextResponse.json({ 
        message: "Error sending email", 
        error: String(emailError) 
      }, { status: 500 })
    }
    
  } catch (error) {
    console.error("Error processing form:", error)
    return NextResponse.json({ 
      message: "Error processing form", 
      error: String(error) 
    }, { status: 500 })
  }
}

// Helper function to get file extension if needed
function getExtension(filename: string): string {
  return filename.substring(filename.lastIndexOf('.')) || ''
}
