import { Resend } from 'resend'
import { prisma } from './prisma'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

interface SendEmailParams {
  to: string
  subject: string
  html: string
  type: 'WELCOME' | 'ENROLLMENT_CONFIRMATION' | 'PAYMENT_SUCCESS' | 'COURSE_REMINDER' | 'COURSE_COMPLETION'
}

export async function sendEmail({ to, subject, html, type }: SendEmailParams) {
  try {
    // Skip sending if Resend is not configured
    if (!resend) {
      console.warn('Resend API key not configured. Email not sent:', { to, subject, type })
      return { success: false, error: 'Email service not configured' }
    }

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'SafeCert Skills <noreply@safecertskills.co.uk>',
      to: [to],
      subject,
      html,
    })

    if (error) {
      console.error('Error sending email:', error)

      // Log failed email
      await prisma.emailLog.create({
        data: {
          to,
          subject,
          type,
          status: 'failed',
        },
      })

      return { success: false, error }
    }

    // Log successful email
    await prisma.emailLog.create({
      data: {
        to,
        subject,
        type,
        status: 'sent',
      },
    })

    return { success: true, data }
  } catch (error) {
    console.error('Error in sendEmail:', error)
    return { success: false, error }
  }
}

// Email templates
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'Welcome to SafeCert Skills Ltd!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0066cc 0%, #004999 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #0066cc; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to SafeCert Skills!</h1>
            </div>
            <div class="content">
              <h2>Hi ${name},</h2>
              <p>Thank you for joining SafeCert Skills Ltd. We're excited to have you on board!</p>
              <p>You can now browse our courses and enroll in professional training programs:</p>
              <ul>
                <li>First Aid Training (Level 3)</li>
                <li>Food & Hygiene Safety (Level 2)</li>
                <li>Health & Safety (Level 3)</li>
              </ul>
              <p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/courses" class="button">Browse Courses</a>
              </p>
              <p>If you have any questions, feel free to contact us at info@safecertskills.co.uk</p>
              <p>Best regards,<br>The SafeCert Skills Team</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} SafeCert Skills Ltd. All rights reserved.</p>
              <p>Luton, United Kingdom</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  enrollmentConfirmation: (name: string, courseName: string) => ({
    subject: `Enrollment Confirmed: ${courseName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0066cc 0%, #004999 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #0066cc; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .success { background: #10b981; color: white; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Enrollment Confirmed!</h1>
            </div>
            <div class="content">
              <div class="success">
                <h2 style="margin: 0;">✓ You're enrolled in ${courseName}</h2>
              </div>
              <h2>Hi ${name},</h2>
              <p>Congratulations! Your enrollment has been confirmed.</p>
              <p><strong>Course:</strong> ${courseName}</p>
              <p>You can now access your course materials and start learning.</p>
              <p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" class="button">Go to Dashboard</a>
              </p>
              <p>If you have any questions about the course, please don't hesitate to contact us.</p>
              <p>Best regards,<br>The SafeCert Skills Team</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} SafeCert Skills Ltd. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  paymentSuccess: (name: string, courseName: string, amount: number) => ({
    subject: 'Payment Successful - SafeCert Skills',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .payment-details { background: white; border: 2px solid #10b981; padding: 20px; border-radius: 5px; margin: 20px 0; }
            .button { display: inline-block; background: #0066cc; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✓ Payment Successful!</h1>
            </div>
            <div class="content">
              <h2>Hi ${name},</h2>
              <p>Thank you for your payment. Your enrollment is now active!</p>
              <div class="payment-details">
                <h3>Payment Details</h3>
                <p><strong>Course:</strong> ${courseName}</p>
                <p><strong>Amount Paid:</strong> £${amount.toFixed(2)}</p>
                <p><strong>Status:</strong> <span style="color: #10b981;">Paid</span></p>
              </div>
              <p>You can now access your course and start learning immediately.</p>
              <p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" class="button">Access Course</a>
              </p>
              <p>Best regards,<br>The SafeCert Skills Team</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} SafeCert Skills Ltd. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),
}
