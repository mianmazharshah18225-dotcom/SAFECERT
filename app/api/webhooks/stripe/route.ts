import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { sendEmail, emailTemplates } from '@/lib/email'
import Stripe from 'stripe'

// Disable body parsing for Stripe webhooks
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const enrollmentId = session.metadata?.enrollmentId

        if (!enrollmentId) {
          console.error('No enrollment ID in session metadata')
          break
        }

        // Update enrollment status to ACTIVE
        const enrollment = await prisma.enrollment.update({
          where: { id: enrollmentId },
          data: { status: 'ACTIVE' },
          include: {
            student: true,
            course: true,
          },
        })

        // Create payment record
        await prisma.payment.create({
          data: {
            enrollmentId: enrollment.id,
            stripeId: session.id,
            amount: (session.amount_total || 0) / 100,
            currency: session.currency || 'gbp',
            status: 'COMPLETED',
          },
        })

        // Send enrollment confirmation email
        const enrollmentTemplate = emailTemplates.enrollmentConfirmation(
          enrollment.student.name,
          enrollment.course.title
        )
        await sendEmail({
          to: enrollment.student.email,
          subject: enrollmentTemplate.subject,
          html: enrollmentTemplate.html,
          type: 'ENROLLMENT_CONFIRMATION',
        })

        // Send payment success email
        const paymentTemplate = emailTemplates.paymentSuccess(
          enrollment.student.name,
          enrollment.course.title,
          (session.amount_total || 0) / 100
        )
        await sendEmail({
          to: enrollment.student.email,
          subject: paymentTemplate.subject,
          html: paymentTemplate.html,
          type: 'PAYMENT_SUCCESS',
        })

        console.log('✅ Enrollment activated and emails sent:', enrollmentId)
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        const enrollmentId = session.metadata?.enrollmentId

        if (!enrollmentId) {
          console.error('No enrollment ID in session metadata')
          break
        }

        // Update enrollment status to EXPIRED
        await prisma.enrollment.update({
          where: { id: enrollmentId },
          data: { status: 'EXPIRED' },
        })

        console.log('⏰ Enrollment expired:', enrollmentId)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.error('❌ Payment failed:', paymentIntent.id)

        // You can add logic here to update payment status to FAILED
        break
      }

      default:
        console.log('Unhandled event type:', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
