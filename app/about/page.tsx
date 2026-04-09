import Link from 'next/link'
import { Shield, Award, Users, MapPin, CheckCircle, Star } from 'lucide-react'
import { COMPANY } from '@/lib/data'

export default function AboutPage() {
  const values = [
    { icon: '🎯', title: 'Excellence', desc: 'We maintain a 98% pass rate through expert instruction and comprehensive 1.5 year programs.' },
    { icon: '🤝', title: 'Support', desc: 'From enrolment to employment — our team supports every student every step of the way.' },
    { icon: '🏆', title: 'Accreditation', desc: 'All courses are nationally accredited and recognised by employers across the UK.' },
    { icon: '💡', title: 'Innovation', desc: 'We continually update our courses to reflect the latest industry standards and best practices.' },
  ]

  const team = [
    { name: 'James Harrison', role: 'Chief Executive Officer', emoji: '👨‍💼' },
    { name: 'Sarah Mitchell', role: 'Head of Training', emoji: '👩‍🏫' },
    { name: 'David Osei', role: 'Senior Instructor', emoji: '👨‍🏫' },
    { name: 'Priya Patel', role: 'Student Services Manager', emoji: '👩‍💼' },
  ]

  const accreditations = [
    { icon: '🏥', name: 'HSE Compliant', desc: 'Health & Safety Executive' },
    { icon: '🎓', name: 'Nationally Accredited', desc: 'UK Recognised Qualifications' },
    { icon: '✅', name: 'Industry Recognised', desc: 'Employer Approved' },
    { icon: '🏆', name: '98% Pass Rate', desc: 'Proven Success Record' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="hero-gradient py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-gold-400 bg-gold-500/10 border border-gold-500/20 px-4 py-2 rounded-full mb-6">
              About Us
            </span>
            <h1 className="font-display text-5xl font-extrabold text-white mb-6">
              Professional Training in Luton
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              SafeCert Skills Ltd provides professional training in First Aid, Food & Hygiene, and Health & Safety.
              Our comprehensive 1.5 year programs in Luton combine expert instruction with genuine care for our students.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {COMPANY.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-4xl font-extrabold text-primary-700 mb-1">{s.value}</div>
                <div className="text-gray-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-600 bg-primary-50 px-4 py-2 rounded-full mb-4">
              Our Story
            </span>
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-6">
              1+ Years of Transforming Careers
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                SafeCert Skills Ltd was founded with a single mission: to provide accessible, 
                high-quality professional training that genuinely changes people's lives.
              </p>
              <p>
                Starting with a single security training centre in London, we've grown to become 
                the UK's most trusted training provider, with over 120 locations across England, 
                Scotland, Wales, and Northern Ireland.
              </p>
              <p>
                Today, over 50,000 graduates work in roles they love — as door supervisors, 
                CCTV operators, close protection officers, bar managers, and construction workers — 
                all thanks to the training and support they received at SafeCert.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { year: '2009', event: 'SafeCert founded in London' },
              { year: '2013', event: 'Expanded soon' },
              { year: '2018', event: 'Reached 100+ graduates' },
              { year: '2024', event: '1 locations & 100+ graduates' },
            ].map((milestone, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="font-display text-2xl font-extrabold text-primary-600 mb-1">{milestone.year}</div>
                <p className="text-gray-600 text-sm">{milestone.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-600 bg-primary-50 px-4 py-2 rounded-full mb-4">
              Our Values
            </span>
            <h2 className="font-display text-4xl font-bold text-gray-900">What Drives Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="card-hover bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-display font-bold text-gray-900 text-xl mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Accreditations */}
        <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
              Fully Accredited & Approved
            </h2>
            <p className="text-gray-500">Our courses are recognised by the UK's leading industry bodies</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {accreditations.map((acc, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  {acc.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{acc.name}</h4>
                <p className="text-gray-400 text-xs">{acc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-600 bg-primary-50 px-4 py-2 rounded-full mb-4">
              Our Team
            </span>
            <h2 className="font-display text-4xl font-bold text-gray-900">Meet the Leadership</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="card-hover bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                  {member.emoji}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-400 text-xs">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="hero-gradient rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 hero-pattern opacity-50" />
          <div className="relative">
            <h2 className="font-display text-4xl font-extrabold text-white mb-4">
              Ready to Join Our 50,000+ Graduates?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Start your training journey today and transform your career with SafeCert Skills Ltd.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses" className="btn-gold px-8 py-4 rounded-2xl font-bold text-dark-900">
                Browse All Courses →
              </Link>
              <Link href="/contact" className="glass-card px-8 py-4 rounded-2xl font-semibold text-white hover:bg-white/20 transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
