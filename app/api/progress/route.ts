import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

// GET - Get progress for a specific course
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get('courseId')

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    const progress = await prisma.progress.findUnique({
      where: {
        studentId_courseId: {
          studentId: session.user.id,
          courseId,
        },
      },
    })

    if (!progress) {
      return NextResponse.json({ error: 'Progress not found' }, { status: 404 })
    }

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Get progress error:', error)
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}

// PUT - Update progress for a course
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { courseId, completionPercentage, currentModule } = await req.json()

    if (!courseId || completionPercentage === undefined) {
      return NextResponse.json(
        { error: 'Course ID and completion percentage are required' },
        { status: 400 }
      )
    }

    const progress = await prisma.progress.update({
      where: {
        studentId_courseId: {
          studentId: session.user.id,
          courseId,
        },
      },
      data: {
        completionPercentage: Math.min(100, Math.max(0, completionPercentage)),
        currentModule,
        lastAccessedAt: new Date(),
      },
    })

    // If course is completed, update enrollment status
    if (progress.completionPercentage === 100) {
      await prisma.enrollment.updateMany({
        where: {
          studentId: session.user.id,
          courseId,
          status: 'ACTIVE',
        },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
        },
      })
    }

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Update progress error:', error)
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
  }
}
