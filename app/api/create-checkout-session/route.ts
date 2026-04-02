import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { COURSES } from '@/lib/data'

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to enroll in a course' },
        { status: 401 }
      )
    }

    const { courseId } = await request.json()

    // Find the course
    const course = COURSES.find((c) => c.id === courseId)
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Check if user is already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        studentId: session.user.id,
        courseId,
        status: { in: ['ACTIVE', 'PENDING'] },
      },
    })

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'You are already enrolled in this course' },
        { status: 400 }
      )
    }

    // Create enrollment record (PENDING status until payment is confirmed)
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: session.user.id,
        courseId,
        status: 'PENDING',
      },
    })

    // Create progress record
    await prisma.progress.create({
      data: {
        studentId: session.user.id,
        courseId,
        completionPercentage: 0,
      },
    })

    // Extract price number from string (e.g., "£1,200" -> 1200)
    const priceString = course.price.replace(/[£,]/g, '')
    const amount = parseInt(priceString, 10)

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: course.title,
              description: course.description,
              images: [course.image],
            },
            unit_amount: amount * 100, // Convert to pence
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/courses`,
      customer_email: session.user.email!,
      metadata: {
        enrollmentId: enrollment.id,
        courseId: course.id,
        userId: session.user.id,
        courseTitle: course.title,
      },
    })

    // Update enrollment with Stripe session ID
    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: { stripeSessionId: checkoutSession.id },
    })

    return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
