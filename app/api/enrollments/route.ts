import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

// GET - Fetch all enrollments for the logged-in user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { studentId: session.user.id },
      include: {
        course: true,
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    // Fetch progress for each enrollment separately
    const enrollmentsWithProgress = await Promise.all(
      enrollments.map(async (enrollment: any) => {
        const progress = await prisma.progress.findMany({
          where: {
            studentId: enrollment.studentId,
            courseId: enrollment.courseId,
          },
        })
        return { ...enrollment, progress }
      })
    )

    return NextResponse.json(enrollmentsWithProgress)
  } catch (error) {
    console.error('Get enrollments error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch enrollments' },
      { status: 500 }
    )
  }
}

// POST - Create a new enrollment (called before payment)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { courseId, stripeSessionId } = await req.json()

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    // Check if user is already enrolled in this course
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        studentId: session.user.id,
        courseId,
        status: { in: ['ACTIVE', 'PENDING'] },
      },
    })

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 400 }
      )
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: session.user.id,
        courseId,
        stripeSessionId,
        status: 'PENDING',
      },
      include: {
        course: true,
        student: true,
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

    return NextResponse.json(enrollment, { status: 201 })
  } catch (error) {
    console.error('Enrollment error:', error)
    return NextResponse.json(
      { error: 'Failed to create enrollment' },
      { status: 500 }
    )
  }
}
