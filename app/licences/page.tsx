import Link from 'next/link'
import { CheckCircle, Clock, CreditCard, ArrowRight } from 'lucide-react'
import { LICENCES } from '@/lib/data'

export default function LicencesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="hero-gradient py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gold-400 bg-gold-500/10 border border-gold-500/20 px-4 py-2 rounded-full mb-4">
            Licences & Accreditation
          </span>
          <h1 className="font-display text-5xl font-extrabold text-white mb-4">
            Professional Licences
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Everything you need to know about getting your professional licence. 
            We guide you from training to application.
          </p>
        </div>
      </div>

      {/* Licence cards */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LICENCES.map(lic => (
            <Link
              key={lic.id}
              href={lic.href}
              className="card-hover bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group"
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-primary-800 to-primary-600 p-6">
                <div className="text-4xl mb-3">{lic.icon}</div>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-gold-300 transition-colors">
                  {lic.title}
                </h3>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">{lic.description}</p>

                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <CreditCard className="w-4 h-4 text-primary-500" />
                    {lic.cost}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Clock className="w-4 h-4 text-primary-500" />
                    Valid: {lic.validity}
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">How to get it:</p>
                  {lic.steps.slice(0, 3).map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </div>
                      {step}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-primary-600 font-semibold flex items-center gap-1">
                    Full Guide <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info section */}
        <div className="mt-16 bg-amber-50 border border-amber-200 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="text-4xl">💡</div>
            <div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                Need Help Getting Your Licence?
              </h3>
              <p className="text-gray-600 mb-4">
                Our expert team will guide you through every step — from choosing the right training course 
                to submitting your SIA licence application. We've helped over 50,000 people get licenced.
              </p>
              <div className="flex gap-4">
                <Link href="/contact" className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold">
                  Talk to an Expert
                </Link>
                <Link href="/courses" className="px-6 py-3 rounded-xl text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:border-primary-300 transition-colors">
                  Find Training Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
