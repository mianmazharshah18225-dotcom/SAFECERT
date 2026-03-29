import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { COURSES } from '@/lib/data'

export async function POST(request: NextRequest) {
  try {
    const { courseId } = await request.json()

    // Find the course
    const course = COURSES.find((c) => c.id === courseId)
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Extract price number from string (e.g., "£1,200" -> 1200)
    const priceString = course.price.replace(/[£,]/g, '')
    const amount = parseInt(priceString, 10)

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
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
      metadata: {
        courseId: course.id,
        courseTitle: course.title,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
