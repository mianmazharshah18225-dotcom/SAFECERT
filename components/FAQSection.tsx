'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { FAQS_HOME } from '@/lib/data'
import Link from 'next/link'

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<number | null>(null)

  return (
    <div className="bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-600 bg-primary-50 border border-primary-200 px-4 py-2 rounded-full mb-4">
            Got Questions?
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our courses, training, and certifications
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-3 mb-8">
          {FAQS_HOME.map((item, i) => {
            const isOpen = openItem === i
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                  isOpen ? 'border-primary-300 shadow-md shadow-primary-100' : 'border-gray-200'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenItem(isOpen ? null : i)}
                >
                  <span className="font-semibold text-gray-900 pr-4">{item.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed mt-4">{item.a}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/faqs"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            View all FAQs
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
