'use client'

import { useState, useEffect } from 'react'
import { Star, CheckCircle, Plus } from 'lucide-react'
import { COMPANY } from '@/lib/data'
import AddReviewModal from './AddReviewModal'

interface Review {
  id: string
  name: string
  email: string
  course: string | null
  rating: number
  text: string
  isVerified: boolean
  createdAt: string
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewCount, setReviewCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews')
      const data = await response.json()

      if (data.success) {
        setReviews(data.reviews)
        setReviewCount(data.reviews.length)
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) !== 1 ? 's' : ''} ago`
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} month${Math.ceil(diffDays / 30) !== 1 ? 's' : ''} ago`
    return `${Math.ceil(diffDays / 365)} year${Math.ceil(diffDays / 365) !== 1 ? 's' : ''} ago`
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-600 bg-primary-50 px-4 py-2 rounded-full mb-4">
            Student Reviews
          </span>
          <h2 className="font-display text-4xl font-extrabold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          {reviewCount > 0 && (
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-green-500 text-green-500" />
                ))}
              </div>
              <span className="font-bold text-gray-900">Excellent</span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500">{reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</span>
            </div>
          )}

          {/* Add Review Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-gold px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Write a Review
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
              Be the First to Review!
            </h3>
            <p className="text-gray-500 mb-6">
              Share your experience and help others make the right choice.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Write the First Review
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-green-500 text-green-500" />
                    ))}
                  </div>
                  {review.isVerified && (
                    <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Verified
                    </div>
                  )}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{review.text}"</p>

                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{review.name}</div>
                    {review.course && (
                      <div className="text-xs text-gray-400">{review.course}</div>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">{formatDate(review.createdAt)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Review Modal */}
      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          fetchReviews() // Refresh reviews when modal closes
        }}
      />
    </section>
  )
}
