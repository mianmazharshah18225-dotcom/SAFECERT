import { COMPANY } from '@/lib/data'

export default function StatsBar() {
  return (
    <section className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {COMPANY.stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="font-display text-4xl md:text-5xl font-extrabold text-white counter-number mb-2 group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm font-medium tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
