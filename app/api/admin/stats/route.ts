import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get total students
    const totalStudents = await prisma.user.count({
      where: { role: 'STUDENT' },
    })

    // Get total enrollments
    const totalEnrollments = await prisma.enrollment.count()

    // Get active enrollments
    const activeEnrollments = await prisma.enrollment.count({
      where: { status: 'ACTIVE' },
    })

    // Get total revenue
    const payments = await prisma.payment.findMany({
      where: { status: 'COMPLETED' },
      select: { amount: true },
    })

    const totalRevenue = payments.reduce((sum: number, payment: any) => sum + payment.amount, 0)

    return NextResponse.json({
      totalStudents,
      totalEnrollments,
      activeEnrollments,
      totalRevenue,
    })
  } catch (error) {
    console.error('Get admin stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
