'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2, Users, BookOpen, DollarSign, TrendingUp, Trash2, CheckCircle, XCircle, Mail, Calendar } from 'lucide-react'

interface Stats {
  totalStudents: number
  totalEnrollments: number
  activeEnrollments: number
  totalRevenue: number
}

interface Student {
  id: string
  name: string
  email: string
  createdAt: string
  enrollments: any[]
  _count: { enrollments: number }
}

interface Enrollment {
  id: string
  status: string
  enrolledAt: string
  student: { id: string; name: string; email: string }
  course: { id: string; title: string }
  payment: { amount: number; status: string } | null
  progress: { completionPercentage: number }[]
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'enrollments'>('overview')
  const [stats, setStats] = useState<Stats | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/admin')
    }

    if (status === 'authenticated') {
      if (session?.user?.role !== 'ADMIN') {
        router.push('/dashboard')
        return
      }

      fetchAllData()
    }
  }, [status, session, router])

  const fetchAllData = async () => {
    try {
      const [statsRes, studentsRes, enrollmentsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/students'),
        fetch('/api/admin/enrollments'),
      ])

      if (statsRes.ok) setStats(await statsRes.json())
      if (studentsRes.ok) setStudents(await studentsRes.json())
      if (enrollmentsRes.ok) setEnrollments(await enrollmentsRes.json())
    } catch (error) {
      console.error('Failed to fetch admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteStudent = async (studentId: string) => {
    if (!confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/students?id=${studentId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setStudents(students.filter((s) => s.id !== studentId))
        alert('Student deleted successfully')
      }
    } catch (error) {
      console.error('Failed to delete student:', error)
      alert('Failed to delete student')
    }
  }

  const handleUpdateEnrollmentStatus = async (enrollmentId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/enrollments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentId, status: newStatus }),
      })

      if (response.ok) {
        const updated = await response.json()
        setEnrollments(enrollments.map((e) => (e.id === enrollmentId ? { ...e, status: newStatus } : e)))
        alert('Enrollment status updated successfully')
      }
    } catch (error) {
      console.error('Failed to update enrollment:', error)
      alert('Failed to update enrollment')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="font-display text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-white/90">Manage students, courses, and enrollments</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Students</p>
                <p className="text-3xl font-display font-bold text-gray-900">{stats?.totalStudents || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Enrollments</p>
                <p className="text-3xl font-display font-bold text-gray-900">{stats?.totalEnrollments || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Active Enrollments</p>
                <p className="text-3xl font-display font-bold text-gray-900">{stats?.activeEnrollments || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-display font-bold text-gray-900">£{stats?.totalRevenue.toFixed(2) || '0.00'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <div className="flex gap-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-2 border-b-2 font-semibold transition ${
                  activeTab === 'overview'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`py-4 px-2 border-b-2 font-semibold transition ${
                  activeTab === 'students'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Students ({students.length})
              </button>
              <button
                onClick={() => setActiveTab('enrollments')}
                className={`py-4 px-2 border-b-2 font-semibold transition ${
                  activeTab === 'enrollments'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Enrollments ({enrollments.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                <p className="text-gray-600">View all students and enrollments using the tabs above.</p>
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">All Students</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollments</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{student.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="w-4 h-4" />
                              {student.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                              {student._count.enrollments}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(student.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteStudent(student.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Enrollments Tab */}
            {activeTab === 'enrollments' && (
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">All Enrollments</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {enrollments.map((enrollment) => (
                        <tr key={enrollment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="font-medium text-gray-900">{enrollment.student.name}</div>
                              <div className="text-sm text-gray-500">{enrollment.student.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{enrollment.course.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={enrollment.status}
                              onChange={(e) => handleUpdateEnrollmentStatus(enrollment.id, e.target.value)}
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                enrollment.status === 'ACTIVE'
                                  ? 'bg-green-100 text-green-700'
                                  : enrollment.status === 'PENDING'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : enrollment.status === 'COMPLETED'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="ACTIVE">ACTIVE</option>
                              <option value="COMPLETED">COMPLETED</option>
                              <option value="CANCELLED">CANCELLED</option>
                              <option value="EXPIRED">EXPIRED</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {enrollment.progress[0]?.completionPercentage || 0}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {enrollment.payment ? (
                              <div>
                                <div className="font-medium text-gray-900">£{enrollment.payment.amount.toFixed(2)}</div>
                                <div
                                  className={`text-sm ${
                                    enrollment.payment.status === 'COMPLETED' ? 'text-green-600' : 'text-yellow-600'
                                  }`}
                                >
                                  {enrollment.payment.status}
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400">No payment</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {enrollment.status === 'ACTIVE' && (
                                <button
                                  onClick={() => handleUpdateEnrollmentStatus(enrollment.id, 'COMPLETED')}
                                  className="text-green-600 hover:text-green-700"
                                  title="Mark as completed"
                                >
                                  <CheckCircle className="w-5 h-5" />
                                </button>
                              )}
                              {enrollment.status !== 'CANCELLED' && (
                                <button
                                  onClick={() => handleUpdateEnrollmentStatus(enrollment.id, 'CANCELLED')}
                                  className="text-red-600 hover:text-red-700"
                                  title="Cancel enrollment"
                                >
                                  <XCircle className="w-5 h-5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
