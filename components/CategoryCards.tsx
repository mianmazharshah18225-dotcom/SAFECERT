import Link from 'next/link'
import { CATEGORIES } from '@/lib/data'

export default function CategoryCards() {
  const categoryDescriptions: Record<string, string> = {
    security: 'SIA Door Supervisor, Security Guard, CCTV & more',
    alcohol: 'Personal Licence (APLH) & DPS training',
    construction: 'CSCS Green Card & site safety courses',
    firstaid: 'EFAW, FAW Level 3 & Paediatric First Aid',
    elearning: 'Online courses — study from anywhere, anytime',
    driving: 'Driving licence & advanced driver training',
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-600 bg-primary-50 px-4 py-2 rounded-full mb-4">
            Course Categories
          </span>
          <h2 className="font-display text-4xl font-extrabold text-gray-900 mb-4">
            What Would You Like to Train In?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Choose from our wide range of nationally recognised, accredited courses across multiple industries.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="card-hover group bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="font-display font-bold text-gray-900 mb-1">{cat.name}</h3>
              <p className="text-xs text-gray-400 leading-snug hidden lg:block">
                {categoryDescriptions[cat.id]}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
