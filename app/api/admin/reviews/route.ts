import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

// GET - Fetch all reviews (admin only)
export async function GET() {
  try {
    // Check if user is admin
    const session = await getServerSession()
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Separate pending and approved
    const pending = reviews.filter(r => !r.isApproved)
    const approved = reviews.filter(r => r.isApproved)

    return NextResponse.json({
      success: true,
      reviews,
      pending,
      approved,
      stats: {
        total: reviews.length,
        pending: pending.length,
        approved: approved.length,
      }
    })
  } catch (error) {
    console.error('Error fetching admin reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}
