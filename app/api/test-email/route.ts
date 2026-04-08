import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function GET() {
  try {
    if (!resend) {
      return NextResponse.json({
        error: 'Resend API key not configured'
      }, { status: 500 })
    }

    // Send a test email
    const { data, error } = await resend.emails.send({
      from: 'SafeCert Skills <noreply@safecertskill.co.uk>',
      to: ['info@safecertskill.co.uk'],
      subject: 'Test Email from SafeCert Website',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email to verify that Resend is working correctly.</p>
        <p>If you receive this, your email setup is working!</p>
        <p>Time: ${new Date().toLocaleString()}</p>
      `,
    })

    if (error) {
      return NextResponse.json({
        success: false,
        error: error,
        message: 'Failed to send test email'
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully!',
      data: data
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
      message: 'Error sending test email'
    }, { status: 500 })
  }
}
