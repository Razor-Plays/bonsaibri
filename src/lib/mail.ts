// Email utility for contact form submissions
// This is a stub implementation that can be replaced with Resend, SMTP, or other email providers

export interface EmailData {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactEmail(data: EmailData): Promise<void> {
  // Stub implementation - replace with actual email service
  console.log('Contact form submission received:')
  console.log(`From: ${data.name} <${data.email}>`)
  console.log(`Subject: ${data.subject}`)
  console.log(`Message: ${data.message}`)
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // In a real implementation, you would:
  // 1. Use Resend API: await resend.emails.send({...})
  // 2. Use Nodemailer with SMTP: await transporter.sendMail({...})
  // 3. Use SendGrid, Postmark, or other email service
  
  console.log('Email sent successfully (stub)')
}

export async function sendProductInquiryEmail(
  productTitle: string,
  customerEmail: string,
  customerName: string,
  message: string
): Promise<void> {
  console.log('Product inquiry received:')
  console.log(`Product: ${productTitle}`)
  console.log(`From: ${customerName} <${customerEmail}>`)
  console.log(`Message: ${message}`)
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  console.log('Product inquiry email sent successfully (stub)')
}
