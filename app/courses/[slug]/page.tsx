import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, Tag, CheckCircle, MapPin, Phone, Star, ArrowRight, Shield } from 'lucide-react'
import { COURSES, COMPANY } from '@/lib/data'

export async function generateStaticParams() {
  return COURSES.map(c => ({ slug: c.id }))
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = COURSES.find(c => c.id === params.slug)
  if (!course) notFound()

  const related = COURSES.filter(c => c.category === course.category && c.id !== course.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="hero-gradient py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-white">{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="text-5xl mb-4">{course.icon}</div>
              {course.popular && (
                <span className="inline-block bg-gold-500 text-dark-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  🔥 Most Popular Course
                </span>
              )}
              <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">
                {course.title}
              </h1>
              <p className="text-white/70 text-lg mb-6 leading-relaxed">{course.description}</p>
              <div className="flex flex-wrap gap-4">
                <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 text-white text-sm">
                  <Clock className="w-4 h-4 text-gold-400" />
                  Duration: {course.duration}
                </div>
                <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 text-white text-sm">
                  <Tag className="w-4 h-4 text-gold-400" />
                  {course.level}
                </div>
                <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 text-white text-sm">
                  <MapPin className="w-4 h-4 text-gold-400" />
                  120+ UK Locations
                </div>
              </div>
            </div>

            {/* Booking card */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-sm text-gray-400 line-through mb-1">{course.originalPrice}</div>
                <div className="font-display text-4xl font-extrabold text-primary-700 mb-1">{course.price}</div>
                <div className="text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full inline-block">
                  ✓ Price includes everything
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {course.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>

              <Link href="/contact" className="btn-gold w-full block text-center py-4 rounded-xl font-bold text-dark-900 mb-3">
                Book This Course
              </Link>
              <a href={`tel:${COMPANY.phone}`} className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm">
                <Phone className="w-4 h-4" />
                Call {COMPANY.phone}
              </a>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 justify-center text-xs text-gray-400">
                <Shield className="w-3.5 h-3.5 text-primary-400" />
                SIA Approved · Secure Booking
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* What you'll learn */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-primary-50 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Entry Requirements</h2>
              <ul className="space-y-3">
                {[
                  'Must be 18 years or older',
                  'Right to work in the UK',
                  'Basic English language skills',
                  'No previous experience required',
                ].map((req, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trustpilot */}
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 fill-green-500 text-green-500" />
                  ))}
                </div>
                <span className="font-bold text-green-800">Excellent — {COMPANY.trustpilot.reviews.toLocaleString()} reviews</span>
              </div>
              <p className="text-green-700 italic text-sm">
                "I completed the {course.title} with SafeCert and it was brilliant. 
                The instructors were professional and I passed first time!"
              </p>
              <p className="text-green-600 text-xs font-semibold mt-2">— Verified Trustpilot Review</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-display font-bold text-gray-900 mb-4">Course Details</h3>
              <div className="space-y-3">
                {[
                  { label: 'Duration', value: course.duration },
                  { label: 'Level', value: course.level },
                  { label: 'Locations', value: '120+ across UK' },
                  { label: 'Start Dates', value: 'Every week' },
                  { label: 'Delivery', value: 'Classroom + Practical' },
                  { label: 'Certificate', value: 'Nationally Recognised' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-500 text-sm">{label}</span>
                    <span className="font-semibold text-gray-900 text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-900 rounded-2xl p-6 text-white">
              <h3 className="font-display font-bold text-lg mb-2">Need Help Choosing?</h3>
              <p className="text-white/70 text-sm mb-4">Our expert advisors are ready to help you pick the right course.</p>
              <a href={`tel:${COMPANY.phone}`} className="btn-gold w-full block text-center py-3 rounded-xl font-bold text-dark-900 text-sm">
                📞 Call Free: {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Related Courses */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-8">Related Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(rc => (
                <Link key={rc.id} href={rc.href} className="course-card bg-white rounded-2xl p-6 group">
                  <div className="text-3xl mb-3">{rc.icon}</div>
                  <h3 className="font-display font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{rc.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{rc.duration} · {rc.level}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary-700">{rc.price}</span>
                    <span className="text-primary-600 text-sm font-medium flex items-center gap-1">
                      View <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
