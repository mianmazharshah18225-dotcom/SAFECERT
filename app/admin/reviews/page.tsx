'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Star, CheckCircle, XCircle, Trash2, Check, X, Shield } from 'lucide-react'

interface Review {
  id: string
  name: string
  email: string
  course: string | null
  rating: number
  text: string
  isVerified: boolean
  isApproved: boolean
  createdAt: string
}

interface Stats {
  total: number
  pending: number
  approved: number
}

export default function AdminReviewsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [reviews, setReviews] = useState<Review[]>([])
  const [pending, setPending] = useState<Review[]>([])
  const [approved, setApproved] = useState<Review[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, approved: 0 })
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'pending' | 'approved'>('pending')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/')
    } else if (status === 'authenticated') {
      fetchReviews()
    }
  }, [status, session, router])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/admin/reviews')
      const data = await response.json()

      if (data.success) {
        setReviews(data.reviews)
        setPending(data.pending)
        setApproved(data.approved)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: true }),
      })

      if (response.ok) {
        fetchReviews()
      }
    } catch (error) {
      console.error('Error approving review:', error)
    }
  }

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: false }),
      })

      if (response.ok) {
        fetchReviews()
      }
    } catch (error) {
      console.error('Error rejecting review:', error)
    }
  }

  const handleToggleVerified = async (id: string, currentValue: boolean) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVerified: !currentValue }),
      })

      if (response.ok) {
        fetchReviews()
      }
    } catch (error) {
      console.error('Error toggling verified:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchReviews()
      }
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated' || session?.user?.role !== 'ADMIN') {
    return null
  }

  const displayReviews = tab === 'pending' ? pending : approved

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
            Review Management
          </h1>
          <p className="text-gray-600">Approve, verify, or delete customer reviews</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Reviews</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Pending Approval</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Approved</p>
                <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setTab('pending')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              tab === 'pending'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setTab('approved')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              tab === 'approved'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Approved ({stats.approved})
          </button>
        </div>

        {/* Reviews List */}
        {displayReviews.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
              {tab === 'pending' ? 'No Pending Reviews' : 'No Approved Reviews'}
            </h3>
            <p className="text-gray-500">
              {tab === 'pending'
                ? 'All reviews have been reviewed!'
                : 'Approve some reviews to see them here.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Rating and Verified Badge */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                        ))}
                      </div>
                      {review.isVerified && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                      {review.isApproved && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          <Check className="w-3 h-3" />
                          Published
                        </span>
                      )}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 mb-4 leading-relaxed">"{review.text}"</p>

                    {/* Reviewer Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="font-semibold text-gray-900">{review.name}</span>
                      <span>•</span>
                      <span>{review.email}</span>
                      {review.course && (
                        <>
                          <span>•</span>
                          <span>{review.course}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{formatDate(review.createdAt)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    {!review.isApproved ? (
                      <button
                        onClick={() => handleApprove(review.id)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReject(review.id)}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Unapprove
                      </button>
                    )}

                    <button
                      onClick={() => handleToggleVerified(review.id, review.isVerified)}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2 ${
                        review.isVerified
                          ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      <Shield className="w-4 h-4" />
                      {review.isVerified ? 'Unverify' : 'Verify'}
                    </button>

                    <button
                      onClick={() => handleDelete(review.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
