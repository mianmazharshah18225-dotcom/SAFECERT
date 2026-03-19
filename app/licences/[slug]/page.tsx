import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Clock, CreditCard, Phone, ArrowRight } from 'lucide-react'
import { LICENCES, COURSES, COMPANY } from '@/lib/data'

export async function generateStaticParams() {
  return LICENCES.map(l => ({ slug: l.id }))
}

export default function LicenceDetailPage({ params }: { params: { slug: string } }) {
  const licence = LICENCES.find(l => l.id === params.slug)
  if (!licence) notFound()

  const relatedCourse = COURSES.find(c =>
    c.title.toLowerCase().includes(licence.title.split(' ')[1]?.toLowerCase() || '')
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="hero-gradient py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/licences" className="hover:text-white">Licences</Link>
            <span>/</span>
            <span className="text-white">{licence.title}</span>
          </div>
          <div className="max-w-3xl">
            <div className="text-5xl mb-4">{licence.icon}</div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">
              {licence.title}
            </h1>
            <p className="text-white/70 text-lg">{licence.description}</p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 text-white text-sm">
                <CreditCard className="w-4 h-4 text-gold-400" />
                {licence.cost}
              </div>
              <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 text-white text-sm">
                <Clock className="w-4 h-4 text-gold-400" />
                Valid for {licence.validity}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Steps */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">
                How to Get Your {licence.title}
              </h2>
              <div className="space-y-6">
                {licence.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-full bg-primary-600 text-white font-display font-bold flex items-center justify-center flex-shrink-0 text-lg">
                      {i + 1}
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-gray-700 font-medium">{step}</p>
                      {i < licence.steps.length - 1 && (
                        <div className="mt-4 ml-[-2.5rem] pl-[2.5rem]">
                          <div className="w-0.5 h-6 bg-primary-100 ml-4" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'How long does the licence application take?',
                    a: 'SIA licence applications typically take 6-8 weeks to process after submitting all required documents.',
                  },
                  {
                    q: 'Can I work while waiting for my licence?',
                    a: 'No. You must have your physical SIA licence before working in a licensable role.',
                  },
                  {
                    q: 'What happens if I fail the training assessment?',
                    a: 'SafeCert provides resit opportunities. Our pass rate is 98%, and we support you every step of the way.',
                  },
                ].map((faq, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-2">Q: {faq.q}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">A: {faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {relatedCourse && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-display font-bold text-gray-900 mb-4">Required Training Course</h3>
                <Link href={relatedCourse.href} className="block p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors group">
                  <div className="text-2xl mb-2">{relatedCourse.icon}</div>
                  <h4 className="font-bold text-primary-800 mb-1 group-hover:text-primary-600">{relatedCourse.title}</h4>
                  <p className="text-sm text-gray-500 mb-3">{relatedCourse.duration} · {relatedCourse.price}</p>
                  <span className="text-primary-600 text-sm font-semibold flex items-center gap-1">
                    View Course <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            )}

            <div className="bg-primary-900 rounded-2xl p-6 text-white">
              <h3 className="font-display font-bold text-lg mb-2">Need Guidance?</h3>
              <p className="text-white/70 text-sm mb-4">
                Our licence experts will walk you through the entire process — for free.
              </p>
              <a href={`tel:${COMPANY.phone}`} className="btn-gold w-full block text-center py-3 rounded-xl font-bold text-dark-900 text-sm mb-3">
                📞 {COMPANY.phone}
              </a>
              <Link href="/contact" className="w-full block text-center py-3 rounded-xl text-sm font-semibold glass-card hover:bg-white/20 transition-all">
                Send a Message
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
