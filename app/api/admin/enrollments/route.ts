import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

// GET - Fetch all enrollments
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 })
    }

    const enrollments = await prisma.enrollment.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: true,
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    // Fetch progress for each enrollment separately
    const enrollmentsWithProgress = await Promise.all(
      enrollments.map(async (enrollment) => {
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
    return NextResponse.json({ error: 'Failed to fetch enrollments' }, { status: 500 })
  }
}

// PUT - Update enrollment status
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 })
    }

    const { enrollmentId, status } = await req.json()

    if (!enrollmentId || !status) {
      return NextResponse.json(
        { error: 'Enrollment ID and status are required' },
        { status: 400 }
      )
    }

    const enrollment = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: { status },
      include: {
        student: true,
        course: true,
      },
    })

    return NextResponse.json(enrollment)
  } catch (error) {
    console.error('Update enrollment error:', error)
    return NextResponse.json({ error: 'Failed to update enrollment' }, { status: 500 })
  }
}

// DELETE - Delete an enrollment
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const enrollmentId = searchParams.get('id')

    if (!enrollmentId) {
      return NextResponse.json({ error: 'Enrollment ID is required' }, { status: 400 })
    }

    await prisma.enrollment.delete({
      where: { id: enrollmentId },
    })

    return NextResponse.json({ message: 'Enrollment deleted successfully' })
  } catch (error) {
    console.error('Delete enrollment error:', error)
    return NextResponse.json({ error: 'Failed to delete enrollment' }, { status: 500 })
  }
}
