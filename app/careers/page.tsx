import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, Star } from 'lucide-react'
import { CAREERS, COURSES } from '@/lib/data'

export default function CareersPage() {
  const categories = [
    { id: 'security', label: 'Security', icon: '🛡️' },
    { id: 'alcohol', label: 'Alcohol & Hospitality', icon: '🍺' },
    { id: 'construction', label: 'Construction', icon: '🔨' },
    { id: 'firstaid', label: 'First Aid', icon: '🏥' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="hero-gradient py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gold-400 bg-gold-500/10 border border-gold-500/20 px-4 py-2 rounded-full mb-4">
            Career Pathways
          </span>
          <h1 className="font-display text-5xl font-extrabold text-white mb-4">
            Explore Career Opportunities
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            From door supervisor to security manager — discover the career pathways available 
            after training with SafeCert Skills Ltd.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {[
            { icon: <Users className="w-6 h-6" />, value: '50,000+', label: 'Graduates Placed' },
            { icon: <TrendingUp className="w-6 h-6" />, value: '95%', label: 'Employment Rate' },
            { icon: <Star className="w-6 h-6" />, value: '£35k+', label: 'Avg. Senior Salary' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mx-auto mb-3">
                {s.icon}
              </div>
              <div className="font-display text-3xl font-extrabold text-primary-700 mb-1">{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Career cards by category */}
        {categories.map(cat => {
          const catCareers = CAREERS.filter(c => c.category === cat.id)
          if (catCareers.length === 0) return null
          const relatedCourse = COURSES.find(c => c.category === cat.id)

          return (
            <div key={cat.id} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{cat.icon}</span>
                <h2 className="font-display text-2xl font-bold text-gray-900">{cat.label} Careers</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {catCareers.map((career, i) => (
                  <div key={i} className="card-hover bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{career.icon}</div>
                      <div className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                        Hiring Now
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-gray-900 text-lg mb-1">{career.title}</h3>
                    <p className="text-primary-600 font-semibold text-sm mb-4">💰 {career.salary} p/a</p>
                    {relatedCourse && (
                      <Link
                        href={relatedCourse.href}
                        className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Get qualified → {ArrowRight && <ArrowRight className="w-3.5 h-3.5" />}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {relatedCourse && (
                <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-primary-600 font-semibold mb-1">Start your {cat.label} career today</p>
                    <h4 className="font-display font-bold text-gray-900">{relatedCourse.title}</h4>
                    <p className="text-gray-500 text-sm">{relatedCourse.duration} · From {relatedCourse.price}</p>
                  </div>
                  <Link href={relatedCourse.href} className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap">
                    View Course →
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
