'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2, BookOpen, Clock, Award, TrendingUp, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'

interface Enrollment {
  id: string
  status: string
  enrolledAt: string
  course: {
    id: string
    title: string
    description: string
    image: string
    duration: string
    level: string
  }
  progress: {
    completionPercentage: number
    lastAccessedAt: string
  }[]
  payment: {
    amount: number
    status: string
  } | null
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/dashboard')
    }

    if (status === 'authenticated') {
      fetchEnrollments()
    }
  }, [status, router])

  const fetchEnrollments = async () => {
    try {
      const response = await fetch('/api/enrollments')
      if (response.ok) {
        const data = await response.json()
        setEnrollments(data)
      }
    } catch (error) {
      console.error('Failed to fetch enrollments:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  const activeEnrollments = enrollments.filter((e) => e.status === 'ACTIVE')
  const averageProgress =
    activeEnrollments.length > 0
      ? Math.round(
          activeEnrollments.reduce(
            (acc, e) => acc + (e.progress[0]?.completionPercentage || 0),
            0
          ) / activeEnrollments.length
        )
      : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2">
                Welcome back, {session.user.name}!
              </h1>
              <p className="text-white/90">Track your progress and continue learning</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Active Courses</p>
                <p className="text-3xl font-display font-bold text-gray-900">
                  {activeEnrollments.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Average Progress</p>
                <p className="text-3xl font-display font-bold text-gray-900">{averageProgress}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Completed Courses</p>
                <p className="text-3xl font-display font-bold text-gray-900">
                  {enrollments.filter((e) => e.status === 'COMPLETED').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* My Courses */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-gray-900">My Courses</h2>
            <Link href="/courses" className="text-primary-600 hover:text-primary-700 font-semibold">
              Browse More Courses →
            </Link>
          </div>

          {enrollments.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
                No Courses Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start your learning journey by enrolling in a course
              </p>
              <Link href="/courses" className="btn-primary inline-block">
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Course Image */}
                    <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={enrollment.course.image}
                        alt={enrollment.course.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Course Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-display text-xl font-bold text-gray-900">
                          {enrollment.course.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            enrollment.status === 'ACTIVE'
                              ? 'bg-green-100 text-green-700'
                              : enrollment.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {enrollment.status}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4">{enrollment.course.description}</p>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {enrollment.course.duration}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Award className="w-4 h-4" />
                          {enrollment.course.level}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {enrollment.status === 'ACTIVE' && (
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-semibold text-gray-900">
                              {enrollment.progress[0]?.completionPercentage || 0}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full transition-all"
                              style={{
                                width: `${enrollment.progress[0]?.completionPercentage || 0}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
