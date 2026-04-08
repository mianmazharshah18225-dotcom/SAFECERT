import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { COMPANY } from '@/lib/data'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, course, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Skip sending if Resend is not configured
    if (!resend) {
      console.warn('Resend API key not configured. Contact form submission received but email not sent')
      // Still return success so the form works in development
      return NextResponse.json({
        success: true,
        message: 'Contact form submitted (email service not configured)'
      })
    }

    // Send email to info@safecertskill.co.uk
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'SafeCert Skills <noreply@safecertskill.co.uk>',
      to: [COMPANY.email], // Send to info@safecertskill.co.uk
      replyTo: email, // User's email for easy reply
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
              .header { background: linear-gradient(135deg, #0066cc 0%, #004999 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
              .field:last-child { border-bottom: none; }
              .label { font-weight: bold; color: #0066cc; display: block; margin-bottom: 5px; }
              .value { color: #333; }
              .message-box { background: #f0f7ff; border-left: 4px solid #0066cc; padding: 15px; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Name:</span>
                  <span class="value">${name}</span>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <span class="value"><a href="mailto:${email}">${email}</a></span>
                </div>
                ${phone ? `
                <div class="field">
                  <span class="label">Phone:</span>
                  <span class="value"><a href="tel:${phone}">${phone}</a></span>
                </div>
                ` : ''}
                ${course ? `
                <div class="field">
                  <span class="label">Course Interested In:</span>
                  <span class="value">${course}</span>
                </div>
                ` : ''}
                <div class="field">
                  <span class="label">Message:</span>
                  <div class="message-box">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>
                <p style="margin-top: 20px; color: #666; font-size: 14px;">
                  <strong>Tip:</strong> You can reply directly to this email to respond to ${name}.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Error sending contact form email:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      data
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
