import { Star, CheckCircle } from 'lucide-react'
import { TESTIMONIALS, COMPANY } from '@/lib/data'

export default function Testimonials() {
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
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 fill-green-500 text-green-500" />
              ))}
            </div>
            <span className="font-bold text-gray-900">Excellent</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500">{COMPANY.trustpilot.reviews.toLocaleString()} reviews on</span>
            <span className="font-bold text-green-600">Trustpilot</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-green-500 text-green-500" />
                  ))}
                </div>
                {review.verified && (
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
                  <div className="text-xs text-gray-400">{review.course}</div>
                </div>
                <div className="text-xs text-gray-400">{review.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
