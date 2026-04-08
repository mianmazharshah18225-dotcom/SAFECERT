'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Mail, Calendar, Loader2 } from 'lucide-react'
import { COMPANY } from '@/lib/data'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate checking session (in production, verify with Stripe)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Confirming your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Heading */}
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Welcome to SafeCert Skills Ltd! Your enrollment is confirmed.
          </p>

          {/* Session Info */}
          {sessionId && (
            <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left">
              <p className="text-sm text-gray-600">
                <strong>Transaction ID:</strong> {sessionId}
              </p>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8 text-left">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary-600" />
              What Happens Next?
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Confirmation Email:</strong> Check your inbox for enrollment details and receipt
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Course Materials:</strong> You&apos;ll receive access to all course materials within 24 hours
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Schedule:</strong> Our team will contact you within 2 business days to confirm your start date
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Location:</strong> Training takes place at our Luton centre, 8:00 AM - 6:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              Need Help?
            </h3>
            <p className="text-gray-600 mb-2">
              Our team is here to help! Contact us at:
            </p>
            <ul className="space-y-1 text-gray-700">
              <li>
                <strong>Phone:</strong>{' '}
                <a href={`tel:${COMPANY.phone}`} className="text-primary-600 hover:underline">
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <strong>General Enquiries:</strong>{' '}
                <a href={`mailto:${COMPANY.email}`} className="text-primary-600 hover:underline">
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <strong>Support:</strong>{' '}
                <a href={`mailto:${COMPANY.supportEmail}`} className="text-primary-600 hover:underline">
                  {COMPANY.supportEmail}
                </a>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn-primary px-8 py-3 rounded-xl font-bold inline-flex items-center justify-center gap-2"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/courses"
              className="px-8 py-3 rounded-xl font-bold border-2 border-gray-300 text-gray-700 hover:border-primary-600 hover:text-primary-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              Browse More Courses
            </Link>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            Questions about your enrollment? Visit our{' '}
            <Link href="/faqs" className="text-primary-600 hover:underline">
              FAQs
            </Link>{' '}
            or{' '}
            <Link href="/contact" className="text-primary-600 hover:underline">
              contact us
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
