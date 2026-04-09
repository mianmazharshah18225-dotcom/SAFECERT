import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Fetch approved reviews
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        isApproved: true, // Only show approved reviews
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20, // Limit to 20 most recent reviews
    })

    return NextResponse.json({
      success: true,
      reviews,
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST - Submit a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, course, rating, text } = body

    // Validate required fields
    if (!name || !email || !rating || !text) {
      return NextResponse.json(
        { error: 'Name, email, rating, and review text are required' },
        { status: 400 }
      )
    }

    // Validate rating is 1-5
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Create the review (will need admin approval)
    const review = await prisma.review.create({
      data: {
        name,
        email,
        course: course || null,
        rating,
        text,
        isApproved: false, // Needs admin approval
        isVerified: false,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you for your review! It will be published after approval.',
      review,
    })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    )
  }
}
