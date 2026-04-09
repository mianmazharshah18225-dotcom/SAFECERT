import Link from 'next/link'
import { Phone, MessageSquare } from 'lucide-react'
import { COMPANY } from '@/lib/data'

export default function CTASection() {
  return (
    <section className="py-20 hero-gradient hero-pattern relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-gold-400 bg-gold-500/10 border border-gold-500/20 px-4 py-2 rounded-full mb-6">
          Start Today
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6">
          Ready to Launch Your Career?
        </h2>
        <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join 300+ students who have transformed their careers with SafeCert Skills Ltd. 
          Courses starting every week across Luton.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/courses" className="btn-gold px-8 py-4 rounded-2xl text-base font-bold inline-flex items-center justify-center gap-2">
            Browse All Courses →
          </Link>
          <a href={`tel:${COMPANY.phone}`} className="glass-card px-8 py-4 rounded-2xl text-base font-semibold text-white inline-flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
            <Phone className="w-5 h-5" />
            {COMPANY.phone}
          </a>
        </div>
        <p className="mt-6 text-white/50 text-sm">
          Free consultation available · No obligation · Expert advisors ready
        </p>
      </div>
    </section>
  )
}
