'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { COURSES } from '@/lib/data'
import Image from 'next/image'
import { Clock, Tag, CheckCircle, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const courseId = searchParams.get('course')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const course = COURSES.find((c) => c.id === courseId)

  useEffect(() => {
    if (!course) {
      router.push('/courses')
    }
  }, [course, router])

  const handleCheckout = async () => {
    if (!course) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: course.id }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe checkout using the URL
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-white">
            <h1 className="font-display text-3xl font-bold mb-2">Course Enrollment</h1>
            <p className="text-white/90">Complete your enrollment for {course.title}</p>
          </div>

          <div className="p-8">
            {/* Course Details */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              {/* Course Image */}
              <div className="relative w-full md:w-64 h-48 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Course Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-4xl">{course.icon}</span>
                  <h2 className="font-display text-2xl font-bold text-gray-900">
                    {course.title}
                  </h2>
                </div>

                <p className="text-gray-600 mb-4">{course.description}</p>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Tag className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold">{course.level}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {course.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600 font-medium">Course Fee</span>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 line-through">{course.originalPrice}</div>
                    <div className="text-3xl font-display font-bold text-primary-700">{course.price}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg mb-6">
                  <CheckCircle className="w-4 h-4" />
                  <span>You save £{parseInt(course.originalPrice.replace(/[£,]/g, '')) - parseInt(course.price.replace(/[£,]/g, ''))} on this course!</span>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                  </div>
                )}

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full btn-primary py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Payment
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Secure payment powered by Stripe • Test Mode
                </p>
              </div>

              {/* Additional Info */}
              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Full refund within 14 days if you&apos;re not satisfied</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Certificate issued upon successful completion</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Lifetime access to course materials</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
